document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Slider Interaction Logic ---
    const slider = document.getElementById('air-pollution-slider');
    const valueDisplay = document.getElementById('air-pollution-value');

    // Selectors for sidebar enhancements
    const sidebarCard = document.getElementById('aqi-sidebar-card');
    const sidebarNum = document.getElementById('sidebar-aqi-num');
    const sidebarLabel = document.getElementById('sidebar-aqi-label');

    // FUNCTION TO DRAW THE SPARKLINE
    function drawSparkline(canvasId, dataPoints) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';

        const step = width / (dataPoints.length - 1);
        const max = 300; // AQI Scale

        dataPoints.forEach((val, i) => {
            const x = i * step;
            const y = height - (val / max) * height;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();
    }

    if (slider && valueDisplay) {
        slider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            // Determine level and color
            let level = 'Good';
            let colorClass = "text-eco-green";
            let statusClass = "aqi-status-good";

            if (value > 50 && value <= 100) {
                level = 'Moderate';
                colorClass = "text-yellow-400";
                statusClass = "aqi-status-moderate";
            }
            else if (value > 100 && value <= 200) {
                level = 'Unhealthy';
                colorClass = "text-eco-orange";
                statusClass = "aqi-status-unhealthy";
            }
            else if (value > 200) {
                level = 'Hazardous';
                colorClass = "text-eco-purple";
                statusClass = "aqi-status-hazardous";
            }

            valueDisplay.textContent = `${level} (${value} AQI)`;
            valueDisplay.className = `font-bold font-mono bg-gray-800 px-2 py-0.5 rounded ${colorClass}`;

            // SYNC SIDEBAR METRIC CARD
            if (sidebarCard) sidebarCard.className = `bg-gray-800/50 p-4 rounded-xl border border-gray-700 transition-all ${statusClass}`;
            if (sidebarNum) sidebarNum.textContent = value;
            if (sidebarLabel) sidebarLabel.textContent = level;

            // UPDATE TREND GRAPH
            drawSparkline('aqi-sparkline', [140, 145, 130, 155, 160, value]);

            // Update 3D scene if available
            if (window.airScene && typeof window.airScene.updatePollutionLevel === 'function') {
                window.airScene.updatePollutionLevel(value);
            }
        });
    }

    // Initial load trend
    drawSparkline('aqi-sparkline', [140, 145, 130, 155, 160, 156]);

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