// EcoPulse Core Utilities
// Contains centralized functionality for all pages

// Function to initialize page-specific features
window.EcoPulse = window.EcoPulse || {};

// Initialize year in footer
EcoPulse.initYearFooter = () => {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
};

// Initialize accessibility features
EcoPulse.initAccessibility = () => {
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Initialize ARIA attributes for sliders
    const sliders = document.querySelectorAll('input[type="range"]');
    sliders.forEach(slider => {
        if (!slider.hasAttribute('role')) {
            slider.setAttribute('role', 'slider');
        }
        
        if (!slider.hasAttribute('aria-valuemin')) {
            slider.setAttribute('aria-valuemin', slider.min || 0);
        }
        
        if (!slider.hasAttribute('aria-valuemax')) {
            slider.setAttribute('aria-valuemax', slider.max || 100);
        }
        
        if (!slider.hasAttribute('aria-valuenow')) {
            slider.setAttribute('aria-valuenow', slider.value);
        }
        
        if (!slider.hasAttribute('aria-label')) {
            slider.setAttribute('aria-label', 'Adjust value');
        }
    });
};

// Initialize all core utilities
document.addEventListener("DOMContentLoaded", () => {
    // Initialize year in footer
    EcoPulse.initYearFooter();
    
    // Initialize accessibility features
    EcoPulse.initAccessibility();
    
    // Initialize mobile menu if it exists
    if (typeof EcoPulse.initMobileMenu === 'function') {
        EcoPulse.initMobileMenu();
    }
    
    // Initialize scroll to top if it exists
    if (typeof EcoPulse.initScrollToTop === 'function') {
        EcoPulse.initScrollToTop();
    }
    
    // Initialize scroll reveal if it exists
    if (typeof EcoPulse.initScrollReveal === 'function') {
        EcoPulse.initScrollReveal();
    }
});