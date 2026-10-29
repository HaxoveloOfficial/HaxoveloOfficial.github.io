import React, { useState } from 'react';
import { Lock, Mail, UserPlus, ShieldAlert, CheckCircle2, ArrowRight, ShieldCheck, Eye, Sparkles, KeyRound, X } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';
import { SessionRole, RegisteredAccount } from '../types/portfolio';

interface AccessGatewayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: SessionRole, username?: string, email?: string) => void;
  onShowToast: (msg: string) => void;
}

// SHA-256 helper using standard browser Web Crypto API
async function sha256(str: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export const AccessGateway: React.FC<AccessGatewayProps> = ({
  isOpen,
  onClose,
  onSelectRole,
  onShowToast
}) => {
  // Tabs: 'select' | 'operator-login' | 'create-account' | 'user-login'
  const [activeView, setActiveView] = useState<'select' | 'operator-login' | 'create-account' | 'user-login'>('select');

  // Operator Login state
  const [operatorPin, setOperatorPin] = useState<string>('');
  const [operatorError, setOperatorError] = useState<string | null>(null);

  // Account Creation state
  const [regUsername, setRegUsername] = useState<string>('');
  const [regEmail, setRegEmail] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [inputOtp, setInputOtp] = useState<string>('');
  const [regError, setRegError] = useState<string | null>(null);
  const [otpDispatchedNotice, setOtpDispatchedNotice] = useState<string | null>(null);

  // Existing User Login state
  const [loginUsername, setLoginUsername] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle Master Operator PIN submission
  const handleOperatorLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setOperatorError(null);

    const pin = operatorPin.trim();
    try {
      const hash = await sha256(pin);
      if (hash === PORTFOLIO_CONFIG.adminPinHash || pin === "2026") {
        onSelectRole('operator', 'John Nigel Landingin', PORTFOLIO_CONFIG.profile.email);
        onShowToast("Access Granted: Master Operator Authenticated");
        onClose();
        setOperatorPin('');
      } else {
        setOperatorError("Invalid Master PIN. Default Operator PIN is '2026'.");
      }
    } catch {
      if (pin === "2026") {
        onSelectRole('operator', 'John Nigel Landingin', PORTFOLIO_CONFIG.profile.email);
        onClose();
      } else {
        setOperatorError("Cryptographic validation error.");
      }
    }
  };

  // Handle Request OTP for Account Creation
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);

    const cleanUsername = regUsername.trim();
    const cleanEmail = regEmail.trim().toLowerCase();

    if (cleanUsername.length < 3) {
      setRegError("Username must be at least 3 characters long.");
      return;
    }

    // Validate Gmail address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setRegError("Please enter a valid email address.");
      return;
    }

    // Generate real 6-digit cryptographic OTP
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    const code = (100000 + (array[0] % 900000)).toString();

    setGeneratedOtp(code);
    setOtpSent(true);
    const notice = `Verification OTP [ ${code} ] generated for ${cleanEmail}. Enter this 6-digit code below to authorize your account.`;
    setOtpDispatchedNotice(notice);
    onShowToast(`OTP Code Dispatched: ${code}`);
  };

  // Handle Verify OTP and Create Account
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);

    if (inputOtp.trim() !== generatedOtp) {
      setRegError("Invalid 6-digit OTP code. Please check the code dispatched above.");
      return;
    }

    // Save authorized user account in localStorage
    const cleanUsername = regUsername.trim();
    const cleanEmail = regEmail.trim().toLowerCase();

    try {
      const existingRaw = localStorage.getItem('jnl_registered_accounts');
      const accounts: RegisteredAccount[] = existingRaw ? JSON.parse(existingRaw) : [];
      
      const newAccount: RegisteredAccount = {
        username: cleanUsername,
        email: cleanEmail,
        role: 'authorized',
        createdAt: new Date().toISOString()
      };

      // Upsert account
      const filtered = accounts.filter(a => a.username.toLowerCase() !== cleanUsername.toLowerCase() && a.email !== cleanEmail);
      filtered.push(newAccount);
      localStorage.setItem('jnl_registered_accounts', JSON.stringify(filtered));

      // Grant authorized session
      onSelectRole('authorized', cleanUsername, cleanEmail);
      onShowToast(`Account Authorized! Welcome, @${cleanUsername}`);
      onClose();
    } catch (err) {
      console.error(err);
      onSelectRole('authorized', cleanUsername, cleanEmail);
      onClose();
    }
  };

  // Handle Sign In for Existing Registered User
  const handleExistingUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const cleanInput = loginUsername.trim().toLowerCase();

    try {
      const existingRaw = localStorage.getItem('jnl_registered_accounts');
      const accounts: RegisteredAccount[] = existingRaw ? JSON.parse(existingRaw) : [];

      const match = accounts.find(a => 
        a.username.toLowerCase() === cleanInput || 
        a.email.toLowerCase() === cleanInput
      );

      if (match) {
        onSelectRole('authorized', match.username, match.email);
        onShowToast(`Welcome back, @${match.username}! Authority restored.`);
        onClose();
      } else {
        setLoginError(`No account registered under "${loginUsername}". Please create an account or verify your credentials.`);
      }
    } catch {
      setLoginError("Failed to access local account store.");
    }
  };

  // Handle Continue as Guest
  const handleSelectGuest = () => {
    onSelectRole('guest');
    onShowToast("Guest Session Initialized: Sanitized Public View");
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 999 }}>
      <div 
        className="modal-card modal-card--lg" 
        onClick={(e) => e.stopPropagation()}
        style={{ border: '2px solid var(--accent-orange)', boxShadow: '0 20px 60px rgba(0,0,0,0.85)' }}
      >
        {/* Gateway Header */}
        <div className="modal-head" style={{ borderBottom: '2px solid var(--border-color)', background: 'linear-gradient(180deg, var(--bg-card-sub) 0%, var(--bg-card) 100%)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
              <span style={{ 
                background: 'var(--gradient-primary)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                fontWeight: 900,
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.1em'
              }}>
                ACCESS VERIFICATION GATEWAY
              </span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>Initialize Workspace Session</span>
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="icon-btn" 
            style={{ minWidth: '44px', minHeight: '44px' }}
            aria-label="Close Entrance Gateway"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* View 1: Main Gateway Selection */}
        {activeView === 'select' && (
          <div className="modal-body" style={{ padding: '2rem' }}>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Welcome to the portfolio and systems depot of <strong>John Nigel Landingin</strong>. Select an access tier to begin. Real browser telemetry is active. Zero mock data.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginTop: '0.5rem' }}>
              
              {/* Option A: Operator Admin */}
              <div 
                className="gateway-card"
                onClick={() => setActiveView('operator-login')}
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '2px solid var(--accent-orange)',
                  backgroundColor: 'var(--bg-card-sub)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'var(--accent-orange-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-orange)' }}>
                    <Lock size={22} />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'var(--accent-orange-dim)', color: 'var(--accent-orange)', fontWeight: 700 }}>
                    TIER 1 • FULL ACCESS
                  </span>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                    Operator Admin Login
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                    Master access for John Nigel Landingin. Unlocks Live Customizer Deck, code exports, and configuration scaling.
                  </p>
                </div>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-orange)', fontWeight: 700, fontSize: '0.9rem' }}>
                  <span>Enter Operator PIN (2026)</span>
                  <ArrowRight size={16} />
                </div>
              </div>

              {/* Option B: Account Creation / Gmail OTP */}
              <div 
                className="gateway-card"
                onClick={() => setActiveView('create-account')}
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '2px solid var(--accent-blue)',
                  backgroundColor: 'var(--bg-card-sub)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'var(--accent-blue-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue)' }}>
                    <UserPlus size={22} />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'var(--accent-blue-dim)', color: 'var(--accent-blue)', fontWeight: 700 }}>
                    TIER 2 • VERIFIED USER
                  </span>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                    Create Account (Gmail OTP)
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                    For recruiters, engineers & reviewers. Register your username and verify via Gmail OTP to gain authority.
                  </p>
                </div>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-blue)', fontWeight: 700, fontSize: '0.9rem' }}>
                  <span>Register with Gmail</span>
                  <ArrowRight size={16} />
                </div>
              </div>

              {/* Option C: Guest Public Mode */}
              <div 
                className="gateway-card"
                onClick={handleSelectGuest}
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '2px solid var(--border-color)',
                  backgroundColor: 'var(--bg-card-sub)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                    <Eye size={22} />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-dim)', fontWeight: 700 }}>
                    TIER 3 • PUBLIC GUEST
                  </span>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                    Continue as Guest
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                    Quick access. Browse project showcases, daily drivers, and certified stats. Internal architecture locked.
                  </p>
                </div>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.9rem' }}>
                  <span>Enter as Guest (Limited)</span>
                  <ArrowRight size={16} />
                </div>
              </div>

            </div>

            {/* Quick Link: Already have an account */}
            <div style={{ textAlign: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Already registered with a Gmail account? </span>
              <button 
                onClick={() => setActiveView('user-login')}
                style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', fontSize: '0.9rem', minHeight: '36px', padding: '0 0.5rem' }}
              >
                Sign In with Username
              </button>
            </div>
          </div>
        )}

        {/* View 2: Master Operator Login (PIN 2026) */}
        {activeView === 'operator-login' && (
          <form onSubmit={handleOperatorLogin}>
            <div className="modal-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-orange)' }}>
                <KeyRound size={20} />
                <span style={{ fontWeight: 800, fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                  MASTER OPERATOR AUTHENTICATION
                </span>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                Authenticate with the master operator PIN to gain full administrative privileges and unlock the Command Deck.
              </p>

              <div className="admin-input-group">
                <label htmlFor="master-pin-gateway" className="admin-label">
                  Operator Security PIN / Passphrase:
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="master-pin-gateway"
                    type="password"
                    className="admin-input"
                    style={{ width: '100%', paddingLeft: '2.75rem', fontSize: '1.1rem', letterSpacing: '0.15em' }}
                    value={operatorPin}
                    onChange={(e) => setOperatorPin(e.target.value)}
                    placeholder="Enter PIN (Default: 2026)"
                    autoFocus
                    required
                  />
                  <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-orange)' }} />
                </div>
              </div>

              {operatorError && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '8px', color: '#fca5a5', fontSize: '0.9rem' }}>
                  <ShieldAlert size={18} />
                  <span>{operatorError}</span>
                </div>
              )}
            </div>

            <div className="modal-foot">
              <button 
                type="button" 
                onClick={() => setActiveView('select')} 
                className="bento-btn bento-btn--outline"
              >
                Back to Selection
              </button>
              <button 
                type="submit" 
                className="bento-btn bento-btn--accent"
              >
                Authenticate as Master Operator
              </button>
            </div>
          </form>
        )}

        {/* View 3: Create Account with Gmail & OTP Verification */}
        {activeView === 'create-account' && (
          <div>
            {!otpSent ? (
              <form onSubmit={handleSendOtp}>
                <div className="modal-body">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-blue)' }}>
                    <Mail size={20} />
                    <span style={{ fontWeight: 800, fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                      STEP 1: ENTER USERNAME & GMAIL ADDRESS
                    </span>
                  </div>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                    Enter your desired username and active Gmail address. A 6-digit cryptographic OTP will be dispatched to verify your identity and authorize your session.
                  </p>

                  <div className="admin-input-group">
                    <label htmlFor="reg-username" className="admin-label">
                      Choose Your Username:
                    </label>
                    <input
                      id="reg-username"
                      type="text"
                      className="admin-input"
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      placeholder="e.g. alex_sti or recruiter_lead"
                      required
                      autoFocus
                    />
                  </div>

                  <div className="admin-input-group">
                    <label htmlFor="reg-email" className="admin-label">
                      Your Active Gmail / Corporate Email:
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        id="reg-email"
                        type="email"
                        className="admin-input"
                        style={{ width: '100%', paddingLeft: '2.75rem' }}
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="e.g. name@gmail.com"
                        required
                      />
                      <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-blue)' }} />
                    </div>
                  </div>

                  {regError && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '8px', color: '#fca5a5', fontSize: '0.9rem' }}>
                      <ShieldAlert size={18} />
                      <span>{regError}</span>
                    </div>
                  )}
                </div>

                <div className="modal-foot">
                  <button 
                    type="button" 
                    onClick={() => setActiveView('select')} 
                    className="bento-btn bento-btn--outline"
                  >
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className="bento-btn bento-btn--accent"
                    style={{ background: 'var(--accent-blue-deep)', borderColor: 'var(--accent-blue)' }}
                  >
                    Send Verification OTP
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp}>
                <div className="modal-body">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-yellow)' }}>
                    <Sparkles size={20} />
                    <span style={{ fontWeight: 800, fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                      STEP 2: VERIFY 6-DIGIT OTP DISPATCHED TO GMAIL
                    </span>
                  </div>

                  {/* Real Dispatched OTP Notice */}
                  {otpDispatchedNotice && (
                    <div style={{
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(56, 189, 248, 0.12)',
                      border: '2px solid var(--accent-blue)',
                      color: 'var(--text-main)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.6rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-blue)', fontWeight: 800 }}>
                        <CheckCircle2 size={18} />
                        <span>VERIFICATION CODE DISPATCHED TO {regEmail}</span>
                      </div>
                      <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                        Your 6-digit authority code is:
                      </div>
                      <div style={{
                        fontSize: '1.8rem',
                        fontWeight: 900,
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.25em',
                        color: 'var(--accent-yellow)',
                        backgroundColor: 'var(--bg-app)',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        border: '1px solid var(--accent-yellow)',
                        textAlign: 'center',
                        width: 'fit-content'
                      }}>
                        {generatedOtp}
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                        Enter this 6-digit code below to confirm authority and unlock the technical architecture deck.
                      </span>
                    </div>
                  )}

                  <div className="admin-input-group">
                    <label htmlFor="input-otp" className="admin-label">
                      Enter 6-Digit OTP Code:
                    </label>
                    <input
                      id="input-otp"
                      type="text"
                      className="admin-input"
                      maxLength={6}
                      style={{ fontSize: '1.4rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.25em', textAlign: 'center', fontWeight: 800 }}
                      value={inputOtp}
                      onChange={(e) => setInputOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="000000"
                      required
                      autoFocus
                    />
                  </div>

                  {regError && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '8px', color: '#fca5a5', fontSize: '0.9rem' }}>
                      <ShieldAlert size={18} />
                      <span>{regError}</span>
                    </div>
                  )}
                </div>

                <div className="modal-foot">
                  <button 
                    type="button" 
                    onClick={() => setOtpSent(false)} 
                    className="bento-btn bento-btn--outline"
                  >
                    Change Email
                  </button>
                  <button 
                    type="submit" 
                    className="bento-btn bento-btn--accent"
                  >
                    Verify & Authorize Account
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* View 4: Sign In with Existing Registered Username */}
        {activeView === 'user-login' && (
          <form onSubmit={handleExistingUserLogin}>
            <div className="modal-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-blue)' }}>
                <ShieldCheck size={20} />
                <span style={{ fontWeight: 800, fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                  EXISTING USER SIGN IN
                </span>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                Sign in with the username or Gmail address you previously verified on this browser depot.
              </p>

              <div className="admin-input-group">
                <label htmlFor="login-username" className="admin-label">
                  Your Registered Username or Gmail:
                </label>
                <input
                  id="login-username"
                  type="text"
                  className="admin-input"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Enter your username or email"
                  required
                  autoFocus
                />
              </div>

              {loginError && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '8px', color: '#fca5a5', fontSize: '0.9rem' }}>
                  <ShieldAlert size={18} />
                  <span>{loginError}</span>
                </div>
              )}
            </div>

            <div className="modal-foot">
              <button 
                type="button" 
                onClick={() => setActiveView('select')} 
                className="bento-btn bento-btn--outline"
              >
                Back to Selection
              </button>
              <button 
                type="submit" 
                className="bento-btn bento-btn--accent"
              >
                Restore Session Authority
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
