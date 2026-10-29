import React, { useState, useRef, useEffect } from 'react';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';
import { X, Terminal as TerminalIcon } from 'lucide-react';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onSetTheme: (theme: 'dark' | 'light' | 'terminal') => void;
  onOpenGateway: () => void;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ isOpen, onClose, onSetTheme, onOpenGateway }) => {
  const [history, setHistory] = useState<string[]>([
    "=== JNL OPERATING CONSOLE (v2.4.0) ===",
    "Connected to: Tarlac City Regional Depot (15.48° N, 120.60° E)",
    "Security: WebCrypto SHA-256 / Static CSP Active",
    "Type 'help' to inspect available system commands. Type 'auth' for Gateway."
  ]);
  const [inputVal, setInputVal] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, `john@tarlac-depot:~$ ${inputVal}`];

    switch (cmd) {
      case 'help':
        newHistory.push(
          "Available Commands:",
          "  login        - Unlock Operator Admin Command Deck (PIN: 2026)",
          "  projects     - List primary engineering projects",
          "  skills       - Print verified technical stack",
          "  cat resume   - Print credentials & education summary",
          "  ping depot   - Ping Tarlac City Central Terminal",
          "  whoami       - Display engineer identity & handle",
          "  theme <dark|light|terminal> - Switch interface theme",
          "  clear        - Clear console screen",
          "  exit         - Close terminal modal"
        );
        break;

      case 'login':
      case 'admin':
      case 'auth':
      case 'register':
        newHistory.push("Launching Access Verification Gateway...");
        onClose();
        onOpenGateway();
        break;

      case 'projects':
        newHistory.push(
          "1. Transport & Logistics Delivery Management System [C# / .NET / SQL Server]",
          "2. Interactive 3D Product Showcase [Unity 3D / C# / PBR Shaders]",
          "3. Enterprise Architecture & BMC Framework [ArchiMate 3.1 / TOGAF]",
          "4. Emerald Microfinance Core Ledger [C# / Relational Database]",
          "5. Municipal Records & Welfare Pipeline [City of Tarlac PESO / Brgy. Balete]",
          "6. Data Communications & LAN Lab [RJ45 T568B / Network Routing]",
          "7. NFS Heat Garage Vehicle Engine [Mathematical Simulation]"
        );
        break;

      case 'skills':
        newHistory.push(
          "Languages & Frameworks: C# (.NET 8/WinForms/WPF), Java, SQL, TypeScript/React, Angular",
          "Enterprise Systems: ArchiMate 3.1, TOGAF Standard, Business Model Canvas",
          "Systems & Operations: Linux LPI Administration, Windows Server, Git/GitHub",
          "Physical & Media: PC Assembly & Diagnostics, LAN Cabling (T568B), Unity 3D, Photoshop"
        );
        break;

      case 'cat resume':
        newHistory.push(
          `Candidate: ${PORTFOLIO_CONFIG.profile.fullName}`,
          `Degree: ${PORTFOLIO_CONFIG.profile.degree}`,
          "Certifications: Linux Professional Institute (LPI), Oracle Academy Java",
          "Experience: 486 Hours Systems & Multimedia Internship (Hexatronics Inc.)"
        );
        break;

      case 'ping depot':
        newHistory.push(
          "PING tarlac.depot.lan (120.5979.15.48): 56 data bytes",
          "64 bytes from tarlac-depot: icmp_seq=1 ttl=64 time=0.84 ms",
          "64 bytes from tarlac-depot: icmp_seq=2 ttl=64 time=0.79 ms",
          "--- tarlac.depot.lan ping statistics ---",
          "2 packets transmitted, 2 received, 0% packet loss, rtt avg = 0.81 ms"
        );
        break;

      case 'whoami':
        newHistory.push(`${PORTFOLIO_CONFIG.profile.fullName} (${PORTFOLIO_CONFIG.profile.handle}) - IT Systems Builder`);
        break;

      case 'theme dark':
        onSetTheme('dark');
        newHistory.push("Theme switched to: Dark Obsidian");
        break;

      case 'theme light':
        onSetTheme('light');
        newHistory.push("Theme switched to: Editorial Warm Light");
        break;

      case 'theme terminal':
        onSetTheme('terminal');
        newHistory.push("Theme switched to: Phosphor Terminal");
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
        onClose();
        return;

      default:
        newHistory.push(`Command not recognized: '${cmd}'. Type 'help' or 'login'.`);
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div className="cli-backdrop" onClick={onClose}>
      <div className="cli-window" onClick={(e) => e.stopPropagation()}>
        <div className="cli-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TerminalIcon size={15} />
            <span>john@tarlac-depot:~ (Interactive Shell)</span>
          </div>
          <button onClick={onClose} style={{ color: '#4ade80', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>

        <div className="cli-body" ref={bodyRef}>
          {history.map((line, idx) => (
            <div key={idx} className="cli-line">{line}</div>
          ))}
        </div>

        <form onSubmit={handleCommand} className="cli-input-form">
          <span className="cli-prompt">john@tarlac-depot:~$</span>
          <input
            ref={inputRef}
            type="text"
            className="cli-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type command ('help', 'login', 'projects', 'cat resume')..."
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  );
};
