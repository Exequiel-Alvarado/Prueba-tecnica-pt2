// Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.querySelector('.main-nav');

menuToggle.addEventListener('click', function() {
    mainNav.classList.toggle('active');
    this.classList.toggle('active');
});

// Close mobile menu when clicking on links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        mainNav.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Language Toggle
const langToggle = document.getElementById('langToggle');
let currentLang = 'en'; // Default language

langToggle.addEventListener('click', function() {
    currentLang = currentLang === 'en' ? 'es' : 'en';
    changeLangText();
    translateContent();
});

function changeLangText() {
    const langText = langToggle.querySelector('.lang-text');
    const newText = langText.getAttribute(`data-${currentLang}`);
    langText.textContent = newText;
}

function translateContent() {
    const elementsToTranslate = document.querySelectorAll('[data-en][data-es]');
    elementsToTranslate.forEach(element => {
        const newText = element.getAttribute(`data-${currentLang}`);
        element.textContent = newText;
    });
}

// Testimonial Carousel
const testimonialTrack = document.getElementById('testimonialTrack');
// Modificar para seleccionar por clase en lugar de ID
const prevBtn = document.querySelector('.carousel-control.prev'); // <-- CAMBIADO
const nextBtn = document.querySelector('.carousel-control.next'); // <-- CAMBIADO
const dotsContainer = document.getElementById('carouselDots');

const testimonials = document.querySelectorAll('.testimonial-card');
let currentIndex = 0;
let testimonialWidth;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;

// ... el resto del código del carrusel sigue igual ...

// Create dots
testimonials.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

// Get all dots
const dots = document.querySelectorAll('.carousel-dot');

// Set initial position
updateCarousel();

// Update carousel dimensions on window resize
window.addEventListener('resize', updateCarousel);

function updateCarousel() {
    testimonialWidth = testimonialTrack.clientWidth / getVisibleSlides();
    goToSlide(currentIndex);
}

function getVisibleSlides() {
    if (window.innerWidth >= 992) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
}

function goToSlide(index) {
    const maxIndex = testimonials.length - getVisibleSlides();
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    currentTranslate = -currentIndex * testimonialWidth;
    
    testimonialTrack.style.transform = `translateX(${currentTranslate}px)`;
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
});

// Touch events for mobile swiping
testimonialTrack.addEventListener('touchstart', touchStart);
testimonialTrack.addEventListener('touchmove', touchMove);
testimonialTrack.addEventListener('touchend', touchEnd);

function touchStart(event) {
    isDragging = true;
    startPos = event.touches[0].clientX;
    prevTranslate = currentTranslate;
}

function touchMove(event) {
    if (!isDragging) return;
    const currentPosition = event.touches[0].clientX;
    const diff = currentPosition - startPos;
    currentTranslate = prevTranslate + diff;
    
    // Add resistance at edges
    if (currentTranslate > 0) {
        currentTranslate = 0;
    } else if (currentTranslate < -(testimonials.length - getVisibleSlides()) * testimonialWidth) {
        currentTranslate = -(testimonials.length - getVisibleSlides()) * testimonialWidth;
    }
    
    testimonialTrack.style.transform = `translateX(${currentTranslate}px)`;
}

function touchEnd() {
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;
    
    // If moved significantly, navigate to next/prev slide based on direction
    if (Math.abs(movedBy) > 100) {
        if (movedBy < 0) {
            goToSlide(currentIndex + 1);
        } else {
            goToSlide(currentIndex - 1);
        }
    } else {
        // If not moved significantly, snap back to current slide
        goToSlide(currentIndex);
    }
}

// FAQ Accordion
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
        // Close all other items
        accordionItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                const content = otherItem.querySelector('.accordion-content');
                content.style.maxHeight = null;
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
        const content = item.querySelector('.accordion-content');
        
        if (item.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            content.style.maxHeight = null;
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
        alert(currentLang === 'en' ? 'Please fill in all fields' : 'Por favor complete todos los campos');
        return;
    }
    
    // Here you would typically send the form data to a server
    // For demo purposes, we'll just show a success message
    alert(currentLang === 'en' ? 'Thank you for your message!' : '¡Gracias por su mensaje!');
    contactForm.reset();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});