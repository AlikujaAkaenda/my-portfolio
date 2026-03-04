// ===== WATER DROPLET EFFECTS =====

function initializeWaterEffects() {
    createWaterContainers();
    generateDroplets();
    generateSlidingDroplets();
    generateRainDrops();
}

function createWaterContainers() {
    // Main droplets container
    const dropletsContainer = document.createElement('div');
    dropletsContainer.className = 'water-droplets';
    dropletsContainer.id = 'water-droplets';
    document.body.appendChild(dropletsContainer);
    
    // Condensation layer
    const condensation = document.createElement('div');
    condensation.className = 'condensation';
    document.body.appendChild(condensation);
    
    // Rain container
    const rainContainer = document.createElement('div');
    rainContainer.className = 'rain-container';
    rainContainer.id = 'rain-container';
    document.body.appendChild(rainContainer);
}

function generateDroplets() {
    const container = document.getElementById('water-droplets');
    if (!container) return;
    
    setInterval(() => {
        const droplet = document.createElement('div');
        droplet.className = 'droplet';
        
        // Random size between 5-15px
        const size = Math.random() * 10 + 5;
        droplet.style.width = size + 'px';
        droplet.style.height = size + 'px';
        
        // Random position
        droplet.style.left = Math.random() * 100 + '%';
        droplet.style.top = '-20px';
        
        // Random duration between 2-5 seconds
        const duration = Math.random() * 3 + 2;
        droplet.style.animationDuration = duration + 's';
        
        container.appendChild(droplet);
        
        // Create ripple effect when droplet reaches bottom
        setTimeout(() => {
            createRipple(droplet.style.left);
            droplet.remove();
        }, duration * 1000);
        
    }, 800); // New droplet every 800ms
}

function generateSlidingDroplets() {
    const container = document.getElementById('water-droplets');
    if (!container) return;
    
    setInterval(() => {
        const droplet = document.createElement('div');
        droplet.className = 'sliding-droplet';
        
        // Random position
        droplet.style.left = Math.random() * 100 + '%';
        droplet.style.top = '-20px';
        
        // Random duration between 3-6 seconds
        const duration = Math.random() * 3 + 3;
        droplet.style.animationDuration = duration + 's';
        
        // Random delay
        const delay = Math.random() * 2;
        droplet.style.animationDelay = delay + 's';
        
        container.appendChild(droplet);
        
        setTimeout(() => {
            droplet.remove();
        }, (duration + delay) * 1000);
        
    }, 1500); // New sliding droplet every 1.5 seconds
}

function generateRainDrops() {
    const container = document.getElementById('rain-container');
    if (!container || window.innerWidth <= 768) return; // Skip on mobile
    
    // Create initial rain drops
    for (let i = 0; i < 30; i++) {
        createRainDrop(container);
    }
    
    // Continuously add rain drops
    setInterval(() => {
        if (container.children.length < 50) {
            createRainDrop(container);
        }
    }, 200);
}

function createRainDrop(container) {
    const drop = document.createElement('div');
    drop.className = 'rain-drop';
    
    // Random position
    drop.style.left = Math.random() * 100 + '%';
    drop.style.top = '-50px';
    
    // Random duration between 1-2 seconds
    const duration = Math.random() * 1 + 1;
    drop.style.animationDuration = duration + 's';
    
    // Random delay
    const delay = Math.random() * 2;
    drop.style.animationDelay = delay + 's';
    
    container.appendChild(drop);
    
    setTimeout(() => {
        drop.remove();
    }, (duration + delay) * 1000);
}

function createRipple(leftPosition) {
    const container = document.getElementById('water-droplets');
    if (!container) return;
    
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = leftPosition;
    ripple.style.bottom = '0';
    
    container.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 1000);
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWaterEffects);
} else {
    initializeWaterEffects();
}
