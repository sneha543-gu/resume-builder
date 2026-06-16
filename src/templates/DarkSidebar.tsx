import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function DarkSidebar({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, languages } = data;
  return (
    <div className="resume-template tpl-dark-sidebar" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      background: 'white', 
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      minHeight: '1123px',
      position: 'relative'
    }}>
      {/* Dark Header Block */}
      <div style={{ 
        height: '240px', 
        background: '#1a2b5a', 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'flex-end', 
        paddingRight: '60px',
        boxSizing: 'border-box',
        paddingTop: '60px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {/* Logo Placeholder */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ color: 'white', fontWeight: 800, fontSize: '24px', letterSpacing: '2px' }}>AOSC</div>
            <div style={{ color: 'white', fontSize: '10px', letterSpacing: '1px', opacity: 0.8 }}>TECHNOLOGIES</div>
          </div>
          
          <h1 style={{ 
            color: 'white', 
            fontSize: '48px', 
            fontWeight: 900, 
            margin: 0, 
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            {p.fullName || 'NAVREET KAUR'}
          </h1>
          <p style={{ 
            color: 'white', 
            fontSize: '20px', 
            margin: '5px 0 0 0',
            fontWeight: 400,
            letterSpacing: '1px'
          }}>
            {p.jobTitle || 'Data Engineer'}
          </p>
        </div>
      </div>

      {/* Main Body Split */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <div style={{ 
          width: '35%', 
          background: '#f8fafc', 
          padding: '120px 30px 40px 40px',
          boxSizing: 'border-box'
        }}>
          {/* Education Section */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 800, margin: 0 }}>EDUCATION</h2>
              <div style={{ flex: 1, height: '1.5px', background: '#cbd5e1' }}></div>
            </div>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 5px 0' }}>{edu.year}</p>
                <p style={{ fontSize: '14px', fontWeight: 800, margin: '0 0 5px 0', textTransform: 'uppercase' }}>{edu.college}</p>
                <ul style={{ margin: 0, paddingLeft: '15px', color: '#475569', fontSize: '13px' }}>
                  <li>{edu.degree}</li>
                </ul>
              </div>
            ))}
          </div>

          {/* Technical Skills Section */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 800, margin: 0 }}>TECHNICAL SKILLS</h2>
              <div style={{ flex: 1, height: '1.5px', background: '#cbd5e1' }}></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {skills.map((skill, i) => {
                // Try to format like Programming: Python etc.
                const parts = skill.split(':');
                if (parts.length > 1) {
                  return (
                    <div key={i} style={{ fontSize: '13px', lineHeight: '1.5' }}>
                      <span style={{ fontWeight: 800 }}>• {parts[0]}:</span> {parts[1]}
                    </div>
                  );
                }
                return <div key={i} style={{ fontSize: '13px' }}>• {skill}</div>;
              })}
            </div>
          </div>

          {/* Soft Skills Section */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 800, margin: 0 }}>SOFT SKILLS</h2>
              <div style={{ flex: 1, height: '1.5px', background: '#cbd5e1' }}></div>
            </div>
            <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
              {languages.map(l => l.name).join(', ')}
            </p>
          </div>

          {/* Professional Experience Sidebar Items */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 800, margin: 0 }}>PROFESSIONAL EXPERIENCE</h2>
              <div style={{ flex: 1, height: '1.5px', background: '#cbd5e1' }}></div>
            </div>
            {workExperience.slice(0, 2).map((exp, i) => (
              <div key={i} style={{ marginBottom: '15px', borderLeft: '2px solid #cbd5e1', paddingLeft: '15px' }}>
                <p style={{ fontSize: '13px', fontWeight: 600, margin: '0 0 2px 0' }}>{exp.role}</p>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 2px 0' }}>{exp.company}</p>
                <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Column */}
        <div style={{ 
          width: '65%', 
          padding: '40px 40px 40px 40px',
          boxSizing: 'border-box'
        }}>
          {/* Professional Summary */}
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 800, margin: 0 }}>PROFESSIONAL SUMMARY</h2>
              <div style={{ flex: 1, height: '1.5px', background: '#f1f5f9' }}></div>
            </div>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.8', textAlign: 'justify' }}>
              {summary}
            </p>
          </div>

          {/* Projects */}
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 800, margin: 0 }}>PROJECTS</h2>
              <div style={{ flex: 1, height: '1.5px', background: '#f1f5f9' }}></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', position: 'relative' }}>
              {/* Vertical line connecting projects */}
              <div style={{ 
                position: 'absolute', 
                left: '7.5px', 
                top: '10px', 
                bottom: '10px', 
                width: '1px', 
                background: '#cbd5e1' 
              }}></div>
              
              {projects.map((proj, i) => (
                <div key={i} style={{ display: 'flex', gap: '20px', position: 'relative' }}>
                  {/* Project dot */}
                  <div style={{ 
                    width: '16px', 
                    height: '16px', 
                    borderRadius: '50%', 
                    background: 'white', 
                    border: '2px solid #1a2b5a', 
                    flexShrink: 0,
                    zIndex: 1
                  }}></div>
                  
                  <div>
                    <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#334155' }}>
                      <span style={{ fontWeight: 800 }}>{proj.name}:</span> {proj.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Profile Image */}
      <div style={{ 
        position: 'absolute', 
        top: '120px', 
        left: '40px', 
        width: '200px', 
        height: '200px', 
        borderRadius: '50%', 
        overflow: 'hidden', 
        border: '12px solid #f8fafc',
        boxSizing: 'border-box',
        background: '#e2e8f0'
      }}>
        {p.profilePhoto ? (
          <img src={p.profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', fontSize: '80px' }}>👤</div>
        )}
      </div>
    </div>
  );
}
