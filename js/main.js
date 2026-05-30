/* ============================================================
   华纳石化装备 - 交互脚本
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- DOM Elements ----
    const header = document.getElementById('header');
    const nav = document.getElementById('nav');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');
    const heroStats = document.querySelector('.hero-stats');

    // ==================== HEADER SCROLL EFFECT ====================
    let lastScroll = 0;

    function updateHeader() {
        const scrollY = window.scrollY;

        // Add scrolled class
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top visibility
        if (scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        lastScroll = scrollY;
    }

    window.addEventListener('scroll', updateHeader, { passive: true });

    // ==================== MOBILE MENU ====================
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('open');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ==================== ACTIVE NAV LINK ====================
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        const scrollY = window.scrollY + 100;

        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // ==================== SCROLL ANIMATIONS ====================
    const fadeElements = document.querySelectorAll(
        '.about-highlight, .product-card, .strength-card, .news-card, .contact-info-card'
    );

    fadeElements.forEach(el => {
        el.classList.add('fade-in');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));

    // Hero stats animation
    if (heroStats) {
        observer.observe(heroStats);
        heroStats.classList.add('fade-in');
    }

    // ==================== CONTACT FORM ====================
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple validation
            const inputs = contactForm.querySelectorAll('[required]');
            let valid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#c0392b';
                    valid = false;

                    input.addEventListener('input', function reset() {
                        input.style.borderColor = '';
                        input.removeEventListener('input', reset);
                    }, { once: true });
                }
            });

            if (!valid) return;

            // Simulate submission
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = '提交中…';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = '✓ 提交成功';
                btn.style.background = '#2ecc71';
                contactForm.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1200);
        });
    }

    // ==================== SMOOTH SCROLL FOR SAFARI ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // ==================== INITIAL STATE ====================
    updateHeader();
    updateActiveLink();
});
