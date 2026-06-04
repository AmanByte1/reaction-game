import { useCallback, useEffect, useRef, useState } from 'react';
import {
  detectMobile,
  formatLeaderboardDate,
  getColorForTime,
  getGameAreaClassName,
  getMessage,
  getStats,
  isScreenActive,
  loadScores,
  playSound,
  saveScores,
} from './gameUtils';

function stopPropagation(e) {
  e.stopPropagation();
}

function RetryButton({ isMobile, onRetry, children }) {
  const touchStarted = useRef(false);
  const touchTimer = useRef(null);

  const handleClick = () => onRetry();

  const handleTouchStart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    touchStarted.current = true;
    e.currentTarget.style.opacity = '0.8';

    touchTimer.current = setTimeout(() => {
      if (touchStarted.current) {
        onRetry();
        touchStarted.current = false;
      }
    }, 500);
  };

  const handleTouchEnd = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.currentTarget.style.opacity = '1';

    if (touchTimer.current) clearTimeout(touchTimer.current);
    if (touchStarted.current) {
      onRetry();
      touchStarted.current = false;
    }
  };

  const handleTouchCancel = (e) => {
    e.currentTarget.style.opacity = '1';
    touchStarted.current = false;
    if (touchTimer.current) clearTimeout(touchTimer.current);
  };

  if (isMobile) {
    return (
      <button
        type="button"
        className="retry-btn"
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      className="retry-btn"
      onClick={handleClick}
      onTouchStart={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onTouchEnd={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onRetry();
      }}
    >
      {children}
    </button>
  );
}

export default function ReactionGame() {
  const isMobile = useRef(detectMobile()).current;
  const timeoutRef = useRef(null);
  const startTimeRef = useRef(null);
  const resetTimerRef = useRef(null);
  const gameStateRef = useRef('idle');

  const [gameState, setGameState] = useState('idle');
  const [currentMode, setCurrentMode] = useState('normal');
  const [leaderboardMode, setLeaderboardMode] = useState('normal');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [scores, setScores] = useState(() => loadScores());
  const [resultTime, setResultTime] = useState('0ms');
  const [resultMessage, setResultMessage] = useState('');
  const [resultMessageColor, setResultMessageColor] = useState('');

  gameStateRef.current = gameState;

  const clearGameTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const startGame = useCallback(() => {
    setGameState('waiting');
    playSound('start', soundEnabled);

    const minDelay = currentMode === 'pro' ? 1000 : 2000;
    const maxDelay = currentMode === 'pro' ? 3000 : 5000;
    const delay = Math.random() * (maxDelay - minDelay) + minDelay;

    timeoutRef.current = setTimeout(() => {
      setGameState('ready');
      startTimeRef.current = Date.now();
      playSound('go', soundEnabled);
    }, delay);
  }, [currentMode, soundEnabled]);

  const tooEarly = useCallback(() => {
    clearGameTimeout();
    setGameState('tooEarly');
    playSound('fail', soundEnabled);
  }, [clearGameTimeout, soundEnabled]);

  const recordTime = useCallback(() => {
    const reactionTime = Date.now() - startTimeRef.current;
    setGameState('result');
    setResultTime(`${reactionTime}ms`);
    setResultMessage(getMessage(reactionTime));
    setResultMessageColor(getColorForTime(reactionTime));

    setScores((prev) => {
      const score = {
        time: reactionTime,
        mode: currentMode,
        date: new Date().toISOString(),
      };
      const next = { ...prev };
      if (!next[currentMode]) {
        next[currentMode] = [];
      }
      next[currentMode] = [...next[currentMode], score]
        .sort((a, b) => a.time - b.time)
        .slice(0, 10);
      saveScores(next);
      return next;
    });

    playSound('success', soundEnabled);
  }, [currentMode, soundEnabled]);

  const resetGame = useCallback(() => {
    clearGameTimeout();
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }
    setGameState('idle');

    resetTimerRef.current = setTimeout(() => {
      if (gameStateRef.current === 'idle') {
        startGame();
      }
    }, 300);
  }, [clearGameTimeout, startGame]);

  const handleGameClick = useCallback(() => {
    switch (gameStateRef.current) {
      case 'idle':
        startGame();
        break;
      case 'waiting':
        tooEarly();
        break;
      case 'ready':
        recordTime();
        break;
      default:
        break;
    }
  }, [startGame, tooEarly, recordTime]);

  const setMode = useCallback(
    (mode) => {
      setCurrentMode(mode);
      setLeaderboardMode(mode);
      clearGameTimeout();
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
      setGameState('idle');
      resetTimerRef.current = setTimeout(() => {
        if (gameStateRef.current === 'idle') {
          startGame();
        }
      }, 300);
    },
    [clearGameTimeout, startGame]
  );

  const clearAllData = useCallback(() => {
    const empty = { normal: [], pro: [] };
    setScores(empty);
    saveScores(empty);
    resetGame();
  }, [resetGame]);

  const handleGameAreaTouchStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleGameClick();
  };

  const handleGameAreaTouchEnd = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    return () => {
      clearGameTimeout();
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, [clearGameTimeout]);

  const modeScores = scores[currentMode] || [];
  const stats = getStats(modeScores);
  const leaderboardScores = scores[leaderboardMode] || [];

  return (
    <>
      <div className="mode-toggle reaction-modes">
          <button
            type="button"
            id="normalMode"
            className={`mode-btn${currentMode === 'normal' ? ' active' : ''}`}
            onClick={() => setMode('normal')}
            onTouchStart={stopPropagation}
          >
            Normal Mode
          </button>
          <button
            type="button"
            id="proMode"
            className={`mode-btn${currentMode === 'pro' ? ' active' : ''}`}
            onClick={() => setMode('pro')}
            onTouchStart={stopPropagation}
          >
            🔥 Pro Mode
          </button>
      </div>

      <main>
        <div
          className={getGameAreaClassName(gameState)}
          id="gameArea"
          onClick={handleGameClick}
          onTouchStart={handleGameAreaTouchStart}
          onTouchEnd={handleGameAreaTouchEnd}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="game-content">
            <div
              id="waitingScreen"
              className={`screen${isScreenActive('waiting', gameState) ? ' active' : ''}`}
            >
              <h2 id="waitingMessage">Wait for GREEN...</h2>
              <p>Click to start</p>
            </div>

            <div
              id="readyScreen"
              className={`screen${isScreenActive('ready', gameState) ? ' active' : ''}`}
            >
              <h2>🟢 GO!</h2>
              <p>Click as fast as you can!</p>
            </div>

            <div
              id="tooEarlyScreen"
              className={`screen${isScreenActive('tooEarly', gameState) ? ' active' : ''}`}
            >
              <h2>❌ Too Early!</h2>
              <p>Wait for green next time</p>
              <RetryButton isMobile={isMobile} onRetry={resetGame}>
                Try Again
              </RetryButton>
            </div>

            <div
              id="resultScreen"
              className={`screen${isScreenActive('result', gameState) ? ' active' : ''}`}
            >
              <h2>Your Time</h2>
              <div className="result-time" id="resultTime">
                {resultTime}
              </div>
              <div
                className="result-message"
                id="resultMessage"
                style={{ color: resultMessageColor }}
              >
                {resultMessage}
              </div>
              <RetryButton isMobile={isMobile} onRetry={resetGame}>
                Play Again
              </RetryButton>
            </div>
          </div>
        </div>

        <div className="stats-panel">
          <div className="current-stats">
            <div className="stat-item">
              <span className="stat-label">Best Time</span>
              <span className="stat-value" id="bestTime">
                {stats.bestTime}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Average</span>
              <span className="stat-value" id="avgTime">
                {stats.avgTime}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Games</span>
              <span className="stat-value" id="gamesPlayed">
                {stats.gamesPlayed}
              </span>
            </div>
          </div>
        </div>

        <div className="leaderboard-section">
          <h2>🏆 Leaderboard</h2>
          <div className="leaderboard-tabs">
            <button
              type="button"
              className={`tab-btn${leaderboardMode === 'normal' ? ' active' : ''}`}
              data-mode="normal"
              onClick={() => setLeaderboardMode('normal')}
              onTouchStart={stopPropagation}
            >
              Normal
            </button>
            <button
              type="button"
              className={`tab-btn${leaderboardMode === 'pro' ? ' active' : ''}`}
              data-mode="pro"
              onClick={() => setLeaderboardMode('pro')}
              onTouchStart={stopPropagation}
            >
              Pro Mode
            </button>
          </div>
          <div className="leaderboard" id="leaderboard">
            {leaderboardScores.length === 0 ? (
              <div className="empty-leaderboard">No scores yet. Be the first!</div>
            ) : (
              leaderboardScores.map((score, index) => (
                <div key={`${score.date}-${index}`} className="leaderboard-item">
                  <span className="leaderboard-rank">#{index + 1}</span>
                  <span className="leaderboard-time">{score.time}ms</span>
                  <span className="leaderboard-date">
                    {formatLeaderboardDate(score.date)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <footer>
        <button
          type="button"
          id="soundToggle"
          className="sound-btn"
          onClick={() => setSoundEnabled((v) => !v)}
          onTouchStart={stopPropagation}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
        <button
          type="button"
          id="clearData"
          className="clear-btn"
          onClick={() => {
            if (
              confirm(
                'Are you sure you want to clear all data? This cannot be undone.'
              )
            ) {
              clearAllData();
            }
          }}
          onTouchStart={stopPropagation}
        >
          Clear All Data
        </button>
      </footer>
    </>
  );
}
