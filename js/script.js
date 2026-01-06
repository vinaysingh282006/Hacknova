// ===============================
// EcoPulse Main JavaScript
// ===============================

// Global EcoPulse namespace
window.EcoPulse = window.EcoPulse || {};

// Accessibility utilities
EcoPulse.AccessibilityManager = {
  init: function() {
    this.setupSkipLinks();
    this.setupFocusManagement();
    this.setupReducedMotion();
    this.setupHighContrast();
  },
  
  // Setup skip navigation links
  setupSkipLinks: function() {
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  },
  
  // Setup focus management for keyboard navigation
  setupFocusManagement: function() {
    // Add focus indicators to interactive elements
    const interactiveElements = [
      'a', 'button', 'input', 'select', 'textarea', 
      '[tabindex]', '[role="button"]', '[role="link"]'
    ];
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });
    
    document.addEventListener('mousedown', function() {
      document.body.classList.remove('keyboard-navigation');
    });
    
    // Add focus classes to elements
    document.addEventListener('focusin', function(e) {
      const target = e.target;
      if (target.classList.contains('btn') || target.tagName === 'BUTTON' || 
          target.tagName === 'A' || target.tagName === 'INPUT') {
        target.classList.add('focus-outline');
      }
    });
    
    document.addEventListener('focusout', function(e) {
      e.target.classList.remove('focus-outline');
    });
  },
  
  // Handle reduced motion preferences
  setupReducedMotion: function() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleReducedMotion = (e) => {
      if (e.matches) {
        document.body.classList.add('reduce-motion');
      } else {
        document.body.classList.remove('reduce-motion');
      }
    };
    
    mediaQuery.addListener(handleReducedMotion);
    handleReducedMotion(mediaQuery);
  },
  
  // Handle high contrast preferences
  setupHighContrast: function() {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    const handleHighContrast = (e) => {
      if (e.matches) {
        document.body.classList.add('high-contrast');
      } else {
        document.body.classList.remove('high-contrast');
      }
    };
    
    mediaQuery.addListener(handleHighContrast);
    handleHighContrast(mediaQuery);
  }
};

// Keyboard navigation manager
EcoPulse.KeyboardNavigation = {
  init: function() {
    this.setupSliderNavigation();
    this.setupModalNavigation();
    this.setupMenuNavigation();
  },
  
  // Enhanced keyboard navigation for sliders
  setupSliderNavigation: function() {
    const sliders = document.querySelectorAll('input[type="range"]');
    
    sliders.forEach(slider => {
      slider.addEventListener('keydown', function(e) {
        // Allow arrow keys to adjust slider
        if ([37, 38, 39, 40].includes(e.keyCode)) { // Arrow keys
          e.preventDefault();
          
          const step = parseFloat(this.step) || 1;
          let value = parseFloat(this.value);
          
          switch(e.keyCode) {
            case 37: // Left arrow
            case 40: // Down arrow
              value = Math.max(this.min, value - step);
              break;
            case 38: // Up arrow
            case 39: // Right arrow
              value = Math.min(this.max, value + step);
              break;
          }
          
          this.value = value;
          
          // Trigger input event for visual updates
          this.dispatchEvent(new Event('input', { bubbles: true }));
        }
      });
    });
  },
  
  // Enhanced keyboard navigation for modal-like elements
  setupModalNavigation: function() {
    // Handle tab trapping for modals if they exist
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        // Close any open modals/menus
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          const menuBtn = document.getElementById('mobile-menu-btn');
          if (menuBtn) menuBtn.focus();
        }
      }
    });
  },
  
  // Enhanced keyboard navigation for menus
  setupMenuNavigation: function() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          mobileMenu.classList.toggle('hidden');
          
          if (!mobileMenu.classList.contains('hidden')) {
            // Focus first menu item when menu opens
            const firstItem = mobileMenu.querySelector('a');
            if (firstItem) firstItem.focus();
          }
        }
      });
      
      // Add keyboard navigation to menu items
      const menuItems = mobileMenu.querySelectorAll('a');
      menuItems.forEach((item, index) => {
        item.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') {
            mobileMenu.classList.add('hidden');
            menuBtn.focus();
          } else if (e.key === 'Tab') {
            if (!e.shiftKey && index === menuItems.length - 1) {
              // If on last item and tabbing forward, go to first
              e.preventDefault();
              menuItems[0].focus();
            } else if (e.shiftKey && index === 0) {
              // If on first item and shift+tabbing, go to last
              e.preventDefault();
              menuItems[menuItems.length - 1].focus();
            }
          }
        });
      });
    }
  }
};

// Mobile menu functionality - centralized to prevent duplicate event listeners
EcoPulse.initMobileMenu = () => {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    // Remove existing event listeners to prevent duplication
    const newBtn = menuBtn.cloneNode(true);
    menuBtn.parentNode.replaceChild(newBtn, menuBtn);
    
    const updatedMenuBtn = document.getElementById("mobile-menu-btn");
    
    updatedMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle("hidden");
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!updatedMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
      }
    });
  }
};

// Scroll to top functionality
EcoPulse.initScrollToTop = () => {
  const scrollToTopBtn = document.getElementById("scroll-to-top");

  if (scrollToTopBtn) {
    const toggleScrollButton = () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.remove("opacity-0", "invisible", "translate-y-4");
      } else {
        scrollToTopBtn.classList.add("opacity-0", "invisible", "translate-y-4");
      }
    };

    window.addEventListener("scroll", toggleScrollButton, { passive: true });

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    toggleScrollButton();
  }
};

// Scroll indicator functionality
EcoPulse.initScrollIndicator = () => {
  const scrollIndicator = document.getElementById("scroll-indicator");

  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const nextSection = document.querySelector(
        "section.hero-section + section"
      );

      if (nextSection) {
        nextSection.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  }
};

// Scroll reveal animation system
EcoPulse.initScrollReveal = () => {
  const reveals = document.querySelectorAll(".scroll-reveal");

  if (reveals.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15
      }
    );

    reveals.forEach(el => revealObserver.observe(el));
  }
};

// Dashboard functionality
EcoPulse.DashboardManager = {
  init: function() {
    this.setupDashboardControls();
    this.setupChartTimeButtons();
    this.showLoadingIndicators();
    this.updateDashboardData();
    this.startDataUpdates();
    this.initPollutionChart();
    this.initLoadingAnimation();
  },
  
  setupDashboardControls: function() {
    const modeButtons = document.querySelectorAll('.dashboard-mode-btn');
    modeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        modeButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // In a real implementation, this would filter the dashboard content
        // For now, we'll just add a visual effect
        const cards = document.querySelectorAll('.dashboard-card');
        cards.forEach(card => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        });
      });
    });
  },
  
  setupChartTimeButtons: function() {
    const timeButtons = document.querySelectorAll('.chart-time-btn');
    timeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        timeButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // In a real implementation, this would update the chart data
        // For now, we'll just update the button appearance
        this.updateChartData(e.target.id.replace('chart-', ''));
      });
    });
  },
  
  updateChartData: function(timeframe) {
    // This would fetch new data based on the selected timeframe
    // For demo purposes, we'll just show a loading effect
    const chartContainer = document.querySelector('.chart-container');
    chartContainer.style.opacity = '0.6';
    
    setTimeout(() => {
      chartContainer.style.opacity = '1';
    }, 500);
  },
  
  updateDashboardData: function() {
    // Show loading indicators
    this.showLoadingIndicators();
    
    // Simulate real-time data updates
    setTimeout(() => {
      this.updateAirQuality();
      this.updateWaterQuality();
      this.updateNoiseLevel();
      this.hideLoadingIndicators();
    }, 500); // Simulate API delay
  },
  
  updateAirQuality: function() {
    // Generate random but realistic air quality data
    const value = Math.floor(Math.random() * 50) + 20; // 20-70 range
    const airQualityValue = document.getElementById('air-quality-value');
    const airQualityBar = document.getElementById('air-quality-bar');
    const airQualityStatus = document.getElementById('air-quality-status');
    
    airQualityValue.textContent = value;
    airQualityBar.style.width = value + '%';
    
    // Update status based on value
    if (value <= 50) {
      airQualityStatus.textContent = 'Good';
      airQualityStatus.className = 'text-green-400';
    } else if (value <= 100) {
      airQualityStatus.textContent = 'Moderate';
      airQualityStatus.className = 'text-yellow-400';
    } else if (value <= 150) {
      airQualityStatus.textContent = 'Unhealthy';
      airQualityStatus.className = 'text-orange-400';
    } else {
      airQualityStatus.textContent = 'Hazardous';
      airQualityStatus.className = 'text-red-400';
    }
  },
  
  updateWaterQuality: function() {
    // Generate random but realistic water quality data
    const value = Math.floor(Math.random() * 40) + 60; // 60-100 range
    const waterQualityValue = document.getElementById('water-quality-value');
    const waterQualityBar = document.getElementById('water-quality-bar');
    const waterQualityStatus = document.getElementById('water-quality-status');
    
    waterQualityValue.textContent = value;
    waterQualityBar.style.width = value + '%';
    
    // Update status based on value
    if (value >= 90) {
      waterQualityStatus.textContent = 'Excellent';
      waterQualityStatus.className = 'text-green-400';
    } else if (value >= 70) {
      waterQualityStatus.textContent = 'Good';
      waterQualityStatus.className = 'text-lime-400';
    } else if (value >= 50) {
      waterQualityStatus.textContent = 'Fair';
      waterQualityStatus.className = 'text-yellow-400';
    } else {
      waterQualityStatus.textContent = 'Poor';
      waterQualityStatus.className = 'text-red-400';
    }
  },
  
  updateNoiseLevel: function() {
    // Generate random but realistic noise level data
    const value = Math.floor(Math.random() * 30) + 45; // 45-75 range
    const noiseLevelValue = document.getElementById('noise-level-value');
    const noiseLevelBar = document.getElementById('noise-level-bar');
    const noiseLevelStatus = document.getElementById('noise-level-status');
    
    noiseLevelValue.textContent = value;
    noiseLevelBar.style.width = value + '%';
    
    // Update status based on value
    if (value <= 55) {
      noiseLevelStatus.textContent = 'Quiet';
      noiseLevelStatus.className = 'text-green-400';
    } else if (value <= 70) {
      noiseLevelStatus.textContent = 'Moderate';
      noiseLevelStatus.className = 'text-yellow-400';
    } else if (value <= 85) {
      noiseLevelStatus.textContent = 'Loud';
      noiseLevelStatus.className = 'text-orange-400';
    } else {
      noiseLevelStatus.textContent = 'Dangerous';
      noiseLevelStatus.className = 'text-red-400';
    }
  },
  
  startDataUpdates: function() {
    // Update data every 10 seconds to simulate real-time updates
    setInterval(() => {
      this.updateDashboardData();
    }, 10000);
  },
  
  initPollutionChart: function() {
    // Initialize the pollution trend chart
    const ctx = document.getElementById('pollution-trend-chart');
    if (ctx) {
      // In a real implementation, we would use Chart.js or similar
      // For now, we'll just set up the canvas dimensions
      const container = ctx.parentElement;
      ctx.width = container.clientWidth;
      ctx.height = 300;
      
      // Draw a placeholder chart
      const canvas = ctx.getContext('2d');
      canvas.fillStyle = '#374151';
      canvas.fillRect(0, 0, ctx.width, ctx.height);
      
      // Draw a simple line chart placeholder
      canvas.strokeStyle = '#38bdf8';
      canvas.lineWidth = 3;
      canvas.beginPath();
      canvas.moveTo(0, ctx.height - 50);
      
      // Generate a simple wave pattern
      for (let i = 0; i < ctx.width; i += 20) {
        const y = ctx.height - 80 - Math.sin(i / 30) * 30 - Math.random() * 20;
        canvas.lineTo(i, y);
      }
      canvas.stroke();
      
      // Add labels
      canvas.fillStyle = '#9ca3af';
      canvas.font = '12px Arial';
      canvas.fillText('Air', 10, 20);
      canvas.fillStyle = '#22c55e';
      canvas.fillText('Water', 10, 40);
      canvas.fillStyle = '#8b5cf6';
      canvas.fillText('Noise', 10, 60);
      
      // Update when window resizes
      window.addEventListener('resize', () => {
        ctx.width = container.clientWidth;
        ctx.height = 300;
        this.initPollutionChart();
      });
    }
  },
  
  // Show loading indicators on dashboard cards
  showLoadingIndicators: function() {
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach(card => {
      // Add loading overlay
      let loader = card.querySelector('.dashboard-loader');
      if (!loader) {
        loader = document.createElement('div');
        loader.className = 'dashboard-loader absolute inset-0 bg-gray-900/70 flex items-center justify-center rounded-3xl';
        loader.innerHTML = `
          <div class="flex flex-col items-center">
            <div class="w-8 h-8 border-4 border-eco-blue/30 border-t-eco-blue rounded-full animate-spin mb-2"></div>
            <span class="text-sm text-gray-300">Updating data...</span>
          </div>
        `;
        card.style.position = 'relative';
        card.appendChild(loader);
      }
      loader.classList.remove('hidden');
    });
    
    // Disable buttons during update
    const modeButtons = document.querySelectorAll('.dashboard-mode-btn');
    const timeButtons = document.querySelectorAll('.chart-time-btn');
    modeButtons.forEach(btn => btn.disabled = true);
    timeButtons.forEach(btn => btn.disabled = true);
  },
  
  // Hide loading indicators
  hideLoadingIndicators: function() {
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach(card => {
      const loader = card.querySelector('.dashboard-loader');
      if (loader) {
        loader.classList.add('hidden');
      }
    });
    
    // Re-enable buttons
    const modeButtons = document.querySelectorAll('.dashboard-mode-btn');
    const timeButtons = document.querySelectorAll('.chart-time-btn');
    modeButtons.forEach(btn => btn.disabled = false);
    timeButtons.forEach(btn => btn.disabled = false);
  },
  
  // Initialize loading animation for the chart
  initLoadingAnimation: function() {
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer) {
      // Add loading indicator to chart container
      const chartLoader = document.createElement('div');
      chartLoader.className = 'chart-loader absolute inset-0 bg-gray-800/80 flex items-center justify-center rounded-xl hidden';
      chartLoader.innerHTML = `
        <div class="flex flex-col items-center">
          <div class="w-8 h-8 border-4 border-eco-blue/30 border-t-eco-blue rounded-full animate-spin mb-2"></div>
          <span class="text-sm text-gray-300">Loading chart...</span>
        </div>
      `;
      chartContainer.style.position = 'relative';
      chartContainer.appendChild(chartLoader);
    }
  }
};

// Initialize all functionalities
document.addEventListener("DOMContentLoaded", () => {
  EcoPulse.initMobileMenu();
  EcoPulse.initScrollToTop();
  EcoPulse.initScrollIndicator();
  EcoPulse.initScrollReveal();
  
  // Initialize accessibility features
  EcoPulse.AccessibilityManager.init();
  EcoPulse.KeyboardNavigation.init();
  
  // Initialize dashboard
  EcoPulse.DashboardManager.init();
  
  // Set current year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
