// Noise Pollution 3D Visualization Module
// Handles the Three.js scene for noise pollution visualization

class NoisePollutionScene {
    constructor(containerId = 'noise-3d-scene') {
        this.containerId = containerId;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.decibelLevel = 60; // Default to moderate noise
        this.animationId = null;
        this.isInitialized = false;
        this.soundWaves = [];
        this.cityObjects = [];
        
        this.init();
    }
    
    init() {
        try {
            // Create scene
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x222233); // Dark blue-gray background
            this.scene.fog = new THREE.Fog(0x222233, 15, 100);
            
            // Create camera
            this.camera = new THREE.PerspectiveCamera(
                75, 
                window.innerWidth / window.innerHeight, 
                0.1, 
                1000
            );
            this.camera.position.set(0, 15, 30);
            this.camera.lookAt(0, 5, 0);
            
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
            this.renderer.setClearColor(0x222233, 1);
            container.appendChild(this.renderer.domElement);
            
            // Add lighting
            this.addLighting();
            
            // Create city environment
            this.createCityEnvironment();
            
            // Create sound wave visualizations
            this.createSoundWaves();
            
            // Handle window resize
            window.addEventListener('resize', () => this.onWindowResize());
            
            // Set initialized flag
            this.isInitialized = true;
            
            // Start animation
            this.animate();
            
            // Hide loading indicator
            const loadingElement = document.getElementById('noise-scene-loading');
            if (loadingElement) {
                setTimeout(() => {
                    loadingElement.style.opacity = '0';
                    setTimeout(() => {
                        loadingElement.style.display = 'none';
                    }, 500);
                }, 1000);
            }
            
            // Make this instance globally available
            window.noiseScene = this;
            
        } catch (error) {
            console.error('Error initializing Noise Pollution Scene:', error);
        }
    }
    
    addLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.7);
        this.scene.add(ambientLight);
        
        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 20, 15);
        this.scene.add(directionalLight);
        
        // Hemisphere light for more natural lighting
        const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
        this.scene.add(hemisphereLight);
    }
    
    createCityEnvironment() {
        // Create ground plane
        const groundGeometry = new THREE.PlaneGeometry(100, 100);
        const groundMaterial = new THREE.MeshPhongMaterial({
            color: 0x333333,
            wireframe: false
        });
        
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        this.scene.add(ground);
        
        // Create city blocks with varying noise sources
        for (let x = -20; x <= 20; x += 8) {
            for (let z = -20; z <= 20; z += 8) {
                if (Math.abs(x) < 5 && Math.abs(z) < 5) continue; // Leave center area open
                
                // Random building heights
                const height = 3 + Math.random() * 12;
                
                // Building geometry
                const buildingGeometry = new THREE.BoxGeometry(5, height, 5);
                
                // Building material - color based on noise contribution
                const noiseContribution = this.getBuildingNoiseContribution(x, z);
                const buildingColor = this.getBuildingColorByNoise(noiseContribution);
                
                const buildingMaterial = new THREE.MeshPhongMaterial({
                    color: buildingColor
                });
                
                const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
                building.position.set(x, height / 2, z);
                this.scene.add(building);
                
                // Store for later updates
                this.cityObjects.push({
                    object: building,
                    position: {x, z},
                    baseHeight: height,
                    noiseContribution: noiseContribution
                });
            }
        }
    }
    
    getBuildingNoiseContribution(x, z) {
        // Determine noise contribution based on location
        // Center areas contribute more noise
        const distanceFromCenter = Math.sqrt(x * x + z * z);
        return Math.max(0.2, 1 - (distanceFromCenter / 30));
    }
    
    getBuildingColorByNoise(contribution) {
        // Return color based on noise contribution
        const r = Math.min(1, 0.3 + contribution * 0.7);
        const g = Math.min(1, 0.5 - contribution * 0.2);
        const b = Math.min(1, 0.5 - contribution * 0.3);
        return new THREE.Color(r, g, b);
    }
    
    createSoundWaves() {
        // Create sound wave visualization
        this.waveGroup = new THREE.Group();
        this.scene.add(this.waveGroup);
        
        // Create multiple concentric rings to represent sound waves
        for (let i = 0; i < 5; i++) {
            const radius = 3 + i * 4;
            const segments = 64;
            
            const waveGeometry = new THREE.RingGeometry(radius - 0.2, radius + 0.2, segments);
            const waveMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color(0xffaa00),
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.3 - (i * 0.05)
            });
            
            const wave = new THREE.Mesh(waveGeometry, waveMaterial);
            wave.rotation.x = -Math.PI / 2; // Lay flat
            this.waveGroup.add(wave);
            
            this.soundWaves.push({
                object: wave,
                baseRadius: radius,
                phase: i * 0.5
            });
        }
        
        // Create central noise source
        const sourceGeometry = new THREE.SphereGeometry(1, 16, 16);
        const sourceMaterial = new THREE.MeshBasicMaterial({
            color: 0xff3300,
            transparent: true,
            opacity: 0.8
        });
        
        this.noiseSource = new THREE.Mesh(sourceGeometry, sourceMaterial);
        this.noiseSource.position.set(0, 1, 0);
        this.waveGroup.add(this.noiseSource);
    }
    
    setDecibelLevel(decibels) {
        this.decibelLevel = Math.max(0, Math.min(120, decibels)); // Clamp between 0 and 120
        
        // Update the scene based on decibel level
        // Higher decibels = more intense sound waves and brighter visuals
        
        // Update sound wave intensity
        if (this.soundWaves.length > 0) {
            const intensity = this.decibelLevel / 120; // Normalize to 0-1 range
            
            // Update wave properties based on intensity
            this.soundWaves.forEach((wave, index) => {
                const waveOpacity = (0.3 - (index * 0.05)) * intensity;
                wave.object.material.opacity = Math.max(0.05, waveOpacity);
                
                // Change color based on intensity
                const hue = 0.1 * intensity; // From orange to red
                const saturation = 1.0;
                const lightness = 0.5;
                wave.object.material.color.setHSL(hue, saturation, lightness);
            });
            
            // Update noise source
            if (this.noiseSource) {
                const scale = 1 + (intensity * 0.5);
                this.noiseSource.scale.set(scale, scale, scale);
                
                const sourceOpacity = 0.5 + (intensity * 0.5);
                this.noiseSource.material.opacity = Math.min(1, sourceOpacity);
                
                // Change color based on intensity
                const hue = 0.05 + (intensity * 0.05); // From red-orange to bright red
                this.noiseSource.material.color.setHSL(hue, 1.0, 0.6);
            }
        }
        
        // Update city object colors based on overall noise level
        this.updateCityColors();
    }
    
    updateCityColors() {
        const intensity = this.decibelLevel / 120;
        
        this.cityObjects.forEach(obj => {
            const baseContribution = obj.noiseContribution;
            const colorIntensity = Math.min(1, 0.3 + baseContribution * 0.7 + intensity * 0.3);
            
            const r = Math.min(1, 0.3 + colorIntensity * 0.7);
            const g = Math.min(1, 0.5 - colorIntensity * 0.2);
            const b = Math.min(1, 0.5 - colorIntensity * 0.3);
            
            obj.object.material.color.setRGB(r, g, b);
        });
    }
    
    animate() {
        if (!this.isInitialized) return;
        
        this.animationId = requestAnimationFrame(() => this.animate());
        
        // Animate sound waves to simulate propagation
        if (this.waveGroup && this.soundWaves.length > 0) {
            const time = Date.now() * 0.005;
            const intensity = this.decibelLevel / 120;
            
            this.soundWaves.forEach((wave, index) => {
                // Pulsate the waves based on time and intensity
                const pulse = Math.sin(time + wave.phase) * 0.2 * intensity;
                const currentRadius = wave.baseRadius + pulse;
                
                // Update the ring geometry
                const segments = 64;
                const newGeometry = new THREE.RingGeometry(
                    currentRadius - 0.2, 
                    currentRadius + 0.2, 
                    segments
                );
                
                wave.object.geometry.dispose(); // Clean up old geometry
                wave.object.geometry = newGeometry;
            });
            
            // Animate the noise source
            if (this.noiseSource) {
                const pulse = Math.sin(time * 2) * 0.1;
                const scale = this.noiseSource.scale.x;
                this.noiseSource.scale.set(scale + pulse, scale + pulse, scale + pulse);
            }
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
        if (document.getElementById('noise-3d-scene')) {
            new NoisePollutionScene('noise-3d-scene');
        }
    }, 100);
});