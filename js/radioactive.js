document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Animation Logic for Decay Bars ---
    // Simulating "danger levels" or "decay time remaining"
    setTimeout(() => {
        // Cesium: ~30% width
        document.getElementById('bar-cesium').style.width = '30%';
        // Strontium: ~29% width
        document.getElementById('bar-strontium').style.width = '29%';
        // Plutonium: High persistence
        document.getElementById('bar-plutonium').style.width = '90%';
        // Uranium: Extreme persistence
        document.getElementById('bar-uranium').style.width = '98%'; 
    }, 500);

    // --- 2. Slider Logic (Radiation Dose) ---
    const slider = document.getElementById('rad-slider');
    const valueDisplay = document.getElementById('rad-slider-value');
    
    if(slider && valueDisplay) {
        slider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            
            let label = 'Safe';
            let colorClass = "text-eco-green";

            // Thresholds roughly based on mSv (just for visualization)
            if (value < 10) { 
                label = 'Background'; 
                colorClass = "text-eco-green";
            } else if (value >= 10 && value < 50) { 
                label = 'Caution'; 
                colorClass = "text-yellow-400";
            } else if (value >= 50 && value < 80) { 
                label = 'Danger'; 
                colorClass = "text-eco-lime";
            } else { 
                label = 'Critical'; 
                colorClass = "text-red-500";
            }

            valueDisplay.textContent = `${label} (${value} mSv)`;
            valueDisplay.className = `font-bold font-mono bg-gray-800 px-2 py-0.5 rounded ${colorClass}`;
        });
    }

    // --- 3. Mobile Menu Logic ---
    const menuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
        
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // --- 4. Scroll To Top Logic ---
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
        toggleScrollButton(); 
    }
});