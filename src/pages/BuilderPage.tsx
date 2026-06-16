import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Eye, Edit, X, Sparkles, Trash2, Download } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { FORM_STEPS } from '../types/resume';
import Navbar from '../components/layout/Navbar';
import Stepper from '../components/ui/Stepper';
import ProgressBar from '../components/ui/ProgressBar';
import Toast, { useToast } from '../components/ui/Toast';
import ResumePreview from '../components/resume/ResumePreview';
import PersonalInfo from '../components/form-steps/PersonalInfo';
import ProfessionalSummary from '../components/form-steps/ProfessionalSummary';
import Education from '../components/form-steps/Education';
import WorkExperience from '../components/form-steps/WorkExperience';
import Skills from '../components/form-steps/Skills';
import Projects from '../components/form-steps/Projects';
import Certifications from '../components/form-steps/Certifications';
import Languages from '../components/form-steps/Languages';
import { fireConfetti } from '../utils/confetti';
import AIOptimizer from '../components/ai/AIOptimizer';
import AITailorModal from '../components/ai/AITailorModal';

const STEP_COMPONENTS = [
  PersonalInfo, ProfessionalSummary, Education, WorkExperience,
  Skills, Projects, Certifications, Languages,
];

export default function BuilderPage() {
  const { resumeData, dispatch, currentStep, setCurrentStep, setErrors } = useResume();
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [isDesktopPreviewHidden, setIsDesktopPreviewHidden] = useState(true);
  const [resumeOnly, setResumeOnly] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isTailorModalOpen, setIsTailorModalOpen] = useState(false);
  const { toasts, addToast, dismiss } = useToast();
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);

  // Auto-detect if localStorage has stale dummy data (non-empty but no real user intent)
  useEffect(() => {
    const saved = localStorage.getItem('resumecraft_user_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Known dummy names from templateDummyData.ts
        const dummyNames = [
          'ROHIT SHARMA', 'AARAV SHARMA', 'RITIKA SEN', 'MARCUS VANCE', 'JANE DOE', 'JOHN DOE', 'SARAH J',
          'ARJUN MEHTA', 'ANANYA IYER', 'KABIR MEHRA', 'NEHA GUPTA', 'ROHAN VERMA', 'VIKRAM MALHOTRA',
          'ADITYA ROY', 'DR. PRIYA NAIR', 'AMITABH BOSE', 'MEGHA SHARMA', 'ISHAN VERMA', 'NIDHI SINGH',
          'DEV KAPOOR', 'SUNEHA SHARMA', 'SHAURYA VERMA', 'SOHIT VERMA'
        ];
        const fullName = parsed?.personalInfo?.fullName || '';
        if (dummyNames.some(n => fullName.toUpperCase().includes(n.toUpperCase().split(' ')[0]))) {
          // Silently reset to blank — user hasn't entered real data
          dispatch({ type: 'RESET' });
          localStorage.removeItem('resumecraft_user_data');
        }
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  const handleClearForm = () => {
    dispatch({ type: 'RESET' });
    localStorage.removeItem('resumecraft_user_data');
    setCurrentStep(0);
    setErrors({});
    setShowClearConfirm(false);
    addToast('Form cleared! You can now fill in your details.', 'success');
  };

  const totalSteps = FORM_STEPS.length;
  const progress = ((currentStep) / (totalSteps - 1)) * 100;
  const StepComponent = STEP_COMPONENTS[currentStep];

  const scrollToError = (fieldId: string) => {
    const element = document.getElementById(fieldId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.focus();
    }
  };

  const validateStep = (stepIdx = currentStep, silent = false) => {
    const newErrors: Record<string, string> = {};
    let firstErrorField = '';

    if (stepIdx === 0) {
      const info = resumeData.personalInfo;
      if (!info.fullName.trim()) { 
        newErrors.fullName = 'Full Name is required'; 
        if (!firstErrorField) firstErrorField = 'fullName';
      } else if (info.fullName.trim().length < 3) {
        newErrors.fullName = 'Name must be at least 3 characters';
        if (!firstErrorField) firstErrorField = 'fullName';
      }

      if (!info.jobTitle.trim()) { 
        newErrors.jobTitle = 'Job Title is required'; 
        if (!firstErrorField) firstErrorField = 'jobTitle';
      } else if (info.jobTitle.trim().length < 2) {
        newErrors.jobTitle = 'Job Title is too short';
        if (!firstErrorField) firstErrorField = 'jobTitle';
      }

      if (!info.email.trim()) {
        newErrors.email = 'Email is required'; 
        if (!firstErrorField) firstErrorField = 'email';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) {
        newErrors.email = 'Invalid email address'; 
        if (!firstErrorField) firstErrorField = 'email';
      }

      if (!info.phone.trim()) {
        newErrors.phone = 'Phone number is required'; 
        if (!firstErrorField) firstErrorField = 'phone';
      } else if (info.phone.trim().length < 10) {
        newErrors.phone = 'Invalid phone number';
        if (!firstErrorField) firstErrorField = 'phone';
      }

      if (!info.address.trim()) {
        newErrors.address = 'Address/Location is required'; 
        if (!firstErrorField) firstErrorField = 'address';
      }

      if (info.website && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(info.website)) {
        newErrors.website = 'Invalid website URL';
        if (!firstErrorField) firstErrorField = 'website';
      }
      if (info.linkedIn && !info.linkedIn.includes('linkedin.com/in/')) {
        newErrors.linkedIn = 'Must be a valid LinkedIn profile link';
        if (!firstErrorField) firstErrorField = 'linkedIn';
      }
      if (info.github && !info.github.includes('github.com/')) {
        newErrors.github = 'Must be a valid GitHub profile link';
        if (!firstErrorField) firstErrorField = 'github';
      }

    } else if (stepIdx === 1) {
      if (!resumeData.summary.trim()) {
        newErrors.summary = 'Professional summary is required';
        if (!firstErrorField) firstErrorField = 'summary';
      } else if (resumeData.summary.trim().length < 50) {
        newErrors.summary = 'Summary should be at least 50 characters';
        if (!firstErrorField) firstErrorField = 'summary';
      }
    } else if (stepIdx === 2) {
      if (resumeData.education.length === 0) {
        if (!silent) addToast('Please add at least one education record.', 'error');
        return false;
      }
      resumeData.education.forEach(edu => {
        if (!edu.degree.trim()) { 
          newErrors[`edu_degree_${edu.id}`] = 'Required'; 
          if (!firstErrorField) firstErrorField = `degree-${edu.id}`;
        } else if (edu.degree.trim().length < 3) {
          newErrors[`edu_degree_${edu.id}`] = 'Too short';
          if (!firstErrorField) firstErrorField = `degree-${edu.id}`;
        }

        if (!edu.college.trim()) { 
          newErrors[`edu_college_${edu.id}`] = 'Required'; 
          if (!firstErrorField) firstErrorField = `college-${edu.id}`;
        } else if (edu.college.trim().length < 3) {
          newErrors[`edu_college_${edu.id}`] = 'Please enter a valid college name';
          if (!firstErrorField) firstErrorField = `college-${edu.id}`;
        }

        if (!edu.year.trim()) { 
          newErrors[`edu_year_${edu.id}`] = 'Required'; 
          if (!firstErrorField) firstErrorField = `year-${edu.id}`;
        }
        if (!edu.grade.trim()) { 
          newErrors[`edu_grade_${edu.id}`] = 'Required'; 
          if (!firstErrorField) firstErrorField = `grade-${edu.id}`;
        } else if (!isNaN(Number(edu.grade)) && (Number(edu.grade) > 10 || Number(edu.grade) < 0)) {
          newErrors[`edu_grade_${edu.id}`] = 'Max CGPA is 10.0';
          if (!firstErrorField) firstErrorField = `grade-${edu.id}`;
        }
      });
    } else if (stepIdx === 3) {
      if (resumeData.workExperience.length === 0) {
        if (!silent) addToast('Please add at least one work experience.', 'error');
        return false;
      }
      resumeData.workExperience.forEach(exp => {
        if (!exp.role.trim()) { 
          newErrors[`exp_role_${exp.id}`] = 'Required'; 
          if (!firstErrorField) firstErrorField = `role-${exp.id}`;
        } else if (exp.role.trim().length < 3) {
          newErrors[`exp_role_${exp.id}`] = 'Too short';
          if (!firstErrorField) firstErrorField = `role-${exp.id}`;
        }

        if (!exp.company.trim()) { 
          newErrors[`exp_company_${exp.id}`] = 'Required'; 
          if (!firstErrorField) firstErrorField = `company-${exp.id}`;
        } else if (exp.company.trim().length < 2) {
          newErrors[`exp_company_${exp.id}`] = 'Too short';
          if (!firstErrorField) firstErrorField = `company-${exp.id}`;
        }

        if (!exp.description.trim()) { 
          newErrors[`exp_desc_${exp.id}`] = 'Required'; 
          if (!firstErrorField) firstErrorField = `desc-${exp.id}`;
        } else if (exp.description.trim().length < 20) {
          newErrors[`exp_desc_${exp.id}`] = 'Please provide more details';
          if (!firstErrorField) firstErrorField = `desc-${exp.id}`;
        }

        const today = new Date();
        if (!exp.startDate) {
          newErrors[`exp_start_${exp.id}`] = 'Required';
          if (!firstErrorField) firstErrorField = `start-${exp.id}`;
        } else if (new Date(exp.startDate) > today) {
          newErrors[`exp_start_${exp.id}`] = 'Cannot be in future';
          if (!firstErrorField) firstErrorField = `start-${exp.id}`;
        }

        if (!exp.current && !exp.endDate) {
          newErrors[`exp_end_${exp.id}`] = 'Required';
          if (!firstErrorField) firstErrorField = `end-${exp.id}`;
        } else if (!exp.current && exp.endDate) {
          const start = new Date(exp.startDate);
          const end = new Date(exp.endDate);
          if (end < start) {
            newErrors[`exp_end_${exp.id}`] = 'Invalid range';
            if (!firstErrorField) firstErrorField = `end-${exp.id}`;
          } else if (end > today) {
            newErrors[`exp_end_${exp.id}`] = 'Cannot be in future';
            if (!firstErrorField) firstErrorField = `end-${exp.id}`;
          }
        }
      });
    } else if (stepIdx === 4) {
      if (resumeData.skills.length < 3) {
        if (!silent) addToast('Please add at least 3 skills to proceed.', 'error');
        return false;
      }
    } else if (stepIdx === 5) {
      if (resumeData.projects.length === 0) {
        if (!silent) addToast('Please add at least one project to proceed.', 'error');
        return false;
      }
      resumeData.projects.forEach(proj => {
        if (!proj.name.trim()) {
          newErrors[`proj_name_${proj.id}`] = 'Required';
          if (!firstErrorField) firstErrorField = `pname-${proj.id}`;
        } else if (proj.name.trim().length < 3) {
          newErrors[`proj_name_${proj.id}`] = 'Too short';
          if (!firstErrorField) firstErrorField = `pname-${proj.id}`;
        }

        if (!proj.techStack.trim()) {
          newErrors[`proj_tech_${proj.id}`] = 'Tech Stack is required';
          if (!firstErrorField) firstErrorField = `ptech-${proj.id}`;
        }

        if (!proj.description.trim()) {
          newErrors[`proj_desc_${proj.id}`] = 'Required';
          if (!firstErrorField) firstErrorField = `pdesc-${proj.id}`;
        } else if (proj.description.trim().length < 20) {
          newErrors[`proj_desc_${proj.id}`] = 'Please provide more details';
          if (!firstErrorField) firstErrorField = `pdesc-${proj.id}`;
        }
      });
    } else if (stepIdx === 6) {
      if (resumeData.certifications.length === 0) {
        if (!silent) addToast('Please add at least one certification to proceed.', 'error');
        return false;
      }
      resumeData.certifications.forEach(cert => {
        if (!cert.name.trim()) {
          newErrors[`cert_name_${cert.id}`] = 'Required';
          if (!firstErrorField) firstErrorField = `cname-${cert.id}`;
        }
        if (!cert.issuer.trim()) {
          newErrors[`cert_issuer_${cert.id}`] = 'Required';
          if (!firstErrorField) firstErrorField = `cissuer-${cert.id}`;
        }
        if (!cert.year.trim()) {
          newErrors[`cert_year_${cert.id}`] = 'Required';
          if (!firstErrorField) firstErrorField = `cyear-${cert.id}`;
        } else if (parseInt(cert.year) > 2026) {
          newErrors[`cert_year_${cert.id}`] = 'Cannot be in future';
          if (!firstErrorField) firstErrorField = `cyear-${cert.id}`;
        }
        if (!cert.link.trim()) {
          newErrors[`cert_link_${cert.id}`] = 'Required';
          if (!firstErrorField) firstErrorField = `clink-${cert.id}`;
        } else if (!cert.link.startsWith('https://')) {
          newErrors[`cert_link_${cert.id}`] = 'Link must start with https://';
          if (!firstErrorField) firstErrorField = `clink-${cert.id}`;
        }
      });
    } else if (stepIdx === 7) {
      resumeData.languages.forEach(lang => {
        if (!lang.name.trim()) {
          newErrors[`lang_name_${lang.id}`] = 'Required';
          if (!firstErrorField) firstErrorField = `lang_name_${lang.id}`;
        }
      });
    }

    if (!silent) setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      if (!silent) {
        addToast('Please fix the errors in required fields to proceed.', 'error');
        if (firstErrorField) {
          setTimeout(() => scrollToError(firstErrorField), 100);
        }
      }
      return false;
    }
    
    return true;
  };

  const goNext = () => {
    if (!validateStep()) return;
    
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Final audit: Check all steps before completion
      for (let i = 0; i < totalSteps; i++) {
        if (!validateStep(i)) {
          setCurrentStep(i);
          return;
        }
      }
      fireConfetti();
      addToast('Resume generated successfully!', 'success');
      setTimeout(() => navigate('/download'), 800);
    }
  };

  const goPrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const [zoom, setZoom] = useState(0.6);
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.3));
  const handleZoomReset = () => setZoom(0.6);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-page)', overflowY: 'auto', overflowX: 'hidden' }}>
      <Navbar />
      <Toast toasts={toasts} onDismiss={dismiss} />

      <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 64 }}>
        {/* ── Top bar ───────────────────────────────────────────────────── */}
        <div style={{
          background: 'var(--bg-card)',
          borderBottom: '1px solid var(--border-color)',
          padding: '16px 24px',
          position: 'sticky',
          top: 64,
          zIndex: 50,
        }}>
          <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Resume Builder
              </h1>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                {/* Mobile preview toggle */}
                <button
                  className="lg:hidden btn-secondary"
                  onClick={() => {
                    setResumeOnly(true);
                    setShowMobilePreview(true);
                  }}
                  style={{ padding: '8px 14px', fontSize: '13px' }}
                >
                  <Eye size={14} />
                  Preview
                </button>
                {/* Clear Form button */}
                <button
                  className="btn-secondary"
                  onClick={() => setShowClearConfirm(true)}
                  title="Clear all form data and start fresh"
                  style={{ padding: '8px 14px', fontSize: '13px', background: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.25)', color: '#ef4444', display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <Trash2 size={14} />
                  <span style={{ fontWeight: 600 }}>Clear Form</span>
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => navigate('/templates')}
                  style={{ padding: '8px 16px', fontSize: '13px', background: 'rgba(var(--color-primary-rgb), 0.08)', borderColor: 'rgba(var(--color-primary-rgb), 0.2)' }}
                >
                  <Edit size={14} style={{ color: 'var(--color-primary)' }} />
                  <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Change Template</span>
                </button>
                <button
                  className="btn-primary"
                  onClick={() => setIsTailorModalOpen(true)}
                  style={{ 
                    padding: '8px 16px', 
                    fontSize: '13px', 
                    boxShadow: '0 4px 12px rgba(99,102,241,0.2)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 6 
                  }}
                >
                  <Sparkles size={14} />
                  <span style={{ fontWeight: 600 }}>Tailor with AI</span>
                </button>
                <button
                  className="btn-primary"
                  onClick={() => navigate('/download')}
                  style={{ 
                    padding: '8px 16px', 
                    fontSize: '13px', 
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    boxShadow: '0 4px 12px rgba(16,185,129,0.25)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 6 
                  }}
                >
                  <Download size={14} />
                  <span style={{ fontWeight: 600 }}>Download PDF</span>
                </button>
              </div>
            </div>

            {/* Clear Confirm Modal */}
            <AnimatePresence>
              {showClearConfirm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: 'fixed', inset: 0, zIndex: 999,
                    background: 'rgba(0,0,0,0.55)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                  onClick={() => setShowClearConfirm(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={e => e.stopPropagation()}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 16,
                      padding: '28px 32px',
                      maxWidth: 420,
                      width: '90%',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                      display: 'flex', flexDirection: 'column', gap: 16,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(239,68,68,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Trash2 size={18} color="#ef4444" />
                      </div>
                      <div>
                        <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Clear all form data?</p>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>This will remove all fields and let you start fresh. This cannot be undone.</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                      <button
                        className="btn-secondary"
                        onClick={() => setShowClearConfirm(false)}
                        style={{ padding: '8px 20px', fontSize: '13px' }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleClearForm}
                        style={{
                          padding: '8px 20px', fontSize: '13px', fontWeight: 700,
                          background: '#ef4444', color: '#fff', border: 'none',
                          borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#dc2626')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#ef4444')}
                      >
                        <Trash2 size={14} /> Yes, Clear All
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            <ProgressBar value={progress} label={`Step ${currentStep + 1} of ${totalSteps}: ${FORM_STEPS[currentStep].label}`} />
          </div>
        </div>

        {/* ── Stepper ────────────────────────────────────────────────────── */}
        <div style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', padding: '12px 24px', overflowX: 'auto', position: 'sticky', top: 140, zIndex: 40 }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <Stepper 
              currentStep={currentStep} 
              onStepClick={(step) => {
                if (step > currentStep) {
                  // Check all steps from 0 up to target step
                  for (let i = 0; i < step; i++) {
                    if (!validateStep(i, false)) {
                      setCurrentStep(i);
                      return;
                    }
                  }
                }
                setCurrentStep(step);
              }} 
            />
          </div>
        </div>

        {/* ── Main content ───────────────────────────────────────────────── */}
        <div style={{ maxWidth: 1400, margin: '0 auto', width: '100%', padding: '24px 24px 100px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }} className="lg:grid-cols-[1fr_420px]">
            {/* Form Panel */}
            <div ref={formRef} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <StepComponent />
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8 }}>
                <motion.button
                  className="btn-secondary"
                  onClick={goPrev}
                  disabled={currentStep === 0}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    opacity: currentStep === 0 ? 0.4 : 1,
                    cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                    pointerEvents: currentStep === 0 ? 'none' : 'auto',
                  }}
                >
                  <ChevronLeft size={16} /> Previous
                </motion.button>

                <span style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 12 }}>
                  {currentStep + 1} / {totalSteps}
                  {currentStep < totalSteps - 1 && (
                    <button
                      onClick={() => navigate('/download')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-success)',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}
                      title="Directly go to final preview & download"
                    >
                      <Download size={12} /> Skip to Download
                    </button>
                  )}
                </span>

                <motion.button
                  className="btn-primary"
                  onClick={goNext}
                  whileTap={{ scale: 0.97 }}
                  id="builder-next-btn"
                >
                  {currentStep === totalSteps - 1 ? (
                    <>Submit & View <ArrowRight size={16} /></>
                  ) : (
                    <>Next <ChevronRight size={16} /></>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Live Preview Panel — hidden on mobile unless toggled */}
            <AnimatePresence>
              {(showMobilePreview || !isDesktopPreviewHidden) && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`${showMobilePreview ? 'fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4' : 'hidden lg:block'}`}
                >
                    <div style={{
                      position: showMobilePreview ? 'relative' : 'sticky',
                      top: showMobilePreview ? 'auto' : 160,
                      width: showMobilePreview ? '100%' : 'auto',
                      maxWidth: showMobilePreview ? 500 : 'none',
                      maxHeight: showMobilePreview ? '92vh' : 'none',
                      overflowY: showMobilePreview ? 'auto' : 'visible',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-lg)',
                      boxShadow: 'var(--shadow-lg)',
                    }}>
                      {/* Close Button at Top Right for Mobile Preview */}
                      {showMobilePreview && (
                        <button 
                          onClick={() => {
                            setShowMobilePreview(false);
                            setResumeOnly(false); // Reset
                          }}
                          style={{
                            position: 'absolute', top: 12, right: 12, zIndex: 110,
                            width: 32, height: 32, borderRadius: '50%',
                            background: 'rgba(239,68,68,0.1)', border: 'none', color: '#ef4444',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                        >
                          <X size={18} />
                        </button>
                      )}

                      {/* ATS Scorer Widget - Hidden in resumeOnly mode */}
                      {!resumeOnly && (
                        <div style={{
                          padding: '16px 20px',
                          background: 'linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.05), rgba(var(--color-primary-rgb), 0.08))',
                          borderBottom: '1px solid var(--border-color)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 16
                        }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Sparkles size={14} color="var(--color-primary)" />
                          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>ATS Score</span>
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Optimization Strength</span>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ 
                          width: 52, height: 52, borderRadius: '50%', 
                          background: 'var(--bg-page)', display: 'flex', alignItems: 'center', 
                          justifyContent: 'center', position: 'relative',
                          border: '2px solid var(--border-color)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}>
                          <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-primary)' }}>
                            {(() => {
                              let score = 0;
                              const p = resumeData?.personalInfo;
                              const summary = resumeData?.summary;
                              const workExperience = resumeData?.workExperience || [];
                              const education = resumeData?.education || [];
                              const skills = resumeData?.skills || [];

                              if (p?.fullName) score += 10;
                              if (p?.email && p?.phone) score += 10;
                              if (p?.profilePhoto) score += 5;
                              if (summary && summary.length > 50) score += 15;
                              if (workExperience.length >= 2) score += 30;
                              else if (workExperience.length === 1) score += 15;
                              if (education.length >= 1) score += 15;
                              if (skills.length >= 5) score += 15;
                              return Math.min(score, 100);
                            })()}%
                          </span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          <div style={{ width: 120, height: 6, background: 'var(--border-color)', borderRadius: 10, overflow: 'hidden' }}>
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min((() => {
                                let score = 0;
                                const p = resumeData?.personalInfo;
                                const summary = resumeData?.summary;
                                const workExperience = resumeData?.workExperience || [];
                                const education = resumeData?.education || [];
                                const skills = resumeData?.skills || [];

                                if (p?.fullName) score += 10;
                                if (p?.email && p?.phone) score += 10;
                                if (p?.profilePhoto) score += 5;
                                if (summary && summary.length > 50) score += 15;
                                if (workExperience.length >= 2) score += 30;
                                else if (workExperience.length === 1) score += 15;
                                if (education.length >= 1) score += 15;
                                if (skills.length >= 5) score += 15;
                                return Math.min(score, 100);
                              })(), 100)}%` }}
                              style={{ height: '100%', background: 'var(--grad-primary)' }} 
                            />
                          </div>
                          <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Sparkles size={10} />
                            {(() => {
                              const score = (() => {
                                let s = 0;
                                const p = resumeData?.personalInfo;
                                const summary = resumeData?.summary;
                                const workExperience = resumeData?.workExperience || [];
                                if (p?.fullName) s += 10;
                                if (p?.email && p?.phone) s += 10;
                                if (summary && summary.length > 50) s += 15;
                                if (workExperience.length >= 1) s += 15;
                                return s;
                              })();
                              if (score < 30) return 'AI: Add more details to boost score';
                              if (score < 60) return 'AI: Looking good, add skills!';
                              if (score < 90) return 'AI: Almost perfect!';
                              return 'AI: Resume is ATS Optimized!';
                            })()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                    
                      {/* AI Optimizer - Hidden in resumeOnly mode */}
                      {!resumeOnly && (
                        <div style={{ padding: '16px' }}>
                          <AIOptimizer />
                        </div>
                      )}

                      <div style={{
                      padding: '12px 16px',
                      borderBottom: '1px solid var(--border-color)',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      background: 'rgba(255,255,255,0.02)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                          Live Preview
                        </span>
                        <div style={{ 
                          display: 'flex', alignItems: 'center', gap: 2, 
                          background: 'rgba(255,255,255,0.05)', padding: '2px', 
                          borderRadius: 8, border: '1px solid var(--border-color)',
                          boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.2)'
                        }}>
                          <button 
                            onClick={handleZoomOut} 
                            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', padding: '4px 8px', borderRadius: 6, transition: 'all 0.2s' }}
                            title="Zoom Out"
                          >
                            <ChevronLeft size={14} />
                          </button>
                          <button 
                            onClick={handleZoomReset}
                            style={{ 
                              fontSize: '11px', fontWeight: 800, minWidth: 46, textAlign: 'center', cursor: 'pointer', 
                              color: 'var(--color-primary)', border: 'none', background: 'rgba(var(--color-primary-rgb), 0.1)', 
                              padding: '4px 0', borderRadius: 4, transition: 'all 0.2s'
                            }}
                            title="Reset to 100%"
                          >
                            {Math.round(zoom * 166.67)}%
                          </button>
                          <button 
                            onClick={handleZoomIn} 
                            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', padding: '4px 8px', borderRadius: 6, transition: 'all 0.2s' }}
                            title="Zoom In"
                          >
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {!showMobilePreview && (
                          <button 
                            onClick={() => setIsDesktopPreviewHidden(true)}
                            style={{ 
                              background: 'rgba(239,68,68,0.1)', border: 'none', color: '#ef4444', 
                              padding: '6px', borderRadius: 6, cursor: 'pointer', display: 'flex',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                            title="Close Preview"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                    <div style={{
                      maxHeight: showMobilePreview ? '80vh' : 650,
                      height: 'auto',
                      overflowY: 'auto',
                      overflowX: 'auto',
                      background: '#0f172a',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      padding: '24px',
                    }}>
                      <ResumePreview scale={zoom} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Re-open Preview Button (FAB) */}
            <AnimatePresence>
              {/* Show on Tablets/Laptops/Mobile whenever preview is NOT active (Up to 1023px) */}
              {!showMobilePreview && (
                <motion.button 
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  onClick={() => {
                    if (window.innerWidth >= 1024) {
                      setIsDesktopPreviewHidden(false);
                      setShowMobilePreview(false);
                    } else {
                      setResumeOnly(false);
                      setShowMobilePreview(true);
                      setIsDesktopPreviewHidden(true);
                    }
                  }}
                  className="lg:hidden fixed bottom-6 right-6 z-[90] btn-primary shadow-2xl flex items-center gap-2"
                  style={{
                    borderRadius: '999px',
                    padding: '14px 24px',
                    fontSize: '14px',
                    boxShadow: '0 10px 25px rgba(99,102,241,0.4)',
                  }}
                >
                  <Eye size={18} /> Start Live Preview
                </motion.button>
              )}
              
              {/* Show on desktop only when desktop preview is manually hidden (Width >= 1024px) */}
              {isDesktopPreviewHidden && (
                <motion.button 
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  onClick={() => {
                    if (window.innerWidth >= 1024) {
                      setIsDesktopPreviewHidden(false);
                      setShowMobilePreview(false);
                    } else {
                      setResumeOnly(false);
                      setShowMobilePreview(true);
                      setIsDesktopPreviewHidden(true);
                    }
                  }}
                  className="hidden lg:flex fixed bottom-6 right-6 z-[90] btn-primary shadow-2xl items-center gap-2"
                  style={{
                    borderRadius: '999px',
                    padding: '14px 24px',
                    fontSize: '14px',
                    boxShadow: '0 10px 25px rgba(99,102,241,0.4)',
                  }}
                >
                  <Eye size={18} /> Start Live Preview
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <AITailorModal isOpen={isTailorModalOpen} onClose={() => setIsTailorModalOpen(false)} defaultMode="current" />
    </div>
  );
}
