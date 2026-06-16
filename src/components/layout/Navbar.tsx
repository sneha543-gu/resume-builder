import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, User, LogOut, Menu, X, Home, Layout, Zap, Info } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const NAV_ITEMS = [
  { label: 'Home', href: '/home', icon: <Home size={18} /> },
  { label: 'Templates', href: '/home#templates', icon: <Layout size={18} /> },
  { label: 'Features', href: '/home#features', icon: <Zap size={18} /> },
  { label: 'About', href: '/home#about', icon: <Info size={18} /> },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleNavClick = (item: { label: string; href: string }) => {
    setShowMobileMenu(false);
    if (item.label === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (window.location.pathname === '/home') {
      const id = item.href.split('#')[1];
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="glass"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          borderBottom: '1px solid var(--glass-border)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.03)',
          padding: '0 20px',
        }}
      >
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Left: Hamburger (mobile only) + Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Hamburger button — visible only on small screens */}
            <button
              className="hamburger-btn"
              onClick={() => setShowMobileMenu(true)}
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'rgba(var(--color-primary-rgb), 0.08)',
                border: '1px solid rgba(var(--color-primary-rgb), 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--color-primary)',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
              title="Open Menu"
            >
              <Menu size={20} />
            </button>

            {/* Logo */}
            <Link
              to="/home"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}
            >
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                background: 'var(--grad-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(var(--color-primary-rgb), 0.4)',
                flexShrink: 0,
              }}>
                <Sparkles size={20} color="#fff" />
              </div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '20px',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}>
                Resume<span style={{ color: 'var(--color-primary)' }}>Craft</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav links */}
          <nav className="desktop-nav items-center gap-10" style={{ gap: 40 }}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => handleNavClick(item)}
                style={{
                  fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)',
                  textDecoration: 'none', transition: 'all 0.2s',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-primary)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions: Theme toggle + Profile + Create Resume */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ThemeToggle />

            {/* Profile / Login button */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => isLoggedIn ? setShowDropdown(!showDropdown) : navigate('/login')}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: isLoggedIn ? 'var(--color-primary)' : 'rgba(var(--color-primary-rgb), 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isLoggedIn ? '#fff' : 'var(--color-primary)',
                  border: '1px solid rgba(var(--color-primary-rgb), 0.2)',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  padding: 0,
                }}
                onMouseEnter={(e) => {
                  if (!isLoggedIn) {
                    e.currentTarget.style.background = 'var(--color-primary)';
                    e.currentTarget.style.color = '#fff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoggedIn) {
                    e.currentTarget.style.background = 'rgba(var(--color-primary-rgb), 0.1)';
                    e.currentTarget.style.color = 'var(--color-primary)';
                  }
                }}
                title={isLoggedIn ? 'Account Settings' : 'Log In'}
              >
                {isLoggedIn && user?.username ? (
                  <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: -0.5 }}>
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <User size={20} />
                )}
              </button>

              {/* Profile Dropdown */}
              {isLoggedIn && showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 12px)',
                    right: 0,
                    width: 220,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)',
                    padding: '16px',
                    zIndex: 200,
                  }}
                >
                  <div style={{ marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border-color)' }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{user?.username}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{user?.email}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <button
                      onClick={() => { logout(); setShowDropdown(false); }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '8px 12px',
                        background: 'none', border: 'none', borderRadius: 8, color: '#ef4444',
                        fontSize: 13, cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                    >
                      <LogOut size={16} /> Log Out
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Create Resume button — desktop only */}
            <motion.button
              className="btn-primary desktop-create-btn"
              whileHover={{ scale: 1.03, boxShadow: '0 8px 20px rgba(var(--color-primary-rgb), 0.4)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/templates')}
              style={{
                padding: '10px 22px',
                fontSize: '14px',
                fontWeight: 700,
                borderRadius: '14px',
              }}
            >
              <Sparkles size={15} />
              Create Resume
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Side Drawer ─────────────────────────────────────── */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setShowMobileMenu(false)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 200,
                background: 'rgba(0,0,0,0.45)',
                backdropFilter: 'blur(3px)',
              }}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                zIndex: 300,
                width: 280,
                background: 'var(--bg-card)',
                borderRight: '1px solid var(--border-color)',
                boxShadow: '8px 0 40px rgba(0,0,0,0.18)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Drawer header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 20px 16px',
                borderBottom: '1px solid var(--border-color)',
              }}>
                <Link
                  to="/home"
                  onClick={() => { setShowMobileMenu(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: 10,
                    background: 'var(--grad-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(var(--color-primary-rgb), 0.4)',
                  }}>
                    <Sparkles size={17} color="#fff" />
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-heading)', fontWeight: 800,
                    fontSize: '18px', color: 'var(--text-primary)', letterSpacing: '-0.02em',
                  }}>
                    Resume<span style={{ color: 'var(--color-primary)' }}>Craft</span>
                  </span>
                </Link>

                <button
                  onClick={() => setShowMobileMenu(false)}
                  style={{
                    width: 34, height: 34, borderRadius: 8,
                    background: 'rgba(var(--color-primary-rgb), 0.08)',
                    border: '1px solid rgba(var(--color-primary-rgb), 0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'var(--text-secondary)',
                    transition: 'all 0.2s',
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer nav links */}
              <nav style={{ display: 'flex', flexDirection: 'column', padding: '16px 12px', gap: 4, flex: 1 }}>
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => handleNavClick(item)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        padding: '13px 16px',
                        borderRadius: 12,
                        textDecoration: 'none',
                        fontSize: '15px',
                        fontWeight: 600,
                        color: 'var(--text-secondary)',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(var(--color-primary-rgb), 0.08)';
                        e.currentTarget.style.color = 'var(--color-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }}
                    >
                      <span style={{ color: 'var(--color-primary)', opacity: 0.8 }}>{item.icon}</span>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer: Create Resume button */}
              <div style={{ padding: '16px 20px 32px', borderTop: '1px solid var(--border-color)' }}>
                <motion.button
                  className="btn-primary"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setShowMobileMenu(false); navigate('/templates'); }}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '13px',
                    fontSize: '15px',
                    fontWeight: 700,
                    borderRadius: 14,
                  }}
                >
                  <Sparkles size={16} />
                  Create Resume
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
