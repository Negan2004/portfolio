// typing animation
const roles = [
"Java Full Stack Developer",
"Backend Developer",
"Software Developer"
];

let roleIndex = 0;
let charIndex = 0;

function type(){
if(charIndex < roles[roleIndex].length){
document.getElementById("typing").innerHTML += roles[roleIndex].charAt(charIndex);
charIndex++;
setTimeout(type,50);
}else{
setTimeout(erase,1500);
}
}

function erase(){
if(charIndex > 0){
document.getElementById("typing").innerHTML = roles[roleIndex].substring(0,charIndex-1);
charIndex--;
setTimeout(erase,30);
}else{
roleIndex++;
if(roleIndex >= roles.length) roleIndex = 0;
setTimeout(type,300);
}
}

type();


// mobile menu toggle
function toggleMenu(){
document.querySelector(".sidebar").classList.toggle("active");
}
