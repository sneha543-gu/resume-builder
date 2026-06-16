import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function PhotoNavy({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;

  const photoStyle: React.CSSProperties = {
    width: '110px',
    height: '110px',
    borderRadius: '50%',
    border: '3px solid white',
    objectFit: 'cover',
    flexShrink: 0,
  };

  const placeholderStyle: React.CSSProperties = {
    width: '110px',
    height: '110px',
    borderRadius: '50%',
    border: '3px solid white',
    backgroundColor: '#3949ab',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '42px',
    flexShrink: 0,
  };

  const leftHeading: React.CSSProperties = {
    color: '#1a237e',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    borderBottom: '2px solid #1a237e',
    paddingBottom: '4px',
    marginTop: '18px',
    marginBottom: '10px',
  };

  const rightHeading: React.CSSProperties = {
    color: '#1a237e',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    borderBottom: '2px solid #1a237e',
    paddingBottom: '4px',
    marginTop: '18px',
    marginBottom: '10px',
  };

  return (
    <div
      className="resume-template"
      style={{
        width: '794px',
        minHeight: '1123px',
        fontFamily: '"Segoe UI", Arial, sans-serif',
        backgroundColor: '#ffffff',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* HEADER */}
      <div
        style={{
          backgroundColor: '#1a237e',
          padding: '24px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        {p.profilePhoto
          ? <img src={p.profilePhoto} alt={p.fullName} style={photoStyle} />
          : <div style={placeholderStyle}>👤</div>
        }
        <div style={{ flex: 1 }}>
          <div style={{ color: '#ffffff', fontSize: '30px', fontWeight: 700, lineHeight: 1.1 }}>{p.fullName}</div>
          <div style={{ color: '#90caf9', fontSize: '14px', marginTop: '6px', fontStyle: 'italic' }}>{p.jobTitle}</div>
          <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {p.email && <span style={{ color: '#e3f2fd', fontSize: '11px' }}>📧 {p.email}</span>}
            {p.phone && <span style={{ color: '#e3f2fd', fontSize: '11px' }}>📞 {p.phone}</span>}
            {p.address && <span style={{ color: '#e3f2fd', fontSize: '11px' }}>📍 {p.address}</span>}
            {p.linkedIn && <span style={{ color: '#e3f2fd', fontSize: '11px' }}>🔗 {p.linkedIn}</span>}
            {p.github && <span style={{ color: '#e3f2fd', fontSize: '11px' }}>💼 {p.github}</span>}
          </div>
        </div>
      </div>

      {/* BODY - TWO COLUMN */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* LEFT COLUMN */}
        <div
          style={{
            width: '35%',
            backgroundColor: '#f5f5f5',
            padding: '18px 16px',
            boxSizing: 'border-box',
            flexShrink: 0,
          }}
        >
          {/* Skills */}
          {skills.length > 0 && (
            <>
              <div style={leftHeading}>Skills</div>
              {skills.map((skill, i) => (
                <div key={i} style={{
                  fontSize: '11px',
                  color: '#333',
                  padding: '3px 8px',
                  marginBottom: '4px',
                  backgroundColor: '#e8eaf6',
                  borderRadius: '3px',
                  borderLeft: '3px solid #1a237e',
                }}>
                  {skill}
                </div>
              ))}
            </>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <>
              <div style={leftHeading}>Languages</div>
              {languages.map((lang) => (
                <div key={lang.id} style={{ marginBottom: '8px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#1a237e' }}>{lang.name}</div>
                  <div style={{ fontSize: '10px', color: '#777' }}>{lang.proficiency}</div>
                </div>
              ))}
            </>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <>
              <div style={leftHeading}>Certifications</div>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#333' }}>{cert.name}</div>
                  <div style={{ fontSize: '10px', color: '#777' }}>{cert.issuer}</div>
                  {cert.year && <div style={{ fontSize: '10px', color: '#aaa' }}>{cert.year}</div>}
                </div>
              ))}
            </>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div
          style={{
            width: '65%',
            padding: '18px 22px',
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
                    <div style={{ fontWeight: 700, fontSize: '13px', color: '#222' }}>{exp.role}</div>
                    <div style={{ fontSize: '10px', color: '#888', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  <div style={{ fontSize: '11px', color: '#1a237e', fontStyle: 'italic', marginBottom: '4px' }}>{exp.company}</div>
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
                    <div style={{ fontWeight: 700, fontSize: '12px', color: '#1a237e' }}>{proj.name}</div>
                    {proj.link && <a href={proj.link} style={{ fontSize: '10px', color: '#3949ab', textDecoration: 'none' }}>🔗 Link</a>}
                  </div>
                  <div style={{ fontSize: '10px', color: '#888', fontStyle: 'italic', marginBottom: '3px' }}>{proj.techStack}</div>
                  <p style={{ fontSize: '11px', color: '#555', lineHeight: 1.5, margin: 0 }}>{proj.description}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
