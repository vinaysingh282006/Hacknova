document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Animation Logic ---
    // Animate the bars based on years (Percentage logic roughly scaled to 600 years)
    setTimeout(() => {
        // Bottle: 450 years (~75%)
        document.getElementById('bar-bottle').style.width = '75%';
        // Brush: 500 years (~83%)
        document.getElementById('bar-brush').style.width = '83%';
        // Net: 600 years (100%)
        document.getElementById('bar-net').style.width = '100%';
        // Bag: 20 years (~3%)
        document.getElementById('bar-bag').style.width = '5%'; 
    }, 500);

    // --- 2. Slider Logic ---
    const slider = document.getElementById('plastic-slider');
    const valueDisplay = document.getElementById('plastic-slider-value');
    
    if(slider && valueDisplay) {
        slider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            
            let label = 'Current';
            let colorClass = "text-eco-red"; // Low recycling is bad (red)

            if (value < 20) { 
                label = 'Poor'; 
                colorClass = "text-eco-red";
            } else if (value >= 20 && value < 50) { 
                label = 'Improving'; 
                colorClass = "text-yellow-400";
            } else if (value >= 50 && value < 80) { 
                label = 'Sustainable'; 
                colorClass = "text-eco-cyan";
            } else { 
                label = 'Circular'; 
                colorClass = "text-eco-green";
            }

            valueDisplay.textContent = `${label} (${value}%)`;
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
        
        // Close when clicking outside
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
        toggleScrollButton(); // Initial check
    }
});