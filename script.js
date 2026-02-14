// ================= LOADER FIX =================

window.addEventListener("load", function(){

setTimeout(() => {

document.getElementById("loader").style.opacity="0";

setTimeout(()=>{
document.getElementById("loader").style.display="none";
},500);

},500);

});



// ================= SCROLL PROGRESS + PARALLAX =================

window.addEventListener("scroll", function(){

// progress bar
let scrollTop=document.documentElement.scrollTop;
let height=document.documentElement.scrollHeight-document.documentElement.clientHeight;
let progress=(scrollTop/height)*100;

document.getElementById("progress-bar").style.width=progress+"%";


// parallax
document.querySelectorAll(".card").forEach(card=>{

let speed=window.scrollY*0.02;
card.style.transform=`translateY(${speed}px)`;

});

});




// ================= CURSOR =================

// DESKTOP CURSOR MOVE
document.addEventListener("mousemove", function(e){

    const cursor = document.querySelector(".cursor");

    if(cursor){
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    }

});


// MOBILE TOUCH GLOW EFFECT
document.addEventListener("touchstart", function(e){

    let glow = document.createElement("div");

    glow.style.position = "fixed";
    glow.style.left = e.touches[0].clientX + "px";
    glow.style.top = e.touches[0].clientY + "px";

    glow.style.width = "20px";
    glow.style.height = "20px";

    glow.style.background = "rgba(78,115,223,0.6)";
    glow.style.borderRadius = "50%";

    glow.style.pointerEvents = "none";
    glow.style.boxShadow = "0 0 20px #4e73df";
    glow.style.zIndex = "9999";

    document.body.appendChild(glow);

    setTimeout(()=>{
        glow.remove();
    }, 400);

});




// ================= TYPING =================

const roles = [

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


// ================= MOBILE MENU =================

function toggleMenu(){

document.querySelector(".sidebar").classList.toggle("active");

}


// ================= CLOSE MENU MOBILE =================

document.querySelectorAll(".sidebar nav a").forEach(link=>{

link.addEventListener("click",()=>{

document.querySelector(".sidebar").classList.remove("active");

});

});


// ================= SMOOTH SCROLL =================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({behavior:"smooth"});

}

});

});


// ================= ACTIVE SECTION =================

const navLinks=document.querySelectorAll(".sidebar nav a");

const allSections=document.querySelectorAll("section");

window.addEventListener("scroll",()=>{

let current="";

allSections.forEach(section=>{

if(pageYOffset>=section.offsetTop-200){

current=section.id;

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});


// ================= REVEAL =================

const revealElements=document.querySelectorAll(".section, .card, .skills span, .cert");

function reveal(){

revealElements.forEach(el=>{

if(el.getBoundingClientRect().top<window.innerHeight-50){

el.classList.add("show");

}

});

}

window.addEventListener("scroll",reveal);

reveal();


// ================= PARTICLES FIX =================

window.addEventListener("load", function(){

if(typeof particlesJS !== "undefined"){

particlesJS("particles-js", {

particles:{

number:{value:80},

color:{value:"#4e73df"},

shape:{type:"circle"},

opacity:{value:0.5},

size:{value:3},

move:{speed:1}

},

interactivity:{

events:{onhover:{enable:true,mode:"repulse"}}

}

});

}

});


// ================= MODAL =================

let images=[

"images/project1.png",

"images/project2.png",

"images/project3.png"

];

let currentImage=0;

function openModal(){

document.getElementById("projectModal").style.display="flex";

document.getElementById("modalImage").src=images[currentImage];

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

window.onclick=function(e){

let modal=document.getElementById("projectModal");

if(e.target==modal){

modal.style.display="none";

}

}
