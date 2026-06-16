import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

const TEAL = '#0f5f5e';
const GREEN = '#3aaa7e';

const IconBadge = ({ emoji }: { emoji: string }) => (
  <div style={{ width: 32, height: 32, borderRadius: '50%', background: TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, color: 'white', flexShrink: 0 }}>
    {emoji}
  </div>
);

const SectionHeader = ({ emoji, title }: { emoji: string; title: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
    <IconBadge emoji={emoji} />
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 13, fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{title}</span>
      <div style={{ flex: 1, height: 2, background: TEAL, borderRadius: 2 }} />
    </div>
  </div>
);

const DateBadge = ({ label }: { label: string }) => (
  <div style={{ background: TEAL, color: 'white', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 4, flexShrink: 0, whiteSpace: 'nowrap' }}>
    {label}
  </div>
);

const SkillGroup = ({ title, items }: { title: string; items: string[] }) => (
  <div style={{ marginBottom: 10 }}>
    <p style={{ fontSize: 10, fontWeight: 800, color: TEAL, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 5 }}>{title}</p>
    {items.map((item, i) => <p key={i} style={{ fontSize: 11, color: '#374151', marginBottom: 3 }}>• {item}</p>)}
  </div>
);

export default function TechSidebar({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, languages } = data;

  const q = Math.ceil(skills.length / 4);
  const prog  = skills.slice(0, q);
  const plat  = skills.slice(q, q * 2);
  const dataI = skills.slice(q * 2, q * 3);
  const ai    = skills.slice(q * 3);

  return (
    <div className="resume-template tpl-tech-sidebar" style={{ display: 'flex', flexDirection: 'column', background: 'white', fontFamily: '"Segoe UI", Arial, sans-serif', minHeight: '1123px', boxSizing: 'border-box' }}>

      {/* ── HEADER ── */}
      <div style={{ padding: '26px 32px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 14 }}>
          {/* Profile circle */}
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: GREEN, overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {p.profilePhoto
              ? <img src={p.profilePhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <span style={{ fontSize: 40, color: 'white' }}>👤</span>}
          </div>
          <div>
            <h1 style={{ fontSize: 36, fontWeight: 900, color: '#1a2b4a', margin: 0, lineHeight: 1 }}>{p.fullName || 'NAVREET KAUR'}</h1>
            <p style={{ fontSize: 15, color: TEAL, fontWeight: 600, margin: '6px 0 0' }}>{p.jobTitle || 'AI – Power Platform Developer'}</p>
          </div>
        </div>

        {/* Contact bar */}
        <div style={{ display: 'flex', alignItems: 'center', background: '#f8f9fa', borderRadius: 8, padding: '9px 18px', marginBottom: 18 }}>
          {p.phone  && <><span style={{ fontSize: 11, color: '#374151' }}>📞 {p.phone}</span><div style={{ width: 1, height: 16, background: '#cbd5e1', margin: '0 16px' }} /></>}
          {p.email  && <><span style={{ fontSize: 11, color: '#374151' }}>✉ {p.email}</span><div style={{ width: 1, height: 16, background: '#cbd5e1', margin: '0 16px' }} /></>}
          {p.address && <span style={{ fontSize: 11, color: '#374151' }}>📍 {p.address}</span>}
        </div>
        <div style={{ height: 1, background: '#e2e8f0' }} />
      </div>

      {/* ── BODY ── */}
      <div style={{ display: 'flex', flex: 1 }}>

        {/* Left sidebar */}
        <div style={{ width: '28%', background: '#f8f9fa', padding: '22px 16px 24px 30px', boxSizing: 'border-box' }}>
          {/* Technical Skills */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: 'white', flexShrink: 0 }}>👤</div>
              <span style={{ fontSize: 11.5, fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Technical Skills</span>
            </div>
            <div style={{ height: 1, background: '#e2e8f0', marginBottom: 12 }} />
            {prog.length  > 0 && <SkillGroup title="Programming"            items={prog}  />}
            {prog.length  > 0 && plat.length  > 0 && <div style={{ height: 1, background: '#e2e8f0', margin: '8px 0' }} />}
            {plat.length  > 0 && <SkillGroup title="Power Platform"          items={plat}  />}
            {plat.length  > 0 && dataI.length > 0 && <div style={{ height: 1, background: '#e2e8f0', margin: '8px 0' }} />}
            {dataI.length > 0 && <SkillGroup title="Data & Integration"      items={dataI} />}
            {dataI.length > 0 && ai.length    > 0 && <div style={{ height: 1, background: '#e2e8f0', margin: '8px 0' }} />}
            {ai.length    > 0 && <SkillGroup title="AI & Cognitive Services" items={ai}    />}
          </div>

          {/* Soft Skills */}
          {languages.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: 'white', flexShrink: 0 }}>⚡</div>
                <span style={{ fontSize: 11.5, fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Soft Skills</span>
              </div>
              <div style={{ height: 1, background: '#e2e8f0', marginBottom: 12 }} />
              {languages.map((l, i) => <p key={i} style={{ fontSize: 11, color: '#374151', marginBottom: 4 }}>• {l.name}</p>)}
            </div>
          )}
        </div>

        {/* Right main */}
        <div style={{ flex: 1, padding: '22px 30px 24px 22px', boxSizing: 'border-box' }}>
          {summary && (
            <div style={{ marginBottom: 20 }}>
              <SectionHeader emoji="👤" title="Professional Summary" />
              <p style={{ fontSize: 11.5, color: '#374151', lineHeight: 1.8 }}>{summary}</p>
            </div>
          )}

          {projects.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <SectionHeader emoji="📋" title="Professional Projects" />
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 3 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: GREEN, flexShrink: 0 }} />
                    <p style={{ fontSize: 12, fontWeight: 800, color: '#1e293b', margin: 0 }}>{proj.name}</p>
                  </div>
                  {proj.description.split('\n').filter(l => l.trim()).map((line, j) => (
                    <p key={j} style={{ fontSize: 11, color: '#374151', margin: '2px 0 2px 20px' }}>• {line.replace(/^[•\-\*]\s*/, '')}</p>
                  ))}
                  {proj.techStack && <p style={{ fontSize: 11, color: '#374151', margin: '2px 0 2px 20px' }}>• {proj.techStack}</p>}
                </div>
              ))}
            </div>
          )}

          {workExperience.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <SectionHeader emoji="💼" title="Professional Experience" />
              {workExperience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 3 }}>
                    <DateBadge label={`${exp.startDate}${exp.startDate && (exp.current || exp.endDate) ? ' – ' : ''}${exp.current ? 'Present' : exp.endDate}`} />
                    <p style={{ fontSize: 12, fontWeight: 800, color: '#1e293b', margin: 0 }}>{exp.role}</p>
                  </div>
                  <p style={{ fontSize: 11.5, color: '#64748b', margin: '0 0 5px 0' }}>{exp.company}</p>
                  {exp.description.split('\n').filter(l => l.trim()).map((line, j) => (
                    <p key={j} style={{ fontSize: 11, color: '#374151', margin: '2px 0' }}>• {line.replace(/^[•\-\*]\s*/, '')}</p>
                  ))}
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div>
              <SectionHeader emoji="🎓" title="Education" />
              {education.map((edu, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 12 }}>
                  <DateBadge label={edu.year} />
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 800, color: '#1e293b', margin: 0 }}>{edu.degree}</p>
                    <p style={{ fontSize: 11, color: '#64748b', margin: '2px 0 0' }}>{edu.college}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
