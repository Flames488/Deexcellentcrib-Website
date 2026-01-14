// Main JavaScript File for Deexcellentcrib Website

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initLoadingScreen();
  initNavigation();
  initScrollAnimations();
  initPortfolio();
  initServices();
  initContactForm();
  initChatbot();
  initStatsCounter();
  initBackToTop();
  initAIRecommendations();
  initWhatsAppButton();
  initParallaxEffects();
  
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
});

// Loading Screen
function initLoadingScreen() {
  const loadingScreen = document.querySelector('.loading-screen');
  
  // Simulate loading time
  setTimeout(() => {
    loadingScreen.classList.add('loaded');
    
    // Remove from DOM after animation
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 1500);
}

// Navigation
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Scroll effect on navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = navbar.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Scroll Animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Portfolio with Filters
function initPortfolio() {
  const portfolioData = [
    {
      id: 1,
      title: "Modern Luxury Living Room",
      category: ["living", "luxury"],
      image: "assets/images/portfolio/living-1.jpg",
      tags: ["Modern", "Luxury", "Minimalist"],
      description: "A spacious living room transformation with custom furniture and smart lighting."
    },
    {
      id: 2,
      title: "Serene Master Bedroom",
      category: ["bedroom", "luxury"],
      image: "assets/images/portfolio/bedroom-1.jpg",
      tags: ["Contemporary", "Calm", "Elegant"],
      description: "Creating a peaceful retreat with custom storage and premium textiles."
    },
    {
      id: 3,
      title: "Executive Office Space",
      category: ["office"],
      image: "assets/images/portfolio/office-1.jpg",
      tags: ["Professional", "Productive", "Modern"],
      description: "Designing a productive workspace with ergonomic furniture and proper lighting."
    },
    {
      id: 4,
      title: "Contemporary Kitchen",
      category: ["kitchen"],
      image: "assets/images/portfolio/kitchen-1.jpg",
      tags: ["Modern", "Functional", "Bright"],
      description: "Kitchen renovation with smart storage and premium finishes."
    },
    {
      id: 5,
      title: "Formal Dining Area",
      category: ["dining"],
      image: "assets/images/portfolio/dining-1.jpg",
      tags: ["Elegant", "Formal", "Classic"],
      description: "Designing the perfect space for entertaining and family gatherings."
    },
    {
      id: 6,
      title: "Cozy Family Living Room",
      category: ["living"],
      image: "assets/images/portfolio/living-2.jpg",
      tags: ["Cozy", "Family", "Warm"],
      description: "Creating a comfortable space for family time and relaxation."
    }
  ];
  
  const portfolioGrid = document.getElementById('portfolio-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  // Render portfolio items
  function renderPortfolio(items) {
    portfolioGrid.innerHTML = '';
    
    items.forEach(item => {
      const portfolioItem = document.createElement('div');
      portfolioItem.className = `portfolio-item ${item.category.join(' ')}`;
      
      portfolioItem.innerHTML = `
        <div class="portfolio-image">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          <div class="portfolio-overlay">
            <a href="portfolio-details/project-${item.id}.html" class="view-project">View Project</a>
          </div>
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
  
  // Initialize with all items
  renderPortfolio(portfolioData);
  
  // Filter functionality
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Get filter
      const filter = button.dataset.filter;
      
      // Filter items
      let filteredItems;
      if (filter === 'all') {
        filteredItems = portfolioData;
      } else {
        filteredItems = portfolioData.filter(item => 
          item.category.includes(filter)
        );
      }
      
      // Animate and render
      portfolioGrid.style.opacity = '0';
      
      setTimeout(() => {
        renderPortfolio(filteredItems);
        portfolioGrid.style.opacity = '1';
      }, 300);
    });
  });
}

// Services Animation
function initServices() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 100}ms`;
  });
}

// Contact Form with WhatsApp Integration
function initContactForm() {
  const contactForm = document.getElementById('leadForm');
  const formSuccess = document.getElementById('formSuccess');
  const sendAnother = document.getElementById('sendAnother');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
      name: this.name.value,
      email: this.email.value,
      phone: this.phone.value,
      service: this.service.value,
      details: this['project-details'].value,
      budget: this.budget.value,
      date: new Date().toISOString()
    };
    
    // Validate form
    if (!formData.name || !formData.email || !formData.service) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.querySelector('.btn-text').textContent;
    submitBtn.querySelector('.btn-text').textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
      // Send to Formspree or your backend
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        // Show success message
        contactForm.style.display = 'none';
        formSuccess.hidden = false;
        
        // Send WhatsApp notification (using your phone number)
        const whatsappMessage = `New Lead from Deexcellentcrib Website:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Service: ${formData.service}
Budget: ${formData.budget || 'Not specified'}
Details: ${formData.details || 'No details provided'}`;
        
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappURL = `https://wa.me/2348156792070?text=${encodedMessage}`;
        
        // Open WhatsApp in new tab
        setTimeout(() => {
          window.open(whatsappURL, '_blank');
        }, 1000);
        
        // Reset form
        contactForm.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      showToast('Failed to send message. Please try again.', 'error');
    } finally {
      // Reset button
      submitBtn.querySelector('.btn-text').textContent = originalText;
      submitBtn.disabled = false;
    }
  });
  
  // Send another message
  if (sendAnother) {
    sendAnother.addEventListener('click', () => {
      formSuccess.hidden = true;
      contactForm.style.display = 'block';
    });
  }
}

// AI Chatbot
function initChatbot() {
  const chatbotToggle = document.querySelector('.chatbot-toggle');
  const chatbotContainer = document.querySelector('.chatbot-container');
  const closeChatbot = document.querySelector('.close-chatbot');
  const chatbotInput = document.querySelector('.chatbot-input input');
  const chatbotSendBtn = document.querySelector('.chatbot-input button');
  const chatbotMessages = document.querySelector('.chatbot-messages');
  
  // Chatbot responses
  const responses = {
    greetings: ["Hello! I'm your design assistant. How can I help you today?", "Hi there! Ready to transform your space?"],
    services: ["We offer Full Interior Design, Consultation, Furniture Styling, and Renovation Guidance.", "Our services range from complete design projects to hourly consultations."],
    portfolio: ["You can view our portfolio filtered by room type, style, or budget.", "Check our projects section to see our transformation stories."],
    pricing: ["Pricing varies based on project scope. We offer free initial consultations!", "We provide custom quotes based on your specific needs and budget."],
    contact: ["You can reach us via WhatsApp at +2348156792070 or fill out our contact form.", "Contact us for a free consultation today!"],
    default: ["That's interesting! Tell me more about what you're looking for.", "I'd love to help with that. Could you provide more details?"]
  };
  
  // Initialize with welcome message
  addBotMessage("Hello! I'm your AI design assistant. Ask me about our services, portfolio, or design tips!");
  
  // Toggle chatbot
  chatbotToggle.addEventListener('click', () => {
    chatbotContainer.classList.toggle('active');
  });
  
  closeChatbot.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
  });
  
  // Send message function
  function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;
    
    // Add user message
    addUserMessage(message);
    
    // Clear input
    chatbotInput.value = '';
    
    // Bot response (simulated delay)
    setTimeout(() => {
      const botResponse = getBotResponse(message);
      addBotMessage(botResponse);
    }, 1000);
  }
  
  // Event listeners for sending
  chatbotSendBtn.addEventListener('click', sendMessage);
  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
  
  // Add message to chat
  function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    messageDiv.textContent = text;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
  
  function addUserMessage(text) {
    addMessage(text, true);
  }
  
  function addBotMessage(text) {
    addMessage(text, false);
  }
  
  // Get bot response
  function getBotResponse(input) {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
    }
    
    if (lowerInput.includes('service') || lowerInput.includes('offer')) {
      return responses.services[0];
    }
    
    if (lowerInput.includes('portfolio') || lowerInput.includes('work')) {
      return responses.portfolio[0];
    }
    
    if (lowerInput.includes('price') || lowerInput.includes('cost')) {
      return responses.pricing[0];
    }
    
    if (lowerInput.includes('contact') || lowerInput.includes('reach')) {
      return responses.contact[0];
    }
    
    return responses.default[Math.floor(Math.random() * responses.default.length)];
  }
}

// Statistics Counter
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
          } else {
            element.textContent = Math.floor(current);
          }
        }, 16);
        
        observer.unobserve(element);
      }
    });
  }, {
    threshold: 0.5
  });
  
  statNumbers.forEach(number => observer.observe(number));
}

// Back to Top Button
function initBackToTop() {
  const backToTop = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
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

// AI Recommendations
function initAIRecommendations() {
  const recommendBtn = document.getElementById('ai-recommend');
  
  if (!recommendBtn) return;
  
  recommendBtn.addEventListener('click', () => {
    const roomType = document.getElementById('room-type').value;
    const stylePref = document.getElementById('style-preference').value;
    
    if (!roomType || !stylePref) {
      showToast('Please select both room type and style', 'info');
      return;
    }
    
    // Show loading
    recommendBtn.innerHTML = '<span class="dots-loading"><span></span><span></span><span></span></span>';
    
    // Simulate AI processing
    setTimeout(() => {
      // Filter portfolio based on selections
      const filteredItems = document.querySelectorAll(`.portfolio-item.${roomType}`);
      
      // Update filters
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelector(`.filter-btn[data-filter="${roomType}"]`).classList.add('active');
      
      // Show filtered items
      const portfolioGrid = document.getElementById('portfolio-grid');
      const allItems = document.querySelectorAll('.portfolio-item');
      
      allItems.forEach(item => {
        item.style.display = item.classList.contains(roomType) ? 'block' : 'none';
      });
      
      // Scroll to portfolio
      document.getElementById('portfolio').scrollIntoView({
        behavior: 'smooth'
      });
      
      // Reset button
      recommendBtn.innerHTML = 'Get Recommendations';
      
      // Show message
      if (filteredItems.length > 0) {
        showToast(`Found ${filteredItems.length} projects matching your preferences!`, 'success');
      } else {
        showToast('No exact matches found. Showing similar projects.', 'info');
      }
    }, 1500);
  });
}

// WhatsApp Button Enhancement
function initWhatsAppButton() {
  const whatsappButtons = document.querySelectorAll('[href*="whatsapp"]');
  
  whatsappButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Don't intercept if it's already a WhatsApp link
      if (this.href.includes('wa.me')) return;
      
      e.preventDefault();
      
      const message = `Hello Deexcellentcrib! I'm interested in your interior design services.`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappURL = `https://wa.me/2348156792070?text=${encodedMessage}`;
      
      window.open(whatsappURL, '_blank');
    });
  });
}

// Parallax Effects
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll('.parallax-element');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const rate = element.getAttribute('data-rate') || 0.5;
      element.style.transform = `translateY(${scrolled * rate}px)`;
    });
  });
}

// Utility Functions
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// Lazy Loading Images
function initLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Initialize on window load
window.addEventListener('load', () => {
  initLazyLoading();
  
  // Add loaded class to body for final transitions
  document.body.classList.add('loaded');
});