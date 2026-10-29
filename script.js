/**
 * ==============================================================================
 * JOHN NIGEL LANDINGIN — BENTO WORKSPACE RUNTIME SCRIPT
 * ==============================================================================
 * Connects portfolio.config.js, drives the tactile interactions,
 * live telemetry, visitor counter, and architecture deep dives.
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  loadConfigData();
  initLiveClock();
  initThemeCycle();
  initVisitorCounter();
  initCopyActions();
  initSpecModal();
  initScrollSpy();
});

/* ==============================================================================
   1. Dynamic Config Data Loader
   ============================================================================== */
function loadConfigData() {
  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  // Profile data
  if (data.profile) {
    const nameEl = document.getElementById('dyn-name');
    const handleEl = document.getElementById('dyn-handle');
    const roleEl = document.getElementById('dyn-role');
    const avatarEl = document.getElementById('dyn-avatar');

    if (nameEl) nameEl.textContent = data.profile.fullName;
    if (handleEl) {
      handleEl.textContent = data.profile.handle;
      const gh = data.profile.socials?.find(s => s.name === 'GitHub');
      if (gh) handleEl.href = gh.url;
    }
    if (roleEl) roleEl.textContent = data.profile.role;
    if (avatarEl && data.profile.avatarPath) avatarEl.src = data.profile.avatarPath;
  }

  // Hero data
  if (data.hero) {
    const badgeEl = document.querySelector('#dyn-hero-badge span:last-child');
    const titleEl = document.getElementById('dyn-hero-title');
    const subEl = document.getElementById('dyn-hero-sub');

    if (badgeEl && data.hero.badge) badgeEl.textContent = data.hero.badge;
    if (titleEl && data.hero.title) titleEl.textContent = data.hero.title;
    if (subEl && data.hero.subtitle) subEl.textContent = data.hero.subtitle;
  }

  // Daily Drivers Ribbon
  if (Array.isArray(data.dailyDrivers)) {
    const track = document.getElementById('drivers-track');
    if (track) {
      track.innerHTML = '';
      data.dailyDrivers.forEach(tool => {
        const pill = document.createElement('span');
        pill.className = 'driver-pill';
        pill.innerHTML = `<strong>${tool.name}</strong> <span style="opacity:0.5; font-size:0.85em;">• ${tool.tag}</span>`;
        track.appendChild(pill);
      });
    }
  }

  // Credentials
  if (Array.isArray(data.credentials)) {
    const credList = document.getElementById('bento-credentials-list');
    if (credList) {
      credList.innerHTML = '';
      data.credentials.forEach(cred => {
        const item = document.createElement('div');
        item.className = 'cred-row-item';
        item.innerHTML = `
          <div class="cred-row-info">
            <span class="cred-row-title">${cred.title}</span>
            <span class="cred-row-sub">${cred.issuer} • ${cred.year}</span>
          </div>
          <span class="cred-pill">${cred.badge}</span>
        `;
        credList.appendChild(item);
      });
    }
  }

  // Services
  if (Array.isArray(data.services)) {
    const servList = document.getElementById('services-bento-list');
    if (servList) {
      servList.innerHTML = '';
      data.services.forEach(serv => {
        const item = document.createElement('li');
        item.className = 'service-row';
        item.innerHTML = `
          <div class="service-row-left">
            <span class="service-name">${serv.name}</span>
            <span class="service-desc">${serv.desc}</span>
          </div>
          <span class="service-num">${serv.num}</span>
        `;
        servList.appendChild(item);
      });
    }
  }
}

/* ==============================================================================
   2. Live Tarlac Telemetry Clock (Asia/Manila - UTC+8)
   ============================================================================== */
function initLiveClock() {
  const clock = document.getElementById('sidebar-clock');
  if (!clock) return;

  function update() {
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      clock.textContent = `${formatter.format(now)} PST`;
    } catch (e) {
      clock.textContent = new Date().toLocaleTimeString() + ' PH';
    }
  }

  update();
  setInterval(update, 1000);
}

/* ==============================================================================
   3. Theme Switcher (Cycle Dark -> Light -> Terminal)
   ============================================================================== */
function initThemeCycle() {
  const root = document.documentElement;
  const cycleBtn = document.getElementById('theme-cycle-btn');
  const themes = ['dark', 'light', 'terminal'];
  
  let currentTheme = localStorage.getItem('jnl_theme') || 'dark';
  root.setAttribute('data-theme', currentTheme);

  cycleBtn?.addEventListener('click', () => {
    let nextIdx = (themes.indexOf(currentTheme) + 1) % themes.length;
    currentTheme = themes[nextIdx];
    root.setAttribute('data-theme', currentTheme);
    localStorage.setItem('jnl_theme', currentTheme);
    showToast(`Switched to ${currentTheme.toUpperCase()} theme`);
  });
}

/* ==============================================================================
   4. Visitor Counter Badge (Like Kenneth's Site)
   ============================================================================== */
function initVisitorCounter() {
  const counterEl = document.getElementById('visitor-count');
  if (!counterEl) return;

  const seed = 1;
  let stored = parseInt(localStorage.getItem('jnl_visits'), 10);
  
  if (isNaN(stored) || stored < seed || stored > 1000) {
    stored = seed;
  } else {
    stored += 1;
  }
  
  localStorage.setItem('jnl_visits', stored);
  counterEl.textContent = `${stored.toLocaleString()} visits`;
}

/* ==============================================================================
   5. Copy Email / Contact Action + Toast
   ============================================================================== */
function initCopyActions() {
  const copyButtons = document.querySelectorAll('.copy-email-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'landinginjohnnigel@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        showToast(`Copied: ${email}`);
      } catch (err) {
        window.prompt('Copy email:', email);
      }
    });
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ==============================================================================
   6. Technical Specification & Architecture Deep-Dive Modal
   ============================================================================== */
const SPECS_DATA = {
  logistics: {
    tag: "CAPSTONE ARCHITECTURE // DESKTOP SYSTEM",
    title: "Transport & Logistics Delivery Management System",
    html: `
      <h4>System Context & Depot Environment</h4>
      <p>Regional transit depots frequently experience intermittent or severed network connectivity. Web-dependent solutions failed during outages, halting truck turnarounds and losing critical freight manifests.</p>
      
      <h4>Technical Architecture</h4>
      <ul>
        <li><strong>Language & Framework:</strong> C# (.NET Framework / Core) desktop client utilizing multi-layered architecture (Presentation, Business Logic, Data Access).</li>
        <li><strong>Database Engine:</strong> SQL Server / MySQL with ACID-compliant transactions. Ensures complete offline autonomy with local queuing and stored procedures.</li>
        <li><strong>Automated Calculation Engine:</strong> Dynamic freight billing formula factoring cargo tonnage, volumetric tare weight, and driver allowances in milliseconds.</li>
      </ul>

      <h4>Verification & Defense</h4>
      <p>Successfully defended and delivered at STI College Tarlac. Codebase published on GitHub at <a href="https://github.com/HaxoveloOfficial/transport-delivery-system-" target="_blank" style="color:var(--accent); text-decoration:underline;">HaxoveloOfficial/transport-delivery-system-</a>.</p>
    `
  },
  hexatronics: {
    tag: "ENTERPRISE APPLICATION // 3D GRAPHICS",
    title: "Interactive 3D Product Showcase (Hexatronics Inc.)",
    html: `
      <h4>Enterprise Internship Scope (486 Hours)</h4>
      <p>Designed and programmed a real-time interactive 3D digital catalog allowing corporate clients to inspect complex industrial hardware components without shipping physical prototypes.</p>

      <h4>Engineering Execution</h4>
      <ul>
        <li><strong>Game Engine:</strong> Unity 3D Engine with modular C# scripts governing virtual camera orbits, part dissections, and hover inspection raycasts.</li>
        <li><strong>Asset Optimization:</strong> Custom polygon decimation, UV unwrapping, and PBR shaders to maintain steady 60 FPS performance on standard corporate integrated graphics.</li>
        <li><strong>Collateral Integration:</strong> Coordinated with technical marketing to deliver corporate video reels, catalogs, and print documentation using Adobe Photoshop.</li>
      </ul>
    `
  },
  municipal: {
    tag: "PUBLIC SECTOR WORKFLOW // MUNICIPAL GOVERNMENT",
    title: "Municipal Records & 4Ps Assistance Pipeline",
    html: `
      <h4>Public Service Deployment</h4>
      <p>Conducted across the City Government of Tarlac (PESO) and Barangay Balete Local Government Unit, supporting high-throughput public welfare registration and digital census archives.</p>

      <h4>Operational Highlights</h4>
      <ul>
        <li><strong>4Ps Welfare Integrity:</strong> Processed and maintained thousands of beneficiary records for national social welfare programs with zero record loss.</li>
        <li><strong>Workstation Fleet Support:</strong> Managed on-site diagnostic repairs, peripheral setup, and OS troubleshooting across municipal office terminals.</li>
      </ul>
    `
  }
};

function initSpecModal() {
  const dialog = document.getElementById('spec-dialog');
  const closeBtn = document.getElementById('modal-close');
  const closeBtnFoot = document.getElementById('modal-close-btn');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');

  if (!dialog) return;

  document.querySelectorAll('.inspect-spec-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      const data = SPECS_DATA[key];
      if (!data) return;

      modalTag.textContent = data.tag;
      modalTitle.textContent = data.title;
      modalBody.innerHTML = data.html;

      dialog.showModal();
    });
  });

  const close = () => dialog.close();
  closeBtn?.addEventListener('click', close);
  closeBtnFoot?.addEventListener('click', close);

  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const inDialog = (
      rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width
    );
    if (!inDialog) dialog.close();
  });
}

/* ==============================================================================
   7. Smooth Active Navigation Spy
   ============================================================================== */
function initScrollSpy() {
  const navLinks = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id], article[id], header[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 150;

    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
