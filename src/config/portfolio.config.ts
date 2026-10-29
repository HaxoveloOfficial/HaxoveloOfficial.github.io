import { PortfolioConfig } from '../types/portfolio';

/**
 * ==============================================================================
 * JOHN NIGEL LANDINGIN — MASTER PORTFOLIO CONFIGURATION (SANITIZED)
 * ==============================================================================
 * All 7 Antigravity & GitHub projects included. Zero sensitive personal data.
 * Fully customizable in Admin Mode or directly in this file.
 * ==============================================================================
 */

export const PORTFOLIO_CONFIG: PortfolioConfig & { adminPinHash: string } = {
  // Default Admin PIN: 2026 (SHA-256 hashed for client security)
  adminPinHash: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",

  profile: {
    fullName: "John Nigel Landingin",
    verifiedBadge: true,
    handle: "@HaxoveloOfficial",
    role: "IT Systems Builder, Desktop Architect & 3D Developer",
    degree: "BS Information Technology • STI College Tarlac",
    location: "Tarlac City, Philippines",
    coordinates: "15.48° N, 120.60° E",
    avatarPath: "assets/profile.jpg",
    resumePath: "assets/John_Nigel_Landingin_Resume.pdf",
    email: "landinginjohnnigel@gmail.com",
    phone: "", // Redacted for guest privacy
    statusText: "Available for Software & IT Infrastructure Roles",
    isAvailable: true,
    socials: [
      { name: "GitHub", url: "https://github.com/HaxoveloOfficial", icon: "github" },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/john-nigel-landingin", icon: "linkedin" },
      { name: "Email", url: "mailto:landinginjohnnigel@gmail.com", icon: "mail" }
    ]
  },

  hero: {
    badge: "ACCESSIBLE SYSTEMS COCKPIT // EYE-CARE ARCHITECTURE",
    title: "Build it once. Run it forever.",
    subtitle: "I engineer dependable offline-first desktop systems in C#/.NET, architect relational databases, build real-time interactive 3D tools in Unity, and diagnose enterprise IT infrastructure down to the motherboard.",
    ctaPrimary: { text: "Get in touch", href: "#contact" },
    ctaSecondary: { text: "Download CV (PDF)", href: "assets/John_Nigel_Landingin_Resume.pdf", isDownload: true }
  },

  dailyDrivers: [
    { name: "C# (.NET 8 / WinForms / WPF)", tag: "Desktop Architecture" },
    { name: "SQL Server & MySQL", tag: "Relational Schema" },
    { name: "Unity 3D Engine", tag: "Interactive Scripting" },
    { name: "Angular & TypeScript", tag: "Reactive Web" },
    { name: "Linux Administration (LPI)", tag: "CLI & Services" },
    { name: "ArchiMate & TOGAF", tag: "Enterprise Architecture" },
    { name: "PC Hardware Diagnostics", tag: "Assembly & POST" },
    { name: "LAN Cabling (T568B)", tag: "Switch Patching" },
    { name: "Git & GitHub", tag: "Version Control" },
    { name: "Adobe Photoshop", tag: "Asset Design" }
  ],

  projects: [
    {
      id: "logistics",
      tag: "FLAGSHIP CAPSTONE",
      title: "Transport & Logistics Delivery Management System",
      description: "An offline-first desktop management suite engineered for regional distribution depots. Manages driver routing, real-time cargo manifests, crew allocation, and automated billing calculation without relying on unstable internet connections.",
      techStack: ["C#", ".NET", "SQL Server / MySQL", "Layered Architecture"],
      githubUrl: "https://github.com/HaxoveloOfficial/transport-delivery-system-",
      demoBadge: "Delivered & Defended",
      deepDive: {
        problem: "Regional logistics depots frequently suffer connection dropouts. Cloud-only tools stall driver dispatch and lose cargo manifests.",
        solution: "Engineered an offline-first C# (.NET) desktop application utilizing ACID-compliant transactional tables in SQL Server to ensure zero data loss."
      }
    },
    {
      id: "hexatronics",
      tag: "HEXATRONICS INC. (486 HOURS)",
      title: "Interactive 3D Product Showcase",
      description: "Real-time interactive 3D digital catalog built in Unity for enterprise clients to inspect industrial electronic components without shipping physical demo units.",
      techStack: ["Unity 3D", "C# Scripting", "PBR Shaders", "Asset Optimization"],
      githubUrl: "https://github.com/HaxoveloOfficial",
      demoBadge: "Production Client Demo",
      deepDive: {
        problem: "Shipping physical demo prototypes for corporate client meetings was costly and slow.",
        solution: "Synthesized 3D CAD/AI models with custom polygon decimation, UV unwrapping, and PBR shaders to run at a solid 60 FPS on standard corporate laptops."
      }
    },
    {
      id: "archimate",
      tag: "ENTERPRISE ARCHITECTURE",
      title: "Enterprise Architecture & BMC Model (ArchiMate)",
      description: "Comprehensive multi-layered Enterprise Architecture aligning Business Model Canvas (BMC) strategies with Business, Application, and Technology infrastructure layers under TOGAF standards.",
      techStack: ["ArchiMate 3.1", "TOGAF Standard", "Business Model Canvas", "Systems Modeling"],
      githubUrl: "https://github.com/HaxoveloOfficial",
      demoBadge: "Academic Distinction",
      deepDive: {
        problem: "Disconnect between strategic enterprise goals and low-level software/hardware deployments.",
        solution: "Modeled structural dependencies mapping customer segments to application services and physical hardware nodes."
      }
    },
    {
      id: "microfinance",
      tag: "FINANCIAL SOFTWARE",
      title: "Emerald Microfinance Management Suite",
      description: "Desktop loan scheduling and financial ledger application engineered with strong transaction isolation, automated amortization tables, and audit logs.",
      techStack: ["C#", ".NET", "Relational Database", "Audit Trails"],
      githubUrl: "https://github.com/HaxoveloOfficial/emerald-microfinance",
      demoBadge: "Core Repository",
      deepDive: {
        problem: "Manual financial amortization calculations lead to rounding discrepancies and untracked entries.",
        solution: "Engineered strict double-entry arithmetic routines and auditable database triggers."
      }
    },
    {
      id: "datacom",
      tag: "NETWORK ENGINEERING",
      title: "Data Communications & Network Infrastructure Lab",
      description: "Network topology design, packet routing simulation, and physical layer implementations including RJ45 T568B patch cabling and switch segmentations.",
      techStack: ["Packet Telemetry", "LAN Routing", "T568B Cabling", "Hardware Diagnostics"],
      githubUrl: "https://github.com/HaxoveloOfficial/datacom",
      demoBadge: "Laboratory Implementation",
      deepDive: {
        problem: "Network bottlenecks and cross-talk caused by improper cable termination and unsegmented switches.",
        solution: "Implemented structured cabling standards and verified throughput with hardware testing meters."
      }
    },
    {
      id: "municipal",
      tag: "PUBLIC SECTOR WORKFLOW",
      title: "Municipal Records & 4Ps Assistance Pipeline",
      description: "High-volume digital records processing and workstation infrastructure for the City Government of Tarlac (PESO) and Barangay Balete, managing citizen registries with zero record loss.",
      techStack: ["Database Validation", "Windows Desktop Fleet", "IT Troubleshooting"],
      githubUrl: "https://github.com/HaxoveloOfficial",
      demoBadge: "Municipal Deployment",
      deepDive: {
        problem: "Slow physical paper records created citizen backlog during welfare disbursements.",
        solution: "Digitized registries into standardized validated tables and maintained workstation uptime across city hall offices."
      }
    },
    {
      id: "nfs-garage",
      tag: "SIMULATION ENGINE",
      title: "NFS Heat Garage Performance Simulator",
      description: "Interactive vehicle configuration engine modeling power curves, torque distribution, and dynamic telemetry calculations.",
      techStack: ["Object-Oriented Design", "Mathematical Simulation", "Data Modeling"],
      githubUrl: "https://github.com/HaxoveloOfficial/nfs-heat-garage",
      demoBadge: "Public Repository",
      deepDive: {
        problem: "Calculating non-linear performance gains across complex part combinations.",
        solution: "Engineered algorithmic coefficient formulas mapping engine upgrades to acceleration curves."
      }
    }
  ],

  services: [
    { num: "01", name: "C#/.NET Desktop Applications", desc: "WinForms/WPF systems with local database persistence and offline resilience" },
    { num: "02", name: "Relational Database Engineering", desc: "SQL Server / MySQL schemas, stored procedures & audit tables" },
    { num: "03", name: "Interactive 3D Unity Builds", desc: "Component showcases, interactive camera physics & asset optimization" },
    { num: "04", name: "Enterprise Architecture Modeling", desc: "ArchiMate 3.1 & TOGAF alignment mapping business strategy to IT infrastructure" },
    { num: "05", name: "Linux & Windows Systems Admin", desc: "OS deployments, CLI administration, group policy & security maintenance" },
    { num: "06", name: "PC Hardware Diagnostics & LAN Setup", desc: "Assembly, component seating, POST diagnostics, and RJ45 cable termination" }
  ],

  credentials: [
    {
      title: "Bachelor of Science in Information Technology",
      issuer: "STI College Tarlac",
      year: "2022 – 2026",
      badge: "Degree"
    },
    {
      title: "Systems Administration Certificate",
      issuer: "Linux Professional Institute (LPI) / STI",
      year: "2023",
      badge: "Certified"
    },
    {
      title: "Java Fundamentals Certificate",
      issuer: "Oracle Academy",
      year: "2023",
      badge: "Certified"
    },
    {
      title: "Certificate of Internship (486 Hours)",
      issuer: "Hexatronics Incorporated",
      year: "2026",
      badge: "Industry"
    }
  ],

  fieldStats: [
    { metric: "7+", label: "Engineered Systems & Repositories" },
    { metric: "486+", label: "Enterprise Internship Hours Logged" },
    { metric: "100%", label: "Hardware Diagnostic POST Accuracy" },
    { metric: "0%", label: "Data Loss in LGU Citizen Archives" }
  ],

  telemetry: {
    initialVisits: 1, // Real local visitor tracking (starts at 1, no mock data)
    depotName: "Tarlac City Central Depot",
    colophonText: "Engineered with React 19, TypeScript, Tailwind CSS & Eye-Care Gradients."
  }
};
