import React, { useState, useEffect } from 'react';
import { PORTFOLIO_CONFIG } from './config/portfolio.config';
import { PortfolioConfig } from './types/portfolio';
import { Sidebar } from './components/Sidebar';
import { DailyDrivers } from './components/DailyDrivers';
import { BentoGrid } from './components/BentoGrid';
import { SystemDiagnostics } from './components/SystemDiagnostics';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ProjectInspectorModal } from './components/ProjectInspectorModal';
import { VisitorBadge } from './components/VisitorBadge';
import { LoginModal } from './components/LoginModal';
import { AdminDeck } from './components/AdminDeck';
import { Default as SpotlightDemo } from './components/ui/demo';
import { ArrowUpRight, Download, Mail, Sparkles, ShieldCheck, Lock, Unlock } from 'lucide-react';

export const App: React.FC = () => {
  // Live editable config state
  const [config, setConfig] = useState<PortfolioConfig>(PORTFOLIO_CONFIG);
  
  // Accessibility & Theme State
  const [theme, setTheme] = useState<'dark' | 'light' | 'terminal'>(() => {
    return (localStorage.getItem('jnl_theme') as 'dark' | 'light' | 'terminal') || 'dark';
  });
  const [isLargeText, setIsLargeText] = useState<boolean>(() => {
    return localStorage.getItem('jnl_large_text') === 'true';
  });

  // Security & Authentication State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem('jnl_admin_auth') === 'true';
  });
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isAdminDeckOpen, setIsAdminDeckOpen] = useState<boolean>(false);

  // Modals & Feedback
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Apply Theme & Font Scale to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('jnl_theme', theme);
  }, [theme]);

  useEffect(() => {
    if (isLargeText) {
      document.documentElement.setAttribute('data-text-size', 'large');
    } else {
      document.documentElement.removeAttribute('data-text-size');
    }
    localStorage.setItem('jnl_large_text', String(isLargeText));
  }, [isLargeText]);

  // Global Keyboard Shortcuts
  // ~ or ` for terminal
  // Alt+L or Ctrl+Shift+L for Operator Login
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      } else if ((e.altKey && (e.key === 'l' || e.key === 'L')) || (e.ctrlKey && e.shiftKey && (e.key === 'l' || e.key === 'L'))) {
        e.preventDefault();
        if (isAdmin) {
          setIsAdminDeckOpen(true);
        } else {
          setIsLoginOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdmin]);

  const handleToggleTheme = () => {
    const themes: ('dark' | 'light' | 'terminal')[] = ['dark', 'light', 'terminal'];
    const nextIdx = (themes.indexOf(theme) + 1) % themes.length;
    setTheme(themes[nextIdx]);
    showToast(`Switched to ${themes[nextIdx].toUpperCase()} mode`);
  };

  const handleToggleTextSize = () => {
    setIsLargeText(prev => {
      const next = !prev;
      showToast(next ? "Large Text Mode Active (+20%)" : "Standard Text Mode Active");
      return next;
    });
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    sessionStorage.setItem('jnl_admin_auth', 'true');
    setIsAdminDeckOpen(true);
  };

  const handleLogoutAdmin = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('jnl_admin_auth');
    setIsAdminDeckOpen(false);
    showToast("Session Locked. Returned to Guest Mode.");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="app-layout">
      {/* 1. Accessible Sidebar with A11y & Admin Controls */}
      <Sidebar 
        config={config}
        currentTheme={theme} 
        isLargeText={isLargeText}
        isAdmin={isAdmin}
        onToggleTheme={handleToggleTheme}
        onToggleTextSize={handleToggleTextSize}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogoutAdmin={handleLogoutAdmin}
        onOpenAdminDeck={() => setIsAdminDeckOpen(true)}
        onShowToast={showToast}
      />

      {/* 2. Main Bento Canvas */}
      <main className="app-main" id="home">
        
        {/* Security / Session Mode Banner */}
        <div className="security-status-banner" style={{ border: '2px solid var(--accent-orange)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {isAdmin ? (
              <span className="status-badge-admin" style={{ color: 'var(--accent-orange)', fontWeight: 800 }}>
                <Unlock size={18} />
                <span>ADMIN ACTIVE: Live Customizer & Scalability Tools Unlocked</span>
              </span>
            ) : (
              <span className="status-badge-public" style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>
                <ShieldCheck size={18} />
                <span>GUEST SESSION ACTIVE: Sanitized Public View • Sensitive Data Redacted</span>
              </span>
            )}
          </div>
          <div>
            {isAdmin ? (
              <button 
                onClick={() => setIsAdminDeckOpen(true)} 
                className="bento-btn bento-btn--accent" 
                style={{ minHeight: '40px', padding: '0.45rem 1.25rem' }}
              >
                Open Command Deck
              </button>
            ) : (
              <button 
                onClick={() => setIsLoginOpen(true)} 
                className="bento-btn" 
                style={{ 
                  minHeight: '40px', 
                  padding: '0.45rem 1.25rem',
                  background: 'var(--accent-orange-dim)',
                  border: '2px solid var(--accent-orange)',
                  color: 'var(--accent-orange)',
                  fontWeight: 800
                }}
              >
                <Lock size={15} />
                <span>Operator Login (PIN: 2026)</span>
              </button>
            )}
          </div>
        </div>

        {/* Top Hero Banner */}
        <header className="main-hero">
          <div className="main-hero__content">
            <div className="hero-eyebrow">
              <span className="eyebrow-dot"></span>
              <span>{config.hero.badge}</span>
            </div>
            <h2 className="hero-statement">
              <span className="gradient-text">{config.hero.title}</span>
            </h2>
            <p className="hero-substatement">{config.hero.subtitle}</p>
          </div>

          <div className="main-hero__actions">
            <a href={config.hero.ctaPrimary.href} className="bento-btn bento-btn--accent">
              <span>{config.hero.ctaPrimary.text}</span>
              <ArrowUpRight size={18} />
            </a>
            <a href={config.hero.ctaSecondary.href} download="John_Nigel_Landingin_Resume.pdf" className="bento-btn bento-btn--outline">
              <Download size={17} />
              <span>Resume (PDF)</span>
            </a>
          </div>
        </header>

        {/* Daily Drivers Ribbon */}
        <DailyDrivers />

        {/* The Bento Matrix (All 7 Projects with Filters) */}
        <BentoGrid config={config} onOpenProject={(id) => setActiveProjectId(id)} />

        {/* Interactive Spotlight & Glow Showcase (shadcn / Tailwind component) */}
        <section className="diagnostics-box" style={{ padding: '2.25rem 1.75rem', border: '2px solid var(--border-color)' }}>
          <div className="diagnostics-head" style={{ marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Sparkles size={20} color="var(--accent-orange)" />
              <span className="diagnostics-title" style={{ fontSize: '1rem' }}>DYNAMIC CHROMATIC GLOW & SPOTLIGHT CARDS</span>
            </div>
            <span className="diagnostics-badge">
              <span>ORANGE • YELLOW • BLUE GRADIENTS</span>
            </span>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Interactive specular lighting reflecting cursor coordinates without high-latency GPU strain.
          </p>
          <SpotlightDemo />
        </section>

        {/* Live System Diagnostics Widget */}
        <SystemDiagnostics />

        {/* Contact Banner */}
        <section className="contact-banner" id="contact" style={{ border: '2px solid var(--accent-orange)' }}>
          <div className="contact-banner__inner">
            <div className="contact-banner__content">
              <span className="contact-pill" style={{ color: 'var(--accent-orange)' }}>DIRECT CONTACT CHANNELS</span>
              <h3 className="contact-banner-title">Let's build something durable together.</h3>
              <p className="contact-banner-sub">
                Available for Junior Developer (C#/.NET), IT Systems Administration, Unity 3D, and Enterprise Systems Modeling.
              </p>
            </div>
            <div className="contact-banner__actions">
              <a href={`mailto:${config.profile.email}`} className="bento-btn bento-btn--accent bento-btn--lg">
                <Mail size={18} />
                <span>{config.profile.email}</span>
              </a>
              <button onClick={() => {
                navigator.clipboard.writeText(config.profile.email);
                showToast(`Copied to clipboard: ${config.profile.email}`);
              }} className="bento-btn bento-btn--outline bento-btn--lg">
                <span>Copy Email</span>
              </button>
            </div>
          </div>
        </section>

        {/* Accessible Footer */}
        <footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingTop: '2.5rem', borderTop: '2px solid var(--border-color)', fontSize: '0.9rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
          <div>© 2026 {config.profile.fullName}. Built with React 19, TypeScript, Eye-Care Gradients & Strict CSP.</div>
          <a href="#home" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 700 }}>Back to top ↑</a>
        </footer>

      </main>

      {/* Floating Visitor Badge */}
      <VisitorBadge />

      {/* Operator Authentication Login Modal */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onShowToast={showToast}
      />

      {/* Operator Admin Command Deck */}
      <AdminDeck 
        isOpen={isAdminDeckOpen}
        onClose={() => setIsAdminDeckOpen(false)}
        config={config}
        onUpdateConfig={(newConfig) => setConfig(newConfig)}
        onLogout={handleLogoutAdmin}
        onShowToast={showToast}
      />

      {/* Interactive CLI Terminal Modal */}
      <InteractiveTerminal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
        onSetTheme={(t) => setTheme(t)}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      {/* Architecture Deep Dive Modal */}
      <ProjectInspectorModal 
        projectId={activeProjectId} 
        onClose={() => setActiveProjectId(null)} 
      />

      {/* Toast Feedback */}
      <div className={`toast ${toastMessage ? 'show' : ''}`} role="status">
        {toastMessage}
      </div>
    </div>
  );
};
