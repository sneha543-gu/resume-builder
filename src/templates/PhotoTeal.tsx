import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function PhotoTeal({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;

  const photoStyle: React.CSSProperties = {
    width: '130px',
    height: '130px',
    borderRadius: '50%',
    border: '4px solid white',
    objectFit: 'cover',
    display: 'block',
    margin: '0 auto',
  };

  const placeholderStyle: React.CSSProperties = {
    width: '130px',
    height: '130px',
    borderRadius: '50%',
    border: '4px solid white',
    backgroundColor: '#b2dfdb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
    margin: '0 auto',
  };

  const sidebarHeading: React.CSSProperties = {
    color: '#b2dfdb',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    borderBottom: '1px solid #4db6ac',
    paddingBottom: '4px',
    marginTop: '20px',
    marginBottom: '10px',
  };

  const rightHeading: React.CSSProperties = {
    color: '#00695c',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    borderBottom: '2px solid #00695c',
    paddingBottom: '4px',
    marginTop: '20px',
    marginBottom: '10px',
  };

  return (
    <div
      className="resume-template"
      style={{
        width: '794px',
        minHeight: '1123px',
        display: 'flex',
        fontFamily: '"Segoe UI", Arial, sans-serif',
        backgroundColor: '#ffffff',
        boxSizing: 'border-box',
      }}
    >
      {/* LEFT SIDEBAR */}
      <div
        style={{
          width: '35%',
          minHeight: '1123px',
          backgroundColor: '#00695c',
          padding: '30px 18px',
          boxSizing: 'border-box',
          flexShrink: 0,
        }}
      >
        {/* Photo */}
        <div style={{ marginBottom: '16px' }}>
          {p.profilePhoto
            ? <img src={p.profilePhoto} alt={p.fullName} style={photoStyle} />
            : <div style={placeholderStyle}>👤</div>
          }
        </div>

        {/* Name */}
        <div style={{ textAlign: 'center', marginBottom: '4px' }}>
          <div style={{ color: '#ffffff', fontSize: '20px', fontWeight: 700, lineHeight: 1.2 }}>{p.fullName}</div>
          <div style={{ color: '#b2dfdb', fontSize: '12px', marginTop: '4px', fontStyle: 'italic' }}>{p.jobTitle}</div>
        </div>

        {/* Contact */}
        <div style={sidebarHeading}>Contact</div>
        <div style={{ fontSize: '11px', color: '#e0f2f1', lineHeight: 1.8 }}>
          {p.email && <div>📧 {p.email}</div>}
          {p.phone && <div>📞 {p.phone}</div>}
          {p.address && <div>📍 {p.address}</div>}
          {p.linkedIn && <div>🔗 {p.linkedIn}</div>}
          {p.github && <div>💼 {p.github}</div>}
          {p.website && <div>🌐 {p.website}</div>}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <>
            <div style={sidebarHeading}>Skills</div>
            <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
              {skills.map((skill, i) => (
                <li key={i} style={{ color: '#e0f2f1', fontSize: '11px', marginBottom: '5px', paddingLeft: '8px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#4db6ac' }}>▸</span>
                  {skill}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <>
            <div style={sidebarHeading}>Languages</div>
            {languages.map((lang) => (
              <div key={lang.id} style={{ color: '#e0f2f1', fontSize: '11px', marginBottom: '6px' }}>
                <div style={{ fontWeight: 600 }}>{lang.name}</div>
                <div style={{ color: '#b2dfdb', fontSize: '10px' }}>{lang.proficiency}</div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* RIGHT MAIN */}
      <div
        style={{
          width: '65%',
          padding: '30px 24px',
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
        }}
      >
        {/* Summary */}
        {summary && (
          <>
            <div style={rightHeading}>Professional Summary</div>
            <p style={{ fontSize: '12px', color: '#444', lineHeight: 1.7, margin: '0 0 8px' }}>{summary}</p>
          </>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <>
            <div style={rightHeading}>Work Experience</div>
            {workExperience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontWeight: 700, color: '#00695c', fontSize: '13px' }}>{exp.role}</div>
                  <div style={{ fontSize: '10px', color: '#999', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: '#777', marginBottom: '4px', fontStyle: 'italic' }}>{exp.company}</div>
                <p style={{ fontSize: '11px', color: '#555', lineHeight: 1.6, margin: 0 }}>{exp.description}</p>
              </div>
            ))}
          </>
        )}

        {/* Education */}
        {education.length > 0 && (
          <>
            <div style={rightHeading}>Education</div>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontWeight: 700, fontSize: '12px', color: '#333' }}>{edu.degree}</div>
                  <div style={{ fontSize: '10px', color: '#999' }}>{edu.year}</div>
                </div>
                <div style={{ fontSize: '11px', color: '#777' }}>{edu.college}</div>
                {edu.grade && <div style={{ fontSize: '10px', color: '#aaa' }}>Grade: {edu.grade}</div>}
              </div>
            ))}
          </>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <>
            <div style={rightHeading}>Projects</div>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: '12px', color: '#00695c' }}>{proj.name}</div>
                  {proj.link && <a href={proj.link} style={{ fontSize: '10px', color: '#00897b', textDecoration: 'none' }}>🔗 Link</a>}
                </div>
                <div style={{ fontSize: '10px', color: '#888', marginBottom: '3px', fontStyle: 'italic' }}>{proj.techStack}</div>
                <p style={{ fontSize: '11px', color: '#555', lineHeight: 1.5, margin: 0 }}>{proj.description}</p>
              </div>
            ))}
          </>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <>
            <div style={rightHeading}>Certifications</div>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '8px' }}>
                <div style={{ fontWeight: 600, fontSize: '12px', color: '#333' }}>{cert.name}</div>
                <div style={{ fontSize: '11px', color: '#777' }}>{cert.issuer} {cert.year && `· ${cert.year}`}</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
