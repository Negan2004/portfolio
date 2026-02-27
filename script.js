/**
 * Blog-Journal Portfolio — script.js
 * Simple, clean JS: date, typing, fade-in, counters, filter, form, nav
 */

'use strict';

const PORTFOLIO_CONFIG = Object.freeze({
  resumePath: 'MY_Resume.pdf',
  resumeFileName: 'MY_Resume.pdf',
  formSubmitEmail: 'samugsharma1111@gmail.com'
});

/* ─── DATE IN MASTHEAD ─────────────────────────── */
(function setDate() {
  const el = document.getElementById('mastheadDate');
  if (!el) return;
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  el.textContent = new Date().toLocaleDateString('en-IN', opts);
})();

/* ─── MOBILE NAV TOGGLE ────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

/* ─── SMOOTH SCROLL ────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ─── ACTIVE NAV HIGHLIGHT ─────────────────────── */
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) {
      current = sec.getAttribute('id');
    }
  });
  allNavLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });

  // Back to top
  const btt = document.getElementById('backToTop');
  if (window.scrollY > 400) btt.classList.add('visible');
  else btt.classList.remove('visible');
}, { passive: true });

document.getElementById('backToTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── FADE IN (Intersection Observer) ─────────── */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

/* ─── TYPING EFFECT ────────────────────────────── */
const typingWords = ['Web Developer','Java Enthusiast','MCA Student', 'Problem Solver'];
let wordIndex = 0, charIndex = 0, isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeWord() {
  if (!typingEl) return;
  const current = typingWords[wordIndex];
  typingEl.textContent = isDeleting
    ? current.substring(0, charIndex - 1)
    : current.substring(0, charIndex + 1);
  if (isDeleting) charIndex--; else charIndex++;
  let speed = isDeleting ? 65 : 105;
  if (!isDeleting && charIndex === current.length) { speed = 2000; isDeleting = true; }
  else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % typingWords.length; speed = 400; }
  setTimeout(typeWord, speed);
}
setTimeout(typeWord, 800);

/* ─── ANIMATED COUNTERS ────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1400;
  const start = performance.now();
  function update(now) {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
    if (p < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObserver.observe(el));

/* ─── PROJECT FILTER ───────────────────────────── */
const filterBtns  = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectItems.forEach(item => {
      const match = filter === 'all' || (item.dataset.category || '').includes(filter);
      if (match) {
        item.classList.remove('hidden');
        item.style.opacity = '0';
        setTimeout(() => { item.style.transition = 'opacity 0.35s ease'; item.style.opacity = '1'; }, 30);
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

/* ─── RESUME LINKS ─────────────────────────────── */
document.querySelectorAll('[data-resume-link]').forEach(link => {
  const mode = link.dataset.resumeLink;
  link.setAttribute('href', PORTFOLIO_CONFIG.resumePath);
  if (mode === 'view') {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener');
    link.removeAttribute('download');
  } else {
    link.removeAttribute('target');
    link.setAttribute('download', PORTFOLIO_CONFIG.resumeFileName);
  }
});

/* ─── CONTACT FORM ─────────────────────────────── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const submitBtn = document.getElementById('submitBtn');
  const btnText   = submitBtn?.querySelector('.btn-text');
  const btnLoader = submitBtn?.querySelector('.btn-loader');
  const formSuccess = document.getElementById('formSuccess');
  const formError   = document.getElementById('formError');

  const fields = [
    { id: 'name',    check: v => v.trim().length >= 2 },
    { id: 'email',   check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    { id: 'subject', check: v => v.trim().length >= 3 },
    { id: 'message', check: v => v.trim().length >= 10 },
  ];

  contactForm.querySelectorAll('.cf-input').forEach(input => {
    input.addEventListener('input', () => input.classList.remove('error'));
  });

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formError?.classList.add('d-none');
    formSuccess?.classList.add('d-none');

    let valid = true;
    fields.forEach(({ id, check }) => {
      const input = document.getElementById(id);
      const ok = input && check(input.value);
      input?.classList.toggle('error', !ok);
      if (!ok) valid = false;
    });
    if (!valid) return;

    submitBtn.disabled = true;
    btnText?.classList.add('d-none');
    btnLoader?.classList.remove('d-none');

    try {
      const payload = {
        name:    document.getElementById('name').value.trim(),
        email:   document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim(),
        _captcha: 'false'
      };
      const res  = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(PORTFOLIO_CONFIG.formSubmitEmail)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !(data.success === true || data.success === 'true')) {
        throw new Error(data.message || 'Could not send message.');
      }
      contactForm.reset();
      formSuccess?.classList.remove('d-none');
    } catch (err) {
      if (formError) {
        formError.textContent = err.message || 'Unable to send. Please try again.';
        formError.classList.remove('d-none');
      }
    } finally {
      submitBtn.disabled = false;
      btnText?.classList.remove('d-none');
      btnLoader?.classList.add('d-none');
    }
  });
}
