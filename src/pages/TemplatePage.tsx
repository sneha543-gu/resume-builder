import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, Eye, MousePointer2 } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import Navbar from '../components/layout/Navbar';
import type { TemplateId, ResumeTemplate } from '../types/resume';
import { useState } from 'react';
import { getDummyDataForTemplate } from '../constants/templateDummyData';

// ── All 26 Template Imports ──
import ATSClassic from '../templates/ATSClassic';
import ModernMinimal from '../templates/ModernMinimal';
import CorporateBlue from '../templates/CorporateBlue';
import TechDark from '../templates/TechDark';
import ElegantSerif from '../templates/ElegantSerif';
import BoldImpact from '../templates/BoldImpact';
import CompactATS from '../templates/CompactATS';
import GreenFresh from '../templates/GreenFresh';
import MidnightPro from '../templates/MidnightPro';
import SlateModern from '../templates/SlateModern';
import PurplePro from '../templates/PurplePro';
import OrangeModern from '../templates/OrangeModern';
import TimelineClean from '../templates/TimelineClean';
import ExecutiveDark from '../templates/ExecutiveDark';
import MinimalLines from '../templates/MinimalLines';
import PhotoTeal from '../templates/PhotoTeal';
import PhotoNavy from '../templates/PhotoNavy';
import PhotoWarm from '../templates/PhotoWarm';
import PhotoSplit from '../templates/PhotoSplit';
import PhotoCorpPro from '../templates/PhotoCorpPro';
import CorporatePro from '../templates/CorporatePro';
import CreativeDesigner from '../templates/CreativeDesigner';
import DarkSidebar from '../templates/DarkSidebar';
import ElegantClassic from '../templates/ElegantClassic';
import ExecutiveElite from '../templates/ExecutiveElite';
import AOSCNavV2 from '../templates/AOSCNavV2';
import AOSCPortfolio from '../templates/AOSCPortfolio';
import AOSCPortfolioShaurya from '../templates/AOSCPortfolioShaurya';
import AOSCPortfolioSohit from '../templates/AOSCPortfolioSohit';
import AquaModern from '../templates/AquaModern';
import RoseGold from '../templates/RoseGold';
import ForestGreen from '../templates/ForestGreen';
import CrimsonClassic from '../templates/CrimsonClassic';
import AmberExecutive from '../templates/AmberExecutive';
import SkyBlueMinimal from '../templates/SkyBlueMinimal';
import CharcoalModern from '../templates/CharcoalModern';
import VioletPro from '../templates/VioletPro';
import MonoClean from '../templates/MonoClean';
import TealTimeline from '../templates/TealTimeline';
import DeepBlueTwoCol from '../templates/DeepBlueTwoCol';
import MintFresh from '../templates/MintFresh';
import RubyPro from '../templates/RubyPro';
import PhotoRose from '../templates/PhotoRose';
import PhotoForest from '../templates/PhotoForest';
import PhotoMidnight from '../templates/PhotoMidnight';
import PhotoViolet from '../templates/PhotoViolet';
import PhotoAmber from '../templates/PhotoAmber';
import PhotoArctic from '../templates/PhotoArctic';
import PhotoOlive from '../templates/PhotoOlive';
import PhotoCrimson from '../templates/PhotoCrimson';

const TEMPLATES: ResumeTemplate[] = [
  // ── No Photo Templates ──
  { id: 'ats-classic',      name: 'ATS Classic',       description: 'Pure single-column ATS-optimized format. Maximum compatibility.', accentColor: '#222222', thumbnail: '' },
  { id: 'modern-minimal',   name: 'Modern Minimal',    description: 'Two-column teal accent. Clean, contemporary design.', accentColor: '#00897b', thumbnail: '' },
  { id: 'corporate-blue',   name: 'Corporate Blue',    description: 'Navy header with bold blue accents. Perfect for corporate roles.', accentColor: '#1a3a6b', thumbnail: '' },
  { id: 'tech-dark',        name: 'Tech Dark',         description: 'Dark sidebar with teal highlights. Ideal for developers.', accentColor: '#1e1e2e', thumbnail: '' },
  { id: 'elegant-serif',    name: 'Elegant Serif',     description: 'Classic serif typography with burgundy accents. Academic & legal.', accentColor: '#722f37', thumbnail: '' },
  { id: 'bold-impact',      name: 'Bold Impact',       description: 'High-contrast red accents with strong visual hierarchy.', accentColor: '#e53935', thumbnail: '' },
  { id: 'compact-ats',      name: 'Compact ATS',       description: 'Ultra-dense layout. Pack maximum experience on one page.', accentColor: '#333333', thumbnail: '' },
  { id: 'green-fresh',      name: 'Green Fresh',       description: 'Light green sidebar with modern two-column layout.', accentColor: '#2e7d32', thumbnail: '' },
  { id: 'midnight-pro',     name: 'Midnight Pro',      description: 'Full dark theme with blue accents. Standout for tech companies.', accentColor: '#60a5fa', thumbnail: '' },
  { id: 'slate-modern',     name: 'Slate Modern',      description: 'Slate gray two-column layout. Clean and versatile.', accentColor: '#475569', thumbnail: '' },
  { id: 'purple-pro',       name: 'Purple Pro',        description: 'Deep purple sidebar. Premium executive feel.', accentColor: '#4a148c', thumbnail: '' },
  { id: 'orange-modern',    name: 'Orange Modern',     description: 'Vibrant orange accents. Creative & modern.', accentColor: '#f57c00', thumbnail: '' },
  { id: 'timeline-clean',   name: 'Timeline Clean',    description: 'Visual timeline for experience. Unique and distinctive.', accentColor: '#616161', thumbnail: '' },
  { id: 'executive-dark',   name: 'Executive Dark',    description: 'Charcoal & gold. Luxury feel for senior positions.', accentColor: '#c9a84c', thumbnail: '' },
  { id: 'minimal-lines',    name: 'Minimal Lines',     description: 'Ultra-minimal typography-only design. For creative professionals.', accentColor: '#888888', thumbnail: '' },
  { id: 'corporate-pro',    name: 'Corporate Pro',     description: 'Indigo accents with skill progress bars. Modern corporate.', accentColor: '#6366f1', thumbnail: '' },
  { id: 'dark-sidebar',     name: 'Dark Sidebar',      description: 'Dark left panel with white main area. Professional tech look.', accentColor: '#1e293b', thumbnail: '' },
  { id: 'elegant-classic',  name: 'Elegant Classic',   description: 'Traditional layout with refined typography and subtle accents.', accentColor: '#b45309', thumbnail: '' },
  { id: 'executive-elite',  name: 'Executive Elite',   description: 'Premium executive format for C-suite and senior leadership.', accentColor: '#0f172a', thumbnail: '' },
  // ── With Photo Templates ──
  { id: 'photo-teal',       name: 'Photo Teal',        description: 'Teal sidebar with large circular photo. Professional with personality.', accentColor: '#00695c', thumbnail: '' },
  { id: 'photo-navy',       name: 'Photo Navy',        description: 'Navy header with photo. Classic corporate with photo.', accentColor: '#1a237e', thumbnail: '' },
  { id: 'photo-warm',       name: 'Photo Warm',        description: 'Warm beige sidebar with circular photo. Friendly & professional.', accentColor: '#4e342e', thumbnail: '' },
  { id: 'photo-split',      name: 'Photo Split',       description: 'Creative split header with photo. Modern and eye-catching.', accentColor: '#00bcd4', thumbnail: '' },
  { id: 'photo-corp-pro',   name: 'Photo Corporate',   description: 'Classic corporate layout with header photo. Traditional choice.', accentColor: '#c9a84c', thumbnail: '' },
  { id: 'creative-designer',name: 'Creative Designer', description: 'Gradient header with photo. Great for designers & creatives.', accentColor: '#6366f1', thumbnail: '' },
  // ── AOSC Templates ──
  { id: 'aosc-nav-v2',              name: 'AOSC Nav V2',           description: 'Official AOSC Technologies branded template with photo.', accentColor: '#1a2051', thumbnail: '/temp9.png' },
  { id: 'aosc-portfolio',           name: 'AOSC Classic Single-Column', description: 'Clean single-column · Centered header · Navy & Blue accents · Frontend style.', accentColor: '#1E3A5F', thumbnail: '' },
  { id: 'aosc-portfolio-shaurya',   name: 'AOSC Modern Two-Column', description: 'Two-column · Navy sidebar · Stats bar · Technical arsenal grid · CRM style.', accentColor: '#1E3A5F', thumbnail: '' },
  { id: 'aosc-portfolio-sohit',     name: 'AOSC Premium Multi-Page',  description: 'Emoji badge stats · Expertise chips · Enterprise project cards · Power Platform style.', accentColor: '#2E6DA4', thumbnail: '' },
  // ── New No-Photo Templates ──
  { id: 'aqua-modern',      name: 'Aqua Modern',       description: 'Dual-column aqua/cyan gradient header. Clean and professional.', accentColor: '#0891b2', thumbnail: '' },
  { id: 'rose-gold',        name: 'Rose Gold',         description: 'Elegant serif style with rose & gold accents. Creative professionals.', accentColor: '#be185d', thumbnail: '' },
  { id: 'forest-green',     name: 'Forest Green',      description: 'Deep forest green header. Nature-inspired clean layout.', accentColor: '#166534', thumbnail: '' },
  { id: 'crimson-classic',  name: 'Crimson Classic',   description: 'Single-column ATS optimized with crimson accents. Bold & professional.', accentColor: '#9b1c1c', thumbnail: '' },
  { id: 'amber-executive',  name: 'Amber Executive',   description: 'Warm amber sidebar. Premium executive feel.', accentColor: '#92400e', thumbnail: '' },
  { id: 'sky-blue-minimal', name: 'Sky Blue Minimal',  description: 'Ultra-minimal single-column with sky blue accents. Clean & modern.', accentColor: '#0369a1', thumbnail: '' },
  { id: 'charcoal-modern',  name: 'Charcoal Modern',   description: 'Dark charcoal sidebar with cyan accents. Great for tech roles.', accentColor: '#1c1917', thumbnail: '' },
  { id: 'violet-pro',       name: 'Violet Pro',        description: 'Deep violet gradient sidebar. Premium and distinctive.', accentColor: '#4c1d95', thumbnail: '' },
  { id: 'mono-clean',       name: 'Mono Clean',        description: 'Pure black & white monochrome. Maximum ATS compatibility.', accentColor: '#111111', thumbnail: '' },
  { id: 'teal-timeline',    name: 'Teal Timeline',     description: 'Visual timeline layout with teal accents. Unique and modern.', accentColor: '#0f766e', thumbnail: '' },
  { id: 'deep-blue-two-col',name: 'Deep Blue',         description: 'Navy dark sidebar with skill bars. Data-driven and modern.', accentColor: '#0f172a', thumbnail: '' },
  { id: 'mint-fresh',       name: 'Mint Fresh',        description: 'Bright mint green accents. Fresh and vibrant design.', accentColor: '#065f46', thumbnail: '' },
  { id: 'ruby-pro',         name: 'Ruby Pro',          description: 'Deep ruby sidebar with diamond accents. Luxurious executive look.', accentColor: '#7f1d1d', thumbnail: '' },
  // ── New With-Photo Templates ──
  { id: 'photo-rose',       name: 'Photo Rose',        description: 'Rose sidebar with circular photo. Elegant & professional.', accentColor: '#be185d', thumbnail: '' },
  { id: 'photo-forest',     name: 'Photo Forest',      description: 'Dark forest green sidebar with photo. Nature-inspired.', accentColor: '#166534', thumbnail: '' },
  { id: 'photo-midnight',   name: 'Photo Midnight',    description: 'Dark midnight sidebar with blue photo border. Tech-premium.', accentColor: '#0f172a', thumbnail: '' },
  { id: 'photo-violet',     name: 'Photo Violet',      description: 'Violet sidebar with circular photo. Bold and creative.', accentColor: '#4c1d95', thumbnail: '' },
  { id: 'photo-amber',      name: 'Photo Amber',       description: 'Warm amber sidebar with photo. Warm and inviting.', accentColor: '#78350f', thumbnail: '' },
  { id: 'photo-arctic',     name: 'Photo Arctic',      description: 'Arctic blue light sidebar with photo. Clean and airy.', accentColor: '#0284c7', thumbnail: '' },
  { id: 'photo-olive',      name: 'Photo Olive',       description: 'Olive green sidebar with photo. Earthy and professional.', accentColor: '#365314', thumbnail: '' },
  { id: 'photo-crimson',    name: 'Photo Crimson',     description: 'Deep crimson sidebar with photo. Bold and dramatic.', accentColor: '#7f1d1d', thumbnail: '' },
];

export default function TemplatePage() {
  const { selectedTemplate, setSelectedTemplate, setCurrentStep } = useResume();
  const [fullscreen, setFullscreen] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (id: TemplateId) => {
    setSelectedTemplate(id);
    setCurrentStep(0);
    navigate('/builder');
  };

  const TemplateRenderer = ({ id, scale = 1 }: { id: TemplateId; scale?: number }) => {
    const props = { data: getDummyDataForTemplate(id), scale: 1 };
    const componentMap: Record<string, any> = {
      'ats-classic':       <ATSClassic {...props} />,
      'modern-minimal':    <ModernMinimal {...props} />,
      'corporate-blue':    <CorporateBlue {...props} />,
      'tech-dark':         <TechDark {...props} />,
      'elegant-serif':     <ElegantSerif {...props} />,
      'bold-impact':       <BoldImpact {...props} />,
      'compact-ats':       <CompactATS {...props} />,
      'green-fresh':       <GreenFresh {...props} />,
      'midnight-pro':      <MidnightPro {...props} />,
      'slate-modern':      <SlateModern {...props} />,
      'purple-pro':        <PurplePro {...props} />,
      'orange-modern':     <OrangeModern {...props} />,
      'timeline-clean':    <TimelineClean {...props} />,
      'executive-dark':    <ExecutiveDark {...props} />,
      'minimal-lines':     <MinimalLines {...props} />,
      'photo-teal':        <PhotoTeal {...props} />,
      'photo-navy':        <PhotoNavy {...props} />,
      'photo-warm':        <PhotoWarm {...props} />,
      'photo-split':       <PhotoSplit {...props} />,
      'photo-corp-pro':    <PhotoCorpPro {...props} />,
      'corporate-pro':     <CorporatePro {...props} />,
      'creative-designer': <CreativeDesigner {...props} />,
      'dark-sidebar':      <DarkSidebar {...props} />,
      'elegant-classic':   <ElegantClassic {...props} />,
      'executive-elite':   <ExecutiveElite {...props} />,
      'aosc-nav-v2':             <AOSCNavV2 {...props} />,
      'aosc-portfolio':          <AOSCPortfolio {...props} />,
      'aosc-portfolio-shaurya':  <AOSCPortfolioShaurya {...props} />,
      'aosc-portfolio-sohit':    <AOSCPortfolioSohit {...props} />,
      'aqua-modern':      <AquaModern {...props} />,
      'rose-gold':        <RoseGold {...props} />,
      'forest-green':     <ForestGreen {...props} />,
      'crimson-classic':  <CrimsonClassic {...props} />,
      'amber-executive':  <AmberExecutive {...props} />,
      'sky-blue-minimal': <SkyBlueMinimal {...props} />,
      'charcoal-modern':  <CharcoalModern {...props} />,
      'violet-pro':       <VioletPro {...props} />,
      'mono-clean':       <MonoClean {...props} />,
      'teal-timeline':    <TealTimeline {...props} />,
      'deep-blue-two-col':<DeepBlueTwoCol {...props} />,
      'mint-fresh':       <MintFresh {...props} />,
      'ruby-pro':         <RubyPro {...props} />,
      'photo-rose':       <PhotoRose {...props} />,
      'photo-forest':     <PhotoForest {...props} />,
      'photo-midnight':   <PhotoMidnight {...props} />,
      'photo-violet':     <PhotoViolet {...props} />,
      'photo-amber':      <PhotoAmber {...props} />,
      'photo-arctic':     <PhotoArctic {...props} />,
      'photo-olive':      <PhotoOlive {...props} />,
      'photo-crimson':    <PhotoCrimson {...props} />,
    };
    return (
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center', width: 794 }}>
        {componentMap[id] || componentMap['ats-classic']}
      </div>
    );
  };

  // Group labels for visual separation
  const noPhotoIds: TemplateId[] = [
    'ats-classic','modern-minimal','corporate-blue','tech-dark','elegant-serif','bold-impact','compact-ats','green-fresh','midnight-pro','slate-modern','purple-pro','orange-modern','timeline-clean','executive-dark','minimal-lines','corporate-pro','dark-sidebar','elegant-classic','executive-elite',
    'aqua-modern','rose-gold','forest-green','crimson-classic','amber-executive','sky-blue-minimal','charcoal-modern','violet-pro','mono-clean','teal-timeline','deep-blue-two-col','mint-fresh','ruby-pro'
  ];
  const photoIds: TemplateId[] = [
    'photo-teal','photo-navy','photo-warm','photo-split','photo-corp-pro','creative-designer',
    'photo-rose','photo-forest','photo-midnight','photo-violet','photo-amber','photo-arctic','photo-olive','photo-crimson'
  ];
  const aoscIds: TemplateId[] = ['aosc-nav-v2', 'aosc-portfolio', 'aosc-portfolio-shaurya', 'aosc-portfolio-sohit'];

  const TemplateGrid = ({ ids, label }: { ids: TemplateId[]; label: string }) => (
    <div style={{ marginBottom: 60 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 4, height: 20, background: 'var(--color-primary)', borderRadius: 2, display: 'inline-block' }} />
        {label}
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 24 }}>
        {ids.length} template{ids.length > 1 ? 's' : ''}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 32 }}>
        {TEMPLATES.filter(t => ids.includes(t.id)).map((tpl) => (
          <motion.div
            key={tpl.id}
            whileHover={{ y: -8 }}
            className={`template-card ${selectedTemplate === tpl.id ? 'selected' : ''}`}
            style={{
              background: 'var(--bg-card)',
              display: 'flex',
              flexDirection: 'column',
              borderWidth: selectedTemplate === tpl.id ? '2px' : '1px',
              borderColor: selectedTemplate === tpl.id ? 'var(--color-primary)' : 'var(--border-color)',
              boxShadow: selectedTemplate === tpl.id ? 'var(--shadow-glow)' : 'var(--shadow-sm)',
            }}
          >
            {/* Preview Area */}
            <div style={{
              height: 420,
              background: '#f1f5f9',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
              {tpl.thumbnail ? (
                <img
                  src={tpl.thumbnail}
                  alt={tpl.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                />
              ) : (
                <div style={{
                  width: 794 * 0.402,
                  height: 420,
                  position: 'relative',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 794,
                    minHeight: 1123,
                    transform: 'scale(0.402)',
                    transformOrigin: 'top left',
                    pointerEvents: 'none',
                  }}>
                    <TemplateRenderer id={tpl.id} scale={1} />
                  </div>
                </div>
              )}

              {/* Eye icon */}
              <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 8 }}>
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedTemplate(tpl.id); setFullscreen(true); }}
                  style={{ background: 'white', border: 'none', width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                  title="Full Preview"
                >
                  <Eye size={16} color="#64748b" />
                </button>
              </div>

              {/* Active badge */}
              {selectedTemplate === tpl.id && (
                <div style={{
                  position: 'absolute', top: 12, left: 12,
                  background: 'var(--color-primary)', color: 'white',
                  padding: '5px 10px', borderRadius: 20,
                  display: 'flex', alignItems: 'center', gap: 5,
                  fontSize: 11, fontWeight: 700,
                  boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
                }}>
                  <Check size={12} /> ACTIVE
                </div>
              )}

              {/* Accent color strip */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: tpl.accentColor }} />
            </div>

            {/* Card footer */}
            <div style={{ padding: '16px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: tpl.accentColor, flexShrink: 0 }} />
                <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', margin: 0 }}>{tpl.name}</h3>
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.5 }}>{tpl.description}</p>
              <button
                onClick={() => handleSelect(tpl.id)}
                className={selectedTemplate === tpl.id ? 'btn-primary' : 'btn-secondary'}
                style={{ width: '100%', justifyContent: 'center', marginTop: 'auto', padding: '9px' }}
              >
                {selectedTemplate === tpl.id ? (
                  <><Check size={16} /> Selected</>
                ) : (
                  <><MousePointer2 size={14} /> Select Template</>
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', paddingBottom: 100 }}>
      <Navbar />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '100px 24px 40px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
          <button onClick={() => navigate('/builder')} className="btn-secondary" style={{ padding: '8px 12px' }}>
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Choose Your Template
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginTop: 4 }}>
              {TEMPLATES.length} professional templates · ATS-friendly · Live preview with your data
            </p>
          </div>
        </div>

        {/* Template Groups */}
        <TemplateGrid ids={aoscIds} label="⭐ AOSC Technologies Templates" />
        <TemplateGrid ids={noPhotoIds} label="📄 Without Profile Photo — ATS Friendly" />
        <TemplateGrid ids={photoIds} label="🖼️ With Profile Photo" />
      </div>

      {/* Fixed bottom CTA */}
      <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 100 }}>
        <button
          onClick={() => navigate('/builder')}
          className="btn-primary"
          style={{ padding: '14px 28px', fontSize: 15, borderRadius: 50, boxShadow: '0 10px 25px rgba(99,102,241,0.4)' }}
        >
          Start Editing <Check size={18} />
        </button>
      </div>

      {/* Fullscreen Preview Modal */}
      {fullscreen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 300,
            background: 'rgba(15, 23, 42, 0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24,
          }}
          onClick={() => setFullscreen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              position: 'relative', maxWidth: 900, width: '100%',
              maxHeight: '92vh', overflow: 'auto',
              borderRadius: 12,
              background: '#f8fafc',
              padding: '56px 20px 40px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setFullscreen(false)}
              style={{
                position: 'absolute', top: 16, right: 16,
                background: 'white', border: 'none', width: 38, height: 38,
                borderRadius: '50%', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, zIndex: 10,
              }}
            >✕</button>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <TemplateRenderer id={selectedTemplate} scale={1} />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
