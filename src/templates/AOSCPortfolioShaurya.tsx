import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

/**
 * AOSC Portfolio — Shaurya Style (D365 CRM Developer)
 * Replicates the exact layout, colors, and typography of Shaurya-Kakkar-Portfolio (1).docx:
 * - Header: Dark navy (#0A1929) banner spanning full-width with white name and cyan title.
 * - Stats Row: 4 alternating boxes (light blue #E6F2FB / white #FFFFFF) with blue values (#0078D4) and grey labels (#4A6F8A).
 * - Headings: Full-width corporate blue (#005A9E) banner bars with white bold text.
 * - About Me & Quick Info: 2-column layout (62% and 38% widths).
 * - Technical Arsenal: Table-like rows with category cells (#E6F2FB) on the left and white skills list cells on the right.
 * - Experience: Very light blue (#F2F7FB) project blocks, domain emojis with custom colors, bold blue key phrases (#0078D4) in description bullets, and bottom technical stack tags.
 * - Fit & Focus: 3x2 grid of numbered boxes (#F2F7FB).
 * - Font: Arial, sans-serif.
 */
export default function AOSCPortfolioShaurya({ data }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, languages } = data;

  const NAVY = '#0A1929';       // dark header background
  const BLUE = '#0078D4';       // corporate blue for values/highlights
  const BANNER = '#005A9E';     // section heading banner background
  const CYAN = '#00BCF2';       // light blue/cyan for subtitle and numbers
  const GREY = '#4A6F8A';       // greyish blue for secondary text/labels
  const TEXT = '#0D2137';       // dark body text
  const BG_LIGHT = '#E6F2FB';   // light blue bg for categories & alternating stats
  const BG_CARD = '#F2F7FB';    // very light blue for exp blocks & fit-and-focus cards
  const WHITE = '#FFFFFF';
  const DOT_COLOR = '#B8D4E8';  // blue middle dot separator

  // Calculate experience years dynamically
  let yearsExp = 4;
  if (workExperience && workExperience.length > 0) {
    const calculated = workExperience.reduce((acc, exp) => {
      if (!exp.startDate) return acc;
      const start = new Date(exp.startDate).getFullYear();
      const end = exp.current ? new Date().getFullYear() : (exp.endDate ? new Date(exp.endDate).getFullYear() : start);
      if (!isNaN(start) && !isNaN(end)) {
        acc += (end - start);
      }
      return acc;
    }, 0);
    yearsExp = calculated > 0 ? calculated : workExperience.length * 2;
  }

  // 4 stat boxes matching the docx values
  const stats = [
    { value: `${yearsExp}+`, label: 'Years MS Ecosystem' },
    { value: `${projects.length > 0 ? projects.length : 5}+`, label: 'Enterprise Projects' },
    { value: 'D365', label: 'CRM / Sales / Fabric' },
    { value: '100%', label: 'Remote Capable' },
  ];

  // Emojis mapping for work experience cards
  const domainEmojis = ['🏗️', '🏥', '🌍', '💰', '👥', '🚀'];
  const getCategoryColor = (emoji: string) => {
    switch (emoji) {
      case '🏗️': return '#D4900A'; // Finance & Operations orange
      case '🏥': return '#00A550'; // Healthcare green
      case '🌍': return '#00BCF2'; // Government API cyan
      case '💰': return '#D4900A'; // Vendor Management orange
      case '👥': return '#7719AA'; // HR purple
      default: return '#0078D4';
    }
  };

  // Helper to bold and color-code D365 & Power Platform keywords in description bullets
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
    
    // Sort longer phrases first to avoid partial matching
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

  // Section heading bar
  const SectionHeading = ({ title }: { title: string }) => (
    <div style={{
      background: BANNER,
      padding: '7px 14px',
      marginTop: 20,
      marginBottom: 14,
      borderRadius: '2px',
      display: 'flex',
      alignItems: 'center'
    }}>
      <span style={{
        fontSize: '11px',
        fontWeight: 900,
        color: WHITE,
        letterSpacing: '0.08em',
        textTransform: 'uppercase'
      }}>
        {title}
      </span>
    </div>
  );

  return (
    <div className="resume-template tpl-aosc-portfolio-shaurya" style={{
      background: WHITE,
      fontFamily: 'Arial, Helvetica, sans-serif',
      minHeight: '1123px',
      width: '794px',
      boxSizing: 'border-box',
      padding: '40px 50px 60px',
      color: TEXT,
      position: 'relative',
    }}>
      {/* ── HEADER (Navy Banner block) ── */}
      <div style={{
        background: NAVY,
        padding: '22px 24px',
        borderRadius: '3px',
        marginBottom: 16
      }}>
        <h1 style={{
          color: WHITE,
          fontSize: '26px',
          fontWeight: 900,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          margin: 0,
          lineHeight: 1.1
        }}>
          {p.fullName || 'YOUR NAME'}
        </h1>
        <p style={{
          color: CYAN,
          fontSize: '13px',
          margin: '5px 0 0 0',
          fontWeight: 700,
          letterSpacing: '0.02em',
          textTransform: 'uppercase'
        }}>
          {p.jobTitle || 'Dynamics 365 CRM & Power Platform Architect'}
        </p>
      </div>

      {/* ── STATS ROW (Alternating cells) ── */}
      <div style={{
        display: 'flex',
        border: `1.5px solid ${BG_LIGHT}`,
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: 18
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            flex: 1,
            background: i % 2 === 0 ? BG_LIGHT : WHITE,
            padding: '8px 10px',
            textAlign: 'center',
            borderRight: i < stats.length - 1 ? `1.5px solid ${BG_LIGHT}` : 'none'
          }}>
            <div style={{ fontSize: '20px', fontWeight: 900, color: BLUE, lineHeight: 1.1 }}>{s.value}</div>
            <div style={{ fontSize: '9px', color: GREY, fontWeight: 700, letterSpacing: '0.03em', marginTop: 1, textTransform: 'uppercase' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── ABOUT ME & QUICK INFO ── */}
      <SectionHeading title="About Me — Microsoft Ecosystem Specialist" />
      <div style={{ display: 'flex', gap: 24, marginBottom: 10 }}>
        {/* About Me Column */}
        <div style={{ flex: 1.6, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 900, color: BLUE, margin: '0 0 6px 0' }}>About Me</h3>
          <p style={{ fontSize: '10.5px', lineHeight: 1.6, color: TEXT, margin: 0, textAlign: 'justify' }}>
            {summary}
          </p>
        </div>

        {/* Quick Info Column */}
        <div style={{ flex: 1, borderLeft: `1.5px solid ${BG_LIGHT}`, paddingLeft: 20 }}>
          <h3 style={{ fontSize: '13px', fontWeight: 900, color: BLUE, margin: '0 0 6px 0' }}>Quick Info</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '10.5px', color: TEXT, lineHeight: 1.5 }}>
            {p.address && (
              <div>📍 <strong>Address:</strong> {p.address}</div>
            )}
            {education.length > 0 && (
              <div>
                🎓 <strong>Education:</strong> {education[0].degree}
                <div style={{ fontSize: '9px', color: GREY, marginLeft: 16 }}>{education[0].college}</div>
              </div>
            )}
            <div>🏢 <strong>Experience:</strong> {yearsExp}+ Years Microsoft Ecosystem</div>
            <div>💼 <strong>Employment:</strong> Full-Time · Remote</div>
            {languages.length > 0 && (
              <div>
                🌐 <strong>Domains/Languages:</strong> {languages.map(l => l.name).join(' · ')}
              </div>
            )}
            {p.phone && <div>☎ <strong>Phone:</strong> {p.phone}</div>}
            {p.email && <div style={{ wordBreak: 'break-all' }}>✉ <strong>Email:</strong> {p.email}</div>}
          </div>
        </div>
      </div>

      {/* ── TECHNICAL ARSENAL ── */}
      {skills.length > 0 && (
        <div>
          <SectionHeading title="Technical Arsenal — Core Skills & Stack" />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            border: `1.5px solid ${BG_LIGHT}`,
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            {skills.map((skill, i) => {
              const c = skill.indexOf(':');
              const category = c > -1 ? skill.slice(0, c).trim() : 'Skill Set';
              const items = c > -1 ? skill.slice(c + 1).trim() : skill;
              
              // Format category items as middle-dot-separated string
              const formattedItems = items.split(',').map(item => item.trim()).join('  ·  ');

              return (
                <div key={i} style={{
                  display: 'flex',
                  borderBottom: i < skills.length - 1 ? `1.5px solid ${BG_LIGHT}` : 'none'
                }}>
                  {/* Category cell */}
                  <div style={{
                    width: '24%',
                    background: BG_LIGHT,
                    padding: '8px 12px',
                    fontSize: '10px',
                    fontWeight: 900,
                    color: BLUE,
                    display: 'flex',
                    alignItems: 'center',
                    boxSizing: 'border-box'
                  }}>
                    {category}
                  </div>
                  {/* Skills cell */}
                  <div style={{
                    flex: 1,
                    background: WHITE,
                    padding: '8px 14px',
                    fontSize: '10px',
                    color: TEXT,
                    lineHeight: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    boxSizing: 'border-box'
                  }}>
                    {formattedItems}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── WORK EXPERIENCE (Project details) ── */}
      {workExperience.length > 0 && (
        <div>
          <SectionHeading title="Work Experience — Projects & Delivery" />
          <p style={{ fontSize: '10px', color: GREY, fontStyle: 'italic', margin: '-4px 0 12px 0' }}>
            End-to-end Microsoft ecosystem implementations with Dynamics 365 CRM at the core, across enterprise clients in diverse domains.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {workExperience.map((exp, i) => {
              const emoji = domainEmojis[i % domainEmojis.length];
              const categoryColor = getCategoryColor(emoji);

              // Category name (e.g. 🏗️  FINANCE & OPERATIONS)
              const companyName = exp.company;
              // Role title (e.g. Data Integration & Analytics...)
              const roleTitle = exp.role;

              // Generate generic technical tags for separator row
              const companyParts = exp.company.replace(/[^\w\s&]/g, '').trim().split(/\s+/);
              const tagList = [
                companyParts[companyParts.length - 1] || 'Enterprise',
                'Power Platform',
                'Dataverse'
              ];

              return (
                <div key={i} style={{
                  background: BG_CARD,
                  borderRadius: '4px',
                  padding: '12px 16px',
                  boxSizing: 'border-box'
                }}>
                  {/* Category Header */}
                  <div style={{
                    fontSize: '9.5px',
                    fontWeight: 900,
                    color: categoryColor,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}>
                    <span>{emoji}</span>
                    <span>{companyName}</span>
                  </div>

                  {/* Role Title */}
                  <h4 style={{
                    fontSize: '13px',
                    fontWeight: 800,
                    color: TEXT,
                    margin: '4px 0 2px 0',
                    lineHeight: 1.3
                  }}>
                    {roleTitle}
                  </h4>

                  {/* Client & Architecture details */}
                  <p style={{
                    fontSize: '9.5px',
                    color: GREY,
                    margin: '0 0 8px 0',
                    fontWeight: 500
                  }}>
                    Enterprise Client  ·  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}  ·  Unified CRM Architecture
                  </p>

                  {/* Bullet points with blue highlights */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {exp.description && exp.description.split('\n').filter(Boolean).map((line, li) => (
                      <div key={li} style={{
                        fontSize: '9.5px',
                        color: TEXT,
                        lineHeight: 1.5,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 6,
                        textAlign: 'justify'
                      }}>
                        <span style={{ color: BLUE, fontWeight: 900, flexShrink: 0 }}>•</span>
                        <span>{highlightText(line.replace(/^[-•]\s*/, ''))}</span>
                      </div>
                    ))}
                  </div>

                  {/* Skills separator tags */}
                  <div style={{
                    marginTop: 8,
                    paddingTop: 6,
                    borderTop: `1px solid rgba(0, 120, 212, 0.1)`,
                    fontSize: '9px',
                    fontWeight: 800,
                    color: BLUE,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 6
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

      {/* ── STRATEGIC FIT & FOCUS ── */}
      <div>
        <SectionHeading title="Dynamics 365 CRM Fit & Focus" />
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          columnGap: 14,
          rowGap: 10
        }}>
          {[
            { num: '01', title: 'Specialized Expertise', desc: 'Deep customization across core Dynamics 365 Sales modules, custom entity schema designs, and relationship mappings.' },
            { num: '02', title: 'End-to-End Delivery', desc: 'Handling business process design, custom workflow automation, REST integrations, and deployment cycles.' },
            { num: '03', title: 'Performance Focus', desc: 'Optimizing plugin execution overhead, API request latencies, and Dataverse entity model structures for high loads.' },
            { num: '04', title: 'Hybrid Integration', desc: 'Seamless synchronization between Microsoft Fabric, Snowflake, Stripe, and Dynamics 365 endpoints.' },
            { num: '05', title: 'Remote Efficiency', desc: 'High degree of self-organization, delivering production features independently in distributed Agile sprints.' },
            { num: '06', title: 'Business Alignment', desc: 'Transforming operational requirements directly into robust Power Automate approval gates and analytics dashboards.' },
          ].map((box, bi) => (
            <div key={bi} style={{
              background: BG_CARD,
              borderRadius: '4px',
              padding: '10px 14px',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box'
            }}>
              <span style={{ fontSize: '18px', fontWeight: 900, color: CYAN, lineHeight: 1.1 }}>{box.num}</span>
              <span style={{ fontSize: '10.5px', fontWeight: 800, color: TEXT, margin: '2px 0 4px 0' }}>{box.title}</span>
              <span style={{ fontSize: '9.5px', color: GREY, lineHeight: 1.35, textAlign: 'justify' }}>{box.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── AOSC FOOTER ── */}
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
          © 2026 {p.fullName || 'YOUR NAME'} · {p.jobTitle || 'Dynamics 365 CRM Developer'} · Amritsar, Punjab, India
        </span>
        <img src="/logo1.png" alt="AOSC" style={{ height: 14, opacity: 0.45 }} />
      </div>
    </div>
  );
}
