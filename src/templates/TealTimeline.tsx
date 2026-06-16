import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function TealTimeline({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;
  const TEAL = '#0f766e';
  const TEAL_LIGHT = '#14b8a6';
  const TEAL_BG = '#f0fdfa';

  const SectionHeader = ({ title }: { title: string }) => (
    <div style={{ margin: '22px 0 14px' }}>
      <span style={{ fontSize: 15, fontWeight: 800, color: TEAL, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{title}</span>
      <div style={{ height: 2, background: `linear-gradient(90deg, ${TEAL} 0%, ${TEAL_BG} 100%)`, marginTop: 4 }} />
    </div>
  );

  return (
    <div className="resume-template" style={{ width: 794, minHeight: 1123, fontFamily: '"Segoe UI", sans-serif', background: '#fff', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      {/* Header Bar */}
      <div style={{ background: TEAL, color: '#fff', padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0, letterSpacing: '0.05em' }}>{p.fullName || 'YOUR NAME'}</h1>
          <p style={{ fontSize: 15.5, margin: '4px 0 0 0', fontWeight: 600, color: '#99f6e4', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{p.jobTitle || 'Professional Title'}</p>
        </div>
      </div>

      {/* Contact Info Row */}
      <div style={{ background: TEAL_BG, padding: '10px 48px', display: 'flex', flexWrap: 'wrap', gap: '8px 24px', fontSize: 14, color: '#0f766e', borderBottom: `1px solid #ccfbf1` }}>
        {p.email && <span>✉ {p.email}</span>}
        {p.phone && <span>📞 {p.phone}</span>}
        {p.address && <span>📍 {p.address}</span>}
        {p.linkedIn && <span>🔗 {p.linkedIn}</span>}
        {p.github && <span>💻 {p.github}</span>}
      </div>

      {/* Body Content */}
      <div style={{ padding: '20px 48px 40px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {summary && (
          <div>
            <SectionHeader title="Professional Summary" />
            <p style={{ fontSize: 14.5, color: '#111827', lineHeight: 1.65, margin: 0, textAlign: 'justify' }}>{summary}</p>
          </div>
        )}

        {workExperience.length > 0 && (
          <div>
            <SectionHeader title="Experience Timeline" />
            <div style={{ position: 'relative', borderLeft: `2px solid ${TEAL}`, marginLeft: 8, paddingLeft: 20 }}>
              {workExperience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 16, position: 'relative' }}>
                  {/* Timeline node */}
                  <div style={{
                    position: 'absolute',
                    left: -25,
                    top: 4,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: TEAL,
                    border: '3px solid #fff',
                    boxShadow: '0 0 0 1px #0f766e'
                  }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>{exp.role}</div>
                    <div style={{ fontSize: 13.5, color: '#1f2937', fontWeight: 600 }}>
                      {exp.startDate}{(exp.startDate && (exp.current || exp.endDate)) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  <div style={{ fontSize: 14.5, color: TEAL_LIGHT, fontWeight: 700, marginBottom: 4 }}>{exp.company}</div>
                  <p style={{ fontSize: 14, color: '#111827', lineHeight: 1.6, margin: 0 }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <SectionHeader title="Key Projects" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {projects.map((proj, i) => (
                <div key={i} style={{ background: '#fafafa', border: '1px solid #f0f0f0', padding: 12, borderRadius: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: TEAL }}>{proj.name}</div>
                    {proj.link && <a href={proj.link} style={{ fontSize: 12.5, color: TEAL_LIGHT, textDecoration: 'none' }}>↗ Link</a>}
                  </div>
                  {proj.techStack && <div style={{ fontSize: 13, color: '#71717a', fontStyle: 'italic', marginBottom: 6 }}>{proj.techStack}</div>}
                  <p style={{ fontSize: 13.5, color: '#111827', lineHeight: 1.45, margin: 0 }}>{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 32, marginTop: 10 }}>
          {/* Skills Column */}
          <div style={{ flex: 1.2 }}>
            {skills.length > 0 && (
              <div>
                <SectionHeader title="Skills & Tools" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 10px' }}>
                  {skills.map((s, i) => (
                    <div key={i} style={{ fontSize: 13.5, background: TEAL_BG, color: TEAL, padding: '5px 10px', borderRadius: 4, fontWeight: 600, borderLeft: `3px solid ${TEAL_LIGHT}` }}>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Education & Other Column */}
          <div style={{ flex: 1 }}>
            {education.length > 0 && (
              <div>
                <SectionHeader title="Education" />
                {education.map((e, i) => (
                  <div key={i} style={{ marginBottom: 10, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <div style={{ background: TEAL, color: '#fff', fontSize: 12.5, fontWeight: 700, padding: '2px 6px', borderRadius: 3, marginTop: 2, whiteSpace: 'nowrap' }}>
                      {e.year.split(' - ')[0] || 'Edu'}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: '#111827' }}>{e.degree}</div>
                      <div style={{ fontSize: 13, color: '#1f2937' }}>{e.college}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {(certifications.length > 0 || languages.length > 0) && (
              <div style={{ marginTop: 10 }}>
                <SectionHeader title="Additional Details" />
                {certifications.slice(0, 2).map((c, i) => (
                  <div key={i} style={{ fontSize: 13.5, marginBottom: 6 }}>
                    <strong style={{ color: '#111827' }}>{c.name}</strong> · <span style={{ color: '#111827' }}>{c.issuer}</span>
                  </div>
                ))}
                {languages.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 10px', marginTop: 8, fontSize: 13.5 }}>
                    {languages.map((l, i) => (
                      <span key={i} style={{ color: '#1f2937' }}>
                        <strong>{l.name}</strong> ({l.proficiency})
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
