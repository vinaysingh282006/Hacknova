document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Slider Interaction Logic ---
    const slider = document.getElementById('air-pollution-slider');
    const valueDisplay = document.getElementById('air-pollution-value');
    
    if(slider && valueDisplay) {
        slider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            
            // Determine level and color (Switched to Orange theme)
            let level = 'Good';
            let colorClass = "text-eco-green";

            if (value >= 50 && value < 100) { level = 'Moderate'; colorClass = "text-yellow-400"; }
            else if (value >= 100 && value < 150) { level = 'Unhealthy'; colorClass = "text-eco-orange"; }
            else if (value >= 150) { level = 'Hazardous'; colorClass = "text-eco-orange"; } // Kept Orange for consistency

            valueDisplay.textContent = `${level} (${value} AQI)`;
            
            // Reset classes and add new ones (keeping common styles)
            valueDisplay.className = `font-bold font-mono bg-gray-800 px-2 py-0.5 rounded ${colorClass}`;
            
            // Update 3D scene if available
            if(window.airScene && typeof window.airScene.updatePollutionLevel === 'function') {
                window.airScene.updatePollutionLevel(value);
            }
        });
    }

    // --- 2. Mobile Menu Logic ---
    const menuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // --- 3. Scroll To Top Logic ---
    const scrollButton = document.getElementById("scroll-to-top");
    
    if (scrollButton) {
        function toggleScrollButton() {
            if (window.scrollY > 300) {
                scrollButton.classList.remove("opacity-0", "invisible", "translate-y-4");
            } else {
                scrollButton.classList.add("opacity-0", "invisible", "translate-y-4");
            }
        }

        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }

        window.addEventListener("scroll", toggleScrollButton, { passive: true });
        scrollButton.addEventListener("click", scrollToTop);
        toggleScrollButton(); // Initial check
    }
});

const dots = document.querySelectorAll(".cursor-dot-air");

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