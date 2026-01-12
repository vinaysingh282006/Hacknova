// Water Pollution 3D Visualization Module
// Handles the Three.js scene for water quality visualization

class WaterPollutionScene {
    constructor(containerId = 'water-3d-scene') {
        this.containerId = containerId;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.contaminationLevel = 50; // Default to medium contamination
        this.animationId = null;
        this.isInitialized = false;
        this.riverMesh = null;
        this.contaminantParticles = [];
        this.waterFlow = [];
        
        this.init();
    }
    
    init() {
        try {
            // Create scene
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x87CEEB); // Sky blue background
            this.scene.fog = new THREE.Fog(0x87CEEB, 20, 100);
            
            // Create camera
            this.camera = new THREE.PerspectiveCamera(
                75, 
                window.innerWidth / window.innerHeight, 
                0.1, 
                1000
            );
            this.camera.position.set(0, 15, 30);
            this.camera.lookAt(0, 0, 0);
            
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
            this.renderer.setClearColor(0x87CEEB, 1);
            container.appendChild(this.renderer.domElement);
            
            // Add lighting
            this.addLighting();
            
            // Create water river
            this.createRiver();
            
            // Create contaminant particles
            this.createContaminantParticles();
            
            // Handle window resize
            window.addEventListener('resize', () => this.onWindowResize());
            
            // Set initialized flag
            this.isInitialized = true;
            
            // Start animation
            this.animate();
            
            // Hide loading indicator
            const loadingElement = document.getElementById('water-scene-loading');
            if (loadingElement) {
                setTimeout(() => {
                    loadingElement.style.opacity = '0';
                    setTimeout(() => {
                        loadingElement.style.display = 'none';
                    }, 500);
                }, 1000);
            }
            
            // Make this instance globally available
            window.waterScene = this;
            
        } catch (error) {
            console.error('Error initializing Water Pollution Scene:', error);
        }
    }
    
    addLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        
        // Directional light (sun)
        const sunLight = new THREE.DirectionalLight(0xffffff, 0.8);
        sunLight.position.set(10, 20, 15);
        sunLight.castShadow = true;
        this.scene.add(sunLight);
        
        // Hemisphere light for more natural lighting
        const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
        this.scene.add(hemisphereLight);
    }
    
    createRiver() {
        // Create river bed
        const riverGeometry = new THREE.PlaneGeometry(40, 5, 20, 2);
        riverGeometry.rotateX(-Math.PI / 2); // Rotate to lay flat
        
        // Create water material
        const waterMaterial = new THREE.MeshPhongMaterial({
            color: 0x1e90ff, // Dodger blue
            transparent: true,
            opacity: 0.8,
            shininess: 100
        });
        
        this.riverMesh = new THREE.Mesh(riverGeometry, waterMaterial);
        this.riverMesh.position.y = 0.1; // Slightly above ground
        this.scene.add(this.riverMesh);
        
        // Add some waves/rivulets effect
        this.createRiverDetails();
    }
    
    createRiverDetails() {
        // Add some ripple effects
        const rippleGeometry = new THREE.CircleGeometry(0.5, 8);
        const rippleMaterial = new THREE.MeshBasicMaterial({
            color: 0x87CEFA,
            transparent: true,
            opacity: 0.3
        });
        
        for (let i = 0; i < 20; i++) {
            const ripple = new THREE.Mesh(rippleGeometry, rippleMaterial);
            ripple.position.x = -18 + Math.random() * 36;
            ripple.position.z = -2 + Math.random() * 4;
            ripple.position.y = 0.2;
            ripple.rotation.x = -Math.PI / 2;
            this.scene.add(ripple);
        }
    }
    
    createContaminantParticles() {
        // Create a group for contaminant particles
        this.contaminantGroup = new THREE.Group();
        this.scene.add(this.contaminantGroup);
        
        const particleCount = 1500;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        // Create particle positions and colors based on contamination level
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Position particles along the river
            positions[i3] = -18 + Math.random() * 36; // X: along river
            positions[i3 + 1] = 0.5 + Math.random() * 2; // Y: above water
            positions[i3 + 2] = -2 + Math.random() * 4; // Z: width of river
            
            // Color based on contamination level
            const contaminationFactor = this.contaminationLevel / 100;
            const red = Math.min(1, 0.3 + contaminationFactor * 0.7);
            const green = Math.min(1, 0.6 - contaminationFactor * 0.3);
            const blue = Math.min(1, 0.3 - contaminationFactor * 0.2);
            
            colors[i3] = red;
            colors[i3 + 1] = green;
            colors[i3 + 2] = blue;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        // Create material
        const material = new THREE.PointsMaterial({
            size: 0.15,
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            sizeAttenuation: true
        });
        
        // Create particle system
        this.contaminantSystem = new THREE.Points(geometry, material);
        this.contaminantGroup.add(this.contaminantSystem);
    }
    
    updateContaminationLevel(level) {
        this.contaminationLevel = Math.max(0, Math.min(100, level)); // Clamp between 0 and 100
        
        if (this.contaminantSystem) {
            // Update particle colors based on new contamination level
            const colors = this.contaminantSystem.geometry.attributes.color.array;
            const contaminationFactor = this.contaminationLevel / 100;
            
            for (let i = 0; i < colors.length; i += 3) {
                const red = Math.min(1, 0.3 + contaminationFactor * 0.7);
                const green = Math.min(1, 0.6 - contaminationFactor * 0.3);
                const blue = Math.min(1, 0.3 - contaminationFactor * 0.2);
                
                colors[i] = red;     // R
                colors[i + 1] = green; // G
                colors[i + 2] = blue;  // B
            }
            
            this.contaminantSystem.geometry.attributes.color.needsUpdate = true;
            
            // Update water color based on contamination
            if (this.riverMesh) {
                const waterColorFactor = 1 - (contaminationFactor * 0.5); // More contamination = murkier
                const baseBlue = 0x1e90ff;
                const r = ((baseBlue >> 16) & 0xFF) / 255 * waterColorFactor;
                const g = ((baseBlue >> 8) & 0xFF) / 255 * waterColorFactor;
                const b = (baseBlue & 0xFF) / 255 * (1 - contaminationFactor * 0.3);
                
                this.riverMesh.material.color.setRGB(r, g, b);
            }
        }
    }
    
    animate() {
        if (!this.isInitialized) return;
        
        this.animationId = requestAnimationFrame(() => this.animate());
        
        // Animate contaminant particles to simulate flow
        if (this.contaminantGroup) {
            this.contaminantGroup.rotation.y += 0.001;
        }
        
        // Animate river mesh for water flow effect
        if (this.riverMesh) {
            const time = Date.now() * 0.001;
            const vertices = this.riverMesh.geometry.attributes.position.array;
            for (let i = 0; i < vertices.length; i += 3) {
                // Add subtle wave motion
                vertices[i + 1] += Math.sin(vertices[i] * 0.2 + time) * 0.01;
            }
            this.riverMesh.geometry.attributes.position.needsUpdate = true;
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
        if (document.getElementById('water-3d-scene')) {
            new WaterPollutionScene('water-3d-scene');
        }
    }, 100);
});