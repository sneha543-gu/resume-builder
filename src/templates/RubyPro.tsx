import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function RubyPro({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;
  const RUBY = '#7f1d1d';
  const RUBY_LIGHT = '#b91c1c';
  const PINK_LIGHT = '#fdf2f8';

  const initials = p.fullName
    ? p.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'JD';

  const SectionHeader = ({ title }: { title: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '22px 0 12px' }}>
      <span style={{ fontSize: 15, fontWeight: 800, color: RUBY, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{title}</span>
      <div style={{ flex: 1, height: 1.5, background: '#fee2e2' }} />
    </div>
  );

  const SidebarHeader = ({ title }: { title: string }) => (
    <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.2)', paddingBottom: 3, margin: '20px 0 10px' }}>
      <span style={{ fontSize: 13.5, fontWeight: 700, color: '#fca5a5', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{title}</span>
    </div>
  );

  return (
    <div className="resume-template" style={{ width: 794, minHeight: 1123, fontFamily: 'Georgia, serif', background: '#fff', boxSizing: 'border-box', display: 'flex' }}>
      {/* Left Sidebar */}
      <div style={{ width: '30%', background: RUBY, color: '#fff', padding: '36px 18px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Decorative circle */}
        <div style={{ position: 'absolute', top: -30, left: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)' }} />

        {/* Initials Circle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20, zIndex: 2 }}>
          <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700 }}>
            {initials}
          </div>
        </div>

        {/* Contact info */}
        <SidebarHeader title="Contact" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13.5, color: '#fca5a5', wordBreak: 'break-all' }}>
          {p.email && <div>✉ {p.email}</div>}
          {p.phone && <div>📞 {p.phone}</div>}
          {p.address && <div>📍 {p.address}</div>}
          {p.linkedIn && <div>🔗 {p.linkedIn}</div>}
          {p.github && <div>💻 {p.github}</div>}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <>
            <SidebarHeader title="Expertise" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13.5, color: '#fee2e2' }}>
              {skills.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                  <span style={{ color: '#fca5a5' }}>◆</span>
                  <span>{s}</span>
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
                <div style={{ fontSize: 13, color: '#fca5a5', fontStyle: 'italic', marginTop: 1 }}>{e.college}</div>
                <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.6)', marginTop: 1 }}>{e.year}{e.grade && ` · ${e.grade}`}</div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Right Main Panel */}
      <div style={{ flex: 1, padding: '40px 32px 30px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        {/* Right Header Area */}
        <div style={{ borderBottom: `3px solid ${RUBY}`, paddingBottom: 10, marginBottom: 16 }}>
          <h1 style={{ fontSize: 30, fontWeight: 700, color: RUBY, margin: 0, letterSpacing: 0.5 }}>{p.fullName || 'YOUR NAME'}</h1>
          <p style={{ fontSize: 15.5, color: RUBY_LIGHT, fontWeight: 700, textTransform: 'uppercase', margin: '4px 0 0 0', letterSpacing: 1.5 }}>{p.jobTitle || 'Professional Title'}</p>
        </div>

        {summary && (
          <div>
            <SectionHeader title="Profile Summary" />
            <p style={{ fontSize: 14.5, color: '#111827', lineHeight: 1.8, margin: 0, textAlign: 'justify' }}>{summary}</p>
          </div>
        )}

        {workExperience.length > 0 && (
          <div>
            <SectionHeader title="Professional History" />
            {workExperience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>{exp.role}</div>
                  <div style={{ fontSize: 13, background: PINK_LIGHT, color: RUBY, padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>
                    {exp.startDate}{(exp.startDate && (exp.current || exp.endDate)) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <div style={{ fontSize: 14.5, color: RUBY_LIGHT, fontWeight: 600, fontStyle: 'italic', marginBottom: 5 }}>{exp.company}</div>
                <p style={{ fontSize: 14, color: '#1f2937', lineHeight: 1.6, margin: 0 }}>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <SectionHeader title="Significant Projects" />
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>
                    {proj.name} {proj.link && <a href={proj.link} style={{ fontSize: 12.5, color: RUBY_LIGHT, textDecoration: 'none' }}>↗</a>}
                  </div>
                  {proj.techStack && <div style={{ fontSize: 13.5, color: RUBY_LIGHT, fontStyle: 'italic' }}>{proj.techStack}</div>}
                </div>
                <p style={{ fontSize: 14, color: '#1f2937', lineHeight: 1.5, margin: 0 }}>{proj.description}</p>
              </div>
            ))}
          </div>
        )}

        {(certifications.length > 0 || languages.length > 0) && (
          <div>
            <SectionHeader title="Certifications & Languages" />
            <div style={{ display: 'flex', gap: 32 }}>
              {certifications.length > 0 && (
                <div style={{ flex: 1.2 }}>
                  {certifications.map((c, i) => (
                    <div key={i} style={{ marginBottom: 6, fontSize: 13.5, color: '#111827' }}>
                      <strong style={{ color: '#111827' }}>{c.name}</strong> — {c.issuer}
                    </div>
                  ))}
                </div>
              )}
              {languages.length > 0 && (
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 12px', fontSize: 13.5 }}>
                    {languages.map((l, i) => (
                      <span key={i} style={{ color: '#111827' }}>
                        <strong>{l.name}</strong> · {l.proficiency}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
