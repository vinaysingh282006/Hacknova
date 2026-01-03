
        document.addEventListener('DOMContentLoaded', () => {
            const slider = document.getElementById('light-intensity-slider');
            const valueDisplay = document.getElementById('light-intensity-value');
            
            slider?.addEventListener('input', (e) => {
                const value = e.target.value;
                const level = value < 30 ? 'Low' : value < 70 ? 'Medium' : 'High';
                valueDisplay.textContent = `${level} (${value}%)`;
                window.lightScene?.updateLightIntensity(value);
            });
        });
    
;(() => {
  const scrollButton = document.getElementById("scroll-to-top")

  if (!scrollButton) return

  // Show/hide button based on scroll position
  function toggleScrollButton() {
    if (window.scrollY > 300) {
      scrollButton.classList.add("visible")
    } else {
      scrollButton.classList.remove("visible")
    }
  }

  // Smooth scroll to top
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Event listeners
  window.addEventListener("scroll", toggleScrollButton, { passive: true })
  scrollButton.addEventListener("click", scrollToTop)

  // Initial check
  toggleScrollButton()
})()
 document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  });




        document.addEventListener('DOMContentLoaded', () => {
            // Slider Interaction Logic
            const slider = document.getElementById('light-intensity-slider');
            const valueDisplay = document.getElementById('light-intensity-value');
            
            if(slider && valueDisplay) {
                slider.addEventListener('input', (e) => {
                    const value = e.target.value;
                    const level = value < 30 ? 'Low' : value < 70 ? 'Medium' : 'High';
                    valueDisplay.textContent = `${level} (${value}%)`;
                    
                    // Dynamic color changing
                    if(value < 30) {
                        valueDisplay.className = "text-eco-green font-bold font-mono bg-gray-800 px-2 py-0.5 rounded";
                    } else if(value < 70) {
                        valueDisplay.className = "text-eco-orange font-bold font-mono bg-gray-800 px-2 py-0.5 rounded";
                    } else {
                        valueDisplay.className = "text-eco-red font-bold font-mono bg-gray-800 px-2 py-0.5 rounded";
                    }
                    
                    if(window.lightScene && typeof window.lightScene.updateLightIntensity === 'function') {
                        window.lightScene.updateLightIntensity(value);
                    }
                });
            }

            // Mobile Menu Logic
            const menuBtn = document.getElementById("mobile-menu-btn");
            const mobileMenu = document.getElementById("mobile-menu");
            if (menuBtn && mobileMenu) {
                menuBtn.addEventListener("click", () => {
                    mobileMenu.classList.toggle("hidden");
                });
            }
        });

        // Scroll To Top Logic
        (() => {
            const scrollButton = document.getElementById("scroll-to-top")
            if (!scrollButton) return

            function toggleScrollButton() {
                if (window.scrollY > 300) {
                    scrollButton.classList.remove("opacity-0", "invisible", "translate-y-4")
                } else {
                    scrollButton.classList.add("opacity-0", "invisible", "translate-y-4")
                }
            }

            function scrollToTop() {
                window.scrollTo({ top: 0, behavior: "smooth" })
            }

            window.addEventListener("scroll", toggleScrollButton, { passive: true })
            scrollButton.addEventListener("click", scrollToTop)
            toggleScrollButton()
        })()

const dots = document.querySelectorAll(".cursor-dot-light");

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