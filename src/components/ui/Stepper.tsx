import { motion } from 'framer-motion';
import { FORM_STEPS } from '../../types/resume';
import {
  User, FileText, GraduationCap, Briefcase,
  Zap, Code, Award, Globe, Check
} from 'lucide-react';

const ICONS: Record<string, React.ReactNode> = {
  User: <User size={14} />, FileText: <FileText size={14} />,
  GraduationCap: <GraduationCap size={14} />, Briefcase: <Briefcase size={14} />,
  Zap: <Zap size={14} />, Code: <Code size={14} />,
  Award: <Award size={14} />, Globe: <Globe size={14} />,
};

interface StepperProps {
  currentStep: number;
  onStepClick?: (index: number) => void;
}

export default function Stepper({ currentStep, onStepClick }: StepperProps) {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div style={{ display: 'flex', alignItems: 'center', minWidth: 'max-content', gap: 0 }}>
        {FORM_STEPS.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={step.id} style={{ display: 'flex', alignItems: 'center' }}>
              {/* Circle */}
              <button
                onClick={() => onStepClick?.(index)}
                disabled={!onStepClick}
                title={step.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  cursor: onStepClick ? 'pointer' : 'default',
                  padding: '4px 8px',
                }}
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    backgroundColor: isCompleted ? 'var(--color-primary)' : isActive ? 'var(--color-primary)' : 'var(--bg-card)',
                    borderColor: isCompleted || isActive ? 'var(--color-primary)' : 'var(--border-color)',
                  }}
                  transition={{ duration: 0.25 }}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: '2px solid',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isCompleted || isActive ? '#fff' : 'var(--text-muted)',
                    boxShadow: isActive ? '0 0 0 4px rgba(99,102,241,0.2)' : 'none',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {isCompleted ? <Check size={14} /> : ICONS[step.icon]}
                </motion.div>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--color-primary)' : isCompleted ? 'var(--text-secondary)' : 'var(--text-muted)',
                    whiteSpace: 'nowrap',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  {step.label}
                </span>
              </button>

              {/* Connector */}
              {index < FORM_STEPS.length - 1 && (
                <motion.div
                  className="stepper-connector"
                  animate={{ backgroundColor: index < currentStep ? 'var(--color-primary)' : 'var(--border-color)' }}
                  transition={{ duration: 0.4 }}
                  style={{ minWidth: 32 }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
