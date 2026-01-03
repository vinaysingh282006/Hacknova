document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Animate Progress Bars on Load ---
    // This gives the "Data loading" effect
    setTimeout(() => {
        document.getElementById('bar-nitrogen').style.width = '85%';
        document.getElementById('bar-moisture').style.width = '32%';
        document.getElementById('bar-metals').style.width = '15%';
    }, 500);

    // --- 2. Slider Interaction Logic ---
    const slider = document.getElementById('soil-pollution-slider');
    const valueDisplay = document.getElementById('soil-pollution-value');
    
    if(slider && valueDisplay) {
        slider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            
            // Determine level and color
            let level = 'Balanced';
            let colorClass = "text-eco-green";

            if (value >= 40 && value < 70) { level = 'Stressed'; colorClass = "text-yellow-400"; }
            else if (value >= 70 && value < 90) { level = 'Heavy'; colorClass = "text-eco-brown"; }
            else if (value >= 90) { level = 'Toxic'; colorClass = "text-eco-red"; }

            valueDisplay.textContent = `${level} (${value}%)`;
            valueDisplay.className = `font-bold font-mono bg-gray-800 px-2 py-0.5 rounded ${colorClass}`;

            // Optional: Update progress bars based on slider for interactivity
            document.getElementById('bar-nitrogen').style.width = `${value}%`;
            document.getElementById('bar-moisture').style.width = `${100 - value}%`; // Inverse relationship
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