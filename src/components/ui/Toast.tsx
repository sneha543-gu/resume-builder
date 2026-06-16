import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

const ICONS = {
  success: <CheckCircle size={18} color="#10b981" />,
  error: <AlertCircle size={18} color="#ef4444" />,
  info: <Info size={18} color="#6366f1" />,
};

const COLORS = {
  success: '#10b981',
  error: '#ef4444',
  info: '#6366f1',
};

export default function Toast({ toasts, onDismiss }: ToastProps) {
  useEffect(() => {
    toasts.forEach((t) => {
      const timer = setTimeout(() => onDismiss(t.id), 4000);
      return () => clearTimeout(timer);
    });
  }, [toasts, onDismiss]);

  return (
    <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className="toast"
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            <div style={{
              width: 3,
              height: 40,
              borderRadius: 2,
              background: COLORS[toast.type],
              flexShrink: 0,
            }} />
            {ICONS[toast.type]}
            <span style={{ flex: 1, color: 'var(--text-primary)', fontSize: '14px' }}>
              {toast.message}
            </span>
            <button
              onClick={() => onDismiss(toast.id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text-muted)', padding: '2px', display: 'flex', alignItems: 'center',
              }}
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
import { useState, useCallback } from 'react';

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, dismiss };
}
