// Mobile menu toggle functionality
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

// Toggle mobile menu
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking a link (for mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navToggle.contains(e.target) && 
            !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Account for fixed header
            const headerOffset = 85;
            const elementPosition = targetElement.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced scroll animations using Intersection Observer API
const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation class when element is in view
            entry.target.classList.add('animate');
            
            // Unobserve to prevent re-triggering
            observer.unobserve(entry.target);
        }
    });
};

// Create observer for timeline items
const timelineObserver = new IntersectionObserver(animateOnScroll, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    timelineObserver.observe(item);
});

// Create observer for project cards
const projectObserver = new IntersectionObserver(animateOnScroll, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    projectObserver.observe(card);
});

// Create observer for skill categories
const skillObserver = new IntersectionObserver(animateOnScroll, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe skill categories
document.querySelectorAll('.skill-category').forEach(category => {
    skillObserver.observe(category);
});

// Enhanced scroll-to-top button
const scrollToTopButton = document.getElementById('scrollToTopBtn');

// Create scroll to top button if it doesn't exist
if (!scrollToTopButton) {
    const newButton = document.createElement('button');
    newButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    newButton.setAttribute('id', 'scrollToTopBtn');
    newButton.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(newButton);
}

// Show/hide scroll to top button based on scroll position
window.addEventListener('scroll', () => {
    const scrollTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollTopBtn) {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }
});

// Scroll to top functionality
document.addEventListener('click', (e) => {
    if (e.target.id === 'scrollToTopBtn' || e.target.closest('#scrollToTopBtn')) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// Dynamic year in footer
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const footer = document.querySelector('footer p');
    if (footer) {
        footer.innerHTML = `&copy; ${currentYear} Mark Lester J. Real. All rights reserved.`;
    }
});

// Enhanced parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        // More subtle parallax effect
        hero.style.backgroundPositionY = `${scrollPosition * 0.3}px`;
    }
});

// Improved scroll animations for all sections
const scrollElements = document.querySelectorAll(
    '.about-content, .bio-content, .skill-category, .project-card, .contact-info, .timeline-item'
);

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElement = (element) => {
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
};

const hideScrollElement = (element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
};

// Initialize scroll elements
const initScrollElements = () => {
    scrollElements.forEach((el) => {
        // Set initial state
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        hideScrollElement(el);
    });
};

// Handle scroll animations
const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        }
    });
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initScrollElements();
    handleScrollAnimation();
});

// Add scroll listener
window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Enhanced header behavior on scroll
let lastScrollPosition = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.scrollY;
    
    if (header) {
        // Add shadow when scrolled
        if (currentScrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header when scrolling down, show when scrolling up
        if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollPosition = currentScrollPosition;
    }
});

// Form validation for contact form (placeholder for future implementation)
function validateForm() {
    // This is a placeholder for future form validation
    // You can add actual validation logic here when you implement a contact form
    console.log("Form validation would happen here");
    return true;
}

// Utility function to throttle function calls
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Throttled scroll handler for better performance
const throttledScrollHandler = throttle(() => {
    handleScrollAnimation();
}, 16); // ~60fps

// Replace scroll listener with throttled version
window.removeEventListener('scroll', handleScrollAnimation);
window.addEventListener('scroll', throttledScrollHandler);

// Add keyboard accessibility to mobile menu toggle
if (navToggle) {
    navToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navToggle.click();
        }
    });
}

// Performance optimization: Use requestAnimationFrame for animations
let ticking = false;

function updateScrollAnimations() {
    handleScrollAnimation();
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateScrollAnimations);
        ticking = true;
    }
}

// Replace scroll listener with requestAnimationFrame version
window.removeEventListener('scroll', throttledScrollHandler);
window.addEventListener('scroll', requestTick);