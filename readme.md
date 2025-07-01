# GambleGuard Chrome Extension

A comprehensive Chrome extension designed to help individuals overcome gambling addiction by blocking access to betting websites and providing recovery support resources.

## Features

### 🛡️ Core Protection
- **Comprehensive Website Blocking**: Blocks major gambling sites including bet365, pokerstars, draftkings, fanduel, and many more
- **Custom Site Blocking**: Add your own problematic sites to the block list
- **Real-time Detection**: Monitors and blocks gambling content as you browse
- **Ad Blocking**: Removes gambling advertisements from web pages

### 📊 Recovery Tracking
- **Streak Counter**: Track your gambling-free days
- **Block Statistics**: See how many sites have been blocked
- **Progress Visualization**: Visual feedback on your recovery journey
- **Motivational Messages**: Daily encouragement and support

### 🆘 Support Resources
- **Emergency Support**: Quick access to crisis helplines and resources
- **Keyboard Shortcut**: Press Ctrl+Shift+H for instant emergency support
- **Recovery Resources**: Direct links to Gamblers Anonymous and other support organizations
- **Reflection Tools**: Guided questions to help process urges

### ⚙️ Advanced Features
- **Emergency Disable**: Temporary 1-hour disable with cooling-off period
- **Trusted Contact System**: Planned feature for accountability
- **Social Media Protection**: Detects and blocks gambling content on social platforms
- **Educational Content**: Differentiates between gambling content and educational/news articles

## Installation

### Method 1: Load as Unpacked Extension (Developer Mode)

1. **Download the Extension Files**
   - Save all the provided files in a folder named `gambleguard`
   - Required files:
     - `manifest.json`
     - `background.js`
     - `popup.html`
     - `popup.js`
     - `content.js`
     - `block.html`
     - `rules.json`

2. **Enable Developer Mode**
   - Open Chrome and go to `chrome://extensions/`
   - Toggle "Developer mode" in the top right corner

3. **Load the Extension**
   - Click "Load unpacked"
   - Select the `gambleguard` folder
   - The extension should appear in your extensions list

4. **Pin the Extension**
   - Click the puzzle piece icon in Chrome's toolbar
   - Pin GambleGuard for easy access

### Method 2: Create Extension Package

If you want to share with others or install more permanently:

1. **Package the Extension**
   - In `chrome://extensions/` with Developer mode on
   - Click "Pack extension"
   - Select the `gambleguard` folder
   - This creates a `.crx` file

2. **Install the Package**
   - Drag the `.crx` file to the `chrome://extensions/` page
   - Confirm installation

## File Structure

```
gambleguard/
├── manifest.json          # Extension configuration
├── background.js          # Service worker for blocking logic
├── popup.html            # Extension popup interface
├── popup.js              # Popup functionality
├── content.js            # Content script for page analysis
├── block.html            # Blocking page with support resources
├── rules.json            # Declarative blocking rules
└── icons/                # Extension icons (optional)
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## Usage

### First Time Setup
1. Click the GambleGuard icon in your toolbar
2. Review your current streak (starts at day 0)
3. Explore the available features and support resources
4. Optionally add custom sites to block

### Daily Use
- The extension works automatically in the background
- When you try to visit a gambling site, you'll see the block page instead
- Use the popup to track your progress and access support
- Press Ctrl+Shift+H anywhere for emergency support

### Adding Custom Sites
1. Click the GambleGuard icon
2. Click "Block Custom Site"
3. Enter the domain (e.g., "example.com")
4. The site will be added to your personal block list

### Emergency Situations
- If you're having strong urges, click "Get Support" for immediate resources
- The "Emergency Disable" feature provides a 1-hour window with cooling-off period
- Use Ctrl+Shift+H keyboard shortcut for instant crisis support

## Customization

### Adding More Gambling Sites
Edit the `GAMBLING_DOMAINS` array in `background.js`:

```javascript
const GAMBLING_DOMAINS = [
  'bet365.com',
  'your-custom-site.com',
  // Add more domains here
];
```

### Modifying Block Messages
Edit the content in `block.html` to customize:
- Motivational messages
- Support resources
- Reflection questions
- Visual design

### Adjusting Detection Sensitivity
Modify the `GAMBLING_KEYWORDS` and `GAMBLING_PATTERNS` arrays in `content.js` to change what content gets detected and blocked.

## Privacy & Security

- **No Data Collection**: GambleGuard only stores local statistics (blocked count, streak data)
- **No Tracking**: Your browsing history is not monitored or stored
- **Local Storage**: All data stays on your device
- **Open Source**: All code is transparent and can be reviewed

## Troubleshooting

### Extension Not Blocking Sites
1. Check that the extension is enabled in `chrome://extensions/`
2. Verify the site you're trying to block is in the domains list
3. Try adding it as a custom blocked site
4. Refresh the page after making changes

### Popup Not Working
1. Check for JavaScript errors in the browser console
2. Ensure all files are in the correct locations
3. Try reloading the extension

### False Positives
If legitimate sites are being blocked:
1. Check if the domain contains gambling keywords
2. Modify the detection patterns in `content.js`
3. Add the site to a whitelist (feature can be added)

## Support Resources

- **National Problem Gambling Helpline**: 1-800-522-4700
- **Gamblers Anonymous**: https://www.gamblersanonymous.org
- **Crisis Text Line**: Text HOME to 741741
- **National Suicide Prevention Lifeline**: 988

## Contributing

This extension is designed to be easily customizable. You can:
- Add new gambling sites to the block list
- Modify the user interface and styling
- Add new support resources
- Improve the detection algorithms
- Add new recovery tracking features

## License

This project is designed to help people overcome gambling addiction. Feel free to use, modify, and distribute this extension to help others in their recovery journey.

## Technical Details

### Permissions Explained
- **storage**: Store user preferences and statistics locally
- **tabs**: Monitor tab changes to detect gambling sites
- **activeTab**: Check content of the current tab
- **declarativeNetRequest**: Block gambling sites using Chrome's blocking API
- **host_permissions**: Access all URLs to detect gambling content

### Browser Compatibility
- Chrome 88+ (Manifest V3 support required)
- Edge 88+ (Chromium-based)
- Other Chromium browsers with Manifest V3 support

### Performance Impact
- Minimal memory usage (<10MB)
- Low CPU impact during normal browsing
- No network requests for basic functionality
- Efficient pattern matching for content detection

## Advanced Configuration

### Custom Blocking Rules
You can create more sophisticated blocking rules by editing `rules.json`. Examples:

```json
{
  "id": 100,
  "priority": 1,
  "action": {
    "type": "redirect",
    "redirect": {
      "extensionPath": "/block.html"
    }
  },
  "condition": {
    "regexFilter": ".*\\b(casino|gambling|betting)\\b.*",
    "resourceTypes": ["main_frame"]
  }
}
```

### Whitelist Implementation
To add a whitelist for educational or news sites, modify `background.js`:

```javascript
const WHITELIST_DOMAINS = [
  'wikipedia.org',
  'news.bbc.co.uk',
  'cnn.com'
];

function isWhitelistedSite(url) {
  const hostname = new URL(url).hostname;
  return WHITELIST_DOMAINS.some(domain => hostname.includes(domain));
}
```

### Custom Motivational Messages
Add your own motivational messages by editing the `messages` array in `popup.js`:

```javascript
const customMessages = [
  "Your custom motivational message here!",
  "Another encouraging message for recovery",
  "Personal affirmations work best"
];
```

## Recovery Integration

### Connecting with Therapists
The extension can be used in conjunction with professional therapy:
- Share statistics with your counselor
- Use reflection questions during sessions
- Track patterns in gambling urges
- Celebrate milestones together

### Support Group Integration
- Export streak data for group sharing
- Use blocked site count as discussion points
- Share recovery strategies with others
- Encourage group members to install

### Family Support
Family members can help by:
- Understanding how the extension works
- Providing encouragement during difficult moments
- Being available as emergency contacts
- Celebrating recovery milestones

## Frequently Asked Questions

### Q: Can I bypass the extension if I really want to gamble?
A: Yes, but it's designed with friction in mind. The emergency disable has a cooling-off period and shows strong warnings. The goal is to give you time to reconsider and seek support.

### Q: Will this slow down my browsing?
A: No, the extension is optimized for minimal performance impact. Most users won't notice any difference in browsing speed.

### Q: What if I accidentally block a legitimate site?
A: You can temporarily disable protection or add sites to a custom whitelist. Future versions will include easier whitelist management.

### Q: Does this extension work on mobile?
A: Currently, this is a Chrome extension for desktop. Mobile support would require separate development for iOS Safari and Android Chrome.

### Q: Can I use this with other blocking software?
A: Yes, GambleGuard can work alongside other blocking tools. Multiple layers of protection can be helpful in recovery.

### Q: What data does this extension collect?
A: Only local statistics like your streak counter and number of blocked sites. No personal browsing data is collected or transmitted.

## Roadmap

### Planned Features
- **Mobile companion app** for cross-device protection
- **Trusted contact system** for accountability
- **Advanced analytics** for understanding triggers
- **Community features** for peer support
- **Integration with treatment programs**
- **Machine learning** for improved detection
- **Cryptocurrency gambling** detection
- **Time-based restrictions** (e.g., block during vulnerable hours)

### Version History
- **v1.0.0**: Initial release with core blocking and support features

## Getting Help

### For Users
If you're struggling with gambling addiction:
- **Immediate Crisis**: Call 1-800-522-4700 or text HOME to 741741
- **Long-term Support**: Visit gamblersanonymous.org
- **Professional Help**: Consult with addiction counselors or therapists

### For Technical Issues
- Check the troubleshooting section above
- Review browser console for error messages
- Ensure all files are properly installed
- Try disabling other extensions that might conflict

### For Feature Requests
Consider what would help you most in your recovery journey:
- Additional blocking capabilities
- Better support resource integration
- Enhanced tracking and analytics
- Community and social features

## Important Disclaimers

- This extension is a tool to support recovery, not a complete treatment solution
- Professional help is recommended for gambling addiction
- The extension cannot block all possible gambling sites or content
- Users should combine this tool with other recovery strategies
- In crisis situations, always seek immediate professional help

## Acknowledgments

This extension is inspired by the courage of individuals working to overcome gambling addiction and the organizations that support them. Special recognition to:

- Gamblers Anonymous and their 12-step program
- National Council on Problem Gambling
- Crisis support organizations
- Addiction recovery professionals
- Open source community for Chrome extension resources

---

**Remember**: Recovery is a journey, not a destination. This tool is here to support you every step of the way. You are stronger than your addiction, and help is always available.