import React, { useState, useEffect } from 'react';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';
import { ProjectItem } from '../types/portfolio';
import { ExternalLink, X, Terminal, Cpu, Sparkles, Layers, ShieldCheck, Database, HardDrive, ArrowUpRight, Lock, CheckCircle2 } from 'lucide-react';

interface BrewedOpsProjectsViewProps {
  isGuest: boolean;
  onOpenProjectInspector: (id: string) => void;
  onOpenGateway: () => void;
  onOpenAiAssistant?: () => void;
  onShowToast: (msg: string) => void;
}

type FilterCategory = 'all' | 'desktop' | '3d' | 'enterprise' | 'infrastructure';

// Workflow Blueprint Marquee Items
const WORKFLOW_MARQUEE_ITEMS = [
  {
    id: 'wf-capstone',
    title: 'C# .NET 8 State Machine & Offline SQLite Cache',
    category: 'CAPSTONE ARCHITECTURE',
    desc: 'Local write-ahead log buffer synching to SQL Server on network reconnection.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    projectId: 'logistics'
  },
  {
    id: 'wf-unity',
    title: 'Hexatronics 3D PBR Shaders & Exploded CAD Mesh',
    category: 'UNITY 3D PIPELINE',
    desc: 'Interactive component dissection with real-time lighting rigs (486 certified hours).',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    projectId: 'hexatronics'
  },
  {
    id: 'wf-archimate',
    title: 'TOGAF Enterprise ArchiMate 3.1 Capability Map',
    category: 'ENTERPRISE ARCHITECTURE',
    desc: 'Mapping technical application nodes directly to Business Model Canvas (BMC).',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    projectId: 'archimate'
  },
  {
    id: 'wf-microfinance',
    title: 'Emerald Double-Entry Relational Accounting Engine',
    category: 'DATABASE AUDIT TRAIL',
    desc: 'ACID transaction boundary preventing debit/credit discrepancies and loan defaults.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    projectId: 'microfinance'
  },
  {
    id: 'wf-lgu',
    title: 'Municipal Citizen Records Data-Loss Prevention',
    category: 'CIVIC IT ARCHIVES',
    desc: 'City of Tarlac PESO & Barangay Balete records pipeline with 0% historical loss.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    projectId: 'municipal'
  },
  {
    id: 'wf-lan',
    title: 'T568B RJ45 Subnet Routing & VLAN Diagnostics',
    category: 'PHYSICAL INFRASTRUCTURE',
    desc: 'Switch patch panel termination and motherboard POST diagnostic telemetry.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    projectId: 'datacom'
  }
];

export const BrewedOpsProjectsView: React.FC<BrewedOpsProjectsViewProps> = ({
  isGuest,
  onOpenProjectInspector,
  onOpenGateway,
  onOpenAiAssistant,
  onShowToast
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [activeLightboxImage, setActiveLightboxImage] = useState<typeof WORKFLOW_MARQUEE_ITEMS[0] | null>(null);

  const handleFilterChange = (cat: FilterCategory, label: string) => {
    setActiveFilter(cat);
    onShowToast(`Filtered: ${label}`);
  };

  // Keyboard Escape listener for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalProject(null);
        setActiveLightboxImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter project list
  const filterMap: Record<FilterCategory, (p: ProjectItem) => boolean> = {
    all: () => true,
    desktop: (p) => p.tag.includes('DESKTOP') || p.tag.includes('FINANCIAL') || p.tag.includes('MUNICIPAL') || p.techStack.includes('C#'),
    '3d': (p) => p.tag.includes('3D') || p.techStack.includes('Unity 3D') || p.tag.includes('SIMULATION'),
    enterprise: (p) => p.tag.includes('ENTERPRISE') || p.techStack.includes('ArchiMate 3.1'),
    infrastructure: (p) => p.tag.includes('NETWORKING') || p.tag.includes('HARDWARE') || p.techStack.includes('Network Routing')
  };

  const filteredProjects = PORTFOLIO_CONFIG.projects.filter(filterMap[activeFilter]);

  // Counts for pill tabs
  const getCount = (cat: FilterCategory) => PORTFOLIO_CONFIG.projects.filter(filterMap[cat]).length;

  return (
    <section className="brewed-projects-section" id="bento-projects">
      {/* 1. Projects Header */}
      <div className="projects__header">
        <span className="projects__eyebrow">
          <Terminal size={14} />
          <span>WORK & ENGINEERING BLUEPRINTS // BREWEDOPS ARCHITECTURE</span>
        </span>
        <h2 className="projects__headline">
          Real apps, systems and engineering builds you can open.
        </h2>
        <p className="projects__subhead">
          Explore production desktop solutions built in C#/.NET, interactive 3D media in Unity, and enterprise systems modeled with TOGAF & ArchiMate.
        </p>
      </div>

      {/* 2. Interactive Filter Pill Toolbar */}
      <div className="projects__tabs">
        <button
          onClick={() => handleFilterChange('all', 'All Builds')}
          className={`projects__tab ${activeFilter === 'all' ? 'is-active' : ''}`}
        >
          <span>All Builds</span>
          <span className="projects__tab-count">{getCount('all')}</span>
        </button>

        <button
          onClick={() => handleFilterChange('desktop', 'C# / Desktop')}
          className={`projects__tab ${activeFilter === 'desktop' ? 'is-active' : ''}`}
        >
          <span>C# / Desktop</span>
          <span className="projects__tab-count">{getCount('desktop')}</span>
        </button>

        <button
          onClick={() => handleFilterChange('3d', 'Unity 3D')}
          className={`projects__tab ${activeFilter === '3d' ? 'is-active' : ''}`}
        >
          <span>Unity 3D</span>
          <span className="projects__tab-count">{getCount('3d')}</span>
        </button>

        <button
          onClick={() => handleFilterChange('enterprise', 'Enterprise ArchiMate')}
          className={`projects__tab ${activeFilter === 'enterprise' ? 'is-active' : ''}`}
        >
          <span>Enterprise ArchiMate</span>
          <span className="projects__tab-count">{getCount('enterprise')}</span>
        </button>

        <button
          onClick={() => handleFilterChange('infrastructure', 'LAN & Systems')}
          className={`projects__tab ${activeFilter === 'infrastructure' ? 'is-active' : ''}`}
        >
          <span>LAN & Systems</span>
          <span className="projects__tab-count">{getCount('infrastructure')}</span>
        </button>
      </div>

      {/* 3. Feature: Interactive System Reel Preview Card (.funnels__panel) */}
      <div className="funnels__panel">
        {/* Left Card: Primary Hero Project (Capstone Logistics) */}
        <div 
          className="funnels__preview"
          role="button"
          tabIndex={0}
          onClick={() => setActiveModalProject(PORTFOLIO_CONFIG.projects[0])}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setActiveModalProject(PORTFOLIO_CONFIG.projects[0]);
            }
          }}
          title="Click to open macOS Interactive System Inspector"
        >
          <div className="funnels__preview-bar">
            <div className="funnels__lights">
              <span className="funnels__dot funnels__dot--r"></span>
              <span className="funnels__dot funnels__dot--y"></span>
              <span className="funnels__dot funnels__dot--g"></span>
            </div>
            <div className="funnels__url-pill">
              https://haxoveloofficial.github.io/capstone-logistics
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--accent-ink)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
              LIVE PREVIEW
            </span>
          </div>

          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', backgroundColor: '#070D18' }}>
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80" 
              alt="Capstone Logistics System" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', background: 'rgba(6, 12, 26, 0.85)', backdropFilter: 'blur(8px)', padding: '0.85rem 1.25rem', borderRadius: '12px', border: '1px solid var(--divider)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--accent-hover)', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
                  FEATURED CAPSTONE SYSTEM
                </span>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                  Transport & Logistics Delivery Management
                </h4>
              </div>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#38bdf8', fontSize: '0.82rem', fontWeight: 700 }}>
                <span>Inspect</span>
                <ArrowUpRight size={15} />
              </span>
            </div>
          </div>

          <div className="funnels__preview-content">
            <p style={{ fontSize: '0.92rem', color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>
              Built in <strong>C# (.NET 8)</strong> with <strong>SQL Server</strong>. Solves depot latency with offline-first SQLite write-ahead caching, ACID transaction rollback, and role-based permissions.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {['C#', '.NET 8', 'WinForms', 'SQL Server', 'Offline Caching'].map((tech, i) => (
                <span key={i} className="app-card__tech-tag">{tech}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Card: Interactive 3D Showcase (Hexatronics) */}
        <div 
          className="funnels__preview"
          role="button"
          tabIndex={0}
          onClick={() => setActiveModalProject(PORTFOLIO_CONFIG.projects[1])}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setActiveModalProject(PORTFOLIO_CONFIG.projects[1]);
            }
          }}
          title="Click to open macOS Interactive System Inspector"
        >
          <div className="funnels__preview-bar">
            <div className="funnels__lights">
              <span className="funnels__dot funnels__dot--r"></span>
              <span className="funnels__dot funnels__dot--y"></span>
              <span className="funnels__dot funnels__dot--g"></span>
            </div>
            <div className="funnels__url-pill">
              https://haxoveloofficial.github.io/hexatronics-3d
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--accent-ink)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
              UNITY 3D ENGINE
            </span>
          </div>

          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', backgroundColor: '#070D18' }}>
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80" 
              alt="Hexatronics Interactive 3D Showcase" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', background: 'rgba(6, 12, 26, 0.85)', backdropFilter: 'blur(8px)', padding: '0.85rem 1.25rem', borderRadius: '12px', border: '1px solid var(--divider)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#fbbf24', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
                  486 CERTIFIED INTERNSHIP HOURS
                </span>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                  Interactive 3D Product & CAD Showcase
                </h4>
              </div>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#fbbf24', fontSize: '0.82rem', fontWeight: 700 }}>
                <span>Inspect</span>
                <ArrowUpRight size={15} />
              </span>
            </div>
          </div>

          <div className="funnels__preview-content">
            <p style={{ fontSize: '0.92rem', color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>
              Interactive CAD component showcase developed in <strong>Unity 3D</strong> with real-time PBR material shaders, dynamic camera orbit controls, and mesh dissection.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {['Unity 3D', 'C# Scripting', 'PBR Shaders', 'Dynamic Lighting'].map((tech, i) => (
                <span key={i} className="app-card__tech-tag">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Feature: Workflow & Architecture Samples Infinite Marquee Strip (.wfs) */}
      <div className="wfs">
        <div className="wfs__caption">
          REAL SCHEMAS & ARCHITECTURE FROM THE SYSTEMS I BUILD (HOVER TO PAUSE • CLICK TO ZOOM)
        </div>

        <div className="wfs__strip">
          <div className="wfs__track">
            {/* Duplicated for seamless infinite loop */}
            {[...WORKFLOW_MARQUEE_ITEMS, ...WORKFLOW_MARQUEE_ITEMS].map((item, idx) => (
              <button 
                key={`${item.id}-${idx}`}
                className="wfs__frame"
                onClick={() => setActiveLightboxImage(item)}
                title="Click to zoom blueprint"
              >
                <div className="wfs__frame-bar">
                  <div className="funnels__lights">
                    <span className="funnels__dot funnels__dot--r"></span>
                    <span className="funnels__dot funnels__dot--y"></span>
                    <span className="funnels__dot funnels__dot--g"></span>
                  </div>
                  <span className="wfs__frame-title">{item.category}</span>
                </div>

                <div className="wfs__img-box">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '0.65rem 1rem', background: 'linear-gradient(180deg, transparent 0%, rgba(6,12,26,0.92) 100%)', color: '#ffffff' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>{item.title}</div>
                    <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>{item.desc}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Feature: AI Agents & Engineering Harness (.aig) */}
      <div className="aig">
        <div className="aig__head">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <span className="aig__eyebrow">INTELLIGENT SYSTEMS & RAG ARCHITECTURES</span>
            <h3 className="aig__title">AI Agents, Automation Pipelines & Core Runtimes</h3>
          </div>

          <div className="aig__harness">
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)', marginRight: '4px' }}>
              TECH HARNESS:
            </span>
            {['C# / .NET 8', 'Unity 3D', 'SQL Server', 'Python / RAG', 'React 19', 'LPI Linux'].map((t, i) => (
              <span key={i} className="aig__harness-pill">{t}</span>
            ))}
          </div>
        </div>

        <div className="aig__cards">
          {/* Agent 1: 24/7 Depot AI Systems Agent */}
          <div className="aig__card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="aig__status aig__status--live">● 24/7 ONLINE</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>CLIENT RAG</span>
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
              Depot AI Systems Assistant
            </h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--muted)', lineHeight: 1.5, margin: 0 }}>
              Context-grounded agent with zero hallucination. Explains John Nigel's C# Capstone, Unity 3D engine scripts, and logs visitor emails to the Operator Dashboard.
            </p>
            <div style={{ marginTop: 'auto', paddingTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>Zero Server Sleep</span>
              <button 
                onClick={() => {
                  if (onOpenAiAssistant) {
                    onOpenAiAssistant();
                  } else {
                    const trigger = document.querySelector('.ai-assistant-trigger') as HTMLButtonElement;
                    if (trigger) trigger.click();
                  }
                }}
                className="bento-btn bento-btn--sm bento-btn--accent"
                style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}
              >
                Launch Chat
              </button>
            </div>
          </div>

          {/* Agent 2: Capstone Dispatch Concurrency Engine */}
          <div className="aig__card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="aig__status aig__status--live">● PRODUCTION READY</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>T-SQL ACID</span>
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
              Logistics Dispatch Concurrency Engine
            </h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--muted)', lineHeight: 1.5, margin: 0 }}>
              Automated conflict resolution engine that prevents freight double-booking through deterministic transaction locks and driver GPS route assignment.
            </p>
            <div style={{ marginTop: 'auto', paddingTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>C# / .NET 8</span>
              <button 
                onClick={() => onOpenProjectInspector('logistics')}
                className="bento-btn bento-btn--sm bento-btn--outline"
                style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}
              >
                Inspect Schema
              </button>
            </div>
          </div>

          {/* Agent 3: Hexatronics Exploded Mesh Analyzer */}
          <div className="aig__card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="aig__status aig__status--live">● 486 HRS CERTIFIED</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>PBR SHADERS</span>
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
              Hexatronics 3D CAD Dissection Tool
            </h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--muted)', lineHeight: 1.5, margin: 0 }}>
              Real-time hardware component dissection written in C# for Unity 3D, enabling multi-angle engineering audits without physical teardowns.
            </p>
            <div style={{ marginTop: 'auto', paddingTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>Unity 3D Engine</span>
              <button 
                onClick={() => onOpenProjectInspector('hexatronics')}
                className="bento-btn bento-btn--sm bento-btn--outline"
                style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}
              >
                Inspect 3D
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Feature: 4-Column Systems & Tools Matrix (.projects__apps) */}
      <div>
        <div style={{ marginBottom: '1.25rem' }}>
          <span className="projects__eyebrow">COMPLETE PRODUCTION REPOSITORIES</span>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy)', margin: '0.25rem 0 0' }}>
            Desktop Applications & Infrastructure Systems ({filteredProjects.length})
          </h3>
        </div>

        <div className="projects__apps">
          {filteredProjects.map((project) => (
            <div key={project.id} className="app-card">
              <div>
                <div className="app-card__head">
                  <div className="app-card__icon">
                    {project.tag.includes('DESKTOP') ? <Cpu size={22} /> :
                     project.tag.includes('3D') ? <Sparkles size={22} /> :
                     project.tag.includes('ENTERPRISE') ? <Layers size={22} /> :
                     project.tag.includes('FINANCIAL') ? <Database size={22} /> :
                     project.tag.includes('MUNICIPAL') ? <ShieldCheck size={22} /> :
                     <HardDrive size={22} />}
                  </div>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', padding: '0.2rem 0.55rem', borderRadius: '4px', background: 'var(--paper)', border: '1px solid var(--divider)', color: 'var(--accent-ink)', fontWeight: 700 }}>
                    {project.tag}
                  </span>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <h4 className="app-card__title">{project.title}</h4>
                  <p className="app-card__desc" style={{ marginTop: '0.5rem' }}>
                    {project.description}
                  </p>
                </div>
              </div>

              <div>
                <div className="app-card__tech" style={{ marginBottom: '0.85rem' }}>
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="app-card__tech-tag">{tech}</span>
                  ))}
                </div>

                <div className="app-card__foot">
                  <button 
                    onClick={() => onOpenProjectInspector(project.id)}
                    className="bento-btn bento-btn--sm bento-btn--outline"
                    style={{ fontSize: '0.78rem', minHeight: '34px', padding: '0.35rem 0.85rem' }}
                  >
                    <span>Inspect</span>
                  </button>

                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bento-btn bento-btn--sm bento-btn--accent"
                    style={{ fontSize: '0.78rem', minHeight: '34px', padding: '0.35rem 0.85rem' }}
                  >
                    <span>GitHub</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. macOS Live System Browser Modal */}
      {activeModalProject && (
        <div className="macos-modal-backdrop" onClick={() => setActiveModalProject(null)}>
          <div className="macos-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="macos-modal-bar">
              <div className="funnels__lights">
                <button 
                  onClick={() => setActiveModalProject(null)} 
                  className="funnels__dot funnels__dot--r" 
                  title="Close (Esc)" 
                  style={{ border: 'none', cursor: 'pointer' }}
                />
                <span className="funnels__dot funnels__dot--y"></span>
                <span className="funnels__dot funnels__dot--g"></span>
              </div>

              <div className="macos-modal-address">
                <ShieldCheck size={14} color="var(--success)" />
                <span>https://github.com/HaxoveloOfficial/{activeModalProject.id}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <a 
                  href={activeModalProject.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bento-btn bento-btn--sm bento-btn--accent"
                  style={{ fontSize: '0.75rem', padding: '0.35rem 0.85rem' }}
                >
                  <ExternalLink size={13} />
                  <span>Open GitHub</span>
                </a>
                <button 
                  onClick={() => setActiveModalProject(null)} 
                  className="icon-btn" 
                  style={{ width: '32px', height: '32px' }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="macos-modal-body">
              <div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 800 }}>
                  {activeModalProject.tag} // ARCHITECTURE INSPECTOR
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', margin: '0.25rem 0 0.5rem' }}>
                  {activeModalProject.title}
                </h3>
                <p style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                  {activeModalProject.description}
                </p>
              </div>

              {isGuest ? (
                <div style={{
                  padding: '1.75rem',
                  borderRadius: '16px',
                  border: '2px solid var(--accent)',
                  backgroundColor: 'var(--paper)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent)' }}>
                    <Lock size={22} />
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                      TECHNICAL ARCHITECTURE RESTRICTED (GUEST MODE)
                    </h4>
                  </div>
                  <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                    Detailed database schemas, offline-first C# state management, and source code blueprints are restricted to authenticated operators and verified Gmail accounts.
                  </p>
                  <div>
                    <button 
                      onClick={() => {
                        setActiveModalProject(null);
                        onOpenGateway();
                      }}
                      className="bento-btn bento-btn--accent"
                    >
                      Sign In or Create Account to Unlock
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ backgroundColor: 'var(--paper)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--divider)' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.4rem' }}>
                      The Operational Problem
                    </h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                      {activeModalProject.deepDive.problem}
                    </p>
                  </div>

                  <div style={{ backgroundColor: 'var(--paper)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--divider)' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '0.4rem' }}>
                      Technical Architecture & Solution Blueprint
                    </h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                      {activeModalProject.deepDive.solution}
                    </p>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.5rem' }}>
                      Verified Technology Stack
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {activeModalProject.techStack.map((tech, i) => (
                        <span key={i} className="app-card__tech-tag" style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 8. Fullscreen Lightbox Zoom Modal for Workflows */}
      {activeLightboxImage && (
        <div className="macos-modal-backdrop" onClick={() => setActiveLightboxImage(null)}>
          <div 
            className="macos-modal-window" 
            style={{ maxWidth: '880px' }} 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="macos-modal-bar">
              <div className="funnels__lights">
                <button 
                  onClick={() => setActiveLightboxImage(null)} 
                  className="funnels__dot funnels__dot--r" 
                  title="Close (Esc)" 
                  style={{ border: 'none', cursor: 'pointer' }}
                />
                <span className="funnels__dot funnels__dot--y"></span>
                <span className="funnels__dot funnels__dot--g"></span>
              </div>

              <div className="macos-modal-address">
                <CheckCircle2 size={14} color="var(--success)" />
                <span>Blueprint: {activeLightboxImage.category}</span>
              </div>

              <button 
                onClick={() => setActiveLightboxImage(null)} 
                className="icon-btn" 
                style={{ width: '32px', height: '32px' }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: '#070D18' }}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--divider)' }}>
                <img 
                  src={activeLightboxImage.image} 
                  alt={activeLightboxImage.title} 
                  style={{ width: '100%', maxHeight: '520px', objectFit: 'contain' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#ffffff' }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                    {activeLightboxImage.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#cbd5e1', margin: '0.25rem 0 0' }}>
                    {activeLightboxImage.desc}
                  </p>
                </div>
                <button 
                  onClick={() => {
                    const pid = activeLightboxImage.projectId;
                    setActiveLightboxImage(null);
                    onOpenProjectInspector(pid);
                  }}
                  className="bento-btn bento-btn--accent bento-btn--sm"
                >
                  Inspect Full Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
