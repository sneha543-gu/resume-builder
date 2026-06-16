import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function ExecutiveData({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, certifications } = data;

  return (
    <div className="resume-template tpl-executive-data" style={{ background: 'white', padding: '60px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 25, borderBottom: '2px solid #000', paddingBottom: 15 }}>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 700, color: '#000' }}>{p.fullName || 'Your Name'}</h1>
          <p style={{ fontSize: 13, color: '#334155', fontWeight: 600, marginTop: 4, maxWidth: 400 }}>{p.jobTitle || 'Your Profession'}</p>
        </div>
        <div style={{ textAlign: 'right', fontSize: 11, color: '#475569', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {p.email && <span>{p.email} ✉️</span>}
          {p.phone && <span>{p.phone} 📞</span>}
          {p.address && <span>{p.address} 📍</span>}
          {p.linkedIn && <span>{p.linkedIn} 🔗</span>}
        </div>
      </header>

      {summary && (
        <section style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>Summary</h2>
          <p style={{ fontSize: 11, color: '#334155', lineHeight: 1.6 }}>{summary}</p>
        </section>
      )}

      {skills.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>Skills</h2>
          <p style={{ fontSize: 11, color: '#334155', lineHeight: 1.5 }}>• {skills.join(' • ')}</p>
        </section>
      )}

      {workExperience.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', marginBottom: 12 }}>Professional Experience</h2>
          {workExperience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 15 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: 12, fontWeight: 700 }}>{exp.role}</h3>
                <span style={{ fontSize: 10, color: '#64748b' }}>📅 {exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p style={{ fontSize: 11, color: '#334155', fontWeight: 600 }}>{exp.company}</p>
              {exp.description && (
                <ul style={{ paddingLeft: 16, marginTop: 6 }}>
                  {exp.description.split('\n').map((line, i) => (
                    <li key={i} style={{ fontSize: 10.5, color: '#475569', marginBottom: 3 }}>{line.replace(/^[•\-\*]\s*/, '')}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', marginBottom: 12 }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: 12, fontWeight: 700 }}>{edu.degree}</h3>
                <p style={{ fontSize: 11, color: '#475569' }}>{edu.college}</p>
              </div>
              <span style={{ fontSize: 11, color: '#64748b' }}>📅 {edu.year}</span>
            </div>
          ))}
        </section>
      )}

      {certifications.length > 0 && (
        <section>
          <h2 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', marginBottom: 10 }}>Certifications and Training</h2>
          <ul style={{ paddingLeft: 16, margin: 0 }}>
            {certifications.map((cert) => (
              <li key={cert.id} style={{ fontSize: 10.5, color: '#475569', marginBottom: 4 }}>{cert.name} — {cert.issuer} ({cert.year})</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
