export function detectMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

export function loadScores() {
  const saved = localStorage.getItem('reactionGameScores');
  return saved ? JSON.parse(saved) : { normal: [], pro: [] };
}

export function saveScores(scores) {
  localStorage.setItem('reactionGameScores', JSON.stringify(scores));
}

export function getMessage(time) {
  if (time < 200) return '⚡ LIGHTNING FAST!';
  if (time < 250) return '🔥 Amazing!';
  if (time < 300) return '🎯 Great job!';
  if (time < 350) return '👍 Good!';
  if (time < 400) return '😊 Not bad!';
  return '🐌 Keep practicing!';
}

export function getColorForTime(time) {
  if (time < 200) return 'var(--accent-yellow)';
  if (time < 250) return 'var(--accent-green)';
  if (time < 300) return 'var(--accent-blue)';
  if (time < 350) return 'var(--accent-blue)';
  return 'var(--text-secondary)';
}

// Single audio context instance to prevent sound issues
let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  // Resume audio context if suspended (required for user interaction)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
}

export function playSound(type, soundEnabled) {
  if (!soundEnabled) return;

  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    const now = ctx.currentTime;

    switch (type) {
      case 'start':
        oscillator.frequency.value = 440;
        gainNode.gain.value = 0.1;
        oscillator.start(now);
        oscillator.stop(now + 0.1);
        break;
      case 'go':
        oscillator.frequency.value = 880;
        gainNode.gain.value = 0.2;
        oscillator.start(now);
        oscillator.stop(now + 0.2);
        break;
      case 'success':
        oscillator.frequency.value = 660;
        gainNode.gain.value = 0.15;
        oscillator.start(now);
        oscillator.frequency.linearRampToValueAtTime(880, now + 0.2);
        oscillator.stop(now + 0.3);
        break;
      case 'fail':
        oscillator.frequency.value = 220;
        gainNode.gain.value = 0.1;
        oscillator.start(now);
        oscillator.frequency.linearRampToValueAtTime(110, now + 0.3);
        oscillator.stop(now + 0.3);
        break;
      default:
        break;
    }
  } catch (error) {
    console.error('Error playing sound:', error);
  }
}

export function formatLeaderboardDate(isoDate) {
  const date = new Date(isoDate);
  return (
    date.toLocaleDateString() +
    ' ' +
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );
}

export function getStats(modeScores) {
  if (modeScores.length === 0) {
    return { bestTime: '--', avgTime: '--', gamesPlayed: '0' };
  }

  const bestTime = Math.min(...modeScores.map((s) => s.time));
  const avgTime = Math.round(
    modeScores.reduce((sum, s) => sum + s.time, 0) / modeScores.length
  );

  return {
    bestTime: `${bestTime}ms`,
    avgTime: `${avgTime}ms`,
    gamesPlayed: String(modeScores.length),
  };
}

export function getGameAreaClassName(gameState) {
  switch (gameState) {
    case 'waiting':
      return 'game-area waiting';
    case 'ready':
      return 'game-area ready';
    case 'tooEarly':
      return 'game-area too-early';
    default:
      return 'game-area';
  }
}

export function isScreenActive(screen, gameState) {
  switch (screen) {
    case 'waiting':
      return gameState === 'idle' || gameState === 'waiting';
    case 'ready':
      return gameState === 'ready';
    case 'tooEarly':
      return gameState === 'tooEarly';
    case 'result':
      return gameState === 'result';
    default:
      return false;
  }
}
