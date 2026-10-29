import React, { useState, useEffect } from 'react';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';

export const VisitorBadge: React.FC = () => {
  const [count, setCount] = useState<number>(PORTFOLIO_CONFIG.telemetry.initialVisits);

  useEffect(() => {
    const seed = PORTFOLIO_CONFIG.telemetry.initialVisits;
    let stored = parseInt(localStorage.getItem('jnl_react_visits') || '', 10);
    if (isNaN(stored) || stored < seed) {
      stored = seed;
    } else {
      stored += 1;
    }
    localStorage.setItem('jnl_react_visits', stored.toString());
    setCount(stored);
  }, []);

  return (
    <div className="visitor-badge" title="Verified Portfolio Visits">
      <span className="visitor-pulse"></span>
      <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>
        {count.toLocaleString()} visits
      </span>
    </div>
  );
};
