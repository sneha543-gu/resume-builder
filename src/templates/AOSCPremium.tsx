import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function AOSCPremium({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, languages } = data;

  // ── Exact colors from screenshot ──
  const NAVY      = '#344a7a';   // further lightened navy header for maximum logo visibility
  const BEIGE     = '#ece8e1';   // warm cream sidebar + profile border
  const TXT       = '#1c2b4a';   // main text colour
  const TXT2      = '#5c6478';   // secondary text
  const DIVIDER   = '#a0aec0';   // horizontal rule colour

  // Section heading with horizontal rule – used in sidebar
  const SidebarHeading = ({ title }: { title: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
      <span style={{ fontSize: 13, fontWeight: 900, color: TXT, whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>
        {title}
      </span>
      <div style={{ flex: 1, height: 1.5, background: DIVIDER }} />
    </div>
  );

  // Section heading with horizontal rule – used in main column
  const MainHeading = ({ title }: { title: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
      <span style={{ fontSize: 13, fontWeight: 900, color: TXT, whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>
        {title}
      </span>
      <div style={{ flex: 1, height: 1.5, background: '#e5e7eb' }} />
    </div>
  );

  return (
    <div
      className="resume-template tpl-aosc-premium"
      style={{
        display: 'flex',
        flexDirection: 'column',
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
          1.  FULL‑WIDTH DARK NAVY HEADER
      ══════════════════════════════════════════ */}
      <div style={{
        width: '100%',
        height: 280, // Increased height to prevent clipping
        background: NAVY,
        flexShrink: 0,
        display: 'flex',
        justifyContent: 'flex-end',
        boxSizing: 'border-box',
        paddingRight: 52,
        paddingTop: 40, // Slightly less top padding
      }}>
        {/* right‑aligned name block */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 440 }}>

          {/* AOSC Logo - Icon from image + White HTML Text (Stacked Vertically) */}
          <div style={{ marginBottom: 15, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ height: '75px', overflow: 'hidden', marginBottom: '5px' }}>
              <img 
                src="/logo1.png" 
                alt="AOSC Logo" 
                style={{ width: '130px', height: 'auto', display: 'block' }} 
              />
            </div>
            <div style={{ color: 'white', fontWeight: 900, fontSize: 22, letterSpacing: 4, lineHeight: 1 }}>aosc</div>
            <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>technologies</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 7, letterSpacing: 1, marginTop: 2 }}>INITIATE | INCUBATE | INNOVATE</div>
          </div>

          {/* Name */}
          <h1 style={{
            color: 'white',
            fontSize: 42,
            fontWeight: 900,
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: 2,
            lineHeight: 1,
          }}>
            {p.fullName || 'NAVREET KAUR'}
          </h1>

          {/* Job title */}
          <p style={{ color: '#ffffff', fontSize: 20, margin: '8px 0 0 0', fontWeight: 400, letterSpacing: 0.5 }}>
            {p.jobTitle || 'Data Engineer'}
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          2.  BODY — sidebar + main
      ══════════════════════════════════════════ */}
      <div style={{ display: 'flex', flex: 1 }}>

        {/* ─── LEFT SIDEBAR (warm cream) ─── */}
        <div style={{
          width: '37%',
          background: BEIGE,
          boxSizing: 'border-box',
          /* top padding makes room for the floating profile photo */
          padding: '128px 24px 36px 38px',
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
        }}>

          {/* EDUCATION */}
          <div>
            <SidebarHeading title="EDUCATION" />
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 18 }}>
                <p style={{ fontSize: 12, color: TXT2, margin: '0 0 2px 0' }}>{edu.year}</p>
                <p style={{ fontSize: 12, fontWeight: 800, color: TXT, margin: '0 0 3px 0', textTransform: 'uppercase', lineHeight: 1.3 }}>{edu.college}</p>
                <p style={{ fontSize: 11.5, color: '#374151', margin: 0 }}>• {edu.degree}</p>
              </div>
            ))}
          </div>

          {/* TECHNICAL SKILLS */}
          <div>
            <SidebarHeading title="TECHNICAL SKILLS" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {skills.map((skill, i) => {
                const colon = skill.indexOf(':');
                const bold  = colon > -1 ? skill.slice(0, colon) : skill;
                const rest  = colon > -1 ? skill.slice(colon + 1) : '';
                return (
                  <p key={i} style={{ fontSize: 11.5, lineHeight: 1.55, color: '#374151', margin: 0 }}>
                    <strong>• {bold}{colon > -1 ? ':' : ''}</strong>{rest}
                  </p>
                );
              })}
            </div>
          </div>

          {/* SOFT SKILLS */}
          <div>
            <SidebarHeading title="SOFT SKILLS" />
            <p style={{ fontSize: 11.5, color: '#374151', lineHeight: 1.75, margin: 0 }}>
              {languages.map(l => l.name).join(', ')}
            </p>
          </div>

          {/* PROFESSIONAL EXPERIENCE */}
          <div>
            <SidebarHeading title="PROFESSIONAL EXPERIENCE" />
            {workExperience.map((exp, i) => (
              <div key={i} style={{ borderLeft: '2px solid #94a3b8', paddingLeft: 12, marginBottom: 14 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: TXT, margin: '0 0 2px 0' }}>{exp.role}</p>
                <p style={{ fontSize: 11, color: TXT2, margin: '0 0 2px 0' }}>{exp.company}</p>
                <p style={{ fontSize: 10.5, color: '#94a3b8', margin: 0 }}>
                  {exp.startDate}{(exp.startDate && (exp.current || exp.endDate)) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── RIGHT MAIN COLUMN (white) ─── */}
        <div style={{
          flex: 1,
          boxSizing: 'border-box',
          padding: '38px 42px 36px 30px',
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
        }}>

          {/* PROFESSIONAL SUMMARY */}
          <div>
            <MainHeading title="PROFESSIONAL SUMMARY" />
            <p style={{ fontSize: 12.5, color: '#374151', lineHeight: 1.85, textAlign: 'justify', margin: 0 }}>
              {summary}
            </p>
          </div>

          {/* PROJECTS */}
          <div>
            <MainHeading title="PROJECTS" />
            <div style={{ position: 'relative', paddingLeft: 6 }}>
              {/* vertical connector line */}
              <div style={{
                position: 'absolute',
                left: 10,
                top: 10,
                bottom: 10,
                width: 1.5,
                background: '#cbd5e1',
              }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                {projects.map((proj, i) => (
                  <div key={i} style={{ display: 'flex', gap: 22, alignItems: 'flex-start' }}>
                    {/* circle marker */}
                    <div style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: 'white',
                      border: `3px solid ${NAVY}`,
                      flexShrink: 0,
                      zIndex: 1,
                      marginTop: 2,
                      boxSizing: 'border-box',
                    }} />
                    <p style={{ fontSize: 12.5, lineHeight: 1.75, color: '#334155', margin: 0 }}>
                      <strong style={{ color: TXT }}>{proj.name}:</strong> {proj.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          3.  FLOATING PROFILE PHOTO AREA
          — background ribbon logo
          — inner photo circle with dark navy border
      ══════════════════════════════════════════ */}
      <div style={{
        position: 'absolute',
        top: 100,
        left: 20,
        width: 240,
        height: 240,
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: BEIGE,
        borderRadius: '50%',
      }}>
        {/* Inner image circle with dark border */}
        <div style={{
          width: 140,
          height: 140,
          borderRadius: '50%',
          overflow: 'hidden',
          border: `4px solid ${NAVY}`,
          position: 'relative',
          zIndex: 2,
          background: 'white',
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
              background: '#c7ccd6', fontSize: 64,
            }}>
              👤
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
