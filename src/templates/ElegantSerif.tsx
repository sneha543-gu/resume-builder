import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function ElegantSerif({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;

  const BURGUNDY = '#722f37';
  const FONT = 'Georgia, "Times New Roman", serif';

  const SectionHeading = ({ title }: { title: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '20px 0 10px 0' }}>
      <div style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
      <div style={{
        fontSize: 11.5,
        fontWeight: 700,
        color: BURGUNDY,
        fontFamily: FONT,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        fontVariant: 'small-caps',
      }}>
        {title}
      </div>
      <div style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
    </div>
  );

  const contactParts = [
    p.email, p.phone, p.address, p.linkedIn, p.github, p.website
  ].filter(Boolean);

  const leftSkills = skills.filter((_, i) => i % 2 === 0);
  const rightSkills = skills.filter((_, i) => i % 2 !== 0);

  return (
    <div
      className="resume-template"
      style={{
        width: 794,
        minHeight: 1123,
        backgroundColor: '#fffdf9',
        color: '#222',
        fontFamily: FONT,
        padding: '52px 60px',
        boxSizing: 'border-box',
        fontSize: 11.5,
        lineHeight: 1.7,
      }}
    >
      {/* Centered Header */}
      <div style={{ textAlign: 'center', marginBottom: 4 }}>
        <div style={{
          fontSize: 32,
          fontWeight: 700,
          fontFamily: FONT,
          color: '#111',
          letterSpacing: '1px',
          lineHeight: 1.1,
        }}>
          {p.fullName}
        </div>

        {/* Decorative rule */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, margin: '10px 0 8px 0' }}>
          <div style={{ width: 60, height: 1, backgroundColor: BURGUNDY }} />
          <span style={{ color: BURGUNDY, fontSize: 14 }}>✦</span>
          <div style={{ width: 60, height: 1, backgroundColor: BURGUNDY }} />
        </div>

        {p.jobTitle && (
          <div style={{
            fontSize: 13,
            color: BURGUNDY,
            fontStyle: 'italic',
            marginBottom: 8,
            letterSpacing: '0.5px',
          }}>
            {p.jobTitle}
          </div>
        )}

        {contactParts.length > 0 && (
          <div style={{
            fontSize: 10,
            color: '#666',
            letterSpacing: '0.3px',
            lineHeight: 1.8,
          }}>
            {contactParts.join('  ·  ')}
          </div>
        )}
      </div>

      {/* Summary */}
      {summary && (
        <div>
          <SectionHeading title="Profile" />
          <p style={{ margin: 0, color: '#333', fontSize: 11.5, lineHeight: 1.8, textAlign: 'justify', fontFamily: FONT }}>
            {summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {workExperience.length > 0 && (
        <div>
          <SectionHeading title="Experience" />
          {workExperience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: 12.5, color: '#111', fontFamily: FONT }}>{exp.role}</span>
                <span style={{ fontSize: 10.5, color: '#888', fontStyle: 'italic', fontFamily: FONT }}>
                  {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div style={{ fontSize: 11, color: BURGUNDY, fontStyle: 'italic', marginBottom: 4, fontFamily: FONT }}>
                {exp.company}
              </div>
              <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.75, color: '#333', fontFamily: FONT, textAlign: 'justify' }}>
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <SectionHeading title="Education" />
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: 12.5, color: '#111', fontFamily: FONT }}>{edu.degree}</span>
                <span style={{ fontSize: 10.5, color: '#888', fontStyle: 'italic', fontFamily: FONT }}>{edu.year}</span>
              </div>
              <div style={{ fontSize: 11, color: BURGUNDY, fontStyle: 'italic', fontFamily: FONT }}>
                {edu.college}{edu.grade ? ` — ${edu.grade}` : ''}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills — two columns */}
      {skills.length > 0 && (
        <div>
          <SectionHeading title="Skills" />
          <div style={{ display: 'flex', gap: 24 }}>
            <ul style={{ margin: 0, padding: '0 0 0 16px', flex: 1 }}>
              {leftSkills.map((skill, i) => (
                <li key={i} style={{ fontSize: 11.5, color: '#333', marginBottom: 3, fontFamily: FONT }}>
                  {skill}
                </li>
              ))}
            </ul>
            <ul style={{ margin: 0, padding: '0 0 0 16px', flex: 1 }}>
              {rightSkills.map((skill, i) => (
                <li key={i} style={{ fontSize: 11.5, color: '#333', marginBottom: 3, fontFamily: FONT }}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <SectionHeading title="Projects" />
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: 13 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: 12.5, color: '#111', fontFamily: FONT }}>{proj.name}</span>
                {proj.link && <span style={{ fontSize: 10, color: BURGUNDY, fontStyle: 'italic', fontFamily: FONT }}>{proj.link}</span>}
              </div>
              {proj.techStack && (
                <div style={{ fontSize: 10.5, color: '#666', marginBottom: 3, fontStyle: 'italic', fontFamily: FONT }}>
                  {proj.techStack}
                </div>
              )}
              <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.75, color: '#333', fontFamily: FONT, textAlign: 'justify' }}>
                {proj.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div>
          <SectionHeading title="Certifications" />
          {certifications.map((cert) => (
            <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'baseline' }}>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: '#222', fontFamily: FONT }}>{cert.name}</span>
              <span style={{ fontSize: 10.5, color: '#888', fontStyle: 'italic', fontFamily: FONT }}>
                {cert.issuer}{cert.year ? ` · ${cert.year}` : ''}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div>
          <SectionHeading title="Languages" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 32px' }}>
            {languages.map((lang) => (
              <div key={lang.id} style={{ fontSize: 11.5, color: '#333', fontFamily: FONT }}>
                <span style={{ fontWeight: 700 }}>{lang.name}</span>
                <span style={{ color: '#888', fontStyle: 'italic' }}> — {lang.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
