import { motion } from 'framer-motion';

interface SectionCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export default function SectionCard({
  title,
  description,
  children,
  className = '',
  action,
}: SectionCardProps) {
  return (
    <motion.div
      className={`card ${className}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ padding: '32px' }}
    >
      {(title || action) && (
        <div className="flex items-start justify-between mb-4">
          <div>
            {title && <h3 className="section-title" style={{ marginBottom: description ? '4px' : 0 }}>{title}</h3>}
            {description && (
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{description}</p>
            )}
          </div>
          {action && <div className="ml-4 shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </motion.div>
  );
}
