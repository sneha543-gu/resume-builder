import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

const NAVY = '#1a2b5a';

const NavyBadge = ({ emoji }: { emoji: string }) => (
  <div style={{ width: 28, height: 28, borderRadius: '50%', background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: 'white', flexShrink: 0 }}>
    {emoji}
  </div>
);

const SideSection = ({ emoji, title, children }: { emoji: string; title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 18 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
      <NavyBadge emoji={emoji} />
      <span style={{ fontSize: 10.5, fontWeight: 800, color: NAVY, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{title}</span>
    </div>
    <div style={{ height: 1, background: '#cbd5e1', marginBottom: 10 }} />
    {children}
  </div>
);

const MainSection = ({ emoji, title, children }: { emoji: string; title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 18 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
      <NavyBadge emoji={emoji} />
      <span style={{ fontSize: 10.5, fontWeight: 800, color: NAVY, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{title}</span>
      <div style={{ flex: 1, height: 1, background: '#cbd5e1' }} />
    </div>
    {children}
  </div>
);

export default function ProfessionalNavy({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, certifications, projects, languages } = data;
  const half = Math.ceil(skills.length / 2);
  const techSkills = skills.slice(0, half);
  const softSkills = skills.slice(half);

  return (
    <div className="resume-template tpl-professional-navy" style={{ display: 'flex', flexDirection: 'column', background: 'white', fontFamily: '"Calibri", Arial, sans-serif', minHeight: '1123px', boxSizing: 'border-box' }}>

      {/* ── TOP HEADER ── */}
      <div style={{ padding: '26px 32px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: 42, fontWeight: 900, color: NAVY, textTransform: 'uppercase', letterSpacing: '-0.5px', lineHeight: 1, margin: 0 }}>
            {p.fullName || 'YOUR NAME'}
          </h1>
          <p style={{ fontSize: 13, color: '#64748b', fontWeight: 400, margin: '6px 0 0', letterSpacing: '0.02em' }}>
            {p.jobTitle || 'YOUR DESIGNATION / PROFESSIONAL TITLE'}
          </p>
          <div style={{ width: 36, height: 3, background: NAVY, marginTop: 8, borderRadius: 2 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, marginTop: 4 }}>
          {p.phone    && <span style={{ fontSize: 11, color: '#475569' }}>📞 {p.phone}</span>}
          {p.email    && <span style={{ fontSize: 11, color: '#475569' }}>✉ {p.email}</span>}
          {p.linkedIn && <span style={{ fontSize: 11, color: '#475569' }}>🔗 {p.linkedIn}</span>}
          {p.address  && <span style={{ fontSize: 11, color: '#475569' }}>📍 {p.address}</span>}
        </div>
      </div>

      {/* Full-width navy divider */}
      <div style={{ height: 3, background: NAVY }} />

      {/* ── BODY ── */}
      <div style={{ display: 'flex', flex: 1, alignItems: 'stretch' }}>

        {/* Left Sidebar */}
        <div style={{ width: '33%', padding: '20px 18px 20px 32px', borderRight: '1px solid #e2e8f0', boxSizing: 'border-box' }}>

          <SideSection emoji="🎓" title="Education">
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#1e293b', margin: '0 0 1px 0' }}>{edu.degree}</p>
                <p style={{ fontSize: 10.5, color: '#64748b', margin: '0 0 1px 0' }}>{edu.college}</p>
                <p style={{ fontSize: 10, color: '#94a3b8', margin: 0 }}>{edu.year}</p>
                {i < education.length - 1 && <div style={{ height: 1, background: '#f1f5f9', margin: '8px 0' }} />}
              </div>
            ))}
          </SideSection>

          <SideSection emoji="⚙" title="Skills">
            {techSkills.length > 0 && (
              <div style={{ marginBottom: 10 }}>
                <p style={{ fontSize: 9.5, fontWeight: 800, color: NAVY, textTransform: 'uppercase', marginBottom: 5 }}>Technical Skills</p>
                {techSkills.map((s, i) => <p key={i} style={{ fontSize: 10.5, color: '#475569', marginBottom: 2 }}>• {s}</p>)}
              </div>
            )}
            {softSkills.length > 0 && (
              <div>
                <p style={{ fontSize: 9.5, fontWeight: 800, color: NAVY, textTransform: 'uppercase', marginBottom: 5 }}>Soft Skills</p>
                {softSkills.map((s, i) => <p key={i} style={{ fontSize: 10.5, color: '#475569', marginBottom: 2 }}>• {s}</p>)}
              </div>
            )}
          </SideSection>

          <SideSection emoji="💻" title="Tools / Technologies">
            {skills.slice(0, 5).map((s, i) => <p key={i} style={{ fontSize: 10.5, color: '#475569', marginBottom: 2 }}>• {s}</p>)}
          </SideSection>

          {languages.length > 0 && (
            <SideSection emoji="🌐" title="Languages">
              {languages.map((l) => <p key={l.id} style={{ fontSize: 10.5, color: '#475569', marginBottom: 2 }}>• {l.name}</p>)}
            </SideSection>
          )}
        </div>

        {/* Right Main */}
        <div style={{ flex: 1, padding: '20px 32px 20px 22px', boxSizing: 'border-box' }}>

          {summary && (
            <MainSection emoji="👤" title="Professional Summary">
              <p style={{ fontSize: 11, color: '#475569', lineHeight: 1.75, marginBottom: 0 }}>{summary}</p>
            </MainSection>
          )}

          {workExperience.length > 0 && (
            <MainSection emoji="💼" title="Professional Experience">
              {workExperience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <p style={{ fontSize: 11.5, fontWeight: 800, color: NAVY, margin: 0 }}>{exp.role}</p>
                    <span style={{ fontSize: 9.5, color: '#64748b', fontWeight: 600 }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: 10.5, color: '#475569', margin: '2px 0 5px' }}>{exp.company}</p>
                  {exp.description.split('\n').filter(l => l.trim()).map((line, j) => (
                    <p key={j} style={{ fontSize: 10.5, color: '#475569', margin: '2px 0', paddingLeft: 8 }}>• {line.replace(/^[•\-\*]\s*/, '')}</p>
                  ))}
                  <div style={{ height: 1, background: '#f1f5f9', marginTop: 10 }} />
                </div>
              ))}
            </MainSection>
          )}

          {projects.length > 0 && (
            <MainSection emoji="📁" title="Projects">
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <p style={{ fontSize: 11.5, fontWeight: 800, color: NAVY, margin: '0 0 2px 0' }}>{proj.name}</p>
                  <p style={{ fontSize: 10.5, color: '#475569', margin: '0 0 2px 8px' }}>• {proj.description}</p>
                  {proj.techStack && <p style={{ fontSize: 10.5, color: '#475569', margin: '0 0 0 8px' }}>• {proj.techStack}</p>}
                </div>
              ))}
            </MainSection>
          )}

          {certifications.length > 0 && (
            <MainSection emoji="🏅" title="Certifications">
              {certifications.map((cert) => (
                <p key={cert.id} style={{ fontSize: 10.5, color: '#475569', margin: '0 0 3px 0' }}>• {cert.name} | {cert.issuer} | {cert.year}</p>
              ))}
            </MainSection>
          )}

          <MainSection emoji="🏆" title="Achievements">
            <p style={{ fontSize: 10.5, color: '#475569', margin: '0 0 3px 0' }}>• Achievement 1 – A brief description of your achievement.</p>
            <p style={{ fontSize: 10.5, color: '#475569', margin: '0 0 3px 0' }}>• Achievement 2 – A brief description of your achievement.</p>
            <p style={{ fontSize: 10.5, color: '#475569', margin: '0 0 3px 0' }}>• Achievement 3 – A brief description of your achievement.</p>
          </MainSection>
        </div>
      </div>
    </div>
  );
}
