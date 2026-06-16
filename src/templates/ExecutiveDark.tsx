import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function ExecutiveDark({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#1c1c1c',
    letterSpacing: '1.5px',
    paddingBottom: '5px',
    borderBottom: '1.5px solid #c9a84c',
    marginBottom: '10px',
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
      }}
    >
      {/* DARK HEADER */}
      <div style={{
        width: '100%',
        background: '#1c1c1c',
        padding: '34px 44px 26px',
        boxSizing: 'border-box',
      }}>
        <div style={{ fontSize: '34px', fontWeight: 'bold', color: '#ffffff', letterSpacing: '1px', lineHeight: '1.1' }}>{p.fullName}</div>
        {p.jobTitle && <div style={{ fontSize: '15px', color: '#c9a84c', marginTop: '6px', fontStyle: 'italic', letterSpacing: '0.5px' }}>{p.jobTitle}</div>}
        <div style={{ marginTop: '14px', display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
          {p.email && <span style={{ fontSize: '11px', color: '#aaa' }}>📧 {p.email}</span>}
          {p.phone && <span style={{ fontSize: '11px', color: '#aaa' }}>📞 {p.phone}</span>}
          {p.address && <span style={{ fontSize: '11px', color: '#aaa' }}>📍 {p.address}</span>}
          {p.linkedIn && <span style={{ fontSize: '11px', color: '#aaa' }}>🔗 {p.linkedIn}</span>}
          {p.github && <span style={{ fontSize: '11px', color: '#aaa' }}>💼 {p.github}</span>}
          {p.website && <span style={{ fontSize: '11px', color: '#aaa' }}>🌐 {p.website}</span>}
        </div>
      </div>

      {/* BODY */}
      <div style={{ padding: '24px 44px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Summary */}
        {summary && (
          <div>
            <div style={sectionHeadingStyle}>Executive Summary</div>
            <p style={{ fontSize: '12px', color: '#333', lineHeight: '1.7', margin: 0 }}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <div>
            <div style={sectionHeadingStyle}>Professional Experience</div>
            {workExperience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#1c1c1c' }}>{exp.role}</span>
                  <span style={{ fontSize: '11px', color: '#c9a84c', fontWeight: '600' }}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                 <div style={{ fontSize: '11.5px', color: '#666', marginBottom: '4px' }}>{exp.company}</div>
                <p style={{ fontSize: '12px', color: '#444', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills — two column display */}
        {skills.length > 0 && (
          <div>
            <div style={sectionHeadingStyle}>Core Competencies</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px 20px' }}>
              {skills.map((skill, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#1c1c1c', fontSize: '11px', flexShrink: 0 }}>●</span>
                  <span style={{ fontSize: '11.5px', color: '#333' }}>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <div style={sectionHeadingStyle}>Education</div>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 'bold', color: '#1c1c1c' }}>{edu.degree}</span>
                  <span style={{ fontSize: '11px', color: '#c9a84c', fontWeight: '600' }}>{edu.year}</span>
                </div>
                <div style={{ fontSize: '11.5px', color: '#666' }}>{edu.college}</div>
                {edu.grade && <div style={{ fontSize: '11px', color: '#888' }}>Grade: {edu.grade}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <div style={sectionHeadingStyle}>Notable Projects</div>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 'bold', color: '#1c1c1c' }}>{proj.name}</span>
                  {proj.link && <span style={{ fontSize: '10px', color: '#888' }}>{proj.link}</span>}
                </div>
                {proj.techStack && <div style={{ fontSize: '10px', color: '#c9a84c', fontStyle: 'italic', marginBottom: '2px' }}>{proj.techStack}</div>}
                <p style={{ fontSize: '12px', color: '#444', lineHeight: '1.6', margin: 0 }}>{proj.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Certifications — gold-bordered cards */}
        {certifications.length > 0 && (
          <div>
            <div style={sectionHeadingStyle}>Certifications</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {certifications.map((cert) => (
                <div key={cert.id} style={{
                  border: '1px solid #c9a84c',
                  borderRadius: '4px',
                  padding: '8px 12px',
                  background: '#fffdf5',
                }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 'bold', color: '#1c1c1c' }}>{cert.name}</div>
                  <div style={{ fontSize: '10.5px', color: '#666', marginTop: '2px' }}>{cert.issuer}</div>
                  <div style={{ fontSize: '10px', color: '#c9a84c', marginTop: '2px', fontWeight: '600' }}>{cert.year}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <div style={sectionHeadingStyle}>Languages</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '11.5px', fontWeight: '600', color: '#1c1c1c' }}>{lang.name}</span>
                  <span style={{ fontSize: '10.5px', color: '#c9a84c' }}>({lang.proficiency})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
