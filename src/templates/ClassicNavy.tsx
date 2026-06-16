import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function ClassicNavy({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills } = data;

  return (
    <div className="resume-template tpl-classic-navy" style={{ display: 'flex', background: 'white' }}>
      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px' }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 35 }}>
          {p.profilePhoto && (
            <img src={p.profilePhoto} alt="Profile" style={{ width: 70, height: 70, borderRadius: '50%', objectFit: 'cover' }} />
          )}
          <div>
            <h1 style={{ fontSize: 32, fontFamily: 'serif', fontWeight: 600, color: '#1e293b' }}>{p.fullName || 'Your Name'}</h1>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b', marginTop: 4 }}>{p.jobTitle || 'Your Profession'}</p>
          </div>
        </header>

        {summary && (
          <section style={{ marginBottom: 30 }}>
            <h2 style={{ fontSize: 18, fontFamily: 'serif', color: '#1e293b', marginBottom: 12 }}>Profile</h2>
            <p style={{ fontSize: 11, color: '#334155', lineHeight: 1.8 }}>{summary}</p>
          </section>
        )}

        {workExperience.length > 0 && (
          <section style={{ marginBottom: 30 }}>
            <h2 style={{ fontSize: 18, fontFamily: 'serif', color: '#1e293b', marginBottom: 15 }}>Employment History</h2>
            {workExperience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>{exp.role}, {exp.company}</h3>
                <p style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 8 }}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</p>
                {exp.description && (
                  <ul style={{ paddingLeft: 16, margin: 0 }}>
                    {exp.description.split('\n').map((line, i) => (
                      <li key={i} style={{ fontSize: 10.5, color: '#475569', marginBottom: 5, lineHeight: 1.5 }}>{line.replace(/^[•\-\*]\s*/, '')}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 style={{ fontSize: 18, fontFamily: 'serif', color: '#1e293b', marginBottom: 15 }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: 12 }}>
                <h3 style={{ fontSize: 12, fontWeight: 700, color: '#1e293b' }}>{edu.degree}, {edu.college}</h3>
                <p style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase' }}>{edu.year}</p>
              </div>
            ))}
          </section>
        )}
      </div>

      {/* Sidebar */}
      <div style={{ width: 220, background: '#1e293b', color: 'white', padding: '40px 25px', flexShrink: 0 }}>
        <div style={{ marginBottom: 30 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: 15 }}>Details</h2>
          <div style={{ fontSize: 10.5, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {p.address && <p>{p.address}</p>}
            {p.phone && <p>{p.phone}</p>}
            {p.email && <p style={{ wordBreak: 'break-all' }}>{p.email}</p>}
          </div>
        </div>

        {skills.length > 0 && (
          <div>
            <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: 15 }}>Skills</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {skills.map((skill) => (
                <div key={skill}>
                  <p style={{ fontSize: 10.5, color: '#cbd5e1', marginBottom: 4 }}>{skill}</p>
                  <div style={{ height: 2, background: 'rgba(255,255,255,0.1)' }}>
                    <div style={{ height: '100%', width: '80%', background: 'white' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
