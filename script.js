// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeDemoControls();
    initializePracticeArea();
    initializeChallenges();
    addHoverEffects();
});

// Navigation functionality
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.getAttribute('data-section');
            
            // Update active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });
}

// Demo controls functionality
function initializeDemoControls() {
    const demoButtons = document.querySelectorAll('.demo-btn');
    const demoElements = document.querySelectorAll('.demo-element');

    demoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selector = button.getAttribute('data-selector');
            
            // Reset all elements
            demoElements.forEach(element => {
                element.classList.remove('selected');
            });
            
            // Apply selector
            if (selector === '*') {
                demoElements.forEach(element => {
                    element.classList.add('selected');
                });
            } else {
                const selectedElements = document.querySelectorAll(selector);
                selectedElements.forEach(element => {
                    if (demoElements.includes(element)) {
                        element.classList.add('selected');
                    }
                });
            }
            
            // Add success animation
            button.classList.add('success');
            setTimeout(() => {
                button.classList.remove('success');
            }, 600);
        });
    });
}

// Practice area functionality
function initializePracticeArea() {
    const selectorInput = document.getElementById('selector-input');
    const testButton = document.getElementById('test-selector');
    const practiceItems = document.querySelectorAll('.practice-item');

    testButton.addEventListener('click', () => {
        const selector = selectorInput.value.trim();
        
        if (!selector) {
            showNotification('Please enter a selector!', 'error');
            return;
        }
        
        // Reset all items
        practiceItems.forEach(item => {
            item.classList.remove('highlighted');
        });
        
        try {
            // Test the selector
            const selectedElements = document.querySelectorAll(selector);
            let foundInPractice = false;
            
            selectedElements.forEach(element => {
                if (practiceItems.includes(element)) {
                    element.classList.add('highlighted');
                    foundInPractice = true;
                }
            });
            
            if (foundInPractice) {
                showNotification(`Found ${selectedElements.length} matching element(s)!`, 'success');
                selectorInput.classList.add('success');
                setTimeout(() => {
                    selectorInput.classList.remove('success');
                }, 600);
            } else {
                showNotification('Selector is valid but no matching elements found in practice area.', 'info');
            }
            
        } catch (error) {
            showNotification('Invalid selector! Please check your syntax.', 'error');
            selectorInput.classList.add('error');
            setTimeout(() => {
                selectorInput.classList.remove('error');
            }, 600);
        }
    });

    // Allow Enter key to test selector
    selectorInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            testButton.click();
        }
    });
}

// Challenges functionality
function initializeChallenges() {
    const solutionButtons = document.querySelectorAll('.show-solution');
    const selectorInput = document.getElementById('selector-input');

    solutionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const challenge = button.closest('.challenge');
            const targetSelector = challenge.getAttribute('data-target');
            
            // Fill in the selector input
            selectorInput.value = targetSelector;
            
            // Test the selector automatically
            document.getElementById('test-selector').click();
            
            // Add visual feedback
            button.textContent = 'Solution Applied!';
            button.style.background = '#4caf50';
            
            setTimeout(() => {
                button.textContent = 'Show Solution';
                button.style.background = '';
            }, 2000);
        });
    });
}

// Hover effects for interactive elements
function addHoverEffects() {
    // Add hover effects to practice items
    const practiceItems = document.querySelectorAll('.practice-item');
    practiceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (!item.classList.contains('highlighted')) {
                item.style.transform = 'scale(1.05)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (!item.classList.contains('highlighted')) {
                item.style.transform = 'scale(1)';
            }
        });
    });

    // Add hover effects to demo elements
    const demoElements = document.querySelectorAll('.demo-element');
    demoElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (!element.classList.contains('selected')) {
                element.style.transform = 'scale(1.05)';
            }
        });
        
        element.addEventListener('mouseleave', () => {
            if (!element.classList.contains('selected')) {
                element.style.transform = 'scale(1)';
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)';
            break;
        case 'info':
        default:
            notification.style.background = 'linear-gradient(135deg, #2196f3, #1976d2)';
            break;
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Enhanced selector validation
function validateSelector(selector) {
    try {
        document.querySelector(selector);
        return true;
    } catch (e) {
        return false;
    }
}

// Add some educational tips
const tips = [
    "💡 Tip: Use [attribute] to select elements that have a specific attribute",
    "💡 Tip: Use [attribute='value'] for exact value matching",
    "💡 Tip: Use [attribute*='value'] to match any part of the value",
    "💡 Tip: Use [attribute^='value'] to match the beginning of the value",
    "💡 Tip: Use [attribute$='value'] to match the end of the value",
    "💡 Tip: Add 'i' for case-insensitive matching: [attribute*='value' i]"
];

// Show random tip every 30 seconds
setInterval(() => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    showNotification(randomTip, 'info');
}, 30000);

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to test selector
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const selectorInput = document.getElementById('selector-input');
        if (document.activeElement === selectorInput) {
            document.getElementById('test-selector').click();
        }
    }
    
    // Escape to clear selector input
    if (e.key === 'Escape') {
        const selectorInput = document.getElementById('selector-input');
        selectorInput.value = '';
        document.querySelectorAll('.practice-item').forEach(item => {
            item.classList.remove('highlighted');
        });
    }
});

// Add tooltips for better UX
function addTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = element.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 0.9rem;
                z-index: 1000;
                pointer-events: none;
                white-space: nowrap;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        });
        
        element.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Initialize tooltips
addTooltips();

// Add progress tracking
let completedChallenges = 0;
const totalChallenges = document.querySelectorAll('.challenge').length;

function updateProgress() {
    completedChallenges++;
    const progress = Math.round((completedChallenges / totalChallenges) * 100);
    
    if (progress === 100) {
        showNotification('🎉 Congratulations! You\'ve completed all challenges!', 'success');
    } else if (progress % 25 === 0) {
        showNotification(`🎯 Great progress! ${progress}% complete!`, 'success');
    }
}

// Track challenge completions
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('show-solution')) {
        setTimeout(updateProgress, 1000);
    }
}); 