/**
 * Shared Footer Component
 * Dynamically loads footer content across all HTML pages
 */

function loadFooter() {
    const footerHTML = `
    <footer class="bg-gray-900 border-t border-gray-800 py-12">
        <div class="container mx-auto px-4">
            <div class="grid md:grid-cols-3 gap-8 mb-8">
                <!-- About -->
                <div>
                    <h3 class="text-xl font-bold mb-4 gradient-text">About EcoPulse</h3>
                    <p class="text-gray-400 mb-4">
                        Environmental awareness through interactive 3D data visualization. Built for Hackathon 2024.
                    </p>
                </div>

                <!-- Quick Links -->
                <div>
                    <h3 class="text-xl font-bold mb-4">Quick Links</h3>
                    <ul class="space-y-2">
                        <li><a href="air.html" class="text-gray-400 hover:text-eco-blue transition-colors">Air
                                Pollution</a></li>
                        <li><a href="water.html" class="text-gray-400 hover:text-eco-blue transition-colors">Water
                                Pollution</a></li>
                        <li><a href="light.html" class="text-gray-400 hover:text-eco-blue transition-colors">Light
                                Pollution</a></li>
                        <li><a href="noise.html" class="text-gray-400 hover:text-eco-purple transition-colors">Noise
                                Pollution</a></li>
                        <li><a href="ai-prediction.html"
                                class="text-gray-400 hover:text-purple-400 transition-colors">AI Prediction</a></li>
                        <li><a href="presentation.html"
                                class="text-gray-400 hover:text-eco-blue transition-colors">Presentation</a></li>
                    </ul>
                </div>

                <!-- Credits -->
                <div>
                    <h3 class="text-xl font-bold mb-4">Technology</h3>
                    <ul class="space-y-2 text-gray-400">
                        <li>Three.js for 3D Graphics</li>
                        <li>Chart.js for Data Viz</li>
                        <li>TensorFlow.js for AI</li>
                        <li>Tailwind CSS Styling</li>
                        <li>Vanilla JavaScript</li>
                    </ul>
                </div>
            </div>

            <div class="border-t border-gray-800 pt-8 text-center text-gray-400">
                <p>&copy; <span id="current-year"></span> EcoPulse. Built with ❤️ for environmental awareness.</p>
                <p class="mt-2 text-sm">Hackathon • Environmental Data Initiative</p>
            </div>
        </div>
    </footer>`;

    // Insert footer before closing body tag or after main content
    const main = document.querySelector('main');
    if (main) {
        main.insertAdjacentHTML('afterend', footerHTML);
    } else {
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }

    // Set the current year dynamically
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Load footer when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
} else {
    loadFooter();
}
