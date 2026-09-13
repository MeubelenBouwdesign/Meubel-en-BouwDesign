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


// ==========================================
// 5. PROJECTEN — categoriegrid + detailmodal + carousel
//    Draait alleen op de "Onze Projecten" pagina (vereist .project-trigger).
// ==========================================
(function initProjectGallery() {

    const triggers = document.querySelectorAll('.project-trigger');
    if (!triggers.length) return; // niet op deze pagina

    const data = window.MBD_PROJECTS;
    if (!data) return;

    // ---- DOM-referenties ----
    const categoryOverlay   = document.getElementById('categoryOverlay');
    const categoryClose     = document.getElementById('categoryClose');
    const categoryTitle     = document.getElementById('categoryTitle');
    const categorySubtitle  = document.getElementById('categorySubtitle');
    const projectGrid       = document.getElementById('projectGrid');

    const detailOverlay     = document.getElementById('projectDetail');
    const detailClose       = document.getElementById('detailClose');
    const detailTitle       = document.getElementById('detailTitle');
    const detailSubtitle    = document.getElementById('detailSubtitle');
    const detailDescription = document.getElementById('detailDescription');

    const carouselTrack     = document.getElementById('carouselTrack');
    const carouselPrev      = document.getElementById('carouselPrev');
    const carouselNext      = document.getElementById('carouselNext');
    const carouselCounter   = document.getElementById('carouselCounter');

    // bescherming: als één van de containers ontbreekt, niets doen
    if (!categoryOverlay || !detailOverlay) return;

    // ---- Carousel state ----
    let carouselIndex = 0;
    let carouselLength = 0;

    // ---- Helpers ----

    function lockScroll(lock) {
        if (lock) {
            document.body.style.overflow = 'hidden';
            if (lenis) lenis.stop();
        } else {
            document.body.style.overflow = '';
            if (lenis) lenis.start();
        }
    }

    function openOverlay(el) {
        el.classList.add('is-open');
        el.setAttribute('aria-hidden', 'false');
        lockScroll(true);
    }

    function closeOverlay(el) {
        el.classList.remove('is-open');
        el.setAttribute('aria-hidden', 'true');

        // pas scroll vrijgeven als beide overlays dicht zijn
        if (!categoryOverlay.classList.contains('is-open') &&
            !detailOverlay.classList.contains('is-open')) {
            lockScroll(false);
        }
    }

    function escapeHTML(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // ---- Categoriegrid opbouwen ----

    function renderCategory(categoryKey) {
        const cat = data[categoryKey];
        if (!cat || !Array.isArray(cat.items)) return;

        categorySubtitle.textContent = cat.label || 'Onze';
        categoryTitle.textContent = cat.title || '';

        projectGrid.innerHTML = '';

        cat.items.forEach((item, idx) => {
            const card = document.createElement('article');
            card.className = 'project-card';
            card.style.animationDelay = (idx * 0.08) + 's';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', 'Bekijk project ' + (item.title || ''));

            card.innerHTML = `
                <div class="project-card-image">
                    <img src="${escapeHTML(item.cover || '')}" alt="${escapeHTML(item.title || '')}">
                </div>
                <div class="project-card-body">
                    <span class="project-card-label">Project</span>
                    <h3>${escapeHTML(item.title || '')}</h3>
                    <span class="project-card-cta">Bekijk project →</span>
                </div>
            `;

            const openHandler = () => openDetail(categoryKey, item);
            card.addEventListener('click', openHandler);
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openHandler();
                }
            });

            projectGrid.appendChild(card);
        });

        openOverlay(categoryOverlay);
    }

    // ---- Detailmodal openen ----

    function openDetail(categoryKey, project) {
        const cat = data[categoryKey] || {};

        detailSubtitle.textContent = cat.label || 'Project';
        detailTitle.textContent = project.title || '';
        detailDescription.textContent = project.description || '';

        // foto's bepalen (val terug op cover als er geen images zijn)
        const imgs = (Array.isArray(project.images) && project.images.length)
            ? project.images
            : (project.cover ? [project.cover] : []);

        carouselTrack.innerHTML = '';
        imgs.forEach((src, i) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.innerHTML = `<img src="${escapeHTML(src)}" alt="${escapeHTML(project.title || '')} foto ${i + 1}">`;
            carouselTrack.appendChild(slide);
        });

        carouselLength = imgs.length;
        carouselIndex = 0;
        updateCarousel();

        openOverlay(detailOverlay);
    }

    // ---- Carousel logica ----

    function updateCarousel() {
        if (!carouselLength) {
            carouselCounter.textContent = '0 / 0';
            return;
        }
        carouselTrack.style.transform = `translateX(-${carouselIndex * 100}%)`;
        carouselCounter.textContent = `${carouselIndex + 1} / ${carouselLength}`;

        const single = carouselLength <= 1;
        carouselPrev.disabled = single;
        carouselNext.disabled = single;
    }

    function nextSlide() {
        if (carouselLength <= 1) return;
        carouselIndex = (carouselIndex + 1) % carouselLength;
        updateCarousel();
    }

    function prevSlide() {
        if (carouselLength <= 1) return;
        carouselIndex = (carouselIndex - 1 + carouselLength) % carouselLength;
        updateCarousel();
    }

    // ---- Event handlers ----

    // hoofdtegels op de pagina
    triggers.forEach(trigger => {
        const handle = () => {
            const key = trigger.getAttribute('data-category');
            const cat = data[key];
            if (!cat) return;

            // uitgelichte projecten = één enkel project, direct het detail openen
            if (cat.single) {
                openDetail(key, cat.single);
            } else if (Array.isArray(cat.items)) {
                renderCategory(key);
            }
        };

        trigger.addEventListener('click', handle);
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handle();
            }
        });
    });

    // sluitknoppen
    if (categoryClose) categoryClose.addEventListener('click', () => closeOverlay(categoryOverlay));
    if (detailClose)   detailClose.addEventListener('click',   () => closeOverlay(detailOverlay));

    // klik op de achtergrond sluit de overlay
    categoryOverlay.addEventListener('click', (e) => {
        if (e.target === categoryOverlay) closeOverlay(categoryOverlay);
    });
    detailOverlay.addEventListener('click', (e) => {
        if (e.target === detailOverlay) closeOverlay(detailOverlay);
    });

    // toetsenbord: ESC sluit, pijltjes navigeren door de carousel
    document.addEventListener('keydown', (e) => {
        if (detailOverlay.classList.contains('is-open')) {
            if (e.key === 'Escape')      closeOverlay(detailOverlay);
            else if (e.key === 'ArrowRight') nextSlide();
            else if (e.key === 'ArrowLeft')  prevSlide();
        } else if (categoryOverlay.classList.contains('is-open')) {
            if (e.key === 'Escape') closeOverlay(categoryOverlay);
        }
    });

    // carousel pijlen
    if (carouselNext) carouselNext.addEventListener('click', nextSlide);
    if (carouselPrev) carouselPrev.addEventListener('click', prevSlide);

    // swipe op touchscreens
    let touchStartX = 0;
    if (carouselTrack) {
        carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carouselTrack.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 40) {
                if (diff > 0) nextSlide();
                else          prevSlide();
            }
        }, { passive: true });
    }

})();