import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function BlueProfessional({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills } = data;

  return (
    <div className="resume-template tpl-blue-prof" style={{ background: 'white', padding: '60px', minHeight: '1123px', boxSizing: 'border-box' }}>

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 30 }}>
        <div>
          <h1 style={{ fontSize: 34, fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{p.fullName || 'Your Name'}</h1>
          <p style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', marginTop: 4 }}>{p.jobTitle || 'Your Profession'}</p>
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 10 }}>
            {p.address} • {p.phone} • {p.email}
          </div>
        </div>
        {p.profilePhoto && (
          <img src={p.profilePhoto} alt="Profile" style={{ width: 100, height: 100, borderRadius: 4, objectFit: 'cover', border: '1px solid #e2e8f0' }} />
        )}
      </header>

      {summary && (
        <section style={{ marginBottom: 25 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)', borderBottom: '2px solid var(--color-primary)', paddingBottom: 4, marginBottom: 12 }}>Summary</h2>
          <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.7 }}>{summary}</p>
        </section>
      )}

      {workExperience.length > 0 && (
        <section style={{ marginBottom: 25 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)', borderBottom: '2px solid var(--color-primary)', paddingBottom: 4, marginBottom: 15 }}>Professional Experience</h2>
          {workExperience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{exp.role}, {exp.company}</h3>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#1e293b' }}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              {exp.description && (
                <ul style={{ paddingLeft: 18, marginTop: 8 }}>
                  {exp.description.split('\n').map((line, i) => (
                    <li key={i} style={{ fontSize: 11, color: '#475569', marginBottom: 5, lineHeight: 1.5 }}>{line.replace(/^[•\-\*]\s*/, '')}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: 25 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)', borderBottom: '2px solid var(--color-primary)', paddingBottom: 4, marginBottom: 15 }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{edu.degree}</h3>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#1e293b' }}>{edu.year}</span>
              </div>
              <p style={{ fontSize: 12, color: '#475569' }}>{edu.college}</p>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)', borderBottom: '2px solid var(--color-primary)', paddingBottom: 4, marginBottom: 15 }}>Technical Skills</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {skills.map((skill) => (
              <div key={skill} style={{ fontSize: 11, color: '#475569' }}>• {skill}</div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
