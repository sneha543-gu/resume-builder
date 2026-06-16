import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function ModernMinimal({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 700,
    color: '#00897b',
    borderLeft: '3px solid #00897b',
    paddingLeft: 8,
    marginBottom: 10,
    marginTop: 18,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    fontFamily: '"Segoe UI", Arial, sans-serif',
  };

  const leftSectionHeadingStyle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 700,
    color: '#00897b',
    borderLeft: '3px solid #00897b',
    paddingLeft: 7,
    marginBottom: 8,
    marginTop: 16,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    fontFamily: '"Segoe UI", Arial, sans-serif',
  };

  const contactParts = [
    p.email && { icon: '✉', text: p.email },
    p.phone && { icon: '☎', text: p.phone },
    p.address && { icon: '⌂', text: p.address },
    p.linkedIn && { icon: '🔗', text: p.linkedIn },
    p.github && { icon: '⌥', text: p.github },
    p.website && { icon: '⚡', text: p.website },
  ].filter(Boolean) as { icon: string; text: string }[];

  return (
    <div
      className="resume-template"
      style={{
        width: 794,
        minHeight: 1123,
        backgroundColor: '#fff',
        fontFamily: '"Segoe UI", Arial, sans-serif',
        display: 'flex',
        flexDirection: 'row',
        boxSizing: 'border-box',
        fontSize: 11.5,
        lineHeight: 1.6,
      }}
    >
      {/* Left Column */}
      <div
        style={{
          width: '30%',
          backgroundColor: '#f5f5f5',
          padding: '40px 20px 40px 24px',
          boxSizing: 'border-box',
          minHeight: 1123,
        }}
      >
        {/* Name & Title */}
        <div style={{ marginBottom: 6 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#111', lineHeight: 1.2, wordBreak: 'break-word' }}>
            {p.fullName}
          </div>
          {p.jobTitle && (
            <div style={{ fontSize: 11, color: '#00897b', marginTop: 5, fontWeight: 600 }}>
              {p.jobTitle}
            </div>
          )}
        </div>

        {/* Contact Info */}
        {contactParts.length > 0 && (
          <div style={{ marginTop: 14 }}>
            {contactParts.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 5, fontSize: 10 }}>
                <span style={{ color: '#00897b', fontSize: 10, minWidth: 14 }}>{c.icon}</span>
                <span style={{ color: '#444', wordBreak: 'break-all', lineHeight: 1.4 }}>{c.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <div style={leftSectionHeadingStyle}>Skills</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {skills.map((skill, i) => (
                <span
                  key={i}
                  style={{
                    background: '#e0f2f1',
                    color: '#00897b',
                    borderRadius: 12,
                    padding: '2px 10px',
                    fontSize: 10.5,
                    margin: '2px 3px',
                    display: 'inline-block',
                    fontWeight: 500,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <div style={leftSectionHeadingStyle}>Languages</div>
            {languages.map((lang) => (
              <div key={lang.id} style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#222' }}>{lang.name}</div>
                <div style={{ fontSize: 10, color: '#666' }}>{lang.proficiency}</div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <div style={leftSectionHeadingStyle}>Certifications</div>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 10.5, fontWeight: 600, color: '#222', lineHeight: 1.4 }}>{cert.name}</div>
                <div style={{ fontSize: 10, color: '#666' }}>
                  {cert.issuer}{cert.year ? ` · ${cert.year}` : ''}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Column */}
      <div
        style={{
          width: '70%',
          backgroundColor: '#fff',
          padding: '40px 32px 40px 28px',
          boxSizing: 'border-box',
        }}
      >
        {/* Summary */}
        {summary && (
          <div>
            <div style={sectionHeadingStyle}>Summary</div>
            <p style={{ margin: 0, color: '#333', fontSize: 11.5, lineHeight: 1.75 }}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <div>
            <div style={sectionHeadingStyle}>Experience</div>
            {workExperience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: 12, color: '#111' }}>{exp.role}</span>
                  <span style={{ fontSize: 10, color: '#777' }}>
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: '#00897b', fontWeight: 500, marginBottom: 3 }}>{exp.company}</div>
                <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.7, color: '#333' }}>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <div style={sectionHeadingStyle}>Education</div>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: 12, color: '#111' }}>{edu.degree}</span>
                  <span style={{ fontSize: 10, color: '#777' }}>{edu.year}</span>
                </div>
                <div style={{ fontSize: 11, color: '#00897b', fontWeight: 500 }}>
                  {edu.college}{edu.grade ? ` — ${edu.grade}` : ''}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <div style={sectionHeadingStyle}>Projects</div>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: 12, color: '#111' }}>{proj.name}</span>
                  {proj.link && <span style={{ fontSize: 10, color: '#00897b' }}>{proj.link}</span>}
                </div>
                {proj.techStack && (
                  <div style={{ fontSize: 10.5, color: '#555', marginBottom: 2 }}>
                    <span style={{ fontWeight: 600 }}>Tech:</span> {proj.techStack}
                  </div>
                )}
                <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.7, color: '#333' }}>{proj.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
