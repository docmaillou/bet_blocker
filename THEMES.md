# GambleGuard Themes

## Overview
GambleGuard now supports multiple themes to personalize your experience while maintaining the supportive and recovery-focused design.

## Available Themes

### 🔴 Red & White (Default)
- **Primary Colors**: Red (#dc3545) and White
- **Style**: Clean, medical-inspired design
- **Best For**: Professional, clinical feel

### 🔵 Blue & Purple  
- **Primary Colors**: Blue (#667eea) to Purple (#764ba2)
- **Style**: Calming gradient background
- **Best For**: Relaxing, peaceful atmosphere

### 🟢 Green & Teal
- **Primary Colors**: Green (#4CAF50) to Teal (#00BCD4)
- **Style**: Nature-inspired, growth-focused
- **Best For**: Positive, healing vibes

### 🌙 Dark Mode
- **Primary Colors**: Dark Blue (#2c3e50) to Slate (#34495e)
- **Style**: Easy on the eyes, modern
- **Best For**: Low-light environments, reduced eye strain

### 🌅 Sunset
- **Primary Colors**: Orange (#ff7e5f) to Peach (#feb47b)
- **Style**: Warm, optimistic gradient
- **Best For**: Uplifting, energetic feel

## How to Change Themes

1. **Open Extension Popup**: Click the GambleGuard icon in your browser toolbar
2. **Access Settings**: Click the "⚙️ Settings" button
3. **Select Theme**: Choose your preferred theme from the dropdown menu
4. **Save**: Click "Save Settings" to apply the theme

## Theme Features

- **Instant Application**: Themes are applied immediately after saving
- **Persistent**: Your theme choice is saved and will persist across browser sessions
- **Synchronized**: Themes sync across all your devices using Chrome sync
- **Block Page Support**: Themes apply to both the popup and the block page
- **Accessibility**: All themes maintain proper contrast ratios for readability

## Technical Details

### Files Involved
- `themes.css` - Contains all theme definitions
- `popup.html` - Updated with theme selector
- `popup.js` - Theme loading and saving logic
- `block.html` - Updated to support themes
- `manifest.json` - Updated to include themes.css as web accessible resource

### Storage
Themes are stored using Chrome's `chrome.storage.sync` API, ensuring they sync across devices.

### Default Behavior
If no theme is selected or if there's an error loading the theme, the extension defaults to the Red & White theme.

## Customization

The theme system is designed to be easily extensible. To add new themes:

1. Add new theme option to the select dropdown in `popup.html`
2. Define theme styles in `themes.css` using the naming convention `theme-{name}`
3. Themes automatically inherit base styles and only need to override specific colors

## Support

If you experience any issues with themes:
1. Try refreshing the extension by disabling and re-enabling it
2. Check the browser console for any error messages
3. Reset to default theme by selecting "Red & White" in settings
