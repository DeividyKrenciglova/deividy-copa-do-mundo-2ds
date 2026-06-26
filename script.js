document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // SCROLL PROGRESS BAR
  // =============================================
  const progress = document.getElementById('scrollProgress');

  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (window.pageYOffset / max) * 100;
    progress.style.setProperty('--scroll', pct + '%');
  }, { passive: true });

  // =============================================
  // MOBILE MENU
  // =============================================
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.focus();
    }
  });

  // =============================================
  // NAVBAR SCROLL EFFECT
  // =============================================
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.pageYOffset > 40);
  }, { passive: true });

  // =============================================
  // ACTIVE NAV LINK
  // =============================================
  const sections = document.querySelectorAll('.section[id], .hero[id], .closing');

  function updateActiveLink() {
    let current = '';
    const scrollY = window.pageYOffset + 100;

    sections.forEach(section => {
      if (section.offsetTop <= scrollY) {
        current = section.getAttribute('id') || '';
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // =============================================
  // EDITION FILTERS
  // =============================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const editionCards = document.querySelectorAll('.edition-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      let delay = 0;
      editionCards.forEach(card => {
        const era = card.dataset.era;
        const eraExtra = card.dataset.eraExtra || '';

        if (filter === 'all' || era === filter || eraExtra === filter) {
          card.classList.remove('hidden');
          card.style.animation = `cardIn 0.4s ease ${delay}s both`;
          delay += 0.03;
        } else {
          card.classList.add('hidden');
          card.style.animation = '';
        }
      });
    });
  });

  // =============================================
  // SCROLL REVEAL
  // =============================================
  const revealEls = document.querySelectorAll(
    '.timeline-card, .champion-card, .edition-card, ' +
    '.record-card, .scorer-row, .curio-card'
  );

  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.5s ease ${i * 0.025}s, transform 0.5s ease ${i * 0.025}s`;
      observer.observe(el);
    });
  }

  // =============================================
  // LOGO CLICK — SMOOTH SCROLL TOP
  // =============================================
  document.querySelector('.nav-logo')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // =============================================
  // KEYBOARD NAV — CARDS
  // =============================================
  document.querySelectorAll('.champion-card, .edition-card').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

});
