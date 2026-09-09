import { useMemo, useState } from 'react';
import { GameLogo, getGameLogoStyle, getGameName } from './ArcadeGame';

const TOTAL_TURNS = 12;

function seedFor(id, turn) {
  return [...id].reduce((total, char) => total + char.charCodeAt(0), turn * 19);
}

function mathQuestion(id, turn) {
  const seed = seedFor(id, turn);
  const left = (seed % 8) + 2;
  const right = ((seed * 3) % 7) + 2;
  return { prompt: `${left} + ${right}`, answer: left + right };
}

function modeFor(id) {
  if (id === 'color-claim') return 'color';
  if (id === 'four-lane') return 'lane';
  if (id === 'quiz-royale') return 'math';
  if (id === 'math-duel') return 'math';
  if (id === 'memory-duel') return 'memory';
  if (id === 'grid-capture') return 'grid';
  if (id === 'pong-duel') return 'pong';
  if (id === 'quick-draw') return 'draw';
  return 'tap';
}

export default function MultiplayerGame({ game, onBack }) {
  const mode = modeFor(game.id);
  const playerCount = ['color-claim', 'four-lane', 'quiz-royale', 'quad-tap'].includes(game.id) ? 4 : 2;
  const [turn, setTurn] = useState(0);
  const [scores, setScores] = useState(() => Array(playerCount).fill(0));
  const [status, setStatus] = useState('playing');
  const [message, setMessage] = useState('');
  const [memoryChoice, setMemoryChoice] = useState(null);
  const player = turn % playerCount;
  const question = useMemo(() => mathQuestion(game.id, turn), [game.id, turn]);
  const target = seedFor(game.id, turn) % 9;
  const memoryTarget = seedFor(game.id, turn) % 4;

  const resolveTurn = (won, detail) => {
    setScores((current) => current.map((score, index) => index === player && won ? score + 1 : score));
    setMessage(won ? `Player ${player + 1} scores.` : detail || 'No point this turn.');
    if (turn + 1 >= TOTAL_TURNS) setStatus('finished');
    else {
      setMemoryChoice(null);
      setTurn((current) => current + 1);
    }
  };

  const handleAction = (value) => {
    if (status !== 'playing') return;
    if (mode === 'math') resolveTurn(value === question.answer, 'Wrong answer.');
    else if (mode === 'grid') resolveTurn(value === target, 'That cell was already lost.');
    else if (mode === 'color' || mode === 'lane') resolveTurn(value === target % (mode === 'color' ? 4 : 4), 'Wrong choice.');
    else if (mode === 'memory') {
      if (memoryChoice === null) setMemoryChoice(value);
      else resolveTurn(memoryChoice === memoryTarget && value === (memoryTarget + 1) % 4, 'Memory chain missed.');
    } else if (mode === 'pong') resolveTurn(value === (seedFor(game.id, turn) % 2), 'The rally went wide.');
    else resolveTurn(true, 'Point awarded.');
  };

  const restart = () => {
    setTurn(0);
    setScores(Array(playerCount).fill(0));
    setStatus('playing');
    setMessage('');
    setMemoryChoice(null);
  };

  const board = () => {
    if (mode === 'math') {
      const options = [question.answer, question.answer + 2, Math.max(1, question.answer - 1)];
      return <div className="multi-options">{options.map((option) => <button key={option} onClick={() => handleAction(option)}>{option}</button>)}</div>;
    }
    if (mode === 'color') return <div className="multi-options multi-four-options">{['AMBER', 'CYAN', 'PINK', 'VIOLET'].map((color, index) => <button key={color} onClick={() => handleAction(index)}>{color}</button>)}</div>;
    if (mode === 'lane') return <div className="multi-options multi-four-options">{[0, 1, 2, 3].map((lane) => <button key={lane} onClick={() => handleAction(lane)}>LANE {lane + 1}</button>)}</div>;
    if (mode === 'grid') return <div className="multi-grid">{Array.from({ length: 9 }, (_, cell) => <button key={cell} className={cell === target ? 'multi-target' : ''} onClick={() => handleAction(cell)}>{cell + 1}</button>)}</div>;
    if (mode === 'memory') return <div className="multi-options memory-duel-options"><p>{memoryChoice === null ? `Remember slot ${memoryTarget + 1}` : 'Now choose the next slot'}</p>{[0, 1, 2, 3].map((value) => <button key={value} onClick={() => handleAction(value)}>{value + 1}</button>)}</div>;
    if (mode === 'pong') return <div className="multi-options"><button onClick={() => handleAction(0)}>LEFT RETURN</button><button onClick={() => handleAction(1)}>RIGHT RETURN</button></div>;
    return <button className="multi-action" onClick={() => handleAction(0)}>{mode === 'draw' ? 'DRAW NOW' : 'TAP TO SCORE'}</button>;
  };

  return (
    <main className="multiplayer-game">
      <header className="arcade-topbar">
        <button className="arcade-back" onClick={onBack}>← Games</button>
        <div><span className="arcade-kicker">Multiplayer / Turn {Math.min(turn + 1, TOTAL_TURNS)} of {TOTAL_TURNS}</span><h1><GameLogo game={game} className="arcade-logo" style={getGameLogoStyle(game)} />{getGameName(game)}</h1></div>
        <div className={`multi-scores ${playerCount === 4 ? 'multi-scores-four' : ''}`}>{scores.map((score, index) => <span key={index}>P{index + 1} {score}</span>)}</div>
      </header>
      <section className="arcade-stage multiplayer-stage">
        {status === 'finished' ? (
          <div className="arcade-result"><span className="result-mark">VS</span><p className="arcade-kicker">Match complete</p><h2>{new Set(scores).size === 1 ? 'Draw game' : `Player ${scores.indexOf(Math.max(...scores)) + 1} wins`}</h2><strong className="final-score">{scores.join(' - ')}</strong><button className="arcade-primary" onClick={restart}>Rematch</button></div>
        ) : (
          <><div className="arcade-intro"><p className="arcade-kicker">Player {player + 1} turn</p><h2>{game.description}</h2><p className="arcade-feedback">{message || 'Take your turn, then pass the controls.'}</p></div>{board()}</>
        )}
      </section>
    </main>
  );
}