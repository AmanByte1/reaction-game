# 🚀 Quick Setup & Integration Guide

## ⚡ Quick Start (2 minutes)

```bash
# 1. Navigate to project
cd reaction-game-enhanced

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# Visit: http://localhost:5173
```

## 📋 What You Have

✅ **100 fully configurable mini-games**
✅ **7 game categories** with automatic organization
✅ **Mobile-optimized** responsive design
✅ **Dark mode UI** with purple/cyan theme
✅ **Persistent leaderboards** using localStorage
✅ **Sound effects** (toggleable)
✅ **Search and filter** functionality
✅ **100% domain-ready** architecture

## 🔗 Domain Integration Steps

### Step 1: Update Domain Links
Edit `src/gamesLibrary.js` and add your domain configuration:

```javascript
// At the top of gamesLibrary.js, add:
export const DOMAIN_CONFIG = {
  domain: 'your-domain.com',
  apiUrl: 'https://api.your-domain.com',
  assetsUrl: 'https://assets.your-domain.com',
  authToken: 'your_token_here'
};
```

### Step 2: Connect to Your Backend
Update `src/gameUtils.js` to connect your API:

```javascript
// Add API integration
export const fetchLeaderboard = async (gameId) => {
  const response = await fetch(`${DOMAIN_CONFIG.apiUrl}/leaderboard/${gameId}`);
  return response.json();
};

export const saveRemoteScore = async (gameId, score) => {
  await fetch(`${DOMAIN_CONFIG.apiUrl}/scores`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${DOMAIN_CONFIG.authToken}` },
    body: JSON.stringify({ gameId, score, timestamp: new Date() })
  });
};
```

### Step 3: Deploy to Your Server
```bash
# Build production version
npm run build

# Contents of 'dist/' folder ready for upload
# Upload to your domain's public directory
```

## 🎮 Adding More Games

### To Add a New Game:

1. **Add to Library** (`src/gamesLibrary.js`):
```javascript
{
  id: 'my-game-id',
  label: '🎮 My Game Name',
  category: 'Reaction',  // or Action, Puzzle, etc.
  emoji: '🎮',
  description: 'Brief game description'
}
```

2. **Create Game Component** (`src/MyGame.jsx`):
```javascript
import { useCallback, useState } from 'react';

export default function MyGame({ onBack }) {
  const [gameState, setGameState] = useState('idle');
  
  return (
    <div className="container">
      {onBack && (
        <button className="back-btn" onClick={onBack}>
          ← Back to Games
        </button>
      )}
      {/* Your game UI here */}
    </div>
  );
}
```

3. **Register in App.jsx**:
```javascript
import MyGame from './MyGame';

// In the game selection logic
if (currentGame === 'my-game-id') {
  return <MyGame onBack={handleBackToMenu} />;
}
```

## 🎨 Customization

### Change Color Scheme
Edit `src/style.css` CSS variables:

```css
:root {
  --primary-color: #7c3aed;      /* Change this */
  --secondary-color: #0ea5e9;    /* Change this */
  --dark-bg: #0f172a;            /* Change this */
  --card-bg: #1e293b;            /* Change this */
  /* ... etc ... */
}
```

### Modify Game Grid
Edit games per row in `src/style.css`:

```css
.games-grid {
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  /* Change 150px to your desired width */
}
```

### Add Your Logo
Edit `src/GameCatalog.jsx` header section:

```jsx
<header className="catalog-header">
  <div className="header-top">
    <img src="/your-logo.png" alt="Logo" style={{ height: '50px' }} />
    <h1>🎮 Your Arcade Name</h1>
  </div>
</header>
```

## 📊 File Structure Reference

```
src/
├── App.jsx              ← Main router between catalog & games
├── GameCatalog.jsx      ← Game selection menu (landing page)
├── ReactionGame.jsx     ← Reaction test game component
├── BoxCatchGame.jsx     ← Box catch game component
├── gamesLibrary.js      ← 100 games database (MODIFY THIS)
├── gameUtils.js         ← Utility functions & sound
├── style.css            ← All styling (CUSTOMIZE THIS)
└── main.jsx             ← React entry point
```

## 🔌 API Integration Checklist

- [ ] Update `DOMAIN_CONFIG` in `gamesLibrary.js`
- [ ] Add API endpoints to `gameUtils.js`
- [ ] Connect authentication if needed
- [ ] Test localStorage vs remote sync
- [ ] Set up CORS if cross-domain
- [ ] Configure API rate limiting
- [ ] Add error handling for failed requests

## 📱 Mobile Testing

Test on different devices:

```bash
# iOS/Safari
# Android/Chrome
# Desktop browsers

# Or use:
npm run build
# Then serve the dist/ folder locally
```

## 🚨 Common Issues

### Problem: Games not loading
**Solution**: Check browser console (F12), ensure localStorage is enabled

### Problem: Styles not applying
**Solution**: Clear browser cache, try incognito mode

### Problem: Touch not working
**Solution**: Check device orientation, test with another device

### Problem: API requests failing
**Solution**: Check CORS headers, verify API endpoint, check auth token

## 📈 Performance Tips

1. **Lazy load games** - Load components only when clicked
2. **Compress images** - Keep asset sizes small
3. **Minify CSS/JS** - Vite does this automatically
4. **Use CDN** - Serve static assets from CDN
5. **Enable caching** - Set proper cache headers

## 🔐 Security Notes

- ⚠️ Don't expose API tokens in frontend code
- ⚠️ Validate all scores on backend
- ⚠️ Use HTTPS for production
- ⚠️ Implement rate limiting on API
- ⚠️ Store sensitive data server-side only

## 📞 Support Commands

```bash
# View available scripts
npm run

# Start development with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check dependencies
npm audit

# Update dependencies
npm update
```

## 🎯 Next Steps

1. ✅ Run `npm install && npm run dev`
2. ✅ Test games locally
3. ✅ Customize colors and branding
4. ✅ Add your domain configuration
5. ✅ Connect to your backend API
6. ✅ Deploy to production
7. ✅ Monitor and optimize performance

## 📚 Additional Resources

- React Docs: https://react.dev
- Vite Docs: https://vitejs.dev
- Web API: https://developer.mozilla.org/en-US/docs/Web/API
- CSS Variables: https://developer.mozilla.org/en-US/docs/Web/CSS/--*

---

**Ready to go live?** 🚀 Follow the Domain Integration Steps above and deploy with confidence!
