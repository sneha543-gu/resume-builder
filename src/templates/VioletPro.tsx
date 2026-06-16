import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function VioletPro({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;
  const VIOLET = '#4c1d95';
  const VIOLET_LIGHT = '#6d28d9';
  const VIOLET_BG = '#f5f3ff';

  const initials = p.fullName
    ? p.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'JD';

  const SectionHeader = ({ title }: { title: string }) => (
    <div style={{ borderBottom: `2px solid ${VIOLET_LIGHT}`, paddingBottom: 4, margin: '22px 0 12px' }}>
      <span style={{ fontSize: 14.5, fontWeight: 800, color: VIOLET, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{title}</span>
    </div>
  );

  const SidebarHeader = ({ title }: { title: string }) => (
    <div style={{ margin: '20px 0 10px' }}>
      <span style={{ fontSize: 13, fontWeight: 800, color: '#c4b5fd', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{title}</span>
      <div style={{ height: 1, background: 'rgba(196, 181, 253, 0.25)', marginTop: 4 }} />
    </div>
  );

  return (
    <div className="resume-template" style={{ width: 794, minHeight: 1123, fontFamily: '"Segoe UI", sans-serif', background: '#fff', boxSizing: 'border-box', display: 'flex' }}>
      {/* Left Sidebar */}
      <div style={{ width: '33%', background: `linear-gradient(180deg, ${VIOLET} 0%, ${VIOLET_LIGHT} 100%)`, color: '#fff', padding: '36px 20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        {/* Profile Initials Circle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.12)', border: '2px solid rgba(255, 255, 255, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 900, color: '#fff' }}>
            {initials}
          </div>
        </div>

        {/* Contact */}
        <SidebarHeader title="Contact" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13.5, color: '#ddd6fe', wordBreak: 'break-all' }}>
          {p.email && <div>✉ {p.email}</div>}
          {p.phone && <div>📞 {p.phone}</div>}
          {p.address && <div>📍 {p.address}</div>}
          {p.linkedIn && <div>🔗 {p.linkedIn}</div>}
          {p.github && <div>💻 {p.github}</div>}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <>
            <SidebarHeader title="Skills" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {skills.map((s, i) => (
                <div key={i} style={{ fontSize: 12.5, background: 'rgba(255, 255, 255, 0.15)', color: '#fff', padding: '3px 8px', borderRadius: 4, fontWeight: 500 }}>
                  {s}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Education */}
        {education.length > 0 && (
          <>
            <SidebarHeader title="Education" />
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>{e.degree}</div>
                <div style={{ fontSize: 13, color: '#ddd6fe', marginTop: 1 }}>{e.college}</div>
                <div style={{ fontSize: 12.5, color: '#c4b5fd', marginTop: 1 }}>{e.year}{e.grade && ` · ${e.grade}`}</div>
              </div>
            ))}
          </>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <>
            <SidebarHeader title="Languages" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13.5, color: '#ddd6fe' }}>
              {languages.map((l, i) => (
                <div key={i}>
                  <strong style={{ color: '#fff' }}>{l.name}</strong>
                  <span style={{ color: '#c4b5fd' }}> — {l.proficiency}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Right Main Panel */}
      <div style={{ flex: 1, padding: '40px 32px 30px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: 30, fontWeight: 900, color: VIOLET, margin: 0 }}>{p.fullName || 'YOUR NAME'}</h1>
        <p style={{ fontSize: 16, color: VIOLET_LIGHT, fontWeight: 700, textTransform: 'uppercase', margin: '4px 0 20px', letterSpacing: '0.1em' }}>{p.jobTitle || 'Professional Title'}</p>

        {summary && (
          <div>
            <SectionHeader title="Professional Summary" />
            <p style={{ fontSize: 14.5, color: '#111827', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>{summary}</p>
          </div>
        )}

        {workExperience.length > 0 && (
          <div>
            <SectionHeader title="Work Experience" />
            {workExperience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 16, borderLeft: `2px solid ${VIOLET_BG}`, paddingLeft: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>{exp.role}</div>
                  <div style={{ fontSize: 13.5, color: '#111827', fontWeight: 600 }}>
                    {exp.startDate}{(exp.startDate && (exp.current || exp.endDate)) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <div style={{ fontSize: 14.5, color: VIOLET_LIGHT, fontWeight: 600, marginBottom: 4 }}>{exp.company}</div>
                <p style={{ fontSize: 14, color: '#1f2937', lineHeight: 1.6, margin: 0 }}>{exp.description}</p>
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
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>
                    {proj.name} {proj.link && <a href={proj.link} style={{ fontSize: 12.5, color: VIOLET_LIGHT, textDecoration: 'none' }}>↗</a>}
                  </div>
                  {proj.techStack && <div style={{ fontSize: 13.5, color: VIOLET, fontStyle: 'italic' }}>{proj.techStack}</div>}
                </div>
                <p style={{ fontSize: 14, color: '#1f2937', lineHeight: 1.5, margin: 0 }}>{proj.description}</p>
              </div>
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <SectionHeader title="Certifications" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
              {certifications.map((c, i) => (
                <div key={i} style={{ fontSize: 13.5, color: '#111827' }}>
                  <div style={{ fontWeight: 600, color: '#111827' }}>{c.name}</div>
                  <div style={{ color: '#111827', fontSize: 13 }}>{c.issuer} {c.year && `· ${c.year}`}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
