import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function MonoClean({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;

  const SectionHeader = ({ title }: { title: string }) => (
    <div style={{ borderTop: '2.5px solid #000', borderBottom: '1px solid #111', padding: '6px 0', margin: '20px 0 10px' }}>
      <span style={{ fontSize: 14.5, fontWeight: 900, color: '#000', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{title}</span>
    </div>
  );

  return (
    <div className="resume-template" style={{ width: 794, minHeight: 1123, fontFamily: '"Courier New", Courier, monospace, "Georgia", serif', background: '#fff', boxSizing: 'border-box', padding: '45px 50px', display: 'flex', flexDirection: 'column', color: '#000' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <h1 style={{ fontSize: 38, fontWeight: 900, margin: '0 0 6px 0', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{p.fullName || 'YOUR NAME'}</h1>
        <div style={{ height: 1.5, background: '#000', margin: '4px 0' }} />
        <p style={{ fontSize: 16, color: '#111827', margin: '6px 0 8px 0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{p.jobTitle || 'Professional Title'}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 16px', fontSize: 13.5, color: '#111827' }}>
          {p.email && <span>Email: {p.email}</span>}
          {p.phone && <span>Phone: {p.phone}</span>}
          {p.address && <span>Address: {p.address}</span>}
          {p.linkedIn && <span>LinkedIn: {p.linkedIn}</span>}
          {p.github && <span>GitHub: {p.github}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div>
          <SectionHeader title="Professional Summary" />
          <p style={{ fontSize: 13.5, color: '#111827', lineHeight: 1.8, margin: 0, textAlign: 'justify' }}>{summary}</p>
        </div>
      )}

      {/* Experience */}
      {workExperience.length > 0 && (
        <div>
          <SectionHeader title="Work Experience" />
          {workExperience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 800, fontSize: 14.5, color: '#000' }}>{exp.role}</span>
                <span style={{ fontSize: 12, color: '#111827', fontWeight: 600 }}>
                  {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div style={{ fontSize: 13, color: '#111827', fontWeight: 700, marginBottom: 4 }}>{exp.company}</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.7, margin: 0, color: '#111827', textAlign: 'justify', whiteSpace: 'pre-line' }}>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <SectionHeader title="Projects" />
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 800, fontSize: 14.5, color: '#000' }}>{proj.name}</span>
                {proj.link && (
                  <span style={{ fontSize: 11.5, color: '#111827' }}>{proj.link}</span>
                )}
              </div>
              {proj.techStack && (
                <div style={{ fontSize: 12, color: '#111827', fontStyle: 'italic', marginBottom: 3 }}>
                  Tech: {proj.techStack}
                </div>
              )}
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: '#111827', textAlign: 'justify' }}>{proj.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <SectionHeader title="Skills" />
          <div style={{ margin: 0, color: '#111827', fontSize: 13.5, lineHeight: 1.7 }}>
            {skills.map((s, i) => {
              const colon = s.indexOf(':');
              return (
                <div key={i} style={{ marginBottom: 4 }}>
                  {colon > -1 ? <><strong>{s.slice(0, colon)}:</strong>{s.slice(colon + 1)}</> : s}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <SectionHeader title="Education" />
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 800, fontSize: 14.5, color: '#000' }}>{edu.degree}</span>
                <span style={{ fontSize: 12, color: '#111827', fontWeight: 600 }}>{edu.year}</span>
              </div>
              <div style={{ fontSize: 13, color: '#111827' }}>
                {edu.college}{edu.grade ? ` — ${edu.grade}` : ''}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div>
          <SectionHeader title="Certifications" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ fontSize: 13, color: '#111827' }}>
                <div style={{ fontWeight: 700, color: '#000' }}>{cert.name}</div>
                <div style={{ color: '#111827', fontSize: 11.5 }}>
                  {cert.issuer}{cert.year ? `, ${cert.year}` : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div>
          <SectionHeader title="Languages" />
          <p style={{ margin: 0, color: '#111827', fontSize: 13.5, lineHeight: 1.7 }}>
            {languages.map((l) => `${l.name} (${l.proficiency})`).join(' | ')}
          </p>
        </div>
      )}
    </div>
  );
}