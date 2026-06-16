import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function AquaModern({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;
  const AQUA = '#0891b2';
  const DARK = '#0c4a6e';
  const LIGHT = '#e0f7fa';

  const Section = ({ title }: { title: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '18px 0 10px' }}>
      <div style={{ width: 4, height: 18, background: AQUA, borderRadius: 2 }} />
      <span style={{ fontSize: 14, fontWeight: 800, color: DARK, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{title}</span>
      <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
    </div>
  );

  return (
    <div className="resume-template" style={{ width: 794, minHeight: 1123, fontFamily: '"Segoe UI", Arial, sans-serif', background: '#fff', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${DARK} 0%, ${AQUA} 100%)`, padding: '36px 48px 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ position: 'absolute', bottom: -40, right: 80, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <h1 style={{ color: '#fff', fontSize: 32, fontWeight: 900, margin: 0, letterSpacing: 1 }}>{p.fullName || 'YOUR NAME'}</h1>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, margin: '6px 0 16px', fontWeight: 400 }}>{p.jobTitle || 'Professional Title'}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
          {p.email && <span>✉ {p.email}</span>}
          {p.phone && <span>📞 {p.phone}</span>}
          {p.address && <span>📍 {p.address}</span>}
          {p.linkedIn && <span>🔗 {p.linkedIn}</span>}
          {p.github && <span>💻 {p.github}</span>}
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Left */}
        <div style={{ width: '34%', background: LIGHT, padding: '20px 20px 30px', boxSizing: 'border-box' }}>
          {skills.length > 0 && (
            <>
              <Section title="Skills" />
              {skills.map((s, i) => {
                const colon = s.indexOf(':');
                return (
                  <div key={i} style={{ fontSize: 14, color: '#1e293b', marginBottom: 6, paddingLeft: 8, borderLeft: `2px solid ${AQUA}`, lineHeight: 1.5 }}>
                    {colon > -1 ? <><strong>{s.slice(0, colon)}:</strong>{s.slice(colon + 1)}</> : s}
                  </div>
                );
              })}
            </>
          )}
          {education.length > 0 && (
            <>
              <Section title="Education" />
              {education.map((e, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 700, fontSize: 14.5, color: DARK }}>{e.degree}</div>
                  <div style={{ fontSize: 14, color: '#1e293b' }}>{e.college}</div>
                  <div style={{ fontSize: 13.5, color: '#1e293b' }}>{e.year}{e.grade && ` · ${e.grade}`}</div>
                </div>
              ))}
            </>
          )}
          {languages.length > 0 && (
            <>
              <Section title="Languages" />
              {languages.map((l, i) => (
                <div key={i} style={{ fontSize: 14, color: '#1e293b', marginBottom: 5 }}>
                  <span style={{ fontWeight: 600 }}>{l.name}</span>
                  <span style={{ color: '#334155' }}> · {l.proficiency}</span>
                </div>
              ))}
            </>
          )}
          {certifications.length > 0 && (
            <>
              <Section title="Certifications" />
              {certifications.map((c, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: DARK }}>{c.name}</div>
                  <div style={{ fontSize: 13.5, color: '#334155' }}>{c.issuer}{c.year && ` · ${c.year}`}</div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Right */}
        <div style={{ flex: 1, padding: '20px 28px 30px', boxSizing: 'border-box' }}>
          {summary && (
            <>
              <Section title="Professional Summary" />
              <p style={{ fontSize: 15, color: '#111827', lineHeight: 1.8, margin: 0, textAlign: 'justify' }}>{summary}</p>
            </>
          )}
          {workExperience.length > 0 && (
            <>
              <Section title="Work Experience" />
              {workExperience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 16, paddingLeft: 12, borderLeft: `3px solid ${AQUA}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontWeight: 700, fontSize: 15.5, color: DARK }}>{exp.role}</div>
                    <div style={{ fontSize: 13.5, color: '#1e293b', whiteSpace: 'nowrap', marginLeft: 8 }}>{exp.startDate}{(exp.startDate && (exp.current || exp.endDate)) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}</div>
                  </div>
                  <div style={{ fontSize: 14.5, color: AQUA, fontWeight: 600, marginBottom: 4 }}>{exp.company}</div>
                  <p style={{ fontSize: 14.5, color: '#1f2937', lineHeight: 1.65, margin: 0 }}>{exp.description}</p>
                </div>
              ))}
            </>
          )}
          {projects.length > 0 && (
            <>
              <Section title="Projects" />
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: DARK }}>{proj.name} {proj.link && <a href={proj.link} style={{ fontSize: 13, color: AQUA, textDecoration: 'none' }}>↗</a>}</div>
                  <div style={{ fontSize: 13.5, color: '#334155', fontStyle: 'italic', marginBottom: 3 }}>{proj.techStack}</div>
                  <p style={{ fontSize: 14, color: '#1f2937', lineHeight: 1.5, margin: 0 }}>{proj.description}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
