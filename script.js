/**
 * NexCore Portfolio — script.js
 * Animations: Preloader, Typing, Particles, Scroll Reveal,
 *             Counters, Tilt Cards, Project Filter,
 *             Testimonial Carousel, Form Validation, Cursor
 */

'use strict';

/* Portfolio configuration
 * Update these values only:
 * 1) resumePath -> /resume/resume.pdf
 * 2) formSubmitEmail -> the inbox where contact messages should be delivered
 */
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
    // Trigger initial animations after preloader hides
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        el.classList.add('revealed');
      }
    });
    // Start counters in hero if visible
    initCounters();
  }, 2000);
});

/* ══════════════════════════════════════════
   2. CUSTOM CURSOR
══════════════════════════════════════════ */
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left  = mouseX + 'px';
  cursorDot.style.top   = mouseY + 'px';
});

// Ring follows with slight lag
function animateCursor() {
  const speed = 0.15;
  ringX += (mouseX - ringX) * speed;
  ringY += (mouseY - ringY) * speed;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Enlarge ring on hoverable elements
const hoverables = 'a, button, .service-card, .project-card, .certificate-card, .why-card, .tech-item, .tc-btn, .pf-btn';
document.addEventListener('mouseover', (e) => {
  if (e.target.closest(hoverables)) cursorRing.classList.add('hovering');
});
document.addEventListener('mouseout', (e) => {
  if (e.target.closest(hoverables)) cursorRing.classList.remove('hovering');
});

/* ══════════════════════════════════════════
   3. NAVBAR — sticky + active links
══════════════════════════════════════════ */
const mainNav = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Sticky style
  if (window.scrollY > 60) {
    mainNav.classList.add('scrolled');
  } else {
    mainNav.classList.remove('scrolled');
  }

  // Active link highlighting
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

  // Back to top visibility
  const btt = document.getElementById('backToTop');
  if (window.scrollY > 400) btt.classList.add('visible');
  else btt.classList.remove('visible');
});

// Back to top click
document.getElementById('backToTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth nav link scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || href === '#' || !href.startsWith('#')) return;

    let target = null;
    try {
      target = document.querySelector(href);
    } catch {
      return;
    }

    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu
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
   4. TYPING EFFECT — Hero
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
    speed = 2000; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % typingWords.length;
    speed = 400;
  }

  setTimeout(typeWord, speed);
}
setTimeout(typeWord, 2200); // start after preloader

/* ══════════════════════════════════════════
   5. PARTICLE CANVAS — Hero background
══════════════════════════════════════════ */
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const PARTICLE_COUNT = 70;
  const particles = [];

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * canvas.width;
      this.y  = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r  = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width  ||
          this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 180, 255, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  // Connection lines
  function drawConnections() {
    const MAX_DIST = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const opacity = (1 - dist / MAX_DIST) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 180, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }
  animate();
}
initParticles();

/* ══════════════════════════════════════════
   6. SCROLL REVEAL — Intersection Observer
══════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right')
  .forEach(el => revealObserver.observe(el));

/* ══════════════════════════════════════════
   7. ANIMATED COUNTERS
══════════════════════════════════════════ */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out
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
        // Hero stats (data-target on .stat-num)
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
   8. CARD TILT EFFECT — Service Cards
══════════════════════════════════════════ */
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease';
  });
});

/* ══════════════════════════════════════════
   9. PROJECT FILTER
══════════════════════════════════════════ */
const filterBtns = document.querySelectorAll('.pf-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectItems.forEach(item => {
      const categories = item.dataset.category || '';
      const match = filter === 'all' || categories.includes(filter);

      if (match) {
        item.classList.remove('hidden');
        // Stagger re-appearance
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
          item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          item.style.opacity = '1';
          item.style.transform = '';
        }, 50);
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

/* ══════════════════════════════════════════
   10. TESTIMONIAL CAROUSEL
══════════════════════════════════════════ */
(function initCarousel() {
  const track     = document.getElementById('tcTrack');
  const dotsWrap  = document.getElementById('tcDots');
  const prevBtn   = document.getElementById('tcPrev');
  const nextBtn   = document.getElementById('tcNext');

  if (!track) return;

  const slides = track.querySelectorAll('.tc-slide');
  const total  = slides.length;
  let current  = 0;
  let autoTimer;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'tc-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    track.style.overflow   = 'visible';

    // Update dots
    dotsWrap.querySelectorAll('.tc-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  prevBtn?.addEventListener('click', () => {
    goTo(current - 1);
    resetAuto();
  });
  nextBtn?.addEventListener('click', () => {
    goTo(current + 1);
    resetAuto();
  });

  function autoAdvance() {
    autoTimer = setInterval(() => goTo(current + 1), 4500);
  }
  function resetAuto() {
    clearInterval(autoTimer);
    autoAdvance();
  }
  autoAdvance();
})();

/* ══════════════════════════════════════════
   11. CONTACT FORM VALIDATION + EMAIL DELIVERY
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
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
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

  // Real-time validation clear on input
  contactForm.querySelectorAll('.cf-input').forEach(input => {
    input.addEventListener('input', () => input.classList.remove('error'));
    input.addEventListener('blur', () => {
      if (input.value.trim()) input.classList.add('has-value');
      else input.classList.remove('has-value');
    });
  });
}

/* ══════════════════════════════════════════
   12. TECH ITEMS — staggered entrance
══════════════════════════════════════════ */
const techObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.tech-item');
      items.forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px) scale(0.9)';
        setTimeout(() => {
          item.style.transition = 'all 0.4s cubic-bezier(0.4,0,0.2,1)';
          item.style.opacity    = '1';
          item.style.transform  = '';
        }, i * 50);
      });
      techObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const techGrid = document.querySelector('.tech-grid');
if (techGrid) techObserver.observe(techGrid);

/* ══════════════════════════════════════════
   13. HERO SECTION — parallax orbs on mouse
══════════════════════════════════════════ */
const heroSection = document.getElementById('hero');
if (heroSection) {
  heroSection.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    document.querySelector('.orb-1').style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
    document.querySelector('.orb-2').style.transform = `translate(${-x * 0.4}px, ${-y * 0.4}px)`;
    document.querySelector('.orb-3').style.transform = `translate(${x * 0.7}px, ${y * 0.7}px)`;
  });
}

/* ══════════════════════════════════════════
   14. SECTION DIVIDERS — subtle glow line on scroll
══════════════════════════════════════════ */
const glowObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.boxShadow = '0 -1px 0 rgba(0, 180, 255, 0.2)';
    }
  });
}, { threshold: 0 });

document.querySelectorAll('.section-base').forEach(s => glowObserver.observe(s));

/* ══════════════════════════════════════════
   15. FOOTER NEWSLETTER — prevent default
══════════════════════════════════════════ */
document.querySelector('.footer-newsletter')?.addEventListener('submit', (e) => {
  e.preventDefault();
});
document.querySelector('.fn-btn')?.addEventListener('click', () => {
  const input = document.querySelector('.fn-input');
  if (input && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
    input.value = '';
    input.placeholder = 'Subscribed! ✓';
    setTimeout(() => { input.placeholder = 'your@email.com'; }, 3000);
  }
});

/* ══════════════════════════════════════════
   16. ACTIVE NAV on page load
══════════════════════════════════════════ */
window.dispatchEvent(new Event('scroll'));
