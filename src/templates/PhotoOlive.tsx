import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function PhotoOlive({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;
  const OLIVE = '#365314';
  const LIME = '#bef264';
  const OLIVE_LIGHT = '#d9f99d';
  const TEXT_DARK = '#111827';

  const SectionHeader = ({ title }: { title: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '22px 0 12px' }}>
      <span style={{ fontSize: 15, fontWeight: 800, color: OLIVE, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{title}</span>
      <div style={{ flex: 1, height: 1.5, background: '#ecfccb' }} />
    </div>
  );

  const SidebarHeader = ({ title }: { title: string }) => (
    <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.25)', paddingBottom: 4, margin: '20px 0 10px' }}>
      <span style={{ fontSize: 13.5, fontWeight: 700, color: OLIVE_LIGHT, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{title}</span>
    </div>
  );

  return (
    <div className="resume-template" style={{ width: 794, minHeight: 1123, fontFamily: '"Segoe UI", sans-serif', background: '#fff', boxSizing: 'border-box', display: 'flex' }}>
      {/* Left Sidebar */}
      <div style={{ width: '35%', background: OLIVE, color: '#fff', padding: '36px 20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        {/* Photo Container */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <div style={{ width: 125, height: 125, borderRadius: '50%', border: `3px solid ${LIME}`, overflow: 'hidden', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.15)' }}>
            {p.profilePhoto ? (
              <img src={p.profilePhoto} alt={p.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontSize: 52 }}>👤</span>
            )}
          </div>
        </div>

        {/* Name and Job Title */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: 0 }}>{p.fullName || 'YOUR NAME'}</h2>
          <p style={{ fontSize: 15, color: OLIVE_LIGHT, fontWeight: 600, margin: '4px 0 0 0', textTransform: 'uppercase', letterSpacing: 0.5 }}>{p.jobTitle || 'Professional Title'}</p>
        </div>

        {/* Contact info */}
        <SidebarHeader title="Contact Info" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13.5, color: '#ecfccb', wordBreak: 'break-all' }}>
          {p.email && <div>✉ {p.email}</div>}
          {p.phone && <div>📞 {p.phone}</div>}
          {p.address && <div>📍 {p.address}</div>}
          {p.linkedIn && <div>🔗 {p.linkedIn}</div>}
          {p.github && <div>💻 {p.github}</div>}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <>
            <SidebarHeader title="Skills & Tools" />
            <ul style={{ margin: 0, paddingLeft: 12, fontSize: 13.5, color: '#ecfccb', lineHeight: 1.6 }}>
              {skills.map((s, i) => (
                <li key={i} style={{ marginBottom: 4 }}>{s}</li>
              ))}
            </ul>
          </>
        )}

        {/* Education */}
        {education.length > 0 && (
          <>
            <SidebarHeader title="Education" />
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>{e.degree}</div>
                <div style={{ fontSize: 13, color: '#ecfccb', marginTop: 1 }}>{e.college}</div>
                <div style={{ fontSize: 12.5, color: 'rgba(255, 255, 255, 0.7)', marginTop: 1 }}>{e.year}{e.grade && ` · ${e.grade}`}</div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Right Main Panel */}
      <div style={{ flex: 1, padding: '40px 32px 30px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        {summary && (
          <div>
            <SectionHeader title="Summary" />
            <p style={{ fontSize: 14.5, color: TEXT_DARK, lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>{summary}</p>
          </div>
        )}

        {workExperience.length > 0 && (
          <div>
            <SectionHeader title="Experience" />
            {workExperience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 16, borderLeft: `3px solid ${OLIVE}`, paddingLeft: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>{exp.role}</div>
                  <div style={{ fontSize: 13.5, color: '#111827', fontWeight: 600 }}>
                    {exp.startDate}{(exp.startDate && (exp.current || exp.endDate)) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <div style={{ fontSize: 14.5, color: '#4d7c0f', fontWeight: 600, fontStyle: 'italic', marginBottom: 5 }}>{exp.company}</div>
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
                    {proj.name} {proj.link && <a href={proj.link} style={{ fontSize: 12.5, color: '#4d7c0f', textDecoration: 'none' }}>↗</a>}
                  </div>
                  {proj.techStack && <div style={{ fontSize: 13.5, color: '#4d7c0f', fontStyle: 'italic' }}>{proj.techStack}</div>}
                </div>
                <p style={{ fontSize: 14, color: '#1f2937', lineHeight: 1.5, margin: 0 }}>{proj.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Certifications & Languages */}
        <div style={{ display: 'flex', gap: 32, marginTop: 10 }}>
          {certifications.length > 0 && (
            <div style={{ flex: 1.2 }}>
              <SectionHeader title="Certifications" />
              {certifications.map((c, i) => (
                <div key={i} style={{ fontSize: 13.5, color: TEXT_DARK }}>
                  <div style={{ fontWeight: 600, color: OLIVE }}>{c.name}</div>
                  <div style={{ color: '#111827', fontSize: 12.5 }}>{c.issuer} {c.year && `· ${c.year}`}</div>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ flex: 1 }}>
              <SectionHeader title="Languages" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 13.5, color: TEXT_DARK }}>
                {languages.map((l, i) => (
                  <div key={i}>
                    <strong style={{ color: OLIVE }}>{l.name}</strong> · <span style={{ color: '#111827' }}>{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
