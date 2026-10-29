import React from 'react';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';
import { Folder, User, Box, Award, Layers, Terminal, ExternalLink, Code } from 'lucide-react';

interface BentoGridProps {
  onOpenProject: (projectId: string) => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ onOpenProject }) => {
  const { projects, services, credentials } = PORTFOLIO_CONFIG;
  const capstone = projects.find(p => p.id === 'logistics');

  return (
    <section className="bento-grid" aria-label="Portfolio Bento Matrix">
      
      {/* 1. Flagship Capstone Project Card (2 columns) */}
      {capstone && (
        <article className="bento-card bento-card--featured" id="bento-projects">
          <div className="bento-card__head">
            <div className="bento-tag-wrap">
              <span className="bento-card-icon">
                <Folder size={16} />
              </span>
              <span className="bento-card-title">PROJECTS</span>
            </div>
            <span className="bento-badge bento-badge--accent">{capstone.tag}</span>
          </div>

          <p className="bento-card-sub">
            Mission-critical systems built to eliminate operational downtime.
          </p>

          <div className="featured-project-inner">
            <div>
              <h3 className="featured-title">{capstone.title}</h3>
              <p className="featured-desc">{capstone.description}</p>
              
              <div className="featured-tags">
                {capstone.techStack.map((tech, i) => (
                  <span key={i}>{tech}</span>
                ))}
              </div>

              <div className="project-actions-row">
                <a 
                  href={capstone.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bento-btn bento-btn--sm bento-btn--accent"
                >
                  <ExternalLink size={14} />
                  <span>GitHub Repository</span>
                </a>
                <button 
                  onClick={() => onOpenProject(capstone.id)} 
                  className="bento-btn bento-btn--sm bento-btn--outline"
                >
                  <Code size={14} />
                  <span>Architecture Deep Dive</span>
                </button>
              </div>
            </div>

            <div>
              <div className="terminal-preview-window">
                <div className="window-bar">
                  <span className="win-dot red"></span>
                  <span className="win-dot yellow"></span>
                  <span className="win-dot green"></span>
                  <span className="win-title">delivery_dispatcher.cs</span>
                </div>
                <div className="code-preview">
                  <div className="code-line"><span className="c-keyword">public async Task</span>&lt;Manifest&gt; <span className="c-method">DispatchFreight</span>()</div>
                  <div className="code-line">&nbsp;&nbsp;VerifyLocalDatabaseIntegrity();</div>
                  <div className="code-line">&nbsp;&nbsp;<span className="c-comment">// Zero network dependency mode</span></div>
                  <div className="code-line">&nbsp;&nbsp;<span className="c-keyword">var</span> manifest = CalculateFreightTolls();</div>
                  <div className="code-line">&nbsp;&nbsp;<span className="c-keyword">return</span> manifest.CommitAtomic();</div>
                </div>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* 2. About Card */}
      <article className="bento-card" id="bento-about">
        <div className="bento-card__head">
          <div className="bento-tag-wrap">
            <span className="bento-card-icon">
              <User size={16} />
            </span>
            <span className="bento-card-title">ABOUT</span>
          </div>
        </div>
        <p className="bento-card-sub">Engineering philosophy & physical ground truth.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            I am an Information Technology graduate from <strong>STI College Tarlac</strong>. I focus on software that survives the real world: offline desktop architectures, relational databases, real-time 3D models, and physical PC hardware.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.35rem', fontWeight: 700 }}>486</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>OJT Hours</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.35rem', fontWeight: 700 }}>STI</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>BS IT 2026</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.35rem', fontWeight: 700 }}>100%</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Hardware Fluency</div>
            </div>
          </div>
        </div>
      </article>

      {/* 3. 3D & Interactive Media (Hexatronics) */}
      <article className="bento-card">
        <div className="bento-card__head">
          <div className="bento-tag-wrap">
            <span className="bento-card-icon">
              <Box size={16} />
            </span>
            <span className="bento-card-title">3D & INTERACTIVE BUILDS</span>
          </div>
          <span className="bento-badge">HEXATRONICS INC.</span>
        </div>
        <p className="bento-card-sub">Real-time simulation, camera physics & optimization.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h4 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Interactive 3D Product Showcase</h4>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
            Authored in Unity 3D with C# scripts governing virtual camera orbits, part dissections, and PBR shaders for enterprise hardware demonstrations.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', margin: '0.5rem 0 1rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'var(--bg-card-sub)', border: '1px solid var(--border-color)', borderRadius: '4px' }}>Unity 3D Engine</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'var(--bg-card-sub)', border: '1px solid var(--border-color)', borderRadius: '4px' }}>C# Physics</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'var(--bg-card-sub)', border: '1px solid var(--border-color)', borderRadius: '4px' }}>PBR Shaders</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'var(--bg-card-sub)', border: '1px solid var(--border-color)', borderRadius: '4px' }}>60 FPS Optimized</span>
          </div>
          <button onClick={() => onOpenProject('hexatronics')} className="bento-btn bento-btn--sm bento-btn--ghost">
            <span>View 3D Pipeline Details</span>
          </button>
        </div>
      </article>

      {/* 4. Credentials & Degrees */}
      <article className="bento-card" id="bento-credentials">
        <div className="bento-card__head">
          <div className="bento-tag-wrap">
            <span className="bento-card-icon">
              <Award size={16} />
            </span>
            <span className="bento-card-title">CREDENTIALS</span>
          </div>
          <span className="bento-badge">ACCREDITED</span>
        </div>
        <p className="bento-card-sub">Formal education, vendor certificates, and enterprise hours.</p>

        <div className="credentials-bento-list">
          {credentials.map((cred, i) => (
            <div key={i} className="cred-row-item">
              <div className="cred-row-info">
                <span className="cred-row-title">{cred.title}</span>
                <span className="cred-row-sub">{cred.issuer} • {cred.year}</span>
              </div>
              <span className="cred-pill">{cred.badge}</span>
            </div>
          ))}
        </div>
      </article>

      {/* 5. Services (Numbered List) */}
      <article className="bento-card" id="bento-services">
        <div className="bento-card__head">
          <div className="bento-tag-wrap">
            <span className="bento-card-icon">
              <Layers size={16} />
            </span>
            <span className="bento-card-title">SERVICES</span>
          </div>
        </div>
        <p className="bento-card-sub">What I construct and deploy for teams.</p>

        <ol className="services-bento-list">
          {services.map((serv, i) => (
            <li key={i} className="service-row">
              <div className="service-row-left">
                <span className="service-name">{serv.name}</span>
                <span className="service-desc">{serv.desc}</span>
              </div>
              <span className="service-num">{serv.num}</span>
            </li>
          ))}
        </ol>
      </article>

      {/* 6. Field Bench & LGU Operations */}
      <article className="bento-card">
        <div className="bento-card__head">
          <div className="bento-tag-wrap">
            <span className="bento-card-icon">
              <Terminal size={16} />
            </span>
            <span className="bento-card-title">FIELD OPERATIONS</span>
          </div>
          <span className="bento-badge">PUBLIC SECTOR</span>
        </div>
        <p className="bento-card-sub">Municipal records verification & workstation deployment.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '0.85rem 1rem', background: 'var(--bg-card-sub)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.35rem' }}>
              City of Tarlac PESO & Brgy. Balete
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Managed workstation health, OS troubleshooting, and high-volume data verification for citizen welfare programs (4Ps) with <strong>zero data loss</strong>.
            </p>
          </div>
          <button onClick={() => onOpenProject('municipal')} className="bento-btn bento-btn--sm bento-btn--ghost">
            <span>View Municipal Pipeline Notes</span>
          </button>
        </div>
      </article>

    </section>
  );
};
