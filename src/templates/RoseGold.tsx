import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function RoseGold({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;
  const ROSE = '#be185d';
  const GOLD = '#b45309';
  const LIGHT_ROSE = '#fff1f2';

  const Heading = ({ title }: { title: string }) => (
    <div style={{ marginBottom: 10, marginTop: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 20, height: 2, background: ROSE }} />
        <span style={{ fontSize: 14, fontWeight: 800, color: ROSE, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{title}</span>
        <div style={{ flex: 1, height: 1, background: '#fce7f3' }} />
      </div>
    </div>
  );

  return (
    <div className="resume-template" style={{ width: 794, minHeight: 1123, fontFamily: 'Georgia, "Times New Roman", serif', background: '#fff', boxSizing: 'border-box' }}>
      {/* Top Header */}
      <div style={{ background: LIGHT_ROSE, borderBottom: `4px solid ${ROSE}`, padding: '32px 48px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontSize: 34, fontWeight: 700, color: ROSE, margin: 0, letterSpacing: 1 }}>{p.fullName || 'YOUR NAME'}</h1>
            <p style={{ fontSize: 16, color: GOLD, margin: '6px 0 0', fontStyle: 'italic', fontWeight: 600 }}>{p.jobTitle || 'Professional Title'}</p>
          </div>
          <div style={{ textAlign: 'right', fontSize: 14, color: '#111827', lineHeight: 1.9 }}>
            {p.email && <div>{p.email}</div>}
            {p.phone && <div>{p.phone}</div>}
            {p.address && <div>{p.address}</div>}
            {p.linkedIn && <div>{p.linkedIn}</div>}
            {p.github && <div>{p.github}</div>}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Left Sidebar */}
        <div style={{ width: '30%', background: '#fdf2f8', borderRight: `1px solid #fce7f3`, padding: '20px 18px 30px', boxSizing: 'border-box' }}>
          {skills.length > 0 && (
            <>
              <Heading title="Skills" />
              {skills.map((s, i) => {
                const c = s.indexOf(':');
                return (
                  <div key={i} style={{ fontSize: 14, color: '#111827', marginBottom: 6, lineHeight: 1.5 }}>
                    {c > -1 ? <><strong style={{ color: ROSE }}>{s.slice(0, c)}:</strong>{s.slice(c + 1)}</> : <><span style={{ color: ROSE, marginRight: 4 }}>◆</span>{s}</>}
                  </div>
                );
              })}
            </>
          )}
          {education.length > 0 && (
            <>
              <Heading title="Education" />
              {education.map((e, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ fontWeight: 700, fontSize: 14.5, color: '#1f2937' }}>{e.degree}</div>
                  <div style={{ fontSize: 14, color: ROSE, fontStyle: 'italic' }}>{e.college}</div>
                  <div style={{ fontSize: 13.5, color: '#1f2937' }}>{e.year}{e.grade && ` · ${e.grade}`}</div>
                </div>
              ))}
            </>
          )}
          {languages.length > 0 && (
            <>
              <Heading title="Languages" />
              {languages.map((l, i) => (
                <div key={i} style={{ fontSize: 14, color: '#111827', marginBottom: 5 }}>
                  <span style={{ fontWeight: 700 }}>{l.name}</span> <span style={{ color: '#1f2937' }}>— {l.proficiency}</span>
                </div>
              ))}
            </>
          )}
          {certifications.length > 0 && (
            <>
              <Heading title="Certifications" />
              {certifications.map((c, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#1f2937' }}>{c.name}</div>
                  <div style={{ fontSize: 13.5, color: '#1f2937' }}>{c.issuer}{c.year && ` · ${c.year}`}</div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Right Main */}
        <div style={{ flex: 1, padding: '20px 30px 30px', boxSizing: 'border-box' }}>
          {summary && (
            <>
              <Heading title="Professional Summary" />
              <p style={{ fontSize: 15, color: '#111827', lineHeight: 1.85, margin: 0, textAlign: 'justify' }}>{summary}</p>
            </>
          )}
          {workExperience.length > 0 && (
            <>
              <Heading title="Work Experience" />
              {workExperience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontWeight: 700, fontSize: 15.5, color: '#111827' }}>{exp.role}</div>
                    <div style={{ fontSize: 13.5, color: '#1f2937' }}>{exp.startDate}{(exp.startDate && (exp.current || exp.endDate)) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}</div>
                  </div>
                  <div style={{ fontSize: 14.5, color: ROSE, fontStyle: 'italic', marginBottom: 4 }}>{exp.company}</div>
                  <p style={{ fontSize: 14.5, color: '#1f2937', lineHeight: 1.65, margin: 0 }}>{exp.description}</p>
                </div>
              ))}
            </>
          )}
          {projects.length > 0 && (
            <>
              <Heading title="Projects" />
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#1f2937' }}>{proj.name}</div>
                  <div style={{ fontSize: 13.5, color: GOLD, marginBottom: 3, fontStyle: 'italic' }}>{proj.techStack}</div>
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
