import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function PhotoWarm({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;

  const photoStyle: React.CSSProperties = {
    width: '140px',
    height: '140px',
    borderRadius: '50%',
    border: '5px solid #fff',
    outline: '3px solid #bcaaa4',
    objectFit: 'cover',
    display: 'block',
    margin: '0 auto',
  };

  const placeholderStyle: React.CSSProperties = {
    width: '140px',
    height: '140px',
    borderRadius: '50%',
    border: '5px solid #fff',
    outline: '3px solid #bcaaa4',
    backgroundColor: '#d7ccc8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '52px',
    margin: '0 auto',
  };

  const sidebarHeading: React.CSSProperties = {
    color: '#4e342e',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    borderBottom: '1px solid #bcaaa4',
    paddingBottom: '4px',
    marginTop: '20px',
    marginBottom: '10px',
  };

  const rightHeading: React.CSSProperties = {
    color: '#4e342e',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    borderBottom: '2px solid #8d6e63',
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
          width: '36%',
          minHeight: '1123px',
          backgroundColor: '#f5f0e8',
          padding: '30px 16px',
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

        {/* Name & Title */}
        <div style={{ textAlign: 'center', marginBottom: '6px' }}>
          <div style={{ color: '#3e2723', fontSize: '21px', fontWeight: 700, lineHeight: 1.2 }}>{p.fullName}</div>
          <div style={{ color: '#5d4037', fontSize: '12px', marginTop: '4px', fontStyle: 'italic' }}>{p.jobTitle}</div>
        </div>

        {/* Contact */}
        <div style={sidebarHeading}>Contact</div>
        <div style={{ fontSize: '11px', color: '#6d4c41', lineHeight: 1.9 }}>
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
            {skills.map((skill, i) => (
              <div key={i} style={{ fontSize: '11px', color: '#5d4037', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#8d6e63', fontWeight: 700 }}>◆</span>
                {skill}
              </div>
            ))}
          </>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <>
            <div style={sidebarHeading}>Languages</div>
            {languages.map((lang) => (
              <div key={lang.id} style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#3e2723' }}>{lang.name}</div>
                <div style={{ fontSize: '10px', color: '#8d6e63' }}>{lang.proficiency}</div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* RIGHT MAIN */}
      <div
        style={{
          width: '64%',
          padding: '30px 22px',
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
        }}
      >
        {/* Summary */}
        {summary && (
          <>
            <div style={rightHeading}>Summary</div>
            <p style={{ fontSize: '12px', color: '#555', lineHeight: 1.7, margin: '0 0 8px' }}>{summary}</p>
          </>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <>
            <div style={rightHeading}>Work Experience</div>
            {workExperience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontWeight: 700, color: '#4e342e', fontSize: '13px' }}>{exp.role}</div>
                  <div style={{ fontSize: '10px', color: '#bbb', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: '#8d6e63', fontStyle: 'italic', marginBottom: '4px' }}>{exp.company}</div>
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
                  <div style={{ fontWeight: 700, fontSize: '12px', color: '#3e2723' }}>{edu.degree}</div>
                  <div style={{ fontSize: '10px', color: '#aaa' }}>{edu.year}</div>
                </div>
                <div style={{ fontSize: '11px', color: '#8d6e63' }}>{edu.college}</div>
                {edu.grade && <div style={{ fontSize: '10px', color: '#bbb' }}>Grade: {edu.grade}</div>}
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
                  <div style={{ fontWeight: 700, fontSize: '12px', color: '#4e342e' }}>{proj.name}</div>
                  {proj.link && <a href={proj.link} style={{ fontSize: '10px', color: '#8d6e63', textDecoration: 'none' }}>🔗 Link</a>}
                </div>
                <div style={{ fontSize: '10px', color: '#aaa', fontStyle: 'italic', marginBottom: '3px' }}>{proj.techStack}</div>
                <p style={{ fontSize: '11px', color: '#555', lineHeight: 1.5, margin: 0 }}>{proj.description}</p>
              </div>
            ))}
          </>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <>
            <div style={rightHeading}>Certifications</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {certifications.map((cert) => (
                <div key={cert.id} style={{
                  padding: '6px 12px',
                  backgroundColor: '#f5f0e8',
                  borderRadius: '4px',
                  borderLeft: '3px solid #8d6e63',
                  marginBottom: '4px',
                }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#4e342e' }}>{cert.name}</div>
                  <div style={{ fontSize: '10px', color: '#8d6e63' }}>{cert.issuer} {cert.year && `· ${cert.year}`}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
