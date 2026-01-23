# ⚠️ Troubleshooting & FAQ

This guide addresses common technical issues and provides solutions for the most frequent challenges encountered when running or contributing to **EcoPulse**.

---

## 🛠 Common Technical Issues

### 1. 🧊 3D Scenes Not Loading (WebGL Errors)
* **Issue:** The screen is blank, or you see a message saying "WebGL not supported."
* **Cause:** Your browser or hardware may have WebGL disabled, or your GPU drivers are outdated.
* **Solution:** * Ensure Hardware Acceleration is enabled in your browser settings.
    * Check your WebGL support at [get.webgl.org](https://get.webgl.org/).
    * **Fallback:** The app will automatically attempt to render 2D SVG animations if WebGL fails.



### 2. 📊 Charts Not Rendering
* **Issue:** The analytics dashboards appear empty.
* **Cause:** Likely a failure to load the Chart.js CDN or an issue with the local data fetch.
* **Solution:** * Check your internet connection (required for CDN-based libraries).
    * Verify that `data/sample-data.json` exists in the project root.
    * Open the Console (F12) to check for `404 Not Found` errors.

### 3. 📉 Low Frame Rate (Laggy Animations)
* **Issue:** The 3D interaction feels stuttering or slow (below 30 FPS).
* **Cause:** Too many particles are being rendered for your device's GPU.
* **Solution:** * Close other high-resource browser tabs.
    * Reduce the `particleCount` multiplier in `js/air-3d.js` or `js/water-3d.js`.

---

## ❓ Frequently Asked Questions (FAQ)

**Q: Can I use this project without an internet connection?**
**A:** Yes! Once the initial libraries are cached by the Service Worker, the PWA features allow you to view the 3D scenes and local sample data offline.

**Q: How do I add my own city to the pollution data?**
**A:** You need to append your city's metrics to the `pollution_data` object inside `data/sample-data.json`. Refer to the [Development Guide](./DEVELOPMENT.md) for data mapping instructions.

**Q: Why do I get a CORS error when opening `index.html` directly?**
**A:** Browsers block local file fetching for security reasons. You **must** use a local server (like Python's `http.server` or Node's `serve`) to load the JSON data.



---

## 🐛 Reporting a New Bug

If your issue isn't listed here:
1.  Check the [Existing Issues](https://github.com/vinaysingh282006/Hacknova/issues) to see if it's already being tracked.
2.  If not, open a new issue with your **Browser version**, **OS**, and a **screenshot** of the Console errors.

---

[← Back to Main README](../README.md)
