// Smooth scroll

document.querySelectorAll("a[href^='#']").forEach(anchor =>
{
anchor.addEventListener("click", function(e)
{
e.preventDefault();

document.querySelector(this.getAttribute("href"))
.scrollIntoView({behavior:"smooth"});
});
});



// Typing animation

const text = "Java Full Stack Developer";
let index = 0;

function type()
{
if(index < text.length)
{
document.getElementById("typing").innerHTML += text.charAt(index);
index++;
setTimeout(type, 60);
}
}

window.onload = type;



// Active section highlight

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".sidebar nav a");

window.addEventListener("scroll", () =>
{

let current = "";

sections.forEach(section =>
{
const sectionTop = section.offsetTop;

if(pageYOffset >= sectionTop - 100)
{
current = section.getAttribute("id");
}
});

navLinks.forEach(a =>
{
a.style.color = "#94a3b8";

if(a.getAttribute("href") === "#" + current)
{
a.style.color = "#6366f1";
}
});

});
