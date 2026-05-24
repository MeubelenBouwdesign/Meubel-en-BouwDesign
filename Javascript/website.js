// ==========================================
// 1. SMOOTH SCROLL (Lenis) — alleen als de library geladen is
// ==========================================
let lenis = null;

if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}


// ==========================================
// 2. FADE-IN ON SCROLL
// ==========================================
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.fade-in, .fade-stagger').forEach(el => {
    fadeObserver.observe(el);
});


// ==========================================
// 3. PARALLAX OP DE HERO (alleen als Lenis er is)
// ==========================================
const foto = document.querySelector('.intro-foto');
const introText = document.querySelector('.intro-text');
const introBlok = document.querySelector('.intro_1');

if (lenis) {
    lenis.on('scroll', ({ scroll }) => {
        if (!introBlok || scroll > introBlok.offsetHeight) return;

        // foto blijft "achter" — beweegt langzamer dan de scroll
        if (foto) {
            foto.style.transform = `scale(1.1) translateY(${scroll * 0.25}px)`;
        }

        // tekst beweegt juist iets sneller weg
        if (introText) {
            introText.style.transform = `translateY(${scroll * -0.15}px)`;
            introText.style.opacity = 1 - (scroll / introBlok.offsetHeight) * 1.2;
        }
    });
}


// ==========================================
// 4. HAMBURGER MENU
// ==========================================
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.right-navbar');

if (hamburger && nav) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = nav.classList.toggle('active');
        hamburger.classList.toggle('active', isOpen);
    });

    // sluit het menu als je op een link klikt
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // sluit het menu als je buiten het menu klikt
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}
