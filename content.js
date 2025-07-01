// BetBlocker Content Script

// Gambling-related keywords for additional detection
const GAMBLING_KEYWORDS = [
    'bet', 'casino', 'poker', 'slots', 'gambling', 'wager',
    'jackpot', 'lottery', 'roulette', 'blackjack', 'baccarat',
    'craps', 'sportsbook', 'odds', 'stake', 'punt'
];

// Social media gambling content patterns
const GAMBLING_PATTERNS = [
    /\b(bet|betting|gambl|casino|poker|slots)\b/i,
    /\b(odds|stake|wager|jackpot|lottery)\b/i,
    /\$\d+.*\b(bet|win|lose|odds)\b/i,
    /#(gambling|casino|poker|betting|slots)/i
];

// Initialize content script
(function () {
    'use strict';

    // Check if protection is enabled
    checkProtectionStatus();

    // Monitor for dynamically loaded gambling content
    observePageChanges();

    // Check current page for gambling content
    scanPageContent();
})();

// Check if protection is currently enabled
async function checkProtectionStatus() {
    try {
        const result = await chrome.storage.local.get(['isEnabled', 'emergencyDisableTime', 'emergencyDisableDuration']);

        // Check if emergency disable is active
        if (result.emergencyDisableTime && result.emergencyDisableDuration) {
            const disableEndTime = result.emergencyDisableTime + result.emergencyDisableDuration;
            if (Date.now() < disableEndTime) {
                // Still in emergency disable period
                return false;
            } else {
                // Emergency disable period expired, re-enable
                await chrome.storage.local.set({
                    isEnabled: true,
                    emergencyDisableTime: null,
                    emergencyDisableDuration: null
                });
            }
        }

        return result.isEnabled !== false; // Default to enabled
    } catch (error) {
        console.error('Error checking protection status:', error);
        return true; // Default to enabled on error
    }
}

// Scan page content for gambling-related material
function scanPageContent() {
    const pageText = document.body.innerText.toLowerCase();
    const pageTitle = document.title.toLowerCase();
    const metaDescription = getMetaDescription().toLowerCase();

    // Combine all text content
    const allContent = `${pageText} ${pageTitle} ${metaDescription}`;

    // Check for gambling patterns
    const hasGamblingContent = GAMBLING_PATTERNS.some(pattern =>
        pattern.test(allContent)
    );

    if (hasGamblingContent) {
        // Additional checks to avoid false positives
        if (!isLegitimateFinancialSite() && !isNewsOrEducationalContent()) {
            logGamblingContentDetected();
        }
    }

    // Scan for gambling advertisements
    scanForGamblingAds();
}

// Get meta description
function getMetaDescription() {
    const metaDesc = document.querySelector('meta[name="description"]');
    return metaDesc ? metaDesc.getAttribute('content') || '' : '';
}

// Check if site is legitimate financial service
function isLegitimateFinancialSite() {
    const legitimateFinancialDomains = [
        'bank', 'credit', 'invest', 'finance', 'payment', 'paypal',
        'stripe', 'square', 'visa', 'mastercard', 'amex'
    ];

    const hostname = window.location.hostname.toLowerCase();
    return legitimateFinancialDomains.some(domain => hostname.includes(domain));
}

// Check if content is news or educational
function isNewsOrEducationalContent() {
    const newsEducationalDomains = [
        'news', 'edu', 'wikipedia', 'bbc', 'cnn', 'reuters',
        'nytimes', 'guardian', 'academic', 'research'
    ];

    const hostname = window.location.hostname.toLowerCase();
    return newsEducationalDomains.some(domain => hostname.includes(domain));
}

// Log gambling content detection
function logGamblingContentDetected() {
    console.log('GambleGuard: Potential gambling content detected on', window.location.hostname);

    // Could be used for future features like warnings or blocking
    // For now, just log for monitoring purposes
}

// Scan for gambling advertisements
function scanForGamblingAds() {
    // Common ad containers and classes
    const adSelectors = [
        '[class*="ad"]', '[id*="ad"]', '.advertisement', '.sponsored',
        '[class*="banner"]', '[class*="promo"]', '.sidebar', '.widget'
    ];

    adSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (containsGamblingContent(element)) {
                hideGamblingAd(element);
            }
        });
    });
}

// Check if element contains gambling content
function containsGamblingContent(element) {
    const text = element.innerText.toLowerCase();
    const html = element.innerHTML.toLowerCase();

    return GAMBLING_KEYWORDS.some(keyword =>
        text.includes(keyword) || html.includes(keyword)
    ) || GAMBLING_PATTERNS.some(pattern =>
        pattern.test(text) || pattern.test(html)
    );
}

// Hide gambling advertisement
function hideGamblingAd(element) {
    element.style.display = 'none';

    // Add a replacement message
    const replacement = document.createElement('div');
    replacement.style.cssText = `
        padding: 10px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 8px;
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        margin: 5px 0;
    `;
    replacement.innerHTML = '🛡️ BetBlocker: Gambling ad blocked';

    element.parentNode.insertBefore(replacement, element);

    console.log('BetBlocker: Blocked gambling advertisement');
}

// Observe page changes for dynamically loaded content
function observePageChanges() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Check new content for gambling ads
                        if (containsGamblingContent(node)) {
                            hideGamblingAd(node);
                        }

                        // Scan child elements
                        const childAds = node.querySelectorAll('[class*="ad"], [id*="ad"], .advertisement');
                        childAds.forEach(ad => {
                            if (containsGamblingContent(ad)) {
                                hideGamblingAd(ad);
                            }
                        });
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Listen for messages from popup or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
        case 'checkGamblingContent':
            scanPageContent();
            sendResponse({ detected: true });
            break;

        case 'getPageInfo':
            sendResponse({
                url: window.location.href,
                title: document.title,
                hasGamblingContent: checkCurrentPageForGambling()
            });
            break;
    }
});

// Check current page for gambling content
function checkCurrentPageForGambling() {
    const pageText = document.body.innerText.toLowerCase();
    const pageTitle = document.title.toLowerCase();

    return GAMBLING_PATTERNS.some(pattern =>
        pattern.test(pageText) || pattern.test(pageTitle)
    );
}

// Add keyboard shortcut for emergency support
document.addEventListener('keydown', (event) => {
    // Ctrl+Shift+H for emergency help
    if (event.ctrlKey && event.shiftKey && event.key === 'H') {
        event.preventDefault();
        showEmergencySupport();
    }
});

// Show emergency support overlay
function showEmergencySupport() {
    // Create emergency support overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    overlay.innerHTML = `
        <div style="
            background: white;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            max-width: 400px;
            color: #333;
        ">
            <h2 style="color: #e74c3c; margin-bottom: 20px;">🆘 Emergency Support</h2>
            <p style="margin-bottom: 20px;">If you're struggling with gambling urges right now:</p>
            <div style="margin-bottom: 20px;">
                <strong>National Problem Gambling Helpline:</strong><br>
                <a href="tel:1-800-522-4700" style="color: #27ae60; font-size: 18px;">1-800-522-4700</a>
            </div>
            <div style="margin-bottom: 20px;">
                <strong>Crisis Text Line:</strong><br>
                <span style="color: #27ae60;">Text HOME to 741741</span>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: #3498db;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
            ">Close</button>
        </div>
    `;

    document.body.appendChild(overlay);

    // Auto-remove after 30 seconds
    setTimeout(() => {
        if (overlay.parentNode) {
            overlay.remove();
        }
    }, 30000);
}