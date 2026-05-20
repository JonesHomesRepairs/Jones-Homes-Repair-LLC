/* ============================================================
   JONES HOME & REPAIRS — script.js v4
   Multi-page: all functions guard against missing elements
   ============================================================ */

// ── NAV scroll state ───────────────────────────────────────
const nav = document.getElementById('main-nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ── MOBILE MENU ────────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

function toggleMenu() {
  if (!mobileMenu || !hamburger) return;
  mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open');
}

if (hamburger) hamburger.addEventListener('click', toggleMenu);

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (hamburger) hamburger.classList.remove('open');
  });
});

// ── SCROLL REVEAL ──────────────────────────────────────────
document.querySelectorAll('.reveal').forEach(el => el.classList.add('animate'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── PROJECT TABS ───────────────────────────────────────────
function activateTab(btn) {
  const target = btn.dataset.tab;
  if (!target) return;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.project-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById('tab-' + target);
  if (panel) panel.classList.add('active');
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => activateTab(btn));
});

// ── THUMBNAIL GALLERY SWITCHER ─────────────────────────────
document.querySelectorAll('.project-panel, #featured-project').forEach(panel => {
  const mainImg = panel.querySelector('.gallery-main img');
  const thumbs  = panel.querySelectorAll('.thumb');
  if (!mainImg) return;
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const newSrc = thumb.dataset.src;
      if (!newSrc) return;
      mainImg.style.opacity = '0';
      setTimeout(() => {
        mainImg.src = newSrc;
        mainImg.style.opacity = '1';
      }, 220);
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });
});

// ── ADD DATA-NUM TO SERVICE CARDS ──────────────────────────
document.querySelectorAll('.service-card').forEach((card, i) => {
  card.setAttribute('data-num', String(i + 1).padStart(2, '0'));
});

// ── HASH SCROLL ON PAGE LOAD ───────────────────────────────
// Handles links like services.html#projects — waits for page
// to load then scrolls to the anchor smoothly
window.addEventListener('load', () => {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }
});