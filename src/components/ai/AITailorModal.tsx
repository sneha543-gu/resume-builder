import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Upload, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { useNavigate } from 'react-router-dom';
import { tailorResumeFromImageOrPdf, tailorCurrentResume } from '../../lib/openai';

// Dynamically load PDF.js script from CDN
const loadPdfJs = async (): Promise<any> => {
  const windowObj = window as any;
  if (windowObj.pdfjsLib) return windowObj.pdfjsLib;

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = () => {
      windowObj.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      resolve(windowObj.pdfjsLib);
    };
    script.onerror = (err) => reject(new Error('Failed to load PDF.js: ' + err));
    document.body.appendChild(script);
  });
};

const convertPdfToImages = async (file: File, onProgress: (msg: string) => void): Promise<string[]> => {
  onProgress('Loading PDF engine...');
  const pdfjsLib = await loadPdfJs();
  onProgress('Reading PDF file...');
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  const base64Images: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    onProgress(`Processing page ${i} of ${pdf.numPages}...`);
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1.5 }); // High resolution for OCR
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) continue;

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({
      canvasContext: context,
      viewport: viewport
    }).promise;

    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    base64Images.push(dataUrl);
  }

  return base64Images;
};

const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

interface AITailorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'upload' | 'current';
}

export default function AITailorModal({ isOpen, onClose, defaultMode = 'upload' }: AITailorModalProps) {
  const { resumeData, dispatch, setCurrentStep, setSelectedTemplate } = useResume();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mode, setMode] = useState<'upload' | 'current'>(defaultMode);
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [progressMessage, setProgressMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.type.startsWith('image/'))) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };



  const handleSubmit = async () => {
    if (mode === 'upload' && !file) return;
    if (!jobDescription.trim()) return;

    setStatus('processing');
    setErrorMessage('');
    
    try {
      let tailoredResume: any = null;

      if (mode === 'upload' && file) {
        let images: string[] = [];
        if (file.type === 'application/pdf') {
          images = await convertPdfToImages(file, setProgressMessage);
        } else {
          setProgressMessage('Converting image...');
          const base64 = await convertImageToBase64(file);
          images = [base64];
        }

        setProgressMessage('AI is tailoring your resume...');
        tailoredResume = await tailorResumeFromImageOrPdf(images, jobDescription);
      } else {
        setProgressMessage('AI is tailoring current resume...');
        tailoredResume = await tailorCurrentResume(resumeData, jobDescription);
      }

      if (tailoredResume && tailoredResume.personalInfo) {
        setProgressMessage('Loading your tailored resume...');
        
        // Match template recommended by AI layout analysis
        if (tailoredResume.recommendedTemplateId) {
          setSelectedTemplate(tailoredResume.recommendedTemplateId);
        }

        // Clean out recommendedTemplateId from resumeData payload to match the ResumeData interface structure
        const { recommendedTemplateId, ...resumeDataPayload } = tailoredResume;
        dispatch({ type: 'LOAD_DUMMY', payload: resumeDataPayload });
        
        setStatus('success');
        setTimeout(() => {
          onClose();
          setCurrentStep(0);
          navigate('/builder');
          // Reset modal state
          setFile(null);
          setJobDescription('');
          setStatus('idle');
        }, 1500);
      } else {
        throw new Error("Invalid response received from the AI tailored builder.");
      }

    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong while tailoring your resume. Please check your API key and try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, type: 'spring', damping: 25 }}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-xl)',
            width: '100%',
            maxWidth: '680px',
            maxHeight: '90vh',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{
            padding: '24px 32px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(to right, rgba(79, 70, 229, 0.03), rgba(124, 58, 237, 0.03))'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: 'var(--grad-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)'
              }}>
                <Sparkles size={20} color="#fff" />
              </div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  AI Resume Tailor
                </h2>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                  Tailor your resume projects and details to fit any job requirements
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'var(--bg-page)',
                border: 'none',
                width: 32,
                height: 32,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                transition: 'background 0.2s',
              }}
              title="Close modal"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
            <AnimatePresence mode="wait">
              {status === 'idle' && (
                <motion.div
                  key="idle-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
                >
                  {/* Mode switcher (Only visible if defaultMode doesn't restrict it, or we are in Builder) */}
                  {defaultMode === 'current' && (
                    <div style={{
                      display: 'flex',
                      background: 'var(--bg-page)',
                      padding: '4px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                    }}>
                      <button
                        onClick={() => setMode('current')}
                        style={{
                          flex: 1,
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: 'none',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          background: mode === 'current' ? 'var(--bg-card)' : 'transparent',
                          color: mode === 'current' ? 'var(--color-primary)' : 'var(--text-secondary)',
                          boxShadow: mode === 'current' ? 'var(--shadow-sm)' : 'none',
                          transition: 'all 0.2s'
                        }}
                      >
                        Tailor Current Details
                      </button>
                      <button
                        onClick={() => setMode('upload')}
                        style={{
                          flex: 1,
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: 'none',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          background: mode === 'upload' ? 'var(--bg-card)' : 'transparent',
                          color: mode === 'upload' ? 'var(--color-primary)' : 'var(--text-secondary)',
                          boxShadow: mode === 'upload' ? 'var(--shadow-sm)' : 'none',
                          transition: 'all 0.2s'
                        }}
                      >
                        Upload PDF / Image
                      </button>
                    </div>
                  )}

                  {/* Mode 1: File Upload */}
                  {mode === 'upload' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <span className="label">1. Upload Existing Resume</span>
                      {!file ? (
                        <div
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          style={{
                            border: '2px dashed var(--border-color)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '36px 20px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 12,
                            background: 'rgba(79, 70, 229, 0.01)',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-primary)';
                            e.currentTarget.style.background = 'rgba(79, 70, 229, 0.04)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-color)';
                            e.currentTarget.style.background = 'rgba(79, 70, 229, 0.01)';
                          }}
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="application/pdf, image/*"
                            style={{ display: 'none' }}
                          />
                          <div style={{
                            width: 52,
                            height: 52,
                            borderRadius: '50%',
                            background: 'rgba(79, 70, 229, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-primary)'
                          }}>
                            <Upload size={24} />
                          </div>
                          <div>
                            <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                              Drag & drop your resume file here
                            </p>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                              Supports PDF, PNG, JPG, JPEG
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div style={{
                          border: '1.5px solid var(--border-color)',
                          borderRadius: 'var(--radius-md)',
                          padding: '16px 20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: 'rgba(79, 70, 229, 0.03)'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{
                              width: 38,
                              height: 38,
                              borderRadius: 8,
                              background: 'rgba(79, 70, 229, 0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--color-primary)'
                            }}>
                              <FileText size={18} />
                            </div>
                            <div>
                              <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, maxWidth: 380, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {file.name}
                              </p>
                              <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                                {(file.size / (1024 * 1024)).toFixed(2)} MB · {file.type.split('/')[1].toUpperCase()}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => setFile(null)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'var(--color-error)',
                              cursor: 'pointer',
                              padding: 6,
                              borderRadius: '50%',
                              display: 'flex'
                            }}
                            title="Remove file"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Job Description Text */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <span className="label">2. Target Job Description</span>
                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste the target job requirements here. AI will analyze this and rewrite your resume (e.g. converting Python projects to Java projects if requested)..."
                      className="input-field"
                      style={{ height: '160px', resize: 'none', fontSize: '13px', lineHeight: '1.6' }}
                    />
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', paddingTop: 8 }}>
                    <button
                      className="btn-secondary"
                      onClick={onClose}
                      style={{ padding: '10px 24px', fontSize: '13px' }}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn-primary"
                      onClick={handleSubmit}
                      disabled={(mode === 'upload' && !file) || !jobDescription.trim()}
                      style={{
                        padding: '10px 28px',
                        fontSize: '13px',
                        opacity: ((mode === 'upload' && !file) || !jobDescription.trim()) ? 0.5 : 1,
                        cursor: ((mode === 'upload' && !file) || !jobDescription.trim()) ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <Sparkles size={16} /> Tailor Resume Now
                    </button>
                  </div>
                </motion.div>
              )}

              {status === 'processing' && (
                <motion.div
                  key="processing-loader"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px 20px',
                    textAlign: 'center',
                    gap: 20
                  }}
                >
                  <div style={{ position: 'relative', width: 72, height: 72 }}>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        border: '3.5px solid rgba(79, 70, 229, 0.1)',
                        borderTopColor: 'var(--color-primary)',
                        borderRadius: '50%',
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-primary)'
                    }}>
                      <Sparkles size={28} className="animate-pulse" />
                    </div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                      Tailoring Resume with AI
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: 6, minHeight: '20px' }}>
                      {progressMessage || 'Thinking...'}
                    </p>
                  </div>

                  {/* Visual flowchart step indicators */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginTop: 12,
                    background: 'var(--bg-page)',
                    padding: '8px 16px',
                    borderRadius: 20,
                    border: '1px solid var(--border-color)',
                  }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-primary)' }}>1. Read Input</span>
                    <ChevronRight size={10} style={{ color: 'var(--text-muted)' }} />
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-primary)' }}>2. Parse Details</span>
                    <ChevronRight size={10} style={{ color: 'var(--text-muted)' }} />
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-primary)' }}>3. Translate Python ➔ Java</span>
                  </div>
                </motion.div>
              )}

              {status === 'success' && (
                <motion.div
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px 20px',
                    textAlign: 'center',
                    gap: 16
                  }}
                >
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-success)',
                    border: '1.5px solid rgba(16, 185, 129, 0.25)'
                  }}>
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                      Resume Tailored Successfully!
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: 6 }}>
                      Opening the resume builder with your brand new tailored data...
                    </p>
                  </div>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  key="error-screen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '32px 20px',
                    textAlign: 'center',
                    gap: 16
                  }}
                >
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'rgba(239, 68, 68, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-error)',
                    fontSize: 24,
                    fontWeight: 700,
                    border: '1.5px solid rgba(239, 68, 68, 0.25)'
                  }}>
                    ✕
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                      Tailoring Failed
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--color-error)', marginTop: 8, padding: '0 12px', lineHeight: '1.5' }}>
                      {errorMessage}
                    </p>
                  </div>
                  <button
                    className="btn-secondary"
                    onClick={() => setStatus('idle')}
                    style={{ padding: '8px 20px', fontSize: '12px', marginTop: 8 }}
                  >
                    Try Again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
