// ================= NAVBAR MOBILE TOGGLE =================

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn.addEventListener("click", () => {

navLinks.classList.toggle("active");

});



// ================= MODAL SYSTEM =================

const modal = document.getElementById("modal");

const modalImg = document.getElementById("modal-img");

const closeBtn = document.querySelector(".close");



// open modal function

function openModal(imageSrc){

modal.style.display = "flex";

modalImg.src = imageSrc;

}



// close modal

closeBtn.onclick = function(){

modal.style.display = "none";

};



// close on outside click

window.onclick = function(e){

if(e.target === modal){

modal.style.display = "none";

}

};




// ================= SCROLL ANIMATION =================

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.style.opacity = "1";

entry.target.style.transform = "translateY(0)";

}

});

},{
threshold:0.1
});



document.querySelectorAll(".section, .project-card, .skills span")
.forEach(el=>{

el.style.opacity="0";
el.style.transform="translateY(40px)";
el.style.transition="0.6s";

observer.observe(el);

});



// ================= SMOOTH SCROLL NAV =================

document.querySelectorAll(".nav-links a").forEach(link => {

link.addEventListener("click", function(e){

e.preventDefault();

const target = document.querySelector(this.getAttribute("href"));

target.scrollIntoView({

behavior:"smooth"

});

navLinks.classList.remove("active");

});

});



// ================= HERO IMAGE PREMIUM GLOW =================

const heroImage = document.querySelector(".hero-image-container");

heroImage.addEventListener("mousemove", e => {

const rect = heroImage.getBoundingClientRect();

const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

heroImage.style.boxShadow =
`${(x-140)/8}px ${(y-140)/8}px 60px rgba(78,115,223,0.6)`;

});


heroImage.addEventListener("mouseleave", ()=>{

heroImage.style.boxShadow =
"0 0 60px rgba(78,115,223,0.6)";

});



// ================= PERFORMANCE FIX =================

// prevents lag on scroll
let ticking = false;

window.addEventListener("scroll", () => {

if(!ticking){

window.requestAnimationFrame(()=>{

ticking = false;
});

ticking = true;

}

});
