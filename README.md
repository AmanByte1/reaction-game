# ⚡ Reaction Time Battle

A fast-paced, neon-styled reaction time game built with pure HTML, CSS, and JavaScript. Test your reflexes and compete for the best times!

## 🎮 Features

- **Core Gameplay**: Click as fast as possible when the screen turns green
- **Two Game Modes**: 
  - Normal Mode (2-5 second delay)
  - 🔥 Pro Mode (1-3 second delay for extra challenge)
- **🏆 Local Leaderboard**: Top 10 scores saved for each mode
- **📊 Statistics**: Track your best time, average, and games played
- **🌙 Dark/Neon UI**: Stunning visual effects with animated gradients
- **📱 Mobile Friendly**: Fully responsive with touch controls
- **🎵 Sound Effects**: Audio feedback for all game events (can be toggled)
- **💾 Local Storage**: All data saved locally, no backend required

## 🚀 Quick Start

1. **Clone or download** the files
2. **Open `index.html`** in your web browser
3. **Click "Wait for GREEN..."** to start playing
4. **Click immediately** when the screen turns green
5. **Try to beat your best time!**

## 📱 How to Play

1. Click anywhere on the game area to start
2. Wait for the screen to turn green (don't click too early!)
3. Click as fast as you can when you see green
4. View your reaction time and try to improve
5. Switch between Normal and Pro modes for different challenges

## 🏆 Scoring System

- **⚡ LIGHTNING FAST!**: Under 200ms
- **🔥 Amazing!**: 200-249ms  
- **🎯 Great job!**: 250-299ms
- **👍 Good!**: 300-349ms
- **😊 Not bad!**: 350-399ms
- **🐌 Keep practicing!**: 400ms+

## 🎨 Features Breakdown

### Game Modes
- **Normal Mode**: Random delay between 2-5 seconds
- **Pro Mode**: Random delay between 1-3 seconds (harder!)

### Leaderboard
- Separate leaderboards for each mode
- Top 10 scores preserved
- Shows time and date of achievement
- Persistent data using localStorage

### Statistics
- **Best Time**: Your fastest reaction ever
- **Average**: Mean of all your games
- **Games Played**: Total number of attempts

### Mobile Optimization
- Touch-friendly controls
- Responsive design for all screen sizes
- Prevents accidental zoom
- Optimized button sizes for touch

### Sound Design
- Start beep when game begins
- Go signal when screen turns green
- Success sound for good times
- Fail sound for early clicks
- Toggle button for silent play

## 🌐 Deployment

### GitHub Pages (Recommended)
1. Create a new repository on GitHub
2. Upload all files (`index.html`, `style.css`, `script.js`, `README.md`)
3. Go to Settings → Pages
4. Select "Deploy from a branch" and choose `main`
5. Your site will be live at `https://username.github.io/repository-name`

### Netlify
1. Drag and drop the files folder to netlify.com
2. Get an instant live URL

### Vercel
1. Connect your GitHub repository
2. Automatic deployment on every push

### Any Static Hosting
Since this is a pure frontend application, it works on any static hosting service:
- Firebase Hosting
- AWS S3
- DigitalOcean App Platform
- Your own web server

## 🛠️ Technical Details

- **No dependencies**: Pure vanilla JavaScript
- **No build process**: Ready to deploy immediately
- **Browser compatibility**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **LocalStorage**: ~5KB max data usage
- **Responsive**: Works on phones, tablets, and desktops
- **Performance**: Optimized animations and minimal reflows

## 📁 File Structure

```
reaction-time-battle/
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── script.js           # Game logic and interactions
└── README.md           # This file
```

## 🎯 Game Mechanics

The game uses precise timing with `Date.now()` for millisecond accuracy:
- Random delay generation prevents pattern learning
- Immediate response capture on green screen
- Early click detection with penalty
- Accurate reaction time calculation

## 🔧 Customization

### Colors
Edit the CSS variables in `style.css`:
```css
:root {
    --accent-red: #ff0040;
    --accent-green: #00ff88;
    --accent-blue: #00ccff;
    --accent-yellow: #ffaa00;
}
```

### Difficulty
Modify the timing ranges in `script.js`:
```javascript
const minDelay = this.currentMode === 'pro' ? 1000 : 2000;
const maxDelay = this.currentMode === 'pro' ? 3000 : 5000;
```

### Sound Effects
Customize the audio frequencies in the `playSound()` method.

## 🐛 Troubleshooting

**Sound not working?**
- Some browsers require user interaction before playing audio
- Try clicking the sound toggle button first

**Mobile zoom issues?**
- The game prevents double-tap zoom automatically
- If issues persist, check your browser settings

**Leaderboard not saving?**
- Ensure localStorage is enabled in your browser
- Clear browser cache if data appears corrupted

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Built with ❤️ using pure HTML, CSS, and JavaScript**
