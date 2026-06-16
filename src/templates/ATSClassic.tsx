import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function ATSClassic({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: '#111',
    borderBottom: '2px solid #222',
    paddingBottom: 4,
    marginBottom: 10,
    marginTop: 18,
    fontFamily: '"Segoe UI", Arial, sans-serif',
  };

  const contactParts = [
    p.email, p.phone, p.address, p.linkedIn, p.github, p.website
  ].filter(Boolean);

  return (
    <div
      className="resume-template"
      style={{
        width: 794,
        minHeight: 1123,
        backgroundColor: '#fff',
        color: '#111',
        fontFamily: '"Segoe UI", Arial, sans-serif',
        padding: '48px 56px',
        boxSizing: 'border-box',
        fontSize: 11.5,
        lineHeight: 1.6,
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 14 }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: '#000', letterSpacing: '0.5px' }}>
          {p.fullName}
        </div>
        {p.jobTitle && (
          <div style={{ fontSize: 14, color: '#555', marginTop: 3, fontWeight: 400 }}>
            {p.jobTitle}
          </div>
        )}
        {contactParts.length > 0 && (
          <div style={{ fontSize: 10.5, color: '#444', marginTop: 7, lineHeight: 1.8 }}>
            {contactParts.join(' | ')}
          </div>
        )}
      </div>

      {/* Summary */}
      {summary && (
        <div>
          <div style={sectionHeadingStyle}>Summary</div>
          <p style={{ margin: 0, color: '#222', fontSize: 11.5, lineHeight: 1.7 }}>{summary}</p>
        </div>
      )}

      {/* Experience */}
      {workExperience.length > 0 && (
        <div>
          <div style={sectionHeadingStyle}>Experience</div>
          {workExperience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: 12, color: '#000' }}>{exp.role}</span>
                <span style={{ fontSize: 10.5, color: '#555' }}>
                  {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div style={{ fontSize: 11, color: '#555', marginBottom: 3 }}>{exp.company}</div>
              <p style={{ fontSize: 11.5, lineHeight: 1.7, margin: 0, color: '#222' }}>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <div style={sectionHeadingStyle}>Education</div>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: 12, color: '#000' }}>{edu.degree}</span>
                <span style={{ fontSize: 10.5, color: '#555' }}>{edu.year}</span>
              </div>
              <div style={{ fontSize: 11, color: '#555' }}>
                {edu.college}{edu.grade ? ` — ${edu.grade}` : ''}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <div style={sectionHeadingStyle}>Skills</div>
          <p style={{ margin: 0, color: '#222', fontSize: 11.5, lineHeight: 1.7 }}>
            {skills.join(', ')}
          </p>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <div style={sectionHeadingStyle}>Projects</div>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: 12, color: '#000' }}>{proj.name}</span>
                {proj.link && (
                  <span style={{ fontSize: 10, color: '#555' }}>{proj.link}</span>
                )}
              </div>
              {proj.techStack && (
                <div style={{ fontSize: 10.5, color: '#555', marginBottom: 2 }}>
                  Tech: {proj.techStack}
                </div>
              )}
              <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.7, color: '#222' }}>{proj.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div>
          <div style={sectionHeadingStyle}>Certifications</div>
          {certifications.map((cert) => (
            <div key={cert.id} style={{ marginBottom: 6, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11.5, color: '#222', fontWeight: 600 }}>{cert.name}</span>
              <span style={{ fontSize: 10.5, color: '#555' }}>
                {cert.issuer}{cert.year ? `, ${cert.year}` : ''}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div>
          <div style={sectionHeadingStyle}>Languages</div>
          <p style={{ margin: 0, color: '#222', fontSize: 11.5, lineHeight: 1.7 }}>
            {languages.map((l) => `${l.name} (${l.proficiency})`).join(' | ')}
          </p>
        </div>
      )}
    </div>
  );
}
