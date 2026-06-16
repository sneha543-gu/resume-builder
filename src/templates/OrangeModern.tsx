import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function OrangeModern({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#1a1a1a',
    letterSpacing: '1px',
    borderBottom: '2px solid #f57c00',
    paddingBottom: '5px',
    marginBottom: '14px',
  };

  return (
    <div
      className="resume-template"
      style={{
        width: '794px',
        minHeight: '1123px',
        background: '#ffffff',
        boxSizing: 'border-box',
        fontFamily: '"Segoe UI", Arial, sans-serif',
        borderTop: '6px solid #f57c00',
      }}
    >
      {/* HEADER */}
      <div style={{ padding: '32px 40px 20px', background: '#ffffff', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ fontSize: '30px', fontWeight: 'bold', color: '#1a1a1a', lineHeight: '1.1' }}>{p.fullName}</div>
        <div style={{ fontSize: '15px', color: '#f57c00', marginTop: '4px', fontWeight: '500' }}>{p.jobTitle}</div>
        <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {p.email && <span style={{ fontSize: '11px', color: '#666' }}>📧 {p.email}</span>}
          {p.phone && <span style={{ fontSize: '11px', color: '#666' }}>📞 {p.phone}</span>}
          {p.address && <span style={{ fontSize: '11px', color: '#666' }}>📍 {p.address}</span>}
          {p.linkedIn && <span style={{ fontSize: '11px', color: '#666' }}>🔗 {p.linkedIn}</span>}
          {p.github && <span style={{ fontSize: '11px', color: '#666' }}>💼 {p.github}</span>}
          {p.website && <span style={{ fontSize: '11px', color: '#666' }}>🌐 {p.website}</span>}
        </div>
      </div>

      {/* BODY */}
      <div style={{ padding: '28px 40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Summary */}
        {summary && (
          <div>
            <div style={sectionHeadingStyle}>Summary</div>
            <p style={{ fontSize: '12px', color: '#333', lineHeight: '1.7', margin: 0 }}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <div>
            <div style={sectionHeadingStyle}>Work Experience</div>
            {workExperience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#1a1a1a' }}>{exp.role}</span>
                  <span style={{ fontSize: '11px', color: '#888' }}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#f57c00', fontStyle: 'italic', marginBottom: '6px' }}>{exp.company}</div>
                <p style={{ fontSize: '12px', color: '#444', lineHeight: '1.7', margin: 0 }}>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <div style={sectionHeadingStyle}>Skills</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skills.map((skill, i) => (
                <span key={i} style={{
                  fontSize: '11px',
                  color: '#f57c00',
                  border: '1.5px solid #f57c00',
                  borderRadius: '20px',
                  padding: '3px 12px',
                  fontWeight: '500',
                  background: '#fff8f0',
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <div style={sectionHeadingStyle}>Education</div>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#1a1a1a' }}>{edu.degree}</span>
                  <span style={{ fontSize: '11px', color: '#888' }}>{edu.year}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#f57c00', fontStyle: 'italic', marginBottom: '2px' }}>{edu.college}</div>
                {edu.grade && <div style={{ fontSize: '11px', color: '#666' }}>Grade: {edu.grade}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <div style={sectionHeadingStyle}>Projects</div>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '14px', display: 'flex', gap: '10px' }}>
                <span style={{ color: '#f57c00', fontSize: '16px', marginTop: '1px', flexShrink: 0 }}>●</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#1a1a1a' }}>{proj.name}</span>
                    {proj.techStack && <span style={{ fontSize: '10px', color: '#f57c00', fontStyle: 'italic' }}>{proj.techStack}</span>}
                    {proj.link && <span style={{ fontSize: '10px', color: '#888' }}>{proj.link}</span>}
                  </div>
                  <p style={{ fontSize: '12px', color: '#444', lineHeight: '1.6', margin: '4px 0 0 0' }}>{proj.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <div style={sectionHeadingStyle}>Certifications</div>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#1a1a1a' }}>{cert.name}</span>
                  <span style={{ fontSize: '11px', color: '#f57c00', marginLeft: '8px' }}>{cert.issuer}</span>
                </div>
                <span style={{ fontSize: '11px', color: '#888' }}>{cert.year}</span>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <div style={sectionHeadingStyle}>Languages</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {languages.map((lang) => (
                <div key={lang.id} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#1a1a1a' }}>{lang.name}</div>
                  <div style={{ fontSize: '10px', color: '#f57c00' }}>{lang.proficiency}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
