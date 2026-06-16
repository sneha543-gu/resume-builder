import { Mail, Phone, MapPin, Share2, Code, Globe } from 'lucide-react';
import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function CorporatePro({ data, scale = 1 }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, certifications, languages } = data;

  return (
    <div className="resume-template tpl-corporate-pro" style={{ transform: `scale(${scale})`, transformOrigin: 'top left', display: 'flex' }}>
      {/* Sidebar */}
      <div className="tpl-sidebar" style={{ width: 260, flexShrink: 0 }}>
        {p.profilePhoto && (
          <img src={p.profilePhoto} alt="Profile"
            style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid #818cf8', marginBottom: 16, display: 'block' }} />
        )}
        <h1 className="tpl-name">{p.fullName || 'Your Name'}</h1>
        <p className="tpl-title-sidebar">{p.jobTitle || 'Job Title'}</p>

        <p className="tpl-section-title-sidebar">Contact</p>
        {[
          { icon: <Mail size={10} />, val: p.email },
          { icon: <Phone size={10} />, val: p.phone },
          { icon: <MapPin size={10} />, val: p.address },
          { icon: <Globe size={10} />, val: p.website },
          { icon: <Share2 size={10} />, val: p.linkedIn },
          { icon: <Code size={10} />, val: p.github },
        ].filter((c) => c.val).map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 6 }}>
            <span style={{ color: '#818cf8', marginTop: 1, flexShrink: 0 }}>{c.icon}</span>
            <span style={{ fontSize: 10, color: '#cbd5e1', lineHeight: 1.5, wordBreak: 'break-all' }}>{c.val}</span>
          </div>
        ))}

        {skills.length > 0 && (
          <>
            <p className="tpl-section-title-sidebar">Skills</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {skills.map((skill) => (
                <div key={skill}>
                  <span style={{ fontSize: 10, color: '#e2e8f0' }}>{skill}</span>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill" style={{ width: '75%' }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {languages.length > 0 && (
          <>
            <p className="tpl-section-title-sidebar">Languages</p>
            {languages.map((lang) => (
              <div key={lang.id} style={{ marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: '#e2e8f0' }}>{lang.name}</span>
                <span style={{ fontSize: 9, color: '#818cf8', marginLeft: 6 }}>{lang.proficiency}</span>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Main */}
      <div className="tpl-main" style={{ background: 'white' }}>
        {summary && (
          <div style={{ marginBottom: 20 }}>
            <p className="tpl-section-title-main">Professional Summary</p>
            <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.7 }}>{summary}</p>
          </div>
        )}

        {workExperience.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <p className="tpl-section-title-main">Work Experience</p>
            {workExperience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: 14, paddingLeft: 12, borderLeft: '2px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{exp.role}</p>
                    <p style={{ fontSize: 12, color: '#6366f1', fontWeight: 600 }}>{exp.company}</p>
                  </div>
                  <p style={{ fontSize: 11, color: '#94a3b8', whiteSpace: 'nowrap' }}>
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </p>
                </div>
                {exp.description && (
                  <p style={{ fontSize: 11, color: '#475569', marginTop: 6, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <p className="tpl-section-title-main">Education</p>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{edu.degree}</p>
                    <p style={{ fontSize: 12, color: '#64748b' }}>{edu.college}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 11, color: '#94a3b8' }}>{edu.year}</p>
                    {edu.grade && <p style={{ fontSize: 11, color: '#64748b' }}>GPA: {edu.grade}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <p className="tpl-section-title-main">Certifications</p>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#0f172a' }}>{cert.name}</p>
                  <p style={{ fontSize: 11, color: '#64748b' }}>{cert.issuer}</p>
                </div>
                <p style={{ fontSize: 11, color: '#94a3b8' }}>{cert.year}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
