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

});
const dots = document.querySelectorAll(".cursor-dot");

const historyLength = dots.length;
const mouseHistory = Array.from({ length: historyLength }, () => ({
  x: 0,
  y: 0,
}));

let mouseX = 0;
let mouseY = 0;

// Current visual positions (for smoothing)
const visualPositions = Array.from({ length: historyLength }, () => ({
  x: 0,
  y: 0,
}));

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursorTrail() {
  // Add current mouse position to history
  mouseHistory.unshift({ x: mouseX, y: mouseY });
  mouseHistory.pop();

  dots.forEach((dot, index) => {
    const target = mouseHistory[index];
    const current = visualPositions[index];

    // Smooth easing (THIS controls speed)
    current.x += (target.x - current.x) * 0.18;
    current.y += (target.y - current.y) * 0.18;

    dot.style.left = current.x + "px";
    dot.style.top = current.y + "px";
  });

  requestAnimationFrame(animateCursorTrail);
}

animateCursorTrail();
