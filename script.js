/* ===============================
LOADER
=============================== */

window.addEventListener("load", () => {

const loader = document.getElementById("loader");

setTimeout(() => {

loader.style.opacity = "0";

setTimeout(() => {
loader.style.display = "none";
}, 500);

}, 600);

});


/* ===============================
MENU TOGGLE (MOBILE)
=============================== */

function toggleMenu(){

document.querySelector(".sidebar").classList.toggle("active");

}


/* ===============================
SMOOTH SCROLL FIX
=============================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", function(e){

const target = document.querySelector(this.getAttribute("href"));

if(target){

e.preventDefault();

target.scrollIntoView({
behavior: "smooth",
block: "start"
});

}

});

});


/* ===============================
ACTIVE NAV LINK
=============================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".sidebar nav a");

window.addEventListener("scroll", () => {

let current = "";

sections.forEach(section => {

const sectionTop = section.offsetTop - 200;

if(window.scrollY >= sectionTop){

current = section.getAttribute("id");

}

});

navLinks.forEach(link => {

link.classList.remove("active");

if(link.getAttribute("href") === "#" + current){

link.classList.add("active");

}

});

});


/* ===============================
SCROLL REVEAL (SKILLS FIXED)
=============================== */

const revealItems = document.querySelectorAll(
".section, .card, .skills span, .cert-card"
);

const revealObserver = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.style.opacity = "1";
entry.target.style.transform = "translateY(0)";

}

});

}, {
threshold: 0.1
});

revealItems.forEach(item => {

item.style.opacity = "0";
item.style.transform = "translateY(40px)";
item.style.transition = "all 0.6s ease";

revealObserver.observe(item);

});


/* ===============================
TYPING EFFECT
=============================== */

const roles = [

"Java Full Stack Developer",
"Backend Developer",
"REST API Developer",
"MySQL Specialist",
"Software Developer"

];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

const element = document.getElementById("typing");

if(!element) return;

const currentRole = roles[roleIndex];

if(!deleting){

element.textContent = currentRole.substring(0, charIndex++);

if(charIndex > currentRole.length){

deleting = true;
setTimeout(typeEffect, 1500);
return;

}

}else{

element.textContent = currentRole.substring(0, charIndex--);

if(charIndex === 0){

deleting = false;
roleIndex = (roleIndex + 1) % roles.length;

}

}

setTimeout(typeEffect, deleting ? 40 : 80);

}

typeEffect();


/* ===============================
MODAL FIX (PROJECT DETAILS)
=============================== */

let currentImageIndex = 0;

const projectImages = [
"images/project1.png",
"images/project2.png",
"images/project3.png"
];

function openModal(){

const modal = document.getElementById("projectModal");

if(modal){

modal.style.display = "flex";

document.getElementById("modalImage").src =
projectImages[currentImageIndex];

}

}

function closeModal(){

document.getElementById("projectModal").style.display = "none";

}

function nextImage(){

currentImageIndex++;

if(currentImageIndex >= projectImages.length)
currentImageIndex = 0;

document.getElementById("modalImage").src =
projectImages[currentImageIndex];

}

function prevImage(){

currentImageIndex--;

if(currentImageIndex < 0)
currentImageIndex = projectImages.length - 1;

document.getElementById("modalImage").src =
projectImages[currentImageIndex];

}

window.addEventListener("click", e => {

const modal = document.getElementById("projectModal");

if(e.target === modal){

modal.style.display = "none";

}

});


/* ===============================
APPLE-LEVEL GLOW MOUSE EFFECT
=============================== */

const glow = document.createElement("div");

glow.style.position = "fixed";
glow.style.width = "300px";
glow.style.height = "300px";
glow.style.borderRadius = "50%";
glow.style.pointerEvents = "none";
glow.style.background =
"radial-gradient(circle, rgba(78,115,223,0.25), transparent 70%)";
glow.style.zIndex = "-1";
glow.style.transition = "transform 0.15s ease";

document.body.appendChild(glow);

document.addEventListener("mousemove", e => {

glow.style.transform =
`translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;

});


/* ===============================
PARTICLES BACKGROUND
=============================== */

window.addEventListener("load", () => {

if(typeof particlesJS !== "undefined"){

particlesJS("particles-js", {

particles: {

number: { value: 60 },

color: { value: "#4e73df" },

shape: { type: "circle" },

opacity: { value: 0.4 },

size: { value: 3 },

move: { speed: 1 }

}

});

}

});


/* ===============================
PREMIUM HERO ANIMATION
=============================== */

window.addEventListener("load", () => {

const heroElements = document.querySelectorAll(
".hero-title, .hero-role, .hero-desc, .hero-btn"
);

heroElements.forEach((el, index) => {

el.style.opacity = "0";
el.style.transform = "translateY(40px)";

setTimeout(() => {

el.style.transition = "all 0.8s ease";

el.style.opacity = "1";
el.style.transform = "translateY(0)";

}, 400 + index * 200);

});

});
