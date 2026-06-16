import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Award, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
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
import type { Certification } from '../../types/resume';

const SUGGESTED_CERTS = [
  { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services' },
  { name: 'Google Cloud Professional Architect', issuer: 'Google' },
  { name: 'Microsoft Certified: Azure Solutions Architect', issuer: 'Microsoft' },
  { name: 'Project Management Professional (PMP)', issuer: 'PMI' },
  { name: 'Certified ScrumMaster (CSM)', issuer: 'Scrum Alliance' },
  { name: 'CompTIA Security+', issuer: 'CompTIA' },
  { name: 'Meta Front-End Developer Professional Certificate', issuer: 'Meta' },
  { name: 'IBM Data Science Professional Certificate', issuer: 'IBM' },
];

const emptyCert = (name = '', issuer = ''): Certification => ({
  id: crypto.randomUUID(), name, issuer, year: '', link: '',
});

const SortableCertItem = ({ cert, expanded, setExpanded, dispatch, errors, setErrors }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: cert.id });

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
      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
    >
      <div onClick={() => setExpanded(expanded === cert.id ? null : cert.id)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div {...attributes} {...listeners} onClick={(e) => e.stopPropagation()} style={{ cursor: 'grab', display: 'flex', alignItems: 'center', padding: '4px', color: 'var(--text-muted)' }}>
            <GripVertical size={16} />
          </div>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Award size={16} color="#10b981" />
          </div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{cert.name || 'New Certification'}</p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{cert.issuer || 'Issuer'}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={(e) => { e.stopPropagation(); dispatch({ type: 'REMOVE_CERTIFICATION', payload: cert.id }); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-error)', padding: 4 }}>
            <Trash2 size={15} />
          </button>
          {expanded === cert.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>
      <AnimatePresence>
        {expanded === cert.id && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ padding: '0 16px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            <InputField id={`cname-${cert.id}`} label="Certification Name" placeholder="AWS Solutions Architect"
              value={cert.name} onChange={(e) => {
                dispatch({ type: 'UPDATE_CERTIFICATION', payload: { ...cert, name: e.target.value } });
                const errKey = `cert_name_${cert.id}`;
                if (errors[errKey]) setErrors((prev: any) => { const n = { ...prev }; delete n[errKey]; return n; });
              }} 
              error={errors[`cert_name_${cert.id}`]}
              required />
            <InputField id={`cissuer-${cert.id}`} label="Issuing Organization" placeholder="Amazon Web Services"
              value={cert.issuer} onChange={(e) => {
                dispatch({ type: 'UPDATE_CERTIFICATION', payload: { ...cert, issuer: e.target.value } });
                const errKey = `cert_issuer_${cert.id}`;
                if (errors[errKey]) setErrors((prev: any) => { const n = { ...prev }; delete n[errKey]; return n; });
              }} 
              error={errors[`cert_issuer_${cert.id}`]}
              required />
             <InputField id={`cyear-${cert.id}`} label="Year" placeholder="2024"
               value={cert.year} onChange={(e) => {
                 const val = e.target.value;
                 dispatch({ type: 'UPDATE_CERTIFICATION', payload: { ...cert, year: val } });
                 const errKey = `cert_year_${cert.id}`;
                 const currentYear = 2026;
                 
                 if (!val) {
                   setErrors((prev: any) => ({ ...prev, [errKey]: 'Required' }));
                 } else if (parseInt(val) > currentYear) {
                   setErrors((prev: any) => ({ ...prev, [errKey]: 'Cannot be in future' }));
                 } else if (errors[errKey]) {
                   setErrors((prev: any) => { const n = { ...prev }; delete n[errKey]; return n; });
                 }
               }} 
               error={errors[`cert_year_${cert.id}`]}
               required />
             <InputField id={`clink-${cert.id}`} label="Certificate Link" placeholder="https://..."
               value={cert.link} onChange={(e) => {
                 const val = e.target.value;
                 dispatch({ type: 'UPDATE_CERTIFICATION', payload: { ...cert, link: val } });
                 const errKey = `cert_link_${cert.id}`;
                 
                 if (!val) {
                   setErrors((prev: any) => ({ ...prev, [errKey]: 'Required' }));
                 } else if (!val.startsWith('https://')) {
                   setErrors((prev: any) => ({ ...prev, [errKey]: 'Link must start with https://' }));
                 } else if (errors[errKey]) {
                   setErrors((prev: any) => { const n = { ...prev }; delete n[errKey]; return n; });
                 }
               }} 
               error={errors[`cert_link_${cert.id}`]}
               required />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Certifications() {
  const { resumeData, dispatch, errors, setErrors } = useResume();
  const [expanded, setExpanded] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addCert = () => {
    const c = emptyCert();
    dispatch({ type: 'ADD_CERTIFICATION', payload: c });
    setExpanded(c.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = resumeData.certifications.findIndex((i) => i.id === active.id);
      const newIndex = resumeData.certifications.findIndex((i) => i.id === over.id);
      dispatch({ type: 'REORDER_SECTION', payload: { section: 'certifications', startIndex: oldIndex, endIndex: newIndex } });
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
        title="Certifications"
        description="Add professional certifications. Drag to reorder."
        action={
          <button className="btn-primary" onClick={addCert} style={{ padding: '8px 16px', fontSize: '13px' }}>
            <Plus size={14} /> Add Certification
          </button>
        }
      >
        {resumeData.certifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
            <Award size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
            <p style={{ fontSize: '14px' }}>No certifications added yet.</p>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={resumeData.certifications.map((c) => c.id)} strategy={verticalListSortingStrategy}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <AnimatePresence>
                  {resumeData.certifications.map((cert) => (
                    <SortableCertItem
                      key={cert.id}
                      cert={cert}
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

        {/* Smart Suggestions */}
        <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px dashed var(--border-color)' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Award size={13} /> Recommended Certifications:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {SUGGESTED_CERTS.filter(cert => !resumeData.certifications.some(c => c.name.toLowerCase() === cert.name.toLowerCase())).map((cert) => (
              <button
                key={cert.name}
                onClick={() => {
                  const newCert = emptyCert(cert.name, cert.issuer);
                  dispatch({ type: 'ADD_CERTIFICATION', payload: newCert });
                  setExpanded(newCert.id);
                }}
                style={{
                  padding: '6px 14px',
                  background: 'rgba(16,185,129,0.04)',
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
                  e.currentTarget.style.borderColor = 'var(--color-success)';
                  e.currentTarget.style.color = 'var(--color-success)';
                  e.currentTarget.style.background = 'rgba(16,185,129,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.background = 'rgba(16,185,129,0.04)';
                }}
              >
                + {cert.name}
              </button>
            ))}
          </div>
        </div>
      </SectionCard>
    </motion.div>
  );
}
