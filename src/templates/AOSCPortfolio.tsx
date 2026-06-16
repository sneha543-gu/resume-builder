import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

/**
 * AOSC Portfolio — Suneha Style (Frontend Developer)
 * Replicates the exact layout, colors, and typography of Suneha_Saini_Frontend_Profile (1).docx:
 * - Single-column clean layout with centered header.
 * - Header separator: A single solid navy line (#1E3A5F) directly below the contacts block.
 * - Section Headings: Uppercase, bold navy text (#1E3A5F) with a single light blue bottom border (#2E6DA4).
 * - Typography: Arial, sans-serif.
 * - Colors: Navy #1E3A5F, Blue #2E6DA4, Grey #555555, Black #111111.
 */
export default function AOSCPortfolio({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;

  const NAVY = '#1E3A5F';
  const BLUE = '#2E6DA4';
  const GREY = '#555555';
  const BOLD = '#111111';

  // Section heading with a single bottom border (matching w:pBdr bottom val=single sz=8 color=2E6DA4 in docx)
  const SectionHeading = ({ title }: { title: string }) => (
    <div style={{ 
      marginTop: 20, 
      marginBottom: 10, 
      borderBottom: `1.2px solid ${BLUE}`, 
      paddingBottom: 4,
      fontFamily: 'Arial, Helvetica, sans-serif'
    }}>
      <span style={{ 
        fontSize: '11px', 
        fontWeight: 800, 
        color: NAVY, 
        letterSpacing: '0.08em', 
        textTransform: 'uppercase' 
      }}>
        {title}
      </span>
    </div>
  );

  const contacts: string[] = [];
  if (p.phone)    contacts.push(`📞 ${p.phone}`);
  if (p.email)    contacts.push(`✉ ${p.email}`);
  if (p.website)  contacts.push(`🌐 ${p.website}`);
  if (p.linkedIn) contacts.push(`linkedin.com/in/${p.linkedIn.replace(/^(https?:\/\/)?(www\.)?linkedin\.com\/in\//, '').replace(/\/$/, '')}`);
  if (p.address)  contacts.push(`${p.address}`);

  return (
    <div className="resume-template tpl-aosc-portfolio" style={{
      background: '#fff', 
      fontFamily: 'Arial, Helvetica, sans-serif',
      minHeight: '1123px', 
      width: '794px',
      boxSizing: 'border-box', 
      padding: '40px 50px 60px',
      color: GREY, 
      position: 'relative',
    }}>
      {/* ── HEADER ── */}
      <div style={{ textAlign: 'center', marginBottom: 4 }}>
        <h1 style={{ 
          color: NAVY, 
          fontSize: '26px', 
          fontWeight: 900, 
          letterSpacing: '0.02em', 
          textTransform: 'uppercase', 
          margin: '0 0 4px 0', 
          lineHeight: 1.1 
        }}>
          {p.fullName || 'YOUR NAME'}
        </h1>
        <p style={{ 
          color: GREY, 
          fontSize: '11px', 
          margin: '0 0 6px 0', 
          fontWeight: 400, 
          letterSpacing: '0.02em' 
        }}>
          {p.jobTitle || 'Frontend Engineer'}
        </p>
        {contacts.length > 0 && (
          <p style={{ 
            color: GREY, 
            fontSize: '9.5px', 
            margin: 0, 
            lineHeight: 1.5, 
            wordBreak: 'break-all' 
          }}>
            {contacts.join('   |   ')}
          </p>
        )}
      </div>

      {/* Header Separator (single solid navy line matching w:pBdr bottom val=single sz=12 color=1E3A5F in docx) */}
      <div style={{ 
        borderBottom: `1.5px solid ${NAVY}`, 
        height: '0px',
        marginTop: '10px', 
        marginBottom: '14px' 
      }} />

      {/* ── PROFESSIONAL SUMMARY ── */}
      {summary && (
        <div>
          <SectionHeading title="Professional Summary" />
          <p style={{ 
            fontSize: '9.5px', 
            lineHeight: 1.6, 
            color: GREY, 
            margin: 0, 
            textAlign: 'justify' 
          }}>
            {summary}
          </p>
        </div>
      )}

      {/* ── TECHNICAL SKILLS ── */}
      {skills.length > 0 && (
        <div>
          <SectionHeading title="Technical Skills" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {skills.map((skill, i) => {
              const c = skill.indexOf(':');
              const label = c > -1 ? skill.slice(0, c) : '';
              const rest  = c > -1 ? skill.slice(c + 1) : skill;
              return (
                <p key={i} style={{ fontSize: '9.5px', lineHeight: 1.4, color: GREY, margin: 0 }}>
                  {label && <strong style={{ color: BOLD }}>{label}: </strong>}{rest.trim()}
                </p>
              );
            })}
          </div>
        </div>
      )}

      {/* ── WORK EXPERIENCE ── */}
      {workExperience.length > 0 && (
        <div>
          <SectionHeading title="Work Experience" />
          {workExperience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '10.5px', fontWeight: 800, color: BOLD }}>{exp.role}</span>
                <span style={{ fontSize: '9px', color: GREY, whiteSpace: 'nowrap', marginLeft: 8 }}>
                  {exp.startDate}{exp.startDate && (exp.current || exp.endDate) ? ' – ' : ''}
                  {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <p style={{ fontSize: '9.5px', color: BLUE, fontWeight: 700, margin: '1px 0 4px 0' }}>{exp.company}</p>
              {exp.description && exp.description.split('\n').filter(Boolean).map((line, li) => (
                <p key={li} style={{ 
                  fontSize: '9.5px', 
                  color: GREY, 
                  lineHeight: 1.5, 
                  margin: '2px 0', 
                  paddingLeft: 10,
                  textAlign: 'justify'
                }}>
                  • {line.replace(/^[-•]\s*/, '')}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* ── KEY PROJECTS ── */}
      {projects.length > 0 && (
        <div>
          <SectionHeading title="Key Projects" />
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 4 }}>
                <span style={{ fontSize: '10px', fontWeight: 800, color: BOLD }}>{proj.name}</span>
                <span style={{ fontSize: '9px', color: GREY, whiteSpace: 'nowrap' }}>
                  {proj.techStack ? 'React.js · Web Development' : ''}
                </span>
              </div>
              {proj.techStack && (
                <p style={{ fontSize: '8.5px', color: BLUE, margin: '1px 0 3px 0' }}>
                  {proj.techStack}
                </p>
              )}
              {proj.description && proj.description.split('\n').filter(Boolean).map((line, li) => (
                <p key={li} style={{ 
                  fontSize: '9.5px', 
                  color: GREY, 
                  lineHeight: 1.5, 
                  margin: '2px 0', 
                  paddingLeft: 10,
                  textAlign: 'justify'
                }}>
                  • {line.replace(/^[-•]\s*/, '')}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* ── EDUCATION ── */}
      {education.length > 0 && (
        <div>
          <SectionHeading title="Education" />
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '10.5px', fontWeight: 800, color: BOLD }}>{edu.degree}</span>
                <span style={{ fontSize: '9px', color: GREY, whiteSpace: 'nowrap', marginLeft: 8 }}>{edu.year}</span>
              </div>
              <p style={{ fontSize: '9.5px', color: BLUE, fontWeight: 700, margin: '1px 0 0 0' }}>
                {edu.college}
                {edu.grade ? <span style={{ color: GREY, fontWeight: 400 }}>   |   {edu.grade}</span> : null}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ── CERTIFICATIONS ── */}
      {certifications.length > 0 && (
        <div>
          <SectionHeading title="Certifications" />
          {certifications.map((cert, i) => (
            <p key={i} style={{ fontSize: '9.5px', color: GREY, margin: '2px 0', lineHeight: 1.4 }}>
              <strong style={{ color: BOLD }}>{cert.name}</strong>
              {cert.issuer ? ` — ${cert.issuer}` : ''}{cert.year ? ` (${cert.year})` : ''}
            </p>
          ))}
        </div>
      )}

      {/* ── SOFT SKILLS / LANGUAGES ── */}
      {languages.length > 0 && (
        <div>
          <SectionHeading title="Soft Skills" />
          <p style={{ fontSize: '9.5px', color: GREY, lineHeight: 1.5, margin: 0 }}>
            {languages.map(l => l.name).join('   •   ')}
          </p>
        </div>
      )}

      {/* ── AOSC FOOTER ── */}
      <div style={{ 
        position: 'absolute', 
        bottom: 20, 
        left: 50, 
        right: 50, 
        borderTop: '1px solid #d1d5db', 
        paddingTop: 8, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: '#fff'
      }}>
        <span style={{ fontSize: '7.5px', color: '#9ca3af', letterSpacing: '0.06em' }}>AOSC TECHNOLOGIES · INITIATE | INCUBATE | INNOVATE</span>
        <img src="/logo1.png" alt="AOSC" style={{ height: 16, opacity: 0.45 }} />
      </div>
    </div>
  );
}
