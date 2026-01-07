// Air Pollution 3D Visualization Module
// Handles the Three.js scene for air quality visualization

class AirPollutionScene {
    constructor(containerId = 'air-3d-scene') {
        this.containerId = containerId;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = [];
        this.pollutionLevel = 156; // Default to unhealthy level
        this.animationId = null;
        this.isInitialized = false;
        
        this.init();
    }
    
    init() {
        try {
            // Create scene
            this.scene = new THREE.Scene();
            this.scene.fog = new THREE.Fog(0x000000, 10, 100);
            
            // Create camera
            this.camera = new THREE.PerspectiveCamera(
                75, 
                window.innerWidth / window.innerHeight, 
                0.1, 
                1000
            );
            this.camera.position.z = 30;
            
            // Create renderer
            const container = document.getElementById(this.containerId);
            if (!container) {
                console.error(`Container with id ${this.containerId} not found`);
                return;
            }
            
            this.renderer = new THREE.WebGLRenderer({ 
                canvas: document.createElement('canvas'),
                antialias: true,
                alpha: true
            });
            
            this.renderer.setSize(container.clientWidth, container.clientHeight);
            this.renderer.setClearColor(0x000000, 0);
            container.appendChild(this.renderer.domElement);
            
            // Add lighting
            this.addLighting();
            
            // Create pollution particles
            this.createPollutionParticles();
            
            // Handle window resize
            window.addEventListener('resize', () => this.onWindowResize());
            
            // Set initialized flag
            this.isInitialized = true;
            
            // Start animation
            this.animate();
            
            // Hide loading indicator
            const loadingElement = document.getElementById('air-scene-loading');
            if (loadingElement) {
                setTimeout(() => {
                    loadingElement.style.opacity = '0';
                    setTimeout(() => {
                        loadingElement.style.display = 'none';
                    }, 500);
                }, 1000);
            }
            
            // Make this instance globally available
            window.airScene = this;
            
        } catch (error) {
            console.error('Error initializing Air Pollution Scene:', error);
        }
    }
    
    addLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
        this.scene.add(ambientLight);
        
        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
        
        // Hemisphere light for more natural lighting
        const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
        this.scene.add(hemisphereLight);
    }
    
    createPollutionParticles() {
        // Create a group for all particles
        this.particleGroup = new THREE.Group();
        this.scene.add(this.particleGroup);
        
        const particleCount = 2000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        // Create particle positions and colors based on pollution level
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Random positions in a sphere
            const radius = 15;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = radius * Math.cbrt(Math.random());
            
            positions[i3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = r * Math.cos(phi);
            
            // Color based on pollution level
            const pollutionFactor = this.pollutionLevel / 300;
            const red = Math.min(1, 0.2 + pollutionFactor * 0.8);
            const green = Math.min(1, 0.3 + pollutionFactor * 0.4);
            const blue = Math.min(1, 0.1 + pollutionFactor * 0.2);
            
            colors[i3] = red;
            colors[i3 + 1] = green;
            colors[i3 + 2] = blue;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        // Create material
        const material = new THREE.PointsMaterial({
            size: 0.2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });
        
        // Create particle system
        this.particleSystem = new THREE.Points(geometry, material);
        this.particleGroup.add(this.particleSystem);
    }
    
    updatePollutionLevel(level) {
        this.pollutionLevel = Math.max(0, Math.min(300, level)); // Clamp between 0 and 300
        
        if (this.particleSystem) {
            // Update particle colors based on new pollution level
            const colors = this.particleSystem.geometry.attributes.color.array;
            const pollutionFactor = this.pollutionLevel / 300;
            
            for (let i = 0; i < colors.length; i += 3) {
                const red = Math.min(1, 0.2 + pollutionFactor * 0.8);
                const green = Math.min(1, 0.3 + pollutionFactor * 0.4);
                const blue = Math.min(1, 0.1 + pollutionFactor * 0.2);
                
                colors[i] = red;     // R
                colors[i + 1] = green; // G
                colors[i + 2] = blue;  // B
            }
            
            this.particleSystem.geometry.attributes.color.needsUpdate = true;
            
            // Update fog density based on pollution level
            const fogDensity = 0.01 + (this.pollutionLevel / 300) * 0.04;
            this.scene.fog = new THREE.FogExp2(0x000000, fogDensity);
        }
    }
    
    animate() {
        if (!this.isInitialized) return;
        
        this.animationId = requestAnimationFrame(() => this.animate());
        
        // Rotate particle group slowly
        if (this.particleGroup) {
            this.particleGroup.rotation.x += 0.001;
            this.particleGroup.rotation.y += 0.002;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
    
    onWindowResize() {
        if (!this.camera || !this.renderer || !document.getElementById(this.containerId)) return;
        
        const container = document.getElementById(this.containerId);
        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(container.clientWidth, container.clientHeight);
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        if (this.renderer) {
            this.renderer.dispose();
        }
        
        // Remove event listeners
        window.removeEventListener('resize', this.onWindowResize);
        
        // Clear scene
        if (this.scene) {
            while(this.scene.children.length > 0) { 
                const child = this.scene.children[0];
                if (child.geometry) child.geometry.dispose();
                if (child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach(material => material.dispose());
                    } else {
                        child.material.dispose();
                    }
                }
                this.scene.remove(child);
            }
        }
        
        this.isInitialized = false;
    }
}

// Initialize the scene when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit to ensure DOM is fully loaded
    setTimeout(() => {
        if (document.getElementById('air-3d-scene')) {
            new AirPollutionScene('air-3d-scene');
        }
    }, 100);
});