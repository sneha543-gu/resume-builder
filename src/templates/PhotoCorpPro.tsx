import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function PhotoCorpPro({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;

  const photoStyle: React.CSSProperties = {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    border: '1.5px solid #bbb',
    objectFit: 'cover',
    flexShrink: 0,
  };

  const placeholderStyle: React.CSSProperties = {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    border: '1.5px solid #bbb',
    backgroundColor: '#e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '34px',
    flexShrink: 0,
  };

  const sectionHeading: React.CSSProperties = {
    color: '#111111',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    borderBottom: '1px solid #cccccc',
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
        padding: '36px 40px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '22px', marginBottom: '0' }}>
        {/* Photo */}
        {p.profilePhoto
          ? <img src={p.profilePhoto} alt={p.fullName} style={photoStyle} />
          : <div style={placeholderStyle}>👤</div>
        }

        {/* Name & Info */}
        <div style={{ flex: 1, textAlign: 'right' }}>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#111111', lineHeight: 1.1 }}>{p.fullName}</div>
          <div style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>{p.jobTitle}</div>
          <div style={{ marginTop: '6px', fontSize: '11px', color: '#888', lineHeight: 1.8 }}>
            {[p.email, p.phone, p.address, p.linkedIn, p.github, p.website].filter(Boolean).join('  ·  ')}
          </div>
        </div>
      </div>

      {/* GOLD DIVIDER */}
      <div style={{ height: '3px', background: 'linear-gradient(to right, #bfa84a, #333, #bfa84a)', margin: '16px 0 0 0' }} />

      {/* Summary */}
      {summary && (
        <>
          <div style={sectionHeading}>Professional Summary</div>
          <p style={{ fontSize: '12px', color: '#444', lineHeight: 1.7, margin: 0 }}>{summary}</p>
        </>
      )}

      {/* Work Experience - most prominent */}
      {workExperience.length > 0 && (
        <>
          <div style={sectionHeading}>Professional Experience</div>
          {workExperience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontWeight: 700, fontSize: '13px', color: '#111' }}>{exp.role}</div>
                <div style={{ fontSize: '11px', color: '#888', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                  {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#777', marginBottom: '5px' }}>{exp.company}</div>
              <p style={{ fontSize: '11px', color: '#555', lineHeight: 1.65, margin: 0 }}>{exp.description}</p>
            </div>
          ))}
        </>
      )}

      {/* Skills - 3 column grid */}
      {skills.length > 0 && (
        <>
          <div style={sectionHeading}>Core Skills</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px 12px' }}>
            {skills.map((skill, i) => (
              <div key={i} style={{ fontSize: '11px', color: '#444', padding: '2px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#bfa84a', fontWeight: 700, fontSize: '13px' }}>▸</span>
                {skill}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Education - concise two-line per entry */}
      {education.length > 0 && (
        <>
          <div style={sectionHeading}>Education</div>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '12px', color: '#222' }}>{edu.degree}</div>
                <div style={{ fontSize: '11px', color: '#777' }}>{edu.college}{edu.grade ? ` · ${edu.grade}` : ''}</div>
              </div>
              <div style={{ fontSize: '11px', color: '#aaa', whiteSpace: 'nowrap', marginLeft: '12px' }}>{edu.year}</div>
            </div>
          ))}
        </>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <>
          <div style={sectionHeading}>Projects</div>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '12px', color: '#222' }}>{proj.name}</div>
                {proj.link && <a href={proj.link} style={{ fontSize: '10px', color: '#bfa84a', textDecoration: 'none' }}>🔗 View</a>}
              </div>
              <div style={{ fontSize: '10px', color: '#999', fontStyle: 'italic', marginBottom: '3px' }}>{proj.techStack}</div>
              <p style={{ fontSize: '11px', color: '#555', lineHeight: 1.5, margin: 0 }}>{proj.description}</p>
            </div>
          ))}
        </>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <>
          <div style={sectionHeading}>Certifications</div>
          {certifications.map((cert) => (
            <div key={cert.id} style={{ marginBottom: '7px', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#222' }}>{cert.name}</span>
                <span style={{ fontSize: '11px', color: '#888', marginLeft: '8px' }}>— {cert.issuer}</span>
              </div>
              {cert.year && <span style={{ fontSize: '11px', color: '#aaa' }}>{cert.year}</span>}
            </div>
          ))}
        </>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <>
          <div style={sectionHeading}>Languages</div>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {languages.map((lang) => (
              <div key={lang.id} style={{ fontSize: '12px', color: '#444' }}>
                <span style={{ fontWeight: 600 }}>{lang.name}</span>
                <span style={{ color: '#999', fontSize: '11px' }}> — {lang.proficiency}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
