// Light Pollution 3D Visualization Module
// Handles the Three.js scene for light pollution visualization

class LightPollutionScene {
    constructor(containerId = 'light-3d-scene') {
        this.containerId = containerId;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.lightIntensity = 50; // Default to medium light pollution
        this.animationId = null;
        this.isInitialized = false;
        this.cityLights = [];
        this.stars = [];
        this.milkyWay = null;
        this.handleResize = this.onWindowResize.bind(this);

        this.init();
    }
    
    init() {
        try {
            // Create scene
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x000011); // Very dark blue for night sky
            this.scene.fog = new THREE.Fog(0x000022, 10, 100);
            
            // Create camera
            this.camera = new THREE.PerspectiveCamera(
                75, 
                window.innerWidth / window.innerHeight, 
                0.1, 
                1000
            );
            this.camera.position.set(0, 10, 30);
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
            this.renderer.setClearColor(0x000011, 1);
            container.appendChild(this.renderer.domElement);
            
            // Add lighting
            this.addBaseLighting();
            
            // Create city with lights
            this.createCity();
            
            // Create stars
            this.createStars();
            
            // Create Milky Way effect
            this.createMilkyWay();
            
            // Handle window resize
           window.addEventListener('resize', this.handleResize);

            
            // Set initialized flag
            this.isInitialized = true;
            
            // Start animation
            this.animate();
            
            // Hide loading indicator
            const loadingElement = document.getElementById('light-scene-loading');
            if (loadingElement) {
                setTimeout(() => {
                    loadingElement.style.opacity = '0';
                    setTimeout(() => {
                        loadingElement.style.display = 'none';
                    }, 500);
                }, 1000);
            }
            
            // Make this instance globally available
            window.lightScene = this;
            
        } catch (error) {
            console.error('Error initializing Light Pollution Scene:', error);
        }
    }
    
    addBaseLighting() {
        // Very dim ambient light to simulate night
        const ambientLight = new THREE.AmbientLight(0x111133, 0.2);
        this.scene.add(ambientLight);
    }
    
    createCity() {
        // Create city blocks with lights
        const cityGroup = new THREE.Group();
        
        for (let x = -15; x <= 15; x += 5) {
            for (let z = -10; z <= 10; z += 5) {
                // Random building heights
                const height = 2 + Math.random() * 8;
                
                // Building geometry
                const buildingGeometry = new THREE.BoxGeometry(3, height, 3);
                
                // Building material - darker for buildings
                const buildingMaterial = new THREE.MeshPhongMaterial({
                    color: 0x333344
                });
                
                const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
                building.position.set(x, height / 2, z);
                cityGroup.add(building);
                
                // Add windows/lights to buildings
                this.addBuildingLights(cityGroup, x, height, z);
            }
        }
        
        this.scene.add(cityGroup);
    }
    
    addBuildingLights(cityGroup, x, height, z) {
        // Add window lights to buildings
        const windowRows = Math.floor(height / 1.5);
        
        for (let row = 0; row < windowRows; row++) {
            for (let col = 0; col < 2; col++) {
                for (let depth = 0; depth < 2; depth++) {
                    // Randomly decide if window is lit (based on light pollution level)
                    if (Math.random() < (this.lightIntensity / 100) * 0.8) {
                        const lightY = 1 + row * 1.5;
                        
                        // Window light position
                        let winX = x;
                        let winZ = z;
                        
                        if (col === 0) winX -= 1.6; // Front/back face
                        else winX += 1.6;
                        
                        if (depth === 0) winZ -= 1.6; // Side face
                        else winZ += 1.6;
                        
                        // Create small light source
                        const lightColor = new THREE.Color(
                            0.8 + Math.random() * 0.2, // Yellowish white
                            0.8 + Math.random() * 0.2,
                            0.6 + Math.random() * 0.2
                        );
                        
                        const pointLight = new THREE.PointLight(lightColor, 0.5, 10);
                        pointLight.position.set(winX, lightY, winZ);
                        cityGroup.add(pointLight);
                        
                        // Add light helper for visualization (will be removed in production)
                        const lightHelper = new THREE.PointLightHelper(pointLight, 0.2);
                        cityGroup.add(lightHelper);
                    }
                }
            }
        }
    }
    
    createStars() {
        // Create starfield
        const starGeometry = new THREE.BufferGeometry();
        const starPositions = [];
        const starColors = [];
        
        // Generate random star positions
        for (let i = 0; i < 2000; i++) {
            const x = (Math.random() - 0.5) * 200;
            const y = (Math.random() - 0.5) * 200;
            const z = (Math.random() - 0.5) * 200 - 50; // Behind the city
            
            starPositions.push(x, y, z);
            
            // Star color (mostly white/yellow)
            const brightness = 0.7 + Math.random() * 0.3;
            starColors.push(brightness, brightness, brightness);
        }
        
        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
        starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
        
        const starMaterial = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });
        
        this.starField = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(this.starField);
    }
    
    createMilkyWay() {
        // Create Milky Way effect using particles
        const milkyWayGeometry = new THREE.BufferGeometry();
        const milkyWayPositions = [];
        const milkyWayColors = [];
        
        // Create Milky Way arc
        for (let i = 0; i < 500; i++) {
            const angle = (i / 500) * Math.PI * 2;
            const radius = 30 + Math.random() * 20;
            
            const x = Math.cos(angle) * radius;
            const y = (Math.random() - 0.5) * 15;
            const z = Math.sin(angle) * radius - 80;
            
            milkyWayPositions.push(x, y, z);
            
            // Milky Way color (soft blue-white)
            const brightness = 0.3 + Math.random() * 0.4;
            milkyWayColors.push(0.7 * brightness, 0.7 * brightness, 1.0 * brightness);
        }
        
        milkyWayGeometry.setAttribute('position', new THREE.Float32BufferAttribute(milkyWayPositions, 3));
        milkyWayGeometry.setAttribute('color', new THREE.Float32BufferAttribute(milkyWayColors, 3));
        
        const milkyWayMaterial = new THREE.PointsMaterial({
            size: 0.3,
            vertexColors: true,
            transparent: true,
            opacity: 0.3
        });
        
        this.milkyWay = new THREE.Points(milkyWayGeometry, milkyWayMaterial);
        this.scene.add(this.milkyWay);
    }
    
    updateLightIntensity(intensity) {
        this.lightIntensity = Math.max(0, Math.min(100, intensity)); // Clamp between 0 and 100
        
        // Update the scene based on light pollution level
        // As light pollution increases, stars become less visible
        
        if (this.starField) {
            // Calculate star visibility based on light pollution
            const starVisibility = Math.max(0.1, 1 - (this.lightIntensity / 100));
            
            // Update star opacity
            const starMaterial = this.starField.material;
            starMaterial.opacity = starVisibility * 0.8;
        }
        
        if (this.milkyWay) {
            // Milky Way becomes completely invisible at high light pollution
            const milkyWayVisibility = Math.max(0, 1 - (this.lightIntensity / 70));
            this.milkyWay.material.opacity = milkyWayVisibility * 0.3;
        }
        
        // Update background color to reflect light pollution
        const baseColor = new THREE.Color(0x000011);
        const pollutionEffect = new THREE.Color(0x333322);
        const mixFactor = this.lightIntensity / 100;
        
        const mixedColor = new THREE.Color().lerpColors(baseColor, pollutionEffect, mixFactor);
        this.scene.background = mixedColor;
        this.renderer.setClearColor(mixedColor);
    }
    
    animate() {
        if (!this.isInitialized) return;
        
        this.animationId = requestAnimationFrame(() => this.animate());
        
        // Animate stars slightly for twinkling effect
        if (this.starField && this.milkyWay) {
            // Subtle rotation for celestial objects
            this.starField.rotation.y += 0.0005;
            this.milkyWay.rotation.y += 0.0002;
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
       window.removeEventListener('resize', this.handleResize);

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
        if (document.getElementById('light-3d-scene')) {
            new LightPollutionScene('light-3d-scene');
        }
    }, 100);
});