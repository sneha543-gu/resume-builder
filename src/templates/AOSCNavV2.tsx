import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function AOSCNavV2({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, languages } = data;

  const NAVY    = '#1a2051';
  const BEIGE   = '#ece8e1';
  const TXT     = '#1c2b4a';
  const TXT2    = '#5c6478';
  const DIVIDER = '#a0aec0';

  const SidebarHeading = ({ title }: { title: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, marginTop: 4 }}>
      <span style={{ fontSize: 12.5, fontWeight: 900, color: TXT, whiteSpace: 'nowrap', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
        {title}
      </span>
      <div style={{ flex: 1, height: 1.5, background: DIVIDER }} />
    </div>
  );

  const MainHeading = ({ title }: { title: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
      <span style={{ fontSize: 12.5, fontWeight: 900, color: TXT, whiteSpace: 'nowrap', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
        {title}
      </span>
      <div style={{ flex: 1, height: 1.5, background: '#e5e7eb' }} />
    </div>
  );

  return (
    <div
      className="resume-template tpl-aosc-nav-v2"
      style={{
        display: 'flex',
        flexDirection: 'row',
        background: 'white',
        fontFamily: '"Segoe UI", Arial, sans-serif',
        minHeight: '1123px',
        width: '794px',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >

      {/* ══════════════════════════════════════════
          LEFT SIDEBAR — cream background
      ══════════════════════════════════════════ */}
      <div style={{
        width: '37%',
        background: BEIGE,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        padding: '0 0 36px 0',
      }}>

        {/* Profile Photo Block */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '36px 24px 24px',
        }}>
          <div style={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '5px solid white',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            background: '#c7ccd6',
            flexShrink: 0,
          }}>
            {p.profilePhoto ? (
              <img
                src={p.profilePhoto}
                alt="profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{
                width: '100%', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 64,
              }}>👤</div>
            )}
          </div>
        </div>

        {/* Sidebar Content */}
        <div style={{ padding: '0 22px 0 30px', display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* EDUCATION */}
          <div>
            <SidebarHeading title="Education" />
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 11, color: TXT2, margin: '0 0 2px 0' }}>{edu.year}</p>
                <p style={{ fontSize: 11.5, fontWeight: 800, color: TXT, margin: '0 0 3px 0', textTransform: 'uppercase', lineHeight: 1.3 }}>{edu.college}</p>
                <p style={{ fontSize: 11, color: '#374151', margin: 0 }}>• {edu.degree}</p>
              </div>
            ))}
          </div>

          {/* TECHNICAL SKILLS */}
          <div>
            <SidebarHeading title="Technical Skills" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {skills.map((skill, i) => {
                const colon = skill.indexOf(':');
                const bold  = colon > -1 ? skill.slice(0, colon) : skill;
                const rest  = colon > -1 ? skill.slice(colon + 1) : '';
                return (
                  <p key={i} style={{ fontSize: 11, lineHeight: 1.55, color: '#374151', margin: 0 }}>
                    <strong>• {bold}{colon > -1 ? ':' : ''}</strong>{rest}
                  </p>
                );
              })}
            </div>
          </div>

          {/* SOFT SKILLS */}
          <div>
            <SidebarHeading title="Soft Skills" />
            <p style={{ fontSize: 11, color: '#374151', lineHeight: 1.8, margin: 0 }}>
              {languages.map(l => l.name).join(', ')}
            </p>
          </div>

          {/* PROFESSIONAL EXPERIENCE */}
          <div>
            <SidebarHeading title="Professional Experience" />
            {workExperience.map((exp, i) => (
              <div key={i} style={{ borderLeft: '2px solid #94a3b8', paddingLeft: 12, marginBottom: 14 }}>
                <p style={{ fontSize: 11.5, fontWeight: 700, color: TXT, margin: '0 0 2px 0' }}>{exp.role}</p>
                <p style={{ fontSize: 11, color: TXT2, margin: '0 0 2px 0' }}>{exp.company}</p>
                <p style={{ fontSize: 10.5, color: '#94a3b8', margin: 0 }}>
                  {exp.startDate}{(exp.startDate && (exp.current || exp.endDate)) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════
          RIGHT COLUMN — dark header + white body
      ══════════════════════════════════════════ */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'white' }}>

        {/* Dark Navy Header */}
        <div style={{
          background: NAVY,
          padding: '36px 40px 30px 36px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          minHeight: 260,
          justifyContent: 'center',
        }}>
          {/* AOSC Logo */}
          <div style={{ marginBottom: 18, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ height: '68px', overflow: 'hidden', marginBottom: '4px' }}>
              <img
                src="/logo1.png"
                alt="AOSC Logo"
                style={{ width: '120px', height: 'auto', display: 'block' }}
              />
            </div>
            <div style={{ color: 'white', fontWeight: 900, fontSize: 20, letterSpacing: 4, lineHeight: 1 }}>aosc</div>
            <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 8.5, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>technologies</div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 7, letterSpacing: 1, marginTop: 2 }}>INITIATE | INCUBATE | INNOVATE</div>
          </div>

          {/* Name */}
          <h1 style={{
            color: 'white',
            fontSize: 38,
            fontWeight: 900,
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: 2,
            lineHeight: 1,
          }}>
            {p.fullName || 'YOUR NAME'}
          </h1>

          {/* Job title */}
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, margin: '8px 0 0 0', fontWeight: 400, letterSpacing: 0.5 }}>
            {p.jobTitle || 'Job Title'}
          </p>
        </div>

        {/* White Body Content */}
        <div style={{
          flex: 1,
          boxSizing: 'border-box',
          padding: '32px 38px 36px 30px',
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
        }}>

          {/* PROFESSIONAL SUMMARY */}
          <div>
            <MainHeading title="Professional Summary" />
            <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.85, textAlign: 'justify', margin: 0 }}>
              {summary}
            </p>
          </div>

          {/* PROJECTS */}
          <div>
            <MainHeading title="Projects" />
            <div style={{ position: 'relative', paddingLeft: 6 }}>
              <div style={{
                position: 'absolute',
                left: 10,
                top: 10,
                bottom: 10,
                width: 1.5,
                background: '#cbd5e1',
              }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                {projects.map((proj, i) => (
                  <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      background: 'white',
                      border: `3px solid ${NAVY}`,
                      flexShrink: 0,
                      zIndex: 1,
                      marginTop: 3,
                      boxSizing: 'border-box',
                    }} />
                    <p style={{ fontSize: 12, lineHeight: 1.75, color: '#334155', margin: 0 }}>
                      <strong style={{ color: TXT }}>{proj.name}:</strong> {proj.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
