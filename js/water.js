/**
 * Water Pollution Page Logic
 * Handles: Animations, Mobile Menu, Scroll Button, and Slider Interaction
 */

document.addEventListener('DOMContentLoaded', () => {

    /* 1. Mobile Menu Toggle */
    const menuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    /* 2. Scroll-to-Top Logic & View Simulation Button */
    const scrollToTopBtn = document.getElementById("scroll-to-top");
    const viewSimBtn = document.getElementById("view-simulation-btn");
    const simSection = document.getElementById("simulation-section");

    // Scroll to simulation section
    if (viewSimBtn && simSection) {
        viewSimBtn.addEventListener("click", () => {
            simSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Scroll to top button visibility & click
    if (scrollToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add("visible");
            } else {
                scrollToTopBtn.classList.remove("visible");
            }
        });

        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* 3. Scroll Reveal Animations (Intersection Observer) */
    const reveals = document.querySelectorAll(".scroll-reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(el => revealObserver.observe(el));

    /* 4. Water Contamination Slider Logic */
    const slider = document.getElementById('water-contamination-slider');
    const valueDisplay = document.getElementById('water-contamination-value');

    // Debounce to prevent freezing during rapid sliding
    let updateTimeout;
    function debounce(func, wait) {
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(updateTimeout);
                func(...args);
            };
            clearTimeout(updateTimeout);
            updateTimeout = setTimeout(later, wait);
        };
    }

    if (slider && valueDisplay) {
        // Debounced update function for 3D scene
        const debouncedUpdate = debounce((value) => {
             if (window.waterScene && typeof window.waterScene.updateContaminationLevel === 'function') {
                window.waterScene.updateContaminationLevel(value);
            }
        }, 50);

        slider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            
            // Update Text Immediately
            let level = 'Low';
            if (val >= 30) level = 'Medium';
            if (val >= 70) level = 'High';
            valueDisplay.textContent = `${level} (${val}%)`;
            
            // Update ARIA attributes for accessibility
            slider.setAttribute('aria-valuenow', val);
            slider.setAttribute('aria-valuetext', `${val}% contamination level - ${level}`);

            // Trigger Debounced 3D Update
            debouncedUpdate(val);
        });
        
        // Initialize ARIA attributes
        const initialValue = parseInt(slider.value);
        let initialLevel = 'Low';
        if (initialValue >= 30) initialLevel = 'Medium';
        if (initialValue >= 70) initialLevel = 'High';
        slider.setAttribute('aria-valuenow', initialValue);
        slider.setAttribute('aria-valuetext', `${initialValue}% contamination level - ${initialLevel}`);
        slider.setAttribute('aria-label', 'Water contamination level');
    }
});

const dots = document.querySelectorAll(".cursor-dot-water");

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