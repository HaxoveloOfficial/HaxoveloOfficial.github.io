/**
 * ==============================================================================
 * JOHN NIGEL LANDINGIN — PORTFOLIO CONFIGURATION DATA
 * ==============================================================================
 * Welcome! This file controls all the content on your website.
 * You can edit any text, link, project, or tool here WITHOUT touching complex code.
 * Save this file and refresh your browser to see your changes instantly.
 * ==============================================================================
 */

window.PORTFOLIO_DATA = {
  // --- 1. PERSONAL IDENTITY & SIDEBAR ---
  profile: {
    fullName: "John Nigel Landingin",
    verifiedBadge: true,
    handle: "@HaxoveloOfficial",
    role: "IT Systems Builder & Desktop Developer",
    degree: "BS Information Technology • STI College Tarlac",
    location: "Tarlac City, Philippines",
    coordinates: "15.4802° N, 120.5979° E",
    avatarPath: "assets/profile.jpg",
    resumePath: "assets/John_Nigel_Landingin_Resume.pdf",
    email: "landinginjohnnigel@gmail.com",
    phone: "+63 918 371 1271",
    statusText: "Available for Software & IT Roles",
    isAvailable: true,
    
    // Social Links
    socials: [
      { name: "GitHub", url: "https://github.com/HaxoveloOfficial", icon: "github" },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/john-nigel-landingin", icon: "linkedin" },
      { name: "Email", url: "mailto:landinginjohnnigel@gmail.com", icon: "mail" },
      { name: "Phone", url: "tel:+639183711271", icon: "phone" }
    ]
  },

  // --- 2. HERO HEADLINE ---
  hero: {
    badge: "OPERATIONAL ARCHITECTURE & IT SYSTEMS",
    title: "Build it once. Run it forever.",
    subtitle: "I engineer dependable offline-first desktop systems in C#/.NET, architect relational databases, build real-time interactive 3D tools in Unity, and diagnose enterprise IT infrastructure down to the motherboard.",
    ctaPrimary: { text: "Get in touch", href: "#contact" },
    ctaSecondary: { text: "Download CV (PDF)", href: "assets/John_Nigel_Landingin_Resume.pdf", isDownload: true }
  },

  // --- 3. DAILY DRIVERS (Tools I Work With ticker) ---
  dailyDrivers: [
    { name: "C# (.NET 8 / WinForms / WPF)", tag: "Desktop Architecture" },
    { name: "SQL Server & MySQL", tag: "Relational Schema" },
    { name: "Unity 3D Engine", tag: "Interactive Scripting" },
    { name: "Linux Administration (LPI)", tag: "CLI & Services" },
    { name: "Windows Server / Desktop", tag: "OS Deployment" },
    { name: "PC Hardware Diagnostics", tag: "Assembly & POST" },
    { name: "LAN Cabling (T568B)", tag: "Switch Patching" },
    { name: "Git & GitHub", tag: "Version Control" },
    { name: "Adobe Photoshop", tag: "Asset Design" }
  ],

  // --- 4. BENTO GRID: SELECTED PROJECTS ---
  projects: [
    {
      id: "logistics",
      tag: "CAPSTONE PROJECT",
      title: "Transport & Logistics Delivery Management System",
      description: "An offline-first desktop management suite engineered for regional distribution fleets. Manages driver routing, real-time cargo manifests, crew allocation, and automated billing calculation without relying on unstable internet connections.",
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
      id: "municipal",
      tag: "PUBLIC SERVICE & LGU",
      title: "Municipal Records & 4Ps Assistance Pipeline",
      description: "High-volume digital records processing and workstation infrastructure for the City Government of Tarlac (PESO) and Barangay Balete, managing citizen welfare registries with zero record loss.",
      techStack: ["Database Validation", "Windows Desktop Fleet", "IT Troubleshooting"],
      githubUrl: "https://github.com/HaxoveloOfficial",
      demoBadge: "Municipal Deployment",
      deepDive: {
        problem: "Slow physical paper records created citizen backlog during 4Ps welfare disbursements.",
        solution: "Digitized registries into standardized validated tables and maintained workstation uptime across city hall offices."
      }
    }
  ],

  // --- 5. BENTO GRID: SERVICES / WHAT I BUILD ---
  services: [
    { num: "01", name: "C#/.NET Desktop Applications", desc: "Reliable Windows GUI software, automated calculation engines, and offline caching." },
    { num: "02", name: "Relational Database Engineering", desc: "SQL Server & MySQL schema design, indexing, stored procedures, and audit logs." },
    { num: "03", name: "Interactive 3D Asset & Unity Tools", desc: "Virtual camera orbits, component breakdowns, and interactive catalog applications." },
    { num: "04", name: "Linux & Windows Systems Administration", desc: "OS configuration, user management, bash scripting, and preventive maintenance." },
    { num: "05", name: "PC Hardware Diagnostics & Network Setup", desc: "Component diagnostics, thermal optimization, and RJ45 LAN cable patching." }
  ],

  // --- 6. BENTO GRID: CREDENTIALS & AWARDS ---
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

  // --- 7. BENTO GRID: FIELD BENCH & HARDWARE STATS ---
  fieldStats: [
    { metric: "486+", label: "Enterprise Internship Hours Logged" },
    { metric: "100%", label: "Hardware Diagnostic POST Accuracy" },
    { metric: "0%", label: "Data Loss in LGU Citizen Archives" },
    { metric: "Sub-sec", label: "Local Database Query Latency" }
  ],

  // --- 8. TELEMETRY & FOOTER ---
  telemetry: {
    initialVisits: 1, // Real local visitor count (starts at 1)
    depotName: "Tarlac City Central Terminal",
    colophonText: "Engineered by John Nigel Landingin. Refuses to look like AI. 100% semantic HTML, modern CSS, and vanilla JS."
  }
};
