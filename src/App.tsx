import React, { useState, useEffect } from 'react';
import { PORTFOLIO_CONFIG } from './config/portfolio.config';
import { Sidebar } from './components/Sidebar';
import { DailyDrivers } from './components/DailyDrivers';
import { BentoGrid } from './components/BentoGrid';
import { SystemDiagnostics } from './components/SystemDiagnostics';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ProjectInspectorModal } from './components/ProjectInspectorModal';
import { VisitorBadge } from './components/VisitorBadge';
import { Default as SpotlightDemo } from './components/ui/demo';
import { ArrowUpRight, Download, Mail, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const { hero, profile } = PORTFOLIO_CONFIG;
  const [theme, setTheme] = useState<'dark' | 'light' | 'terminal'>(() => {
    return (localStorage.getItem('jnl_theme') as 'dark' | 'light' | 'terminal') || 'dark';
  });
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('jnl_theme', theme);
  }, [theme]);

  // Global Keyboard Shortcuts (tilde '~' or '`' to open terminal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleTheme = () => {
    const themes: ('dark' | 'light' | 'terminal')[] = ['dark', 'light', 'terminal'];
    const nextIdx = (themes.indexOf(theme) + 1) % themes.length;
    setTheme(themes[nextIdx]);
    showToast(`Switched to ${themes[nextIdx].toUpperCase()} mode`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <div className="app-layout">
      {/* 1. Profile & Navigation Sidebar */}
      <Sidebar 
        currentTheme={theme} 
        onToggleTheme={handleToggleTheme}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onShowToast={showToast}
      />

      {/* 2. Main Bento Canvas */}
      <main className="app-main" id="home">
        
        {/* Top Hero Banner */}
        <header className="main-hero">
          <div className="main-hero__content">
            <div className="hero-eyebrow">
              <span className="eyebrow-dot"></span>
              <span>{hero.badge}</span>
            </div>
            <h2 className="hero-statement">{hero.title}</h2>
            <p className="hero-substatement">{hero.subtitle}</p>
          </div>

          <div className="main-hero__actions">
            <a href={hero.ctaPrimary.href} className="bento-btn bento-btn--accent">
              <span>{hero.ctaPrimary.text}</span>
              <ArrowUpRight size={16} />
            </a>
            <a href={hero.ctaSecondary.href} download={hero.ctaSecondary.isDownload ? "John_Nigel_Landingin_Resume.pdf" : undefined} className="bento-btn bento-btn--outline">
              <Download size={15} />
              <span>Resume (PDF)</span>
            </a>
          </div>
        </header>

        {/* Daily Drivers Ribbon */}
        <DailyDrivers />

        {/* The Bento Matrix */}
        <BentoGrid onOpenProject={(id) => setActiveProjectId(id)} />

        {/* Interactive Spotlight & Glow Showcase (shadcn / Tailwind component) */}
        <section className="diagnostics-box" style={{ padding: '2rem 1.5rem' }}>
          <div className="diagnostics-head" style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Sparkles size={18} color="var(--accent)" />
              <span className="diagnostics-title">INTERACTIVE SPOTLIGHT & GLOW ENGINE</span>
            </div>
            <span className="diagnostics-badge">
              <span>TAILWIND + SHADCN PREREQUISITE</span>
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Mouse over the cards to track dynamic cursor coordinates, chromatic hue rotation, and multi-layer radial specular lighting.
          </p>
          <SpotlightDemo />
        </section>

        {/* Live System Diagnostics Widget */}
        <SystemDiagnostics />

        {/* Contact Banner */}
        <section className="contact-banner" id="contact">
          <div className="contact-banner__inner">
            <div className="contact-banner__content">
              <span className="contact-pill">DIRECT CHANNELS</span>
              <h3 className="contact-banner-title">Let's build something durable together.</h3>
              <p className="contact-banner-sub">
                Available for Junior Developer (C#/.NET), IT Systems Administration, and Unity 3D roles. Ready for on-site (Tarlac / Central Luzon) or remote work.
              </p>
            </div>
            <div className="contact-banner__actions">
              <a href={`mailto:${profile.email}`} className="bento-btn bento-btn--accent bento-btn--lg">
                <Mail size={18} />
                <span>Email: {profile.email}</span>
              </a>
              <button onClick={() => {
                navigator.clipboard.writeText(profile.email);
                showToast(`Copied: ${profile.email}`);
              }} className="bento-btn bento-btn--outline bento-btn--lg">
                <span>Copy Email</span>
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '2rem', borderTop: '1px solid var(--border-color)', fontSize: '0.8125rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
          <div>© 2026 {profile.fullName}. Built with React 19, TypeScript, Tailwind CSS & Strict CSP.</div>
          <a href="#home" style={{ color: 'var(--text-muted)' }}>Back to top ↑</a>
        </footer>

      </main>

      {/* Floating Visitor Badge */}
      <VisitorBadge />

      {/* Interactive Terminal Modal */}
      <InteractiveTerminal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
        onSetTheme={(t) => setTheme(t)}
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
