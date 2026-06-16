import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, GraduationCap, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
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
import SectionCard from '../ui/SectionCard';
import type { Education as EducationType } from '../../types/resume';

const emptyEdu = (): EducationType => ({
  id: crypto.randomUUID(),
  degree: '', college: '', year: '', grade: '',
});

const SortableEducationItem = ({ edu, expanded, setExpanded, dispatch, errors, setErrors }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: edu.id });

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
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        background: 'var(--bg-page)',
        boxShadow: isDragging ? '0 10px 25px rgba(0,0,0,0.1)' : 'none',
      }}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    >
      <div
        onClick={() => setExpanded(expanded === edu.id ? null : edu.id)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 16px', cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div {...attributes} {...listeners} onClick={(e) => e.stopPropagation()} style={{ cursor: 'grab', display: 'flex', alignItems: 'center', padding: '4px', color: 'var(--text-muted)' }}>
            <GripVertical size={16} />
          </div>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'rgba(99,102,241,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <GraduationCap size={16} color="var(--color-primary)" />
          </div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {edu.degree || 'New Education'}
            </p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {edu.college || 'College / University'}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={(e) => { e.stopPropagation(); dispatch({ type: 'REMOVE_EDUCATION', payload: edu.id }); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-error)', padding: 4 }}
          >
            <Trash2 size={15} />
          </button>
          {expanded === edu.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      <AnimatePresence>
        {expanded === edu.id && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ padding: '0 16px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}
          >
            <InputField 
              id={`degree-${edu.id}`} 
              label="Degree / Qualification" 
              placeholder="B.Tech in Computer Science"
              value={edu.degree} 
              onChange={(e) => {
                const val = e.target.value;
                dispatch({ type: 'UPDATE_EDUCATION', payload: { ...edu, degree: val } });
                const errKey = `edu_degree_${edu.id}`;
                if (!val) {
                  setErrors((prev: any) => ({ ...prev, [errKey]: 'Degree is required' }));
                } else if (errors[errKey]) {
                  setErrors((prev: any) => { const n = { ...prev }; delete n[errKey]; return n; });
                }
              }} 
              error={errors[`edu_degree_${edu.id}`]} 
              required
            />
            <InputField 
              id={`college-${edu.id}`} 
              label="College / University" 
              placeholder="MIT"
              value={edu.college} 
              onChange={(e) => {
                const val = e.target.value;
                dispatch({ type: 'UPDATE_EDUCATION', payload: { ...edu, college: val } });
                const errKey = `edu_college_${edu.id}`;
                if (!val) {
                  setErrors((prev: any) => ({ ...prev, [errKey]: 'College is required' }));
                } else if (val.trim().length < 3) {
                  setErrors((prev: any) => ({ ...prev, [errKey]: 'Please enter a valid college name' }));
                } else if (errors[errKey]) {
                  setErrors((prev: any) => { const n = { ...prev }; delete n[errKey]; return n; });
                }
              }} 
              error={errors[`edu_college_${edu.id}`]} 
              required
            />
            <InputField 
              id={`year-${edu.id}`} 
              label="Graduation Year" 
              placeholder="2022"
              value={edu.year} 
              onChange={(e) => {
                const val = e.target.value;
                dispatch({ type: 'UPDATE_EDUCATION', payload: { ...edu, year: val } });
                const errKey = `edu_year_${edu.id}`;
                const currentYear = new Date().getFullYear();
                
                if (!val) {
                  setErrors((prev: any) => ({ ...prev, [errKey]: 'Year is required' }));
                } else if (parseInt(val) > currentYear) {
                  setErrors((prev: any) => ({ ...prev, [errKey]: `Year cannot be later than ${currentYear}` }));
                } else if (errors[errKey]) {
                  setErrors((prev: any) => { const n = { ...prev }; delete n[errKey]; return n; });
                }
              }} 
              error={errors[`edu_year_${edu.id}`]}
              required
            />
            <InputField 
              id={`grade-${edu.id}`} 
              label="Grade / GPA" 
              placeholder="8.5 / 10.0"
              value={edu.grade} 
              onChange={(e) => {
                const val = e.target.value;
                dispatch({ type: 'UPDATE_EDUCATION', payload: { ...edu, grade: val } });
                const errKey = `edu_grade_${edu.id}`;
                
                if (!val) {
                  setErrors((prev: any) => ({ ...prev, [errKey]: 'Grade is required' }));
                } else if (!isNaN(Number(val)) && (Number(val) > 10 || Number(val) < 0)) {
                  setErrors((prev: any) => ({ ...prev, [errKey]: 'CGPA must be between 0 and 10' }));
                } else if (errors[errKey]) {
                  setErrors((prev: any) => { const n = { ...prev }; delete n[errKey]; return n; });
                }
              }} 
              error={errors[`edu_grade_${edu.id}`]}
              required
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Education() {
  const { resumeData, dispatch, errors, setErrors } = useResume();
  const [expanded, setExpanded] = useState<string | null>(
    resumeData.education[0]?.id ?? null
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addEducation = () => {
    const edu = emptyEdu();
    dispatch({ type: 'ADD_EDUCATION', payload: edu });
    setExpanded(edu.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = resumeData.education.findIndex((i) => i.id === active.id);
      const newIndex = resumeData.education.findIndex((i) => i.id === over.id);
      dispatch({ type: 'REORDER_SECTION', payload: { section: 'education', startIndex: oldIndex, endIndex: newIndex } });
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
        title="Education"
        description="Add your academic background. Drag to reorder."
        action={
          <button className="btn-primary" onClick={addEducation} style={{ padding: '8px 16px', fontSize: '13px' }}>
            <Plus size={14} /> Add Education
          </button>
        }
      >
        {resumeData.education.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
            <GraduationCap size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
            <p style={{ fontSize: '14px' }}>No education added yet.</p>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={resumeData.education.map((e) => e.id)} strategy={verticalListSortingStrategy}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <AnimatePresence>
                  {resumeData.education.map((edu) => (
                    <SortableEducationItem
                      key={edu.id}
                      edu={edu}
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
