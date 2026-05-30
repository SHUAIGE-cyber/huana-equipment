/* ============================================================
   华纳石化装备 - 公共组件加载
   动态注入 Header 和 Footer
   ============================================================ */

(function () {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const isEn = window.__EN_PATH__ || window.location.pathname.includes('/en/');
    const basePath = isEn ? '../' : '';

    // ====== Header HTML ======
    const headerHTML = `
<header class="header" id="header">
    <div class="container header-inner">
        <a href="${basePath}index.html" class="logo">
            <img src="${basePath}images/logo-main.png" alt=""${isEn ? 'Warner Equipment' : '华纳石化装备'}" class="logo-img" height="44">
            <div class="logo-text">
                <span class="logo-title">${isEn ? 'Warner Equipment' : '华纳石化装备'}</span>
                <span class="logo-subtitle">HUANA EQUIPMENT</span>
            </div>
        </a>
        <nav class="nav" id="nav">
            <ul class="nav-list">
                <li><a href="${basePath}index.html" class="nav-link" data-page="index.html">${isEn ? 'Home' : '首页'}</a></li>
                <li><a href="${basePath}about.html" class="nav-link" data-page="about.html">${isEn ? 'About' : '关于我们'}</a></li>
                <li><a href="${basePath}products.html" class="nav-link" data-page="products.html">${isEn ? 'Products' : '产品中心'}</a></li>
                <li><a href="${basePath}equipment.html" class="nav-link" data-page="equipment.html">${isEn ? 'Equipment' : '装备制造'}</a></li>
                <li><a href="${basePath}projects.html" class="nav-link" data-page="projects.html">${isEn ? 'Projects' : '工程业绩'}</a></li>
                <li><a href="${basePath}credentials.html" class="nav-link" data-page="credentials.html">${isEn ? 'Credentials' : '资质荣誉'}</a></li>
                <li><a href="${basePath}news.html" class="nav-link" data-page="news.html">${isEn ? 'News' : '新闻动态'}</a></li>
                <li><a href="${basePath}careers.html" class="nav-link" data-page="careers.html">${isEn ? 'Careers' : '人才招聘'}</a></li>
                <li><a href="${basePath}contact.html" class="nav-link" data-page="contact.html">${isEn ? 'Contact' : '联系我们'}</a></li>
            </ul>
        </nav>
        <div class="header-actions">
            <a href="${isEn ? '../index.html' : 'en/index.html'}" class="lang-switch" title="${isEn ? '切换中文' : 'Switch to English'}">${isEn ? '中文' : 'EN'}</a>
        </div>
        <button class="menu-toggle" id="menuToggle" aria-label="菜单">
            <span></span><span></span><span></span>
        </button>
    </div>
</header>`;

    // ====== Footer HTML ======
    const footerHTML = `
<footer class="footer">
    <div class="container">
        <div class="footer-grid">
            <div class="footer-brand">
                <h3>江苏华纳石化装备科技有限公司</h3>
                <p class="footer-brand-en">Jiangsu Warner Petrochemical Equipment Technology Co., Ltd.</p>
                <p class="footer-brand-tagline">华纳集团旗下 · A2级压力容器制造商</p>
                <p class="footer-brand-desc">
                    专注压力容器与化工核心装备制造，为石油化工、可降解材料行业提供高品质装备解决方案。
                </p>
            </div>
            <div class="footer-links">
                <h4>快速导航</h4>
                <ul>
                    <li><a href="index.html">首页</a></li>
                    <li><a href="about.html">关于我们</a></li>
                    <li><a href="products.html">产品中心</a></li>
                    <li><a href="equipment.html">装备制造</a></li>
                    <li><a href="projects.html">工程业绩</a></li>
                </ul>
            </div>
            <div class="footer-links">
                <h4>产品分类</h4>
                <ul>
                    <li><a href="products.html">A2级压力容器</a></li>
                    <li><a href="products.html">反应釜</a></li>
                    <li><a href="products.html">蒸馏塔</a></li>
                    <li><a href="products.html">换热器</a></li>
                    <li><a href="products.html">储罐</a></li>
                    <li><a href="products.html">可降解材料装备</a></li>
                </ul>
            </div>
            <div class="footer-links">
                <h4>相关链接</h4>
                <ul>
                    <li><a href="https://www.jshuana.com" target="_blank" rel="noopener">华纳石化工程集团 ↗</a></li>
                    <li><a href="credentials.html">资质荣誉</a></li>
                    <li><a href="news.html">新闻动态</a></li>
                    <li><a href="careers.html">人才招聘</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2021-2026 江苏华纳石化装备科技有限公司 版权所有</p>
            <p class="footer-icp">苏ICP备XXXXXXXX号-X</p>
        </div>
    </div>
</footer>

<button class="back-to-top" id="backToTop" aria-label="返回顶部">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>
</button>`;

    // ====== Inject into page ======
    document.addEventListener('DOMContentLoaded', () => {
        // Inject header
        const headerTarget = document.getElementById('global-header');
        if (headerTarget) {
            headerTarget.innerHTML = headerHTML;
        }

        // Inject footer
        const footerTarget = document.getElementById('global-footer');
        if (footerTarget) {
            footerTarget.innerHTML = footerHTML;
        }

        // Highlight current page in nav
        setTimeout(() => {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                const page = link.getAttribute('data-page');
                if (page === currentPage) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });

            // Re-initialize nav interactions
            initNavigation();
        }, 50);
    });

    // ====== Navigation logic (copied from main.js pattern) ======
    function initNavigation() {
        const header = document.getElementById('header');
        const nav = document.getElementById('nav');
        const menuToggle = document.getElementById('menuToggle');
        const backToTop = document.getElementById('backToTop');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!header || !nav || !menuToggle) return;

        // Scroll effect
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
            if (backToTop) {
                if (scrollY > 600) backToTop.classList.add('visible');
                else backToTop.classList.remove('visible');
            }
            lastScroll = scrollY;
        }, { passive: true });

        // Mobile menu
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

        // Initial state
        if (window.scrollY > 50) header.classList.add('scrolled');
    }
})();
