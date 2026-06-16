import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function SkyBlueMinimal({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;
  const SKY_BLUE = '#0369a1';
  const BORDER_COLOR = '#bae6fd';
  const TEXT_GRAY = '#334155';

  const SectionHeader = ({ title }: { title: string }) => (
    <div style={{ borderBottom: `1px solid ${BORDER_COLOR}`, paddingBottom: 3, margin: '20px 0 10px' }}>
      <span style={{ fontSize: 14.5, fontWeight: 700, color: SKY_BLUE, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{title}</span>
    </div>
  );

  return (
    <div className="resume-template" style={{ width: 794, minHeight: 1123, fontFamily: 'system-ui, -apple-system, sans-serif', background: '#fff', boxSizing: 'border-box', padding: '40px 50px', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: SKY_BLUE, margin: 0, letterSpacing: '-0.02em' }}>{p.fullName || 'YOUR NAME'}</h1>
        <p style={{ fontSize: 16, color: TEXT_GRAY, margin: 0, fontStyle: 'italic', fontWeight: 500 }}>{p.jobTitle || 'Professional Title'}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', fontSize: 13.5, color: TEXT_GRAY, marginTop: 8, borderTop: `1px solid ${BORDER_COLOR}`, paddingTop: 8 }}>
          {p.email && <span>✉ {p.email}</span>}
          {p.phone && <span>📞 {p.phone}</span>}
          {p.address && <span>📍 {p.address}</span>}
          {p.linkedIn && <span>🔗 {p.linkedIn}</span>}
          {p.github && <span>💻 {p.github}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div style={{ marginTop: 12 }}>
          <SectionHeader title="Summary" />
          <p style={{ fontSize: 14.5, color: '#334155', lineHeight: 1.65, margin: 0 }}>{summary}</p>
        </div>
      )}

      {/* Experience */}
      {workExperience.length > 0 && (
        <div>
          <SectionHeader title="Professional Experience" />
          {workExperience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#1e293b' }}>
                  {exp.role} <span style={{ color: SKY_BLUE, fontWeight: 400 }}>| {exp.company}</span>
                </div>
                <div style={{ fontSize: 13.5, color: TEXT_GRAY, fontWeight: 500 }}>
                  {exp.startDate}{(exp.startDate && (exp.current || exp.endDate)) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                </div>
              </div>
              <p style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.55, margin: 0 }}>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <SectionHeader title="Projects" />
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#1e293b' }}>
                  {proj.name} {proj.link && <a href={proj.link} style={{ fontSize: 12.5, color: SKY_BLUE, textDecoration: 'none' }}>↗</a>}
                </div>
                {proj.techStack && <div style={{ fontSize: 13.5, color: SKY_BLUE, fontStyle: 'italic' }}>{proj.techStack}</div>}
              </div>
              <p style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.5, margin: 0 }}>{proj.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <SectionHeader title="Technical Skills" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {skills.map((s, i) => (
              <div key={i} style={{ fontSize: 13.5, background: '#eff6ff', color: SKY_BLUE, padding: '3px 8px', borderRadius: 20, border: `1px solid ${BORDER_COLOR}`, fontWeight: 500 }}>
                {s}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two Columns for Education & Certs */}
      <div style={{ display: 'flex', gap: 40, marginTop: 10 }}>
        {education.length > 0 && (
          <div style={{ flex: 1.2 }}>
            <SectionHeader title="Education" />
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ fontWeight: 700, fontSize: 14.5, color: '#1e293b' }}>{e.degree}</div>
                <div style={{ fontSize: 14, color: '#1e293b' }}>{e.college}</div>
                <div style={{ fontSize: 13, color: TEXT_GRAY }}>{e.year}{e.grade && ` · ${e.grade}`}</div>
              </div>
            ))}
          </div>
        )}

        {(certifications.length > 0 || languages.length > 0) && (
          <div style={{ flex: 1 }}>
            {certifications.length > 0 && (
              <div>
                <SectionHeader title="Certifications" />
                {certifications.map((c, i) => (
                  <div key={i} style={{ marginBottom: 8, fontSize: 13.5 }}>
                    <div style={{ fontWeight: 600, color: '#1e293b' }}>{c.name}</div>
                    <div style={{ color: TEXT_GRAY }}>{c.issuer} {c.year && `· ${c.year}`}</div>
                  </div>
                ))}
              </div>
            )}

            {languages.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <SectionHeader title="Languages" />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 12px', fontSize: 13.5 }}>
                  {languages.map((l, i) => (
                    <div key={i} style={{ color: '#1e293b' }}>
                      <strong style={{ color: '#1e293b' }}>{l.name}</strong> · {l.proficiency}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
