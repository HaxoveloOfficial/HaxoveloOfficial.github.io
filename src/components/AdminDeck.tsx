import React, { useState, useEffect } from 'react';
import { X, Save, Copy, Plus, Sliders, Lock, Users, Trash2 } from 'lucide-react';
import { PortfolioConfig, ProjectItem, RegisteredAccount } from '../types/portfolio';

interface AdminDeckProps {
  isOpen: boolean;
  onClose: () => void;
  config: PortfolioConfig;
  onUpdateConfig: (newConfig: PortfolioConfig) => void;
  onLogout: () => void;
  onShowToast: (msg: string) => void;
}

export const AdminDeck: React.FC<AdminDeckProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  onLogout,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'projects' | 'snippets' | 'accounts'>('content');
  
  // Local editable form states
  const [fullName, setFullName] = useState(config.profile.fullName);
  const [role, setRole] = useState(config.profile.role);
  const [statusText, setStatusText] = useState(config.profile.statusText);
  const [heroTitle, setHeroTitle] = useState(config.hero.title);
  const [heroSub, setHeroSub] = useState(config.hero.subtitle);

  // New Project Form
  const [newTitle, setNewTitle] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTech, setNewTech] = useState('');
  const [newUrl, setNewUrl] = useState('');

  // Registered accounts state
  const [accounts, setAccounts] = useState<RegisteredAccount[]>([]);

  useEffect(() => {
    if (isOpen) {
      try {
        const raw = localStorage.getItem('jnl_registered_accounts');
        if (raw) {
          setAccounts(JSON.parse(raw));
        } else {
          setAccounts([]);
        }
      } catch {
        setAccounts([]);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: PortfolioConfig = {
      ...config,
      profile: {
        ...config.profile,
        fullName,
        role,
        statusText
      },
      hero: {
        ...config.hero,
        title: heroTitle,
        subtitle: heroSub
      }
    };
    onUpdateConfig(updated);
    onShowToast("Changes applied live to your dashboard!");
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: newTitle.trim(),
      tag: newTag.trim() || 'CUSTOM PROJECT',
      description: newDesc.trim() || 'Custom engineered feature module.',
      techStack: newTech.split(',').map(s => s.trim()).filter(Boolean),
      githubUrl: newUrl.trim() || 'https://github.com/HaxoveloOfficial',
      demoBadge: 'Admin Added',
      deepDive: {
        problem: 'Operational enhancement.',
        solution: 'Custom scalable implementation.'
      }
    };

    const updated: PortfolioConfig = {
      ...config,
      projects: [newProj, ...config.projects]
    };

    onUpdateConfig(updated);
    onShowToast(`Added project: ${newTitle}`);
    setNewTitle('');
    setNewTag('');
    setNewDesc('');
    setNewTech('');
    setNewUrl('');
  };

  const handleCopyConfig = () => {
    const jsonStr = JSON.stringify(config, null, 2);
    navigator.clipboard.writeText(`export const PORTFOLIO_CONFIG = ${jsonStr};`);
    onShowToast("Copied full configuration JSON to clipboard!");
  };

  const handleDeleteAccount = (username: string) => {
    const updated = accounts.filter(a => a.username !== username);
    setAccounts(updated);
    localStorage.setItem('jnl_registered_accounts', JSON.stringify(updated));
    onShowToast(`Account @${username} removed.`);
  };

  const copySnippet = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    onShowToast(`Copied ${label} snippet to clipboard!`);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 900 }}>
      <div className="modal-card modal-card--lg" onClick={(e) => e.stopPropagation()} style={{ border: '2px solid var(--accent-orange)' }}>
        {/* Head */}
        <div className="modal-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Sliders size={22} color="var(--accent-orange)" />
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Master Admin Command Deck</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                Authenticated Operator Session // Scalable Configuration & Future Modules
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button onClick={onLogout} className="bento-btn bento-btn--sm bento-btn--outline" title="Lock and return to Guest Mode">
              <Lock size={14} />
              <span>Lock Session</span>
            </button>
            <button onClick={onClose} className="icon-btn" style={{ minWidth: '40px', minHeight: '40px' }} aria-label="Close">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div style={{ display: 'flex', flexWrap: 'wrap', borderBottom: '2px solid var(--border-color)', background: 'var(--bg-card-sub)', padding: '0 1rem' }}>
          <button 
            onClick={() => setActiveTab('content')} 
            className={`filter-pill ${activeTab === 'content' ? 'active' : ''}`}
            style={{ borderRadius: '0', borderBottom: 'none', minHeight: '48px' }}
          >
            Live Content Editor
          </button>
          <button 
            onClick={() => setActiveTab('projects')} 
            className={`filter-pill ${activeTab === 'projects' ? 'active' : ''}`}
            style={{ borderRadius: '0', borderBottom: 'none', minHeight: '48px' }}
          >
            Add New Project
          </button>
          <button 
            onClick={() => setActiveTab('accounts')} 
            className={`filter-pill ${activeTab === 'accounts' ? 'active' : ''}`}
            style={{ borderRadius: '0', borderBottom: 'none', minHeight: '48px' }}
          >
            Verified Accounts ({accounts.length})
          </button>
          <button 
            onClick={() => setActiveTab('snippets')} 
            className={`filter-pill ${activeTab === 'snippets' ? 'active' : ''}`}
            style={{ borderRadius: '0', borderBottom: 'none', minHeight: '48px' }}
          >
            Copy-Paste Scalability Snippets
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Tab 1: Live Content Editor */}
          {activeTab === 'content' && (
            <form onSubmit={handleSaveContent} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="admin-input-group">
                <label className="admin-label">Full Name:</label>
                <input className="admin-input" value={fullName} onChange={e => setFullName(e.target.value)} />
              </div>

              <div className="admin-input-group">
                <label className="admin-label">Professional Role / Title:</label>
                <input className="admin-input" value={role} onChange={e => setRole(e.target.value)} />
              </div>

              <div className="admin-input-group">
                <label className="admin-label">Status Availability:</label>
                <input className="admin-input" value={statusText} onChange={e => setStatusText(e.target.value)} />
              </div>

              <div className="admin-input-group">
                <label className="admin-label">Hero Headline:</label>
                <input className="admin-input" value={heroTitle} onChange={e => setHeroTitle(e.target.value)} />
              </div>

              <div className="admin-input-group">
                <label className="admin-label">Hero Subtitle:</label>
                <textarea className="admin-textarea" value={heroSub} onChange={e => setHeroSub(e.target.value)} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" className="bento-btn bento-btn--accent">
                  <Save size={16} />
                  <span>Apply Changes Live</span>
                </button>
              </div>
            </form>
          )}

          {/* Tab 2: Add Project Form */}
          {activeTab === 'projects' && (
            <form onSubmit={handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Add a new project directly to your live portfolio grid.
              </p>

              <div className="admin-input-group">
                <label className="admin-label">Project Title:</label>
                <input className="admin-input" placeholder="e.g. Distributed Database Clustering" value={newTitle} onChange={e => setNewTitle(e.target.value)} required />
              </div>

              <div className="admin-input-group">
                <label className="admin-label">Category / Badge Tag:</label>
                <input className="admin-input" placeholder="e.g. DISTRIBUTED SYSTEMS" value={newTag} onChange={e => setNewTag(e.target.value)} />
              </div>

              <div className="admin-input-group">
                <label className="admin-label">Description:</label>
                <textarea className="admin-textarea" placeholder="Describe the problem solved and architecture..." value={newDesc} onChange={e => setNewDesc(e.target.value)} />
              </div>

              <div className="admin-input-group">
                <label className="admin-label">Tech Stack (comma separated):</label>
                <input className="admin-input" placeholder="e.g. C#, .NET, Redis, Docker" value={newTech} onChange={e => setNewTech(e.target.value)} />
              </div>

              <div className="admin-input-group">
                <label className="admin-label">GitHub URL:</label>
                <input className="admin-input" placeholder="https://github.com/HaxoveloOfficial/..." value={newUrl} onChange={e => setNewUrl(e.target.value)} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button type="submit" className="bento-btn bento-btn--accent">
                  <Plus size={16} />
                  <span>Insert Project into Grid</span>
                </button>
              </div>
            </form>
          )}

          {/* Tab 3: Verified Accounts Management */}
          {activeTab === 'accounts' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Verified User Accounts (Gmail OTP)</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Accounts created and authorized through Gmail OTP verification on this depot.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                  <Users size={16} />
                  <span>{accounts.length} Registered</span>
                </div>
              </div>

              {accounts.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--bg-card-sub)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-color)', color: 'var(--text-dim)' }}>
                  No guest accounts created yet. New accounts registered via Gmail OTP will appear here.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {accounts.map((acc, idx) => (
                    <div 
                      key={idx}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-card-sub)',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '1rem' }}>
                          @{acc.username}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                          {acc.email} • Registered {new Date(acc.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDeleteAccount(acc.username)}
                        className="icon-btn"
                        style={{ color: '#ef4444', borderColor: '#ef4444' }}
                        title="Remove Account Authority"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Copy-Paste Scalability Snippets */}
          {activeTab === 'snippets' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>Export Live Configuration</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Copy your full updated data object so you can paste it directly into <code>src/config/portfolio.config.ts</code> whenever you want to permanently commit edits.
                </p>
                <button onClick={handleCopyConfig} className="bento-btn bento-btn--accent">
                  <Copy size={16} />
                  <span>Copy Config JSON to Clipboard</span>
                </button>
              </div>

              {/* Snippet A: Reusable Bento Card */}
              <div style={{ borderTop: '2px solid var(--border-color)', paddingTop: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Snippet 1: Reusable Eye-Care Bento Card</h4>
                  <button 
                    onClick={() => copySnippet(`<article className="bento-card">
  <div className="bento-card__head">
    <span className="bento-card-title">NEW SYSTEM MODULE</span>
    <span className="bento-badge">SCALE</span>
  </div>
  <p className="bento-card-sub">Module description and operational details.</p>
</article>`, 'Bento Card')}
                    className="bento-btn bento-btn--sm bento-btn--outline"
                  >
                    <Copy size={14} />
                    <span>Copy Snippet</span>
                  </button>
                </div>
                <pre style={{ padding: '0.85rem', background: '#090e17', border: '1px solid var(--border-color)', borderRadius: '8px', overflowX: 'auto', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)' }}>
{`<article className="bento-card">
  <div className="bento-card__head">
    <span className="bento-card-title">NEW SYSTEM MODULE</span>
    <span className="bento-badge">SCALE</span>
  </div>
  <p className="bento-card-sub">Module description and operational details.</p>
</article>`}
                </pre>
              </div>

              {/* Snippet B: Daily Driver Item */}
              <div style={{ borderTop: '2px solid var(--border-color)', paddingTop: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Snippet 2: Daily Driver Skill Object</h4>
                  <button 
                    onClick={() => copySnippet(`{ name: "Docker & Containerization", tag: "DevOps & Deployment" },`, 'Daily Driver')}
                    className="bento-btn bento-btn--sm bento-btn--outline"
                  >
                    <Copy size={14} />
                    <span>Copy Snippet</span>
                  </button>
                </div>
                <pre style={{ padding: '0.85rem', background: '#090e17', border: '1px solid var(--border-color)', borderRadius: '8px', overflowX: 'auto', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-yellow)' }}>
{`{ name: "Docker & Containerization", tag: "DevOps & Deployment" },`}
                </pre>
              </div>

              {/* Snippet C: Full Project Item */}
              <div style={{ borderTop: '2px solid var(--border-color)', paddingTop: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Snippet 3: Complete Project Configuration Schema</h4>
                  <button 
                    onClick={() => copySnippet(`{
  id: "my-new-system",
  tag: "DISTRIBUTED ARCHITECTURE",
  title: "Next-Gen System Project",
  description: "Offline-capable distributed architecture with transactional consistency.",
  techStack: ["C#", ".NET 8", "PostgreSQL", "Docker"],
  githubUrl: "https://github.com/HaxoveloOfficial/new-system",
  demoBadge: "Production Ready",
  deepDive: {
    problem: "Data synchronization issues across disconnected networks.",
    solution: "Implemented event-sourcing and local write-ahead log replication."
  }
},`, 'Project Schema')}
                    className="bento-btn bento-btn--sm bento-btn--outline"
                  >
                    <Copy size={14} />
                    <span>Copy Snippet</span>
                  </button>
                </div>
                <pre style={{ padding: '0.85rem', background: '#090e17', border: '1px solid var(--border-color)', borderRadius: '8px', overflowX: 'auto', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-orange)' }}>
{`{
  id: "my-new-system",
  tag: "DISTRIBUTED ARCHITECTURE",
  title: "Next-Gen System Project",
  description: "Offline-capable distributed architecture with transactional consistency.",
  techStack: ["C#", ".NET 8", "PostgreSQL", "Docker"],
  githubUrl: "https://github.com/HaxoveloOfficial/new-system",
  demoBadge: "Production Ready",
  deepDive: {
    problem: "Data synchronization issues across disconnected networks.",
    solution: "Implemented event-sourcing and local write-ahead log replication."
  }
},`}
                </pre>
              </div>

            </div>
          )}
        </div>

        {/* Foot */}
        <div className="modal-foot">
          <button onClick={onClose} className="bento-btn bento-btn--outline">
            Close Deck
          </button>
        </div>
      </div>
    </div>
  );
};
