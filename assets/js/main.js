// Main JavaScript for Deexcellentcrib Website

document.addEventListener('DOMContentLoaded', function() {
    initLoadingScreen();
    initNavigation();
    initPortfolio();
    initContactForm();
    initBackToTop();
    initCurrentYear();
    initAnimations();
    initMobileMenu();
    
    console.log('🚀 Deexcellentcrib website initialized');
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (!loadingScreen) return;
    
    setTimeout(() => {
        loadingScreen.classList.add('loaded');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
}

// Navigation: accessible desktop/mobile behaviour with valid in-page destinations.
function initNavigation() {
    const header = document.querySelector('.header');
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!header) return;

    const mobileQuery = window.matchMedia('(max-width: 1100px)');

    function closeMenu() {
        if (!navMenu || !menuToggle) return;
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation menu');
        document.body.classList.remove('nav-open');
        document.body.style.overflow = '';
    }

    function openMenu() {
        if (!navMenu || !menuToggle) return;
        navMenu.classList.add('active');
        menuToggle.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', 'Close navigation menu');
        document.body.classList.add('nav-open');
        document.body.style.overflow = 'hidden';
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.contains('active') ? closeMenu() : openMenu();
        });

        document.addEventListener('click', (event) => {
            if (navMenu.classList.contains('active') &&
                !navMenu.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeMenu();
        });

        navLinks.forEach(link => link.addEventListener('click', closeMenu));
        window.addEventListener('resize', () => {
            if (!mobileQuery.matches) closeMenu();
        });
    }

    function updateActiveNavLink() {
        const scrollPos = window.scrollY + (header.offsetHeight || 80) + 80;
        let currentSection = 'home';
        document.querySelectorAll('main section[id], body > section[id], section[id]').forEach(section => {
            if (scrollPos >= section.offsetTop) currentSection = section.id;
        });
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${currentSection}`;
            link.classList.toggle('active', isActive);
            if (isActive) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    }

    let scrollQueued = false;
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 12);
        if (!scrollQueued) {
            window.requestAnimationFrame(() => {
                updateActiveNavLink();
                scrollQueued = false;
            });
            scrollQueued = true;
        }
    }, { passive: true });

    // Account for the fixed header when following section links.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            event.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - header.offsetHeight - 12;
            window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
            if (history.replaceState) history.replaceState(null, '', href);
        });
    });

    updateActiveNavLink();
}

// Kept as a safe no-op compatibility hook; menu behaviour is managed by initNavigation().
function initMobileMenu() {}

// Portfolio
function initPortfolio() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (!portfolioGrid || filterButtons.length === 0) return;
    
    // Portfolio data
    const portfolioData = [
        {
            id: 1,
            title: "Warm Contemporary Living Room",
            category: "living",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
            tags: ["Inspiration", "Warm neutrals"],
            description: "An inspiration reference for layered textures, light and comfortable furniture."
        },
        {
            id: 2,
            title: "Serene Bedroom Direction",
            category: "bedroom",
            image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",
            tags: ["Inspiration", "Restful"],
            description: "A reference for a restful palette, soft textures and uncluttered styling."
        },
        {
            id: 3,
            title: "Contemporary Workspace Direction",
            category: "office",
            image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
            tags: ["Inspiration", "Workspace"],
            description: "A reference for a focused workspace with a clear, practical layout."
        },
        {
            id: 4,
            title: "Contemporary Kitchen Direction",
            category: "kitchen",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80",
            tags: ["Inspiration", "Functional"],
            description: "A reference for clean finishes, useful work surfaces and storage planning."
        },
        {
            id: 5,
            title: "Dining Area Inspiration",
            category: "living",
            image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=900&q=80",
            tags: ["Inspiration", "Gathering"],
            description: "A reference for a welcoming dining area and considered proportions."
        },
        {
            id: 6,
            title: "Relaxed Family Living Inspiration",
            category: "living",
            image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
            tags: ["Inspiration", "Comfort"],
            description: "A reference for a relaxed room with warm materials and comfortable seating."
        }
    ];
    
    // Render portfolio items
    function renderPortfolio(items) {
        portfolioGrid.innerHTML = '';
        
        items.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.innerHTML = `
                <div class="portfolio-image">
                    <img src="${item.image}" alt="${item.title} inspiration reference" loading="lazy" decoding="async" onerror="this.onerror=null;this.style.display='none';this.parentElement.classList.add('image-unavailable');this.parentElement.setAttribute('aria-label','Image unavailable: '+${JSON.stringify('')}+'${item.title}')">
                </div>
                <div class="portfolio-content">
                    <div class="portfolio-tags">
                        ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            portfolioGrid.appendChild(portfolioItem);
        });
    }
    
    // Initial render
    renderPortfolio(portfolioData);
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Get filter
            const filter = this.dataset.filter;
            
            // Filter items
            let filteredItems;
            if (filter === 'all') {
                filteredItems = portfolioData;
            } else {
                filteredItems = portfolioData.filter(item => 
                    item.category === filter
                );
            }
            
            // Animate transition
            portfolioGrid.style.opacity = '0';
            portfolioGrid.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                renderPortfolio(filteredItems);
                portfolioGrid.style.opacity = '1';
                portfolioGrid.style.transform = 'translateY(0)';
            }, 300);
        });
    });
}

// Contact Form — creates a WhatsApp message; it does not falsely claim server submission.
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!contactForm.reportValidity()) return;

        const name = document.getElementById('name')?.value.trim() || '';
        const email = document.getElementById('email')?.value.trim() || '';
        const phone = document.getElementById('phone')?.value.trim() || 'Not provided';
        const serviceSelect = document.getElementById('service');
        const service = serviceSelect?.options[serviceSelect.selectedIndex]?.text || 'Not specified';
        const message = document.getElementById('message')?.value.trim() || 'No additional details provided.';
        const status = document.getElementById('formStatus');

        const whatsappMessage = `Hello Deexcellentcrib, I would like to discuss an interior design project.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nWhat I would like to improve: ${message}\n\nPlease let me know the next step.`;
        const whatsappURL = `https://wa.me/2348156792070?text=${encodeURIComponent(whatsappMessage)}`;

        if (status) status.textContent = 'WhatsApp is opening with your enquiry. Review the message and press Send to contact Deexcellentcrib.';
        const opened = window.open(whatsappURL, '_blank', 'noopener,noreferrer');
        if (!opened) window.location.href = whatsappURL;
    });
}

// Back to Top
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Current Year
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card');
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .service-card,
        .portfolio-item,
        .testimonial-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.animate-in,
        .portfolio-item.animate-in,
        .testimonial-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 9999;
                animation: slideIn 0.3s ease;
                border-left: 4px solid #2196F3;
                max-width: 90vw;
            }
            .notification-success { border-left-color: #4CAF50; }
            .notification-error { border-left-color: #f44336; }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Mobile optimizations
function initMobileOptimizations() {
    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            // Close mobile menu on orientation change
            const menuToggle = document.querySelector('.menu-toggle');
            const navMenu = document.querySelector('.nav-menu');
            if (menuToggle && navMenu && navMenu.classList.contains('active')) {
                if (menuToggle) menuToggle.classList.remove('active');
                if (navMenu) navMenu.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.overflow = '';
            }
        }, 100);
    });
    
    // Optimize for touch devices
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Increase tap target sizes
        const tapTargets = document.querySelectorAll('.btn, .nav-link, .filter-btn');
        tapTargets.forEach(element => {
            if (element.clientHeight < 44) {
                element.style.minHeight = '44px';
            }
            if (element.clientWidth < 44) {
                element.style.minWidth = '44px';
            }
        });
    }
}

// Initialize mobile optimizations
initMobileOptimizations();

// Handle window load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Performance monitoring
    if (window.performance) {
        const paintMetrics = performance.getEntriesByType('paint');
        paintMetrics.forEach(metric => {
            console.log(`[Performance] ${metric.name}: ${metric.startTime.toFixed(2)}ms`);
        });
    }
});