import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function MinimalLines({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;

  const dividerStyle: React.CSSProperties = {
    border: 'none',
    borderTop: '0.5px solid #c0c0c0',
    margin: '20px 0',
  };

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '9px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '4px',
    color: '#888',
    marginBottom: '14px',
  };

  const bodyTextStyle: React.CSSProperties = {
    fontSize: '11px',
    color: '#333',
    lineHeight: '1.8',
  };

  return (
    <div
      className="resume-template"
      style={{
        width: '794px',
        minHeight: '1123px',
        background: '#ffffff',
        boxSizing: 'border-box',
        fontFamily: 'Georgia, "Times New Roman", serif',
        padding: '60px 72px',
        color: '#222',
      }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ fontSize: '26px', fontWeight: '400', color: '#111', letterSpacing: '1px', lineHeight: '1.2' }}>{p.fullName}</div>
        {p.jobTitle && <div style={{ fontSize: '13px', fontStyle: 'italic', color: '#888', marginTop: '5px' }}>{p.jobTitle}</div>}
        <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
          {p.email && <span style={{ fontSize: '10px', color: '#888' }}>{p.email}</span>}
          {p.phone && <span style={{ fontSize: '10px', color: '#888' }}>{p.phone}</span>}
          {p.address && <span style={{ fontSize: '10px', color: '#888' }}>{p.address}</span>}
          {p.linkedIn && <span style={{ fontSize: '10px', color: '#888' }}>{p.linkedIn}</span>}
          {p.github && <span style={{ fontSize: '10px', color: '#888' }}>{p.github}</span>}
          {p.website && <span style={{ fontSize: '10px', color: '#888' }}>{p.website}</span>}
        </div>
      </div>

      <hr style={dividerStyle} />

      {/* Summary */}
      {summary && (
        <>
          <div>
            <div style={sectionHeadingStyle}>Profile</div>
            <p style={{ ...bodyTextStyle, margin: 0, textAlign: 'justify' }}>{summary}</p>
          </div>
          <hr style={dividerStyle} />
        </>
      )}

      {/* Experience */}
      {workExperience.length > 0 && (
        <>
          <div>
            <div style={sectionHeadingStyle}>Experience</div>
            {workExperience.map((exp, index) => (
              <div key={exp.id} style={{ marginBottom: index < workExperience.length - 1 ? '18px' : '0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#111' }}>{exp.role}</span>
                  <span style={{ fontSize: '10px', color: '#999', fontStyle: 'italic' }}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div style={{ fontSize: '11px', color: '#555', marginBottom: '5px', fontStyle: 'italic' }}>{exp.company}</div>
                <p style={{ ...bodyTextStyle, margin: 0 }}>— {exp.description}</p>
              </div>
            ))}
          </div>
          <hr style={dividerStyle} />
        </>
      )}

      {/* Skills — comma-separated */}
      {skills.length > 0 && (
        <>
          <div>
            <div style={sectionHeadingStyle}>Skills</div>
            <p style={{ ...bodyTextStyle, margin: 0, color: '#333' }}>
              {skills.join(', ')}
            </p>
          </div>
          <hr style={dividerStyle} />
        </>
      )}

      {/* Education */}
      {education.length > 0 && (
        <>
          <div>
            <div style={sectionHeadingStyle}>Education</div>
            {education.map((edu, index) => (
              <div key={edu.id} style={{ marginBottom: index < education.length - 1 ? '14px' : '0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#111' }}>{edu.degree}</span>
                  <span style={{ fontSize: '10px', color: '#999', fontStyle: 'italic' }}>{edu.year}</span>
                </div>
                <div style={{ fontSize: '11px', color: '#555', fontStyle: 'italic' }}>{edu.college}{edu.grade ? ` — ${edu.grade}` : ''}</div>
              </div>
            ))}
          </div>
          <hr style={dividerStyle} />
        </>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <>
          <div>
            <div style={sectionHeadingStyle}>Projects</div>
            {projects.map((proj, index) => (
              <div key={proj.id} style={{ marginBottom: index < projects.length - 1 ? '16px' : '0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#111' }}>{proj.name}</span>
                  {proj.link && <span style={{ fontSize: '10px', color: '#999', fontStyle: 'italic' }}>{proj.link}</span>}
                </div>
                {proj.techStack && <div style={{ fontSize: '10px', color: '#888', fontStyle: 'italic', marginBottom: '4px' }}>{proj.techStack}</div>}
                <p style={{ ...bodyTextStyle, margin: 0 }}>— {proj.description}</p>
              </div>
            ))}
          </div>
          <hr style={dividerStyle} />
        </>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <>
          <div>
            <div style={sectionHeadingStyle}>Certifications</div>
            {certifications.map((cert, index) => (
              <div key={cert.id} style={{ marginBottom: index < certifications.length - 1 ? '10px' : '0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '12px', color: '#111' }}>{cert.name}</span>
                  <span style={{ fontSize: '10px', color: '#999', fontStyle: 'italic' }}>{cert.year}</span>
                </div>
                <div style={{ fontSize: '11px', color: '#666', fontStyle: 'italic' }}>— {cert.issuer}</div>
              </div>
            ))}
          </div>
          <hr style={dividerStyle} />
        </>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div>
          <div style={sectionHeadingStyle}>Languages</div>
          <p style={{ ...bodyTextStyle, margin: 0 }}>
            {languages.map((lang) => `${lang.name} (${lang.proficiency})`).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}
