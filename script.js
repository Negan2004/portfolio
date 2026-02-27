/**
 * Portfolio — script.js (FAANG-level clean redesign)
 * Preloader, Typing, Scroll Reveal, Counters, Project Filter, Contact Form
 */

'use strict';

const PORTFOLIO_CONFIG = Object.freeze({
  resumePath: 'MY_Resume.pdf',
  resumeFileName: 'MY_Resume.pdf',
  formSubmitEmail: 'samugsharma1111@gmail.com'
});

/* ══════════════════════════════════════════
   1. PRELOADER
══════════════════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('hidden');
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        el.classList.add('revealed');
      }
    });
    initCounters();
  }, 1800);
});

/* ══════════════════════════════════════════
   2. NAVBAR — sticky + active links
══════════════════════════════════════════ */
const mainNav = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    mainNav.classList.add('scrolled');
  } else {
    mainNav.classList.remove('scrolled');
  }

  let current = '';
  sections.forEach(sec => {
    const secTop = sec.offsetTop - 120;
    if (window.scrollY >= secTop) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active-link');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active-link');
    }
  });

  const btt = document.getElementById('backToTop');
  if (window.scrollY > 400) btt.classList.add('visible');
  else btt.classList.remove('visible');
});

document.getElementById('backToTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth nav link scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || href === '#' || !href.startsWith('#')) return;
    let target = null;
    try { target = document.querySelector(href); } catch { return; }
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      const bsCollapse = document.getElementById('navMenu');
      if (bsCollapse.classList.contains('show')) {
        bootstrap.Collapse.getInstance(bsCollapse)?.hide();
      }
    }
  });
});

function initResumeLinks() {
  document.querySelectorAll('[data-resume-link]').forEach(link => {
    const mode = link.dataset.resumeLink;
    link.setAttribute('href', PORTFOLIO_CONFIG.resumePath);
    if (mode === 'view') {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener');
      link.removeAttribute('download');
      return;
    }
    link.removeAttribute('target');
    link.removeAttribute('rel');
    link.setAttribute('download', PORTFOLIO_CONFIG.resumeFileName);
  });
}
initResumeLinks();

/* ══════════════════════════════════════════
   3. TYPING EFFECT — Hero
══════════════════════════════════════════ */
const typingWords = ['Java Full Stack Developer', 'Backend Engineer', 'Web Developer', 'MCA Student', 'Problem Solver'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeWord() {
  if (!typingEl) return;
  const current = typingWords[wordIndex];
  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }
  let speed = isDeleting ? 60 : 100;
  if (!isDeleting && charIndex === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % typingWords.length;
    speed = 400;
  }
  setTimeout(typeWord, speed);
}
setTimeout(typeWord, 2000);

/* ══════════════════════════════════════════
   4. SCROLL REVEAL
══════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right')
  .forEach(el => revealObserver.observe(el));

/* ══════════════════════════════════════════
   5. ANIMATED COUNTERS
══════════════════════════════════════════ */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

function initCounters() {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('stat-num') ||
            entry.target.classList.contains('counter')) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num[data-target], .counter[data-target]')
    .forEach(el => counterObserver.observe(el));
}
initCounters();

/* ══════════════════════════════════════════
   6. PROJECT FILTER
══════════════════════════════════════════ */
const filterBtns = document.querySelectorAll('.pf-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectItems.forEach(item => {
      const categories = item.dataset.category || '';
      const match = filter === 'all' || categories.includes(filter);
      if (match) {
        item.classList.remove('hidden');
        item.style.opacity = '0';
        item.style.transform = 'translateY(16px)';
        setTimeout(() => {
          item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
          item.style.opacity = '1';
          item.style.transform = '';
        }, 40);
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

/* ══════════════════════════════════════════
   7. TECH ITEMS — staggered entrance
══════════════════════════════════════════ */
const techObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.tech-item');
      items.forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(16px)';
        setTimeout(() => {
          item.style.transition = 'all 0.3s ease';
          item.style.opacity = '1';
          item.style.transform = '';
        }, i * 40);
      });
      techObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

const techGrid = document.querySelector('.tech-grid');
if (techGrid) techObserver.observe(techGrid);

/* ══════════════════════════════════════════
   8. CONTACT FORM VALIDATION + EMAIL DELIVERY
══════════════════════════════════════════ */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn?.querySelector('.btn-text');
  const btnLoader = submitBtn?.querySelector('.btn-loader');
  const formSuccess = document.getElementById('formSuccess');
  const formError = document.getElementById('formError');

  const fields = [
    { id: 'name', check: v => v.trim().length >= 2 },
    { id: 'email', check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    { id: 'subject', check: v => v.trim().length >= 3 },
    { id: 'message', check: v => v.trim().length >= 10 },
  ];

  const setSubmittingState = (isSubmitting) => {
    if (!submitBtn) return;
    submitBtn.disabled = isSubmitting;
    if (btnText) btnText.classList.toggle('d-none', isSubmitting);
    if (btnLoader) btnLoader.classList.toggle('d-none', !isSubmitting);
  };

  const clearFormStatus = () => {
    formError?.classList.add('d-none');
    formSuccess?.classList.add('d-none');
    if (formError) formError.textContent = '';
  };

  const showFormError = (message) => {
    if (!formError) return;
    formError.textContent = message;
    formError.classList.remove('d-none');
  };

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearFormStatus();
    let valid = true;
    fields.forEach(({ id, check }) => {
      const input = document.getElementById(id);
      if (!input) return;
      const isValid = check(input.value);
      input.classList.toggle('error', !isValid);
      if (!isValid) valid = false;
    });
    if (!valid) return;
    setSubmittingState(true);
    const payload = {
      name: document.getElementById('name')?.value.trim(),
      email: document.getElementById('email')?.value.trim(),
      subject: document.getElementById('subject')?.value.trim(),
      message: document.getElementById('message')?.value.trim(),
      _captcha: 'false'
    };
    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(PORTFOLIO_CONFIG.formSubmitEmail)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload)
        }
      );
      const result = await response.json().catch(() => ({}));
      const deliveryOk = result?.success === true || result?.success === 'true';
      if (!response.ok || !deliveryOk) {
        throw new Error(result?.message || 'Unable to send message. Please try again.');
      }
      contactForm.reset();
      contactForm.querySelectorAll('.cf-input').forEach(input => {
        input.classList.remove('error', 'has-value');
      });
      formSuccess?.classList.remove('d-none');
    } catch (error) {
      showFormError(error?.message || 'Unable to send message. Please try again.');
    } finally {
      setSubmittingState(false);
    }
  });

  contactForm.querySelectorAll('.cf-input').forEach(input => {
    input.addEventListener('input', () => input.classList.remove('error'));
    input.addEventListener('blur', () => {
      if (input.value.trim()) input.classList.add('has-value');
      else input.classList.remove('has-value');
    });
  });
}

/* ══════════════════════════════════════════
   9. ACTIVE NAV on page load
══════════════════════════════════════════ */
window.dispatchEvent(new Event('scroll'));
