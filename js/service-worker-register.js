// Centralized Service Worker Registration
// This file should be included once across all HTML pages

(function() {
    // Check if service workers are supported
    if ('serviceWorker' in navigator) {
        // Wait for the page to load before registering
        window.addEventListener('load', function() {
            // Register the service worker
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('✅ Service Worker registered successfully with scope:', registration.scope);
                    
                    // Check for updates
                    registration.addEventListener('updatefound', function() {
                        const newWorker = registration.installing;
                        console.log('🔄 Service Worker update found:', newWorker);
                        
                        newWorker.addEventListener('statechange', function() {
                            console.log('🔄 Service Worker state changed to:', newWorker.state);
                            
                            // If the new service worker is installed and waiting, show update notification
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                console.log('📦 New content is available. Please refresh.');
                                
                                // Optional: Show a notification to the user
                                showUpdateNotification();
                            }
                        });
                    });
                })
                .catch(function(error) {
                    console.error('❌ Service Worker registration failed:', error);
                });
            
            // Listen for controller change (when a new service worker takes over)
            navigator.serviceWorker.addEventListener('controllerchange', function() {
                console.log('🔄 Service Worker controller changed. Page will reload.');
                // Optionally reload the page to get new content
                // window.location.reload();
            });
        });
        
        // Check if there's an update on page visibility change
        document.addEventListener('visibilitychange', function() {
            if (document.visibilityState === 'visible' && navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({ type: 'CHECK_FOR_UPDATES' });
            }
        });
    } else {
        console.warn('⚠️ Service Workers are not supported in this browser');
    }
    
    // Optional: Show a notification when a new version is available
    function showUpdateNotification() {
        // Create notification element if it doesn't exist
        let notification = document.getElementById('sw-update-notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'sw-update-notification';
            notification.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #10B981;
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 9999;
                font-family: Arial, sans-serif;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 10px;
                animation: slideIn 0.3s ease;
            `;
            
            notification.innerHTML = `
                <span>🚀 New version available!</span>
                <button onclick="updateServiceWorker()" style="
                    background: white;
                    color: #10B981;
                    border: none;
                    padding: 6px 12px;
                    border-radius: 4px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                ">Refresh</button>
            `;
            
            document.body.appendChild(notification);
            
            // Add animation styles
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
            
            // Auto-hide after 10 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.style.animation = 'slideIn 0.3s reverse';
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.parentNode.removeChild(notification);
                        }
                    }, 300);
                }
            }, 10000);
        }
    }
    
    // Global function to update service worker
    window.updateServiceWorker = function() {
        if (navigator.serviceWorker && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
            
            // Remove notification
            const notification = document.getElementById('sw-update-notification');
            if (notification && notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            
            // Reload to get new content
            window.location.reload();
        }
    };
})();