class ReactionGame {
    constructor() {
        this.gameState = 'idle';
        this.startTime = null;
        this.timeoutId = null;
        this.currentMode = 'normal';
        this.soundEnabled = true;
        this.scores = this.loadScores();
        
        this.initializeElements();
        this.bindEvents();
        this.updateStats();
        this.updateLeaderboard();
    }

    initializeElements() {
        this.gameArea = document.getElementById('gameArea');
        this.waitingScreen = document.getElementById('waitingScreen');
        this.readyScreen = document.getElementById('readyScreen');
        this.tooEarlyScreen = document.getElementById('tooEarlyScreen');
        this.resultScreen = document.getElementById('resultScreen');
        this.resultTime = document.getElementById('resultTime');
        this.resultMessage = document.getElementById('resultMessage');
        
        this.normalModeBtn = document.getElementById('normalMode');
        this.proModeBtn = document.getElementById('proMode');
        
        this.bestTimeEl = document.getElementById('bestTime');
        this.avgTimeEl = document.getElementById('avgTime');
        this.gamesPlayedEl = document.getElementById('gamesPlayed');
        
        this.leaderboardEl = document.getElementById('leaderboard');
        this.tabBtns = document.querySelectorAll('.tab-btn');
        
        this.soundToggleBtn = document.getElementById('soundToggle');
        this.clearDataBtn = document.getElementById('clearData');
        
        this.retryBtns = document.querySelectorAll('.retry-btn');
    }

    bindEvents() {
        // Game area click/touch
        this.gameArea.addEventListener('click', () => this.handleGameClick());
        this.gameArea.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.handleGameClick();
        });
        this.gameArea.addEventListener('touchend', (e) => {
            e.preventDefault();
        });

        // Mode buttons
        this.normalModeBtn.addEventListener('click', () => this.setMode('normal'));
        this.normalModeBtn.addEventListener('touchstart', (e) => e.stopPropagation());
        this.proModeBtn.addEventListener('click', () => this.setMode('pro'));
        this.proModeBtn.addEventListener('touchstart', (e) => e.stopPropagation());

        // Retry buttons
        this.retryBtns.forEach(btn => {
            btn.addEventListener('click', () => this.resetGame());
            btn.addEventListener('touchstart', (e) => {
                e.stopPropagation();
                e.preventDefault();
            });
            btn.addEventListener('touchend', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.resetGame();
            });
        });

        // Leaderboard tabs
        this.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.updateLeaderboard(btn.dataset.mode);
            });
            btn.addEventListener('touchstart', (e) => e.stopPropagation());
        });

        // Sound toggle
        this.soundToggleBtn.addEventListener('click', () => {
            this.soundEnabled = !this.soundEnabled;
            this.soundToggleBtn.textContent = this.soundEnabled ? '🔊' : '🔇';
        });
        this.soundToggleBtn.addEventListener('touchstart', (e) => e.stopPropagation());

        // Clear data
        this.clearDataBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
                this.clearAllData();
            }
        });
        this.clearDataBtn.addEventListener('touchstart', (e) => e.stopPropagation());

        // Prevent context menu on game area
        this.gameArea.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    handleGameClick() {
        switch (this.gameState) {
            case 'idle':
                this.startGame();
                break;
            case 'waiting':
                this.tooEarly();
                break;
            case 'ready':
                this.recordTime();
                break;
        }
    }

    startGame() {
        this.gameState = 'waiting';
        this.showScreen('waiting');
        this.gameArea.className = 'game-area waiting';
        
        this.playSound('start');

        // Random delay before showing green
        const minDelay = this.currentMode === 'pro' ? 1000 : 2000;
        const maxDelay = this.currentMode === 'pro' ? 3000 : 5000;
        const delay = Math.random() * (maxDelay - minDelay) + minDelay;

        this.timeoutId = setTimeout(() => {
            this.gameState = 'ready';
            this.showScreen('ready');
            this.gameArea.className = 'game-area ready';
            this.startTime = Date.now();
            this.playSound('go');
        }, delay);
    }

    tooEarly() {
        clearTimeout(this.timeoutId);
        this.gameState = 'tooEarly';
        this.showScreen('tooEarly');
        this.gameArea.className = 'game-area too-early';
        this.playSound('fail');
    }

    recordTime() {
        const reactionTime = Date.now() - this.startTime;
        this.gameState = 'result';
        
        this.showScreen('result');
        this.gameArea.className = 'game-area';
        
        this.resultTime.textContent = `${reactionTime}ms`;
        this.resultMessage.textContent = this.getMessage(reactionTime);
        this.resultMessage.style.color = this.getColorForTime(reactionTime);
        
        this.saveScore(reactionTime);
        this.updateStats();
        this.updateLeaderboard(this.currentMode);
        
        this.playSound('success');
    }

    resetGame() {
        clearTimeout(this.timeoutId);
        this.gameState = 'idle';
        this.showScreen('waiting');
        this.gameArea.className = 'game-area';
        
        // Auto-start the game after reset
        setTimeout(() => {
            if (this.gameState === 'idle') {
                this.startGame();
            }
        }, 300);
    }

    showScreen(screenName) {
        const screens = [this.waitingScreen, this.readyScreen, this.tooEarlyScreen, this.resultScreen];
        screens.forEach(screen => screen.classList.remove('active'));
        
        switch (screenName) {
            case 'waiting':
                this.waitingScreen.classList.add('active');
                break;
            case 'ready':
                this.readyScreen.classList.add('active');
                break;
            case 'tooEarly':
                this.tooEarlyScreen.classList.add('active');
                break;
            case 'result':
                this.resultScreen.classList.add('active');
                break;
        }
    }

    setMode(mode) {
        this.currentMode = mode;
        this.resetGame();
        
        this.normalModeBtn.classList.toggle('active', mode === 'normal');
        this.proModeBtn.classList.toggle('active', mode === 'pro');
        
        this.updateLeaderboard(mode);
    }

    getMessage(time) {
        if (time < 200) return '⚡ LIGHTNING FAST!';
        if (time < 250) return '🔥 Amazing!';
        if (time < 300) return '🎯 Great job!';
        if (time < 350) return '👍 Good!';
        if (time < 400) return '😊 Not bad!';
        return '🐌 Keep practicing!';
    }

    getColorForTime(time) {
        if (time < 200) return 'var(--accent-yellow)';
        if (time < 250) return 'var(--accent-green)';
        if (time < 300) return 'var(--accent-blue)';
        if (time < 350) return 'var(--accent-blue)';
        return 'var(--text-secondary)';
    }

    saveScore(time) {
        const score = {
            time: time,
            mode: this.currentMode,
            date: new Date().toISOString()
        };
        
        if (!this.scores[this.currentMode]) {
            this.scores[this.currentMode] = [];
        }
        
        this.scores[this.currentMode].push(score);
        this.scores[this.currentMode].sort((a, b) => a.time - b.time);
        this.scores[this.currentMode] = this.scores[this.currentMode].slice(0, 10); // Keep top 10
        
        this.saveScores();
    }

    loadScores() {
        const saved = localStorage.getItem('reactionGameScores');
        return saved ? JSON.parse(saved) : { normal: [], pro: [] };
    }

    saveScores() {
        localStorage.setItem('reactionGameScores', JSON.stringify(this.scores));
    }

    updateStats() {
        const modeScores = this.scores[this.currentMode];
        
        if (modeScores.length === 0) {
            this.bestTimeEl.textContent = '--';
            this.avgTimeEl.textContent = '--';
            this.gamesPlayedEl.textContent = '0';
            return;
        }

        const bestTime = Math.min(...modeScores.map(s => s.time));
        const avgTime = Math.round(modeScores.reduce((sum, s) => sum + s.time, 0) / modeScores.length);
        
        this.bestTimeEl.textContent = `${bestTime}ms`;
        this.avgTimeEl.textContent = `${avgTime}ms`;
        this.gamesPlayedEl.textContent = modeScores.length;
    }

    updateLeaderboard(mode = this.currentMode) {
        const scores = this.scores[mode] || [];
        
        if (scores.length === 0) {
            this.leaderboardEl.innerHTML = '<div class="empty-leaderboard">No scores yet. Be the first!</div>';
            return;
        }

        this.leaderboardEl.innerHTML = scores.map((score, index) => {
            const date = new Date(score.date);
            const dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            
            return `
                <div class="leaderboard-item">
                    <span class="leaderboard-rank">#${index + 1}</span>
                    <span class="leaderboard-time">${score.time}ms</span>
                    <span class="leaderboard-date">${dateStr}</span>
                </div>
            `;
        }).join('');
    }

    clearAllData() {
        this.scores = { normal: [], pro: [] };
        this.saveScores();
        this.updateStats();
        this.updateLeaderboard();
        this.resetGame();
    }

    playSound(type) {
        if (!this.soundEnabled) return;

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        switch (type) {
            case 'start':
                oscillator.frequency.value = 440;
                gainNode.gain.value = 0.1;
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.1);
                break;
            case 'go':
                oscillator.frequency.value = 880;
                gainNode.gain.value = 0.2;
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.2);
                break;
            case 'success':
                oscillator.frequency.value = 660;
                gainNode.gain.value = 0.15;
                oscillator.start();
                oscillator.frequency.linearRampToValueAtTime(880, audioContext.currentTime + 0.2);
                oscillator.stop(audioContext.currentTime + 0.3);
                break;
            case 'fail':
                oscillator.frequency.value = 220;
                gainNode.gain.value = 0.1;
                oscillator.start();
                oscillator.frequency.linearRampToValueAtTime(110, audioContext.currentTime + 0.3);
                oscillator.stop(audioContext.currentTime + 0.3);
                break;
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ReactionGame();
});

// Prevent zoom on double tap for mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
