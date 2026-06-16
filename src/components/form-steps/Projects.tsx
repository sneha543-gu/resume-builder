import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Code, ChevronDown, ChevronUp, GripVertical, Sparkles, Loader2, SpellCheck } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { useResume } from '../../context/ResumeContext';
import { generateProjectDescription, suggestTechStack, correctSpelling } from '../../lib/openai';
import InputField from '../ui/InputField';
import TextareaField from '../ui/TextareaField';
import SectionCard from '../ui/SectionCard';
import type { Project } from '../../types/resume';

const emptyProject = (): Project => ({
  id: crypto.randomUUID(),
  name: '', description: '', techStack: '', link: '',
});

const SortableProjectItem = ({ proj, expanded, setExpanded, dispatch, errors, setErrors }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: proj.id });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuggestingTech, setIsSuggestingTech] = useState(false);
  const [isFixing, setIsFixing] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    position: 'relative' as any,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={{
        ...style,
        border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--bg-page)',
        boxShadow: isDragging ? '0 10px 25px rgba(0,0,0,0.1)' : 'none',
      }}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    >
      <div onClick={() => setExpanded(expanded === proj.id ? null : proj.id)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div {...attributes} {...listeners} onClick={(e) => e.stopPropagation()} style={{ cursor: 'grab', display: 'flex', alignItems: 'center', padding: '4px', color: 'var(--text-muted)' }}>
            <GripVertical size={16} />
          </div>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(249,115,22,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Code size={16} color="var(--color-accent)" />
          </div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{proj.name || 'New Project'}</p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{proj.techStack || 'Tech Stack'}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={(e) => { e.stopPropagation(); dispatch({ type: 'REMOVE_PROJECT', payload: proj.id }); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-error)', padding: 4 }}>
            <Trash2 size={15} />
          </button>
          {expanded === proj.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>
      <AnimatePresence>
        {expanded === proj.id && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              <InputField id={`pname-${proj.id}`} label="Project Name" placeholder="Portfolio Website"
                value={proj.name} onChange={(e) => {
                  dispatch({ type: 'UPDATE_PROJECT', payload: { ...proj, name: e.target.value } });
                  const errKey = `proj_name_${proj.id}`;
                  if (errors[errKey]) setErrors((prev: any) => { const n = { ...prev }; delete n[errKey]; return n; });
                }} 
                error={errors[`proj_name_${proj.id}`]}
                required />
              <div style={{ position: 'relative' }}>
                <InputField id={`ptech-${proj.id}`} label="Tech Stack" placeholder="React, Node.js, MongoDB"
                  value={proj.techStack} 
                  onChange={(e) => {
                    dispatch({ type: 'UPDATE_PROJECT', payload: { ...proj, techStack: e.target.value } });
                    const errKey = `proj_tech_${proj.id}`;
                    if (errors[errKey]) setErrors((prev: any) => { const n = { ...prev }; delete n[errKey]; return n; });
                  }} 
                  error={errors[`proj_tech_${proj.id}`]}
                  required
                />
                <button
                  onClick={async () => {
                    if (!proj.name) {
                      alert("Please enter a project name first to get tech stack suggestions.");
                      return;
                    }
                    try {
                      setIsSuggestingTech(true);
                      const suggestions = await suggestTechStack(proj.name);
                      dispatch({ type: 'UPDATE_PROJECT', payload: { ...proj, techStack: suggestions } });
                      const errKey = `proj_tech_${proj.id}`;
                      if (errors[errKey]) setErrors((prev: any) => { const n = { ...prev }; delete n[errKey]; return n; });
                    } catch (error: any) {
                      alert(error.message);
                    } finally {
                      setIsSuggestingTech(false);
                    }
                  }}
                  disabled={isSuggestingTech}
                  title="Suggest Tech Stack"
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '32px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px',
                    borderRadius: '4px',
                    transition: 'all 0.2s',
                    zIndex: 2
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(var(--color-primary-rgb), 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                >
                  {isSuggestingTech ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                </button>
              </div>
              <InputField id={`plink-${proj.id}`} label="Live / GitHub Link" placeholder="https://github.com/..."
                value={proj.link} onChange={(e) => dispatch({ type: 'UPDATE_PROJECT', payload: { ...proj, link: e.target.value } })} />
            </div>
            <TextareaField id={`pdesc-${proj.id}`} label="Description"
              placeholder="Describe what the project does, your role, and key outcomes..." rows={3}
              value={proj.description} onChange={(e) => {
                dispatch({ type: 'UPDATE_PROJECT', payload: { ...proj, description: e.target.value } });
                const errKey = `proj_desc_${proj.id}`;
                if (errors[errKey]) setErrors((prev: any) => { const n = { ...prev }; delete n[errKey]; return n; });
              }} 
              error={errors[`proj_desc_${proj.id}`]} 
              required />
            
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <button
                onClick={async () => {
                  try {
                    setIsGenerating(true);
                    const desc = await generateProjectDescription(proj.name, proj.techStack, proj.description);
                    dispatch({ type: 'UPDATE_PROJECT', payload: { ...proj, description: desc } });
                    const errKey = `proj_desc_${proj.id}`;
                    if (errors[errKey]) setErrors((prev: any) => { const n = { ...prev }; delete n[errKey]; return n; });
                  } catch (error: any) {
                    alert(error.message);
                  } finally {
                    setIsGenerating(false);
                  }
                }}
                disabled={isGenerating || isFixing}
                className="btn-secondary"
                style={{ 
                  fontSize: '12px', 
                  padding: '6px 12px', 
                  gap: 6,
                  background: 'rgba(var(--color-primary-rgb), 0.05)',
                  border: '1px solid rgba(var(--color-primary-rgb), 0.2)',
                  color: 'var(--color-primary)',
                  opacity: (isGenerating || isFixing) ? 0.7 : 1,
                  cursor: (isGenerating || isFixing) ? 'wait' : 'pointer'
                }}
              >
                {isGenerating ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
                {proj.description ? 'Improve with AI' : 'Generate with AI'}
              </button>

              {proj.description && proj.description.trim().length > 0 && (
                <button
                  onClick={async () => {
                    try {
                      setIsFixing(true);
                      const corrected = await correctSpelling(proj.description);
                      dispatch({ type: 'UPDATE_PROJECT', payload: { ...proj, description: corrected } });
                    } catch (error: any) {
                      console.error(error);
                      alert(error.message || "Failed to fix spelling");
                    } finally {
                      setIsFixing(false);
                    }
                  }}
                  disabled={isGenerating || isFixing}
                  className="btn-secondary"
                  style={{ 
                    fontSize: '12px', 
                    padding: '6px 12px', 
                    gap: 6,
                    background: 'none',
                    border: '1px solid var(--color-primary)',
                    color: 'var(--color-primary)',
                    opacity: (isGenerating || isFixing) ? 0.7 : 1,
                    cursor: (isGenerating || isFixing) ? 'wait' : 'pointer'
                  }}
                  onMouseEnter={(e) => !(isGenerating || isFixing) && (e.currentTarget.style.background = 'rgba(var(--color-primary-rgb), 0.05)')}
                  onMouseLeave={(e) => !(isGenerating || isFixing) && (e.currentTarget.style.background = 'none')}
                >
                  {isFixing ? <Loader2 size={13} className="animate-spin" /> : <SpellCheck size={13} />}
                  Fix Spelling
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Projects() {
  const { resumeData, dispatch, errors, setErrors } = useResume();
  const [expanded, setExpanded] = useState<string | null>(resumeData.projects[0]?.id ?? null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addProject = () => {
    const p = emptyProject();
    dispatch({ type: 'ADD_PROJECT', payload: p });
    setExpanded(p.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = resumeData.projects.findIndex((i) => i.id === active.id);
      const newIndex = resumeData.projects.findIndex((i) => i.id === over.id);
      dispatch({ type: 'REORDER_SECTION', payload: { section: 'projects', startIndex: oldIndex, endIndex: newIndex } });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      <SectionCard
        title="Projects"
        description="Showcase your best work. Drag to reorder."
        action={
          <button className="btn-primary" onClick={addProject} style={{ padding: '8px 16px', fontSize: '13px' }}>
            <Plus size={14} /> Add Project
          </button>
        }
      >
        {resumeData.projects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
            <Code size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
            <p style={{ fontSize: '14px' }}>No projects added yet.</p>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={resumeData.projects.map((p) => p.id)} strategy={verticalListSortingStrategy}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <AnimatePresence>
                  {resumeData.projects.map((proj) => (
                    <SortableProjectItem
                      key={proj.id}
                      proj={proj}
                      expanded={expanded}
                      setExpanded={setExpanded}
                      dispatch={dispatch}
                      errors={errors}
                      setErrors={setErrors}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </SortableContext>
          </DndContext>
        )}
      </SectionCard>
    </motion.div>
  );
}
