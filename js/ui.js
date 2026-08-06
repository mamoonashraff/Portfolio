// Dynamic UI Logic for Mamoon Ashraf Portfolio

// Typing Effect Component
function initTypingEffect(taglines) {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement || !taglines || taglines.length === 0) return;

  let taglineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function type() {
    const currentTagline = taglines[taglineIndex];

    if (isDeleting) {
      typingElement.textContent = currentTagline.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typingElement.textContent = currentTagline.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentTagline.length) {
      typeSpeed = 2000; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      taglineIndex = (taglineIndex + 1) % taglines.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// Render Projects Grid
function renderProjects(projects, filter = 'all') {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const filtered = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  grid.innerHTML = filtered.map(p => `
    <div class="glass-card project-card reveal-on-scroll">
      <div class="project-img-wrapper">
        <img src="${p.image}" alt="${p.title}" class="project-img" loading="lazy">
        <span class="project-badge">${p.role}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description}</p>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="project-actions">
          <button class="btn-details" onclick="openProjectModal('${p.id}')">
            <span>View Case Study</span>
            <i class="fas fa-arrow-right"></i>
          </button>
          ${p.details.demo !== '#' ? `<a href="${p.details.demo}" target="_blank" class="tag" style="color:var(--accent-cyan)"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  // Re-trigger scroll animations for new elements
  initScrollObserver();
}

// Project Modal Handler
function openProjectModal(projectId) {
  const project = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
  if (!project) return;

  const modalOverlay = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body-content');

  modalBody.innerHTML = `
    <div style="margin-bottom: 24px;">
      <span class="project-badge" style="position:static; display:inline-block; margin-bottom:12px;">${project.role}</span>
      <h2 style="font-size:2.2rem; margin-bottom:8px;">${project.title}</h2>
      <p style="color:var(--accent-cyan); font-family:var(--font-code); font-size:0.9rem;">Status: ${project.status}</p>
    </div>
    
    <img src="${project.image}" alt="${project.title}" style="width:100%; height:280px; object-fit:cover; border-radius:var(--radius-md); margin-bottom:24px;">
    
    <div style="margin-bottom:24px;">
      <h4 style="font-size:1.1rem; color:var(--accent-purple); margin-bottom:8px;">The Challenge & Problem</h4>
      <p style="color:var(--text-secondary); line-height:1.6;">${project.details.problem}</p>
    </div>

    <div style="margin-bottom:24px;">
      <h4 style="font-size:1.1rem; color:var(--accent-cyan); margin-bottom:8px;">Architecture & Solution</h4>
      <p style="color:var(--text-secondary); line-height:1.6;">${project.details.solution}</p>
    </div>

    <div style="margin-bottom:24px;">
      <h4 style="font-size:1.1rem; margin-bottom:12px;">Key Features</h4>
      <ul style="list-style-type:none; display:grid; gap:10px;">
        ${project.details.features.map(f => `
          <li style="display:flex; align-items:center; gap:10px; color:var(--text-secondary);">
            <i class="fas fa-check-circle" style="color:var(--accent-emerald)"></i>
            <span>${f}</span>
          </li>
        `).join('')}
      </ul>
    </div>

    <div style="display:flex; gap:16px; margin-top:32px;">
      ${project.details.github !== '#' ? `<a href="${project.details.github}" target="_blank" class="btn btn-outline"><i class="fab fa-github"></i> View Repository</a>` : ''}
      ${project.details.demo !== '#' ? `<a href="${project.details.demo}" target="_blank" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> Launch Demo</a>` : ''}
    </div>
  `;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modalOverlay = document.getElementById('project-modal');
  modalOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Skills Progress Animation on Scroll
function animateSkills() {
  const progressBars = document.querySelectorAll('.progress-bar-fill');
  progressBars.forEach(bar => {
    const targetWidth = bar.getAttribute('data-level') + '%';
    bar.style.width = targetWidth;
  });
}

// Scroll Intersection Observer
function initScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        if (entry.target.id === 'skills') {
          animateSkills();
        }
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}

// Contact Form Toast Notification
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast("Message Sent! Thank you Mamoon will get back to you shortly.");
    form.reset();
  });
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fas fa-check-circle" style="color:var(--accent-emerald); font-size:1.2rem;"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s ease';
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}

// Interactive Hero Floating Badge Toggle
const HERO_BADGES = [
  { icon: "fas fa-shield-halved", sub: "Cisco In-Progress", title: "Cyber & Networks", color: "var(--accent-gold)" },
  { icon: "fas fa-graduation-cap", sub: "BS CS Student", title: "IST Pakistan", color: "var(--accent-cyan)" },
  { icon: "fas fa-code", sub: "Security & Dev", title: "Python, C++ & Web", color: "var(--accent-purple)" },
  { icon: "fas fa-location-dot", sub: "Hometown", title: "Karak, KP", color: "var(--accent-emerald)" }
];

let currentHeroBadgeIndex = 0;

function initInteractiveBadges() {
  const badge = document.getElementById('interactive-top-badge');
  const iconEl = document.getElementById('badge-icon-el');
  const subEl = document.getElementById('badge-sub-el');
  const titleEl = document.getElementById('badge-title-el');

  if (!badge || !iconEl || !subEl || !titleEl) return;

  badge.addEventListener('click', () => {
    badge.style.transform = 'scale(0.9) rotate(-4deg)';
    
    setTimeout(() => {
      currentHeroBadgeIndex = (currentHeroBadgeIndex + 1) % HERO_BADGES.length;
      const b = HERO_BADGES[currentHeroBadgeIndex];
      
      iconEl.className = b.icon + ' badge-icon';
      iconEl.style.color = b.color;
      subEl.textContent = b.sub;
      titleEl.textContent = b.title;

      badge.style.transform = 'scale(1) rotate(0deg)';
    }, 150);
  });
}

// Mobile Navigation Drawer Handler
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const closeBtn = document.getElementById('drawer-close-btn');
  const drawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    document.body.style.overflow = 'auto';
  }

  toggleBtn.addEventListener('click', openDrawer);

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}


