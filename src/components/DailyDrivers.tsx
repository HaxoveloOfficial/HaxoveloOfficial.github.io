import React from 'react';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';

export const DailyDrivers: React.FC = () => {
  const { dailyDrivers } = PORTFOLIO_CONFIG;

  return (
    <section className="daily-drivers-strip" id="bento-drivers">
      <div className="drivers-label">
        <span className="drivers-label-sub">DAILY DRIVERS</span>
        <span className="drivers-label-main">Tools I work with</span>
      </div>
      <div className="drivers-track-wrap">
        <div className="drivers-track">
          {dailyDrivers.map((driver, index) => (
            <span key={index} className="driver-pill">
              <strong>{driver.name}</strong>
              <span style={{ opacity: 0.5, fontSize: '0.85em' }}>• {driver.tag}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
