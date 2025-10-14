# EcoPulse - Environmental Pollution Visualization

![EcoPulse Banner](https://img.shields.io/badge/Hackathon-2024-blue) ![Three.js](https://img.shields.io/badge/Three.js-r128-green) ![License](https://img.shields.io/badge/license-MIT-orange)

**Interactive 3D exploration of environmental pollution data** through immersive visualizations. Built for Hackathon 2024 with Three.js, Chart.js, and vanilla JavaScript.

## 🎯 Overview

EcoPulse makes complex environmental data accessible through engaging 3D visualizations:
- **Air Pollution**: Animated city skyline with particle-based smog simulation
- **Water Pollution**: River flow with contamination particles and clickable hotspots
- **Light Pollution**: Night sky visualization with light pollution intensity controls

## ✨ Features

### 🎨 Interactive 3D Visualizations
- Real-time Three.js scenes with WebGL optimization
- Particle systems for pollution visualization
- Camera orbit and tap-to-focus controls
- Mobile-responsive with touch gestures

### 📊 Data Analytics
- Chart.js visualizations (bar, line, radial gauges)
- Regional pollution comparisons (Asia, Europe, Americas, Africa, Oceania)
- Historical trend analysis (2018-2024)
- Real-time data updates based on user interaction

### 🎮 Interactivity
- Pollution level sliders (0-100%)
- Region selector dropdown
- Day/night toggle for light pollution
- Export current view as PNG
- Share functionality

### ♿ Accessibility
- WCAG AA compliant
- Keyboard navigation (Tab, Arrow keys, Escape)
- ARIA attributes for screen readers
- High contrast mode support
- Focus indicators

### 📱 Mobile-First Design
- Responsive breakpoints (mobile, tablet, desktop)
- Touch controls (pinch-to-zoom, swipe)
- PWA support with offline capabilities
- Optimized for low-end devices

### 🎁 Bonus Features
- AI prompt generator for mitigation strategies
- Ambient environmental sounds toggle
- Shader effects for enhanced visuals
- Presentation mode for hackathon judging

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome 90+, Firefox 85+, Safari 14+, Edge 90+)
- Local development server (Python, Node.js, or PHP)

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd Hacknova
   ```

2. **Start a local server**

   **Option A: Python 3**
   ```bash
   python -m http.server 8000
   ```

   **Option B: Node.js**
   ```bash
   npx serve .
   ```

   **Option C: PHP**
   ```bash
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## 📁 Project Structure

```
Hacknova/
├── index.html                 # Landing page
├── air.html                   # Air pollution visualization
├── water.html                 # Water pollution visualization
├── light.html                 # Light pollution visualization
├── presentation.html          # Hackathon presentation slides
├── manifest.json              # PWA manifest
├── README.md                  # Documentation
├── css/
│   └── styles.css             # Custom styles
├── js/
│   ├── main.js                # Core functionality
│   ├── air-3d.js              # Air pollution 3D scene
│   ├── water-3d.js            # Water pollution 3D scene
│   ├── light-3d.js            # Light pollution 3D scene
│   ├── charts.js              # Chart.js visualizations
│   ├── shared.js              # Shared utilities (export, accessibility)
│   └── bonus-features.js      # AI suggestions, sounds, effects
├── data/
│   └── sample-data.json       # Pollution metrics dataset
└── assets/
    ├── models/                # 3D models (glTF/glb)
    ├── sounds/                # Ambient audio files
    └── images/                # Images and icons
```

## 🎨 Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **3D Graphics**: Three.js r128 (via CDN)
- **Data Visualization**: Chart.js (via CDN)
- **Styling**: Tailwind CSS + Custom CSS
- **Fonts**: Google Fonts (Inter)
- **PWA**: Service Worker + Manifest

## 📊 Data Integration

### Using Sample Data

The project includes `data/sample-data.json` with comprehensive pollution metrics:
```json
{
  "pollution_data": {
    "air": { "current_data": {...}, "historical_trends": {...} },
    "water": { "current_data": {...}, "historical_trends": {...} },
    "light": { "current_data": {...}, "historical_trends": {...} }
  }
}
```

### Integrating Real APIs

To replace sample data with live API data:

1. **Modify `js/charts.js`**:
   ```javascript
   async loadData() {
       try {
           // Replace with your API endpoint
           const response = await fetch('https://api.example.com/pollution');
           this.data = await response.json();
           this.initializeCharts();
       } catch (error) {
           console.error('API load failed:', error);
           this.loadFallbackData();
       }
   }
   ```

2. **Recommended APIs**:
   - **Air Quality**: [OpenAQ](https://openaq.org/), [AirVisual](https://www.iqair.com/air-pollution-data-api)
   - **Water Quality**: [Water Quality Portal](https://www.waterqualitydata.us/)
   - **Light Pollution**: [Globe at Night](https://www.globeatnight.org/)

## 🌐 Deployment

### Deploy to Netlify (One-Liner)
```bash
npx netlify-cli deploy --prod --dir .
```

### Deploy to Vercel
```bash
npx vercel --prod
```

### Deploy to GitHub Pages
1. Push to GitHub repository
2. Settings → Pages → Select branch → Save

### Deploy to Firebase
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 🎮 Usage Guide

### Navigation
- **Desktop**: Click navigation links, use mouse to interact with 3D scenes
- **Mobile**: Tap menu icon, swipe to navigate, pinch-to-zoom on 3D scenes

### Controls
- **Pollution Slider**: Adjust pollution levels (0-100%)
- **Region Selector**: Choose geographic region for data
- **Day/Night Toggle**: Switch light pollution visualization mode
- **Export Button**: Save current view as PNG image
- **Share Button**: Copy shareable link

### Keyboard Shortcuts
- **Tab**: Navigate between interactive elements
- **Arrow Keys**: Navigate presentation slides
- **Escape**: Close modals and dropdowns
- **Spacebar**: Play/pause animations (where applicable)

## 🔧 Customization

### Changing Colors
Edit `css/styles.css`:
```css
:root {
    --eco-blue: #0ea5e9;
    --eco-green: #10b981;
    --eco-orange: #f97316;
    --eco-red: #ef4444;
}
```

### Adjusting 3D Scene Performance
In `js/air-3d.js` (similar for other scenes):
```javascript
const particleCount = Math.min(1000, Math.floor(this.pollutionLevel * 15));
// Reduce multiplier for better performance: * 10 instead of * 15
```

### Adding New Data Regions
Update `data/sample-data.json`:
```json
{
  "pollution_data": {
    "air": {
      "current_data": {
        "new_region": {
          "pm25": 30.5,
          "aqi": 120,
          ...
        }
      }
    }
  }
}
```

## ⚡ Performance Optimization

### Current Optimizations
- Particle count scales with device capability
- LOD (Level of Detail) for 3D models
- Lazy loading of assets
- Debounced window resize handlers
- RequestAnimationFrame for smooth 60fps
- CDN usage for faster library loading

### Further Optimizations
- Use production builds of Three.js
- Implement code splitting
- Enable gzip compression on server
- Add service worker for offline caching
- Minify CSS and JavaScript

## 🐛 Troubleshooting

### 3D Scenes Not Loading
- **Issue**: WebGL not supported
- **Solution**: Fallback SVG animations will display automatically

### Charts Not Rendering
- **Issue**: Chart.js CDN failed to load
- **Solution**: Check internet connection or use local Chart.js file

### Mobile Performance Issues
- **Issue**: Laggy animations on older devices
- **Solution**: Reduce particle count in `*-3d.js` files

### CORS Errors with Local Files
- **Issue**: Cannot load JSON data
- **Solution**: Must use a local server (see Quick Start)

## 📖 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 90+     | ✅ Full Support |
| Firefox | 85+     | ✅ Full Support |
| Safari  | 14+     | ✅ Full Support |
| Edge    | 90+     | ✅ Full Support |
| Opera   | 76+     | ✅ Full Support |
| Mobile  | iOS 14+ / Android 10+ | ✅ Full Support |

## 🤝 Contributing

This is a hackathon project, but contributions are welcome!
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- **Data Sources**: WHO, EPA, Scientific Research Papers
- **Libraries**: Three.js, Chart.js, Tailwind CSS
- **Inspiration**: Environmental awareness campaigns worldwide
- **Event**: Hackathon 2024

## 📧 Contact

**Project Team**: EcoPulse Development Team  
**Event**: Hackathon 2024  
**Category**: Environmental Data Visualization

---

Built with ❤️ for environmental awareness | Hackathon 2024
