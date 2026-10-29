import React, { useState } from 'react';
import { PortfolioConfig } from '../types/portfolio';
import { Folder, User, Box, Award, Layers, Terminal, ExternalLink, Code, Network, Landmark, Car } from 'lucide-react';

interface BentoGridProps {
  config: PortfolioConfig;
  onOpenProject: (projectId: string) => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ config, onOpenProject }) => {
  const { projects, services, credentials } = config;
  const [filter, setFilter] = useState<string>('all');

  const capstone = projects.find(p => p.id === 'logistics');

  // Filter projects dynamically
  const filteredProjects = projects.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'desktop') return p.id === 'logistics' || p.id === 'microfinance';
    if (filter === '3d') return p.id === 'hexatronics' || p.id === 'nfs-garage';
    if (filter === 'enterprise') return p.id === 'archimate' || p.id === 'municipal';
    if (filter === 'network') return p.id === 'datacom';
    return true;
  });

  return (
    <section className="bento-grid" aria-label="Portfolio Bento Matrix">
      
      {/* 1. Flagship Capstone Project Card (2 columns) */}
      {capstone && (
        <article className="bento-card bento-card--featured" id="bento-projects">
          <div className="bento-card__head">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ color: 'var(--accent-orange)' }}>
                <Folder size={20} />
              </span>
              <span className="bento-card-title">PRIMARY ARCHITECTURE</span>
            </div>
            <span className="bento-badge" style={{ background: 'var(--accent-orange-dim)', borderColor: 'var(--accent-orange)', color: 'var(--accent-orange)' }}>
              {capstone.tag}
            </span>
          </div>

          <h3 className="featured-title" style={{ fontSize: '1.75rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="gradient-text">{capstone.title}</span>
          </h3>
          <p className="featured-desc" style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
            {capstone.description}
          </p>

          <div className="featured-project-inner" style={{ marginTop: '1.25rem' }}>
            <div>
              <div className="featured-tags">
                {capstone.techStack.map((tech, i) => (
                  <span key={i} style={{ border: '1px solid var(--accent-blue)', color: 'var(--accent-blue)' }}>{tech}</span>
                ))}
              </div>

              <div className="project-actions-row">
                <a 
                  href={capstone.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bento-btn bento-btn--accent"
                >
                  <ExternalLink size={16} />
                  <span>Public GitHub Repo</span>
                </a>
                <button 
                  onClick={() => onOpenProject(capstone.id)} 
                  className="bento-btn bento-btn--outline"
                >
                  <Code size={16} />
                  <span>Architecture Deep Dive</span>
                </button>
              </div>
            </div>

            <div>
              <div className="terminal-preview-window" style={{ border: '2px solid var(--border-color)' }}>
                <div className="window-bar" style={{ background: 'var(--bg-card-sub)' }}>
                  <span className="win-dot red"></span>
                  <span className="win-dot yellow"></span>
                  <span className="win-dot green"></span>
                  <span className="win-title" style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>depot_dispatch.cs</span>
                </div>
                <div className="code-preview" style={{ fontSize: '0.85rem' }}>
                  <div className="code-line"><span style={{ color: 'var(--accent-orange)' }}>public async Task</span>&lt;Manifest&gt; <span style={{ color: 'var(--accent-blue)' }}>DispatchFreight</span>()</div>
                  <div className="code-line">&nbsp;&nbsp;VerifyLocalDatabaseIntegrity();</div>
                  <div className="code-line">&nbsp;&nbsp;<span style={{ color: 'var(--accent-yellow)', fontStyle: 'italic' }}>// Zero internet outage dependency</span></div>
                  <div className="code-line">&nbsp;&nbsp;<span style={{ color: 'var(--accent-orange)' }}>var</span> manifest = CalculateFreightTolls();</div>
                  <div className="code-line">&nbsp;&nbsp;<span style={{ color: 'var(--accent-orange)' }}>return</span> manifest.CommitAtomic();</div>
                </div>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* 2. Project Filter Tabs Bar (Full Width) */}
      <div style={{ gridColumn: '1 / -1' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Engineered Works & Repositories</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
              Explore desktop software, 3D simulations, enterprise models, and public records pipelines.
            </p>
          </div>
          <div className="filter-tabs-row" style={{ marginBottom: 0 }}>
            <button onClick={() => setFilter('all')} className={`filter-pill ${filter === 'all' ? 'active' : ''}`}>All ({projects.length})</button>
            <button onClick={() => setFilter('desktop')} className={`filter-pill ${filter === 'desktop' ? 'active' : ''}`}>Desktop & Banking</button>
            <button onClick={() => setFilter('3d')} className={`filter-pill ${filter === '3d' ? 'active' : ''}`}>3D & Simulation</button>
            <button onClick={() => setFilter('enterprise')} className={`filter-pill ${filter === 'enterprise' ? 'active' : ''}`}>Enterprise & Gov</button>
            <button onClick={() => setFilter('network')} className={`filter-pill ${filter === 'network' ? 'active' : ''}`}>Networking</button>
          </div>
        </div>
      </div>

      {/* Dynamic Projects Grid */}
      {filteredProjects.filter(p => p.id !== 'logistics').map((proj) => (
        <article key={proj.id} className="bento-card">
          <div className="bento-card__head">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ color: 'var(--accent-blue)' }}>
                {proj.id === 'hexatronics' && <Box size={20} />}
                {proj.id === 'archimate' && <Layers size={20} />}
                {proj.id === 'microfinance' && <Landmark size={20} />}
                {proj.id === 'datacom' && <Network size={20} />}
                {proj.id === 'municipal' && <Terminal size={20} />}
                {proj.id === 'nfs-garage' && <Car size={20} />}
              </span>
              <span className="bento-card-title">{proj.tag}</span>
            </div>
            <span className="bento-badge">{proj.demoBadge}</span>
          </div>

          <h4 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0.4rem 0' }}>{proj.title}</h4>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1, marginBottom: '1.25rem' }}>
            {proj.description}
          </p>

          <div className="featured-tags" style={{ marginBottom: '1.25rem' }}>
            {proj.techStack.map((tech, i) => (
              <span key={i}>{tech}</span>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <a 
              href={proj.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bento-btn bento-btn--sm bento-btn--outline"
            >
              <ExternalLink size={14} />
              <span>GitHub</span>
            </a>
            <button 
              onClick={() => onOpenProject(proj.id)} 
              className="bento-btn bento-btn--sm bento-btn--ghost"
            >
              <Code size={14} />
              <span>Technical Notes</span>
            </button>
          </div>
        </article>
      ))}

      {/* 3. About & Physical Grounding Card */}
      <article className="bento-card" id="bento-about">
        <div className="bento-card__head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ color: 'var(--accent-yellow)' }}>
              <User size={20} />
            </span>
            <span className="bento-card-title">ABOUT & GROUND TRUTH</span>
          </div>
        </div>
        <p className="bento-card-sub">Engineering philosophy & physical hardware context.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            I am an Information Technology graduate from <strong>STI College Tarlac</strong>. I focus on software that survives the real world: offline desktop architectures, relational databases, real-time 3D models, and physical PC hardware.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', paddingTop: '1.25rem', borderTop: '2px solid var(--border-color)' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-orange)' }}>486</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>OJT Hours</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-yellow)' }}>STI</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>BS IT 2026</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-blue)' }}>100%</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Hardware Fluency</div>
            </div>
          </div>
        </div>
      </article>

      {/* 4. Credentials & Degrees Card */}
      <article className="bento-card" id="bento-credentials">
        <div className="bento-card__head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ color: 'var(--accent-yellow)' }}>
              <Award size={20} />
            </span>
            <span className="bento-card-title">CREDENTIALS</span>
          </div>
          <span className="bento-badge" style={{ color: 'var(--accent-yellow)' }}>VERIFIED</span>
        </div>
        <p className="bento-card-sub">Formal degree, vendor certificates, and enterprise hours.</p>

        <div className="credentials-bento-list">
          {credentials.map((cred, i) => (
            <div key={i} className="cred-row-item" style={{ border: '2px solid var(--border-color)' }}>
              <div className="cred-row-info">
                <span className="cred-row-title" style={{ fontSize: '0.95rem' }}>{cred.title}</span>
                <span className="cred-row-sub" style={{ fontSize: '0.8rem' }}>{cred.issuer} • {cred.year}</span>
              </div>
              <span className="cred-pill" style={{ background: 'var(--accent-yellow-dim)', color: 'var(--accent-yellow)' }}>{cred.badge}</span>
            </div>
          ))}
        </div>
      </article>

      {/* 5. Services & Capabilities Card */}
      <article className="bento-card" id="bento-services">
        <div className="bento-card__head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ color: 'var(--accent-blue)' }}>
              <Layers size={20} />
            </span>
            <span className="bento-card-title">CAPABILITIES & SERVICES</span>
          </div>
        </div>
        <p className="bento-card-sub">What I construct, engineer, and deploy for enterprise teams.</p>

        <ol className="services-bento-list">
          {services.map((serv, i) => (
            <li key={i} className="service-row" style={{ borderBottom: '2px solid var(--border-color)' }}>
              <div className="service-row-left">
                <span className="service-name" style={{ fontSize: '1.05rem' }}>{serv.name}</span>
                <span className="service-desc" style={{ fontSize: '0.85rem' }}>{serv.desc}</span>
              </div>
              <span className="service-num" style={{ color: 'var(--accent-blue)' }}>{serv.num}</span>
            </li>
          ))}
        </ol>
      </article>

      {/* 6. Hardware Bench Diagnostics */}
      <article className="bento-card">
        <div className="bento-card__head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ color: 'var(--accent-orange)' }}>
              <Terminal size={20} />
            </span>
            <span className="bento-card-title">PHYSICAL HARDWARE BENCH</span>
          </div>
          <span className="bento-badge" style={{ color: 'var(--accent-orange)' }}>BENCH LAB</span>
        </div>
        <p className="bento-card-sub">Motherboard diagnostics, POST troubleshooting, thermal paste & LAN cabling.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--bg-card-sub)', border: '2px solid var(--border-color)', borderRadius: '14px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-orange)', marginBottom: '0.35rem' }}>
              Component Seating & Multimeter Testing
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Hands-on diagnostic methodology: CPU pin inspection, memory channel POST troubleshooting, thermal cycle monitoring, and RJ45 (T568B) structured cabling termination.
            </p>
          </div>
        </div>
      </article>

    </section>
  );
};
