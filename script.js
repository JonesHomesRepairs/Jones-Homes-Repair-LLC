/* ============================================================
   JONES HOME & REPAIRS — script.js
   ============================================================ */

// ── NAV scroll state ───────────────────────────────────────
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── MOBILE MENU ────────────────────────────────────────────
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');

hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── SCROLL REVEAL ──────────────────────────────────────────
// JS adds .animate so content is visible by default if JS is slow
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
// Use both click and touchend to ensure mobile works
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
document.querySelectorAll('.project-panel').forEach(panel => {
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
// Adds watermark numbers to service cards automatically
document.querySelectorAll('.service-card').forEach((card, i) => {
  card.setAttribute('data-num', String(i + 1).padStart(2, '0'));
});

// ── CONTACT FORM ───────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  btn.textContent = 'Message Sent';
  btn.style.background = '#2e6b2e';
  btn.style.color = '#fff';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    btn.style.color = '';
    e.target.reset();
  }, 3500);
}
