import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Globe, GripVertical } from 'lucide-react';
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
import SectionCard from '../ui/SectionCard';
import type { Language } from '../../types/resume';

const PROFICIENCY_LEVELS: Language['proficiency'][] = ['Beginner', 'Intermediate', 'Advanced', 'Native'];

const PROFICIENCY_COLORS: Record<Language['proficiency'], string> = {
  Beginner: '#94a3b8',
  Intermediate: '#f97316',
  Advanced: '#8b5cf6',
  Native: '#6366f1',
};

const SUGGESTED_LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Hindi', 'Mandarin', 'Japanese', 'Arabic'];

const emptyLang = (name = ''): Language => ({
  id: crypto.randomUUID(), name, proficiency: 'Intermediate',
});

const SortableLangItem = ({ lang, dispatch, errors, setErrors }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: lang.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    position: 'relative' as any,
  };

  const errKey = `lang_name_${lang.id}`;
  const hasError = !!errors[errKey];

  return (
    <motion.div
      ref={setNodeRef}
      style={{
        ...style,
        display: 'grid', gridTemplateColumns: 'auto 1fr 1fr auto', gap: 12, alignItems: 'center',
        padding: '12px 16px', background: 'var(--bg-page)',
        border: `1px solid ${hasError ? 'var(--color-error)' : 'var(--border-color)'}`, borderRadius: 'var(--radius-md)',
        boxShadow: isDragging ? '0 10px 25px rgba(0,0,0,0.1)' : 'none',
      }}
      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
    >
      <div {...attributes} {...listeners} style={{ cursor: 'grab', padding: '4px', color: 'var(--text-muted)' }}>
        <GripVertical size={16} />
      </div>
      <div style={{ position: 'relative' }}>
        <input
          id={errKey}
          placeholder="Language (e.g. English)"
          value={lang.name}
          onChange={(e) => {
            dispatch({ type: 'UPDATE_LANGUAGE', payload: { ...lang, name: e.target.value } });
            if (errors[errKey]) setErrors((prev: any) => { const n = { ...prev }; delete n[errKey]; return n; });
          }}
          className="input-field"
          style={{ 
            padding: '8px 12px', fontSize: '14px', width: '100%',
            borderColor: hasError ? 'var(--color-error)' : undefined 
          }}
          required
        />
        {hasError && <span style={{ fontSize: '10px', color: 'var(--color-error)', position: 'absolute', bottom: -14, left: 0 }}>Required</span>}
      </div>
      <select
        value={lang.proficiency}
        onChange={(e) => dispatch({ type: 'UPDATE_LANGUAGE', payload: { ...lang, proficiency: e.target.value as Language['proficiency'] } })}
        style={{
          padding: '8px 12px', background: 'var(--bg-page)', border: '1.5px solid var(--border-color)',
          borderRadius: 'var(--radius-sm)', color: PROFICIENCY_COLORS[lang.proficiency as Language['proficiency']],
          fontSize: '14px', fontWeight: 600, outline: 'none', cursor: 'pointer',
        }}
      >
        {PROFICIENCY_LEVELS.map((lvl) => (
          <option key={lvl} value={lvl}>{lvl}</option>
        ))}
      </select>
      <button
        onClick={() => dispatch({ type: 'REMOVE_LANGUAGE', payload: lang.id })}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-error)', padding: 4, display: 'flex', alignItems: 'center' }}
      >
        <Trash2 size={16} />
      </button>
    </motion.div>
  );
};

export default function Languages() {
  const { resumeData, dispatch, errors, setErrors } = useResume();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = resumeData.languages.findIndex((i) => i.id === active.id);
      const newIndex = resumeData.languages.findIndex((i) => i.id === over.id);
      dispatch({ type: 'REORDER_SECTION', payload: { section: 'languages', startIndex: oldIndex, endIndex: newIndex } });
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
        title="Languages"
        description="Add languages you speak. Drag to reorder."
        action={
          <button className="btn-primary"
            onClick={() => dispatch({ type: 'ADD_LANGUAGE', payload: emptyLang() })}
            style={{ padding: '8px 16px', fontSize: '13px' }}>
            <Plus size={14} /> Add Language
          </button>
        }
      >
        {resumeData.languages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
            <Globe size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
            <p style={{ fontSize: '14px' }}>No languages added yet.</p>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={resumeData.languages.map((l) => l.id)} strategy={verticalListSortingStrategy}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <AnimatePresence>
                  {resumeData.languages.map((lang) => (
                    <SortableLangItem key={lang.id} lang={lang} dispatch={dispatch} errors={errors} setErrors={setErrors} />
                  ))}
                </AnimatePresence>
              </div>
            </SortableContext>
          </DndContext>
        )}

        {/* Smart Suggestions */}
        <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px dashed var(--border-color)' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Globe size={13} /> Quick Add Suggestions:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {SUGGESTED_LANGUAGES.filter(lang => !resumeData.languages.some(l => l.name.toLowerCase() === lang.toLowerCase())).map((lang) => (
              <button
                key={lang}
                onClick={() => dispatch({ type: 'ADD_LANGUAGE', payload: emptyLang(lang) })}
                style={{
                  padding: '6px 14px',
                  background: 'rgba(99,102,241,0.04)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '999px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.color = 'var(--color-primary)';
                  e.currentTarget.style.background = 'rgba(99,102,241,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.background = 'rgba(99,102,241,0.04)';
                }}
              >
                + {lang}
              </button>
            ))}
          </div>
        </div>
      </SectionCard>
    </motion.div>
  );
}
