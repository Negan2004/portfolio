// ===============================
// LOADER
// ===============================

window.addEventListener("load", () => {

const loader = document.getElementById("loader");

setTimeout(() => {

loader.style.opacity = "0";

setTimeout(() => {
loader.style.display = "none";
}, 500);

}, 600);

});



// ===============================
// PROGRESS BAR
// ===============================

window.addEventListener("scroll", () => {

const scrollTop = document.documentElement.scrollTop;

const height =
document.documentElement.scrollHeight -
document.documentElement.clientHeight;

const progress = (scrollTop / height) * 100;

document.getElementById("progress-bar").style.width =
progress + "%";

});



// ===============================
// MOBILE MENU
// ===============================

function toggleMenu(){

document.querySelector(".sidebar").classList.toggle("active");

}



// ===============================
// SMOOTH SCROLL FIX
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", function(e){

e.preventDefault();

const target = document.querySelector(
this.getAttribute("href")
);

if(target){

target.scrollIntoView({
behavior:"smooth"
});

}

});

});



// ===============================
// ACTIVE NAV LINK
// ===============================

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".sidebar nav a");

window.addEventListener("scroll", () => {

let current = "";

sections.forEach(section => {

const sectionTop = section.offsetTop;

if(pageYOffset >= sectionTop - 300){

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



// ===============================
// REVEAL ANIMATION FIX (SKILLS INCLUDED)
// ===============================

const revealElements = document.querySelectorAll(
".section, .skills span, .project-card, .cert"
);

function reveal(){

revealElements.forEach(el => {

const elementTop = el.getBoundingClientRect().top;

const windowHeight = window.innerHeight;

if(elementTop < windowHeight - 80){

el.classList.add("show");

}

});

}

window.addEventListener("scroll", reveal);

reveal();



// ===============================
// TYPING ANIMATION
// ===============================

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

const current = roles[roleIndex];

if(!deleting){

element.textContent =
current.substring(0, charIndex++);

if(charIndex > current.length){

deleting = true;

setTimeout(typeEffect, 1500);

return;

}

}else{

element.textContent =
current.substring(0, charIndex--);

if(charIndex === 0){

deleting = false;

roleIndex = (roleIndex + 1) % roles.length;

}

}

setTimeout(typeEffect, deleting ? 50 : 100);

}

typeEffect();



// ===============================
// PROJECT MODAL FIX
// ===============================

let currentImageIndex = 0;

const projectImages = [

"images/project1.png",
"images/project2.png",
"images/project3.png"

];

function openModal(){

const modal = document.getElementById("projectModal");

const img = document.getElementById("modalImage");

modal.style.display = "flex";

img.src = projectImages[currentImageIndex];

}



function closeModal(){

document.getElementById("projectModal").style.display =
"none";

}



function nextImage(){

currentImageIndex =
(currentImageIndex + 1) % projectImages.length;

document.getElementById("modalImage").src =
projectImages[currentImageIndex];

}



function prevImage(){

currentImageIndex =
(currentImageIndex - 1 + projectImages.length)
% projectImages.length;

document.getElementById("modalImage").src =
projectImages[currentImageIndex];

}



// CLOSE MODAL CLICK OUTSIDE

window.onclick = function(e){

const modal = document.getElementById("projectModal");

if(e.target === modal){

modal.style.display = "none";

}

};



// ===============================
// PARTICLES FIX
// ===============================

window.addEventListener("load", () => {

if(typeof particlesJS !== "undefined"){

particlesJS("particles-js", {

particles:{

number:{ value:60 },

color:{ value:"#4e73df" },

shape:{ type:"circle" },

opacity:{ value:0.5 },

size:{ value:3 },

move:{ speed:1 }

}

});

}

});



// ===============================
// MOBILE MENU AUTO CLOSE
// ===============================

document.querySelectorAll(".sidebar nav a")
.forEach(link => {

link.addEventListener("click", () => {

document.querySelector(".sidebar")
.classList.remove("active");

});

});
