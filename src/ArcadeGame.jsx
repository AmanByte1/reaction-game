import { useEffect, useMemo, useState } from 'react';
import { playSound } from './gameUtils';

const ROUNDS = 6;
const NOTES = ['DO', 'RE', 'MI', 'FA', 'SOL'];

export function getGameName(game) {
  return game.label.replace(/^\S+\s+/, '');
}

export function getGameMark(game) {
  return getGameName(game).split(/\s+/).map((word) => word[0]).join('').slice(0, 3).toUpperCase();
}

function seedFor(id, round) {
  return [...id].reduce((total, char) => total + char.charCodeAt(0), round * 31);
}

function valuesFor(id, round, length, max) {
  const seed = seedFor(id, round);
  return Array.from({ length }, (_, index) => (seed + index * 17 + index * index) % max);
}

function makeMathChallenge(id, round) {
  const seed = seedFor(id, round);
  const left = (seed % 9) + 2;
  const right = ((seed * 3) % 8) + 2;
  const kind = seed % 3;
  if (kind === 0) return { prompt: `${left} + ${right}`, answer: left + right };
  if (kind === 1) return { prompt: `${left} x ${right}`, answer: left * right };
  return { prompt: `${left + right} - ${left}`, answer: right };
}

function modeFor(id, category) {
  if (['memory-tap', 'memory-cards', 'visual-memory', 'music-memory'].includes(id)) return 'memory';
  if (['pattern-match', 'color-match', 'color-cascade', 'pattern-recognition', 'symmetry-solve', 'shape-fit', 'match-three'].includes(id)) return 'pattern';
  if (['number-hunt', 'number-sudoku', 'math-quest', 'equation-solver', 'iq-challenge', 'trivia-master', 'riddle-solver', 'geography-quest', 'science-quiz'].includes(id)) return 'quiz';
  if (['sequence-beat', 'sequence-solver', 'logic-chain', 'logic-gates', 'code-breaker', 'pipe-connect', 'rotation-lock'].includes(id)) return 'sequence';
  if (['speed-clicker', 'light-speed', 'lightning-round', 'precision-click', 'focus-trainer', 'flash-react'].includes(id)) return 'timing';
  if (category === 'Sports' || ['target-tap', 'archery-target', 'dart-throw'].includes(id)) return 'target';
  if (category === 'Music' || id === 'sound-react') return 'rhythm';
  if (['slider-puzzle', 'block-stack', 'gravity-fall', 'bridge-builder', 'dig-deep'].includes(id)) return 'stack';
  if (['asteroid-dodge', 'enemy-dodge', 'pac-runner', 'dino-jump', 'flappy-bird', 'meteor-storm', 'missile-command', 'donkey-climb', 'fire-escape', 'survival-mode', 'race-track', 'wave-surfer'].includes(id)) return 'lane';
  if (category === 'Action' || category === 'Arcade') return 'lane';
  if (category === 'Puzzle') return 'sequence';
  if (category === 'Reaction') return 'timing';
  return 'tap';
}

const modeCopy = {
  memory: ['Memory grid', 'Watch the lit cells, then repeat the pattern.'],
  pattern: ['Pattern lab', 'Find the one tile that matches the target.'],
  quiz: ['Question deck', 'Solve the challenge before the clock moves on.'],
  sequence: ['Sequence lock', 'Enter the signal in the exact order.'],
  timing: ['Timing lab', 'Press the button inside the target window.'],
  target: ['Precision range', 'Place your hit inside the moving target.'],
  rhythm: ['Beat station', 'Repeat the note sequence to keep the combo.'],
  stack: ['Build mode', 'Choose the piece that keeps the structure stable.'],
  lane: ['Danger run', 'Pick the lane that stays clear this round.'],
  tap: ['Arcade mode', 'Make the right move and keep your streak alive.'],
};

function titleCase(value) {
  return value.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function ArcadeGame({ game, onBack }) {
  const mode = modeFor(game.id, game.category);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [status, setStatus] = useState('playing');
  const [message, setMessage] = useState('');
  const [selected, setSelected] = useState([]);
  const [memoryVisible, setMemoryVisible] = useState(true);
  const [roundStarted, setRoundStarted] = useState(() => Date.now());

  const challenge = useMemo(() => makeMathChallenge(game.id, round), [game.id, round]);
  const sequence = useMemo(() => valuesFor(game.id, round, mode === 'rhythm' ? 4 : 3, mode === 'rhythm' ? NOTES.length : 5), [game.id, mode, round]);
  const memoryPattern = useMemo(() => [...new Set(valuesFor(game.id, round, 4, 9))], [game.id, round]);
  const patternTarget = useMemo(() => seedFor(game.id, round) % 5, [game.id, round]);
  const targetPosition = useMemo(() => ({
    left: `${15 + ((round * 37 + game.id.length * 11) % 70)}%`,
    top: `${18 + ((round * 29 + game.id.length * 7) % 62)}%`,
  }), [game.id, round]);
  const safeLane = seedFor(game.id, round) % 3;

  useEffect(() => {
    setSelected([]);
    setMemoryVisible(mode === 'memory');
    setRoundStarted(Date.now());
    if (mode === 'memory') {
      const timer = setTimeout(() => setMemoryVisible(false), 900 + round * 80);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [game.id, mode, round]);

  const finishRound = (won, points, text) => {
    setScore((current) => current + points);
    setStreak((current) => (won ? current + 1 : 0));
    setMessage(text);
    playSound(won ? 'success' : 'fail', true);
    if (round + 1 >= ROUNDS) setStatus('finished');
    else {
      setMessage('');
      setRound((current) => current + 1);
    }
  };

  const checkSequence = (value) => {
    const next = [...selected, value];
    setSelected(next);
    if (!next.every((entry, index) => entry === sequence[index])) finishRound(false, 0, 'The sequence broke. Resetting.');
    else if (next.length === sequence.length) finishRound(true, 150 + streak * 30, mode === 'rhythm' ? 'Beat locked.' : 'Sequence unlocked.');
  };

  const handleAction = (value) => {
    if (status !== 'playing') return;
    if (mode === 'quiz') {
      const won = value === challenge.answer;
      finishRound(won, won ? 150 : 0, won ? 'Correct answer.' : 'Wrong answer.');
    } else if (mode === 'pattern') {
      const won = value === patternTarget;
      finishRound(won, won ? 125 : 0, won ? 'Pattern matched.' : 'That tile was different.');
    } else if (mode === 'sequence' || mode === 'rhythm') {
      checkSequence(value);
    } else if (mode === 'memory') {
      if (selected.includes(value)) return;
      const next = [...selected, value];
      setSelected(next);
      if (!memoryPattern.includes(value)) finishRound(false, 0, 'Wrong cell.');
      else if (memoryPattern.every((entry) => next.includes(entry))) finishRound(true, 175 + streak * 30, 'Memory locked.');
    } else if (mode === 'timing') {
      const elapsed = Date.now() - roundStarted;
      const distance = Math.abs(elapsed - 900);
      const won = distance < 260;
      finishRound(won, won ? 130 + Math.max(0, 260 - distance) : 0, won ? `${elapsed}ms. In the window.` : `${elapsed}ms. Missed the window.`);
    } else if (mode === 'target') {
      const won = value === patternTarget;
      finishRound(won, won ? 140 : 0, won ? 'Clean hit.' : 'Off target.');
    } else if (mode === 'lane') {
      const won = value === safeLane;
      finishRound(won, won ? 120 + streak * 20 : 0, won ? 'Clear lane.' : 'Obstacle hit.');
    } else if (mode === 'stack') {
      const correct = (round + game.id.length) % 3;
      const won = value === correct;
      finishRound(won, won ? 160 : 0, won ? 'Stable build.' : 'The structure fell.');
    } else {
      finishRound(true, 100 + streak * 25, 'Hit confirmed.');
    }
  };

  const restart = () => {
    setRound(0);
    setScore(0);
    setStreak(0);
    setStatus('playing');
    setMessage('');
  };

  const renderBoard = () => {
    if (mode === 'quiz') {
      const options = [challenge.answer, challenge.answer + 2, Math.max(1, challenge.answer - 3)];
      return <div className="quiz-options">{options.map((option) => <button key={option} className="arcade-choice" onClick={() => handleAction(option)}>{option}</button>)}</div>;
    }
    if (mode === 'target') return <div className="target-board"><button className="moving-target" style={targetPosition} onClick={() => handleAction(patternTarget)} aria-label="Hit target"><span className="target-mark">{getGameMark(game)}</span></button></div>;
    if (mode === 'timing') return <button className="timing-button arcade-primary" onClick={() => handleAction(0)}>HIT WINDOW</button>;
    if (mode === 'lane') return <div className="lane-board">{[0, 1, 2].map((lane) => <button key={lane} className={`lane lane-${lane}`} onClick={() => handleAction(lane)}>LANE {lane + 1}</button>)}</div>;
    if (mode === 'stack') return <div className="stack-board">{[0, 1, 2].map((piece) => <button key={piece} className={`stack-piece stack-${piece}`} onClick={() => handleAction(piece)}>BLOCK {piece + 1}</button>)}</div>;
    if (mode === 'memory') return <div className="memory-board">{Array.from({ length: 9 }, (_, cell) => <button key={cell} className={`memory-cell ${memoryVisible && memoryPattern.includes(cell) ? 'revealed' : ''} ${selected.includes(cell) ? 'picked' : ''}`} disabled={memoryVisible} onClick={() => handleAction(cell)}>{memoryVisible && memoryPattern.includes(cell) ? 'ON' : ''}</button>)}</div>;
    if (mode === 'sequence' || mode === 'rhythm') return <div className="arcade-grid sequence-grid">{[0, 1, 2, 3, 4].map((value) => <button key={value} className={`arcade-tile tile-${value}`} onClick={() => handleAction(value)}>{mode === 'rhythm' ? NOTES[value] : value + 1}</button>)}</div>;
    if (mode === 'pattern') return <div className="arcade-grid pattern-grid">{[0, 1, 2, 3, 4].map((value) => <button key={value} className={`arcade-tile tile-${value}`} onClick={() => handleAction(value)}>{value === patternTarget ? 'MATCH' : 'SHIFT'}</button>)}</div>;
    return <div className="arcade-grid">{[0, 1, 2, 3, 4].map((value) => <button key={value} className={`arcade-tile tile-${value}`} onClick={() => handleAction(value)}>{['A', 'B', 'C', 'D', 'E'][value]}</button>)}</div>;
  };

  return (
    <main className={`arcade-game arcade-${mode}`}>
      <header className="arcade-topbar">
        <button className="arcade-back" onClick={onBack} aria-label="Back to games">← Games</button>
        <div><span className="arcade-kicker">{game.category} / {modeCopy[mode][0]} / Round {Math.min(round + 1, ROUNDS)} of {ROUNDS}</span><h1><span className="arcade-logo" aria-hidden="true">{getGameMark(game)}</span>{getGameName(game)}</h1></div>
        <div className="arcade-score"><span>Score</span><strong>{score}</strong></div>
      </header>
      <section className="arcade-stage">
        {status === 'finished' ? (
          <div className="arcade-result"><span className="result-mark">✦</span><p className="arcade-kicker">Run complete</p><h2>{titleCase(game.id)}</h2><strong className="final-score">{score} pts</strong><p>{score >= 650 ? 'Excellent run.' : 'Good start. One more run?'}</p><button className="arcade-primary" onClick={restart}>Play again</button></div>
        ) : (
          <><div className="arcade-intro"><p className="arcade-kicker">{modeCopy[mode][0]}</p><h2>{game.description}</h2><p className="arcade-feedback">{message || (mode === 'quiz' ? `Solve: ${challenge.prompt}` : mode === 'memory' ? (memoryVisible ? 'Memorize the lit cells.' : 'Repeat the pattern.') : mode === 'sequence' || mode === 'rhythm' ? `Signal: ${sequence.map((entry) => mode === 'rhythm' ? NOTES[entry] : entry + 1).join(' - ')}` : modeCopy[mode][1])}</p></div>{renderBoard()}</>
        )}
      </section>
    </main>
  );
}
