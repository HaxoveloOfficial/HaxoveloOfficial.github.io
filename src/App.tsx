import React, { useState, useEffect } from 'react';
import { PORTFOLIO_CONFIG } from './config/portfolio.config';
import { PortfolioConfig, SessionRole } from './types/portfolio';
import { Sidebar } from './components/Sidebar';
import { DailyDrivers } from './components/DailyDrivers';
import { BentoGrid } from './components/BentoGrid';
import { SystemDiagnostics } from './components/SystemDiagnostics';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ProjectInspectorModal } from './components/ProjectInspectorModal';
import { VisitorBadge } from './components/VisitorBadge';
import { AccessGateway } from './components/AccessGateway';
import { AdminDeck } from './components/AdminDeck';
import { Default as SpotlightDemo } from './components/ui/demo';
import { ArrowUpRight, Download, Mail, Sparkles, ShieldCheck, Lock, Unlock, UserCheck, Shield } from 'lucide-react';

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

  // Access Tier & Authentication State
  const [sessionRole, setSessionRole] = useState<SessionRole>(() => {
    const saved = sessionStorage.getItem('jnl_session_role') as SessionRole;
    if (saved === 'operator' || saved === 'authorized' || saved === 'guest') {
      return saved;
    }
    return 'guest'; // Default fallback
  });

  const [sessionUser, setSessionUser] = useState<string>(() => {
    return sessionStorage.getItem('jnl_session_user') || '';
  });

  // Gateway Modal: If user visits for the first time in this session, show Gateway immediately
  const [isGatewayOpen, setIsGatewayOpen] = useState<boolean>(() => {
    return !sessionStorage.getItem('jnl_session_initialized');
  });

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
  // Alt+L or Ctrl+Shift+L for Access / Admin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      } else if ((e.altKey && (e.key === 'l' || e.key === 'L')) || (e.ctrlKey && e.shiftKey && (e.key === 'l' || e.key === 'L'))) {
        e.preventDefault();
        if (sessionRole === 'operator') {
          setIsAdminDeckOpen(true);
        } else {
          setIsGatewayOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sessionRole]);

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

  const handleSelectRole = (role: SessionRole, username?: string, email?: string) => {
    setSessionRole(role);
    sessionStorage.setItem('jnl_session_role', role);
    sessionStorage.setItem('jnl_session_initialized', 'true');

    if (role === 'operator') {
      const opName = 'John Nigel Landingin';
      setSessionUser(opName);
      sessionStorage.setItem('jnl_session_user', opName);
      sessionStorage.setItem('jnl_admin_auth', 'true');
      setIsAdminDeckOpen(true);
    } else if (role === 'authorized') {
      const uName = username || 'Authorized User';
      setSessionUser(uName);
      sessionStorage.setItem('jnl_session_user', uName);
      if (email) sessionStorage.setItem('jnl_session_email', email);
      sessionStorage.removeItem('jnl_admin_auth');
    } else {
      setSessionUser('');
      sessionStorage.removeItem('jnl_session_user');
      sessionStorage.removeItem('jnl_session_email');
      sessionStorage.removeItem('jnl_admin_auth');
    }
  };

  const handleLogout = () => {
    setSessionRole('guest');
    setSessionUser('');
    sessionStorage.setItem('jnl_session_role', 'guest');
    sessionStorage.removeItem('jnl_session_user');
    sessionStorage.removeItem('jnl_session_email');
    sessionStorage.removeItem('jnl_admin_auth');
    setIsAdminDeckOpen(false);
    showToast("Session Locked. Returned to Public Guest Mode.");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const isGuest = sessionRole === 'guest';
  const isOperator = sessionRole === 'operator';

  return (
    <div className="app-layout">
      {/* 1. Accessible Sidebar with A11y & Access Controls */}
      <Sidebar 
        config={config}
        currentTheme={theme} 
        isLargeText={isLargeText}
        sessionRole={sessionRole}
        sessionUser={sessionUser}
        onToggleTheme={handleToggleTheme}
        onToggleTextSize={handleToggleTextSize}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenGateway={() => setIsGatewayOpen(true)}
        onLogout={handleLogout}
        onOpenAdminDeck={() => setIsAdminDeckOpen(true)}
        onShowToast={showToast}
      />

      {/* 2. Main Bento Canvas */}
      <main className="app-main" id="home">
        
        {/* Security / Session Mode Banner */}
        <div 
          className="security-status-banner" 
          style={{ 
            border: isOperator 
              ? '2px solid var(--accent-orange)' 
              : sessionRole === 'authorized' 
              ? '2px solid var(--accent-blue)' 
              : '2px solid var(--border-color)',
            boxShadow: isOperator ? '0 4px 15px rgba(249, 115, 22, 0.15)' : 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {isOperator ? (
              <span className="status-badge-admin" style={{ color: 'var(--accent-orange)', fontWeight: 800 }}>
                <Unlock size={18} />
                <span>MASTER OPERATOR ACTIVE: Command Deck, Customizer & Code Blueprints Unlocked</span>
              </span>
            ) : sessionRole === 'authorized' ? (
              <span className="status-badge-public" style={{ color: 'var(--accent-blue)', fontWeight: 800 }}>
                <UserCheck size={18} />
                <span>VERIFIED USER SESSION (@{sessionUser}): Architecture Blueprints & Source Unlocked</span>
              </span>
            ) : (
              <span className="status-badge-public" style={{ color: 'var(--accent-yellow)', fontWeight: 700 }}>
                <ShieldCheck size={18} />
                <span>GUEST SESSION ACTIVE: Sanitized Public View • Architecture Locked</span>
              </span>
            )}
          </div>

          <div>
            {isOperator ? (
              <button 
                onClick={() => setIsAdminDeckOpen(true)} 
                className="bento-btn bento-btn--accent" 
                style={{ minHeight: '40px', padding: '0.45rem 1.25rem' }}
              >
                Open Command Deck
              </button>
            ) : sessionRole === 'authorized' ? (
              <button 
                onClick={() => setIsGatewayOpen(true)} 
                className="bento-btn" 
                style={{ 
                  minHeight: '40px', 
                  padding: '0.45rem 1.25rem',
                  background: 'var(--accent-blue-dim)',
                  border: '2px solid var(--accent-blue)',
                  color: 'var(--accent-blue)',
                  fontWeight: 700
                }}
              >
                <Shield size={15} />
                <span>Switch Access Tier</span>
              </button>
            ) : (
              <button 
                onClick={() => setIsGatewayOpen(true)} 
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
                <span>Sign In / Create Account (Gmail OTP)</span>
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

        {/* Live System Diagnostics Widget (100% Real Measured Browser Telemetry) */}
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

      {/* Floating Visitor Badge (Real Measured Count) */}
      <VisitorBadge />

      {/* Entrance Access Gateway & Auth System (Operator / Gmail OTP Account / Guest) */}
      <AccessGateway 
        isOpen={isGatewayOpen}
        onClose={() => setIsGatewayOpen(false)}
        onSelectRole={handleSelectRole}
        onShowToast={showToast}
      />

      {/* Master Operator Admin Command Deck */}
      <AdminDeck 
        isOpen={isAdminDeckOpen}
        onClose={() => setIsAdminDeckOpen(false)}
        config={config}
        onUpdateConfig={(newConfig) => setConfig(newConfig)}
        onLogout={handleLogout}
        onShowToast={showToast}
      />

      {/* Interactive CLI Terminal Modal */}
      <InteractiveTerminal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
        onSetTheme={(t) => setTheme(t)}
        onOpenGateway={() => setIsGatewayOpen(true)}
      />

      {/* Architecture Deep Dive Modal (Locked for Guests, Unlocked for Operator & Verified Users) */}
      <ProjectInspectorModal 
        projectId={activeProjectId} 
        onClose={() => setActiveProjectId(null)}
        isGuest={isGuest}
        userName={sessionUser}
        onOpenLogin={() => setIsGatewayOpen(true)}
      />

      {/* Toast Feedback */}
      <div className={`toast ${toastMessage ? 'show' : ''}`} role="status">
        {toastMessage}
      </div>
    </div>
  );
};
