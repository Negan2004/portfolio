// ================= LOADER =================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 400);

    }, 600);

});


// ================= PARTICLES =================

if (typeof particlesJS !== "undefined") {

    particlesJS("particles-js", {

        particles: {
            number: { value: 70 },
            color: { value: "#3b82f6" },
            shape: { type: "circle" },

            opacity: {
                value: 0.4,
                random: true
            },

            size: {
                value: 3,
                random: true
            },

            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                out_mode: "out"
            },

            line_linked: {
                enable: true,
                distance: 150,
                color: "#3b82f6",
                opacity: 0.2,
                width: 1
            }

        },

        interactivity: {

            events: {

                onhover: {
                    enable: true,
                    mode: "repulse"
                }

            }

        }

    });

}


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

function typeEffect() {

    const element = document.getElementById("typing");

    if (!element) return;

    const current = roles[roleIndex];

    if (!deleting) {

        element.textContent = current.substring(0, charIndex++);

        if (charIndex > current.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);
            return;

        }

    } else {

        element.textContent = current.substring(0, charIndex--);

        if (charIndex === 0) {

            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;

        }

    }

    setTimeout(typeEffect, deleting ? 50 : 100);

}

typeEffect();


// ================= MOBILE MENU =================

function toggleMenu() {

    document.querySelector(".sidebar")
        .classList.toggle("active");

}


// close after click

document.querySelectorAll(".sidebar nav a")
.forEach(link => {

    link.addEventListener("click", () => {

        document.querySelector(".sidebar")
        .classList.remove("active");

    });

});


// ================= SMOOTH SCROLL =================

document.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener("click", function(e) {

        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// ================= ACTIVE NAV =================

const sections = document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(".sidebar nav a");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop;

        if (pageYOffset >= top - 200) {

            current = section.id;

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


// ================= SCROLL REVEAL =================

const reveals =
document.querySelectorAll(
".section, .card, .skills span, .cert"
);

function revealElements() {

    reveals.forEach(el => {

        const top =
        el.getBoundingClientRect().top;

        if (top < window.innerHeight - 80) {

            el.classList.add("show");

        }

    });

}

window.addEventListener("scroll", revealElements);

revealElements();


// ================= MODAL =================

let images = [

    "images/project1.png",
    "images/project2.png",
    "images/project3.png"

];

let currentImage = 0;

function openModal(index = 0) {

    currentImage = index;

    const modal =
    document.getElementById("projectModal");

    const img =
    document.getElementById("modalImage");

    img.src = images[currentImage];

    modal.style.display = "flex";

}

function closeModal() {

    document.getElementById("projectModal")
    .style.display = "none";

}

function nextImage() {

    currentImage =
    (currentImage + 1) % images.length;

    document.getElementById("modalImage")
    .src = images[currentImage];

}

function prevImage() {

    currentImage =
    (currentImage - 1 + images.length)
    % images.length;

    document.getElementById("modalImage")
    .src = images[currentImage];

}


// close on outside click

window.onclick = function(e) {

    const modal =
    document.getElementById("projectModal");

    if (e.target === modal) {

        modal.style.display = "none";

    }

};


// ================= APPLE SMOOTH SCROLL =================

let scrollTarget = window.scrollY;
let currentScroll = window.scrollY;

function smoothScroll() {

    currentScroll +=
    (scrollTarget - currentScroll) * 0.08;

    window.scrollTo(0, currentScroll);

    requestAnimationFrame(smoothScroll);

}

window.addEventListener("wheel", e => {

    scrollTarget += e.deltaY;

});

smoothScroll();
