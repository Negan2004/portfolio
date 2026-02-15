/* ============================
HELPERS
============================ */

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

window.scrollToTop = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

/* ============================
NAVBAR MOBILE TOGGLE
============================ */

const menuToggle = $("#menu-toggle");
const navLinks = $("#nav-links");
const navContainer = $(".nav-container");

if (menuToggle && navLinks && navContainer) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  $$("#nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (e) => {
    if (!navContainer.contains(e.target)) {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ============================
SMOOTH SCROLL (PC + MOBILE)
============================ */

$$('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || href === "#") return;

    const target = $(href);
    if (!target) return;

    e.preventDefault();

    const navHeight = navContainer ? navContainer.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 24;

    window.scrollTo({ top, behavior: "smooth" });
  });
});

/* ============================
NAVBAR SCROLL GLASS
============================ */

window.addEventListener("scroll", () => {
  if (!navContainer) return;
  if (window.scrollY > 44) navContainer.classList.add("scrolled");
  else navContainer.classList.remove("scrolled");
});

/* ============================
REVEAL ANIMATION
============================ */

const revealItems = $$(".reveal-item");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -28px 0px"
  });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 30, 220)}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

/* ============================
CARD / BUTTON PRESS EFFECT
============================ */

$$(".btn, .resume-btn, .show-more-btn, .contact-btn, .project-card, .certificate-card, .contact-card").forEach((el) => {
  el.addEventListener("click", () => {
    el.classList.add("card-pressed");
    setTimeout(() => el.classList.remove("card-pressed"), 130);
  });
});

/* ============================
CERTIFICATE MODAL
============================ */

document.addEventListener("DOMContentLoaded", () => {
  const modal = $("#certModal");
  const modalImg = $("#certModalImg");
  const closeBtn = $(".cert-close");
  const certImages = $$(".certificate-card img");

  if (!modal || !modalImg || !closeBtn || certImages.length === 0) return;

  certImages.forEach((img) => {
    img.addEventListener("click", function () {
      modal.style.display = "flex";
      modalImg.src = this.src;
      modalImg.alt = this.alt || "Certificate preview";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      modal.style.display = "none";
    }
  });
});

/* ============================
SHOW MORE / SHOW LESS
============================ */

function setupShowMore(buttonId, cardSelector, initialVisible, moreText, lessText) {
  const button = document.getElementById(buttonId);
  const cards = $$(cardSelector);

  if (!button) return;

  if (cards.length <= initialVisible) {
    button.classList.add("hidden");
    return;
  }

  let expanded = false;

  const render = () => {
    cards.forEach((card, index) => {
      const shouldHide = !expanded && index >= initialVisible;
      card.classList.toggle("is-hidden", shouldHide);
    });

    button.textContent = expanded ? lessText : moreText;
  };

  render();

  button.addEventListener("click", () => {
    expanded = !expanded;
    render();

    if (!expanded) {
      button.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}

setupShowMore(
  "showMoreProjects",
  "#projects .project-card",
  3,
  "Show More Projects",
  "Show Less Projects"
);

setupShowMore(
  "showMoreCertificates",
  "#certificates .certificate-card",
  3,
  "Show More Certificates",
  "Show Less Certificates"
);

/* ============================
CURSOR (DESKTOP) + RIPPLE (MOBILE)
============================ */

(function setupPointerEffects() {
  const isDesktop = window.matchMedia("(pointer:fine)").matches;
  const dot = $(".cursor-dot");
  const ring = $(".cursor-ring");

  if (isDesktop && dot && ring) {
    document.body.classList.add("cursor-enabled");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.opacity = "1";
      ring.style.opacity = "1";
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    document.addEventListener("mouseleave", () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    });

    $$(".btn, .resume-btn, .show-more-btn, .contact-btn, a, .project-card, .certificate-card, .contact-card, .skills-container span").forEach((el) => {
      el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animateRing);
    };
    animateRing();
  } else {
    const rippleTargets = "a, button, .project-card, .certificate-card, .contact-card, .skills-container span";

    document.addEventListener("touchstart", (e) => {
      const target = e.target.closest(rippleTargets);
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "tap-ripple";

      if (!target.style.position) target.style.position = "relative";
      target.style.overflow = "hidden";

      ripple.style.left = `${e.touches[0].clientX - rect.left}px`;
      ripple.style.top = `${e.touches[0].clientY - rect.top}px`;
      ripple.style.width = "16px";
      ripple.style.height = "16px";

      target.appendChild(ripple);
      setTimeout(() => ripple.remove(), 620);
    }, { passive: true });
  }
})();

/* ============================
JAVA CODE RAIN
============================ */

(function generateCodeRain() {
  const rain = $("#codeRain");
  if (!rain) return;

  const tokens = [
    "public class Portfolio {}",
    "@RestController",
    "Spring Boot",
    "GET /api/projects",
    "new ArrayList<>()",
    "JSP + Servlets",
    "MySQL Query",
    "CRUD Operations",
    "MVC Architecture",
    "git commit -m",
    "OOP Concepts",
    "System.out.println()",
    "Hibernate JPA",
    "Java Full Stack",
    "Exception Handling",
    "API Integration"
  ];

  const total = 26;
  for (let i = 0; i < total; i++) {
    const line = document.createElement("span");
    line.textContent = tokens[Math.floor(Math.random() * tokens.length)];
    line.style.left = `${Math.random() * 100}%`;
    line.style.animationDuration = `${10 + Math.random() * 10}s`;
    line.style.animationDelay = `${Math.random() * 8}s`;
    line.style.fontSize = `${11 + Math.random() * 3}px`;
    rain.appendChild(line);
  }
})();
