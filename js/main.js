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

const dots = document.querySelectorAll(".cursor-dot");

const historyLength = dots.length;
const mouseHistory = Array.from({ length: historyLength }, () => ({
  x: 0,
  y: 0,
}));

let mouseX = 0;
let mouseY = 0;

// Current visual positions (for smoothing)
const visualPositions = Array.from({ length: historyLength }, () => ({
  x: 0,
  y: 0,
}));

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursorTrail() {
  // Add current mouse position to history
  mouseHistory.unshift({ x: mouseX, y: mouseY });
  mouseHistory.pop();

  dots.forEach((dot, index) => {
    const target = mouseHistory[index];
    const current = visualPositions[index];

    // Smooth easing (THIS controls speed)
    current.x += (target.x - current.x) * 0.18;
    current.y += (target.y - current.y) * 0.18;

    dot.style.left = current.x + "px";
    dot.style.top = current.y + "px";
  });

  requestAnimationFrame(animateCursorTrail);
}

animateCursorTrail();