import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Briefcase, ChevronDown, ChevronUp, GripVertical, Sparkles, Loader2, SpellCheck } from 'lucide-react';
import { generateWorkDescription, correctSpelling } from '../../lib/openai';
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
import InputField from '../ui/InputField';
import TextareaField from '../ui/TextareaField';
import SectionCard from '../ui/SectionCard';
import type { WorkExperience as WorkExp } from '../../types/resume';

const emptyExp = (): WorkExp => ({
  id: crypto.randomUUID(),
  company: '', role: '', startDate: '', endDate: '',
  current: false, description: '',
});

const SortableExperienceItem = ({ exp, expanded, setExpanded, dispatch, errors, setErrors }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: exp.id });
  const [isGenerating, setIsGenerating] = useState(false);
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
      <div
        onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div {...attributes} {...listeners} onClick={(e) => e.stopPropagation()} style={{ cursor: 'grab', display: 'flex', alignItems: 'center', padding: '4px', color: 'var(--text-muted)' }}>
            <GripVertical size={16} />
          </div>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(139,92,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Briefcase size={16} color="var(--color-secondary)" />
          </div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{exp.role || 'New Experience'}</p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{exp.company || 'Company Name'}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={(e) => { e.stopPropagation(); dispatch({ type: 'REMOVE_EXPERIENCE', payload: exp.id }); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-error)', padding: 4 }}>
            <Trash2 size={15} />
          </button>
          {expanded === exp.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      <AnimatePresence>
        {expanded === exp.id && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              <InputField id={`role-${exp.id}`} label="Job Title / Role" placeholder="Senior Developer"
                value={exp.role} onChange={(e) => {
                  dispatch({ type: 'UPDATE_EXPERIENCE', payload: { ...exp, role: e.target.value } });
                  const errKey = `exp_role_${exp.id}`;
                  if (errors[errKey]) setErrors((prev: Record<string, string>) => { const n = { ...prev }; delete n[errKey]; return n; });
                }} 
                error={errors[`exp_role_${exp.id}`]}
                required />
              <InputField id={`company-${exp.id}`} label="Company Name" placeholder="Google"
                value={exp.company} onChange={(e) => {
                  dispatch({ type: 'UPDATE_EXPERIENCE', payload: { ...exp, company: e.target.value } });
                  const errKey = `exp_company_${exp.id}`;
                  if (errors[errKey]) setErrors((prev: Record<string, string>) => { const n = { ...prev }; delete n[errKey]; return n; });
                }} 
                error={errors[`exp_company_${exp.id}`]}
                required />
              <InputField id={`start-${exp.id}`} label="Start Date" placeholder="Jan 2022" type="month"
                value={exp.startDate} 
                onChange={(e) => {
                  const val = e.target.value;
                  dispatch({ type: 'UPDATE_EXPERIENCE', payload: { ...exp, startDate: val } });
                  const errKey = `exp_start_${exp.id}`;
                  const today = new Date();
                  const inputDate = new Date(val);
                  
                  if (!val) {
                    setErrors((prev: Record<string, string>) => ({ ...prev, [errKey]: 'Required' }));
                  } else if (inputDate > today) {
                    setErrors((prev: Record<string, string>) => ({ ...prev, [errKey]: 'Cannot be in the future' }));
                  } else if (errors[errKey]) {
                    setErrors((prev: Record<string, string>) => { const n = { ...prev }; delete n[errKey]; return n; });
                  }
                }} 
                error={errors[`exp_start_${exp.id}`]}
                required />
              <div>
                <InputField id={`end-${exp.id}`} label="End Date" placeholder="Dec 2023" type="month"
                  value={exp.endDate} disabled={exp.current}
                  onChange={(e) => {
                    const val = e.target.value;
                    dispatch({ type: 'UPDATE_EXPERIENCE', payload: { ...exp, endDate: val } });
                    const errKey = `exp_end_${exp.id}`;
                    const startDate = exp.startDate ? new Date(exp.startDate) : null;
                    const endDate = new Date(val);
                    const today = new Date();

                    if (!val && !exp.current) {
                      setErrors((prev: Record<string, string>) => ({ ...prev, [errKey]: 'Required' }));
                    } else if (startDate && endDate < startDate) {
                      setErrors((prev: Record<string, string>) => ({ ...prev, [errKey]: 'End date must be after start date' }));
                    } else if (endDate > today && !exp.current) {
                       setErrors((prev: Record<string, string>) => ({ ...prev, [errKey]: 'Cannot be in the future' }));
                    } else if (errors[errKey]) {
                      setErrors((prev: Record<string, string>) => { const n = { ...prev }; delete n[errKey]; return n; });
                    }
                  }} 
                  error={errors[`exp_end_${exp.id}`]}
                  required={!exp.current} />
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: '13px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input type="checkbox" checked={exp.current}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      dispatch({ type: 'UPDATE_EXPERIENCE', payload: { ...exp, current: isChecked, endDate: '' } });
                      if (isChecked) {
                        setErrors((prev: Record<string, string>) => {
                          const n = { ...prev };
                          delete n[`exp_end_${exp.id}`];
                          return n;
                        });
                      }
                    }} />
                  Currently working here
                </label>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <TextareaField id={`desc-${exp.id}`} label="Description / Achievements"
                placeholder="• Led a team of 5 engineers to deliver a scalable microservices platform&#10;• Reduced load time by 40% through code optimization"
                value={exp.description} rows={4}
                onChange={(e) => {
                  dispatch({ type: 'UPDATE_EXPERIENCE', payload: { ...exp, description: e.target.value } });
                  const errKey = `exp_desc_${exp.id}`;
                  if (errors[errKey]) setErrors((prev: Record<string, string>) => { const n = { ...prev }; delete n[errKey]; return n; });
                }}
                error={errors[`exp_desc_${exp.id}`]}
                required />
              
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button
                  onClick={async () => {
                    try {
                      setIsGenerating(true);
                      const description = await generateWorkDescription(exp.role, exp.company, exp.description);
                      dispatch({ type: 'UPDATE_EXPERIENCE', payload: { ...exp, description } });
                    } catch (error: any) {
                      console.error(error);
                      alert(error.message || "Failed to generate description");
                    } finally {
                      setIsGenerating(false);
                    }
                  }}
                  disabled={isGenerating || isFixing}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
                    background: 'rgba(var(--color-primary-rgb), 0.06)', border: '1px solid rgba(var(--color-primary-rgb), 0.1)',
                    color: 'var(--color-primary)', fontSize: '12px', fontWeight: 600,
                    cursor: (isGenerating || isFixing) ? 'wait' : 'pointer', borderRadius: 8, transition: 'all 0.2s',
                    opacity: (isGenerating || isFixing) ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => !(isGenerating || isFixing) && (e.currentTarget.style.background = 'rgba(var(--color-primary-rgb), 0.1)')}
                  onMouseLeave={(e) => !(isGenerating || isFixing) && (e.currentTarget.style.background = 'rgba(var(--color-primary-rgb), 0.06)')}
                >
                  {isGenerating ? (
                    <><Loader2 size={12} className="animate-spin" /> Generating...</>
                  ) : (
                    <><Sparkles size={12} /> Generate with AI</>
                  )}
                </button>

                {exp.description && exp.description.trim().length > 0 && (
                  <button
                    onClick={async () => {
                      try {
                        setIsFixing(true);
                        const corrected = await correctSpelling(exp.description);
                        dispatch({ type: 'UPDATE_EXPERIENCE', payload: { ...exp, description: corrected } });
                      } catch (error: any) {
                        console.error(error);
                        alert(error.message || "Failed to fix spelling");
                      } finally {
                        setIsFixing(false);
                      }
                    }}
                    disabled={isGenerating || isFixing}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
                      background: 'none', border: '1px solid var(--color-primary)',
                      color: 'var(--color-primary)', fontSize: '12px', fontWeight: 600,
                      cursor: (isGenerating || isFixing) ? 'wait' : 'pointer', borderRadius: 8, transition: 'all 0.2s',
                      opacity: (isGenerating || isFixing) ? 0.7 : 1,
                    }}
                    onMouseEnter={(e) => !(isGenerating || isFixing) && (e.currentTarget.style.background = 'rgba(var(--color-primary-rgb), 0.05)')}
                    onMouseLeave={(e) => !(isGenerating || isFixing) && (e.currentTarget.style.background = 'none')}
                  >
                    {isFixing ? (
                      <><Loader2 size={12} className="animate-spin" /> Fixing...</>
                    ) : (
                      <><SpellCheck size={12} /> Fix Spelling</>
                    )}
                  </button>
                )}

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function WorkExperience() {
  const { resumeData, dispatch, errors, setErrors } = useResume();
  const [expanded, setExpanded] = useState<string | null>(resumeData.workExperience[0]?.id ?? null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addExp = () => {
    const exp = emptyExp();
    dispatch({ type: 'ADD_EXPERIENCE', payload: exp });
    setExpanded(exp.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = resumeData.workExperience.findIndex((i) => i.id === active.id);
      const newIndex = resumeData.workExperience.findIndex((i) => i.id === over.id);
      dispatch({ type: 'REORDER_SECTION', payload: { section: 'workExperience', startIndex: oldIndex, endIndex: newIndex } });
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
        title="Work Experience"
        description="Add your professional experience in reverse chronological order. Drag to reorder."
        action={
          <button className="btn-primary" onClick={addExp} style={{ padding: '8px 16px', fontSize: '13px' }}>
            <Plus size={14} /> Add Experience
          </button>
        }
      >
        {resumeData.workExperience.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
            <Briefcase size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
            <p style={{ fontSize: '14px' }}>No experience added yet.</p>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={resumeData.workExperience.map((e) => e.id)} strategy={verticalListSortingStrategy}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <AnimatePresence>
                  {resumeData.workExperience.map((exp) => (
                    <SortableExperienceItem
                      key={exp.id}
                      exp={exp}
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
