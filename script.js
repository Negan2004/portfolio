/* ============================
NAVBAR MOBILE TOGGLE (FIXED)
============================ */

const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");

if(toggle && nav){

toggle.addEventListener("click", () => {

nav.classList.toggle("active");

});

}

function scrollToTop(){

window.scrollTo({
top: 0,
behavior: "smooth"
});

}


/* ============================
SMOOTH SCROLL
============================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", function(e){

e.preventDefault();

const target = document.querySelector(this.getAttribute("href"));

target.scrollIntoView({

behavior:"smooth"

});

});

});


/* ============================
REVEAL ANIMATION
============================ */

const revealElements = document.querySelectorAll(

".hero-image, .hero-text, .section-title, .timeline-item, .project-card, .skills-container span"

);


const revealOnScroll = () => {

revealElements.forEach(el => {

const windowHeight = window.innerHeight;
const elementTop = el.getBoundingClientRect().top;

if(elementTop < windowHeight - 80){

el.style.opacity = "1";
el.style.transform = "translateY(0)";

}else{

el.style.opacity = "0";
el.style.transform = "translateY(40px)";

}

});

};


window.addEventListener("scroll", revealOnScroll);


/* INITIAL STATE */

revealElements.forEach(el => {

el.style.opacity = "0";
el.style.transform = "translateY(40px)";
el.style.transition = "all 0.6s ease";

});


revealOnScroll();



/* ============================
NAVBAR BLUR ON SCROLL
============================ */

window.addEventListener("scroll", () => {

const navbar = document.querySelector(".nav-container");

if(window.scrollY > 50){

navbar.style.background = "rgba(15,23,42,0.8)";
navbar.style.backdropFilter = "blur(15px)";

}else{

navbar.style.background = "rgba(255,255,255,0.05)";

}

});



/* ============================
PROJECT CARD CLICK EFFECT
============================ */

document.querySelectorAll(".project-card").forEach(card => {

card.addEventListener("click", () => {

card.style.transform = "scale(0.97)";

setTimeout(() => {

card.style.transform = "scale(1)";

},150);

});

});



/* ============================
PAGE LOAD HERO ANIMATION
============================ */

window.addEventListener("load", () => {

const heroImage = document.querySelector(".hero-image");
const heroText = document.querySelector(".hero-text");

heroImage.style.opacity = "0";
heroText.style.opacity = "0";

setTimeout(() => {

heroImage.style.opacity = "1";
heroImage.style.transform = "translateY(0)";

heroText.style.opacity = "1";
heroText.style.transform = "translateY(0)";

},300);

});

/* ================= CERTIFICATE MODAL ================= */

document.addEventListener("DOMContentLoaded", function () {

  const modal = document.getElementById("certModal");
  const modalImg = document.getElementById("certModalImg");
  const closeBtn = document.querySelector(".cert-close");

  const certImages = document.querySelectorAll(".certificate-card img");

  certImages.forEach(function(img){

    img.addEventListener("click", function(){

      modal.style.display = "flex";
      modalImg.src = this.src;

    });

  });

  closeBtn.addEventListener("click", function(){

    modal.style.display = "none";

  });

  modal.addEventListener("click", function(e){

    if(e.target === modal){
      modal.style.display = "none";
    }

  });

});


