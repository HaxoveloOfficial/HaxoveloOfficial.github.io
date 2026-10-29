import React from 'react';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';
import { X, ExternalLink, Lock, ShieldCheck, KeyRound } from 'lucide-react';

interface ProjectInspectorModalProps {
  projectId: string | null;
  onClose: () => void;
  isGuest: boolean;
  userName?: string;
  onOpenLogin: () => void;
}

export const ProjectInspectorModal: React.FC<ProjectInspectorModalProps> = ({ 
  projectId, 
  onClose,
  isGuest,
  userName,
  onOpenLogin
}) => {
  if (!projectId) return null;

  const project = PORTFOLIO_CONFIG.projects.find(p => p.id === projectId);
  if (!project) return null;

  return (
    <div className="cli-backdrop" onClick={onClose} style={{ zIndex: 300 }}>
      <div 
        className="spec-modal-box" 
        onClick={(e) => e.stopPropagation()} 
        style={{ border: '2px solid var(--border-color)', maxWidth: '780px' }}
      >
        <div className="spec-modal-head" style={{ borderBottom: '2px solid var(--border-color)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <span className="spec-modal-badge" style={{ color: 'var(--accent-orange)' }}>
                {project.tag} // ARCHITECTURE INSPECTOR
              </span>
              {!isGuest ? (
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'var(--accent-blue-dim)', color: 'var(--accent-blue)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <ShieldCheck size={12} />
                  <span>UNLOCKED: @{userName || 'Operator'}</span>
                </span>
              ) : (
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Lock size={12} />
                  <span>GUEST MODE: LIMITED ACCESS</span>
                </span>
              )}
            </div>
            <h3 className="spec-modal-title" style={{ fontSize: '1.4rem', fontWeight: 800 }}>{project.title}</h3>
          </div>
          <button onClick={onClose} className="spec-modal-close" aria-label="Close Inspector" style={{ minWidth: '40px', minHeight: '40px' }}>
            <X size={20} />
          </button>
        </div>

        <div className="spec-modal-body" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Section 1: The Problem (Publicly visible to all) */}
          <div>
            <h4 style={{ color: 'var(--accent-orange)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>The Operational Bottleneck</span>
            </h4>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              {project.deepDive.problem}
            </p>
          </div>

          {/* Section 2: Technical Architecture & Code Blueprints */}
          {isGuest ? (
            <div style={{
              padding: '1.75rem',
              borderRadius: 'var(--radius-md)',
              border: '2px solid var(--accent-orange)',
              backgroundColor: 'var(--bg-card-sub)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-orange)' }}>
                <Lock size={22} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                  TECHNICAL ARCHITECTURE & REPO ACCESS RESTRICTED
                </h4>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                Internal database relational schemas, offline-first C# state management, and source code blueprints are restricted to authenticated operators and verified Gmail accounts.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                <button 
                  onClick={() => {
                    onClose();
                    onOpenLogin();
                  }}
                  className="bento-btn bento-btn--accent"
                  style={{ minHeight: '44px' }}
                >
                  <KeyRound size={16} />
                  <span>Sign In or Create Account to Unlock</span>
                </button>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                  (Free Gmail OTP verification)
                </span>
              </div>
            </div>
          ) : (
            <>
              <div>
                <h4 style={{ color: 'var(--accent-blue)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Technical Architecture & Solution Blueprint
                </h4>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                  {project.deepDive.solution}
                </p>
              </div>

              <div>
                <h4 style={{ color: 'var(--accent-yellow)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Verified Technology Stack
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.techStack.map((tech, i) => (
                    <span 
                      key={i} 
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--bg-card-sub)',
                        border: '1px solid var(--border-color)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.85rem',
                        color: 'var(--text-main)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ color: 'var(--text-main)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Source Code & Version Control
                </h4>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                  Public repository available at:
                </p>
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--accent-blue)', 
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--accent-blue)',
                    backgroundColor: 'var(--accent-blue-dim)'
                  }}
                >
                  <ExternalLink size={16} />
                  <span>{project.githubUrl}</span>
                </a>
              </div>
            </>
          )}

        </div>

        <div className="spec-modal-foot" style={{ borderTop: '2px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {!isGuest ? (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bento-btn bento-btn--accent bento-btn--sm"
            >
              <ExternalLink size={15} />
              <span>Open Verified GitHub Repository</span>
            </a>
          ) : (
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
              🔒 Limited Guest View
            </span>
          )}
          <button onClick={onClose} className="bento-btn bento-btn--outline bento-btn--sm">
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
