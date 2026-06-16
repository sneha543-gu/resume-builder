import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function TechDark({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;

  const DARK = '#1e1e2e';
  const TEAL = '#64ffda';
  const TEAL_DIM = '#2dd4bf';

  const rightSectionHeadingStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 700,
    color: DARK,
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    borderBottom: `2px solid ${TEAL_DIM}`,
    paddingBottom: 4,
    marginBottom: 10,
    marginTop: 18,
    fontFamily: '"Segoe UI", Arial, sans-serif',
  };

  const contactParts = [
    p.email && { label: '✉', text: p.email },
    p.phone && { label: '☎', text: p.phone },
    p.address && { label: '⌂', text: p.address },
    p.linkedIn && { label: '🔗', text: p.linkedIn },
    p.github && { label: '⌥', text: p.github },
    p.website && { label: '⚡', text: p.website },
  ].filter(Boolean) as { label: string; text: string }[];

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
      {/* Left Dark Sidebar */}
      <div
        style={{
          width: '35%',
          backgroundColor: DARK,
          padding: '40px 20px 40px 24px',
          boxSizing: 'border-box',
          minHeight: 1123,
          color: '#fff',
        }}
      >
        {/* Name */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 21, fontWeight: 700, color: '#fff', lineHeight: 1.2, wordBreak: 'break-word' }}>
            {p.fullName}
          </div>
          {p.jobTitle && (
            <div style={{ fontSize: 11, color: TEAL, marginTop: 6, fontWeight: 600, letterSpacing: '0.5px' }}>
              {p.jobTitle}
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: '#3a3a5c', marginBottom: 14 }} />

        {/* Contact */}
        {contactParts.length > 0 && (
          <div style={{ marginBottom: 10 }}>
            {contactParts.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, marginBottom: 6, fontSize: 9.5 }}>
                <span style={{ color: TEAL, minWidth: 14 }}>{c.label}</span>
                <span style={{ color: '#b0bec5', wordBreak: 'break-all', lineHeight: 1.5 }}>{c.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: '#3a3a5c', marginTop: 8, marginBottom: 0 }} />

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <div style={{
              fontSize: 10,
              fontWeight: 700,
              color: TEAL,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginTop: 16,
              marginBottom: 8,
            }}>
              Skills
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {skills.map((skill, i) => (
                <li key={i} style={{
                  fontSize: 10.5,
                  color: '#cfd8dc',
                  marginBottom: 5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                }}>
                  <span style={{ color: TEAL, fontSize: 12, lineHeight: 1 }}>›</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Divider */}
        {skills.length > 0 && <div style={{ height: 1, backgroundColor: '#3a3a5c', marginTop: 12, marginBottom: 0 }} />}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <div style={{
              fontSize: 10,
              fontWeight: 700,
              color: TEAL,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginTop: 16,
              marginBottom: 8,
            }}>
              Languages
            </div>
            {languages.map((lang) => (
              <div key={lang.id} style={{ marginBottom: 7 }}>
                <div style={{ fontSize: 11, color: '#fff', fontWeight: 600 }}>{lang.name}</div>
                <div style={{ fontSize: 9.5, color: '#78909c' }}>{lang.proficiency}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right White Column */}
      <div
        style={{
          width: '65%',
          backgroundColor: '#fff',
          padding: '40px 30px 40px 28px',
          boxSizing: 'border-box',
        }}
      >
        {/* Summary */}
        {summary && (
          <div>
            <div style={rightSectionHeadingStyle}>About Me</div>
            <p style={{ margin: 0, color: '#444', fontSize: 11.5, lineHeight: 1.75 }}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <div>
            <div style={rightSectionHeadingStyle}>Experience</div>
            {workExperience.map((exp) => (
              <div key={exp.id} style={{
                marginBottom: 14,
                borderLeft: `3px solid ${TEAL}`,
                paddingLeft: 12,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: 12, color: DARK }}>{exp.role}</span>
                  <span style={{ fontSize: 10, color: '#888', fontStyle: 'italic' }}>
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div style={{ fontSize: 10.5, color: TEAL_DIM, fontWeight: 600, marginBottom: 4 }}>{exp.company}</div>
                <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.7, color: '#444' }}>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <div style={rightSectionHeadingStyle}>Education</div>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: 12, color: DARK }}>{edu.degree}</span>
                  <span style={{ fontSize: 10, color: '#888' }}>{edu.year}</span>
                </div>
                <div style={{ fontSize: 10.5, color: TEAL_DIM, fontWeight: 500 }}>
                  {edu.college}{edu.grade ? ` — ${edu.grade}` : ''}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <div style={rightSectionHeadingStyle}>Projects</div>
            {projects.map((proj) => (
              <div key={proj.id} style={{
                marginBottom: 13,
                borderLeft: `3px solid ${TEAL}`,
                paddingLeft: 12,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: 12, color: DARK }}>{proj.name}</span>
                  {proj.link && <span style={{ fontSize: 10, color: TEAL_DIM }}>{proj.link}</span>}
                </div>
                {proj.techStack && (
                  <div style={{ fontSize: 10, color: '#666', marginBottom: 3 }}>
                    <span style={{ fontWeight: 700 }}>Stack:</span> {proj.techStack}
                  </div>
                )}
                <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.7, color: '#444' }}>{proj.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <div style={rightSectionHeadingStyle}>Certifications</div>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                <span style={{ fontWeight: 600, fontSize: 11.5, color: DARK }}>{cert.name}</span>
                <span style={{ fontSize: 10.5, color: '#777' }}>
                  {cert.issuer}{cert.year ? ` · ${cert.year}` : ''}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
