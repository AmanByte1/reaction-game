import { useCallback, useEffect, useRef, useState } from 'react';
import { playSound } from './gameUtils';
import {
  getAverage,
  getDifficulty,
  getDifficultyColor,
  loadBoxCatchBest,
  randomBoxPosition,
  saveBoxCatchBest,
  loadBoxCatchTopScores,
  addToTopScores,
  formatTime,
  isNewTopScore,
} from './boxCatchUtils';

const BOX_SIZE = 18; // percentage of the play area
const MIN_TIMER = 10; // seconds
const MAX_TIMER = 300; // seconds
const DEFAULT_TIMER = 60; // seconds

export default function BoxCatchGame() {
  const [gameState, setGameState] = useState('idle');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [boxPos, setBoxPos] = useState({ top: 40, left: 40 });
  const [best, setBest] = useState(() => loadBoxCatchBest());
  const [topScores, setTopScores] = useState(() => loadBoxCatchTopScores());
  const [timerDuration, setTimerDuration] = useState(DEFAULT_TIMER);
  const [timeRemaining, setTimeRemaining] = useState(DEFAULT_TIMER);
  const [showTopScores, setShowTopScores] = useState(false);

  const boxTimerRef = useRef(null);
  const boxAppearRef = useRef(0);
  const runningRef = useRef(false);
  const scoreRef = useRef(0);
  const missesRef = useRef(0);
  const spawnBoxRef = useRef(() => {});
  const gameTimerRef = useRef(null);
  const timerIntervalRef = useRef(null);

  const clearBoxTimer = useCallback(() => {
    if (boxTimerRef.current) {
      clearTimeout(boxTimerRef.current);
      boxTimerRef.current = null;
    }
  }, []);

  const clearGameTimer = useCallback(() => {
    if (gameTimerRef.current) {
      clearTimeout(gameTimerRef.current);
      gameTimerRef.current = null;
    }
  }, []);

  const clearTimerInterval = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  }, []);

  const spawnBox = useCallback(() => {
    if (!runningRef.current) return;
    setBoxPos(randomBoxPosition(BOX_SIZE));
    boxAppearRef.current = Date.now();

    const { interval } = getDifficulty(scoreRef.current, missesRef.current);
    clearBoxTimer();
    boxTimerRef.current = setTimeout(() => {
      missesRef.current += 1;
      setMisses(missesRef.current);
      playSound('fail', soundEnabled);
      spawnBoxRef.current();
    }, interval);
  }, [clearBoxTimer, soundEnabled]);

  spawnBoxRef.current = spawnBox;

  const startGame = useCallback(() => {
    scoreRef.current = 0;
    missesRef.current = 0;
    setScore(0);
    setMisses(0);
    setReactionTimes([]);
    setTimeRemaining(timerDuration);
    runningRef.current = true;
    setGameState('running');
    playSound('start', soundEnabled);
    spawnBox();

    // Start countdown timer
    let remaining = timerDuration;
    setTimeRemaining(remaining);
    timerIntervalRef.current = setInterval(() => {
      remaining -= 1;
      setTimeRemaining(remaining);

      if (remaining <= 0) {
        clearTimerInterval();
        runningRef.current = false;
        clearBoxTimer();
        setGameState('over');
        playSound('fail', soundEnabled);
      }
    }, 1000);
  }, [timerDuration, soundEnabled, spawnBox, clearBoxTimer, clearTimerInterval]);

  const stopGame = useCallback(() => {
    runningRef.current = false;
    clearBoxTimer();
    clearTimerInterval();
    clearGameTimer();
    setGameState('over');
    
    const finalScore = scoreRef.current;
    const updatedTopScores = addToTopScores(finalScore);
    setTopScores(updatedTopScores);
    
    setBest((prevBest) => {
      if (finalScore > prevBest) {
        saveBoxCatchBest(finalScore);
        return finalScore;
      }
      return prevBest;
    });
  }, [clearBoxTimer, clearTimerInterval, clearGameTimer]);

  const handleBoxHit = useCallback(
    (e) => {
      e.stopPropagation();
      if (!runningRef.current) return;
      clearBoxTimer();
      const reactionTime = Date.now() - boxAppearRef.current;
      scoreRef.current += 1;
      setScore(scoreRef.current);
      setReactionTimes((prev) => [...prev, reactionTime]);
      playSound('success', soundEnabled);
      spawnBox();
    },
    [clearBoxTimer, soundEnabled, spawnBox]
  );

  useEffect(() => {
    return () => {
      runningRef.current = false;
      clearBoxTimer();
      clearTimerInterval();
      clearGameTimer();
    };
  }, [clearBoxTimer, clearTimerInterval, clearGameTimer]);

  const avgReaction = getAverage(reactionTimes);
  const difficulty = getDifficulty(score, misses);
  const difficultyColor = getDifficultyColor(difficulty.label);
  const isNewTop = score > 0 && isNewTopScore(score);

  return (
    <div className="boxcatch">
      <div
        className={`game-area boxcatch-area${gameState === 'running' ? ' running' : ''}`}
        onContextMenu={(e) => e.preventDefault()}
      >
        {gameState === 'running' && (
          <button
            type="button"
            className="catch-box"
            style={{ top: `${boxPos.top}%`, left: `${boxPos.left}%` }}
            onPointerDown={handleBoxHit}
            aria-label="Catch the box"
          />
        )}

        <div className="game-content">
          {gameState === 'idle' && (
            <div className="screen active">
              <h2>📦 Box Catch</h2>
              <p>Click the box before it jumps away!</p>
              
              <div className="timer-setup">
                <label htmlFor="timer-input">Time Limit (seconds):</label>
                <div className="timer-input-group">
                  <input
                    id="timer-input"
                    type="number"
                    min={MIN_TIMER}
                    max={MAX_TIMER}
                    value={timerDuration}
                    onChange={(e) => {
                      const val = Math.max(MIN_TIMER, Math.min(MAX_TIMER, Number(e.target.value)));
                      setTimerDuration(val);
                      setTimeRemaining(val);
                    }}
                    className="timer-input"
                  />
                  <span className="timer-hint">{MIN_TIMER}s - {MAX_TIMER}s</span>
                </div>
              </div>

              <button type="button" className="retry-btn" onClick={startGame}>
                Start
              </button>

              {topScores.length > 0 && (
                <button
                  type="button"
                  className="view-scores-btn"
                  onClick={() => setShowTopScores(!showTopScores)}
                >
                  {showTopScores ? 'Hide' : 'View'} Top 10 Scores
                </button>
              )}

              {showTopScores && (
                <div className="top-scores-panel">
                  <h3>🏆 Top 10 Scores</h3>
                  <ol className="top-scores-list">
                    {topScores.map((entry, idx) => (
                      <li key={idx} className="top-score-item">
                        <span className="rank">#{idx + 1}</span>
                        <span className="score">{entry.score}</span>
                        <span className="date">
                          {new Date(entry.timestamp).toLocaleDateString()}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}

          {gameState === 'over' && (
            <div className="screen active">
              <h2>Game Over</h2>
              <div className="result-time">{score}</div>
              <div className="result-message">
                {misses} misses · {avgReaction || '--'}ms avg ·{' '}
                <span style={{ color: difficultyColor }}>{difficulty.label}</span>
                {isNewTop && <span className="new-top-badge">🎉 NEW TOP SCORE!</span>}
              </div>
              <button type="button" className="retry-btn" onClick={startGame}>
                Play Again
              </button>
            </div>
          )}
        </div>
      </div>

      {gameState === 'running' && (
        <div className="boxcatch-controls">
          <span className="timer-display">⏱️ {formatTime(timeRemaining)}</span>
          <span
            className="difficulty-badge"
            style={{ color: difficultyColor, borderColor: difficultyColor }}
          >
            Difficulty: {difficulty.label}
          </span>
          <button type="button" className="stop-btn" onClick={stopGame}>
            Stop
          </button>
        </div>
      )}

      <div className="stats-panel">
        <div className="current-stats boxcatch-stats">
          <div className="stat-item">
            <span className="stat-label">Score</span>
            <span className="stat-value">{score}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Misses</span>
            <span className="stat-value">{misses}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Avg Reaction</span>
            <span className="stat-value">{avgReaction ? `${avgReaction}ms` : '--'}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Best</span>
            <span className="stat-value">{best}</span>
          </div>
        </div>
      </div>

      <footer>
        <button
          type="button"
          className="sound-btn"
          onClick={() => setSoundEnabled((v) => !v)}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
      </footer>
    </div>
  );
}
