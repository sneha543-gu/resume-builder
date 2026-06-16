import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function PurplePro({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;

  const sidebarStyle: React.CSSProperties = {
    width: '33%',
    minHeight: '1123px',
    background: 'linear-gradient(180deg, #6a1b9a 0%, #4a148c 100%)',
    padding: '36px 20px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  };

  const mainStyle: React.CSSProperties = {
    width: '67%',
    minHeight: '1123px',
    background: '#ffffff',
    padding: '36px 28px',
    boxSizing: 'border-box',
  };

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#4a148c',
    borderLeft: '3px solid #4a148c',
    paddingLeft: '8px',
    marginBottom: '12px',
    letterSpacing: '1px',
  };

  const sidebarSectionTitle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#e1bee7',
    letterSpacing: '1.5px',
    marginBottom: '10px',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
    paddingBottom: '5px',
  };

  return (
    <div
      className="resume-template"
      style={{
        width: '794px',
        minHeight: '1123px',
        display: 'flex',
        flexDirection: 'row',
        fontFamily: '"Segoe UI", Arial, sans-serif',
        background: '#ffffff',
        boxSizing: 'border-box',
      }}
    >
      {/* LEFT SIDEBAR */}
      <div style={sidebarStyle}>
        {/* Name & Title */}
        <div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#ffffff', lineHeight: '1.2', marginBottom: '6px' }}>
            {p.fullName}
          </div>
          <div style={{ fontSize: '13px', color: '#ce93d8', fontStyle: 'italic' }}>
            {p.jobTitle}
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <div style={sidebarSectionTitle}>Contact</div>
          {p.email && (
            <div style={{ fontSize: '11px', color: '#e1bee7', marginBottom: '6px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <span>📧</span><span style={{ wordBreak: 'break-all' }}>{p.email}</span>
            </div>
          )}
          {p.phone && (
            <div style={{ fontSize: '11px', color: '#e1bee7', marginBottom: '6px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <span>📞</span><span>{p.phone}</span>
            </div>
          )}
          {p.address && (
            <div style={{ fontSize: '11px', color: '#e1bee7', marginBottom: '6px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <span>📍</span><span>{p.address}</span>
            </div>
          )}
          {p.linkedIn && (
            <div style={{ fontSize: '11px', color: '#e1bee7', marginBottom: '6px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <span>🔗</span><span style={{ wordBreak: 'break-all' }}>{p.linkedIn}</span>
            </div>
          )}
          {p.github && (
            <div style={{ fontSize: '11px', color: '#e1bee7', marginBottom: '6px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <span>💼</span><span style={{ wordBreak: 'break-all' }}>{p.github}</span>
            </div>
          )}
          {p.website && (
            <div style={{ fontSize: '11px', color: '#e1bee7', marginBottom: '6px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <span>🌐</span><span style={{ wordBreak: 'break-all' }}>{p.website}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <div style={sidebarSectionTitle}>Skills</div>
            {skills.map((skill, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ce93d8', flexShrink: 0, display: 'inline-block' }} />
                <span style={{ fontSize: '11px', color: '#ffffff' }}>{skill}</span>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <div style={sidebarSectionTitle}>Languages</div>
            {languages.map((lang) => (
              <div key={lang.id} style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '11px', color: '#ffffff', fontWeight: '600' }}>{lang.name}</div>
                <div style={{ fontSize: '10px', color: '#ce93d8' }}>{lang.proficiency}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT MAIN */}
      <div style={mainStyle}>
        {/* Summary */}
        {summary && (
          <div style={{ marginBottom: '24px' }}>
            <div style={sectionHeadingStyle}>Professional Summary</div>
            <p style={{ fontSize: '12px', color: '#333', lineHeight: '1.7', margin: 0 }}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <div style={sectionHeadingStyle}>Work Experience</div>
            {workExperience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#1a1a1a' }}>{exp.role}</span>
                  <span style={{ fontSize: '11px', color: '#888' }}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#7b1fa2', fontStyle: 'italic', marginBottom: '5px' }}>{exp.company}</div>
                <p style={{ fontSize: '12px', color: '#444', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <div style={sectionHeadingStyle}>Education</div>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#1a1a1a' }}>{edu.degree}</span>
                  <span style={{ fontSize: '11px', color: '#888' }}>{edu.year}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#7b1fa2', marginBottom: '2px' }}>{edu.college}</div>
                {edu.grade && <div style={{ fontSize: '11px', color: '#666' }}>Grade: {edu.grade}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <div style={sectionHeadingStyle}>Projects</div>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#1a1a1a' }}>{proj.name}</span>
                  {proj.link && <span style={{ fontSize: '10px', color: '#7b1fa2' }}>{proj.link}</span>}
                </div>
                {proj.techStack && (
                  <div style={{ fontSize: '10px', color: '#7b1fa2', fontStyle: 'italic', marginBottom: '4px' }}>{proj.techStack}</div>
                )}
                <p style={{ fontSize: '12px', color: '#444', lineHeight: '1.6', margin: 0 }}>{proj.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <div style={sectionHeadingStyle}>Certifications</div>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#1a1a1a' }}>{cert.name}</span>
                  <span style={{ fontSize: '11px', color: '#7b1fa2', marginLeft: '8px' }}>{cert.issuer}</span>
                </div>
                <span style={{ fontSize: '11px', color: '#888' }}>{cert.year}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
