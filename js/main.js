/* ============================================
   PORTAFOLIO DIGITAL - JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- NAVEGACIÓN ----
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll: sombra en navbar + link activo
    const sections = document.querySelectorAll('section[id]');

    function onScroll() {
        const scrollY = window.scrollY;

        // Navbar sombra
        navbar.classList.toggle('scrolled', scrollY > 50);

        // Link activo según sección visible
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);

            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });

        // Botón volver arriba
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            backToTop.classList.toggle('visible', scrollY > 500);
        }
    }

    window.addEventListener('scroll', onScroll);
    onScroll();

    // Menú hamburguesa
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // ---- VOLVER ARRIBA ----
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---- SCROLL REVEAL (animaciones al hacer scroll) ----
    const fadeElements = document.querySelectorAll(
        '.foda-card, .valor-card, .evidencia-card, .plan-item, .canvas-card, .compromiso-item'
    );

    fadeElements.forEach(el => el.classList.add('fade-in'));

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // ---- SUBIR VIDEO (placeholder funcional) ----
    const videoUpload = document.getElementById('videoUpload');
    if (videoUpload) {
        videoUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const container = document.querySelector('.video-placeholder');
                if (container) {
                    // Crear elemento video
                    const video = document.createElement('video');
                    video.controls = true;
                    video.style.width = '100%';
                    video.style.borderRadius = '12px';

                    const source = document.createElement('source');
                    source.src = URL.createObjectURL(file);
                    source.type = file.type;

                    video.appendChild(source);
                    container.replaceWith(video);
                }
            }
        });
    }

    // ---- SMOOTH SCROLL para links internos ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Altura del navbar
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

});
