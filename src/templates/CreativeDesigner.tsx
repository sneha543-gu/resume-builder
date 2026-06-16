import { Share2, Code, Globe } from 'lucide-react';
import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function CreativeDesigner({ data, scale = 1 }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;

  return (
    <div className="resume-template tpl-creative" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      {/* Gradient Header */}
      <div className="tpl-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {p.profilePhoto && (
            <img src={p.profilePhoto} alt="Profile"
              style={{ width: 76, height: 76, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.4)', flexShrink: 0 }} />
          )}
          <div>
            <h1 className="tpl-name">{p.fullName || 'Your Name'}</h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', marginTop: 4, fontWeight: 500 }}>{p.jobTitle || 'Your Job Title'}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', marginTop: 10 }}>
              {[p.email, p.phone, p.address].filter(Boolean).map((val, i) => (
                <span key={i} style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>{val}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Two-column body */}
      <div className="tpl-body">
        <div className="tpl-sidebar">
          {skills.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <p className="tpl-section-title">Skills</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {skills.map((s) => (
                  <span key={s} style={{ padding: '3px 10px', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 6, fontSize: 11, color: '#475569', fontWeight: 500 }}>{s}</span>
                ))}
              </div>
            </div>
          )}
          {languages.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <p className="tpl-section-title">Languages</p>
              {languages.map((l) => (
                <div key={l.id} style={{ marginBottom: 6 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#0f172a' }}>{l.name}</p>
                  <p style={{ fontSize: 11, color: '#6366f1' }}>{l.proficiency}</p>
                </div>
              ))}
            </div>
          )}
          {certifications.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <p className="tpl-section-title">Certifications</p>
              {certifications.map((c) => (
                <div key={c.id} style={{ marginBottom: 8 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#0f172a' }}>{c.name}</p>
                  <p style={{ fontSize: 10, color: '#64748b' }}>{c.issuer} · {c.year}</p>
                </div>
              ))}
            </div>
          )}
          <div style={{ marginTop: 8 }}>
            <p className="tpl-section-title">Contact</p>
            {[{ icon: <Share2 size={10} />, val: p.linkedIn }, { icon: <Code size={10} />, val: p.github }, { icon: <Globe size={10} />, val: p.website }]
              .filter((c) => c.val).map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                  <span style={{ color: '#6366f1', flexShrink: 0 }}>{c.icon}</span>
                  <span style={{ fontSize: 10, color: '#64748b', wordBreak: 'break-all' }}>{c.val}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="tpl-main">
          {summary && (
            <div style={{ marginBottom: 20 }}>
              <p className="tpl-section-title">About Me</p>
              <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.7 }}>{summary}</p>
            </div>
          )}
          {workExperience.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <p className="tpl-section-title">Experience</p>
              {workExperience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{exp.role}</p>
                      <p style={{ fontSize: 11, color: '#6366f1', fontWeight: 600 }}>{exp.company}</p>
                    </div>
                    <span style={{ fontSize: 10, background: 'rgba(99,102,241,0.1)', color: '#6366f1', padding: '2px 8px', borderRadius: 999, height: 'fit-content', whiteSpace: 'nowrap' }}>
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p style={{ fontSize: 11, color: '#475569', marginTop: 6, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}
          {education.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <p className="tpl-section-title">Education</p>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: 10 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{edu.degree}</p>
                  <p style={{ fontSize: 11, color: '#64748b' }}>{edu.college} · {edu.year}</p>
                </div>
              ))}
            </div>
          )}
          {projects.length > 0 && (
            <div>
              <p className="tpl-section-title">Projects</p>
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: 10 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{proj.name}</p>
                  {proj.techStack && <p style={{ fontSize: 10, color: '#6366f1', marginTop: 2 }}>{proj.techStack}</p>}
                  {proj.description && <p style={{ fontSize: 11, color: '#475569', marginTop: 4, lineHeight: 1.6 }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
