import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function CompactATS({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;

  const sectionHeading = (title: string) => (
    <div style={{
      borderBottom: '1px solid #cccccc',
      marginBottom: '5px',
      marginTop: '12px',
      paddingBottom: '2px',
    }}>
      <h2 style={{
        fontSize: '10.5px',
        fontWeight: 'bold',
        color: '#888888',
        margin: 0,
        textTransform: 'uppercase',
        letterSpacing: '0.8px',
      }}>{title}</h2>
    </div>
  );

  return (
    <div
      className="resume-template"
      style={{
        width: '794px',
        minHeight: '1123px',
        backgroundColor: '#ffffff',
        fontFamily: 'Arial, "Segoe UI", sans-serif',
        color: '#1a1a1a',
        boxSizing: 'border-box',
        padding: '28px 36px',
      }}
    >
      {/* Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
        <h1 style={{
          fontSize: '22px',
          fontWeight: 'bold',
          color: '#111111',
          margin: 0,
          letterSpacing: '0.3px',
        }}>{p.fullName || 'Your Name'}</h1>
        {p.jobTitle && (
          <span style={{ fontSize: '12px', color: '#555555', fontStyle: 'italic' }}>{p.jobTitle}</span>
        )}
      </div>

      {/* Contact single line */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        fontSize: '10px',
        color: '#555555',
        marginBottom: '4px',
        borderBottom: '1.5px solid #111111',
        paddingBottom: '6px',
      }}>
        {p.email && <span>{p.email}</span>}
        {p.phone && <><span style={{ color: '#cccccc' }}>|</span><span>{p.phone}</span></>}
        {p.address && <><span style={{ color: '#cccccc' }}>|</span><span>{p.address}</span></>}
        {p.linkedIn && <><span style={{ color: '#cccccc' }}>|</span><span>{p.linkedIn}</span></>}
        {p.github && <><span style={{ color: '#cccccc' }}>|</span><span>{p.github}</span></>}
        {p.website && <><span style={{ color: '#cccccc' }}>|</span><span>{p.website}</span></>}
      </div>

      {/* Summary */}
      {summary && (
        <div>
          {sectionHeading('Summary')}
          <p style={{ fontSize: '10.5px', color: '#222222', lineHeight: '1.5', margin: '0 0 2px 0' }}>{summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div>
          {sectionHeading('Experience')}
          {workExperience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '10.5px', fontWeight: 'bold', color: '#111111' }}>{exp.role}</span>
                  <span style={{ fontSize: '10.5px', color: '#444444' }}>— {exp.company}</span>
                </div>
                <span style={{ fontSize: '10px', color: '#888888', whiteSpace: 'nowrap', marginLeft: '10px' }}>
                  {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              {exp.description && (
                <p style={{ fontSize: '10px', color: '#333333', margin: '2px 0 0 0', lineHeight: '1.5' }}>{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          {sectionHeading('Skills')}
          <p style={{ fontSize: '10.5px', color: '#222222', margin: '0 0 2px 0', lineHeight: '1.5' }}>
            {skills.join(', ')}
          </p>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          {sectionHeading('Education')}
          {education.map((edu) => (
            <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', alignItems: 'baseline' }}>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'baseline' }}>
                <span style={{ fontSize: '10.5px', fontWeight: 'bold', color: '#111111' }}>{edu.degree}</span>
                <span style={{ fontSize: '10.5px', color: '#444444' }}>— {edu.college}</span>
                {edu.grade && <span style={{ fontSize: '10px', color: '#666666' }}>({edu.grade})</span>}
              </div>
              <span style={{ fontSize: '10px', color: '#888888', whiteSpace: 'nowrap', marginLeft: '10px' }}>{edu.year}</span>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          {sectionHeading('Projects')}
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '7px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '10.5px', fontWeight: 'bold', color: '#111111' }}>{proj.name}</span>
                {proj.link && <span style={{ fontSize: '10px', color: '#555555' }}>{proj.link}</span>}
              </div>
              {proj.techStack && (
                <span style={{ fontSize: '10px', color: '#666666', fontStyle: 'italic' }}>Stack: {proj.techStack} </span>
              )}
              {proj.description && (
                <p style={{ fontSize: '10px', color: '#333333', margin: '2px 0 0 0', lineHeight: '1.5' }}>{proj.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications & Languages side by side */}
      <div style={{ display: 'flex', gap: '30px' }}>
        {certifications.length > 0 && (
          <div style={{ flex: 1 }}>
            {sectionHeading('Certifications')}
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '10.5px', color: '#222222' }}>
                  <strong>{cert.name}</strong>{cert.issuer ? `, ${cert.issuer}` : ''}
                </span>
                {cert.year && <span style={{ fontSize: '10px', color: '#888888' }}>{cert.year}</span>}
              </div>
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div style={{ flex: 1 }}>
            {sectionHeading('Languages')}
            <p style={{ fontSize: '10.5px', color: '#222222', margin: 0 }}>
              {languages.map((lang) => `${lang.name} (${lang.proficiency})`).join(', ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
