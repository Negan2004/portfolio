window.addEventListener("load", function(){

document.getElementById("loader").style.display="none";

});

window.onscroll=function(){

let scrollTop=document.documentElement.scrollTop;

let height=document.documentElement.scrollHeight-document.documentElement.clientHeight;

let progress=(scrollTop/height)*100;

document.getElementById("progress-bar").style.width=progress+"%";

};

document.addEventListener("mousemove", function(e){

document.querySelector(".cursor").style.left=e.clientX+"px";

document.querySelector(".cursor").style.top=e.clientY+"px";

});

// ==========================
// TYPING ANIMATION
// ==========================

const roles = [

"Java Full Stack Developer",

"Backend Developer",

"REST API Developer",

"Java & MySQL Specialist",

"Software Developer"

];

let roleIndex = 0;

let charIndex = 0;

let deleting = false;

function typeEffect(){

const currentRole = roles[roleIndex];

if(!deleting){

document.getElementById("typing").textContent =
currentRole.substring(0,charIndex++);

if(charIndex > currentRole.length){

deleting = true;

setTimeout(typeEffect,1500);

return;

}

}else{

document.getElementById("typing").textContent =
currentRole.substring(0,charIndex--);

if(charIndex === 0){

deleting = false;

roleIndex = (roleIndex+1)%roles.length;

}

}

setTimeout(typeEffect, deleting ? 50 : 100);

}

typeEffect();



// ==========================
// MOBILE MENU TOGGLE
// ==========================

function toggleMenu(){
document.querySelector(".sidebar").classList.toggle("active");
}


// ==========================
// CLOSE MENU AFTER CLICK MOBILE
// ==========================

document.querySelectorAll(".sidebar nav a").forEach(link => {

link.addEventListener("click", () => {

document.querySelector(".sidebar").classList.remove("active");

});

});


// ==========================
// SMOOTH SCROLL
// ==========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href"))
.scrollIntoView({
behavior:"smooth"
});

});

});


// ==========================
// ACTIVE SECTION HIGHLIGHT
// ==========================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".sidebar nav a");

window.addEventListener("scroll", () => {

let current = "";

sections.forEach(section => {

const sectionTop = section.offsetTop;

if(pageYOffset >= sectionTop - 200){

current = section.getAttribute("id");

}

});

navLinks.forEach(link => {

link.classList.remove("active");

if(link.getAttribute("href") == "#" + current){

link.classList.add("active");

}

});

});


// ==========================
// SCROLL REVEAL ANIMATION
// ==========================

const revealElements = document.querySelectorAll(".section, .card, .skills span, .cert");

function reveal(){

revealElements.forEach(el => {

const windowHeight = window.innerHeight;
const elementTop = el.getBoundingClientRect().top;

if(elementTop < windowHeight - 50){

el.classList.add("show");

}

});

}

window.addEventListener("scroll", reveal);

reveal();

particlesJS("particles-js", {

particles:{

number:{ value:80 },

color:{ value:"#4e73df" },

shape:{ type:"circle" },

opacity:{ value:0.5 },

size:{ value:3 },

move:{ speed:1 }

},

interactivity:{

events:{

onhover:{ enable:true, mode:"repulse" }

}

}

});

let images = [

"images/project1.png",

"images/project2.png",

"images/project3.png"

];

let currentImage = 0;

function openModal(){

document.getElementById("projectModal").style.display="flex";

document.getElementById("modalImage").src = images[currentImage];

}

function closeModal(){

document.getElementById("projectModal").style.display="none";

}

function nextImage(){

currentImage=(currentImage+1)%images.length;

document.getElementById("modalImage").src = images[currentImage];

}

function prevImage(){

currentImage=(currentImage-1+images.length)%images.length;

document.getElementById("modalImage").src = images[currentImage];

}

const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", ()=>{

sections.forEach(sec=>{

const top = sec.getBoundingClientRect().top;

if(top < window.innerHeight - 100){

sec.classList.add("show");

}

});

});
