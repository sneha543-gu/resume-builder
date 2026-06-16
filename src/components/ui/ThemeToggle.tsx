import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useResume();

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      aria-label="Toggle theme"
      style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        border: '1.5px solid var(--border-color)',
        background: 'var(--bg-card)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: isDark ? '#fbbf24' : 'var(--color-primary)',
        transition: 'all 0.2s',
        flexShrink: 0,
      }}
    >
      <motion.div
        key={isDark ? 'dark' : 'light'}
        initial={{ rotate: -30, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </motion.div>
    </motion.button>
  );
}
