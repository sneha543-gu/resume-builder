import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function GreenFresh({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;

  const rightSectionHeading = (title: string) => (
    <div style={{ marginBottom: '8px', marginTop: '18px' }}>
      <h2 style={{
        fontSize: '13px',
        fontWeight: 'bold',
        color: '#2e7d32',
        margin: '0 0 4px 0',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}>{title}</h2>
      <div style={{ height: '2px', backgroundColor: '#2e7d32', width: '100%' }} />
    </div>
  );

  const leftSectionHeading = (title: string) => (
    <div style={{ marginBottom: '8px', marginTop: '18px' }}>
      <h3 style={{
        fontSize: '11.5px',
        fontWeight: 'bold',
        color: '#1b5e20',
        margin: '0 0 4px 0',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}>{title}</h3>
      <div style={{ height: '1.5px', backgroundColor: '#81c784', width: '100%' }} />
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
        width: '32%',
        backgroundColor: '#e8f5e9',
        padding: '32px 20px',
        boxSizing: 'border-box',
        flexShrink: 0,
      }}>
        {/* Name & Job Title */}
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#2e7d32',
          margin: '0 0 4px 0',
          lineHeight: '1.2',
        }}>{p.fullName || 'Your Name'}</h1>
        {p.jobTitle && (
          <p style={{
            fontSize: '12.5px',
            color: '#388e3c',
            margin: '0 0 16px 0',
            fontWeight: '600',
          }}>{p.jobTitle}</p>
        )}

        {/* Contact Info */}
        <div style={{ marginBottom: '8px' }}>
          {leftSectionHeading('Contact')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {p.email && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '11px', color: '#2e4a30' }}>
                <span>📧</span><span style={{ wordBreak: 'break-all' }}>{p.email}</span>
              </div>
            )}
            {p.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#2e4a30' }}>
                <span>📞</span><span>{p.phone}</span>
              </div>
            )}
            {p.address && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '11px', color: '#2e4a30' }}>
                <span>📍</span><span>{p.address}</span>
              </div>
            )}
            {p.linkedIn && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '11px', color: '#2e4a30' }}>
                <span>🔗</span><span style={{ wordBreak: 'break-all' }}>{p.linkedIn}</span>
              </div>
            )}
            {p.github && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '11px', color: '#2e4a30' }}>
                <span>💻</span><span style={{ wordBreak: 'break-all' }}>{p.github}</span>
              </div>
            )}
            {p.website && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '11px', color: '#2e4a30' }}>
                <span>🌐</span><span style={{ wordBreak: 'break-all' }}>{p.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            {leftSectionHeading('Skills')}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {skills.map((skill, i) => (
                <span key={i} style={{
                  backgroundColor: '#c8e6c9',
                  color: '#1b5e20',
                  fontSize: '10.5px',
                  padding: '3px 8px',
                  borderRadius: '12px',
                  fontWeight: '500',
                }}>{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            {leftSectionHeading('Languages')}
            {languages.map((lang) => (
              <div key={lang.id} style={{ marginBottom: '5px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#2e4a30' }}>
                  <span style={{ fontWeight: '600' }}>{lang.name}</span>
                  <span style={{ color: '#388e3c' }}>{lang.proficiency}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Main Content */}
      <div style={{
        flex: 1,
        padding: '32px 28px',
        boxSizing: 'border-box',
      }}>
        {/* Summary */}
        {summary && (
          <div>
            {rightSectionHeading('Summary')}
            <p style={{ fontSize: '12px', color: '#333333', lineHeight: '1.65', margin: 0 }}>{summary}</p>
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
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#111111' }}>{exp.role}</span>
                    <div style={{ fontSize: '12px', fontStyle: 'italic', color: '#2e7d32' }}>{exp.company}</div>
                  </div>
                  <span style={{ fontSize: '11px', color: '#888888', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p style={{ fontSize: '11.5px', color: '#444444', margin: '5px 0 0 0', lineHeight: '1.6' }}>{exp.description}</p>
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
                    <span style={{ fontSize: '12.5px', fontWeight: 'bold', color: '#111111' }}>{edu.degree}</span>
                    <div style={{ fontSize: '11.5px', fontStyle: 'italic', color: '#2e7d32' }}>{edu.college}</div>
                  </div>
                  <span style={{ fontSize: '11px', color: '#888888', whiteSpace: 'nowrap', marginLeft: '12px' }}>{edu.year}</span>
                </div>
                {edu.grade && <p style={{ fontSize: '11px', color: '#555555', margin: '3px 0 0 0' }}>Grade: {edu.grade}</p>}
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
                  <span style={{ fontSize: '12.5px', fontWeight: 'bold', color: '#111111' }}>{proj.name}</span>
                  {proj.link && <span style={{ fontSize: '11px', color: '#2e7d32' }}>{proj.link}</span>}
                </div>
                {proj.techStack && (
                  <p style={{ fontSize: '11px', color: '#2e7d32', margin: '2px 0', fontStyle: 'italic' }}>Tech: {proj.techStack}</p>
                )}
                {proj.description && (
                  <p style={{ fontSize: '11.5px', color: '#444444', margin: '4px 0 0 0', lineHeight: '1.6' }}>{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            {rightSectionHeading('Certifications')}
            {certifications.map((cert) => (
              <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', alignItems: 'baseline' }}>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'baseline' }}>
                  <span style={{ color: '#2e7d32', fontSize: '13px', fontWeight: 'bold' }}>✓</span>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#111111' }}>{cert.name}</span>
                  {cert.issuer && <span style={{ fontSize: '11.5px', color: '#555555' }}>— {cert.issuer}</span>}
                </div>
                {cert.year && <span style={{ fontSize: '11px', color: '#888888' }}>{cert.year}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
