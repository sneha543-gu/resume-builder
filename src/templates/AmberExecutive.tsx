import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function AmberExecutive({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;
  const AMBER_DARK = '#92400e';
  const GOLD = '#d97706';
  const AMBER_LIGHT = '#fef3c7';

  const initials = p.fullName
    ? p.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'JD';

  const RightSectionHeader = ({ title }: { title: string }) => (
    <div style={{ borderBottom: `2px solid ${GOLD}`, paddingBottom: 4, margin: '22px 0 12px' }}>
      <span style={{ fontSize: 15, fontWeight: 800, color: AMBER_DARK, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{title}</span>
    </div>
  );

  const LeftSectionHeader = ({ title }: { title: string }) => (
    <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.25)', paddingBottom: 4, margin: '20px 0 10px' }}>
      <span style={{ fontSize: 13.5, fontWeight: 700, color: AMBER_LIGHT, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{title}</span>
    </div>
  );

  return (
    <div className="resume-template" style={{ width: 794, minHeight: 1123, fontFamily: '"Segoe UI", Arial, sans-serif', background: '#fff', boxSizing: 'border-box', display: 'flex' }}>
      {/* Left Sidebar */}
      <div style={{ width: '32%', background: AMBER_DARK, color: '#fff', padding: '30px 20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        {/* Initials Circle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <div style={{ width: 75, height: 75, borderRadius: '50%', background: '#fff', color: AMBER_DARK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 900, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            {initials}
          </div>
        </div>

        {/* Contact info */}
        <LeftSectionHeader title="Contact" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13.5, color: '#fef3c7', wordBreak: 'break-all' }}>
          {p.email && <div>✉ {p.email}</div>}
          {p.phone && <div>📞 {p.phone}</div>}
          {p.address && <div>📍 {p.address}</div>}
          {p.linkedIn && <div>🔗 {p.linkedIn}</div>}
          {p.github && <div>💻 {p.github}</div>}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <>
            <LeftSectionHeader title="Skills" />
            <ul style={{ margin: 0, paddingLeft: 14, fontSize: 13.5, color: '#fef3c7', lineHeight: 1.6 }}>
              {skills.map((s, i) => (
                <li key={i} style={{ marginBottom: 4 }}>{s}</li>
              ))}
            </ul>
          </>
        )}

        {/* Education */}
        {education.length > 0 && (
          <>
            <LeftSectionHeader title="Education" />
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>{e.degree}</div>
                <div style={{ fontSize: 13, color: '#fef3c7' }}>{e.college}</div>
                <div style={{ fontSize: 12.5, color: 'rgba(255, 255, 255, 0.7)', marginTop: 1 }}>{e.year}{e.grade && ` (${e.grade})`}</div>
              </div>
            ))}
          </>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <>
            <LeftSectionHeader title="Languages" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 13.5, color: '#fef3c7' }}>
              {languages.map((l, i) => (
                <div key={i}>
                  <span style={{ fontWeight: 700 }}>{l.name}</span>
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}> · {l.proficiency}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Right Main Panel */}
      <div style={{ flex: 1, padding: '40px 32px 30px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        {/* Name and title */}
        <h1 style={{ fontSize: 28, fontWeight: 900, color: AMBER_DARK, margin: 0, letterSpacing: 0.5 }}>{p.fullName || 'YOUR NAME'}</h1>
        <p style={{ fontSize: 16, color: GOLD, fontWeight: 700, textTransform: 'uppercase', margin: '4px 0 20px', letterSpacing: 1.5 }}>{p.jobTitle || 'Professional Title'}</p>

        {summary && (
          <div>
            <RightSectionHeader title="Professional Summary" />
            <p style={{ fontSize: 14.5, color: '#111827', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>{summary}</p>
          </div>
        )}

        {workExperience.length > 0 && (
          <div>
            <RightSectionHeader title="Work Experience" />
            {workExperience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>{exp.role}</div>
                  <div style={{ fontSize: 13.5, color: '#111827', fontWeight: 600 }}>
                    {exp.startDate}{(exp.startDate && (exp.current || exp.endDate)) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <div style={{ fontSize: 14.5, color: GOLD, fontWeight: 600, marginBottom: 5 }}>{exp.company}</div>
                <p style={{ fontSize: 14.5, color: '#1f2937', lineHeight: 1.6, margin: 0 }}>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <RightSectionHeader title="Projects" />
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>
                    {proj.name} {proj.link && <a href={proj.link} style={{ fontSize: 12.5, color: AMBER_DARK, textDecoration: 'none' }}>↗</a>}
                  </div>
                  {proj.techStack && <div style={{ fontSize: 13.5, color: GOLD, fontStyle: 'italic' }}>{proj.techStack}</div>}
                </div>
                <p style={{ fontSize: 14, color: '#1f2937', lineHeight: 1.5, margin: 0 }}>{proj.description}</p>
              </div>
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <RightSectionHeader title="Certifications" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {certifications.map((c, i) => (
                <div key={i} style={{ fontSize: 14, color: '#111827' }}>
                  <div style={{ fontWeight: 700, color: '#111827' }}>{c.name}</div>
                  <div style={{ color: '#111827', fontSize: 13.5 }}>{c.issuer} {c.year && `· ${c.year}`}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
