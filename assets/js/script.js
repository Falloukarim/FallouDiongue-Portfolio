// Navigation mobile
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
    this.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Fermer le menu mobile en cliquant sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
        document.querySelector('.mobile-menu-btn').innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Animation au défilement
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => fadeObserver.observe(el));

// Gestion du formulaire
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulation d'envoi
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitBtn.disabled = true;
    
    // Simulation d'envoi avec fetch (à remplacer par votre backend)
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Enregistrer dans la console pour le moment
    console.log('Formulaire envoyé:', formData);
    
    setTimeout(() => {
        alert('Merci pour votre message! Je vous répondrai dans les plus brefs délais.');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Navigation active
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
    
    // Animation de la navigation
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.padding = '15px 0';
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.padding = '20px 0';
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
    }
});

// Fonction pour générer le PDF
function generatePDF() {
    // Ajouter un titre pour l'impression
    const printTitle = document.createElement('div');
    printTitle.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        text-align: center;
        font-size: 18pt;
        font-weight: bold;
        color: #000;
        padding: 10px 0;
        border-bottom: 2px solid #2563eb;
        background: #f8f9fa;
        z-index: 10000;
    `;
    printTitle.textContent = "CV Professionnel - Fallou Karim Diongue";
    document.body.appendChild(printTitle);
    
    // Lancer l'impression
    window.print();
    
    // Supprimer le titre après l'impression
    setTimeout(() => {
        if (printTitle.parentNode) {
            printTitle.parentNode.removeChild(printTitle);
        }
    }, 100);
}

// Navigation smooth
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation des barres de compétences
const skillCards = document.querySelectorAll('.skill-card');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.skill-progress');
            const width = progressBar.style.width;
            progressBar.style.width = '0%';
            setTimeout(() => {
                progressBar.style.width = width;
            }, 300);
        }
    });
}, { threshold: 0.5 });

skillCards.forEach(card => skillObserver.observe(card));

// Initialiser l'affichage des liens de navigation
if (window.innerWidth <= 768) {
    document.querySelector('.nav-links').style.display = 'none';
}

// Date de copyright dynamique
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Initialiser les barres de progression au chargement
window.addEventListener('load', () => {
    // Mettre à jour l'année dans le copyright
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Ajouter l'événement pour fermer le menu en cliquant en dehors
    document.addEventListener('click', (e) => {
        const navLinks = document.querySelector('.nav-links');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        if (!navLinks.contains(e.target) && !menuBtn.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Amélioration de l'accessibilité
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            document.querySelector('.mobile-menu-btn').innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
});