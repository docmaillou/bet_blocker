// GambleGuard Popup JavaScript

document.addEventListener('DOMContentLoaded', async () => {
    await loadStats();
    await loadTheme();
    setupEventListeners();
});

// Load and display statistics
async function loadStats() {
    try {
        const response = await chrome.runtime.sendMessage({ action: 'getStats' });

        // Update UI elements
        document.getElementById('streakDays').textContent = response.streakDays || 0;
        document.getElementById('blockedCount').textContent = response.blockedCount || 0;

        // Show last blocked site info
        if (response.lastBlockedSite && response.lastBlockTime) {
            const timeDiff = Date.now() - response.lastBlockTime;
            const hoursAgo = Math.floor(timeDiff / (1000 * 60 * 60));
            const lastBlockedText = hoursAgo < 1 ?
                `Last blocked: ${response.lastBlockedSite} (just now)` :
                `Last blocked: ${response.lastBlockedSite} (${hoursAgo}h ago)`;
            document.getElementById('lastBlocked').textContent = lastBlockedText;
        }

        // Update motivational message based on streak
        updateMotivationalMessage(response.streakDays || 0);

    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Update motivational message based on streak
function updateMotivationalMessage(streakDays) {
    let message;
    if (streakDays === 0) {
        message = "Starting your journey to freedom! You've got this! 🚀";
    } else if (streakDays < 7) {
        message = `${streakDays} days strong! Building momentum! 🔥`;
    } else if (streakDays < 30) {
        message = `${streakDays} days! You're developing real strength! 💎`;
    } else {
        message = `${streakDays} days! You're a recovery champion! 👑`;
    }

    document.getElementById('motivationalMessage').textContent = message;
}

// Setup event listeners
function setupEventListeners() {
    // Protection toggle
    document.getElementById('protectionToggle').addEventListener('click', toggleProtection);

    // Support button
    document.getElementById('supportBtn').addEventListener('click', () => {
        showModal('supportModal');
    });

    // Add site button
    document.getElementById('addSiteBtn').addEventListener('click', () => {
        showModal('addSiteModal');
    });

    // View blocked sites
    document.getElementById('viewBlockedBtn').addEventListener('click', showBlockedSites);

    // Theme button
    document.getElementById('themeBtn').addEventListener('click', () => {
        showModal('themeModal');
    });

    // Emergency disable
    document.getElementById('emergencyBtn').addEventListener('click', () => {
        showModal('emergencyModal');
    });

    // Modal controls
    document.getElementById('cancelEmergency').addEventListener('click', () => {
        hideModal('emergencyModal');
    });

    document.getElementById('confirmEmergency').addEventListener('click', confirmEmergencyDisable);

    document.getElementById('cancelAddSite').addEventListener('click', () => {
        hideModal('addSiteModal');
    });

    document.getElementById('confirmAddSite').addEventListener('click', addCustomSite);

    document.getElementById('closeSupportModal').addEventListener('click', () => {
        hideModal('supportModal');
    });

    // Theme modal controls
    document.getElementById('cancelTheme').addEventListener('click', () => {
        hideModal('themeModal');
    });

    document.getElementById('saveTheme').addEventListener('click', saveTheme);

    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// Toggle protection on/off
async function toggleProtection() {
    const toggle = document.getElementById('protectionToggle');
    const isActive = toggle.classList.contains('active');

    if (isActive) {
        // Show warning before disabling
        showModal('emergencyModal');
    } else {
        // Enable protection
        await chrome.runtime.sendMessage({
            action: 'updateSettings',
            settings: { isEnabled: true }
        });
        toggle.classList.add('active');
    }
}

// Confirm emergency disable
async function confirmEmergencyDisable() {
    try {
        // Disable protection temporarily
        await chrome.runtime.sendMessage({
            action: 'updateSettings',
            settings: {
                isEnabled: false,
                emergencyDisableTime: Date.now(),
                emergencyDisableDuration: 60 * 60 * 1000 // 1 hour
            }
        });

        // Update UI
        document.getElementById('protectionToggle').classList.remove('active');
        hideModal('emergencyModal');

        // Show warning message
        alert('Protection disabled for 1 hour. Please reach out for support if you need it.');

        // Set timer to re-enable
        setTimeout(async () => {
            await chrome.runtime.sendMessage({
                action: 'updateSettings',
                settings: { isEnabled: true }
            });
            document.getElementById('protectionToggle').classList.add('active');
        }, 60 * 60 * 1000); // 1 hour

    } catch (error) {
        console.error('Error disabling protection:', error);
    }
}

// Add custom site to block list
async function addCustomSite() {
    const siteInput = document.getElementById('customSite');
    const site = siteInput.value.trim().toLowerCase();

    if (!site) {
        alert('Please enter a valid domain name.');
        return;
    }

    // Remove protocol if present
    const cleanSite = site.replace(/^https?:\/\//, '').replace(/^www\./, '');

    try {
        await chrome.runtime.sendMessage({
            action: 'addCustomSite',
            site: cleanSite
        });

        siteInput.value = '';
        hideModal('addSiteModal');
        alert(`Added ${cleanSite} to blocked sites list.`);

    } catch (error) {
        console.error('Error adding custom site:', error);
        alert('Error adding site to block list.');
    }
}

// Show blocked sites
async function showBlockedSites() {
    try {
        const response = await chrome.runtime.sendMessage({ action: 'getStats' });
        const customSites = response.customBlockedSites || [];

        if (customSites.length === 0) {
            alert('No custom blocked sites added yet.');
        } else {
            const sitesList = customSites.join('\n• ');
            alert(`Custom Blocked Sites:\n• ${sitesList}`);
        }

    } catch (error) {
        console.error('Error getting blocked sites:', error);
    }
}

// Show modal
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

// Hide modal
function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Load and apply saved theme
async function loadTheme() {
    try {
        const result = await chrome.storage.sync.get(['selectedTheme']);
        const theme = result.selectedTheme || 'red';

        // Apply theme to body
        document.body.className = `theme-${theme}`;

        // Update theme selector
        const themeSelect = document.getElementById('themeSelect');
        if (themeSelect) {
            themeSelect.value = theme;
        }

    } catch (error) {
        console.error('Error loading theme:', error);
        // Default to red theme
        document.body.className = 'theme-red';
    }
}

// Save theme
async function saveTheme() {
    try {
        const themeSelect = document.getElementById('themeSelect');
        const selectedTheme = themeSelect.value;

        // Save theme to storage
        await chrome.storage.sync.set({ selectedTheme: selectedTheme });

        // Apply theme immediately
        document.body.className = `theme-${selectedTheme}`;

        // Hide modal
        hideModal('themeModal');

        // Show confirmation
        showTemporaryMessage('Theme applied! 🎨');

    } catch (error) {
        console.error('Error saving theme:', error);
        alert('Error applying theme. Please try again.');
    }
}

// Show temporary success message
function showTemporaryMessage(message) {
    // Create temporary message element
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #4CAF50;
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 10000;
        animation: fadeInOut 3s ease-in-out;
    `;

    // Add animation keyframes
    if (!document.getElementById('temp-message-styles')) {
        const style = document.createElement('style');
        style.id = 'temp-message-styles';
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                20% { opacity: 1; transform: translateX(-50%) translateY(0); }
                80% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(messageEl);

    // Remove message after animation
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.parentNode.removeChild(messageEl);
        }
    }, 3000);
}

// Auto-refresh stats every 30 seconds
setInterval(loadStats, 30000);