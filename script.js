// ==========================
// LOADER FIX
// ==========================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if(loader){

        loader.style.opacity = "0";

        setTimeout(()=>{
            loader.style.display = "none";
        },500);

    }

});



// ==========================
// PROGRESS BAR
// ==========================

window.addEventListener("scroll", () => {

    const scrollTop =
    document.documentElement.scrollTop;

    const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

    const progress =
    (scrollTop / height) * 100;

    const bar =
    document.getElementById("progress-bar");

    if(bar){
        bar.style.width = progress + "%";
    }

});



// ==========================
// CURSOR DESKTOP SAFE
// ==========================

const cursor =
document.querySelector(".cursor");

if(cursor){

document.addEventListener("mousemove",(e)=>{

    cursor.style.left = e.clientX+"px";
    cursor.style.top = e.clientY+"px";

});

}



// ==========================
// TYPING EFFECT
// ==========================

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

const element =
document.getElementById("typing");

if(!element) return;

const text = roles[roleIndex];

if(!deleting){

element.textContent =
text.substring(0,charIndex++);

if(charIndex > text.length){

deleting=true;
setTimeout(typeEffect,1500);
return;

}

}
else{

element.textContent =
text.substring(0,charIndex--);

if(charIndex===0){

deleting=false;
roleIndex=(roleIndex+1)%roles.length;

}

}

setTimeout(typeEffect,deleting?50:100);

}

typeEffect();



// ==========================
// MOBILE MENU
// ==========================

function toggleMenu(){

document
.querySelector(".sidebar")
.classList.toggle("active");

}



// ==========================
// CLOSE MENU ON CLICK
// ==========================

document
.querySelectorAll(".sidebar nav a")
.forEach(link=>{

link.addEventListener("click",()=>{

document
.querySelector(".sidebar")
.classList.remove("active");

});

});



// ==========================
// SMOOTH SCROLL
// ==========================

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target =
document.querySelector(
this.getAttribute("href")
);

if(target){

target.scrollIntoView({
behavior:"smooth"
});

}

});

});



// ==========================
// SECTION REVEAL (FIX SKILLS)
// ==========================

const elements =
document.querySelectorAll(
".section, .card, .skills span, .cert"
);

function reveal(){

elements.forEach(el=>{

const top =
el.getBoundingClientRect().top;

if(top < window.innerHeight - 80){

el.classList.add("show");

}

});

}

window.addEventListener("scroll", reveal);

reveal();



// ==========================
// ACTIVE NAV LINK
// ==========================

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(".sidebar nav a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

if(pageYOffset >=
section.offsetTop - 200){

current = section.id;

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")
==="#"+current){

link.classList.add("active");

}

});

});



// ==========================
// PARTICLES SAFE LOAD
// ==========================

window.addEventListener("load",()=>{

if(typeof particlesJS !== "undefined"){

particlesJS("particles-js",{

particles:{
number:{value:60},
color:{value:"#4e73df"},
shape:{type:"circle"},
opacity:{value:0.5},
size:{value:3},
move:{speed:1}
},

interactivity:{
events:{
onhover:{
enable:true,
mode:"repulse"
}
}
}

});

}

});



// ==========================
// MODAL FIX (FULLY WORKING)
// ==========================

let images=[

"images/project1.png",
"images/project2.png",
"images/project3.png"

];

let currentImage=0;

function openModal(){

const modal =
document.getElementById("projectModal");

const img =
document.getElementById("modalImage");

if(modal && img){

modal.style.display="flex";

img.src = images[currentImage];

}

}

function closeModal(){

const modal =
document.getElementById("projectModal");

if(modal){
modal.style.display="none";
}

}

function nextImage(){

currentImage =
(currentImage+1)%images.length;

document.getElementById("modalImage").src =
images[currentImage];

}

function prevImage(){

currentImage =
(currentImage-1+images.length)%images.length;

document.getElementById("modalImage").src =
images[currentImage];

}



// ==========================
// CLOSE MODAL OUTSIDE CLICK
// ==========================

window.onclick = function(e){

const modal =
document.getElementById("projectModal");

if(e.target === modal){

modal.style.display="none";

}

};



// ==========================
// HERO PREMIUM INTRO
// ==========================

window.addEventListener("load",()=>{

const heroItems = document.querySelectorAll(

".hero-title, .hero-role, .hero-desc, .hero-btn"

);

heroItems.forEach((el,i)=>{

el.style.opacity="0";
el.style.transform="translateY(40px)";

setTimeout(()=>{

el.style.opacity="1";
el.style.transform="translateY(0)";

},500 + i*300);

});

});
