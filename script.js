// PEDS Launch Page - Enhanced with Section Transitions
document.addEventListener('DOMContentLoaded', function() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    const loadingBar = document.querySelector('.loading-bar');
    const toolLinks = document.querySelectorAll('.tool-link');
    const mainTitle = document.querySelector('.main-title');
    const container = document.querySelector('.container');
    const sectionContainers = document.querySelectorAll('.section-container');
    const backButtons = document.querySelectorAll('.back-button');
    const fragments = document.querySelectorAll('.fragment');
    
    let currentSection = null;
    
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
    
    // Enhanced tool link interactions
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
            
            // Enhanced click feedback with transition
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                navigateToSection(toolName);
            }, 150);
        });
    });
    
    // Section navigation
    function navigateToSection(sectionName) {
        const targetSection = document.querySelector(`[data-section="${sectionName}"]`);
        if (!targetSection) return;
        
        currentSection = sectionName;
        
        // Add transitioning state
        container.classList.add('transitioning');
        
        // Animate geometric fragments to new positions
        animateFragmentsForSection(sectionName);
        
        // Fade out main interface
        setTimeout(() => {
            targetSection.classList.add('active');
            
            // Reset container state
            setTimeout(() => {
                container.classList.remove('transitioning');
            }, 600);
        }, 300);
    }
    
    // Back to main view
    function navigateBack() {
        if (!currentSection) return;
        
        const activeSection = document.querySelector('.section-container.active');
        if (activeSection) {
            activeSection.classList.remove('active');
            
            // Reset fragments to original positions
            resetFragments();
            
            // Clear current section
            currentSection = null;
        }
    }
    
    // Enhanced ripple effect
    function createRippleEffect(toolName) {
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
    
    // Animate fragments for specific sections
    function animateFragmentsForSection(sectionName) {
        const sectionPositions = {
            analyze: [
                { top: '10%', left: '5%', transform: 'rotate(-45deg) scale(1.2)' },
                { top: '15%', right: '10%', transform: 'rotate(30deg) scale(0.8)' },
                { top: '80%', left: '15%', transform: 'rotate(60deg) scale(1.1)' },
                { top: '75%', right: '20%', transform: 'rotate(-30deg) scale(0.9)' }
            ],
            build: [
                { top: '20%', left: '15%', transform: 'rotate(15deg) scale(1.3)' },
                { top: '25%', right: '5%', transform: 'rotate(-25deg) scale(0.7)' },
                { top: '70%', left: '5%', transform: 'rotate(45deg) scale(1.2)' },
                { top: '65%', right: '15%', transform: 'rotate(-15deg) scale(0.8)' }
            ],
            optimize: [
                { top: '15%', left: '10%', transform: 'rotate(25deg) scale(1.1)' },
                { top: '20%', right: '15%', transform: 'rotate(-35deg) scale(0.9)' },
                { top: '75%', left: '20%', transform: 'rotate(55deg) scale(1.3)' },
                { top: '70%', right: '10%', transform: 'rotate(-45deg) scale(0.7)' }
            ],
            transform: [
                { top: '25%', left: '20%', transform: 'rotate(-55deg) scale(1.4)' },
                { top: '30%', right: '5%', transform: 'rotate(45deg) scale(0.6)' },
                { top: '65%', left: '10%', transform: 'rotate(75deg) scale(1.2)' },
                { top: '60%', right: '25%', transform: 'rotate(-65deg) scale(0.8)' }
            ]
        };
        
        const positions = sectionPositions[sectionName] || [];
        
        fragments.forEach((fragment, index) => {
            if (positions[index]) {
                Object.assign(fragment.style, positions[index]);
                fragment.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
                fragment.style.opacity = '0.12';
            }
        });
    }
    
    // Reset fragments to original positions
    function resetFragments() {
        fragments.forEach((fragment, index) => {
            fragment.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            fragment.style.opacity = '0.08';
            
            // Reset to original positions based on index
            switch(index) {
                case 0:
                    fragment.style.top = '25%';
                    fragment.style.left = '10%';
                    fragment.style.right = '';
                    fragment.style.bottom = '';
                    fragment.style.transform = 'rotate(-15deg)';
                    break;
                case 1:
                    fragment.style.top = '70%';
                    fragment.style.right = '15%';
                    fragment.style.left = '';
                    fragment.style.bottom = '';
                    fragment.style.transform = 'rotate(25deg)';
                    break;
                case 2:
                    fragment.style.top = '20%';
                    fragment.style.right = '30%';
                    fragment.style.left = '';
                    fragment.style.bottom = '';
                    fragment.style.transform = 'rotate(45deg)';
                    break;
                case 3:
                    fragment.style.bottom = '20%';
                    fragment.style.left = '20%';
                    fragment.style.top = '';
                    fragment.style.right = '';
                    fragment.style.transform = 'rotate(0deg)';
                    break;
            }
        });
    }
    
    // Back button handlers
    backButtons.forEach(button => {
        button.addEventListener('click', navigateBack);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const activeTool = document.querySelector('.tool-link:hover');
        
        if (e.key === 'Tab' && !activeTool) {
            e.preventDefault();
            toolLinks[0].focus();
        } else if (e.key === 'Escape' && currentSection) {
            navigateBack();
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
    
    // Entry point interactions
    document.querySelectorAll('.entry-point').forEach(entry => {
        entry.addEventListener('click', function() {
            // Add click feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Here you could navigate to deeper functionality
            console.log('Entry point clicked:', this.querySelector('h3').textContent);
        });
    });
    
    // Enhanced parallax on mouse move
    document.addEventListener('mousemove', function(e) {
        if (currentSection) return; // Disable parallax when in section view
        
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        fragments.forEach((fragment, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 10;
            const y = (mouseY - 0.5) * speed * 10;
            
            // Only apply parallax if not in transition
            if (!container.classList.contains('transitioning')) {
                const baseTransform = fragment.style.transform.split('translate')[0] || '';
                fragment.style.transform = baseTransform + ` translate(${x}px, ${y}px)`;
            }
        });
    });
    
    // Initialize
    initLoadingSequence();
    
    // Resize handler for responsive adjustments
    window.addEventListener('resize', function() {
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
    document.body.style.opacity = '1';
});
