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

// Real Contact Form (FormSubmit AJAX) & WhatsApp Direct Message
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const whatsappBtn = document.getElementById('contact-whatsapp-btn');
  const nameInput = document.getElementById('user-name');
  const emailInput = document.getElementById('user-email');
  const messageInput = document.getElementById('user-message');

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const msg = messageInput ? messageInput.value.trim() : '';
      const phone = (typeof PORTFOLIO_DATA !== 'undefined' && PORTFOLIO_DATA.contact.whatsapp)
        ? PORTFOLIO_DATA.contact.whatsapp
        : '923359764831';

      let text = '';
      if (name || msg) {
        text = `Hi Mamoon!${name ? ` I'm ${name}.` : ''}${email ? ` (${email})` : ''}\n\n${msg || "I'd like to connect with you regarding a collaboration."}`;
      } else {
        text = "Hi Mamoon! I visited your portfolio website and would like to connect with you.";
      }

      const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const honey = document.getElementById('form-honey');
    if (honey && honey.value.trim() !== '') {
      return; // Bot trapped by honeypot
    }

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name || !email || !message) {
      showToast("Please fill in your name, email, and message.", "error");
      return;
    }

    const originalHtml = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>`;
    }

    try {
      const targetEmail = (typeof PORTFOLIO_DATA !== 'undefined' && PORTFOLIO_DATA.contact.email)
        ? PORTFOLIO_DATA.contact.email
        : 'mamoonashraf831@gmail.com';

      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _replyto: email,
          _subject: `New Portfolio Message from ${name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && (result.success === 'true' || result.success === true)) {
        showToast("Message delivered to Mamoon's Gmail! Thank you for reaching out.", "success");
        form.reset();
      } else {
        throw new Error(result.message || 'Email delivery failed');
      }
    } catch (err) {
      showToast("Could not send email right now. Please try WhatsApp or email directly.", "error");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHtml;
      }
    }
  });
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const isError = type === 'error';
  const toast = document.createElement('div');
  toast.className = 'toast';
  if (isError) {
    toast.style.borderColor = '#ef4444';
  }
  toast.innerHTML = `
    <i class="fas ${isError ? 'fa-circle-exclamation' : 'fa-check-circle'}" style="color:${isError ? '#ef4444' : 'var(--accent-emerald)'}; font-size:1.2rem;"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s ease';
    setTimeout(() => toast.remove(), 500);
  }, 4500);
}

// Render Certifications Grid
function renderCertifications(certifications, filter = 'all') {
  const grid = document.getElementById('certifications-grid');
  if (!grid || !certifications) return;

  const filtered = filter === 'all'
    ? certifications
    : certifications.filter(c => c.status === filter);

  grid.innerHTML = filtered.map(c => {
    const isCompleted = c.status === 'Completed';
    const brandClass = c.org === 'Google' ? 'cert-google' : 'cert-cisco';
    const statusClass = isCompleted ? 'cert-status-verified' : 'cert-status-progress';
    const statusIcon = isCompleted ? 'fas fa-circle-check' : 'fas fa-spinner';
    const statusText = isCompleted ? 'Verified' : 'In Progress';
    const issuerIcon = c.org === 'Google' ? 'fab fa-google' : 'fas fa-certificate';

    return `
      <div class="glass-card cert-card ${brandClass} reveal-on-scroll">
        <div class="cert-header">
          <div class="cert-icon-box">
            <i class="${c.icon || 'fas fa-certificate'}"></i>
          </div>
          <span class="cert-status-badge ${statusClass}">
            <i class="${statusIcon}"></i> ${statusText}
          </span>
        </div>

        <div>
          <h3 class="cert-title">${c.title}</h3>
          <div class="cert-meta" style="margin-top:6px;">
            <span><i class="${issuerIcon}"></i> ${c.org} (${c.platform})</span>
            <span><i class="far fa-calendar-check"></i> ${c.date}</span>
          </div>
        </div>

        <p class="cert-desc">${c.focus}</p>

        ${c.credentialId ? `<div class="cert-credential-id"><i class="fas fa-fingerprint" style="color:var(--accent-cyan); margin-right:6px;"></i>ID: ${c.credentialId}</div>` : ''}

        <div class="cert-actions">
          ${c.verifyUrl ? `<a href="${c.verifyUrl}" target="_blank" rel="noopener noreferrer" class="cert-btn cert-btn-verify"><i class="fas fa-arrow-up-right-from-square"></i> Verify Credential</a>` : ''}
          ${c.pdfUrl ? `<a href="${c.pdfUrl}" target="_blank" rel="noopener noreferrer" class="cert-btn cert-btn-pdf"><i class="far fa-file-pdf"></i> View PDF</a>` : ''}
          ${!c.verifyUrl && !c.pdfUrl ? `<span class="tag" style="color:var(--accent-gold); border-color:rgba(251,191,36,0.3);"><i class="fas fa-clock"></i> Active Cisco NetAcad Track</span>` : ''}
        </div>
      </div>
    `;
  }).join('');

  initScrollObserver();
}

// Interactive Hero Floating Badge Toggle
const HERO_BADGES = [
  { icon: "fas fa-shield-halved", sub: "Cisco In-Progress", title: "CCNA & CyberOps", color: "var(--accent-gold)" },
  { icon: "fab fa-google", sub: "Google Verified (4x)", title: "Cybersecurity & AI", color: "var(--accent-emerald)" },
  { icon: "fas fa-graduation-cap", sub: "3rd Sem BS CS", title: "IST Pakistan", color: "var(--accent-cyan)" },
  { icon: "fas fa-network-wired", sub: "Network Defense", title: "Cybersecurity", color: "var(--accent-purple)" },
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


