import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Mail, RefreshCw, ArrowUpRight } from 'lucide-react';
import { ChatMessage, CapturedEmail } from '../types/portfolio';

interface AiAssistantProps {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onShowToast: (msg: string) => void;
  onOpenGateway?: () => void;
}

// Fine-tuned knowledge base for John Nigel Landingin
const KNOWLEDGE_RESPONSES: { keywords: string[]; answer: string; followUp?: string[] }[] = [
  {
    keywords: ['capstone', 'logistics', 'delivery', 'c#', 'winforms', 'wpf', 'sql server'],
    answer: `Nigel's Capstone project is the **Transport & Logistics Delivery Management System** built with **C# (.NET 8)** and **Microsoft SQL Server**.

Key Technical Architecture:
• **Offline-First Resilience:** Integrated local SQLite caching with write-ahead replication that buffers transactions during connectivity outages and synchronizes with the central SQL Server upon reconnect.
• **Concurrency & Consistency:** Utilizes ACID-compliant T-SQL transactions with isolation levels to prevent dispatch double-booking.
• **Role-Based Access (RBAC):** Granular permission trees distinguishing depot dispatchers, fleet supervisors, and drivers.
• **Automated Manifests:** Automated generation of shipment manifests and delivery verification logs.`,
    followUp: ['View Capstone GitHub', 'What tech stack was used?', 'Leave message for Nigel']
  },
  {
    keywords: ['hexatronics', 'unity', '3d', 'internship', 'hours', '486'],
    answer: `At **Hexatronics Incorporated**, Nigel completed an intensive **486 certified industry internship hours** as an IT Systems & Interactive Multimedia Intern.

Core Engineering Deliverables:
• **Interactive 3D Product Showcase:** Built in **Unity 3D Engine** using modular C# scripts and custom PBR (Physically-Based Rendering) shaders.
• **Interactive Exploded Mesh Views:** Engineered real-time component dissection allowing users to inspect internal sub-assemblies.
• **Dynamic Light Rigs:** Configured multi-point real-time illumination optimized for high visual fidelity on web and desktop without thermal throttling.`,
    followUp: ['Tell me about his other projects', 'Is Nigel available for hire?']
  },
  {
    keywords: ['enterprise', 'archimate', 'togaf', 'bmc', 'architecture'],
    answer: `Nigel has verified expertise in **Enterprise Architecture** using the **TOGAF Standard** and **ArchiMate 3.1** modeling notation.

Capabilities Demonstrated:
• Modeled multi-layer business processes, application services, and infrastructure technology nodes.
• Mapped technical architecture directly to the **Business Model Canvas (BMC)** to quantify return on investment and mitigate legacy system bottlenecks.`,
    followUp: ['What are Nigel\'s daily drivers?', 'How can I contact Nigel?']
  },
  {
    keywords: ['microfinance', 'emerald', 'ledger', 'accounting', 'finance'],
    answer: `Nigel developed the **Emerald Microfinance Core Ledger System**—a dedicated C# relational database application.

Highlights:
• **Double-Entry Bookkeeping:** Implemented strict debit/credit validation rules preventing unbalanced financial records.
• **Automated Amortization:** Algorithmic calculation of payment schedules, penalties, and loan interest rates.
• **Immutable Audit Logs:** Non-destructive transaction tables for financial compliance.`,
    followUp: ['Explain Capstone project', 'What languages does Nigel know?']
  },
  {
    keywords: ['municipal', 'peso', 'balete', 'tarlac', 'government', 'records', 'welfare'],
    answer: `Nigel engineered the **Municipal Records & Citizen Welfare Pipeline** for the **City of Tarlac PESO** and **Barangay Balete**.

Highlights:
• Modernized historical paper-based archives into a structured, indexed desktop database.
• Implemented strict citizen data privacy protocols ensuring **0% record loss** and zero unauthorized data leakage.`,
    followUp: ['Tell me about his certifications', 'Contact Nigel']
  },
  {
    keywords: ['lan', 'network', 't568b', 'hardware', 'cabling', 'post', 'assembly'],
    answer: `Beyond software development, Nigel possesses deep **physical infrastructure and systems diagnostics** expertise:

• **Network Cabling:** Certified standard T568B RJ45 crimping, patch panel termination, and switch VLAN configuration.
• **Hardware Diagnostics:** Component-level troubleshooting, motherboard POST diagnostics, power supply testing, and thermal management down to individual silicon components.`,
    followUp: ['What are his certifications?', 'Is Nigel open to IT admin roles?']
  },
  {
    keywords: ['skills', 'stack', 'languages', 'daily drivers', 'technologies', 'tools'],
    answer: `John Nigel Landingin's verified Technical Stack:

• **Core Languages:** C# (.NET 8, WinForms, WPF), Java (Oracle Academy), TypeScript, SQL, Modern JavaScript
• **Databases:** Microsoft SQL Server, MySQL, SQLite (offline-first schemas)
• **Frameworks & Engines:** Unity 3D, Angular, React 19, Tailwind CSS
• **Systems & DevOps:** Linux Administration (LPI Certified), Windows Server, Git, GitHub
• **Standards:** ArchiMate 3.1, TOGAF, T568B Networking Standards`,
    followUp: ['What projects has he built?', 'Hire Nigel']
  },
  {
    keywords: ['hire', 'available', 'job', 'junior', 'developer', 'employment', 'roles', 'resume', 'cv'],
    answer: `**Yes! John Nigel Landingin is actively available for employment.**

Target Positions:
1. **Junior C# / .NET Software Developer** (Desktop, WinForms/WPF, Backend)
2. **IT Systems Administrator / Infrastructure Support**
3. **Unity 3D Interactive Multimedia Developer**
4. **Database Specialist / SQL Architect**

Education: BS Information Technology, STI College Tarlac (Graduating 2026).
Internship: 486 Certified Hours at Hexatronics Inc.

Would you like to leave your email address or job inquiry? I will log it directly into Nigel's Operator Dashboard!`,
    followUp: ['Leave my email for Nigel', 'Download Resume PDF']
  },
  {
    keywords: ['contact', 'email', 'phone', 'reach', 'touch', 'message', 'inquiry'],
    answer: `You can reach John Nigel Landingin directly through:

• **Email:** landinginjohnnigel@gmail.com
• **GitHub:** https://github.com/HaxoveloOfficial
• **LinkedIn:** https://www.linkedin.com/in/john-nigel-landingin

**Quick Communication:** Simply type your email and message here in this chat, and I will instantly log it into Nigel's private Operator Dashboard for follow-up!`,
    followUp: ['Leave my email now']
  }
];

export const AiAssistant: React.FC<AiAssistantProps> = ({ 
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
  onShowToast, 
  onOpenGateway 
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState<boolean>(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleOpen = () => {
    if (onOpen) onOpen();
    else setInternalIsOpen(true);
  };

  const handleClose = () => {
    if (onClose) onClose();
    else setInternalIsOpen(false);
  };

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'welcome',
        sender: 'assistant',
        text: `Hello! I am John Nigel Landingin's personal **24/7 Systems AI Assistant**. 

I have direct access to his Capstone C# architecture, Unity 3D engine workflows, enterprise systems, and verified credentials. How can I assist your review or inquiry today?`,
        followUp: [
          'Explain Capstone C# architecture',
          'What did Nigel build at Hexatronics?',
          'What are his daily drivers?',
          'Is Nigel available for hire?'
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Extract email address from input string
  const extractEmail = (text: string): string | null => {
    const match = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
    return match ? match[0].toLowerCase() : null;
  };

  // Log captured email into localStorage for the Admin Dashboard
  const saveCapturedEmail = (email: string, queryText: string) => {
    try {
      const raw = localStorage.getItem('jnl_captured_emails');
      const list: CapturedEmail[] = raw ? JSON.parse(raw) : [];
      
      const newEntry: CapturedEmail = {
        id: `chat-${Date.now()}`,
        email: email,
        name: 'AI Chat Visitor',
        source: 'ai_chat_inquiry',
        message: queryText,
        timestamp: new Date().toISOString(),
        status: 'new'
      };

      // Avoid immediate duplicates
      const filtered = list.filter(item => item.email !== email || item.message !== queryText);
      filtered.unshift(newEntry);
      localStorage.setItem('jnl_captured_emails', JSON.stringify(filtered));
      onShowToast(`📬 Inquiry logged to Operator Dashboard (${email})`);
    } catch (e) {
      console.warn("Could not save email to dashboard store", e);
    }
  };

  // Generate intelligent non-generic response with follow-up prompts
  const generateResponse = (userText: string): { answer: string; followUp?: string[] } => {
    const lower = userText.toLowerCase();

    // Check if user entered an email
    const detectedEmail = extractEmail(userText);
    if (detectedEmail) {
      saveCapturedEmail(detectedEmail, userText);
      return {
        answer: `Thank you! I have captured your email (**${detectedEmail}**) and logged your inquiry directly into **John Nigel's Operator Dashboard**.\n\nNigel reviews his communications desk regularly and will respond directly to your Gmail. Is there any specific project architecture you would like me to explain while you're here?`,
        followUp: ['Explain Capstone C# architecture', 'What did Nigel build at Hexatronics?', 'What are his daily drivers?']
      };
    }

    // Match keywords from specific knowledge base
    for (const item of KNOWLEDGE_RESPONSES) {
      if (item.keywords.some(k => lower.includes(k))) {
        return { answer: item.answer, followUp: item.followUp };
      }
    }

    // Default intelligent contextual response
    return {
      answer: `Regarding "${userText}": John Nigel Landingin specializes in dependable C#/.NET desktop architecture, relational databases, Unity 3D interactive graphics, and physical IT infrastructure.\n\nNotable highlights include:\n1. **Capstone Logistics Management:** C# .NET 8 offline-first caching with SQL Server.\n2. **Hexatronics Interactive 3D Showcase:** Unity 3D with 486 certified internship hours.\n3. **Enterprise Architecture:** ArchiMate 3.1 & TOGAF standard alignment.\n\nWould you like to examine one of these architectures in detail, or would you like to leave your email for Nigel?`,
      followUp: ['Explain Capstone C# architecture', 'What did Nigel build at Hexatronics?', 'Leave an email for Nigel']
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    if (!isOpen) {
      handleOpen();
    }

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate natural thinking duration
    setTimeout(() => {
      const { answer, followUp } = generateResponse(query);
      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: answer,
        followUp: followUp,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: `Chat cleared. I am online 24/7. How can I assist you with John Nigel Landingin's systems portfolio?`,
        followUp: [
          'Explain Capstone C# architecture',
          'What did Nigel build at Hexatronics?',
          'What are his daily drivers?',
          'Is Nigel available for hire?'
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* 1. Floating Launch Pill / Button (24/7 AI Online Indicator) */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="ai-assistant-trigger"
          title="Open 24/7 AI Systems Assistant (John Nigel Landingin Representative)"
          style={{
            position: 'fixed',
            bottom: '5.2rem',
            right: '1.75rem',
            zIndex: 90,
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.75rem 1.25rem',
            borderRadius: '9999px',
            backgroundColor: 'var(--bg-card)',
            border: '2px solid var(--accent-orange)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(249, 115, 22, 0.25)',
            cursor: 'pointer',
            minHeight: '48px',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            color: 'var(--text-main)',
            fontFamily: 'var(--font-sans)'
          }}
        >
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Bot size={22} color="var(--accent-orange)" />
            <span style={{
              position: 'absolute',
              top: '-2px',
              right: '-3px',
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              backgroundColor: 'var(--success-green)',
              boxShadow: '0 0 6px var(--success-green)'
            }}></span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.1 }}>
              Depot AI Assistant
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--accent-yellow)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              24/7 Online • Real Knowledge
            </span>
          </div>
        </button>
      )}

      {/* 2. Interactive AI Chat Window */}
      {isOpen && (
        <div 
          className="ai-chat-window"
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            width: 'min(440px, calc(100vw - 2rem))',
            height: 'min(620px, calc(100vh - 3rem))',
            zIndex: 350,
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-xl)',
            border: '2px solid var(--accent-orange)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.85)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '1rem 1.25rem',
            background: 'linear-gradient(135deg, var(--bg-card-sub) 0%, var(--bg-sidebar) 100%)',
            borderBottom: '2px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: 'var(--accent-orange-dim)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-orange)'
              }}>
                <Bot size={22} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                    Depot AI Assistant
                  </h3>
                  <span style={{
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: 'rgba(34, 197, 94, 0.15)',
                    color: 'var(--success-green)',
                    padding: '0.1rem 0.4rem',
                    borderRadius: '4px',
                    fontWeight: 700,
                    border: '1px solid rgba(34, 197, 94, 0.3)'
                  }}>
                    24/7 ACTIVE
                  </span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  John Nigel Landingin Representative
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <button
                onClick={handleClearChat}
                className="icon-btn"
                style={{ width: '34px', height: '34px' }}
                title="Reset conversation"
              >
                <RefreshCw size={14} />
              </button>
              <button
                onClick={handleClose}
                className="icon-btn"
                style={{ width: '34px', height: '34px' }}
                title="Minimize assistant"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Prompt Chips Ribbon */}
          <div style={{
            padding: '0.6rem 0.85rem',
            backgroundColor: 'var(--bg-app)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            gap: '0.4rem',
            overflowX: 'auto',
            whiteSpace: 'nowrap'
          }}>
            {[
              "Explain Capstone C# architecture",
              "What did Nigel build at Hexatronics?",
              "What are his daily drivers?",
              "Is Nigel available for hire?",
              "Leave an email for Nigel"
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                style={{
                  background: 'var(--bg-card-sub)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--accent-blue)',
                  fontSize: '0.75rem',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  flexShrink: 0,
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600
                }}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Message List */}
          <div style={{
            flex: 1,
            padding: '1.25rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            backgroundColor: 'var(--bg-app)'
          }}>
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  maxWidth: '88%',
                  padding: '0.85rem 1.1rem',
                  borderRadius: m.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  backgroundColor: m.sender === 'user' ? 'var(--accent-orange)' : 'var(--bg-card)',
                  color: m.sender === 'user' ? '#ffffff' : 'var(--text-main)',
                  border: m.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  {m.text}
                </div>

                {/* Follow-up quick action prompts */}
                {m.sender === 'assistant' && m.followUp && m.followUp.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem', maxWidth: '92%' }}>
                    {m.followUp.map((chip, fIdx) => (
                      <button
                        key={fIdx}
                        onClick={() => {
                          if (chip === 'View Capstone GitHub') {
                            window.open('https://github.com/HaxoveloOfficial/transport-delivery-system-', '_blank');
                          } else if (chip === 'Download Resume PDF') {
                            window.open('assets/John_Nigel_Landingin_Resume.pdf', '_blank');
                          } else {
                            handleSend(chip);
                          }
                        }}
                        style={{
                          fontSize: '0.74rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '0.25rem 0.6rem',
                          minHeight: '28px',
                          background: 'var(--bg-card-sub)',
                          border: '1px solid var(--accent-orange)',
                          color: 'var(--accent-orange)',
                          borderRadius: '9999px',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontWeight: 700
                        }}
                        title={`Click to ask: "${chip}"`}
                      >
                        <span>{chip}</span>
                        <ArrowUpRight size={11} />
                      </button>
                    ))}
                  </div>
                )}

                <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                  {m.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-orange)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                <Sparkles size={14} className="animate-spin" />
                <span>Nigel's System Agent is analyzing query...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Email Capture Suggestion Banner */}
          <div style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--bg-card-sub)',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.78rem',
            color: 'var(--text-dim)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Mail size={13} color="var(--accent-orange)" />
              <span>Type your Gmail to log an inquiry to Nigel's Dashboard</span>
            </div>
            {onOpenGateway && (
              <button
                onClick={onOpenGateway}
                style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.75rem', fontWeight: 700 }}
              >
                Sign In
              </button>
            )}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{
              padding: '0.85rem 1rem',
              backgroundColor: 'var(--bg-card)',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <input
              type="text"
              className="admin-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything or enter your email..."
              style={{
                flex: 1,
                minHeight: '44px',
                padding: '0.6rem 1rem',
                fontSize: '0.9rem',
                backgroundColor: 'var(--bg-card-sub)'
              }}
              autoFocus
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="bento-btn bento-btn--accent"
              style={{
                minHeight: '44px',
                width: '44px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-sm)'
              }}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
