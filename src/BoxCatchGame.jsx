import { useCallback, useEffect, useRef, useState } from 'react';
import { playSound } from './gameUtils';
import {
  getAverage,
  getDifficulty,
  getDifficultyColor,
  loadBoxCatchBest,
  randomBoxPosition,
  saveBoxCatchBest,
} from './boxCatchUtils';

const BOX_SIZE = 18; // percentage of the play area

export default function BoxCatchGame() {
  const [gameState, setGameState] = useState('idle');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [boxPos, setBoxPos] = useState({ top: 40, left: 40 });
  const [best, setBest] = useState(() => loadBoxCatchBest());

  const boxTimerRef = useRef(null);
  const boxAppearRef = useRef(0);
  const runningRef = useRef(false);
  const scoreRef = useRef(0);
  const missesRef = useRef(0);
  const spawnBoxRef = useRef(() => {});

  const clearBoxTimer = useCallback(() => {
    if (boxTimerRef.current) {
      clearTimeout(boxTimerRef.current);
      boxTimerRef.current = null;
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
    runningRef.current = true;
    setGameState('running');
    playSound('start', soundEnabled);
    spawnBox();
  }, [soundEnabled, spawnBox]);

  const stopGame = useCallback(() => {
    runningRef.current = false;
    clearBoxTimer();
    setGameState('over');
    setBest((prevBest) => {
      const finalScore = scoreRef.current;
      if (finalScore > prevBest) {
        saveBoxCatchBest(finalScore);
        return finalScore;
      }
      return prevBest;
    });
  }, [clearBoxTimer]);

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
    };
  }, [clearBoxTimer]);

  const avgReaction = getAverage(reactionTimes);
  const difficulty = getDifficulty(score, misses);
  const difficultyColor = getDifficultyColor(difficulty.label);

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
              <button type="button" className="retry-btn" onClick={startGame}>
                Start
              </button>
            </div>
          )}

          {gameState === 'over' && (
            <div className="screen active">
              <h2>Game Over</h2>
              <div className="result-time">{score}</div>
              <div className="result-message">
                {misses} misses · {avgReaction || '--'}ms avg ·{' '}
                <span style={{ color: difficultyColor }}>{difficulty.label}</span>
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
