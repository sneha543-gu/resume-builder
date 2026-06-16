import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function MintFresh({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;
  const MINT_DARK = '#065f46';
  const MINT_MEDIUM = '#10b981';
  const MINT_LIGHT = '#ecfdf5';
  const TEXT_DARK = '#111827';

  const initials = p.fullName
    ? p.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'JD';

  const SectionHeader = ({ title }: { title: string }) => (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '22px 0 12px' }}>
      <span style={{ fontSize: 14.5, fontWeight: 800, color: MINT_DARK, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{title}</span>
      <div style={{ height: 2, background: MINT_LIGHT, marginTop: 4, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: 40, height: 2, background: MINT_MEDIUM }} />
      </div>
    </div>
  );

  return (
    <div className="resume-template" style={{ width: 794, minHeight: 1123, fontFamily: '"Segoe UI", sans-serif', background: '#fff', boxSizing: 'border-box', display: 'flex' }}>
      {/* Left Sidebar */}
      <div style={{ width: '32%', background: MINT_LIGHT, padding: '36px 18px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 10, borderRight: `1px solid #d1fae5` }}>
        {/* Initials Circle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <div style={{ width: 70, height: 70, borderRadius: '50%', background: MINT_MEDIUM, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 900 }}>
            {initials}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: MINT_DARK, margin: 0 }}>{p.fullName || 'YOUR NAME'}</h2>
          <p style={{ fontSize: 14.5, color: MINT_MEDIUM, fontWeight: 700, textTransform: 'uppercase', margin: '3px 0 0 0', letterSpacing: 0.5 }}>{p.jobTitle || 'Professional Title'}</p>
        </div>

        {/* Contact info */}
        <div style={{ borderBottom: `1px solid #d1fae5`, paddingBottom: 10, marginBottom: 4, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13.5, color: TEXT_DARK, wordBreak: 'break-all' }}>
          {p.email && <div>✉ {p.email}</div>}
          {p.phone && <div>📞 {p.phone}</div>}
          {p.address && <div>📍 {p.address}</div>}
          {p.linkedIn && <div>🔗 {p.linkedIn}</div>}
          {p.github && <div>💻 {p.github}</div>}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <span style={{ fontSize: 12.5, fontWeight: 800, color: MINT_DARK, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Skills</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {skills.map((s, i) => (
                <div key={i} style={{ fontSize: 12.5, background: '#fff', color: MINT_DARK, padding: '3px 8px', borderRadius: 20, border: `1px solid #a7f3d0`, fontWeight: 600 }}>
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div style={{ marginTop: 10 }}>
            <span style={{ fontSize: 12.5, fontWeight: 800, color: MINT_DARK, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Education</span>
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: 12, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{ background: MINT_MEDIUM, color: '#fff', fontSize: 12, fontWeight: 700, padding: '2px 4px', borderRadius: 3, marginTop: 1 }}>{e.year.split(' - ')[0] || 'Edu'}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13.5, color: MINT_DARK }}>{e.degree}</div>
                  <div style={{ fontSize: 13, color: TEXT_DARK }}>{e.college}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div style={{ marginTop: 10 }}>
            <span style={{ fontSize: 12.5, fontWeight: 800, color: MINT_DARK, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Languages</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13.5, color: TEXT_DARK }}>
              {languages.map((l, i) => (
                <div key={i}>
                  <strong style={{ color: MINT_DARK }}>{l.name}</strong> · {l.proficiency}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Main Panel */}
      <div style={{ flex: 1, padding: '36px 28px 30px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        {summary && (
          <div>
            <SectionHeader title="Summary" />
            <p style={{ fontSize: 14.5, color: TEXT_DARK, lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>{summary}</p>
          </div>
        )}

        {workExperience.length > 0 && (
          <div>
            <SectionHeader title="Professional Experience" />
            {workExperience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>{exp.role}</div>
                  <div style={{ fontSize: 13, color: '#111827', fontWeight: 600 }}>
                    {exp.startDate}{(exp.startDate && (exp.current || exp.endDate)) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <div style={{ fontSize: 14.5, color: MINT_MEDIUM, fontWeight: 700, marginBottom: 5 }}>{exp.company}</div>
                <p style={{ fontSize: 14, color: TEXT_DARK, lineHeight: 1.6, margin: 0 }}>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <SectionHeader title="Projects" />
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: MINT_DARK }}>
                    {proj.name} {proj.link && <a href={proj.link} style={{ fontSize: 12.5, color: MINT_MEDIUM, textDecoration: 'none' }}>↗</a>}
                  </div>
                  {proj.techStack && <div style={{ fontSize: 13.5, color: MINT_MEDIUM, fontStyle: 'italic' }}>{proj.techStack}</div>}
                </div>
                <p style={{ fontSize: 14, color: TEXT_DARK, lineHeight: 1.5, margin: 0 }}>{proj.description}</p>
              </div>
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <SectionHeader title="Certifications" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {certifications.map((c, i) => (
                <div key={i} style={{ fontSize: 13.5, color: TEXT_DARK }}>
                  <div style={{ fontWeight: 600, color: MINT_DARK }}>{c.name}</div>
                  <div style={{ color: '#111827', fontSize: 12.5 }}>{c.issuer} {c.year && `· ${c.year}`}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
