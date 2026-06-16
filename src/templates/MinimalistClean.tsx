import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function MinimalistClean({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, certifications } = data;

  return (
    <div className="resume-template tpl-minimal-clean" style={{ padding: '60px' }}>
      <header style={{ textAlign: 'center', marginBottom: 35 }}>
        <h1 style={{ fontSize: 42, fontWeight: 900, textTransform: 'uppercase', marginBottom: 12, color: '#000', letterSpacing: '-0.03em', lineHeight: 1 }}>{p.fullName || 'Your Name'}</h1>
        <p style={{ fontSize: 16, fontWeight: 700, color: '#475569', marginBottom: 10, letterSpacing: '0.05em' }}>{p.jobTitle || 'Your Profession'}</p>
        <div style={{ fontSize: 12, color: '#64748b', display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', fontWeight: 500 }}>
          {p.address && <span>{p.address}</span>}
          {p.email && <span>• {p.email}</span>}
          {p.phone && <span>• {p.phone}</span>}
          {p.linkedIn && <span>• {p.linkedIn}</span>}
          {p.website && <span>• {p.website}</span>}
        </div>
      </header>

      {summary && (
        <section style={{ marginBottom: 30 }}>
          <h2 className="section-header">Professional Summary</h2>
          <p style={{ fontSize: 12.5, color: '#334155', lineHeight: 1.75 }}>{summary}</p>
        </section>
      )}

      {workExperience.length > 0 && (
        <section style={{ marginBottom: 30 }}>
          <h2 className="section-header">Work Experience</h2>
          {workExperience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a' }}>{exp.role}</h3>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: '#64748b' }}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>{exp.company}</p>
              {exp.description && (
                <ul className="bullet-list">
                  {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                    <li key={i} style={{ fontSize: 11.5, color: '#475569', marginBottom: 6, lineHeight: 1.6 }}>{line.replace(/^[•\-\*]\s*/, '')}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: 30 }}>
          <h2 className="section-header">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>{edu.degree}</h3>
                <p style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>{edu.college}</p>
              </div>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: '#64748b' }}>{edu.year}</span>
            </div>
          ))}
        </section>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
        {skills.length > 0 && (
          <section>
            <h2 className="section-header">Skills</h2>
            <ul className="bullet-list">
              <li style={{ fontSize: 11.5, color: '#475569', lineHeight: 1.6 }}>{skills.join(', ')}</li>
            </ul>
          </section>
        )}

        {certifications.length > 0 && (
          <section>
            <h2 className="section-header">Certifications</h2>
            <ul className="bullet-list">
              {certifications.map((cert) => (
                <li key={cert.id} style={{ fontSize: 11.5, color: '#475569', marginBottom: 4 }}>{cert.name} — {cert.issuer} ({cert.year})</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
