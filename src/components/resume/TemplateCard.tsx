import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { ResumeTemplate, TemplateId } from '../../types/resume';
import { useResume } from '../../context/ResumeContext';
import ResumePreview from './ResumePreview';

interface Props {
  template: ResumeTemplate;
  onSelect: (id: TemplateId) => void;
}

export default function TemplateCard({ template, onSelect }: Props) {
  const { selectedTemplate } = useResume();
  const isSelected = selectedTemplate === template.id;

  return (
    <motion.div
      className={`template-card ${isSelected ? 'selected' : ''}`}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(template.id)}
      style={{ background: 'var(--bg-card)' }}
    >
      {/* Preview area */}
      <div style={{
        height: 280,
        overflow: 'hidden',
        background: '#f8fafc',
        position: 'relative',
        borderBottom: '1px solid var(--border-color)',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', pointerEvents: 'none' }}>
          <ResumePreview templateId={template.id} scale={0.38} />
        </div>

        {/* Selected overlay */}
        {isSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(var(--color-primary-rgb), 0.08)',
              display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end',
              padding: 12,
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'var(--color-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(var(--color-primary-rgb), 0.5)',
              }}
            >
              <Check size={14} color="#fff" />
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Card info */}
      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{template.name}</p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: 2 }}>{template.description}</p>
          </div>
          <div style={{
            width: 12, height: 12, borderRadius: '50%',
            background: template.accentColor,
            boxShadow: `0 0 8px ${template.accentColor}60`,
          }} />
        </div>
        <motion.button
          className={isSelected ? 'btn-primary' : 'btn-secondary'}
          whileTap={{ scale: 0.97 }}
          onClick={(e) => { e.stopPropagation(); onSelect(template.id); }}
          style={{ width: '100%', justifyContent: 'center', marginTop: 12, padding: '8px', fontSize: '13px' }}
        >
          {isSelected ? '✓ Selected' : 'Use Template'}
        </motion.button>
      </div>
    </motion.div>
  );
}
