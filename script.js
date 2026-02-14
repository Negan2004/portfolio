// =========================
// MOBILE MENU TOGGLE
// =========================

function toggleMenu(){

document.getElementById("navLinks").classList.toggle("active");

}



// =========================
// SMOOTH SCROLL
// =========================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});



// =========================
// TYPING ANIMATION
// =========================

const roles=[

"Java Full Stack Developer",

"Backend Developer",

"REST API Developer",

"MySQL Specialist",

"Software Developer"

];

let roleIndex=0;

let charIndex=0;

let deleting=false;

function typeEffect(){

const element=document.getElementById("typing");

if(!element) return;

const currentRole=roles[roleIndex];

if(!deleting){

element.textContent=currentRole.substring(0,charIndex++);

if(charIndex>currentRole.length){

deleting=true;

setTimeout(typeEffect,1500);

return;

}

}else{

element.textContent=currentRole.substring(0,charIndex--);

if(charIndex===0){

deleting=false;

roleIndex=(roleIndex+1)%roles.length;

}

}

setTimeout(typeEffect,deleting?50:100);

}

typeEffect();



// =========================
// MODAL SYSTEM
// =========================

let images=[

"images/project1.png",

"images/project2.png",

"images/project3.png"

];

let currentImage=0;



function openModal(){

const modal=document.getElementById("projectModal");

const img=document.getElementById("modalImage");

modal.style.display="flex";

img.src=images[currentImage];

}



function closeModal(){

document.getElementById("projectModal").style.display="none";

}



function nextImage(){

currentImage=(currentImage+1)%images.length;

document.getElementById("modalImage").src=images[currentImage];

}



function prevImage(){

currentImage=(currentImage-1+images.length)%images.length;

document.getElementById("modalImage").src=images[currentImage];

}



// CLOSE MODAL CLICK OUTSIDE

window.onclick=function(e){

const modal=document.getElementById("projectModal");

if(e.target===modal){

modal.style.display="none";

}

};



// =========================
// SCROLL REVEAL ANIMATION
// =========================

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

});



document.querySelectorAll(".project-card, .skills span").forEach(el=>{

el.style.opacity="0";

el.style.transform="translateY(30px)";

el.style.transition="0.6s";

observer.observe(el);

});



// =========================
// NAV ACTIVE LINK
// =========================

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".nav-links a");



window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const sectionTop=section.offsetTop;

if(pageYOffset>=sectionTop-200){

current=section.getAttribute("id");

}

});



navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});
