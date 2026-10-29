import React from 'react';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';

interface DailyDriversProps {
  onShowToast?: (msg: string) => void;
}

export const DailyDrivers: React.FC<DailyDriversProps> = ({ onShowToast }) => {
  const { dailyDrivers } = PORTFOLIO_CONFIG;

  const handleCopyTool = (name: string) => {
    navigator.clipboard.writeText(name);
    if (onShowToast) {
      onShowToast(`Copied tool: ${name}`);
    }
  };

  return (
    <section className="daily-drivers-strip" id="bento-drivers">
      <div className="drivers-label">
        <span className="drivers-label-sub">DAILY DRIVERS</span>
        <span className="drivers-label-main">Tools I work with</span>
      </div>
      <div className="drivers-track-wrap">
        <div className="drivers-track">
          {dailyDrivers.map((driver, index) => (
            <button
              key={index}
              onClick={() => handleCopyTool(driver.name)}
              className="driver-pill"
              style={{ background: 'none', border: '1px solid var(--border-color)', color: 'inherit', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}
              title={`Click to copy: ${driver.name}`}
            >
              <strong>{driver.name}</strong>
              <span style={{ opacity: 0.6, fontSize: '0.85em', marginLeft: '0.35rem' }}>• {driver.tag}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
