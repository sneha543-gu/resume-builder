import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

/**
 * AOSC Portfolio — Sohit Style (Power Platform Premium Multi‑Page)
 * Matches the exact layout, colors, and structure of Sohit_Harchand_Portfolio (1).docx:
 * - Header Table (T0): Left cell navy (#1B2A4A) with name, title, and highlight stats row. 
 *   Right cell darker navy (#162038) with 6 emoji-highlight stats.
 * - Section Headings: Capitalized navy (#1B2A4A) text with a solid under-line border.
 * - About Me & Quick Info: 2-column layout (62% and 38% widths).
 * - Technical Arsenal Table (T5): Left cell alternating (#DBEAFE / #F1F5F9) categories and white skill items on the right.
 * - Enterprise Projects Table (T7-T19): Projects rendered in cards with #F8FAFF background, #DBEAFE borders, and bottom technology tag lists.
 * - Why Choose Me Table (T22): Grid cards with alternating soft colors (#DBEAFE / #F1F5F9) and an empty dashed card slot at the end.
 * - Footer: Center summary line (#3B5280) and copyright bar with AOSC logo.
 */
export default function AOSCPortfolioSohit({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, languages } = data;

  // Colors aligned with Sohit's docx style
  const NAVY = '#1B2A4A';       // Navy header & title color
  const DARK_NAVY = '#162038';  // Darker navy for header list
  const BLUE = '#0078D4';       // Highlighting blue
  const CYAN = '#00BCF2';       // Light blue text color
  const GREY = '#475569';       // Muted slate gray
  const TEXT = '#0D2137';       // Dark body text
  const BG_LIGHT_BLUE = '#DBEAFE'; // Light blue for shading
  const BG_LIGHT_GRAY = '#F1F5F9'; // Light gray for shading
  const BG_CARD = '#F8FAFF';    // Soft blue-white for cards
  const BORDER_CARD = '#DBEAFE'; // Card borders
  const WHITE = '#FFFFFF';
  const DOT_COLOR = '#B8D4E8';

  // Calculate experience years dynamically
  let yearsExp = 3;
  if (workExperience && workExperience.length > 0) {
    const calculated = workExperience.reduce((acc, exp) => {
      if (!exp.startDate) return acc;
      const start = new Date(exp.startDate).getFullYear();
      const end = exp.current ? new Date().getFullYear() : (exp.endDate ? new Date(exp.endDate).getFullYear() : start);
      if (!isNaN(start) && !isNaN(end)) acc += (end - start);
      return acc;
    }, 0);
    yearsExp = calculated > 0 ? calculated : workExperience.length * 2;
  }

  // Highlights in the right cell of the header table
  const headerHighlights = [
    { emoji: '🏢', text: `${yearsExp}+ Years Power Platform` },
    { emoji: '🔷', text: 'Dynamics 365 CRM · Sales' },
    { emoji: '🤖', text: 'Copilot Studio · AI Builder' },
    { emoji: '⚙️', text: 'Power Automate Expert' },
    { emoji: '📊', text: 'Power BI · Dataverse' },
    { emoji: '🌐', text: 'Healthcare · NDIS · HR · Ed-Tech' },
  ];

  // Helper to bold and color-code keywords in descriptions
  const highlightText = (text: string) => {
    if (!text) return '';
    const keywords = [
      'Dynamics 365 Sales \\(CRM\\)',
      'Dynamics 365 Sales custom entities and views',
      'Dynamics 365 Sales',
      'Dynamics 365 CRM record notes',
      'Dynamics 365 CRM incident records',
      'Dynamics 365 CRM',
      'Dynamics 365 custom modules',
      'Dynamics 365',
      'D365 CRM dashboards',
      'D365 CRM incident cases',
      'D365 CRM',
      'D365 Sales',
      'D365 REST API',
      'D365',
      'Power Automate flows',
      'Power Automate workflows',
      'Power Automate',
      'Power Apps',
      'Power BI dashboards embedded inside Dynamics 365 Sales',
      'Power BI dashboards',
      'Power BI reports',
      'Power BI visualisations embedded in Fabric',
      'Power BI Embedded',
      'Power BI',
      'Microsoft Fabric Lakehouse',
      'Microsoft Fabric Notebooks',
      'Microsoft Fabric',
      'Dataverse connectors',
      'Dataverse APIs',
      'Dataverse-backed data models',
      'Dataverse',
      'Azure OpenAI',
      'Copilot for Dynamics 365',
      'Copilot',
      'SharePoint with Dynamics 365 CRM',
      'SharePoint',
      'Fabric Lakehouse',
      'Fabric Pipelines',
      'Fabric Notebooks',
      'Fabric Pipelines',
      'Fabric',
      'PySpark'
    ];
    
    const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);
    const pattern = new RegExp(`\\b(${sortedKeywords.join('|')})\\b`, 'gi');
    
    const parts = text.split(pattern);
    return parts.map((part, idx) => {
      const isKeyword = sortedKeywords.some(kw => new RegExp(`^${kw.replace(/\\/g, '')}$`, 'i').test(part));
      if (isKeyword) {
        return <strong key={idx} style={{ color: BLUE, fontWeight: 800 }}>{part}</strong>;
      }
      return part;
    });
  };

  const SectionHeading = ({ icon, title }: { icon: string; title: string }) => (
    <div style={{
      borderBottom: `2.5px solid ${NAVY}`,
      paddingBottom: '4px',
      marginTop: '22px',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }}>
      <span style={{ fontSize: '13px' }}>{icon}</span>
      <span style={{
        fontSize: '12px',
        fontWeight: 900,
        color: NAVY,
        letterSpacing: '0.04em',
        textTransform: 'uppercase'
      }}>{title}</span>
    </div>
  );

  return (
    <div className="resume-template tpl-aosc-portfolio-sohit" style={{
      background: WHITE,
      fontFamily: 'Arial, Helvetica, sans-serif',
      minHeight: '1123px',
      width: '794px',
      boxSizing: 'border-box',
      padding: '40px 50px 60px',
      color: TEXT,
      position: 'relative'
    }}>
      {/* ── HEADER TABLE (Split Navy blocks) ── */}
      <div style={{
        display: 'flex',
        borderRadius: '3px',
        overflow: 'hidden',
        marginBottom: '16px',
        width: '100%'
      }}>
        {/* Left Cell: Name, Title, and Stats Row */}
        <div style={{
          flex: 1.6,
          background: NAVY,
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          boxSizing: 'border-box'
        }}>
          <h1 style={{
            color: WHITE,
            fontSize: '25px',
            fontWeight: 900,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            margin: 0,
            lineHeight: 1.1
          }}>{p.fullName || 'SOHIT HARCHAND'}</h1>
          <p style={{
            color: CYAN,
            fontSize: '12.5px',
            margin: '5px 0 0 0',
            fontWeight: 700,
            letterSpacing: '0.02em',
            textTransform: 'uppercase'
          }}>{p.jobTitle || 'Microsoft Power Platform & Dynamics 365 CRM Developer'}</p>
          <div style={{
            color: WHITE,
            fontSize: '9.5px',
            fontWeight: 700,
            margin: '12px 0 0 0',
            letterSpacing: '0.02em',
            opacity: 0.9,
            lineHeight: 1.3
          }}>
            {yearsExp}+ Years Power Platform  ·  D365 CRM · Sales · Copilot  ·  {workExperience.length > 0 ? workExperience.length : 10}+ Enterprise Solutions
          </div>
        </div>

        {/* Right Cell: Key Highlights list */}
        <div style={{
          flex: 1,
          background: DARK_NAVY,
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '5px',
          boxSizing: 'border-box'
        }}>
          {headerHighlights.map((hl, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: WHITE,
              fontSize: '9.5px',
              fontWeight: 700,
              lineHeight: 1.3
            }}>
              <span style={{ fontSize: '10px' }}>{hl.emoji}</span>
              <span>{hl.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ME & QUICK INFO ── */}
      <SectionHeading icon="👤" title="About Me" />
      <div style={{ display: 'flex', gap: 24, marginBottom: '10px' }}>
        {/* About Me Column */}
        <div style={{ flex: 1.6, display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontSize: '10px', lineHeight: 1.6, color: GREY, margin: 0, textAlign: 'justify' }}>
            {summary || 'Microsoft Power Platform and Dynamics 365 CRM Developer with hands-on experience delivering enterprise business applications, intelligent workflow automation, AI-powered Copilot solutions, and CRM-driven digital transformation projects across multiple industries.'}
          </p>
        </div>

        {/* Quick Info Column */}
        <div style={{ flex: 1, borderLeft: `1.5px solid ${BG_LIGHT_BLUE}`, paddingLeft: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: '10px', color: TEXT, lineHeight: 1.5 }}>
            {p.address && <div>📍 <strong>Address:</strong> {p.address}</div>}
            {education.length > 0 && (
              <div>
                🎓 <strong>Education:</strong> {education[0].degree}
                <div style={{ fontSize: '8.5px', color: GREY, marginLeft: 16 }}>{education[0].college}</div>
              </div>
            )}
            <div>🏢 <strong>Experience:</strong> {yearsExp}+ Years Microsoft Ecosystem</div>
            <div>💼 <strong>Employment:</strong> Full‑Time · Remote</div>
            {languages.length > 0 && (
              <div>🌐 <strong>Domains/Languages:</strong> {languages.map(l => l.name).join(' · ')}</div>
            )}
            {p.phone && <div>☎ <strong>Phone:</strong> {p.phone}</div>}
            {p.email && <div style={{ wordBreak: 'break-all' }}>✉ <strong>Email:</strong> {p.email}</div>}
          </div>
        </div>
      </div>

      {/* ── TECHNICAL ARSENAL ── */}
      {skills.length > 0 && (
        <div>
          <SectionHeading icon="⚡" title="Technology Expertise" />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            border: `1px solid ${BORDER_CARD}`,
            borderRadius: '4px',
            overflow: 'hidden',
            marginTop: '8px'
          }}>
            {skills.map((skill, i) => {
              const colon = skill.indexOf(':');
              const category = colon > -1 ? skill.slice(0, colon).trim() : 'Skill Set';
              const items = colon > -1 ? skill.slice(colon + 1).trim() : skill;
              const formatted = items.split(',').map(it => it.trim()).join('  ·  ');
              const isEven = i % 2 === 1;

              return (
                <div key={i} style={{ display: 'flex', borderBottom: i < skills.length - 1 ? `1px solid ${BORDER_CARD}` : 'none' }}>
                  {/* Left Cell: Category shading */}
                  <div style={{
                    width: '28%',
                    background: isEven ? BG_LIGHT_GRAY : BG_LIGHT_BLUE,
                    padding: '6px 10px',
                    fontSize: '9.5px',
                    fontWeight: 900,
                    color: NAVY,
                    display: 'flex',
                    alignItems: 'center',
                    boxSizing: 'border-box'
                  }}>
                    {category}
                  </div>
                  {/* Right Cell: Skill values */}
                  <div style={{
                    flex: 1,
                    background: WHITE,
                    padding: '6px 12px',
                    fontSize: '9.5px',
                    color: TEXT,
                    lineHeight: 1.4,
                    display: 'flex',
                    alignItems: 'center',
                    boxSizing: 'border-box'
                  }}>
                    {formatted}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── WORK EXPERIENCE (Project Details) ── */}
      {workExperience.length > 0 && (
        <div>
          <SectionHeading icon="🚀" title="Enterprise Projects — Delivered Solutions" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: '8px' }}>
            {workExperience.map((exp, i) => {
              const companyParts = exp.company.replace(/[^\w\s\&]/g, '').trim().split(/\s+/);
              const tagList = [
                companyParts[companyParts.length - 1] || 'Enterprise',
                'Power Platform',
                'Dataverse'
              ];

              return (
                <div key={i} style={{
                  background: BG_CARD,
                  border: `1px solid ${BORDER_CARD}`,
                  borderRadius: '4px',
                  padding: '12px 14px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {/* Project Title */}
                  <div style={{ fontSize: '11px', fontWeight: 800, color: NAVY, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>{exp.company}</span>
                  </div>

                  {/* Project Description Header / Subtitle */}
                  <div style={{ fontSize: '9.5px', fontWeight: 700, color: GREY, margin: '3px 0 6px 0', lineHeight: 1.3 }}>
                    {exp.role}  ·  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </div>

                  {/* Bullet points description */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {exp.description && exp.description.split('\n').filter(Boolean).map((line, li) => (
                      <div key={li} style={{
                        fontSize: '9.5px',
                        color: TEXT,
                        lineHeight: 1.45,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '5px',
                        textAlign: 'justify'
                      }}>
                        <span style={{ color: BLUE, fontWeight: 900, flexShrink: 0 }}>•</span>
                        <span>{highlightText(line.replace(/^[-•]\s*/, ''))}</span>
                      </div>
                    ))}
                  </div>

                  {/* Skills tags separator */}
                  <div style={{
                    marginTop: '8px',
                    paddingTop: '6px',
                    borderTop: `1px solid ${BORDER_CARD}`,
                    fontSize: '9px',
                    fontWeight: 800,
                    color: BLUE,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px'
                  }}>
                    {tagList.map((tag, ti) => (
                      <span key={ti}>
                        {tag}
                        {ti < tagList.length - 1 && (
                          <span style={{ color: DOT_COLOR, marginLeft: 6, marginRight: 6 }}>·</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── WHY CHOOSE ME GRID ── */}
      <div>
        <SectionHeading icon="🎯" title="Power Platform & Dynamics 365 CRM — Why Choose Me" />
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          columnGap: 14,
          rowGap: 10,
          marginTop: '8px'
        }}>
          {[
            { 
              num: '01', 
              title: 'D365 CRM & Business Process Flows', 
              desc: 'Built production Business Process Flows in Dynamics 365 CRM across sales, healthcare, and HR projects — enforcing structured workflows and compliance directly within the CRM interface.',
              bg: BG_LIGHT_BLUE,
              border: '#B8D4FF'
            },
            { 
              num: '02', 
              title: 'Power Automate Wait & Approval Expert', 
              desc: 'Designed complex Power Automate flows with Wait conditions and multi-level Approval gates across 5+ projects — including flows triggered directly from D365 CRM record events.',
              bg: BG_LIGHT_GRAY,
              border: '#E2E8F0'
            },
            { 
              num: '03', 
              title: 'Copilot Studio & AI Automation', 
              desc: 'Delivered enterprise Copilot Agents with Azure OpenAI, AI Builder, and knowledge-base integrations — a rare combination that very few Power Platform profiles currently offer.',
              bg: BG_LIGHT_GRAY,
              border: '#E2E8F0'
            },
            { 
              num: '04', 
              title: 'Full Power Platform Stack', 
              desc: 'End-to-end expertise across Power Apps, Power Automate, Power Pages, Power BI, Dataverse, and SharePoint — enabling complete solution delivery without external dependencies.',
              bg: BG_LIGHT_BLUE,
              border: '#B8D4FF'
            },
            { 
              num: '05', 
              title: 'Healthcare & NDIS Domain Experience', 
              desc: 'Deep hands-on experience in healthcare operations and NDIS workforce management — delivering compliant, regulation-aware solutions in sensitive enterprise environments.',
              bg: BG_LIGHT_BLUE,
              border: '#B8D4FF'
            },
            { 
              num: '', 
              title: '', 
              desc: '',
              bg: 'transparent',
              border: '#E2E8F0',
              dashed: true
            }
          ].map((box, bi) => (
            <div key={bi} style={{
              background: box.bg,
              border: box.dashed ? `1px dashed ${box.border}` : `1px solid ${box.border}`,
              borderRadius: '4px',
              padding: '8px 12px',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
              minHeight: '66px',
              justifyContent: box.dashed ? 'center' : 'flex-start'
            }}>
              {!box.dashed && (
                <>
                  <span style={{ fontSize: '10px', fontWeight: 900, color: NAVY, marginBottom: '3px' }}>
                    {box.num}  {box.title}
                  </span>
                  <span style={{ fontSize: '9px', color: GREY, lineHeight: 1.35, textAlign: 'justify' }}>
                    {box.desc}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Summary Slogan */}
      <div style={{
        fontSize: '10px',
        color: '#3B5280',
        fontWeight: '800',
        fontStyle: 'italic',
        marginTop: '18px',
        textAlign: 'center',
        lineHeight: 1.4
      }}>
        End-to-end Microsoft Power Platform and Dynamics 365 CRM solutions delivering measurable business value across enterprise clients in diverse industries.
      </div>

      {/* ── FOOTER ── */}
      <div style={{
        position: 'absolute',
        bottom: 15,
        left: 50,
        right: 50,
        borderTop: '1px solid #d1d5db',
        paddingTop: 6,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: WHITE
      }}>
        <span style={{ fontSize: '7.5px', color: '#9ca3af', letterSpacing: '0.06em' }}>
          © 2026 {p.fullName || 'SOHIT HARCHAND'} · {p.jobTitle || 'Microsoft Power Platform & Dynamics 365 CRM Developer'} · Amritsar, Punjab, India
        </span>
        <img src="/logo1.png" alt="AOSC" style={{ height: 14, opacity: 0.45 }} />
      </div>
    </div>
  );
}
