// App Initialization Entry Point for Mamoon Ashraf Portfolio

document.addEventListener('DOMContentLoaded', () => {
  console.log("Initializing Portfolio for Mamoon Ashraf...");

  // 1. Initialize Typing Effect
  if (PORTFOLIO_DATA.profile.taglines) {
    initTypingEffect(PORTFOLIO_DATA.profile.taglines);
  }

  // 2. Render Initial Projects
  renderProjects(PORTFOLIO_DATA.projects, 'all');

  // 3. Project Filter Tabs Handler
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const category = e.target.getAttribute('data-filter');
      renderProjects(PORTFOLIO_DATA.projects, category);
    });
  });

  // 4. Initialize Contact Form Toast
  initContactForm();

  // 5. Initialize Intersection Observer for Animations
  initScrollObserver();

  // 6. Initialize Interactive Floating Badges
  if (typeof initInteractiveBadges === 'function') {
    initInteractiveBadges();
  }

  // 6. Close Modal Event Listeners
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalOverlay = document.getElementById('project-modal');

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
});
