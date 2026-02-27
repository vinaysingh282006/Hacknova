## Description
Provide a clear summary of the changes. What specific pollution visualization (Air, Water, Light) or UI component does this affect?

**Fixes # (issue number)**

---

## Type of Change
- [ ] **3D Logic**: Changes to Three.js scenes, shaders, or particle systems.
- [ ] **Data Visualization**: Updates to Chart.js or analytics logic.
- [ ] **UI/UX**: Tailwind CSS styling or responsive design tweaks.
- [ ] **Documentation**: Updates to `docs/` or `README.md`.
- [ ] **Performance**: WebGL optimization or asset compression.

---

## WebGL & Performance Checklist
For changes involving 3D scenes (`air.html`, `water.html`, `light.html`):

- [ ] **Frame Rate**: The 3D scene maintains a smooth 60fps (or stays consistent with current performance).
- [ ] **Memory Management**: Verified that no new memory leaks are introduced (e.g., proper disposal of Three.js geometries/materials).
- [ ] **Browser Testing**: Tested and verified on:
    - [ ] Google Chrome
    - [ ] Mozilla Firefox
    - [ ] Safari / Edge
- [ ] **Responsiveness**: The 3D canvas scales correctly on mobile devices.

---

## Visual Evidence
**Mandatory for 3D and UI changes.** Please attach a screenshot or screen recording (GIF/MP4) showing the changes in action within the browser.

| Before | After |
|--------|-------|
| [Insert Image] | [Insert Image] |

---

## Quality Standards
- [ ] **Linting**: Code follows the project's vanilla JS/ES6+ standards.
- [ ] **SWOC'26**: This contribution follows the SWOC code of conduct and contribution guidelines.
- [ ] **License**: I agree to submit this contribution under the MIT License.

---
*Created for EcoPulse*
