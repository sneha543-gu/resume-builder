import { Mail, Phone, MapPin, Share2, Code } from 'lucide-react';
import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function ElegantClassic({ data, scale = 1 }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, projects, certifications, languages } = data;

  return (
    <div className="resume-template tpl-classic" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      {/* Centered header */}
      <div className="tpl-header">
        {p.profilePhoto && (
          <img src={p.profilePhoto} alt="Profile"
            style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '3px solid #d4af37', margin: '0 auto 12px', display: 'block' }} />
        )}
        <h1 className="tpl-name">{p.fullName || 'Your Name'}</h1>
        <p className="tpl-title">{p.jobTitle || 'Professional Title'}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 20px', justifyContent: 'center', marginTop: 10 }}>
          {[
            { icon: <Mail size={10} />, val: p.email },
            { icon: <Phone size={10} />, val: p.phone },
            { icon: <MapPin size={10} />, val: p.address },
            { icon: <Share2 size={10} />, val: p.linkedIn },
            { icon: <Code size={10} />, val: p.github },
          ].filter((c) => c.val).map((c, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#64748b' }}>
              <span style={{ color: '#d4af37' }}>{c.icon}</span> {c.val}
            </span>
          ))}
        </div>
      </div>

      {summary && (
        <div style={{ marginBottom: 22 }}>
          <p className="tpl-section-title">Professional Profile</p>
          <p style={{ fontSize: 12, color: '#4a5568', lineHeight: 1.8, fontStyle: 'italic' }}>{summary}</p>
        </div>
      )}

      {workExperience.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <p className="tpl-section-title">Professional Experience</p>
          {workExperience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e' }}>{exp.role}</span>
                  {' '}
                  <span style={{ fontSize: 12, color: '#d4af37', fontWeight: 600 }}>· {exp.company}</span>
                </div>
                <span style={{ fontSize: 11, color: '#94a3b8', whiteSpace: 'nowrap', marginLeft: 12 }}>
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              {exp.description && (
                <p style={{ fontSize: 11, color: '#4a5568', marginTop: 6, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <p className="tpl-section-title">Education</p>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e' }}>{edu.degree}</p>
                <p style={{ fontSize: 12, color: '#64748b' }}>{edu.college}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 11, color: '#94a3b8' }}>{edu.year}</p>
                {edu.grade && <p style={{ fontSize: 11, color: '#d4af37', fontWeight: 600 }}>{edu.grade}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <p className="tpl-section-title">Core Competencies</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {skills.map((s) => (
              <span key={s} style={{
                padding: '3px 12px', border: '1px solid #d4af37', borderRadius: 4,
                fontSize: 11, color: '#1a1a2e', fontWeight: 500, background: 'rgba(212,175,55,0.06)',
              }}>{s}</span>
            ))}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <p className="tpl-section-title">Notable Projects</p>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: 10 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e' }}>{proj.name}
                {proj.techStack && <span style={{ fontSize: 11, color: '#d4af37', fontWeight: 400, marginLeft: 8 }}>({proj.techStack})</span>}
              </p>
              {proj.description && <p style={{ fontSize: 11, color: '#4a5568', marginTop: 4, lineHeight: 1.7 }}>{proj.description}</p>}
            </div>
          ))}
        </div>
      )}

      {certifications.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <p className="tpl-section-title">Certifications</p>
          {certifications.map((cert) => (
            <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <div>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#1a1a2e' }}>{cert.name}</span>
                <span style={{ fontSize: 11, color: '#64748b', marginLeft: 8 }}>· {cert.issuer}</span>
              </div>
              <span style={{ fontSize: 11, color: '#d4af37' }}>{cert.year}</span>
            </div>
          ))}
        </div>
      )}

      {languages.length > 0 && (
        <div>
          <p className="tpl-section-title">Languages</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 24px' }}>
            {languages.map((l) => (
              <span key={l.id} style={{ fontSize: 12, color: '#4a5568' }}>
                <strong>{l.name}</strong> <span style={{ color: '#d4af37' }}>({l.proficiency})</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
