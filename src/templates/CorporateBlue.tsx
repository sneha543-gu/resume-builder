import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function CorporateBlue({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;

  const NAVY = '#1a3a6b';

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 700,
    color: NAVY,
    marginBottom: 4,
    marginTop: 20,
    fontFamily: '"Segoe UI", Arial, sans-serif',
    letterSpacing: '0.4px',
  };

  const hrStyle: React.CSSProperties = {
    border: 'none',
    borderTop: `2px solid ${NAVY}`,
    margin: '4px 0 10px 0',
  };

  const contactParts = [
    p.email && `✉ ${p.email}`,
    p.phone && `☎ ${p.phone}`,
    p.address && `⌂ ${p.address}`,
    p.linkedIn && `🔗 ${p.linkedIn}`,
    p.github && `⌥ ${p.github}`,
    p.website && `⚡ ${p.website}`,
  ].filter(Boolean) as string[];

  const skillChunks: string[][] = [];
  for (let i = 0; i < skills.length; i += 3) {
    skillChunks.push(skills.slice(i, i + 3));
  }

  return (
    <div
      className="resume-template"
      style={{
        width: 794,
        minHeight: 1123,
        backgroundColor: '#fff',
        fontFamily: '"Segoe UI", Arial, sans-serif',
        boxSizing: 'border-box',
        fontSize: 11.5,
        lineHeight: 1.6,
        color: '#222',
      }}
    >
      {/* Navy Header */}
      <div
        style={{
          backgroundColor: NAVY,
          padding: '36px 52px 28px 52px',
          color: '#fff',
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700, color: '#fff', letterSpacing: '0.5px', lineHeight: 1.1 }}>
          {p.fullName}
        </div>
        {p.jobTitle && (
          <div style={{ fontSize: 14, color: '#a8c4f0', marginTop: 5, fontWeight: 400, letterSpacing: '0.3px' }}>
            {p.jobTitle}
          </div>
        )}
        {contactParts.length > 0 && (
          <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: '6px 18px' }}>
            {contactParts.map((c, i) => (
              <span key={i} style={{ fontSize: 10, color: '#cde0ff', lineHeight: 1.6 }}>{c}</span>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '20px 52px 40px 52px' }}>

        {/* Summary */}
        {summary && (
          <div>
            <div style={sectionHeadingStyle}>Professional Summary</div>
            <hr style={hrStyle} />
            <p style={{ margin: 0, color: '#333', fontSize: 11.5, lineHeight: 1.75 }}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <div>
            <div style={sectionHeadingStyle}>Work Experience</div>
            <hr style={hrStyle} />
            {workExperience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: 12.5, color: '#111' }}>{exp.role}</span>
                  <span style={{ fontSize: 10.5, color: '#666', fontStyle: 'italic' }}>
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: NAVY, fontStyle: 'italic', fontWeight: 600, marginBottom: 4 }}>
                  {exp.company}
                </div>
                <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.7, color: '#333' }}>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <div style={sectionHeadingStyle}>Education</div>
            <hr style={hrStyle} />
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: 12.5, color: '#111' }}>{edu.degree}</span>
                  <span style={{ fontSize: 10.5, color: '#666', fontStyle: 'italic' }}>{edu.year}</span>
                </div>
                <div style={{ fontSize: 11, color: NAVY, fontStyle: 'italic', fontWeight: 600 }}>
                  {edu.college}{edu.grade ? ` — ${edu.grade}` : ''}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <div style={sectionHeadingStyle}>Skills</div>
            <hr style={hrStyle} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px 12px' }}>
              {skills.map((skill, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: '#222' }}>
                  <span style={{ color: NAVY, fontWeight: 700, fontSize: 14, lineHeight: 1 }}>·</span>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <div style={sectionHeadingStyle}>Projects</div>
            <hr style={hrStyle} />
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: 12.5, color: '#111' }}>{proj.name}</span>
                  {proj.link && <span style={{ fontSize: 10, color: NAVY }}>{proj.link}</span>}
                </div>
                {proj.techStack && (
                  <div style={{ fontSize: 10.5, color: '#555', marginBottom: 3 }}>
                    <span style={{ fontWeight: 700, color: NAVY }}>Tech Stack:</span> {proj.techStack}
                  </div>
                )}
                <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.7, color: '#333' }}>{proj.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <div style={sectionHeadingStyle}>Certifications</div>
            <hr style={hrStyle} />
            {certifications.map((cert) => (
              <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontWeight: 600, fontSize: 11.5, color: '#222' }}>{cert.name}</span>
                <span style={{ fontSize: 10.5, color: '#555', fontStyle: 'italic' }}>
                  {cert.issuer}{cert.year ? `, ${cert.year}` : ''}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <div style={sectionHeadingStyle}>Languages</div>
            <hr style={hrStyle} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 24px' }}>
              {languages.map((lang) => (
                <div key={lang.id} style={{ fontSize: 11.5, color: '#333' }}>
                  <span style={{ fontWeight: 600 }}>{lang.name}</span>
                  <span style={{ color: '#666' }}> — {lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
