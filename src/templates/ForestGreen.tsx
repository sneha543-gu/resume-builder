import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function ForestGreen({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;
  const GREEN = '#166534';
  const MID = '#15803d';
  const LIGHT = '#f0fdf4';

  const Sec = ({ t }: { t: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '18px 0 9px' }}>
      <div style={{ width: 28, height: 28, borderRadius: '50%', background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#86efac' }} />
      </div>
      <span style={{ fontSize: 14, fontWeight: 800, color: GREEN, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{t}</span>
      <div style={{ flex: 1, height: 1, background: '#bbf7d0' }} />
    </div>
  );

  return (
    <div className="resume-template" style={{ width: 794, minHeight: 1123, fontFamily: '"Segoe UI", Arial, sans-serif', background: '#fff', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ background: GREEN, padding: '30px 48px 22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ color: '#fff', fontSize: 30, fontWeight: 900, margin: 0, letterSpacing: 1.5 }}>{p.fullName || 'YOUR NAME'}</h1>
            <p style={{ color: '#86efac', fontSize: 16, margin: '5px 0 0', fontWeight: 500 }}>{p.jobTitle || 'Professional Title'}</p>
          </div>
          <div style={{ textAlign: 'right', fontSize: 13.5, color: '#d1fae5', lineHeight: 1.9 }}>
            {p.email && <div>{p.email}</div>}
            {p.phone && <div>{p.phone}</div>}
            {p.address && <div>{p.address}</div>}
            {p.linkedIn && <div>{p.linkedIn}</div>}
            {p.github && <div>{p.github}</div>}
          </div>
        </div>
      </div>
      {/* Green accent bar */}
      <div style={{ height: 6, background: `linear-gradient(90deg, #86efac, #22c55e, #166534)` }} />

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Left */}
        <div style={{ width: '33%', background: LIGHT, padding: '16px 18px 30px', boxSizing: 'border-box', borderRight: '1px solid #bbf7d0' }}>
          {skills.length > 0 && (
            <>
              <Sec t="Skills" />
              {skills.map((s, i) => {
                const c = s.indexOf(':');
                return (
                  <div key={i} style={{ fontSize: 14, color: '#1f2937', marginBottom: 6, paddingLeft: 10, borderLeft: `2px solid ${MID}`, lineHeight: 1.5 }}>
                    {c > -1 ? <><strong>{s.slice(0, c)}:</strong>{s.slice(c + 1)}</> : s}
                  </div>
                );
              })}
            </>
          )}
          {education.length > 0 && (
            <>
              <Sec t="Education" />
              {education.map((e, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ fontWeight: 700, fontSize: 14.5, color: GREEN }}>{e.degree}</div>
                  <div style={{ fontSize: 14, color: '#111827' }}>{e.college}</div>
                  <div style={{ fontSize: 13.5, color: '#111827' }}>{e.year}{e.grade && ` · ${e.grade}`}</div>
                </div>
              ))}
            </>
          )}
          {languages.length > 0 && (
            <>
              <Sec t="Languages" />
              {languages.map((l, i) => (
                <div key={i} style={{ fontSize: 14, marginBottom: 5, color: '#111827' }}>
                  <strong>{l.name}</strong> <span style={{ color: '#111827' }}>· {l.proficiency}</span>
                </div>
              ))}
            </>
          )}
          {certifications.length > 0 && (
            <>
              <Sec t="Certifications" />
              {certifications.map((c, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: GREEN }}>{c.name}</div>
                  <div style={{ fontSize: 13.5, color: '#111827' }}>{c.issuer}{c.year && ` · ${c.year}`}</div>
                </div>
              ))}
            </>
          )}
        </div>
        {/* Right */}
        <div style={{ flex: 1, padding: '16px 28px 30px', boxSizing: 'border-box' }}>
          {summary && (
            <>
              <Sec t="Summary" />
              <p style={{ fontSize: 15, color: '#111827', lineHeight: 1.8, margin: 0 }}>{summary}</p>
            </>
          )}
          {workExperience.length > 0 && (
            <>
              <Sec t="Experience" />
              {workExperience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 16, borderLeft: `3px solid #22c55e`, paddingLeft: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ fontWeight: 700, fontSize: 15.5, color: GREEN }}>{exp.role}</div>
                    <div style={{ fontSize: 13.5, color: '#1f2937' }}>{exp.startDate}{(exp.startDate && (exp.current || exp.endDate)) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}</div>
                  </div>
                  <div style={{ fontSize: 14.5, color: MID, fontWeight: 600, marginBottom: 4 }}>{exp.company}</div>
                  <p style={{ fontSize: 14.5, color: '#1f2937', lineHeight: 1.65, margin: 0 }}>{exp.description}</p>
                </div>
              ))}
            </>
          )}
          {projects.length > 0 && (
            <>
              <Sec t="Projects" />
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: GREEN }}>{proj.name}</div>
                  <div style={{ fontSize: 13.5, color: '#111827', fontStyle: 'italic', marginBottom: 3 }}>{proj.techStack}</div>
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
