
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
 


        document.addEventListener('DOMContentLoaded', () => {
            // Slider Interaction Logic
            const slider = document.getElementById('light-intensity-slider');
            const valueDisplay = document.getElementById('light-intensity-value');
            
            if(slider && valueDisplay) {
                slider.addEventListener('input', (e) => {
                    const value = Number(e.target.value);
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
