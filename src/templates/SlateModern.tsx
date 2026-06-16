import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function SlateModern({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;

  const rightSectionHeading = (title: string) => (
    <div style={{ marginBottom: '8px', marginTop: '18px' }}>
      <h2 style={{
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#1e293b',
        margin: '0 0 4px 0',
        textTransform: 'uppercase',
        letterSpacing: '0.8px',
      }}>{title}</h2>
      <div style={{ height: '1px', backgroundColor: '#cbd5e1', width: '100%' }} />
    </div>
  );

  const leftSectionHeading = (title: string) => (
    <div style={{ marginBottom: '8px', marginTop: '18px' }}>
      <h3 style={{
        fontSize: '11px',
        fontWeight: 'bold',
        color: '#1e293b',
        margin: '0 0 4px 0',
        textTransform: 'uppercase',
        letterSpacing: '0.8px',
      }}>{title}</h3>
      <div style={{ height: '1px', backgroundColor: '#cbd5e1', width: '100%' }} />
    </div>
  );

  return (
    <div
      className="resume-template"
      style={{
        width: '794px',
        minHeight: '1123px',
        backgroundColor: '#ffffff',
        fontFamily: '"Segoe UI", Arial, sans-serif',
        color: '#1a1a1a',
        boxSizing: 'border-box',
        display: 'flex',
      }}
    >
      {/* Left Sidebar */}
      <div style={{
        width: '36%',
        backgroundColor: '#f8fafc',
        boxSizing: 'border-box',
        flexShrink: 0,
        borderTop: '6px solid #475569',
        padding: '28px 20px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Name & Job Title */}
        <h1 style={{
          fontSize: '22px',
          fontWeight: 'bold',
          color: '#1e293b',
          margin: '0 0 4px 0',
          lineHeight: '1.2',
        }}>{p.fullName || 'Your Name'}</h1>
        {p.jobTitle && (
          <p style={{
            fontSize: '12.5px',
            color: '#475569',
            margin: '0 0 16px 0',
            fontWeight: '500',
          }}>{p.jobTitle}</p>
        )}

        {/* Contact */}
        <div>
          {leftSectionHeading('Contact')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {p.email && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '11px', color: '#334155' }}>
                <span style={{ flexShrink: 0 }}>📧</span>
                <span style={{ wordBreak: 'break-all' }}>{p.email}</span>
              </div>
            )}
            {p.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#334155' }}>
                <span>📞</span><span>{p.phone}</span>
              </div>
            )}
            {p.address && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '11px', color: '#334155' }}>
                <span style={{ flexShrink: 0 }}>📍</span><span>{p.address}</span>
              </div>
            )}
            {p.linkedIn && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '11px', color: '#334155' }}>
                <span style={{ flexShrink: 0 }}>🔗</span>
                <span style={{ wordBreak: 'break-all' }}>{p.linkedIn}</span>
              </div>
            )}
            {p.github && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '11px', color: '#334155' }}>
                <span style={{ flexShrink: 0 }}>💻</span>
                <span style={{ wordBreak: 'break-all' }}>{p.github}</span>
              </div>
            )}
            {p.website && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '11px', color: '#334155' }}>
                <span style={{ flexShrink: 0 }}>🌐</span>
                <span style={{ wordBreak: 'break-all' }}>{p.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            {leftSectionHeading('Skills')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {skills.map((skill, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    backgroundColor: '#475569',
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: '11.5px', color: '#334155' }}>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            {leftSectionHeading('Languages')}
            {languages.map((lang) => (
              <div key={lang.id} style={{ marginBottom: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11.5px', fontWeight: '600', color: '#1e293b' }}>{lang.name}</span>
                  <span style={{
                    fontSize: '10px',
                    color: '#475569',
                    backgroundColor: '#e2e8f0',
                    padding: '2px 7px',
                    borderRadius: '10px',
                  }}>{lang.proficiency}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications in sidebar */}
        {certifications.length > 0 && (
          <div>
            {leftSectionHeading('Certifications')}
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '8px' }}>
                <p style={{ fontSize: '11.5px', fontWeight: '600', color: '#1e293b', margin: '0 0 2px 0' }}>{cert.name}</p>
                {cert.issuer && <p style={{ fontSize: '11px', color: '#475569', margin: '0 0 1px 0' }}>{cert.issuer}</p>}
                {cert.year && <p style={{ fontSize: '10.5px', color: '#94a3b8', margin: 0 }}>{cert.year}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Main Content */}
      <div style={{
        flex: 1,
        borderTop: '6px solid #e2e8f0',
        padding: '28px 28px 36px 28px',
        boxSizing: 'border-box',
      }}>
        {/* Summary */}
        {summary && (
          <div>
            {rightSectionHeading('Summary')}
            <p style={{ fontSize: '12px', color: '#334155', lineHeight: '1.7', margin: 0 }}>{summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div>
            {rightSectionHeading('Experience')}
            {workExperience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#0f172a' }}>{exp.role}</span>
                    <div style={{ fontSize: '12px', color: '#475569', marginTop: '1px' }}>{exp.company}</div>
                  </div>
                  <span style={{ fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p style={{ fontSize: '11.5px', color: '#475569', margin: '5px 0 0 0', lineHeight: '1.65' }}>{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            {rightSectionHeading('Education')}
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '12.5px', fontWeight: 'bold', color: '#0f172a' }}>{edu.degree}</span>
                    <div style={{ fontSize: '12px', color: '#475569', marginTop: '1px' }}>{edu.college}</div>
                  </div>
                  <span style={{ fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap', marginLeft: '12px' }}>{edu.year}</span>
                </div>
                {edu.grade && <p style={{ fontSize: '11px', color: '#64748b', margin: '3px 0 0 0' }}>Grade: {edu.grade}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            {rightSectionHeading('Projects')}
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 'bold', color: '#0f172a' }}>{proj.name}</span>
                  {proj.link && <span style={{ fontSize: '11px', color: '#475569' }}>{proj.link}</span>}
                </div>
                {proj.techStack && (
                  <p style={{ fontSize: '11px', color: '#475569', margin: '2px 0', fontStyle: 'italic' }}>Tech: {proj.techStack}</p>
                )}
                {proj.description && (
                  <p style={{ fontSize: '11.5px', color: '#475569', margin: '4px 0 0 0', lineHeight: '1.65' }}>{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
