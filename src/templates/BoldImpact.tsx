import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function BoldImpact({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;

  const sectionHeading = (title: string) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
      marginTop: '22px',
    }}>
      <div style={{
        width: '4px',
        height: '20px',
        backgroundColor: '#e53935',
        marginRight: '10px',
        flexShrink: 0,
      }} />
      <h2 style={{
        fontSize: '13px',
        fontWeight: 'bold',
        color: '#111111',
        margin: 0,
        backgroundColor: '#f5f5f5',
        padding: '4px 10px',
        flex: 1,
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
      }}>{title}</h2>
    </div>
  );

  const halfSkills1 = skills.slice(0, Math.ceil(skills.length / 2));
  const halfSkills2 = skills.slice(Math.ceil(skills.length / 2));

  return (
    <div
      className="resume-template"
      style={{
        width: '794px',
        minHeight: '1123px',
        backgroundColor: '#ffffff',
        fontFamily: '"Segoe UI", Arial, sans-serif',
        color: '#111111',
        boxSizing: 'border-box',
        padding: '40px 48px',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '6px' }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#111111',
          margin: '0 0 6px 0',
          letterSpacing: '1px',
          lineHeight: 1.1,
        }}>{p.fullName || 'Your Name'}</h1>
        <div style={{
          height: '4px',
          backgroundColor: '#e53935',
          width: '100%',
          marginBottom: '8px',
        }} />
        {p.jobTitle && (
          <p style={{
            fontSize: '16px',
            color: '#e53935',
            margin: '0 0 10px 0',
            fontWeight: '600',
          }}>{p.jobTitle}</p>
        )}
        {/* Contact Info */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '11.5px',
          color: '#444444',
          marginTop: '4px',
        }}>
          {p.email && <span>📧 {p.email}</span>}
          {p.phone && <span>📞 {p.phone}</span>}
          {p.address && <span>📍 {p.address}</span>}
          {p.linkedIn && <span>🔗 {p.linkedIn}</span>}
          {p.github && <span>💻 {p.github}</span>}
          {p.website && <span>🌐 {p.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div>
          {sectionHeading('Professional Summary')}
          <p style={{ fontSize: '12px', color: '#333333', lineHeight: '1.6', margin: 0 }}>{summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div>
          {sectionHeading('Work Experience')}
          {workExperience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#111111' }}>{exp.role}</span>
                  <span style={{ fontSize: '12.5px', color: '#e53935', fontWeight: '600', marginLeft: '8px' }}>— {exp.company}</span>
                </div>
                <span style={{ fontSize: '11px', color: '#777777', whiteSpace: 'nowrap', marginLeft: '12px' }}>
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

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          {sectionHeading('Skills')}
          <div style={{ display: 'flex', gap: '20px' }}>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', flex: 1 }}>
              {halfSkills1.map((skill, i) => (
                <li key={i} style={{ fontSize: '12px', color: '#333333', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#e53935', fontWeight: 'bold', fontSize: '14px' }}>•</span> {skill}
                </li>
              ))}
            </ul>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', flex: 1 }}>
              {halfSkills2.map((skill, i) => (
                <li key={i} style={{ fontSize: '12px', color: '#333333', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#e53935', fontWeight: 'bold', fontSize: '14px' }}>•</span> {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          {sectionHeading('Education')}
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#111111' }}>{edu.degree}</span>
                  <span style={{ fontSize: '12px', color: '#e53935', marginLeft: '8px' }}>— {edu.college}</span>
                </div>
                <span style={{ fontSize: '11px', color: '#777777', whiteSpace: 'nowrap', marginLeft: '12px' }}>{edu.year}</span>
              </div>
              {edu.grade && (
                <p style={{ fontSize: '11px', color: '#555555', margin: '3px 0 0 0' }}>Grade: {edu.grade}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          {sectionHeading('Projects')}
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#111111' }}>{proj.name}</span>
                {proj.link && <span style={{ fontSize: '11px', color: '#e53935' }}>{proj.link}</span>}
              </div>
              {proj.techStack && (
                <p style={{ fontSize: '11px', color: '#e53935', margin: '2px 0', fontStyle: 'italic' }}>Tech: {proj.techStack}</p>
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
          {sectionHeading('Certifications')}
          {certifications.map((cert) => (
            <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <div>
                <span style={{ fontSize: '12.5px', fontWeight: 'bold', color: '#111111' }}>{cert.name}</span>
                {cert.issuer && <span style={{ fontSize: '11.5px', color: '#e53935', marginLeft: '8px' }}>— {cert.issuer}</span>}
              </div>
              {cert.year && <span style={{ fontSize: '11px', color: '#777777' }}>{cert.year}</span>}
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div>
          {sectionHeading('Languages')}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {languages.map((lang) => (
              <span key={lang.id} style={{
                fontSize: '12px',
                color: '#333333',
                border: '1.5px solid #e53935',
                padding: '3px 10px',
                borderRadius: '2px',
              }}>
                <strong>{lang.name}</strong> — {lang.proficiency}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
