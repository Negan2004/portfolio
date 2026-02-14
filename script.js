// ===============================
// MOBILE NAV MENU TOGGLE
// ===============================

function toggleMenu()
{
    document.getElementById("navLinks").classList.toggle("active");
}


// ===============================
// CLOSE MENU WHEN CLICK LINK (MOBILE)
// ===============================

document.querySelectorAll("#navLinks a").forEach(link =>
{
    link.addEventListener("click", () =>
    {
        document.getElementById("navLinks").classList.remove("active");
    });
});



// ===============================
// SMOOTH SCROLL (SAFE VERSION)
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor =>
{
    anchor.addEventListener("click", function(e)
    {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target)
        {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});



// ===============================
// PROJECT MODAL SYSTEM
// ===============================

let modalImages = [];

let currentIndex = 0;


// OPEN MODAL

function openModal(imagesArray)
{
    modalImages = imagesArray;

    currentIndex = 0;

    document.getElementById("modal").style.display = "flex";

    document.getElementById("modalImg").src = modalImages[currentIndex];
}


// CLOSE MODAL

function closeModal()
{
    document.getElementById("modal").style.display = "none";
}


// NEXT IMAGE

function nextImage()
{
    if(modalImages.length === 0) return;

    currentIndex++;

    if(currentIndex >= modalImages.length)
        currentIndex = 0;

    document.getElementById("modalImg").src = modalImages[currentIndex];
}


// PREVIOUS IMAGE

function prevImage()
{
    if(modalImages.length === 0) return;

    currentIndex--;

    if(currentIndex < 0)
        currentIndex = modalImages.length - 1;

    document.getElementById("modalImg").src = modalImages[currentIndex];
}



// ===============================
// CLOSE MODAL WHEN CLICK OUTSIDE
// ===============================

window.onclick = function(e)
{
    const modal = document.getElementById("modal");

    if(e.target === modal)
    {
        closeModal();
    }
};



// ===============================
// PERFORMANCE OPTIMIZATION
// ===============================

// Prevent heavy scroll lag

let ticking = false;

window.addEventListener("scroll", function()
{
    if(!ticking)
    {
        window.requestAnimationFrame(function()
        {
            ticking = false;
        });

        ticking = true;
    }
});



// ===============================
// SAFE IMAGE LOAD HANDLER
// ===============================

window.addEventListener("load", function()
{
    document.body.style.opacity = "1";
});
