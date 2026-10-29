import React, { useState } from 'react';
import { Lock, X, KeyRound, ShieldAlert } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  onShowToast: (msg: string) => void;
}

// SHA-256 helper using standard browser Web Crypto API
async function sha256(str: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess, onShowToast }) => {
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const hash = await sha256(pin.trim());
      // Check against config hash or default pin "2026"
      if (hash === PORTFOLIO_CONFIG.adminPinHash || pin.trim() === "2026") {
        onLoginSuccess();
        onShowToast("Access Granted: Admin Command Deck Online");
        onClose();
        setPin('');
      } else {
        setError("Invalid Operator Passphrase or PIN. Default PIN is '2026'.");
      }
    } catch {
      if (pin.trim() === "2026") {
        onLoginSuccess();
        onClose();
      } else {
        setError("Cryptographic authentication check failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Lock size={20} color="var(--accent-orange)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Operator Authentication</h3>
          </div>
          <button onClick={onClose} className="icon-btn" style={{ minWidth: '40px', minHeight: '40px' }} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
              Enter your master operator PIN to unlock the live customization deck and advanced feature builder.
            </p>

            <div className="admin-input-group">
              <label htmlFor="admin-pin" className="admin-label">
                Security PIN / Passphrase:
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="admin-pin"
                  type="password"
                  className="admin-input"
                  style={{ width: '100%', paddingLeft: '2.75rem' }}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter PIN (Default: 2026)"
                  autoFocus
                  required
                />
                <KeyRound size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              </div>
            </div>

            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '8px', color: '#fca5a5', fontSize: '0.875rem' }}>
                <ShieldAlert size={18} />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="modal-foot">
            <button type="button" onClick={onClose} className="bento-btn bento-btn--outline">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="bento-btn bento-btn--accent">
              {loading ? "Authenticating..." : "Unlock Admin Deck"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
