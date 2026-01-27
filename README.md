# 🌍 EcoPulse — Environmental Pollution Visualization

<div align="center">

![Hackathon 2024](https://img.shields.io/badge/Hackathon-2024-blue?style=for-the-badge)
![Three.js](https://img.shields.io/badge/Three.js-r128-green?style=for-the-badge)
![SWOC 2026](https://img.shields.io/badge/SWOC-2026-orange?style=for-the-badge)

**Interactive 3D exploration of environmental pollution data.**
[Explore Live Demo](https://hacknova-seven.vercel.app/) • [Contribution Guide](#🤝-contributing) • [Documentation](./docs/)

</div>

---

## 📖 Table of Contents
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📚 Extended Documentation](#-extended-documentation)
- [👥 Contributors](#-contributors)

---

## ✨ Features
EcoPulse transforms complex datasets into immersive 3D stories.

* **🌬️ Air Pollution:** Particle-based smog simulation in a 3D city skyline.
* **💧 Water Pollution:** Clickable hotspots and contamination flow analysis.
* **💡 Light Pollution:** Night sky intensity controls with real-time toggles.
* **📊 Analytics:** Dynamic Chart.js integration for regional comparisons (2018-2024).

---

## 🎯 Who Is This Project For?

- Students learning Three.js and WebGL
- Hackathon participants building climate-tech apps
- Beginners in open-source contribution
- Developers interested in data visualization


## 🛠️ Tech Stack
| Category | Technology | Usage |
| :--- | :--- | :--- |
| **3D Graphics** | Three.js (r128) | WebGL optimized particle systems and scenes. |
| **Data Viz** | Chart.js | Real-time bar, line, and radial gauges. |
| **Styling** | Tailwind CSS | Responsive, eco-minimalist UI design. |
| **Core** | Vanilla JS (ES6+) | Performance-focused logic without heavy frameworks. |

---

## 🚀 Quick Start

Get your local environment running in seconds:
### Clone the repository
```
git clone [https://github.com/vinaysingh282006/Hacknova.git](https://github.com/vinaysingh282006/Hacknova.git)
cd Hacknova
```

### Start a local server (Python 3)
```
python3 -m http.server 8000
```

_Navigate to `http://localhost:8000` in your browser._

---

## 📚 Extended Documentation

To keep the main page clean and maintain a professional appearance, all technical deep-dives have been moved to our dedicated **Docs Hub**:

| Module | Description |
| :--- | :--- |
| **[🚀 Setup & Deployment](./docs/SETUP.md)** | Comprehensive guide on hosting (Vercel/Netlify), Browser Support, and PWA configuration. |
| **[🔧 Customization & API](./docs/DEVELOPMENT.md)** | Instructions for integrating real-time APIs (OpenAQ) and fine-tuning 3D shaders. |
| **[⚠️ Troubleshooting](./docs/TROUBLESHOOTING.md)** | Rapid fixes for common WebGL errors and performance optimizations for mobile. |


<details>
<summary><b>📂 View Project Structure (Click to expand)</b></summary>

```plaintext
Hacknova/
├── index.html          # Landing Page
├── air.html            # 3D Air Scene (Environment Visualization)
├── water.html          # 3D Water Scene (Environment Visualization)
├── light.html          # 3D Light Scene (Environment Visualization)
├── js/
│   ├── main.js         # Entry point & Navigation
│   ├── air-3d.js       # Three.js Core Logic for Air
│   ├── charts.js       # Chart.js Data Logic
│   └── shared.js       # Utilities & Accessibility 
├── data/
│   └── sample-data.json # Default Pollution Metrics
└── docs/               # Modular Technical Documentation
```

</details>

---

## 🤝 Contributing

Participating in **SWOC'26**? We welcome your contributions! To ensure a smooth process, please follow these steps:

1.  **📖 Read the Docs:** Check our [Contributing Guide](./CONTRIBUTING.md) for coding standards and workflow.
2.  **🔍 Find a Task:** Look for issues with the `good-first-issue` or `SWOC'26` labels.
3.  **🛠️ Build & Submit:** Fork the repo, make your changes, and submit your PR to close the loop!

## 👥 Contributors
A huge thank you to these amazing individuals for helping **EcoPulse** grow!

**[Click to see the Contributor Graph](https://github.com/vinaysingh282006/Hacknova/graphs/contributors)**

---

## 📜 License

This project is licensed under the **MIT License**. Feel free to use, modify, and distribute it as per the license terms.

---

<div align="center">
  <h3>Give a ⭐ if you support a greener Earth! 🌏💚</h3>
  <p>Your support helps us reach more developers and spread environmental awareness.</p>
</div>
