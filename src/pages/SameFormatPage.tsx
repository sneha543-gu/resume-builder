import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, FileText, X, Sparkles, Download,
  ChevronLeft, AlertCircle, CheckCircle2, RefreshCw, Wand2, Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { recreateResumeInSameFormat } from '../lib/recreateResume';

// ─── PDF.js loader (same as AITailorModal) ───────────────────────────────────
const loadPdfJs = async (): Promise<any> => {
  const w = window as any;
  if (w.pdfjsLib) return w.pdfjsLib;
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = () => {
      w.pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      resolve(w.pdfjsLib);
    };
    script.onerror = (err) => reject(new Error('Failed to load PDF.js: ' + err));
    document.body.appendChild(script);
  });
};

const convertPdfToImages = async (
  file: File,
  onProgress: (msg: string) => void
): Promise<string[]> => {
  onProgress('Loading PDF engine...');
  const pdfjsLib = await loadPdfJs();
  onProgress('Reading PDF file...');
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const images: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    onProgress(`Processing page ${i} of ${pdf.numPages}...`);
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: ctx, viewport }).promise;
    images.push(canvas.toDataURL('image/jpeg', 0.9));
  }
  return images;
};

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

// ─── Download HTML as PDF via hidden iframe (no new tab) ─────────────────────
const downloadAsPdf = (htmlContent: string, _fileName: string) => {
  // Create a hidden iframe so we never open a new tab
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.style.visibility = 'hidden';
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!doc) { document.body.removeChild(iframe); return; }

  doc.open();
  doc.write(htmlContent);
  doc.close();

  // Wait for content + fonts to load, then print silently
  setTimeout(() => {
    try {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } finally {
      // Remove iframe after print dialog closes (or after a safe delay)
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 2000);
    }
  }, 900);
};

type Status = 'idle' | 'processing' | 'done' | 'error';
type Mode = 'improve' | 'tailor';

const DOMAIN_CHIPS = [
  '☕ Java / Spring Boot',
  '🐍 Python / Django',
  '⚛️ React / TypeScript',
  '🅰️ Angular / RxJS',
  '🟩 Node.js / Express',
  '☁️ AWS / Cloud DevOps',
  '🤖 Machine Learning / AI',
  '📱 Flutter / Mobile',
  '🔷 .NET / C#',
  '🐘 PHP / Laravel',
];

export default function SameFormatPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<Mode>('tailor');
  const [jobDescription, setJobDescription] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [progress, setProgress] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [generatedHtml, setGeneratedHtml] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Write HTML into iframe when it changes
  useEffect(() => {
    if (generatedHtml && iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(generatedHtml);
        doc.close();
      }
    }
  }, [generatedHtml]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f && (f.type === 'application/pdf' || f.type.startsWith('image/'))) {
      setFile(f);
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    setStatus('processing');
    setErrorMsg('');
    setGeneratedHtml('');

    try {
      let images: string[];
      if (file.type === 'application/pdf') {
        images = await convertPdfToImages(file, setProgress);
      } else {
        setProgress('Converting image...');
        images = [await fileToBase64(file)];
      }

      setProgress('AI is recreating your resume layout...');
      const html = await recreateResumeInSameFormat(images, jobDescription);
      setGeneratedHtml(html);
      setStatus('done');
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const handleReset = () => {
    setFile(null);
    setJobDescription('');
    setMode('tailor');
    setStatus('idle');
    setProgress('');
    setErrorMsg('');
    setGeneratedHtml('');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ flex: 1, maxWidth: 1200, margin: '0 auto', width: '100%', padding: '100px 24px 40px' }}>

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/home')}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600,
            marginBottom: 32, padding: 0,
          }}
        >
          <ChevronLeft size={16} /> Back to Home
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 40, textAlign: 'center' }}
        >
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: 'var(--grad-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 8px 24px rgba(99,102,241,0.35)',
          }}>
            <Sparkles size={26} color="#fff" />
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem,3vw,2.2rem)',
            fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em'
          }}>
            Import & Keep My Format
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: 8, maxWidth: 560, margin: '8px auto 0' }}>
            Upload your resume — AI recreates it in the <strong>exact same layout</strong>, then either cleans it up or <strong>converts it to a new domain</strong> (e.g. Python → Java).
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: status === 'done' ? '380px 1fr' : '1fr',
          gap: 32,
          alignItems: 'start',
        }}>

          {/* ── Left Panel: Upload Form ── */}
          <motion.div
            layout
            className="glass"
            style={{ padding: 32, borderRadius: 'var(--radius-xl)', border: '1px solid var(--glass-border)' }}
          >
            <AnimatePresence mode="wait">

              {/* IDLE / FORM state */}
              {(status === 'idle' || status === 'error') && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
                >
                  {/* Error banner */}
                  {status === 'error' && (
                    <div style={{
                      display: 'flex', gap: 10, padding: '12px 14px',
                      background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
                      borderRadius: 'var(--radius-md)',
                    }}>
                      <AlertCircle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 13, color: '#ef4444', lineHeight: 1.5 }}>{errorMsg}</span>
                    </div>
                  )}

                  {/* Mode Switcher */}
                  <div style={{
                    display: 'flex',
                    background: 'var(--bg-page)',
                    padding: '4px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                  }}>
                    <button
                      onClick={() => { setMode('tailor'); setJobDescription(''); }}
                      style={{
                        flex: 1, padding: '10px 12px', borderRadius: '8px', border: 'none',
                        fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                        background: mode === 'tailor' ? 'var(--grad-primary)' : 'transparent',
                        color: mode === 'tailor' ? '#fff' : 'var(--text-secondary)',
                        boxShadow: mode === 'tailor' ? '0 2px 8px rgba(99,102,241,0.3)' : 'none',
                        transition: 'all 0.2s',
                      }}
                    >
                      <Zap size={13} /> Tailor to Domain
                    </button>
                    <button
                      onClick={() => { setMode('improve'); setJobDescription(''); }}
                      style={{
                        flex: 1, padding: '10px 12px', borderRadius: '8px', border: 'none',
                        fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                        background: mode === 'improve' ? 'var(--bg-card)' : 'transparent',
                        color: mode === 'improve' ? 'var(--color-primary)' : 'var(--text-secondary)',
                        boxShadow: mode === 'improve' ? 'var(--shadow-sm)' : 'none',
                        transition: 'all 0.2s',
                      }}
                    >
                      <Wand2 size={13} /> Keep & Improve
                    </button>
                  </div>

                  {/* Mode description */}
                  <div style={{
                    padding: '10px 14px',
                    background: mode === 'tailor' ? 'rgba(99,102,241,0.06)' : 'rgba(16,185,129,0.05)',
                    border: `1px solid ${mode === 'tailor' ? 'rgba(99,102,241,0.2)' : 'rgba(16,185,129,0.2)'}`,
                    borderRadius: 'var(--radius-md)',
                    fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6,
                    transition: 'all 0.3s',
                  }}>
                    {mode === 'tailor' ? (
                      <span>⚡ <strong>Tailor to Domain</strong> — AI will convert your projects, skills & experience to the target domain (e.g., Python → Java) while preserving your exact layout.</span>
                    ) : (
                      <span>✨ <strong>Keep & Improve</strong> — AI will clean up spelling/grammar and improve phrasing while preserving both your layout and all factual content.</span>
                    )}
                  </div>

                  {/* Step 1: File upload */}
                  <div>
                    <p className="label" style={{ marginBottom: 10 }}>
                      Step 1 — Upload Your Resume
                    </p>
                    {!file ? (
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                          border: '2px dashed var(--border-color)',
                          borderRadius: 'var(--radius-lg)',
                          padding: '32px 20px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--color-primary)';
                          e.currentTarget.style.background = 'rgba(99,102,241,0.04)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border-color)';
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="application/pdf,image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) setFile(f);
                          }}
                        />
                        <div style={{
                          width: 48, height: 48, borderRadius: '50%',
                          background: 'rgba(99,102,241,0.1)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'var(--color-primary)',
                        }}>
                          <Upload size={22} />
                        </div>
                        <div>
                          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                            Drag & drop or click to upload
                          </p>
                          <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '4px 0 0' }}>
                            Supports PDF, PNG, JPG, JPEG
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '14px 16px',
                        border: '1.5px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(99,102,241,0.04)',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: 8,
                            background: 'rgba(99,102,241,0.1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'var(--color-primary)',
                          }}>
                            <FileText size={16} />
                          </div>
                          <div>
                            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', margin: 0, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {file.name}
                            </p>
                            <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '2px 0 0' }}>
                              {(file.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setFile(null)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: 4, display: 'flex' }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Step 2: Domain / JD */}
                  {mode === 'tailor' && (
                    <div>
                      <p className="label" style={{ marginBottom: 6 }}>
                        Step 2 — Target Domain / Job Description
                      </p>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>
                        Describe the target role or pick a quick domain:
                      </p>
                      {/* Domain quick-pick chips */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                        {DOMAIN_CHIPS.map((chip) => (
                          <button
                            key={chip}
                            onClick={() => setJobDescription(prev =>
                              prev.includes(chip) ? prev.replace(chip, '').trim() : (prev ? prev + '\n' + chip : chip)
                            )}
                            style={{
                              padding: '5px 12px',
                              borderRadius: 20,
                              border: `1.5px solid ${jobDescription.includes(chip) ? 'var(--color-primary)' : 'var(--border-color)'}`,
                              background: jobDescription.includes(chip) ? 'rgba(99,102,241,0.1)' : 'transparent',
                              color: jobDescription.includes(chip) ? 'var(--color-primary)' : 'var(--text-secondary)',
                              fontSize: 11, fontWeight: 600, cursor: 'pointer',
                              transition: 'all 0.15s',
                            }}
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                      <textarea
                        className="input-field"
                        placeholder="Or paste a full job description here. AI will analyze it and convert your resume's projects, skills, and experience to match this domain."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        style={{ height: 120, resize: 'none', fontSize: 13, lineHeight: 1.6 }}
                      />
                    </div>
                  )}

                  {/* Submit */}
                  <motion.button
                    className="btn-primary"
                    whileTap={{ scale: 0.98 }}
                    disabled={!file || (mode === 'tailor' && !jobDescription.trim())}
                    onClick={handleProcess}
                    style={{
                      width: '100%', justifyContent: 'center', padding: '14px',
                      opacity: (!file || (mode === 'tailor' && !jobDescription.trim())) ? 0.5 : 1,
                      cursor: (!file || (mode === 'tailor' && !jobDescription.trim())) ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {mode === 'tailor' ? <><Zap size={16} /> Tailor & Recreate</> : <><Sparkles size={16} /> Recreate & Improve</>}
                  </motion.button>

                  {mode === 'tailor' && !jobDescription.trim() && (
                    <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)', marginTop: -12 }}>
                      ↑ Pick a domain chip or paste a job description to enable
                    </p>
                  )}
                </motion.div>
              )}

              {/* PROCESSING state */}
              {status === 'processing' && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, padding: '32px 0', textAlign: 'center' }}
                >
                  <div style={{ position: 'relative', width: 64, height: 64 }}>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      style={{
                        position: 'absolute', inset: 0,
                        border: '3px solid rgba(99,102,241,0.15)',
                        borderTopColor: 'var(--color-primary)',
                        borderRadius: '50%',
                      }}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--color-primary)',
                    }}>
                      {mode === 'tailor' ? <Zap size={24} /> : <Sparkles size={24} />}
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                      {mode === 'tailor' ? 'AI is converting your domain...' : 'AI is improving your resume...'}
                    </p>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6 }}>
                      {progress || 'Analyzing your resume layout...'}
                    </p>
                  </div>
                  <div style={{
                    background: 'var(--bg-page)', border: '1px solid var(--border-color)',
                    borderRadius: 12, padding: '8px 18px',
                    fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6,
                  }}>
                    {mode === 'tailor'
                      ? '📐 Detecting layout → 🔄 Converting domain → ✍️ Rebuilding HTML'
                      : '📐 Detecting layout → 🔍 Reading content → ✍️ Rebuilding HTML'
                    }
                  </div>
                </motion.div>
              )}

              {/* DONE state (left panel shows actions) */}
              {status === 'done' && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
                >
                  <div style={{
                    display: 'flex', gap: 12, alignItems: 'center',
                    padding: '14px 16px',
                    background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)',
                    borderRadius: 'var(--radius-md)',
                  }}>
                    <CheckCircle2 size={20} color="#10b981" />
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                        Resume Recreated!
                      </p>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '2px 0 0' }}>
                        Preview on the right. Download when ready.
                      </p>
                    </div>
                  </div>

                  <motion.button
                    className="btn-primary"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => downloadAsPdf(generatedHtml, file?.name?.replace(/\.[^.]+$/, '') || 'resume')}
                    style={{ width: '100%', justifyContent: 'center', padding: '13px' }}
                  >
                    <Download size={16} /> Download as PDF
                  </motion.button>

                  <button
                    onClick={handleReset}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      width: '100%', padding: '11px',
                      background: 'transparent', border: '1.5px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)', cursor: 'pointer',
                      fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
                  >
                    <RefreshCw size={14} /> Start Over
                  </button>

                  <div style={{
                    padding: '12px 14px',
                    background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)',
                    borderRadius: 'var(--radius-md)', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6
                  }}>
                    💡 <strong>Tip:</strong> Click "Download as PDF" — your browser's print dialog will open. Select <em>"Save as PDF"</em> as the destination.
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>

          {/* ── Right Panel: Preview ── */}
          {status === 'done' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                background: '#fff',
              }}
            >
              {/* Preview header bar */}
              <div style={{
                padding: '12px 20px',
                background: 'var(--bg-card)',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
                  📄 Resume Preview — Same Format
                </span>
                <button
                  onClick={() => downloadAsPdf(generatedHtml, file?.name?.replace(/\.[^.]+$/, '') || 'resume')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 14px', background: 'var(--grad-primary)',
                    border: 'none', borderRadius: 8, cursor: 'pointer',
                    fontSize: 12, fontWeight: 700, color: '#fff',
                  }}
                >
                  <Download size={13} /> Download PDF
                </button>
              </div>

              {/* Iframe showing the generated resume */}
              <iframe
                ref={iframeRef}
                title="Resume Preview"
                style={{
                  width: '100%',
                  height: '900px',
                  border: 'none',
                  display: 'block',
                }}
                sandbox="allow-same-origin"
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
