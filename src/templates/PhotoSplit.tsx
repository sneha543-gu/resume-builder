import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function PhotoSplit({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;

  const photoStyle: React.CSSProperties = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    border: '4px solid white',
    objectFit: 'cover',
    display: 'block',
    margin: '0 auto',
  };

  const placeholderStyle: React.CSSProperties = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    border: '4px solid white',
    backgroundColor: '#455a64',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '44px',
    margin: '0 auto',
  };

  const sectionHeading: React.CSSProperties = {
    color: '#263238',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    marginTop: '20px',
    marginBottom: '10px',
    paddingBottom: '5px',
    borderBottom: '3px solid #263238',
    position: 'relative',
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
      {/* SPLIT HEADER */}
      <div style={{ display: 'flex', height: '160px' }}>
        {/* Left dark half */}
        <div
          style={{
            width: '38%',
            backgroundColor: '#263238',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            boxSizing: 'border-box',
          }}
        >
          {p.profilePhoto
            ? <img src={p.profilePhoto} alt={p.fullName} style={photoStyle} />
            : <div style={placeholderStyle}>👤</div>
          }
        </div>

        {/* Right white half */}
        <div
          style={{
            width: '62%',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '16px 24px',
            boxSizing: 'border-box',
            borderBottom: '4px solid #263238',
          }}
        >
          <div style={{ color: '#263238', fontSize: '28px', fontWeight: 700, lineHeight: 1.1 }}>{p.fullName}</div>
          <div style={{ color: '#00bcd4', fontSize: '14px', marginTop: '6px', fontWeight: 600 }}>{p.jobTitle}</div>
        </div>
      </div>

      {/* CONTACT BAR */}
      <div
        style={{
          backgroundColor: '#37474f',
          padding: '8px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {p.email && <span style={{ color: '#e0f7fa', fontSize: '11px' }}>📧 {p.email}</span>}
        {p.phone && <span style={{ color: '#e0f7fa', fontSize: '11px' }}>📞 {p.phone}</span>}
        {p.address && <span style={{ color: '#e0f7fa', fontSize: '11px' }}>📍 {p.address}</span>}
        {p.linkedIn && <span style={{ color: '#e0f7fa', fontSize: '11px' }}>🔗 {p.linkedIn}</span>}
        {p.github && <span style={{ color: '#e0f7fa', fontSize: '11px' }}>💼 {p.github}</span>}
        {p.website && <span style={{ color: '#e0f7fa', fontSize: '11px' }}>🌐 {p.website}</span>}
      </div>

      {/* BODY - Single Column */}
      <div style={{ padding: '20px 32px', flex: 1 }}>

        {/* Summary */}
        {summary && (
          <>
            <div style={sectionHeading}>Professional Summary</div>
            <p style={{ fontSize: '12px', color: '#444', lineHeight: 1.7, margin: '0 0 8px' }}>{summary}</p>
          </>
        )}

        {/* Skills - pill style */}
        {skills.length > 0 && (
          <>
            <div style={sectionHeading}>Skills</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '4px' }}>
              {skills.map((skill, i) => (
                <span key={i} style={{
                  backgroundColor: '#00bcd4',
                  color: '#ffffff',
                  padding: '4px 11px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 500,
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <>
            <div style={sectionHeading}>Work Experience</div>
            {workExperience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: '#263238' }}>{exp.role}</div>
                  <div style={{ fontSize: '11px', color: '#888', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#00bcd4', fontWeight: 600, marginBottom: '4px' }}>{exp.company}</div>
                <p style={{ fontSize: '11px', color: '#555', lineHeight: 1.6, margin: 0 }}>{exp.description}</p>
              </div>
            ))}
          </>
        )}

        {/* Two-column section for Education and Certifications */}
        <div style={{ display: 'flex', gap: '24px' }}>
          <div style={{ flex: 1 }}>
            {/* Education */}
            {education.length > 0 && (
              <>
                <div style={sectionHeading}>Education</div>
                {education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: '12px' }}>
                    <div style={{ fontWeight: 700, fontSize: '12px', color: '#263238' }}>{edu.degree}</div>
                    <div style={{ fontSize: '11px', color: '#00bcd4' }}>{edu.college}</div>
                    <div style={{ fontSize: '10px', color: '#aaa' }}>{edu.year}{edu.grade ? ` · ${edu.grade}` : ''}</div>
                  </div>
                ))}
              </>
            )}
          </div>

          <div style={{ flex: 1 }}>
            {/* Languages */}
            {languages.length > 0 && (
              <>
                <div style={sectionHeading}>Languages</div>
                {languages.map((lang) => (
                  <div key={lang.id} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: '#263238', fontWeight: 600 }}>{lang.name}</span>
                    <span style={{ fontSize: '11px', color: '#888' }}>{lang.proficiency}</span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <>
            <div style={sectionHeading}>Projects</div>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: '12px', color: '#263238' }}>{proj.name}</div>
                  {proj.link && <a href={proj.link} style={{ fontSize: '11px', color: '#00bcd4', textDecoration: 'none' }}>🔗 View</a>}
                </div>
                <div style={{ fontSize: '10px', color: '#888', fontStyle: 'italic', marginBottom: '3px' }}>{proj.techStack}</div>
                <p style={{ fontSize: '11px', color: '#555', lineHeight: 1.5, margin: 0 }}>{proj.description}</p>
              </div>
            ))}
          </>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <>
            <div style={sectionHeading}>Certifications</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {certifications.map((cert) => (
                <div key={cert.id} style={{
                  padding: '6px 14px',
                  border: '1px solid #b0bec5',
                  borderRadius: '4px',
                  borderTop: '3px solid #00bcd4',
                }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#263238' }}>{cert.name}</div>
                  <div style={{ fontSize: '10px', color: '#777' }}>{cert.issuer} {cert.year && `· ${cert.year}`}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
