import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function ModernTeal({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, languages } = data;

  const renderDots = (proficiency: string) => {
    const levels = { 'Native': 5, 'Advanced': 4, 'Intermediate': 3, 'Beginner': 2 };
    const count = (levels as any)[proficiency] || 3;
    return (
      <div style={{ display: 'flex', gap: 3 }}>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: i <= count ? 'white' : 'rgba(255,255,255,0.2)' }} />
        ))}
      </div>
    );
  };

  return (
  <div className="resume-template tpl-modern-teal" style={{ display: 'flex', minHeight: '1123px', alignItems: 'stretch' }}>
      {/* Main Column */}
      <div style={{ flex: 1, padding: '50px 40px' }}>
        <header style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{p.fullName || 'Your Name'}</h1>
          <p style={{ fontSize: 16, color: 'var(--color-primary)', fontWeight: 700, marginTop: 8, letterSpacing: '0.02em' }}>{p.jobTitle || 'Your Profession'}</p>
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 15, display: 'flex', gap: 15, flexWrap: 'wrap', fontWeight: 600 }}>
            {p.phone && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>📞 {p.phone}</span>}
            {p.email && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>✉️ {p.email}</span>}
            {p.linkedIn && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>🔗 {p.linkedIn}</span>}
          </div>
          {p.address && <p style={{ fontSize: 11, color: '#64748b', marginTop: 6, fontWeight: 500 }}>📍 {p.address}</p>}
        </header>

        {summary && (
          <section style={{ marginBottom: 35 }}>
            <h2 style={{ fontSize: 14, fontWeight: 800, textTransform: 'uppercase', color: '#1e293b', borderBottom: '2px solid #f1f5f9', paddingBottom: 8, marginBottom: 15 }}>Summary</h2>
            <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.8 }}>{summary}</p>
          </section>
        )}

        {workExperience.length > 0 && (
          <section style={{ marginBottom: 35 }}>
            <h2 style={{ fontSize: 14, fontWeight: 800, textTransform: 'uppercase', color: '#1e293b', borderBottom: '2px solid #f1f5f9', paddingBottom: 8, marginBottom: 20 }}>Experience</h2>
            {workExperience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: 25 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a' }}>{exp.role}</h3>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--color-primary)', marginBottom: 10 }}>{exp.company}</p>
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
          <section>
            <h2 style={{ fontSize: 14, fontWeight: 800, textTransform: 'uppercase', color: '#1e293b', borderBottom: '2px solid #f1f5f9', paddingBottom: 8, marginBottom: 20 }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: 15 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: 13, fontWeight: 800 }}>{edu.degree}</h3>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>{edu.year}</span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--color-primary)', fontWeight: 700 }}>{edu.college}</p>
              </div>
            ))}
          </section>
        )}
      </div>

      {/* Sidebar Column */}
      <div style={{ width: 240, background: 'var(--color-primary-dark)', color: 'white', padding: '50px 25px', flexShrink: 0 }}>
        {skills.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 14, fontWeight: 800, textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 8, marginBottom: 15 }}>Skills</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {skills.map((skill) => (
                <div key={skill} style={{ fontSize: 11, color: '#e2e8f0', fontWeight: 500 }}>• {skill}</div>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <h2 style={{ fontSize: 14, fontWeight: 800, textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 8, marginBottom: 15 }}>Languages</h2>
            {languages.map((lang) => (
              <div key={lang.id} style={{ marginBottom: 15 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 6, fontWeight: 600 }}>
                  <span>{lang.name}</span>
                  <span style={{ color: '#00e5e5' }}>{lang.proficiency}</span>
                </div>
                {renderDots(lang.proficiency)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
