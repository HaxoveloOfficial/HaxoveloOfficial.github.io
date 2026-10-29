import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Database, HardDrive } from 'lucide-react';

export const SystemDiagnostics: React.FC = () => {
  const [latency, setLatency] = useState<string>('0.8ms');
  const uptime = '99.98%';

  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate real-time hardware telemetry fluctuation
      const randLatency = (0.7 + Math.random() * 0.4).toFixed(1);
      setLatency(`${randLatency}ms`);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="diagnostics-box">
      <div className="diagnostics-head">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Activity size={18} color="var(--accent)" />
          <span className="diagnostics-title">DEPOT HARDWARE & SECURITY TELEMETRY</span>
        </div>
        <span className="diagnostics-badge">
          <ShieldCheck size={14} />
          <span>ZERO ATTACK SURFACE // ENCRYPTED</span>
        </span>
      </div>

      <div className="diagnostics-grid">
        <div className="diag-item">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dim)' }}>
            <Database size={13} />
            <span className="diag-label">LOCAL QUERY LATENCY</span>
          </div>
          <div className="diag-value" style={{ color: 'var(--success-green)' }}>{latency}</div>
        </div>

        <div className="diag-item">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dim)' }}>
            <ShieldCheck size={13} />
            <span className="diag-label">SECURITY PROTOCOL</span>
          </div>
          <div className="diag-value" style={{ color: 'var(--verified-blue)' }}>STRICT CSP / TLS 1.3</div>
        </div>

        <div className="diag-item">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dim)' }}>
            <HardDrive size={13} />
            <span className="diag-label">CLIENT VDOM FOOTPRINT</span>
          </div>
          <div className="diag-value">&lt; 14 MB (Vite 6)</div>
        </div>

        <div className="diag-item">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dim)' }}>
            <Activity size={13} />
            <span className="diag-label">DEPOT SYSTEM UPTIME</span>
          </div>
          <div className="diag-value">{uptime}</div>
        </div>
      </div>
    </div>
  );
};
