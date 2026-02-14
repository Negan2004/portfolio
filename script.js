// ================= LOADER =================

window.addEventListener("load", () => {

const loader = document.getElementById("loader");

setTimeout(() => {

loader.style.opacity = "0";

setTimeout(() => {

loader.style.display = "none";

}, 500);

}, 600);

});


// ================= MENU =================

function toggleMenu(){

document.querySelector(".sidebar").classList.toggle("active");

}


// ================= SMOOTH SCROLL =================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", function(e){

e.preventDefault();

const target = document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({
behavior: "smooth",
block: "start"
});

}

});

});


// ================= REVEAL ANIMATION =================

const revealElements = document.querySelectorAll(".section, .card, .cert-card");

function reveal(){

const trigger = window.innerHeight * 0.85;

revealElements.forEach(el => {

const top = el.getBoundingClientRect().top;

if(top < trigger){

el.classList.add("show");

}

});

}

window.addEventListener("scroll", reveal);

reveal();


// ================= TYPING =================

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

element.textContent = current.substring(0, charIndex++);

if(charIndex > current.length){

deleting = true;

setTimeout(typeEffect, 1500);

return;

}

}else{

element.textContent = current.substring(0, charIndex--);

if(charIndex === 0){

deleting = false;

roleIndex = (roleIndex + 1) % roles.length;

}

}

setTimeout(typeEffect, deleting ? 50 : 100);

}

typeEffect();


// ================= MODAL =================

const modal = document.getElementById("projectModal");

const modalImg = document.getElementById("modalImage");

const images = [

"images/project1.png",

"images/project2.png",

"images/project3.png"

];

let index = 0;

function openModal(){

modal.style.display = "flex";

modalImg.src = images[index];

}

function closeModal(){

modal.style.display = "none";

}

function nextImage(){

index = (index + 1) % images.length;

modalImg.src = images[index];

}

function prevImage(){

index = (index - 1 + images.length) % images.length;

modalImg.src = images[index];

}


// close modal outside click

window.onclick = function(e){

if(e.target === modal){

modal.style.display = "none";

}

};


// ================= PARTICLES =================

if(typeof particlesJS !== "undefined"){

particlesJS("particles-js", {

particles:{

number:{ value:70 },

color:{ value:"#4e73df" },

shape:{ type:"circle" },

opacity:{ value:0.4 },

size:{ value:3 },

move:{ speed:1 }

}

});

}


// ================= HERO INTRO =================

window.addEventListener("load", () => {

const heroElements = document.querySelectorAll(

".hero-title, .hero-role, .hero-desc, .hero-btn"

);

heroElements.forEach((el, i) => {

el.style.opacity = "0";

el.style.transform = "translateY(40px)";

setTimeout(() => {

el.style.transition = "1s";

el.style.opacity = "1";

el.style.transform = "translateY(0)";

}, 500 + i * 200);

});

});
