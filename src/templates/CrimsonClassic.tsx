import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function CrimsonClassic({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;
  const CRIMSON = '#9b1c1c';
  const TEXT_DARK = '#1f2937';
  const BORDER_LIGHT = '#f3f4f6';

  const SectionHeader = ({ title }: { title: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '22px 0 12px' }}>
      <div style={{ width: 4, height: 18, background: CRIMSON, borderRadius: 2 }} />
      <span style={{ fontSize: 15, fontWeight: 800, color: CRIMSON, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{title}</span>
      <div style={{ flex: 1, height: 1, background: BORDER_LIGHT }} />
    </div>
  );

  return (
    <div className="resume-template" style={{ width: 794, minHeight: 1123, fontFamily: '"Segoe UI", Arial, sans-serif', background: '#fff', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', color: TEXT_DARK, paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ background: CRIMSON, padding: '36px 48px', color: '#fff', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, margin: 0, letterSpacing: '0.05em' }}>{p.fullName || 'YOUR NAME'}</h1>
        <p style={{ fontSize: 16, margin: 0, fontWeight: 400, color: '#fca5a5' }}>{p.jobTitle || 'Professional Title'}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 24px', fontSize: 14.5, color: '#fee2e2', marginTop: 10 }}>
          {p.email && <span>✉ {p.email}</span>}
          {p.phone && <span>📞 {p.phone}</span>}
          {p.address && <span>📍 {p.address}</span>}
          {p.linkedIn && <span>🔗 {p.linkedIn}</span>}
          {p.github && <span>💻 {p.github}</span>}
        </div>
      </div>

      {/* Main Body */}
      <div style={{ padding: '24px 48px', flex: 1 }}>
        {summary && (
          <div>
            <SectionHeader title="Professional Summary" />
            <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0, textAlign: 'justify', color: '#111827' }}>{summary}</p>
          </div>
        )}

        {workExperience.length > 0 && (
          <div>
            <SectionHeader title="Work Experience" />
            {workExperience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 3 }}>
                  <div style={{ fontWeight: 700, fontSize: 15.5, color: '#111827' }}>{exp.role}</div>
                  <div style={{ fontSize: 14, color: '#111827', fontWeight: 600 }}>
                    {exp.startDate}{(exp.startDate && (exp.current || exp.endDate)) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <div style={{ fontSize: 15, color: CRIMSON, fontWeight: 600, fontStyle: 'italic', marginBottom: 6 }}>{exp.company}</div>
                <p style={{ fontSize: 14.5, color: '#1f2937', lineHeight: 1.6, margin: 0 }}>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <SectionHeader title="Projects" />
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>
                    {proj.name} {proj.link && <a href={proj.link} style={{ fontSize: 13, color: CRIMSON, textDecoration: 'none' }}>↗</a>}
                  </div>
                  {proj.techStack && <div style={{ fontSize: 14, color: '#111827', fontStyle: 'italic' }}>{proj.techStack}</div>}
                </div>
                <p style={{ fontSize: 14.5, color: '#1f2937', lineHeight: 1.55, margin: 0 }}>{proj.description}</p>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: 32, marginTop: 10 }}>
          {/* Left Sub-column */}
          <div style={{ flex: 1.2 }}>
            {skills.length > 0 && (
              <div>
                <SectionHeader title="Skills & Competencies" />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {skills.map((s, i) => (
                    <div key={i} style={{ fontSize: 13.5, background: '#fef2f2', color: CRIMSON, padding: '4px 10px', borderRadius: 4, fontWeight: 600, border: '1px solid #fee2e2' }}>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sub-column */}
          <div style={{ flex: 1 }}>
            {education.length > 0 && (
              <div>
                <SectionHeader title="Education" />
                {education.map((e, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>{e.degree}</div>
                    <div style={{ fontSize: 14, color: '#1f2937' }}>{e.college}</div>
                    <div style={{ fontSize: 13.5, color: '#1f2937', marginTop: 1 }}>{e.year}{e.grade && ` · ${e.grade}`}</div>
                  </div>
                ))}
              </div>
            )}

            {certifications.length > 0 && (
              <div style={{ marginTop: 10 }}>
                <SectionHeader title="Certifications" />
                {certifications.map((c, i) => (
                  <div key={i} style={{ marginBottom: 8 }}>
                    <div style={{ fontWeight: 600, fontSize: 14.5, color: '#111827' }}>{c.name}</div>
                    <div style={{ fontSize: 13.5, color: '#111827' }}>{c.issuer}{c.year && ` · ${c.year}`}</div>
                  </div>
                ))}
              </div>
            )}

            {languages.length > 0 && (
              <div style={{ marginTop: 10 }}>
                <SectionHeader title="Languages" />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px' }}>
                  {languages.map((l, i) => (
                    <div key={i} style={{ fontSize: 14, color: '#111827' }}>
                      <span style={{ fontWeight: 700 }}>{l.name}</span>
                      <span style={{ color: '#1f2937' }}> ({l.proficiency})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
