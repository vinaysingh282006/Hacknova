# 🚀 Setup, Deployment & Performance

This guide provides the technical specifications required to deploy, optimize, and support **EcoPulse** across various environments.

---

## 🌐 Deployment Options

### One-Click Cloud Deployment
EcoPulse is a static-friendly application and can be deployed instantly:

| Platform | Command / Method |
| :--- | :--- |
| **Vercel** | `npx vercel --prod` |
| **Netlify** | `npx netlify-cli deploy --prod --dir .` |
| **GitHub Pages** | Settings → Pages → Select `main` branch |
| **Firebase** | `firebase deploy` |



---

## ⚡ Performance Optimization

To maintain a smooth **60FPS** experience even with heavy 3D particle systems, we implement the following:

### 1. Dynamic Scaling
The particle count in the 3D scenes scales based on the `pollutionLevel`. To manually adjust performance for low-end devices, modify the multiplier in the `*-3d.js` files:

```javascript
// Example in js/air-3d.js
const particleCount = Math.min(1000, Math.floor(this.pollutionLevel * 10));
```

### 2. Assets & Rendering
To ensure a high-performance experience, we utilize the following optimization techniques:

* **📐 LOD (Level of Detail):** High-poly models are dynamically loaded only when they enter the active viewport, reducing the initial memory footprint.
* **💤 Lazy Loading:** 3D assets (`.glb` models) are fetched on-demand only when a specific pollution module (Air, Water, or Light) is triggered.
* **⏱️ RequestAnimationFrame:** Rendering cycles are synchronized with the browser's native refresh rate to eliminate screen tearing and maintain a smooth **60FPS**.

---

## 📖 Browser Support

EcoPulse utilizes **WebGL 2.0** and **ES6 Modules**. To ensure full visual fidelity, please verify that your environment meets the following minimum requirements:

| Browser | Minimum Version | Status |
| :--- | :--- | :--- |
| **Google Chrome** | 90+ | ✅ Full Support |
| **Mozilla Firefox** | 85+ | ✅ Full Support |
| **Safari (macOS/iOS)** | 14+ | ✅ Full Support |
| **Microsoft Edge** | 90+ | ✅ Full Support |
| **Mobile Browsers** | Android 10+ / iOS 14+ | ✅ Full Support |

> [!NOTE]
> **Fallback Mechanism:** If WebGL is unavailable or disabled, the application automatically initiates a fallback to **2D SVG animations**. This ensures that environmental data remains accessible and readable even on legacy hardware.

---

## 📱 PWA & Offline Support

The project includes a `manifest.json` and a **Service Worker** to provide a native-app-like experience.

* **📲 Add to Home Screen:** Fully supported on Android and iOS devices.
* **💾 Offline Caching:** Core UI elements, stylesheets, and charts are cached locally, allowing the platform to remain functional even without an active internet connection.

---

[← Back to Main README](./README.md)
