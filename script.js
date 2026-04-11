/* ============================================================
   JONES HOME & REPAIRS — script.js
   ============================================================ */

// ── NAV scroll state ───────────────────────────────────────
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

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
// Add animate class via JS only — so if JS fails, content is always visible
document.querySelectorAll('.reveal').forEach(el => el.classList.add('animate'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── PROJECT TABS ───────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.project-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

// ── THUMBNAIL GALLERY SWITCHER ─────────────────────────────
document.querySelectorAll('.project-panel').forEach(panel => {
  const mainImg = panel.querySelector('.gallery-main img');
  const thumbs  = panel.querySelectorAll('.thumb');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      mainImg.style.opacity = '0';
      setTimeout(() => {
        mainImg.src = thumb.dataset.src;
        mainImg.style.opacity = '1';
      }, 220);
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });
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
