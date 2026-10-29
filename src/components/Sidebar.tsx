import React, { useState, useEffect } from 'react';
import { Mail, Sun, Moon, Terminal, Folder, Layers, Award, User, Cpu, Lock, Unlock, ZoomIn } from 'lucide-react';
import { PortfolioConfig } from '../types/portfolio';

interface SidebarProps {
  config: PortfolioConfig;
  currentTheme: 'dark' | 'light' | 'terminal';
  isLargeText: boolean;
  isAdmin: boolean;
  onToggleTheme: () => void;
  onToggleTextSize: () => void;
  onOpenTerminal: () => void;
  onOpenLogin: () => void;
  onLogoutAdmin: () => void;
  onOpenAdminDeck: () => void;
  onShowToast: (msg: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  config,
  currentTheme, 
  isLargeText,
  isAdmin,
  onToggleTheme, 
  onToggleTextSize,
  onOpenTerminal, 
  onOpenLogin,
  onLogoutAdmin,
  onOpenAdminDeck,
  onShowToast 
}) => {
  const { profile } = config;
  const [liveTime, setLiveTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Manila',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        setLiveTime(`${formatter.format(now)} PST`);
      } catch {
        setLiveTime(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    onShowToast(`Copied to clipboard: ${profile.email}`);
  };

  return (
    <aside className="app-sidebar" id="app-sidebar">
      <div className="sidebar-inner">
        
        {/* Profile Card */}
        <div style={{ textAlign: 'center' }}>
          <div className="sidebar-avatar-wrap">
            <img src={profile.avatarPath} alt={profile.fullName} className="sidebar-avatar" loading="eager" />
            <span className="status-indicator-dot" title="Available for roles"></span>
          </div>

          <div style={{ marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
              <h1 className="sidebar-name">{profile.fullName}</h1>
              {profile.verifiedBadge && (
                <span title="Verified IT Engineer">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#38bdf8">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="m9 12 2 2 4-4" stroke="#090e17" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              )}
            </div>
            <a href="https://github.com/HaxoveloOfficial" target="_blank" rel="noopener noreferrer" className="sidebar-handle">
              {profile.handle}
            </a>
            <div className="sidebar-role">{profile.role}</div>
          </div>

          {/* Accessibility Control Toolbar (Elderly / Low-Vision Friendly) */}
          <div className="accessibility-toolbar" title="Accessibility & Eye-Care Controls">
            <button 
              onClick={onToggleTextSize} 
              className={`a11y-btn ${isLargeText ? 'active' : ''}`}
              title="Toggle Large Font Size (+20%) for Easy Reading"
              aria-label="Toggle Large Font"
            >
              <ZoomIn size={14} />
              <span>{isLargeText ? "Font: Large" : "Font: Normal"}</span>
            </button>

            <button 
              onClick={onToggleTheme} 
              className="a11y-btn" 
              title="Toggle Calm Eye-Care Theme"
              aria-label="Toggle Theme"
            >
              {currentTheme === 'dark' ? <Sun size={14} /> : currentTheme === 'light' ? <Terminal size={14} /> : <Moon size={14} />}
              <span style={{ textTransform: 'capitalize' }}>{currentTheme}</span>
            </button>
          </div>

          {/* Action Row (48px Min Hitboxes) */}
          <div className="sidebar-actions-strip">
            <a href="https://github.com/HaxoveloOfficial" target="_blank" rel="noopener noreferrer" className="icon-btn" title="GitHub Profile">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/john-nigel-landingin" target="_blank" rel="noopener noreferrer" className="icon-btn" title="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <button onClick={handleCopyEmail} className="icon-btn" title="Copy Email">
              <Mail size={18} />
            </button>
            <button onClick={onOpenTerminal} className="icon-btn" title="Open Interactive CLI Shell (~)">
              <Terminal size={18} />
            </button>
          </div>

          {/* Admin Mode Trigger / Status */}
          <div style={{ marginTop: '0.85rem' }}>
            {isAdmin ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <button onClick={onOpenAdminDeck} className="bento-btn bento-btn--sm bento-btn--accent" style={{ width: '100%' }}>
                  <Unlock size={14} />
                  <span>Admin Command Deck</span>
                </button>
                <button onClick={onLogoutAdmin} className="bento-btn bento-btn--sm bento-btn--outline" style={{ width: '100%', fontSize: '0.75rem', minHeight: '34px' }}>
                  <span>Lock Session (Logout)</span>
                </button>
              </div>
            ) : (
              <button onClick={onOpenLogin} className="bento-btn bento-btn--sm bento-btn--ghost" style={{ width: '100%' }}>
                <Lock size={14} color="var(--accent-orange)" />
                <span>Operator Login</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation List */}
        <nav className="sidebar-nav">
          <ul className="sidebar-nav-list">
            <li>
              <a href="#home" className="nav-link active">
                <Cpu size={19} />
                <span>Overview</span>
              </a>
            </li>
            <li>
              <a href="#bento-projects" className="nav-link">
                <Folder size={19} />
                <span>Projects ({config.projects.length})</span>
              </a>
            </li>
            <li>
              <a href="#bento-services" className="nav-link">
                <Layers size={19} />
                <span>Services</span>
              </a>
            </li>
            <li>
              <a href="#bento-credentials" className="nav-link">
                <Award size={19} />
                <span>Credentials</span>
              </a>
            </li>
            <li>
              <a href="#bento-about" className="nav-link">
                <User size={19} />
                <span>About & Bench</span>
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-link">
                <Mail size={19} />
                <span>Contact</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Sidebar Telemetry */}
        <div className="sidebar-telemetry">
          <div className="telemetry-item">
            <span className="telemetry-label">REGIONAL TELEMETRY</span>
            <div className="telemetry-clock">{liveTime || '--:--:-- PST'}</div>
            <div className="telemetry-coord">{profile.coordinates} (Tarlac Depot)</div>
          </div>
          <div className="telemetry-status">
            <span className="status-pulse-dot"></span>
            <span className="status-caption">{isAdmin ? "Admin: Authenticated" : "Public: Guest Safe"}</span>
          </div>
        </div>

      </div>
    </aside>
  );
};
