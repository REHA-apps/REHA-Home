/* ============================================
   REHA Apps — Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollReveal();
    initSmoothScroll();
    initCountUp();
});

/* ---------- Navbar ---------- */
function initNavbar() {
    const navbar = document.querySelector('#navbar');
    const toggle = document.querySelector('#nav-toggle');
    const menu = document.querySelector('#mobile-menu');

    // Scroll effect
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    navbar.classList.add('bg-[#0A0E1A]/95', 'backdrop-blur-xl', 'shadow-[0_1px_0_rgba(255,255,255,0.06)]');
                    navbar.querySelector('div').classList.remove('py-4');
                    navbar.querySelector('div').classList.add('py-2.5');
                } else {
                    navbar.classList.remove('bg-[#0A0E1A]/95', 'backdrop-blur-xl', 'shadow-[0_1px_0_rgba(255,255,255,0.06)]');
                    navbar.querySelector('div').classList.add('py-4');
                    navbar.querySelector('div').classList.remove('py-2.5');
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Mobile toggle
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });

        menu.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
            });
        });
    }
}

/* ---------- Scroll Reveal ---------- */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    reveals.forEach(el => observer.observe(el));
}

/* ---------- Smooth Scroll ---------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

/* ---------- Count Up Animation ---------- */
function initCountUp() {
    const numbers = document.querySelectorAll('[data-count]');
    if (!numbers.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumber(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    numbers.forEach(el => observer.observe(el));
}

function animateNumber(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 1800;
    const startTime = performance.now();

    function ease(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(ease(progress) * target);
        el.textContent = prefix + value.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}
