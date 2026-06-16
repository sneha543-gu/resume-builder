import { motion } from 'framer-motion';
import { Zap, Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { suggestSkills } from '../../lib/openai';
import TagInput from '../ui/TagInput';
import SectionCard from '../ui/SectionCard';

const SKILL_MAP: Record<string, string[]> = {
  'frontend': ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Next.js', 'Redux', 'HTML5', 'CSS3', 'Figma'],
  'backend': ['Node.js', 'Express', 'Python', 'Django', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Java', 'Spring'],
  'fullstack': ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'GraphQL', 'Docker', 'AWS', 'Express'],
  'software': ['Java', 'Python', 'C++', 'Data Structures', 'Git', 'Algorithms', 'System Design'],
  'developer': ['JavaScript', 'React', 'Node.js', 'Git', 'GitHub', 'Clean Code', 'REST API'],
  'data': ['Python', 'SQL', 'Pandas', 'NumPy', 'Tableau', 'Machine Learning', 'R', 'Power BI'],
  'design': ['Figma', 'Adobe XD', 'UI/UX', 'Photoshop', 'Illustrator', 'Responsive Design', 'Canva'],
  'marketing': ['SEO', 'Google Analytics', 'Content Strategy', 'Social Media', 'Email Marketing', 'Copywriting'],
  'management': ['Project Management', 'Agile', 'Scrum', 'Leadership', 'Communication', 'Strategic Planning'],
};

const defaultSkills = ['Python', 'Java', 'JavaScript', 'C++', 'React', 'Node.js', 'SQL', 'Communication', 'Teamwork', 'Problem Solving', 'Leadership'];

export default function Skills() {
  const { resumeData, dispatch } = useResume();
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
    >
      <SectionCard
        title="Skills"
        description="Add your technical and soft skills"
      >
        <TagInput
          label={<>Your Skills <span style={{ color: 'var(--color-error)' }}>*</span></>}
          tags={resumeData.skills}
          onChange={(tags) => dispatch({ type: 'SET_SKILLS', payload: tags })}
          placeholder="Type a skill and press Enter..."
          maxTags={30}
        />

        {/* AI Generator Button */}
        <div style={{ marginTop: 12 }}>
          <button
            onClick={async () => {
              try {
                setIsGenerating(true);
                const jobTitle = resumeData.personalInfo.jobTitle || 'Professional';
                const suggestions = await suggestSkills(jobTitle, resumeData.skills);
                const skillList = suggestions.split(',').map(s => s.trim()).filter(s => s && !resumeData.skills.includes(s));
                
                if (skillList.length > 0) {
                  dispatch({ type: 'SET_SKILLS', payload: [...resumeData.skills, ...skillList.slice(0, 5)] });
                }
              } catch (error: any) {
                alert(error.message);
              } finally {
                setIsGenerating(false);
              }
            }}
            disabled={isGenerating}
            className="btn-secondary"
            style={{ 
              fontSize: '12px', 
              padding: '6px 12px', 
              gap: 6,
              background: 'rgba(var(--color-primary-rgb), 0.05)',
              border: '1px solid rgba(var(--color-primary-rgb), 0.2)',
              color: 'var(--color-primary)'
            }}
          >
            {isGenerating ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
            Get AI Skill Suggestions
          </button>
        </div>

        {/* Quick-add suggestions */}
        <div style={{ marginTop: 20 }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Zap size={13} /> Suggested for You:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {(() => {
              const job = (resumeData?.personalInfo?.jobTitle || '').toLowerCase();
              let suggested = defaultSkills;
              
              if (job) {
                for (const [key, list] of Object.entries(SKILL_MAP)) {
                  if (job.includes(key)) {
                    suggested = [...new Set([...list, ...defaultSkills])];
                    break;
                  }
                }
              }

              return suggested.filter((s) => !resumeData?.skills?.includes(s)).slice(0, 12).map((skill) => (
                <button
                  key={skill}
                  onClick={() => dispatch({ type: 'SET_SKILLS', payload: [...resumeData.skills, skill] })}
                  style={{
                    padding: '4px 12px',
                    background: 'var(--bg-page)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 999,
                    fontSize: '13px',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                    e.currentTarget.style.color = 'var(--color-primary)';
                    e.currentTarget.style.background = 'rgba(var(--color-primary-rgb), 0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.background = 'var(--bg-page)';
                  }}
                >
                  + {skill}
                </button>
              ));
            })()}
          </div>
        </div>
      </SectionCard>
    </motion.div>
  );
}
