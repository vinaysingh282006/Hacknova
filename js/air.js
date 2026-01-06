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

    // --- 2. Air Quality Health Impact Animation ---
    const healthItems = document.querySelectorAll('.group.flex.items-center.justify-between');
    healthItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('shadow-lg', 'scale-[1.02]');
        });
        
        item.addEventListener('mouseleave', () => {
            item.classList.remove('shadow-lg', 'scale-[1.02]');
        });
    });

    // --- 3. Air Quality Metrics Animation ---
    const metricCards = document.querySelectorAll('.bg-gray-800\/50.p-4.rounded-xl');
    if (metricCards.length > 0) {
        // Animate metrics on page load
        setTimeout(() => {
            metricCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 300 * index);
            });
        }, 500);
    }
});