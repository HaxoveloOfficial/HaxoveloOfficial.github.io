import React from 'react';
import { PortfolioConfig } from '../types/portfolio';
import { User, Award, Layers, Terminal, ShieldCheck, Wrench } from 'lucide-react';

interface BentoServicesMatrixProps {
  config: PortfolioConfig;
  onShowToast?: (msg: string) => void;
}

export const BentoServicesMatrix: React.FC<BentoServicesMatrixProps> = ({ config, onShowToast }) => {
  const { services, credentials } = config;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    if (onShowToast) onShowToast(`Copied ${label}: ${text}`);
  };

  return (
    <section className="bento-grid" aria-label="Credentials, Services and Bench Matrix" style={{ marginTop: '1.75rem' }}>
      
      {/* 1. About & Physical Grounding Card */}
      <article className="bento-card" id="bento-about">
        <div className="bento-card__head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ color: 'var(--accent-yellow)' }}>
              <User size={20} />
            </span>
            <span className="bento-card-title">ABOUT & GROUND TRUTH</span>
          </div>
          <span className="bento-badge" style={{ color: 'var(--accent-yellow)', borderColor: 'var(--accent-yellow)' }}>
            STI TARLAC 2026
          </span>
        </div>
        <p className="bento-card-sub">Engineering philosophy & physical hardware context.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            I am an Information Technology graduate from <strong>STI College Tarlac</strong>. I focus on software that survives the real world: offline desktop architectures, relational databases, real-time 3D models, and physical PC hardware.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', paddingTop: '1.25rem', borderTop: '2px solid var(--border-color)' }}>
            <div 
              style={{ cursor: 'pointer' }}
              onClick={() => handleCopy("486 OJT Hours at Hexatronics Inc.", "Metric")}
              title="Click to copy"
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-orange)' }}>486</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>OJT Hours</div>
            </div>
            <div 
              style={{ cursor: 'pointer' }}
              onClick={() => handleCopy("BS Information Technology, STI College Tarlac (2026)", "Degree")}
              title="Click to copy"
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-yellow)' }}>STI</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>BS IT 2026</div>
            </div>
            <div 
              style={{ cursor: 'pointer' }}
              onClick={() => handleCopy("100% Hardware Fluency: POST, Component Seating, RJ45 T568B", "Competency")}
              title="Click to copy"
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-blue)' }}>100%</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Hardware Fluency</div>
            </div>
          </div>
        </div>
      </article>

      {/* 2. Credentials & Degrees Card */}
      <article className="bento-card" id="bento-credentials">
        <div className="bento-card__head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ color: 'var(--accent-yellow)' }}>
              <Award size={20} />
            </span>
            <span className="bento-card-title">CREDENTIALS</span>
          </div>
          <span className="bento-badge" style={{ color: 'var(--accent-yellow)' }}>
            <ShieldCheck size={12} style={{ display: 'inline', marginRight: '4px' }} />
            VERIFIED
          </span>
        </div>
        <p className="bento-card-sub">Formal degree, vendor certificates, and enterprise hours.</p>

        <div className="credentials-bento-list">
          {credentials.map((cred, i) => (
            <div 
              key={i} 
              className="cred-row-item" 
              style={{ border: '2px solid var(--border-color)', cursor: 'pointer' }}
              onClick={() => handleCopy(`${cred.title} (${cred.issuer}, ${cred.year})`, "Credential")}
              title="Click to copy credential details"
            >
              <div className="cred-row-info">
                <span className="cred-row-title" style={{ fontSize: '0.95rem' }}>{cred.title}</span>
                <span className="cred-row-sub" style={{ fontSize: '0.8rem' }}>{cred.issuer} • {cred.year}</span>
              </div>
              <span className="cred-pill" style={{ background: 'var(--accent-yellow-dim)', color: 'var(--accent-yellow)' }}>{cred.badge}</span>
            </div>
          ))}
        </div>
      </article>

      {/* 3. Services & Capabilities Card */}
      <article className="bento-card" id="bento-services">
        <div className="bento-card__head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ color: 'var(--accent-blue)' }}>
              <Layers size={20} />
            </span>
            <span className="bento-card-title">CAPABILITIES & SERVICES</span>
          </div>
          <span className="bento-badge" style={{ color: 'var(--accent-blue)', borderColor: 'var(--accent-blue)' }}>
            ENTERPRISE READY
          </span>
        </div>
        <p className="bento-card-sub">What I construct, engineer, and deploy for enterprise teams.</p>

        <ol className="services-bento-list">
          {services.map((serv, i) => (
            <li 
              key={i} 
              className="service-row" 
              style={{ borderBottom: '2px solid var(--border-color)', cursor: 'pointer' }}
              onClick={() => handleCopy(`${serv.name}: ${serv.desc}`, "Service Capability")}
              title="Click to copy capability summary"
            >
              <div className="service-row-left">
                <span className="service-name" style={{ fontSize: '1.05rem' }}>{serv.name}</span>
                <span className="service-desc" style={{ fontSize: '0.85rem' }}>{serv.desc}</span>
              </div>
              <span className="service-num" style={{ color: 'var(--accent-blue)' }}>{serv.num}</span>
            </li>
          ))}
        </ol>
      </article>

      {/* 4. Hardware Bench Diagnostics */}
      <article className="bento-card" id="bento-bench">
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
          <div 
            style={{ padding: '1rem', background: 'var(--bg-card-sub)', border: '2px solid var(--border-color)', borderRadius: '14px', cursor: 'pointer' }}
            onClick={() => handleCopy("Component Seating & Multimeter Testing: CPU pin inspection, memory channel POST troubleshooting, thermal monitoring, RJ45 (T568B) cabling", "Bench Diagnostic Protocol")}
            title="Click to copy bench protocol"
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-orange)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Wrench size={14} />
              <span>Component Seating & Multimeter Testing</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              Hands-on diagnostic methodology: CPU pin inspection, memory channel POST troubleshooting, thermal cycle monitoring, and RJ45 (T568B) structured cabling termination.
            </p>
          </div>
        </div>
      </article>

    </section>
  );
};
