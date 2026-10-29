import React, { useState } from 'react';
import { PortfolioConfig } from '../types/portfolio';
import { Folder, Box, Layers, Terminal, ExternalLink, Code, Network, Landmark, Car } from 'lucide-react';

interface BentoGridProps {
  config: PortfolioConfig;
  onOpenProject: (projectId: string) => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ config, onOpenProject }) => {
  const { projects } = config;
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
    <section className="bento-grid" aria-label="Portfolio Bento Matrix" id="bento-projects">
      
      {/* 1. Flagship Capstone Project Card (2 columns) */}
      {capstone && (
        <article className="bento-card bento-card--featured" style={{ gridColumn: '1 / -1' }}>
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

    </section>
  );
};
