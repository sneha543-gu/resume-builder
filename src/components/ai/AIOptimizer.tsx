import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Sparkles, AlertCircle, CheckCircle2, ChevronRight, Loader2, Info } from 'lucide-react';
import { analyzeJobMatch } from '../../lib/openai';
import { useResume } from '../../context/ResumeContext';

interface AnalysisResult {
  score: number;
  matchingSkills: string[];
  missingKeywords: string[];
  tips: string[];
}

export default function AIOptimizer() {
  const { resumeData } = useResume();
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showInput, setShowInput] = useState(true);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;

    setIsAnalyzing(true);
    try {
      const data = await analyzeJobMatch(resumeData, jobDescription);
      setResult(data);
      setShowInput(false);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div
      className="glass rounded-2xl border border-[var(--glass-border)] shadow-xl overflow-visible flex flex-col"
      style={{ padding: '30px', gap: '24px' }} // Explicitly forced padding and gap
    >
      {/* 1. Logo & Title Header */}
      <div className="flex items-center gap-4" style={{ marginLeft: '4px' }}> {/* Small extra push from left */}
        <div className="w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20 shadow-inner flex-shrink-0">
          <Target size={24} />
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm font-bold text-[var(--text-primary)] leading-tight">Target Job Matcher</h3>
          <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider opacity-80 mt-1">AI Analysis</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showInput ? (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-6"
            style={{ padding: '0 4px' }} // Inner side spacing
          >
            {/* 2. Description */}
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-medium">
              Paste the job description below. Our AI will analyze your resume against the requirements to calculate your match score.
            </p>

            {/* 3. Input Box */}
            <div className="relative group">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste Job Description here..."
                className="w-full h-40 text-xs bg-white/5 border border-[var(--border-color)] rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none resize-none text-[var(--text-primary)] leading-relaxed"
                style={{ padding: '24px' }} // Forced internal spacing for text
              />
              <div className="absolute top-4 right-4 text-indigo-500/30 group-focus-within:text-indigo-500 transition-colors">
                <Info size={16} />
              </div>
            </div>

            {/* 4. Action Button */}
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !jobDescription.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
              style={{ padding: '16px 0' }} // Balanced padding
            >
              {isAnalyzing ? (
                <><Loader2 size={20} className="animate-spin" /> Analyzing Match...</>
              ) : (
                <><Sparkles size={20} /> Analyze Matching Score</>
              )}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col gap-7"
            style={{ padding: '0 4px' }}
          >
            {/* Score Section */}
            <div className="flex flex-col items-center justify-center py-6 bg-white/5 rounded-2xl border border-white/5 gap-3">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="56" cy="56" r="48"
                    fill="none" stroke="currentColor" strokeWidth="8"
                    className="text-slate-100 dark:text-slate-800"
                  />
                  <motion.circle
                    cx="56" cy="56" r="48"
                    fill="none" stroke={getScoreColor(result?.score || 0)} strokeWidth="8"
                    strokeDasharray="301.6"
                    initial={{ strokeDashoffset: 301.6 }}
                    animate={{ strokeDashoffset: 301.6 - (301.6 * (result?.score || 0)) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-[var(--text-primary)]">{result?.score}%</span>
                  <span className="text-[9px] font-bold text-[var(--text-secondary)] uppercase">Match</span>
                </div>
              </div>
              <p className="text-[11px] font-bold text-[var(--text-secondary)]">ATS Optimization Score</p>
            </div>

            {/* Analysis Grid */}
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-3">
                <p className="text-[10px] font-bold text-emerald-500 flex items-center gap-1.5 uppercase tracking-wider">
                  <CheckCircle2 size={14} /> Matching
                </p>
                <div className="flex flex-wrap gap-3">
                  {result?.matchingSkills.map((s, i) => (
                    <span key={i} className="inline-flex items-center justify-center bg-emerald-500/10 text-emerald-600 rounded-full text-[13px] font-bold border border-emerald-500/20 leading-none" style={{ padding: '10px' }}>{s}</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[10px] font-bold text-amber-500 flex items-center gap-1.5 uppercase tracking-wider">
                  <AlertCircle size={14} /> Missing
                </p>
                <div className="flex flex-wrap gap-3">
                  {result?.missingKeywords.map((s, i) => (
                    <span key={i} className="inline-flex items-center justify-center bg-amber-500/10 text-amber-600 rounded-full text-[13px] font-bold border border-amber-500/20 leading-none" style={{ padding: '10px' }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Strategy Box */}
            <div style={{ padding: '24px', background: 'white', borderRadius: '18px', border: '1.5px solid #d0d7f5', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 1px 4px rgba(100,116,239,0.06)' }}>
              {/* Header Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <Sparkles size={20} style={{ color: '#0f172a', fill: '#0f172a', flexShrink: 0 }} />
                <div style={{ width: '1.5px', height: '22px', background: '#c7d2fe', borderRadius: '2px', flexShrink: 0 }} />
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  AI Optimization Strategy
                </span>
              </div>

              {/* Tips List */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {result?.tips.map((tip, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, marginTop: '3px' }}>
                      <ChevronRight size={16} style={{ color: '#94a3b8' }} />
                      <div style={{ width: '1.5px', height: '20px', background: '#c7d2fe', borderRadius: '2px' }} />
                    </div>
                    <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.65', fontWeight: 500, margin: 0 }}>
                      {tip}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setShowInput(true)}
              className="w-full text-sm font-bold text-indigo-500 hover:text-white hover:bg-indigo-500 transition-all bg-white/5 rounded-full border border-indigo-500/20"
              style={{ padding: '16px 0' }}
            >
              Analyze Different Job Description
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
