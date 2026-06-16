import { Mail, Phone, MapPin, Globe, Share2, Code } from 'lucide-react';
import type { ResumeData } from '../types/resume';
import '../styles/templates.css';

interface Props { data: ResumeData; scale?: number; }

export default function ExecutiveElite({ data, scale = 1 }: Props) {
  const { personalInfo: p, summary, education, workExperience, skills, languages } = data;

  return (
    <div className="resume-template tpl-executive" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        {/* Sidebar */}
        <div style={{ width: '35%', background: '#1e293b', color: '#f8fafc', padding: '30px 20px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Profile Photo */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: 140, 
              height: 140, 
              borderRadius: '50%', 
              border: '4px solid rgba(255,255,255,0.1)', 
              overflow: 'hidden', 
              margin: '0 auto 20px',
              background: '#334155'
            }}>
              {p.profilePhoto ? (
                <img src={p.profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)' }}>
                  No Photo
                </div>
              )}
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{p.fullName || 'Name'}</h1>
            <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 4, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{p.jobTitle || 'Role'}</p>
          </div>

          {/* Contact Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Contact</p>
            {p.email && <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11 }}><Mail size={12} color="#94a3b8" />{p.email}</div>}
            {p.phone && <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11 }}><Phone size={12} color="#94a3b8" />{p.phone}</div>}
            {p.address && <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11 }}><MapPin size={12} color="#94a3b8" />{p.address}</div>}
            {p.website && <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11 }}><Globe size={12} color="#94a3b8" />{p.website}</div>}
            {p.linkedIn && <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11 }}><Share2 size={12} color="#94a3b8" />LinkedIn</div>}
            {p.github && <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11 }}><Code size={12} color="#94a3b8" />GitHub</div>}
          </div>

          {/* Skills Section */}
          {skills.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Expertise</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {skills.map((s) => (
                  <span key={s} style={{ fontSize: 10, padding: '4px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)' }}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Languages Section */}
          {languages.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Languages</p>
              {languages.map((l) => (
                <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                  <span>{l.name}</span>
                  <span style={{ color: '#94a3b8' }}>{l.proficiency}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '40px 30px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {summary && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ height: 2, flex: 1, background: '#e2e8f0' }} />
                <p style={{ fontSize: 12, fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Professional Profile</p>
                <div style={{ height: 2, flex: 1, background: '#e2e8f0' }} />
              </div>
              <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.8 }}>{summary}</p>
            </div>
          )}

          {workExperience.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <p style={{ fontSize: 12, fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Work Experience</p>
                <div style={{ height: 2, flex: 1, background: '#e2e8f0' }} />
              </div>
              {workExperience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{exp.role}</p>
                      <p style={{ fontSize: 11, fontWeight: 600, color: '#6366f1', marginTop: 2 }}>{exp.company}</p>
                    </div>
                    <span style={{ fontSize: 10, color: '#64748b', fontWeight: 600 }}>{exp.startDate} – {exp.current ? 'PRESENT' : exp.endDate}</span>
                  </div>
                  {exp.description && <p style={{ fontSize: 11, color: '#475569', marginTop: 8, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <p style={{ fontSize: 12, fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Education</p>
                <div style={{ height: 2, flex: 1, background: '#e2e8f0' }} />
              </div>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{edu.degree}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b', marginTop: 2 }}>
                    <span>{edu.college}</span>
                    <span>{edu.year}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
