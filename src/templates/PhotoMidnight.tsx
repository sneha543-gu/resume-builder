import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function PhotoMidnight({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;
  const DARK = '#0f172a';
  const BLUE = '#2563eb';
  const BLUE_LIGHT = '#60a5fa';
  const BLUE_LIGHTER = '#93c5fd';
  const LIGHT_BG = '#f8fafc';

  const SectionHeader = ({ title }: { title: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '22px 0 12px' }}>
      <span style={{ fontSize: 14.5, fontWeight: 800, color: BLUE, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{title}</span>
      <div style={{ flex: 1, height: 1.5, background: '#dbeafe' }} />
    </div>
  );

  const SidebarHeader = ({ title }: { title: string }) => (
    <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.15)', paddingBottom: 4, margin: '20px 0 10px' }}>
      <span style={{ fontSize: 13.5, fontWeight: 700, color: BLUE_LIGHT, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{title}</span>
    </div>
  );

  return (
    <div className="resume-template" style={{ width: 794, minHeight: 1123, fontFamily: '"Segoe UI", sans-serif', background: '#fff', boxSizing: 'border-box', display: 'flex' }}>
      {/* Left Sidebar */}
      <div style={{ width: '36%', background: DARK, color: '#f1f5f9', padding: '36px 20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        {/* Photo Container */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <div style={{ width: 120, height: 120, borderRadius: '50%', border: `3px solid ${BLUE_LIGHT}`, overflow: 'hidden', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            {p.profilePhoto ? (
              <img src={p.profilePhoto} alt={p.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontSize: 48 }}>👤</span>
            )}
          </div>
        </div>

        {/* Name and Job Title */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <h2 style={{ fontSize: 19, fontWeight: 800, color: '#fff', margin: 0 }}>{p.fullName || 'YOUR NAME'}</h2>
          <p style={{ fontSize: 15, color: BLUE_LIGHTER, fontWeight: 600, margin: '4px 0 0 0', textTransform: 'uppercase', letterSpacing: 0.5 }}>{p.jobTitle || 'Professional Title'}</p>
        </div>

        {/* Contact info */}
        <SidebarHeader title="Contact Info" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13.5, color: '#cbd5e1', wordBreak: 'break-all' }}>
          {p.email && <div>✉ {p.email}</div>}
          {p.phone && <div>📞 {p.phone}</div>}
          {p.address && <div>📍 {p.address}</div>}
          {p.linkedIn && <div>🔗 {p.linkedIn}</div>}
          {p.github && <div>💻 {p.github}</div>}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <>
            <SidebarHeader title="Skills & Tools" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {skills.map((s, i) => (
                <div key={i} style={{ fontSize: 12.5, background: 'rgba(255, 255, 255, 0.1)', color: '#fff', padding: '3px 8px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.15)' }}>
                  {s}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Education */}
        {education.length > 0 && (
          <>
            <SidebarHeader title="Education" />
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>{e.degree}</div>
                <div style={{ fontSize: 13, color: '#cbd5e1', marginTop: 1 }}>{e.college}</div>
                <div style={{ fontSize: 12.5, color: BLUE_LIGHTER, marginTop: 1 }}>{e.year}{e.grade && ` · ${e.grade}`}</div>
              </div>
            ))}
          </>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <>
            <SidebarHeader title="Languages" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 13.5, color: '#cbd5e1' }}>
              {languages.map((l, i) => (
                <div key={i}>
                  <strong style={{ color: '#fff' }}>{l.name}</strong> · <span style={{ color: BLUE_LIGHTER }}>{l.proficiency}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Right Main Panel */}
      <div style={{ flex: 1, background: LIGHT_BG, padding: '36px 28px 30px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        {summary && (
          <div>
            <SectionHeader title="Summary" />
            <p style={{ fontSize: 14.5, color: '#334155', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>{summary}</p>
          </div>
        )}

        {workExperience.length > 0 && (
          <div>
            <SectionHeader title="Experience" />
            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', borderLeft: `1.5px solid #dbeafe`, paddingLeft: 16, marginLeft: 6 }}>
              {workExperience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 16, position: 'relative' }}>
                  {/* Timeline circle */}
                  <div style={{
                    position: 'absolute',
                    left: -20,
                    top: 4,
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: BLUE,
                    border: `2px solid ${LIGHT_BG}`
                  }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a' }}>{exp.role}</div>
                    <div style={{ fontSize: 13.5, color: '#334155', fontWeight: 600 }}>
                      {exp.startDate}{(exp.startDate && (exp.current || exp.endDate)) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  <div style={{ fontSize: 14.5, color: BLUE_LIGHT, fontWeight: 700, marginBottom: 5 }}>{exp.company}</div>
                  <p style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.6, margin: 0 }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <SectionHeader title="Projects" />
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a' }}>
                    {proj.name} {proj.link && <a href={proj.link} style={{ fontSize: 12.5, color: BLUE, textDecoration: 'none' }}>↗</a>}
                  </div>
                  {proj.techStack && <div style={{ fontSize: 13.5, color: BLUE, fontStyle: 'italic' }}>{proj.techStack}</div>}
                </div>
                <p style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.5, margin: 0 }}>{proj.description}</p>
              </div>
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <SectionHeader title="Certifications" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {certifications.map((c, i) => (
                <div key={i} style={{ fontSize: 13.5, color: '#334155' }}>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{c.name}</div>
                  <div style={{ color: '#334155', fontSize: 12.5 }}>{c.issuer} {c.year && `· ${c.year}`}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
