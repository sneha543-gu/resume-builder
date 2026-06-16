import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function MidnightPro({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;

  const sectionHeading = (title: string) => (
    <div style={{ marginBottom: '10px', marginTop: '20px' }}>
      <h2 style={{
        fontSize: '11px',
        fontWeight: 'bold',
        color: '#60a5fa',
        margin: '0 0 6px 0',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
      }}>{title}</h2>
      <div style={{ height: '1px', backgroundColor: '#1e3a5f', width: '100%' }} />
    </div>
  );

  return (
    <div
      className="resume-template"
      style={{
        width: '794px',
        minHeight: '1123px',
        backgroundColor: '#0f172a',
        fontFamily: '"Segoe UI", Arial, sans-serif',
        color: '#e2e8f0',
        boxSizing: 'border-box',
      }}
    >
      {/* Header with gradient */}
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        padding: '36px 40px 28px 40px',
        borderBottom: '1px solid #1e3a5f',
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#ffffff',
          margin: '0 0 6px 0',
          letterSpacing: '0.5px',
        }}>{p.fullName || 'Your Name'}</h1>
        {p.jobTitle && (
          <p style={{
            fontSize: '16px',
            color: '#94a3b8',
            margin: '0 0 14px 0',
            fontWeight: '400',
          }}>{p.jobTitle}</p>
        )}
        {/* Contact row */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '14px',
          fontSize: '11px',
          color: '#64748b',
        }}>
          {p.email && <span>📧 {p.email}</span>}
          {p.phone && <span>📞 {p.phone}</span>}
          {p.address && <span>📍 {p.address}</span>}
          {p.linkedIn && <span>🔗 {p.linkedIn}</span>}
          {p.github && <span>💻 {p.github}</span>}
          {p.website && <span>🌐 {p.website}</span>}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 40px 40px 40px' }}>
        {/* Summary */}
        {summary && (
          <div>
            {sectionHeading('Professional Summary')}
            <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: '1.7', margin: 0 }}>{summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div>
            {sectionHeading('Work Experience')}
            {workExperience.map((exp) => (
              <div key={exp.id} style={{
                backgroundColor: '#1e293b',
                borderRadius: '4px',
                padding: '12px',
                marginBottom: '10px',
                borderLeft: '3px solid #60a5fa',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#f1f5f9' }}>{exp.role}</span>
                    <span style={{ fontSize: '12px', color: '#60a5fa', marginLeft: '8px' }}>— {exp.company}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#64748b', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p style={{ fontSize: '11.5px', color: '#94a3b8', margin: '6px 0 0 0', lineHeight: '1.6' }}>{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            {sectionHeading('Skills')}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {skills.map((skill, i) => (
                <span key={i} style={{
                  backgroundColor: '#1e3a5f',
                  color: '#60a5fa',
                  fontSize: '11px',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontWeight: '500',
                }}>{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            {sectionHeading('Education')}
            {education.map((edu) => (
              <div key={edu.id} style={{
                backgroundColor: '#1e293b',
                borderRadius: '4px',
                padding: '10px 12px',
                marginBottom: '8px',
                borderLeft: '3px solid #60a5fa',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '12.5px', fontWeight: 'bold', color: '#f1f5f9' }}>{edu.degree}</span>
                    <span style={{ fontSize: '12px', color: '#60a5fa', marginLeft: '8px' }}>— {edu.college}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#64748b', whiteSpace: 'nowrap', marginLeft: '12px' }}>{edu.year}</span>
                </div>
                {edu.grade && <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 0 0' }}>Grade: {edu.grade}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            {sectionHeading('Projects')}
            {projects.map((proj) => (
              <div key={proj.id} style={{
                backgroundColor: '#1e293b',
                borderRadius: '4px',
                padding: '10px 12px',
                marginBottom: '8px',
                borderLeft: '3px solid #60a5fa',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 'bold', color: '#f1f5f9' }}>{proj.name}</span>
                  {proj.link && <span style={{ fontSize: '11px', color: '#60a5fa' }}>{proj.link}</span>}
                </div>
                {proj.techStack && (
                  <p style={{ fontSize: '11px', color: '#60a5fa', margin: '3px 0', fontStyle: 'italic' }}>Stack: {proj.techStack}</p>
                )}
                {proj.description && (
                  <p style={{ fontSize: '11.5px', color: '#94a3b8', margin: '4px 0 0 0', lineHeight: '1.6' }}>{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications & Languages */}
        <div style={{ display: 'flex', gap: '30px', marginTop: '4px' }}>
          {certifications.length > 0 && (
            <div style={{ flex: 1 }}>
              {sectionHeading('Certifications')}
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#f1f5f9' }}>{cert.name}</span>
                    {cert.issuer && <span style={{ fontSize: '11.5px', color: '#64748b', marginLeft: '6px' }}>— {cert.issuer}</span>}
                  </div>
                  {cert.year && <span style={{ fontSize: '11px', color: '#64748b' }}>{cert.year}</span>}
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ flex: 1 }}>
              {sectionHeading('Languages')}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {languages.map((lang) => (
                  <span key={lang.id} style={{
                    backgroundColor: '#1e3a5f',
                    color: '#60a5fa',
                    fontSize: '11px',
                    padding: '4px 10px',
                    borderRadius: '20px',
                  }}>
                    {lang.name} — {lang.proficiency}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
