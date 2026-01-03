/**
 * noise.js
 * Handles interactions for the Noise Pollution page:
 * - Decibel slider with debouncing
 * - 3D scene updates
 * - UI feedback (haptics, descriptions)
 * - Mobile navigation and scroll controls
 */

document.addEventListener('DOMContentLoaded', () => {
    initNoiseControls();
    initMobileMenu();
    initScrollToTop();
});

function initNoiseControls() {
    const slider = document.getElementById('noise-level-slider');
    const valueDisplay = document.getElementById('noise-level-value');
    
    if (!slider || !valueDisplay) return;

    // Helper: Get descriptive label based on decibel level
    function getNoiseDescription(db) {
        if (db < 30) return 'Very Quiet';
        if (db < 50) return 'Quiet';
        if (db < 70) return 'Moderate';
        if (db < 85) return 'Loud';
        if (db < 100) return 'Very Loud';
        return 'Harmful';
    }

    // Helper: Debounce to prevent excessive 3D scene updates
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }

    // Debounced function to update the 3D scene (assumes window.noiseScene exists)
    const updateScene = debounce((value) => {
        if (window.noiseScene && typeof window.noiseScene.setDecibelLevel === 'function') {
            window.noiseScene.setDecibelLevel(value);
        }
    }, 50);

    // Main update function
    const updateUI = (value) => {
        const description = getNoiseDescription(value);
        
        // Update text display
        valueDisplay.textContent = `${value} dB (${description})`;
        
        // Update slider accessibility attributes
        slider.setAttribute('aria-valuenow', value);
        slider.setAttribute('aria-valuetext', `${value} decibels, ${description}`);

        // Visual feedback on the slider value color
        if (value < 50) {
            valueDisplay.className = "text-eco-green font-bold font-mono bg-gray-800 px-2 py-0.5 rounded";
        } else if (value < 85) {
            valueDisplay.className = "text-eco-purple font-bold font-mono bg-gray-800 px-2 py-0.5 rounded";
        } else {
            valueDisplay.className = "text-eco-red font-bold font-mono bg-gray-800 px-2 py-0.5 rounded";
        }

        // Haptic feedback (if supported) at meaningful thresholds
        if (navigator.vibrate && value % 10 === 0) {
            navigator.vibrate(5);
        }
    };

    // Event Listener: Input (Real-time UI update + Debounced Scene update)
    slider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        updateUI(value);
        updateScene(value);
    });

    // Event Listener: Mobile Touch Feedback
    slider.addEventListener('touchstart', () => {
        slider.style.transform = 'scale(1.02)';
        slider.style.transition = 'transform 0.1s ease';
    }, { passive: true });
    
    slider.addEventListener('touchend', () => {
        slider.style.transform = 'scale(1)';
    }, { passive: true });
}

function initMobileMenu() {
    const menuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
        // Optional: Animate menu icon or change state
    });
}

function initScrollToTop() {
    const scrollButton = document.getElementById("scroll-to-top");
    if (!scrollButton) return;

    function toggleScrollButton() {
        if (window.scrollY > 300) {
            scrollButton.classList.remove("opacity-0", "invisible", "translate-y-4");
        } else {
            scrollButton.classList.add("opacity-0", "invisible", "translate-y-4");
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    window.addEventListener("scroll", toggleScrollButton, { passive: true });
    scrollButton.addEventListener("click", scrollToTop);
    
    // Initial check in case page is reloaded halfway down
    toggleScrollButton();
}

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