import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function TimelineClean({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#616161',
    letterSpacing: '2px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '18px',
  };

  const hrStyle: React.CSSProperties = {
    flex: 1,
    border: 'none',
    borderTop: '1px solid #e0e0e0',
    margin: 0,
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
        padding: '48px 52px',
      }}
    >
      {/* HEADER — Centered */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#212121', letterSpacing: '0.5px' }}>{p.fullName}</div>
        {p.jobTitle && <div style={{ fontSize: '13px', color: '#616161', marginTop: '4px' }}>{p.jobTitle}</div>}
        <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px' }}>
          {p.email && <span style={{ fontSize: '11px', color: '#757575' }}>📧 {p.email}</span>}
          {p.phone && <span style={{ fontSize: '11px', color: '#757575' }}>📞 {p.phone}</span>}
          {p.address && <span style={{ fontSize: '11px', color: '#757575' }}>📍 {p.address}</span>}
          {p.linkedIn && <span style={{ fontSize: '11px', color: '#757575' }}>🔗 {p.linkedIn}</span>}
          {p.github && <span style={{ fontSize: '11px', color: '#757575' }}>💼 {p.github}</span>}
          {p.website && <span style={{ fontSize: '11px', color: '#757575' }}>🌐 {p.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div style={{ marginBottom: '28px' }}>
          <div style={sectionHeadingStyle}>
            <span>About</span>
            <hr style={hrStyle} />
          </div>
          <p style={{ fontSize: '12px', color: '#424242', lineHeight: '1.8', margin: 0, textAlign: 'justify' }}>{summary}</p>
        </div>
      )}

      {/* TIMELINE Experience */}
      {workExperience.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <div style={sectionHeadingStyle}>
            <span>Experience</span>
            <hr style={hrStyle} />
          </div>
          <div style={{ position: 'relative', paddingLeft: '28px' }}>
            {/* Vertical Line */}
            <div style={{
              position: 'absolute',
              left: '7px',
              top: '6px',
              bottom: '6px',
              width: '2px',
              background: '#9e9e9e',
            }} />

            {workExperience.map((exp, index) => (
              <div key={exp.id} style={{ position: 'relative', marginBottom: index < workExperience.length - 1 ? '22px' : '0' }}>
                {/* Circle dot */}
                <div style={{
                  position: 'absolute',
                  left: '-24px',
                  top: '4px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  border: '2.5px solid #9e9e9e',
                  boxSizing: 'border-box',
                  zIndex: 1,
                }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#212121' }}>{exp.role}</span>
                  <span style={{ fontSize: '11px', color: '#9e9e9e' }}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#616161', marginBottom: '5px' }}>{exp.company}</div>
                <p style={{ fontSize: '12px', color: '#555', lineHeight: '1.7', margin: 0 }}>{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills — horizontal chip tags */}
      {skills.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <div style={sectionHeadingStyle}>
            <span>Skills</span>
            <hr style={hrStyle} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map((skill, i) => (
              <span key={i} style={{
                fontSize: '11px',
                color: '#424242',
                background: '#f5f5f5',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                padding: '4px 10px',
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education — two-column grid */}
      {education.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <div style={sectionHeadingStyle}>
            <span>Education</span>
            <hr style={hrStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {education.map((edu) => (
              <div key={edu.id} style={{
                background: '#fafafa',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                padding: '12px 14px',
              }}>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#212121' }}>{edu.degree}</div>
                <div style={{ fontSize: '11px', color: '#616161', marginTop: '3px' }}>{edu.college}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                  <span style={{ fontSize: '10px', color: '#9e9e9e' }}>{edu.year}</span>
                  {edu.grade && <span style={{ fontSize: '10px', color: '#9e9e9e' }}>{edu.grade}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <div style={sectionHeadingStyle}>
            <span>Projects</span>
            <hr style={hrStyle} />
          </div>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#212121' }}>{proj.name}</span>
                {proj.link && <span style={{ fontSize: '10px', color: '#9e9e9e' }}>{proj.link}</span>}
              </div>
              {proj.techStack && <div style={{ fontSize: '10px', color: '#757575', fontStyle: 'italic', marginBottom: '4px' }}>{proj.techStack}</div>}
              <p style={{ fontSize: '12px', color: '#555', lineHeight: '1.7', margin: 0 }}>{proj.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <div style={sectionHeadingStyle}>
            <span>Certifications</span>
            <hr style={hrStyle} />
          </div>
          {certifications.map((cert) => (
            <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', marginBottom: '8px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#212121' }}>{cert.name}</span>
                <span style={{ fontSize: '11px', color: '#616161', marginLeft: '8px' }}>{cert.issuer}</span>
              </div>
              <span style={{ fontSize: '11px', color: '#9e9e9e' }}>{cert.year}</span>
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div>
          <div style={sectionHeadingStyle}>
            <span>Languages</span>
            <hr style={hrStyle} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {languages.map((lang) => (
              <div key={lang.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#9e9e9e' }} />
                <span style={{ fontSize: '12px', color: '#424242' }}>{lang.name}</span>
                <span style={{ fontSize: '10px', color: '#9e9e9e' }}>({lang.proficiency})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
