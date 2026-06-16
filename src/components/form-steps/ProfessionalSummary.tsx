import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, SpellCheck } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { generateSummary, correctSpelling } from '../../lib/openai';
import TextareaField from '../ui/TextareaField';
import SectionCard from '../ui/SectionCard';

const dynamicSuggestions = [
  { keywords: ['soft', 'dev', 'engineer', 'tech', 'code'], text: 'Results-driven software engineer with a focus on building scalable web applications and optimizing system performance.' },
  { keywords: ['market', 'sale', 'brand', 'growth'], text: 'Strategic marketing professional with expertise in digital campaigns, brand positioning, and data-driven growth strategies.' },
  { keywords: ['data', 'analy', 'science', 'sql'], text: 'Detail-oriented data professional skilled in statistical modeling, visualization, and extracting actionable business insights.' },
  { keywords: ['manag', 'lead', 'project', 'team'], text: 'Accomplished project manager with a proven track record of leading cross-functional teams and delivering complex projects on time.' },
  { keywords: ['design', 'ui', 'ux', 'creat', 'art'], text: 'Creative UI/UX designer passionate about crafting intuitive user experiences and visually stunning interfaces for modern platforms.' },
  { keywords: ['finance', 'acc', 'audit', 'bank'], text: 'Methodical financial professional with deep expertise in risk management, financial reporting, and strategic planning.' },
  { keywords: ['teach', 'edu', 'train', 'coach'], text: 'Dedicated educator committed to fostering an engaging learning environment and promoting student success through innovative methods.' },
  { keywords: ['admin', 'supp', 'custom', 'help'], text: 'Reliable administrative professional with excellent organizational skills and a focus on providing exceptional support.' },
];

export default function ProfessionalSummary() {
  const { resumeData, dispatch, errors } = useResume();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFixing, setIsFixing] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
    >
      <SectionCard
        title="Professional Summary"
        description="A compelling 2–4 sentence overview of your professional identity and key strengths"
      >
        <TextareaField
          id="summary"
          label="Summary"
          placeholder="Write a brief professional summary that highlights your key achievements, skills, and career goals..."
          value={resumeData.summary}
          onChange={(e) => dispatch({ type: 'UPDATE_SUMMARY', payload: e.target.value })}
          rows={6}
          error={errors.summary}
          required
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            {resumeData.summary.length} characters
          </span>
          <span style={{
            fontSize: '12px',
            color: resumeData.summary.length > 600 ? 'var(--color-error)' : 'var(--text-muted)',
          }}>
            Recommended: 200–600 chars
          </span>
        </div>

        {/* AI Generator Button */}
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Row: Generate + Fix Spelling */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={async () => {
                try {
                  setIsGenerating(true);
                  const jobTitle = resumeData.personalInfo.jobTitle || 'Professional';
                  const skills = resumeData.skills || [];
                  const hint = resumeData.summary;
                  const summary = await generateSummary(hint, jobTitle, skills);
                  dispatch({ type: 'UPDATE_SUMMARY', payload: summary });
                } catch (error: any) {
                  console.error(error);
                  alert(error.message || "Failed to generate summary");
                } finally {
                  setIsGenerating(false);
                }
              }}
              disabled={isGenerating || isFixing}
              className="btn-primary"
              style={{ 
                flex: 1,
                justifyContent: 'center', 
                gap: 8, 
                background: 'var(--grad-primary)',
                padding: '12px',
                fontSize: '14px',
                opacity: (isGenerating || isFixing) ? 0.7 : 1,
                cursor: (isGenerating || isFixing) ? 'wait' : 'pointer'
              }}
            >
              {isGenerating ? (
                <><Loader2 size={16} className="animate-spin" /> Generating...</>
              ) : (
                <><Sparkles size={16} /> Generate with AI</>
              )}
            </button>

            {/* Fix Spelling Button — only visible when there's text */}
            {resumeData.summary.trim().length > 0 && (
              <button
                onClick={async () => {
                  try {
                    setIsFixing(true);
                    const corrected = await correctSpelling(resumeData.summary);
                    dispatch({ type: 'UPDATE_SUMMARY', payload: corrected });
                  } catch (error: any) {
                    console.error(error);
                    alert(error.message || "Failed to fix spelling");
                  } finally {
                    setIsFixing(false);
                  }
                }}
                disabled={isGenerating || isFixing}
                className="btn-secondary"
                title="Fix spelling & grammar with AI"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '12px 18px',
                  fontSize: '14px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  opacity: (isGenerating || isFixing) ? 0.7 : 1,
                  cursor: (isGenerating || isFixing) ? 'wait' : 'pointer',
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary)',
                }}
              >
                {isFixing ? (
                  <><Loader2 size={15} className="animate-spin" /> Fixing...</>
                ) : (
                  <><SpellCheck size={15} /> Fix Spelling</>
                )}
              </button>
            )}
          </div>

          <p style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>
            Tip: Type a few keywords above to give the AI a "hint".
          </p>
        </div>

        {/* Dynamic AI Suggestions */}
        {resumeData.summary.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: 24 }}
          >
            <p style={{
              fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)',
              marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <Sparkles size={13} /> AI Smart Suggestions:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(() => {
                const input = resumeData.summary.toLowerCase();
                const job = (resumeData.personalInfo.jobTitle || '').toLowerCase();
                
                // Find matching suggestions based on summary or job title
                const matches = dynamicSuggestions.filter(s => 
                  s.keywords.some(k => input.includes(k) || job.includes(k))
                ).slice(0, 3);

                // If no matches, show general professional ones
                const finalMatches = matches.length > 0 ? matches : dynamicSuggestions.slice(0, 2);

                return finalMatches.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => dispatch({ type: 'UPDATE_SUMMARY', payload: s.text })}
                    style={{
                      textAlign: 'left',
                      padding: '12px 16px',
                      background: 'rgba(var(--color-primary-rgb), 0.03)',
                      border: '1.5px solid var(--border-color)',
                      borderRadius: 12,
                      cursor: 'pointer',
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-primary)';
                      e.currentTarget.style.background = 'rgba(var(--color-primary-rgb), 0.06)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.background = 'rgba(var(--color-primary-rgb), 0.03)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                  >
                    <span style={{ color: 'var(--color-primary)', marginRight: 4 }}>"</span>
                    {s.text}
                    <span style={{ color: 'var(--color-primary)', marginLeft: 4 }}>"</span>
                  </button>
                ));
              })()}
            </div>
          </motion.div>
        )}
      </SectionCard>
    </motion.div>
  );
}
