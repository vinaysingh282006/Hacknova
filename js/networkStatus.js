(function () {
  const banner = document.createElement('div');

  banner.style.position = 'fixed';
  banner.style.top = '0';
  banner.style.left = '0';
  banner.style.width = '100%';
  banner.style.padding = '12px';
  banner.style.textAlign = 'center';
  banner.style.fontFamily = 'Arial, sans-serif';
  banner.style.fontSize = '14px';
  banner.style.fontWeight = '500';
  banner.style.zIndex = '999999';
  banner.style.display = 'none';

  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(banner);

    function showOffline() {
      banner.textContent = 'You are offline';
      banner.style.background = '#dc2626';
      banner.style.color = '#ffffff';
      banner.style.display = 'block';
    }

    function showOnline() {
      banner.textContent = 'You are back online';
      banner.style.background = '#16a34a';
      banner.style.color = '#ffffff';
      banner.style.display = 'block';

      setTimeout(() => {
        banner.style.display = 'none';
      }, 3000);
    }

    window.addEventListener('offline', showOffline);
    window.addEventListener('online', showOnline);

    if (!navigator.onLine) {
      showOffline();
    }
  });
})();
