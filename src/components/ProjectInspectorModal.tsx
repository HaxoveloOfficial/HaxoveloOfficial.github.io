import React from 'react';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';
import { X, ExternalLink } from 'lucide-react';

interface ProjectInspectorModalProps {
  projectId: string | null;
  onClose: () => void;
}

export const ProjectInspectorModal: React.FC<ProjectInspectorModalProps> = ({ projectId, onClose }) => {
  if (!projectId) return null;

  const project = PORTFOLIO_CONFIG.projects.find(p => p.id === projectId);
  if (!project) return null;

  return (
    <div className="cli-backdrop" onClick={onClose}>
      <div className="spec-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="spec-modal-head">
          <div>
            <span className="spec-modal-badge">{project.tag} // ARCHITECTURE INSPECTOR</span>
            <h3 className="spec-modal-title">{project.title}</h3>
          </div>
          <button onClick={onClose} className="spec-modal-close" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="spec-modal-body">
          <h4>The Operational Bottleneck</h4>
          <p>{project.deepDive.problem}</p>

          <h4>Technical Architecture & Solution</h4>
          <p>{project.deepDive.solution}</p>

          <h4>Verified Technology Stack</h4>
          <ul>
            {project.techStack.map((tech, i) => (
              <li key={i}><code>{tech}</code></li>
            ))}
          </ul>

          <h4>Source Code Verification</h4>
          <p>
            Public code repository available at: <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>{project.githubUrl}</a>
          </p>
        </div>

        <div className="spec-modal-foot">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="bento-btn bento-btn--sm bento-btn--accent" style={{ marginRight: 'auto' }}>
            <ExternalLink size={14} />
            <span>Open GitHub</span>
          </a>
          <button onClick={onClose} className="bento-btn bento-btn--sm bento-btn--outline">
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
