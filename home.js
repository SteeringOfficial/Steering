// Gestion des sections "vente" et "vendu"
const sections = {
    vente: document.querySelector("#vente"),
    vendu: document.querySelector("#vendu")
};

function showSection(sectionId) {
    Object.keys(sections).forEach(id => {
        sections[id].style.display = id === sectionId ? "block" : "none";
    });
}

window.onload = () => {
    showSection('vente'); // Afficher la section "vente" par défaut
};

// Initialisation des sections "vente" et "vendu" sur DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    showSection("vente");
});


// Gestion des sliders pour les images
function createSlider(slidesSelector, displayClass) {
    const slides = document.querySelectorAll(slidesSelector);
    let index = 0;
    let intervalId = null;

    function showSlide(newIndex) {
        index = (newIndex + slides.length) % slides.length;
        slides.forEach(slide => slide.classList.remove(displayClass));
        slides[index].classList.add(displayClass);
    }

    function prevSlide() {
        clearInterval(intervalId);
        showSlide(index - 1);
    }

    function nextSlide() {
        clearInterval(intervalId);
        showSlide(index + 1);
    }

    function startAutoSlide(interval = 5000) {
        intervalId = setInterval(() => {
            showSlide(index + 1);
        }, interval);
    }

    document.addEventListener("DOMContentLoaded", () => {
        if (slides.length > 0) {
            showSlide(0);
            startAutoSlide();
        }
    });

    return { prevSlide, nextSlide };
}

const slider0 = createSlider(".slides0 img", "displaySlide");
window.prevSlide0 = slider0.prevSlide;
window.nextSlide0 = slider0.nextSlide;

const slider01 = createSlider(".slides01 img", "displaySlide");
window.prevSlide01 = slider01.prevSlide;
window.nextSlide01 = slider01.nextSlide;

const slider1 = createSlider(".slides1 img", "displaySlide");
window.prevSlide1 = slider1.prevSlide;
window.nextSlide1 = slider1.nextSlide;

const slider2 = createSlider(".slides2 img", "displaySlide");
window.prevSlide2 = slider2.prevSlide;
window.nextSlide2 = slider2.nextSlide;

//ModalContainer
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal(){
    modalContainer.classList.toggle("active")
}

/* VOD BUTTON */
const video = document.getElementById("vods");
const progressBar = document.getElementById("progressBar");
const progressContainer = document.getElementById("progressContainer");

function togglePlayPause() {
    const button = document.getElementById("playPauseButton");
    if (video.paused) {
        video.play();
        button.textContent = "⏸";
    } else {
        video.pause();
        button.textContent = "▶";
    }
}

// Met à jour la barre en fonction du temps
video.addEventListener("timeupdate", () => {
    const percentage = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percentage}%`;
});

// Aller à un moment donné quand on clique sur la barre
function seekVideo(event) {
    const rect = progressContainer.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = offsetX / rect.width;
    video.currentTime = percentage * video.duration;
}

