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

// Navigation
function initNavigation() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Update active link on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        updateActiveNavLink();
    });
    
    function updateActiveNavLink() {
        const scrollPos = window.scrollY + 100;
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const section = document.querySelector(href);
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    
                    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                        navLinks.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                    }
                }
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 992) {
                const menuToggle = document.querySelector('.menu-toggle');
                const navMenu = document.querySelector('.nav-menu');
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth > 992) {
                dropdown.classList.add('active');
            }
        });
        
        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth > 992) {
                dropdown.classList.remove('active');
            }
        });
        
        dropdown.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Portfolio
function initPortfolio() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (!portfolioGrid || filterButtons.length === 0) return;
    
    // Portfolio data
    const portfolioData = [
        {
            id: 1,
            title: "Modern Luxury Living Room",
            category: "living",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tags: ["Modern", "Luxury"],
            description: "A spacious living room transformation with custom furniture."
        },
        {
            id: 2,
            title: "Serene Master Bedroom",
            category: "bedroom",
            image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tags: ["Contemporary", "Calm"],
            description: "Creating a peaceful retreat with premium textiles."
        },
        {
            id: 3,
            title: "Executive Office Space",
            category: "office",
            image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tags: ["Professional", "Modern"],
            description: "Designing a productive workspace with ergonomic furniture."
        },
        {
            id: 4,
            title: "Contemporary Kitchen",
            category: "kitchen",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tags: ["Modern", "Functional"],
            description: "Kitchen renovation with smart storage solutions."
        },
        {
            id: 5,
            title: "Elegant Dining Area",
            category: "living",
            image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tags: ["Elegant", "Classic"],
            description: "Perfect space for entertaining guests."
        },
        {
            id: 6,
            title: "Cozy Family Room",
            category: "living",
            image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tags: ["Cozy", "Family"],
            description: "Comfortable space for family time."
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
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
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

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value || 'Not provided',
            service: document.getElementById('service').value,
            message: document.getElementById('message').value || 'No message',
            timestamp: new Date().toISOString()
        };
        
        // Validate
        if (!formData.name || !formData.email || !formData.service) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Show loading
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success
            showNotification('Message sent successfully! We will contact you soon.', 'success');
            
            // Create WhatsApp message
            const whatsappMessage = `New Inquiry from Deexcellentcrib Website:
            
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${formData.service}
Message: ${formData.message}

Submitted: ${new Date().toLocaleString()}`;
            
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/2348156792070?text=${encodedMessage}`;
            
            // Open WhatsApp after 2 seconds
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
            }, 2000);
            
            // Reset form
            contactForm.reset();
            
        } catch (error) {
            console.error('Error:', error);
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
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
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
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