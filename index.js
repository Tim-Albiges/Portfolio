const navLinks = document.querySelectorAll('nav a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const hamburgerIcon = document.getElementById('hamburger-icon');
const navMenu = document.querySelector('nav ul');

function toggleMenu() {
    navMenu.classList.toggle('menu-active');
    console.log("Menu toggled!");
}

if (hamburgerIcon) {
    hamburgerIcon.addEventListener('click', toggleMenu);
}

function filterProjects(category) {
    const projects = document.querySelectorAll('#projects article');

    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

const lightbox = document.createElement('div');
lightbox.id = 'lightbox';

lightbox.style.cssText = "display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); align-items: center; justify-content: center; z-index: 1000;";
document.body.appendChild(lightbox);

const lightboxImage = document.createElement('img');
lightboxImage.style.maxWidth = "90%";
lightboxImage.style.maxHeight = "90%";
lightbox.appendChild(lightboxImage);

const projectImages = document.querySelectorAll('#projects img');

projectImages.forEach(img => {
    img.style.cursor = 'pointer';

    img.addEventListener('click', () => {
        lightboxImage.src = img.src;
        lightbox.style.display = 'flex';
    });
});

lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

const contactForm = document.querySelector('form');
const nameInput = document.getElementById('user-name');
const emailInput = document.getElementById('user-email');
const messageInput = document.getElementById('user-message');

const feedbackMessage = document.createElement('p');
feedbackMessage.style.fontWeight = 'bold';
contactForm.prepend(feedbackMessage);

contactForm.addEventListener('submit', function (e) {
    let isValid = true;
    let errorMessage = "";

    feedbackMessage.textContent = "";
    feedbackMessage.style.color = "red";

    if (nameInput.value.trim() === "") {
        isValid = false;
        errorMessage += "Name is required. ";
        nameInput.style.borderColor = "red";
    } else {
        nameInput.style.borderColor = "#cccccc";
    }

    if (emailInput.value.trim() === "" || !emailInput.value.includes('@')) {
        isValid = false;
        errorMessage += "A valid email is required. ";
        emailInput.style.borderColor = "red";
    } else {
        emailInput.style.borderColor = "#cccccc";
    }

    if (messageInput.value.trim() === "") {
        isValid = false;
        errorMessage += "Message cannot be empty. ";
        messageInput.style.borderColor = "red";
    } else {
        messageInput.style.borderColor = "#cccccc";
    }

    if (!isValid) {
        e.preventDefault();
        feedbackMessage.textContent = errorMessage;
        console.warn("Form submission blocked due to validation errors.");
    } else {
        e.preventDefault();
        feedbackMessage.style.color = "green";
        feedbackMessage.textContent = "Message sent successfully!";
        contactForm.reset();
    }
});