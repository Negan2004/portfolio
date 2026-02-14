// ==========================
// TYPING ANIMATION
// ==========================

const roles = [
"Java Full Stack Developer",
"Backend Developer",
"Software Developer"
];

let roleIndex = 0;
let charIndex = 0;
const typingElement = document.getElementById("typing");

function type(){
if(charIndex < roles[roleIndex].length){
typingElement.innerHTML += roles[roleIndex].charAt(charIndex);
charIndex++;
setTimeout(type,50);
}else{
setTimeout(erase,1500);
}
}

function erase(){
if(charIndex > 0){
typingElement.innerHTML =
roles[roleIndex].substring(0,charIndex-1);
charIndex--;
setTimeout(erase,30);
}else{
roleIndex++;
if(roleIndex >= roles.length) roleIndex = 0;
setTimeout(type,300);
}
}

type();


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
