/* ============================================================
   JONES HOME & REPAIRS — jones-script.js
   ============================================================ */

// ── NAV: scroll state ──────────────────────────────────────
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── MOBILE MENU ────────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');

hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── SCROLL REVEAL ──────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── CONTACT FORM SUBMIT ────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  btn.textContent = 'Message Sent ✓';
  btn.style.background = '#2e6b2e';
  btn.style.color = '#fff';
  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
    btn.style.color = '';
    e.target.reset();
  }, 3500);
}
