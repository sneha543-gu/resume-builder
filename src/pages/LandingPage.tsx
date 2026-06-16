import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Sparkles, FileText, Download, Eye,
  CheckCircle, Zap, Shield, Star, Upload
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import type { TemplateId } from '../types/resume';
import { useResume } from '../context/ResumeContext';
import { getDummyDataForTemplate } from '../constants/templateDummyData';
import AITailorModal from '../components/ai/AITailorModal';

// Template components for landing showcase
import ModernMinimal from '../templates/ModernMinimal';
import CorporatePro from '../templates/CorporatePro';
import CreativeDesigner from '../templates/CreativeDesigner';
import ElegantClassic from '../templates/ElegantClassic';

const features = [
  { icon: <Zap size={22} />, title: 'Built in Minutes', desc: 'Fill out our guided form and have a polished resume ready in under 10 minutes.' },
  { icon: <Eye size={22} />, title: 'Live Preview', desc: 'Watch your resume update in real-time as you type. No surprises.' },
  { icon: <FileText size={22} />, title: '4 Pro Templates', desc: 'Choose from Modern, Corporate, Creative, or Classic layouts.' },
  { icon: <Download size={22} />, title: 'PDF Download', desc: 'Download a crisp, print-ready PDF with one click.' },
  { icon: <Shield size={22} />, title: 'Private & Secure', desc: 'Your data stays in your browser. Nothing is sent to our servers.' },
  { icon: <CheckCircle size={22} />, title: 'ATS Friendly', desc: 'All templates are designed to pass Applicant Tracking Systems.' },
];

const stats = [
  { value: '50K+', label: 'Resumes Created' },
  { value: '4.9★', label: 'User Rating' },
  { value: '98%', label: 'Interview Success' },
  { value: '4', label: 'Pro Templates' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function LandingPage() {
  const navigate = useNavigate();
  const { setSelectedTemplate, setCurrentStep } = useResume();
  const [isTailorModalOpen, setIsTailorModalOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const handleTemplateSelect = (id: string) => {
    setSelectedTemplate(id as TemplateId);
    setCurrentStep(0);
    navigate('/builder');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        id="home"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 80,
          overflow: 'hidden',
        }}
      >
        {/* Animated blobs */}
        <div className="blob-container">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>

        {/* Subtle grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, opacity: 0.03,
          backgroundImage: 'linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px',
              background: 'rgba(99,102,241,0.1)',
              border: '1px solid rgba(99,102,241,0.25)',
              borderRadius: 999,
              marginBottom: 24,
            }}
          >
            <Star size={13} color="#f97316" fill="#f97316" />
            <span style={{ fontSize: 13, color: 'var(--color-primary)', fontWeight: 600 }}>
              Trusted by 50,000+ professionals
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Build Your{' '}
            <span className="gradient-text">Professional Resume</span>
            {' '}in Minutes
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ maxWidth: 600, margin: '20px auto 0' }}
          >
            Create stunning, ATS-friendly resumes with our intelligent builder.
            Choose from beautiful templates and download your perfect resume as a PDF — for free.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 36 }}
          >
            <motion.button
              className="btn-primary"
              id="cta-create-resume"
              onClick={() => navigate('/templates')}
              whileTap={{ scale: 0.97 }}
              style={{ fontSize: '16px', padding: '14px 32px' }}
            >
              <Sparkles size={18} />
              Choose a Template
              <ArrowRight size={16} />
            </motion.button>

            <motion.button
              className="btn-secondary"
              id="cta-tailor-resume"
              onClick={() => navigate('/keep-format')}
              whileTap={{ scale: 0.97 }}
              style={{ 
                fontSize: '16px', 
                padding: '14px 32px',
                background: 'rgba(99, 102, 241, 0.06)',
                borderWidth: '2px',
                borderColor: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontWeight: 700
              }}
            >
              <Upload size={18} />
              Import & Keep My Format
            </motion.button>

          </motion.div>

        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '32px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 24, textAlign: 'center' }}>
          {stats.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>{s.value}</p>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: 4 }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Templates Preview (Moved to Top) ────────────────────────────── */}
      <section id="templates" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
              Choose Your Style
            </p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--text-primary)' }}>
              Professional Resume Templates
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: 12, maxWidth: 600, margin: '12px auto 0' }}>
              Pick a design and start building. All templates are 100% free and ATS-optimized.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
            {[
              { id: 'modern-minimal' as TemplateId, name: 'Modern Minimal', desc: 'Clean, sleek, and focused on readability.', accentColor: '#00897b', component: <ModernMinimal data={getDummyDataForTemplate('modern-minimal')} /> },
              { id: 'corporate-pro' as TemplateId, name: 'Corporate Pro', desc: 'Traditional two-column professional layout.', accentColor: '#6366f1', component: <CorporatePro data={getDummyDataForTemplate('corporate-pro')} /> },
              { id: 'creative-designer' as TemplateId, name: 'Creative Designer', desc: 'Bold colors and dynamic modern layout.', accentColor: '#6366f1', component: <CreativeDesigner data={getDummyDataForTemplate('creative-designer')} /> },
              { id: 'elegant-classic' as TemplateId, name: 'Elegant Classic', desc: 'Timeless, centered and sophisticated.', accentColor: '#b45309', component: <ElegantClassic data={getDummyDataForTemplate('elegant-classic')} /> },
            ].map((t) => (
              <motion.div
                key={t.name}
                whileHover={{ y: -12 }}
                className="card"
                style={{ 
                  overflow: 'hidden', 
                  cursor: 'pointer', 
                  background: 'var(--bg-card)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onClick={() => handleTemplateSelect(t.id)}
              >
                <div style={{ 
                  height: 380, 
                  background: '#f1f5f9', 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    width: 794,
                    minHeight: 1123,
                    transform: 'scale(0.355)',
                    transformOrigin: 'top left',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                  }}>
                    {t.component}
                  </div>
                  {/* Accent color strip */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: t.accentColor }} />
                </div>
                <div style={{ padding: 24, borderTop: '1px solid var(--border-color)', background: 'var(--bg-card)', flexGrow: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.accentColor }} />
                    <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{t.name}</h3>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────────────── */}
      <section id="features" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
              Why ResumeCraft?
            </p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--text-primary)' }}>
              Everything you need to land the job
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={itemVariants}
                className="card card-elevated"
                style={{ padding: 28 }}
                whileHover={{ y: -4 }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.12))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-primary)', marginBottom: 16,
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* ── About / How it Works ─────────────────────────────────────────── */}
      <section id="about" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
                About ResumeCraft
              </p>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24 }}>
                We help you land your dream job with confidence.
              </h2>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 24 }}>
                ResumeCraft was born out of the frustration of dealing with complex, expensive, and privacy-invasive resume builders. We believe that everyone deserves a high-quality resume without hidden fees or data collection.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  '100% Free & Open Source forever',
                  'No registration or login required',
                  'Your data never leaves your browser',
                  'Instant high-quality PDF downloads'
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e' }}>
                      <CheckCircle size={14} />
                    </div>
                    <span style={{ fontSize: 15, color: 'var(--text-secondary)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ position: 'relative' }}
            >
              <div style={{
                width: '100%',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-card)'
              }}>
                <img 
                  src="/about-hero-v2.png" 
                  alt="Professional Success Illustration" 
                  style={{ width: '100%', height: 'auto', display: 'block', transform: 'scale(1.02)' }} 
                />
              </div>
              
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────────────────────── */}
      <section style={{ padding: '64px 24px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{
            maxWidth: 800, margin: '0 auto', textAlign: 'center',
            padding: '56px 40px',
            background: 'var(--grad-primary)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: '0 20px 60px rgba(99,102,241,0.4)',
          }}
        >
          <Sparkles size={36} color="rgba(255,255,255,0.8)" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#fff', marginBottom: 16 }}>
            Ready to land your dream job?
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)', marginBottom: 32, lineHeight: 1.7 }}>
            Join thousands of professionals who built their career with ResumeCraft.
          </p>
          <motion.button
            className="btn-primary"
            onClick={() => navigate('/templates')}
            whileTap={{ scale: 0.97 }}
            style={{ background: '#fff', color: '#6366f1', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', fontSize: '16px', padding: '14px 36px' }}
          >
            <Sparkles size={18} />
            Pick Your Template
            <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </section>

      <AITailorModal isOpen={isTailorModalOpen} onClose={() => setIsTailorModalOpen(false)} />
      <Footer />
    </div>
  );
}
