import { useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';const TEMPLATE_THEMES: Record<string, { primary: string; secondary: string }> = {
  'minimalist-clean': { primary: '#6366f1', secondary: '#4f46e5' },
  'modern-teal': { primary: '#0d9488', secondary: '#0f766e' },
  'executive-data': { primary: '#334155', secondary: '#1e293b' },
  'blue-professional': { primary: '#2563eb', secondary: '#1e40af' },
  'classic-navy': { primary: '#1e293b', secondary: '#0f172a' },
  'professional-navy': { primary: '#1a2b5a', secondary: '#0d1f45' },
  'tech-sidebar': { primary: '#0d6b7e', secondary: '#0a3d52' },
  'aosc-premium': { primary: '#2a3b61', secondary: '#0f172a' },
};

export default function ThemeHandler() {
  const { selectedTemplate } = useResume();

  useEffect(() => {
    const theme = TEMPLATE_THEMES[selectedTemplate];
    if (!theme || !theme.primary || !theme.secondary) return;

    const root = document.documentElement;
    
    // Update main colors
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-primary-dark', theme.secondary);
    root.style.setProperty('--color-primary-light', `${theme.primary}ee`);
    root.style.setProperty('--color-secondary', theme.secondary);
    
    // Update gradients
    root.style.setProperty('--grad-primary', `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`);
    
    // Update glows/shadows
    const rgb = hexToRgb(theme.primary);
    if (rgb) {
      root.style.setProperty('--color-primary-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
      root.style.setProperty('--shadow-glow', `0 0 32px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25)`);
    }

  }, [selectedTemplate]);

  return null;
}

function hexToRgb(hex: string) {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  return { r, g, b };
}
