import { Sparkles, Heart, MessageCircle, Globe, Share2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';


const footerSections = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', href: '/home' },
      { label: 'Templates', href: '/home#templates' },
      { label: 'Features', href: '/home#features' },
      { label: 'About', href: '/home#about' },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-color)',
      background: 'var(--bg-card)',
      padding: '40px 24px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          gap: 32,
          paddingBottom: 32,
          borderBottom: '1px solid var(--border-color)',
          marginBottom: 24
        }}>
          {/* Brand Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 300 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10,
                background: 'var(--grad-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(var(--color-primary-rgb), 0.3)',
              }}>
                <Sparkles size={16} color="#fff" />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '20px', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                Resume<span style={{ color: 'var(--color-primary)' }}>Craft</span>
              </span>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Crafting professional, ATS-optimized resumes that get you hired.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
              {[MessageCircle, Globe, Share2].map((Icon, i) => (
                <a key={i} href="#" style={{ 
                  color: 'var(--text-muted)', 
                  transition: 'all 0.2s', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-color)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-primary)';
                  e.currentTarget.style.background = 'rgba(var(--color-primary-rgb), 0.08)';
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links & Status Section */}
          <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>Explore</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {footerSections[0].links.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => {
                      if (link.href.includes('#')) {
                        const id = link.href.split('#')[1];
                        if (window.location.pathname === '/home') {
                          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                        }
                      } else if (link.href === '/home') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    style={{ fontSize: '14px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>Platform</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                  Systems Operational
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <ShieldCheck size={14} color="#10b981" />
                  ATS Optimization Ready
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
            © 2025 ResumeCraft. Made with <Heart size={14} color="#ef4444" fill="#ef4444" /> for professionals.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 12px', background: 'rgba(var(--color-primary-rgb), 0.05)', borderRadius: 20, border: '1px solid rgba(var(--color-primary-rgb), 0.1)' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>v2.4.0</span>
            <div style={{ width: 1, height: 12, background: 'rgba(var(--color-primary-rgb), 0.2)' }} />
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Join 50k+ Users</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
