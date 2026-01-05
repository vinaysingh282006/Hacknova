// ===============================
// EcoPulse Main JavaScript
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     MOBILE MENU TOGGLE
  ================================ */
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  /* ===============================
     SCROLL INDICATOR (HERO)
  ================================ */
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

  /* ===============================
     SCROLL TO TOP BUTTON
  ================================ */
  const scrollToTopBtn = document.getElementById("scroll-to-top");

  if (scrollToTopBtn) {
    const toggleScrollButton = () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add("visible");
      } else {
        scrollToTopBtn.classList.remove("visible");
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

  /* ===============================
     SCROLL REVEAL SYSTEM
  ================================ */
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

  const precautionsData = {
  air: [
    "Wear a mask in high AQI areas",
    "Avoid outdoor activity during peak pollution hours",
    "Use public transport or carpool",
    "Plant indoor air-purifying plants"
  ],
  water: [
    "Avoid dumping waste into water bodies",
    "Use water filters",
    "Reduce plastic usage",
    "Report polluted water sources"
  ],
  light: [
    "Use warm LED lights",
    "Turn off unnecessary lights at night",
    "Use curtains to block outdoor light",
    "Support dark-sky initiatives"
  ],
  noise: [
    "Avoid honking unnecessarily",
    "Use noise-canceling devices",
    "Limit loud music",
    "Plant trees to absorb sound"
  ]
};


});
// ===============================
// PRECAUTION MODAL FUNCTIONS (GLOBAL)
// ===============================

function openPrecautions(type) {
  const modal = document.getElementById("precaution-modal");
  const title = document.getElementById("precaution-title");
  const content = document.getElementById("precaution-content");

  const data = {
    air: {
      title: "🌬️ Air Pollution Precautions",
      points: [
        "Use public transport or carpool",
        "Avoid burning waste",
        "Plant trees and support green spaces",
        "Use masks during high AQI days"
      ]
    },
    water: {
      title: "💧 Water Pollution Precautions",
      points: [
        "Do not dump waste into water bodies",
        "Use eco-friendly detergents",
        "Conserve water",
        "Support clean-water initiatives"
      ]
    },
    light: {
      title: "💡 Light Pollution Precautions",
      points: [
        "Use warm, low-intensity lighting",
        "Turn off unnecessary outdoor lights",
        "Use motion sensors",
        "Support dark-sky initiatives"
      ]
    },
    noise: {
      title: "🔊 Noise Pollution Precautions",
      points: [
        "Avoid unnecessary honking",
        "Use soundproofing where possible",
        "Follow noise regulations",
        "Limit loud activities at night"
      ]
    }
  };

  title.textContent = data[type].title;
  content.innerHTML = data[type].points
    .map(p => `<li class="mb-2">• ${p}</li>`)
    .join("");

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closePrecautions() {
  const modal = document.getElementById("precaution-modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}


