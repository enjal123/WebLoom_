// Enhanced Scroll Reveal Animation with Intersection Observer
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Add staggered animation for child elements
            const children = entry.target.querySelectorAll('.service-card, .portfolio-item, .pricing-card');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Mobile Menu with enhanced animations
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Enhanced Smooth Scroll with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const targetPosition = target.offsetTop - 80; // Account for fixed navbar
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let start = null;

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            function easeInOutCubic(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t + b;
                t -= 2;
                return c / 2 * (t * t * t + 2) + b;
            }

            requestAnimationFrame(animation);
        }
    });
});

// Enhanced Navbar Scroll Effect with parallax
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;
let scrollTimeout;
let ticking = false;

function updateNavbar() {
    const scrollTop = window.pageYOffset;
    const heroHeight = document.querySelector('.hero').offsetHeight;
    
    // Add background blur when scrolled past hero
    if (scrollTop > heroHeight * 0.5) {
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
    
    // Show navbar after scrolling stops
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        navbar.classList.remove('hidden');
    }, 150);
});

// Enhanced Parallax Effect for Hero Shapes
const shapes = document.querySelectorAll('.shape');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
});

function updateParallax() {
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.02;
        const x = (mouseX - 0.5) * 100 * speed;
        const y = (mouseY - 0.5) * 100 * speed;
        
        shape.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.1}deg)`;
    });
    
    requestAnimationFrame(updateParallax);
}

updateParallax();

// Enhanced Form Handling with better UX
function handleFormSubmission(formId, thankYouId) {
    const form = document.getElementById(formId);
    const thankYou = document.getElementById(thankYouId);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    if (!form || !thankYou) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        
        // Add loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        submitButton.setAttribute('aria-busy', 'true');
        submitButton.style.background = 'var(--text-secondary)';
        
        // Add subtle animation to form
        form.style.transform = 'scale(0.98)';
        form.style.transition = 'transform 0.2s ease';

        const formData = new FormData(form);
        formData.append('_timestamp', new Date().getTime());

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

    if (response.ok || response.status === 302) {
    // treat success even if FormSubmit redirects
        form.style.transform = 'scale(1)';
        form.reset();
        thankYou.style.display = "block";
        setTimeout(() => {
            thankYou.classList.add('show');
        }, 10);
        setTimeout(() => {
            thankYou.classList.remove('show');
            setTimeout(() => {
                thankYou.style.display = "none";
            }, 300);
        }, 5000);
    } else {
        throw new Error('Submission failed');
    }


            if (isSuccess) {
                // Success animation
                form.style.transform = 'scale(1)';
                form.reset();
                thankYou.style.display = "block";
                setTimeout(() => {
                    thankYou.classList.add('show');
                }, 10);
                setTimeout(() => {
                    thankYou.classList.remove('show');
                    setTimeout(() => {
                        thankYou.style.display = "none";
                    }, 300);
                }, 5000);
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            showNotification("Something went wrong. Please try again.", "error");
            form.style.transform = 'scale(1)';
        } finally {
            // Reset button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            submitButton.setAttribute('aria-busy', 'false');
            submitButton.style.background = '';
        }
    });
}

// Enhanced Notification System
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 1.2rem;">${type === 'success' ? '✓' : '⚠'}</span>
            <span>${message}</span>
        </div>
    `;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius-sm);
        color: white;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: var(--shadow-lg);
        background: ${type === 'success' ? 'var(--accent-gradient)' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'};
        max-width: 400px;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Enhanced Pricing Card Interactions
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.boxShadow = 'var(--shadow-xl)';
    });
    
    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('selected')) {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'var(--shadow-sm)';
        }
    });
    
    card.addEventListener('click', () => {
        // Remove selected class from all cards
        pricingCards.forEach(c => {
            c.classList.remove('selected');
            c.style.transform = 'translateY(0) scale(1)';
            c.style.boxShadow = 'var(--shadow-sm)';
        });
        
        // Add selected class to clicked card
        card.classList.add('selected');
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.boxShadow = 'var(--shadow-xl)';
    });
});

// Enhanced Service Card Interactions
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.service-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        icon.style.filter = 'grayscale(0)';
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.service-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
        icon.style.filter = 'grayscale(0.3)';
    });
});

// Enhanced Portfolio Item Interactions
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const overlay = item.querySelector('.portfolio-overlay');
        const img = item.querySelector('img');
        
        img.style.transform = 'scale(1.05)';
        overlay.style.transform = 'translateY(0)';
    });
    
    item.addEventListener('mouseleave', () => {
        const overlay = item.querySelector('.portfolio-overlay');
        const img = item.querySelector('img');
        
        img.style.transform = 'scale(1)';
        overlay.style.transform = 'translateY(100%)';
    });
});

// Initialize form handlers
handleFormSubmission("contactForm", "contactThankYou");
handleFormSubmission("projectForm", "projectThankYou");

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        // Fallback for already loaded images
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});

// Add scroll-triggered animations for better performance
let scrollAnimations = [];

function addScrollAnimation(element, animation) {
    scrollAnimations.push({ element, animation });
}

// Initialize scroll animations
window.addEventListener('scroll', () => {
    scrollAnimations.forEach(({ element, animation }) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            animation();
        }
    });
});

// Performance optimization: Throttle scroll events
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations here
}, 16)); // ~60fps
