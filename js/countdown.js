// js/countdown.js

export function startCountdown(targetDate, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      container.innerHTML = `<span class="live-now">Live Now</span>`;
      clearInterval(timer);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    container.innerHTML = `
      <div class="countdown-item">${days}<span>Days</span></div>
      <div class="countdown-item">${hours}<span>Hours</span></div>
      <div class="countdown-item">${minutes}<span>Minutes</span></div>
      <div class="countdown-item">${seconds}<span>Seconds</span></div>
    `;
  }

  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);
}
