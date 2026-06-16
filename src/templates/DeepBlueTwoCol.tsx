import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function DeepBlueTwoCol({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;
  const NAVY = '#0f172a';
  const BLUE = '#1e40af';
  const BLUE_LIGHT = '#93c5fd';
  const TEAL = '#14b8a6';

  const initials = p.fullName
    ? p.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'JD';

  const RightSectionHeader = ({ title }: { title: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '22px 0 12px' }}>
      <span style={{ fontSize: 15, fontWeight: 800, color: NAVY, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{title}</span>
      <div style={{ flex: 1, height: 2, background: BLUE_LIGHT, opacity: 0.3 }} />
    </div>
  );

  const LeftSectionHeader = ({ title }: { title: string }) => (
    <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.15)', paddingBottom: 4, margin: '20px 0 10px' }}>
      <span style={{ fontSize: 13, fontWeight: 800, color: BLUE_LIGHT, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{title}</span>
    </div>
  );

  return (
    <div className="resume-template" style={{ width: 794, minHeight: 1123, fontFamily: '"Segoe UI", sans-serif', background: '#fff', boxSizing: 'border-box', display: 'flex' }}>
      {/* Left Sidebar */}
      <div style={{ width: '38%', background: NAVY, color: '#f8fafc', padding: '36px 22px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        {/* Logo area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ width: 50, height: 50, borderRadius: 8, background: BLUE, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800 }}>
            {initials}
          </div>
          <div>
            <h1 style={{ fontSize: 17, fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.2 }}>{p.fullName || 'YOUR NAME'}</h1>
            <p style={{ fontSize: 14, color: BLUE_LIGHT, margin: '2px 0 0 0', fontWeight: 600 }}>{p.jobTitle || 'Professional Title'}</p>
          </div>
        </div>

        {/* Contact */}
        <LeftSectionHeader title="Contact Info" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13.5, color: '#cbd5e1', wordBreak: 'break-all' }}>
          {p.email && <div>▪ {p.email}</div>}
          {p.phone && <div>▪ {p.phone}</div>}
          {p.address && <div>▪ {p.address}</div>}
          {p.linkedIn && <div>▪ {p.linkedIn}</div>}
          {p.github && <div>▪ {p.github}</div>}
        </div>

        {/* Skills with bars */}
        {skills.length > 0 && (
          <>
            <LeftSectionHeader title="Expertise" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {skills.map((s, i) => {
                // Determine mock bar width based on index to show varying levels
                const barWidths = ['100%', '80%', '65%', '90%', '75%'];
                const width = barWidths[i % barWidths.length];
                return (
                  <div key={i}>
                    <div style={{ fontSize: 13.5, color: '#f1f5f9', marginBottom: 4, fontWeight: 500 }}>{s}</div>
                    <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                      <div style={{ width, height: '100%', background: TEAL, borderRadius: 2 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Education */}
        {education.length > 0 && (
          <>
            <LeftSectionHeader title="Education" />
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>{e.degree}</div>
                <div style={{ fontSize: 13, color: '#cbd5e1', marginTop: 1 }}>{e.college}</div>
                <div style={{ fontSize: 12.5, color: BLUE_LIGHT, marginTop: 1 }}>{e.year}{e.grade && ` · ${e.grade}`}</div>
              </div>
            ))}
          </>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <>
            <LeftSectionHeader title="Languages" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 13.5, color: '#cbd5e1' }}>
              {languages.map((l, i) => (
                <div key={i}>
                  <strong style={{ color: '#fff' }}>{l.name}</strong> · <span style={{ color: BLUE_LIGHT }}>{l.proficiency}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Right Main Panel */}
      <div style={{ flex: 1, background: '#f8fafc', padding: '36px 28px 30px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        {summary && (
          <div style={{ position: 'relative', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '16px 20px', marginBottom: 10 }}>
            {/* Quote Mark Decoration */}
            <span style={{ position: 'absolute', top: 4, left: 8, fontSize: 28, color: BLUE_LIGHT, opacity: 0.3, fontFamily: 'Georgia, serif', lineHeight: 1 }}>“</span>
            <p style={{ fontSize: 14.5, color: '#334155', lineHeight: 1.7, margin: 0, textAlign: 'justify', textIndent: 12 }}>{summary}</p>
          </div>
        )}

        {workExperience.length > 0 && (
          <div>
            <RightSectionHeader title="Professional Experience" />
            {workExperience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 16, background: '#fff', border: '1px solid #e2e8f0', borderLeft: `3px solid ${BLUE}`, borderRadius: '0 6px 6px 0', padding: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 3 }}>
                  <div style={{ fontWeight: 800, fontSize: 15, color: NAVY }}>{exp.role}</div>
                  <div style={{ fontSize: 13, color: '#334155', fontWeight: 600 }}>
                    {exp.startDate}{(exp.startDate && (exp.current || exp.endDate)) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <div style={{ fontSize: 14, color: BLUE, fontWeight: 700, marginBottom: 6 }}>{exp.company}</div>
                <p style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.6, margin: 0 }}>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <RightSectionHeader title="Key Projects" />
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: NAVY }}>
                    {proj.name} {proj.link && <a href={proj.link} style={{ fontSize: 12.5, color: BLUE, textDecoration: 'none' }}>↗</a>}
                  </div>
                  {proj.techStack && <div style={{ fontSize: 13.5, color: TEAL, fontStyle: 'italic' }}>{proj.techStack}</div>}
                </div>
                <p style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.5, margin: 0 }}>{proj.description}</p>
              </div>
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <RightSectionHeader title="Certifications" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {certifications.map((c, i) => (
                <div key={i} style={{ fontSize: 13.5, color: '#334155', background: '#fff', border: '1px solid #e2e8f0', padding: '6px 10px', borderRadius: 4 }}>
                  <div style={{ fontWeight: 700, color: NAVY }}>{c.name}</div>
                  <div style={{ color: '#334155', fontSize: 12.5 }}>{c.issuer} {c.year && `· ${c.year}`}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
