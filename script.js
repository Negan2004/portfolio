// ================= LOADER =================

window.addEventListener("load", function(){

const loader = document.getElementById("loader");

if(loader){

loader.style.opacity="0";

setTimeout(()=>{

loader.style.display="none";

},400);

}

});



// ================= TYPING EFFECT =================

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

let current = roles[roleIndex];

if(!deleting){

element.textContent = current.substring(0,charIndex++);

if(charIndex > current.length){

deleting = true;
setTimeout(typeEffect,1200);
return;

}

}
else{

element.textContent = current.substring(0,charIndex--);

if(charIndex === 0){

deleting = false;
roleIndex = (roleIndex + 1) % roles.length;

}

}

setTimeout(typeEffect, deleting ? 40 : 80);

}

typeEffect();




// ================= MOBILE MENU =================

function toggleMenu(){

document.querySelector(".sidebar").classList.toggle("active");

}



// ================= CLOSE MENU ON CLICK =================

document.querySelectorAll(".sidebar nav a").forEach(link=>{

link.addEventListener("click", ()=>{

document.querySelector(".sidebar").classList.remove("active");

});

});




// ================= SCROLL REVEAL =================

const reveals = document.querySelectorAll(".section");

function reveal(){

reveals.forEach(section=>{

let top = section.getBoundingClientRect().top;

if(top < window.innerHeight - 80){

section.classList.add("show");

}

});

}

window.addEventListener("scroll", reveal);
reveal();




// ================= ACTIVE NAV =================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".sidebar nav a");

window.addEventListener("scroll", ()=>{

let current = "";

sections.forEach(sec=>{

let top = sec.offsetTop - 200;

if(pageYOffset >= top){

current = sec.id;

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href") === "#" + current){

link.classList.add("active");

}

});

});




// ================= SMOOTH SCROLL =================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click", function(e){

e.preventDefault();

const target = document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});




// ================= PARTICLES =================

if(typeof particlesJS !== "undefined"){

particlesJS("particles-js", {

particles:{

number:{value:70},

color:{value:"#3b82f6"},

shape:{type:"circle"},

opacity:{value:0.4},

size:{value:3},

move:{speed:1}

},

interactivity:{

events:{onhover:{enable:true,mode:"repulse"}}

}

});

}




// ================= MODAL =================

let modal = document.getElementById("projectModal");
let modalImg = document.getElementById("modalImage");

function openModal(){

if(modal){

modal.style.display="flex";

modalImg.src="images/project1.png";

}

}

function closeModal(){

modal.style.display="none";

}



// close when clicking outside

window.onclick=function(e){

if(e.target == modal){

modal.style.display="none";

}

};
