import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function CharcoalModern({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;
  const CHARCOAL = '#1c1917';
  const CYAN = '#06b6d4';
  const LIGHT_BG = '#f8fafc';

  const RightSectionHeader = ({ title }: { title: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '22px 0 12px' }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: CYAN }} />
      <span style={{ fontSize: 14, fontWeight: 800, color: CHARCOAL, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{title}</span>
      <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
    </div>
  );

  const LeftSectionHeader = ({ title }: { title: string }) => (
    <div style={{ margin: '20px 0 10px' }}>
      <span style={{ fontSize: 13, fontWeight: 800, color: CYAN, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{title}</span>
      <div style={{ height: 1, background: 'rgba(6, 182, 212, 0.25)', marginTop: 4 }} />
    </div>
  );

  return (
    <div className="resume-template" style={{ width: 794, minHeight: 1123, fontFamily: '"Segoe UI", Roboto, sans-serif', background: '#fff', boxSizing: 'border-box', display: 'flex' }}>
      {/* Left Sidebar */}
      <div style={{ width: '35%', background: CHARCOAL, color: '#f5f5f4', padding: '36px 20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '0.02em', textTransform: 'uppercase' }}>{p.fullName || 'YOUR NAME'}</h1>
        <p style={{ fontSize: 15, color: CYAN, fontWeight: 700, margin: '6px 0 24px', letterSpacing: '0.05em' }}>{p.jobTitle || 'Professional Title'}</p>

        {/* Contact */}
        <LeftSectionHeader title="Contact" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13.5, color: '#d6d3d1', wordBreak: 'break-all' }}>
          {p.email && <div>✉ {p.email}</div>}
          {p.phone && <div>📞 {p.phone}</div>}
          {p.address && <div>📍 {p.address}</div>}
          {p.linkedIn && <div>🔗 {p.linkedIn}</div>}
          {p.github && <div>💻 {p.github}</div>}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <>
            <LeftSectionHeader title="Skills" />
            <ul style={{ margin: 0, paddingLeft: 12, fontSize: 13.5, color: '#d6d3d1', lineHeight: 1.6 }}>
              {skills.map((s, i) => (
                <li key={i} style={{ marginBottom: 4 }}>{s}</li>
              ))}
            </ul>
          </>
        )}

        {/* Education */}
        {education.length > 0 && (
          <>
            <LeftSectionHeader title="Education" />
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>{e.degree}</div>
                <div style={{ fontSize: 13, color: '#d6d3d1', marginTop: 1 }}>{e.college}</div>
                <div style={{ fontSize: 12.5, color: '#a8a29e', marginTop: 1 }}>{e.year}{e.grade && ` · ${e.grade}`}</div>
              </div>
            ))}
          </>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <>
            <LeftSectionHeader title="Languages" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13.5, color: '#d6d3d1' }}>
              {languages.map((l, i) => (
                <div key={i}>
                  <strong style={{ color: '#fff' }}>{l.name}</strong>
                  <span style={{ color: '#a8a29e' }}> — {l.proficiency}</span>
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
            <RightSectionHeader title="Summary" />
            <p style={{ fontSize: 14.5, color: '#44403c', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>{summary}</p>
          </div>
        )}

        {workExperience.length > 0 && (
          <div>
            <RightSectionHeader title="Experience" />
            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', borderLeft: `1px solid #e2e8f0`, paddingLeft: 16, marginLeft: 6 }}>
              {workExperience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 16, position: 'relative' }}>
                  {/* Timeline Dot */}
                  <div style={{
                    position: 'absolute',
                    left: -20,
                    top: 4,
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: CYAN,
                    border: `2px solid ${LIGHT_BG}`
                  }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#1c1917' }}>{exp.role}</div>
                    <div style={{ fontSize: 13.5, color: '#78716c', fontWeight: 600 }}>
                      {exp.startDate}{(exp.startDate && (exp.current || exp.endDate)) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  <div style={{ fontSize: 14, color: CYAN, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{exp.company}</div>
                  <p style={{ fontSize: 14, color: '#44403c', lineHeight: 1.6, margin: 0 }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <RightSectionHeader title="Projects" />
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#1c1917' }}>
                    {proj.name} {proj.link && <a href={proj.link} style={{ fontSize: 12.5, color: CYAN, textDecoration: 'none' }}>↗</a>}
                  </div>
                  {proj.techStack && <div style={{ fontSize: 13.5, color: CYAN, fontStyle: 'italic' }}>{proj.techStack}</div>}
                </div>
                <p style={{ fontSize: 14, color: '#44403c', lineHeight: 1.5, margin: 0 }}>{proj.description}</p>
              </div>
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <RightSectionHeader title="Certifications" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
              {certifications.map((c, i) => (
                <div key={i} style={{ fontSize: 13.5, color: '#44403c' }}>
                  <div style={{ fontWeight: 700, color: '#1c1917' }}>{c.name}</div>
                  <div style={{ color: '#78716c', fontSize: 13 }}>{c.issuer} {c.year && `· ${c.year}`}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
