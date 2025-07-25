// PEDS Launch Page - Micro-interactions & Loading Sequence
document.addEventListener('DOMContentLoaded', function() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    const loadingBar = document.querySelector('.loading-bar');
    const toolLinks = document.querySelectorAll('.tool-link');
    const mainTitle = document.querySelector('.main-title');
    
    // Loading sequence
    function initLoadingSequence() {
        // Animate loading bar
        setTimeout(() => {
            loadingBar.style.width = '100%';
        }, 100);
        
        // Hide loading overlay
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
        }, 1400);
    }
    
    // Tool link interactions
    toolLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const toolName = this.dataset.tool;
            
            // Subtle title interaction
            mainTitle.style.transform = 'scale(1.01)';
            mainTitle.style.letterSpacing = '-0.04em';
            
            // Create ripple effect on geometric fragments
            createRippleEffect(toolName);
        });
        
        link.addEventListener('mouseleave', function() {
            // Reset title
            mainTitle.style.transform = 'scale(1)';
            mainTitle.style.letterSpacing = '-0.05em';
        });
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const toolName = this.dataset.tool;
            
            // Subtle click feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Simulate tool navigation
            console.log(`Navigating to ${toolName} tool...`);
            
            // Add subtle transition effect
            document.body.style.opacity = '0.8';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 200);
        });
    });
    
    // Ripple effect on geometric fragments
    function createRippleEffect(toolName) {
        const fragments = document.querySelectorAll('.fragment');
        
        fragments.forEach((fragment, index) => {
            setTimeout(() => {
                fragment.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                fragment.style.opacity = '0.15';
                
                setTimeout(() => {
                    fragment.style.opacity = '0.08';
                }, 600);
            }, index * 100);
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const activeTool = document.querySelector('.tool-link:hover');
        
        if (e.key === 'Tab' && !activeTool) {
            e.preventDefault();
            toolLinks[0].focus();
        }
    });
    
    // Focus management
    toolLinks.forEach(link => {
        link.addEventListener('focus', function() {
            mainTitle.style.transform = 'scale(1.01)';
        });
        
        link.addEventListener('blur', function() {
            mainTitle.style.transform = 'scale(1)';
        });
    });
    
    // Initialize
    initLoadingSequence();
    
    // Subtle parallax on mouse move
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const fragments = document.querySelectorAll('.fragment');
        fragments.forEach((fragment, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 10;
            const y = (mouseY - 0.5) * speed * 10;
            
            fragment.style.transform += ` translate(${x}px, ${y}px)`;
        });
    });
    
    // Resize handler for responsive adjustments
    window.addEventListener('resize', function() {
        // Recalculate positions if needed
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            document.body.style.fontSize = '14px';
        } else {
            document.body.style.fontSize = '16px';
        }
    });
});

// Preload optimization
window.addEventListener('load', function() {
    // Ensure smooth transitions after load
    document.body.style.opacity = '1';
});
