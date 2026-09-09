import { useEffect, useMemo, useState } from 'react';
import { playSound } from './gameUtils';

const COLORS = ['#ffcf56', '#52d6c7', '#ff7a90', '#8e9cff', '#f58cff'];
const DEFAULT_ROUNDS = 8;

export function getGameName(game) {
  return game.label.replace(/^\S+\s+/, '');
}

export function getGameMark(game) {
  return getGameName(game)
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
}

function makeChallenge(id, round) {
  const seed = [...id].reduce((total, char) => total + char.charCodeAt(0), round * 17);
  const left = (seed % 9) + 2;
  const right = ((seed * 3) % 8) + 2;
  const operations = [
    { prompt: `${left} + ${right}`, answer: left + right },
    { prompt: `${left} x ${right}`, answer: left * right },
    { prompt: `${left + right} - ${left}`, answer: right },
  ];
  return operations[seed % operations.length];
}

function titleCase(value) {
  return value.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function profileFor(game) {
  if (game.category === 'Brain' || game.category === 'Puzzle') return 'quiz';
  if (game.category === 'Sports') return 'target';
  if (game.category === 'Music') return 'rhythm';
  if (game.category === 'Arcade' || game.category === 'Action') return 'dodge';
  return 'tap';
}

export default function ArcadeGame({ game, onBack }) {
  const profile = profileFor(game);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [status, setStatus] = useState('playing');
  const [message, setMessage] = useState('');
  const [target, setTarget] = useState(() => Math.floor(Math.random() * 5));
  const [prompt, setPrompt] = useState(() => makeChallenge(game.id, 0));
  const [options, setOptions] = useState([]);

  const targetPosition = useMemo(() => ({
    left: `${15 + ((round * 37 + game.id.length * 11) % 70)}%`,
    top: `${18 + ((round * 29 + game.id.length * 7) % 62)}%`,
  }), [game.id, round]);

  useEffect(() => {
    if (profile !== 'quiz') return;
    const next = makeChallenge(game.id, round);
    setPrompt(next);
    setOptions([next.answer, next.answer + 2, Math.max(1, next.answer - 3)].sort(() => Math.random() - 0.5));
  }, [game.id, profile, round]);

  const finish = (won, points, text) => {
    const nextScore = score + points;
    setScore(nextScore);
    setMessage(text);
    setStreak(won ? streak + 1 : 0);
    if (round + 1 >= DEFAULT_ROUNDS) {
      setStatus('finished');
      playSound(won ? 'success' : 'fail', true);
      return;
    }
    setRound(round + 1);
    setTarget(Math.floor(Math.random() * 5));
    playSound(won ? 'success' : 'fail', true);
  };

  const handleTap = (value) => {
    if (status !== 'playing') return;
    if (profile === 'quiz') {
      finish(value === prompt.answer, value === prompt.answer ? 100 : 0, value === prompt.answer ? 'Correct' : 'Try the next one');
      return;
    }
    if (profile === 'target') {
      finish(value === target, value === target ? 100 : 0, value === target ? 'On target' : 'Missed');
      return;
    }
    finish(true, 100 + streak * 25, profile === 'rhythm' ? 'Perfect beat' : 'Nice hit');
  };

  const restart = () => {
    setRound(0);
    setScore(0);
    setStreak(0);
    setStatus('playing');
    setMessage('');
    setTarget(Math.floor(Math.random() * 5));
  };

  return (
    <main className={`arcade-game arcade-${profile}`}>
      <header className="arcade-topbar">
        <button className="arcade-back" onClick={onBack} aria-label="Back to games">← Games</button>
        <div>
          <span className="arcade-kicker">{game.category} / Round {Math.min(round + 1, DEFAULT_ROUNDS)} of {DEFAULT_ROUNDS}</span>
          <h1><span className="arcade-logo" aria-hidden="true">{getGameMark(game)}</span>{getGameName(game)}</h1>
        </div>
        <div className="arcade-score"><span>Score</span><strong>{score}</strong></div>
      </header>

      <section className="arcade-stage">
        {status === 'finished' ? (
          <div className="arcade-result">
            <span className="result-mark">✦</span>
            <p className="arcade-kicker">Run complete</p>
            <h2>{titleCase(game.id)}</h2>
            <strong className="final-score">{score} pts</strong>
            <p>{score >= 600 ? 'Excellent run.' : 'Good start. One more run?'}</p>
            <button className="arcade-primary" onClick={restart}>Play again</button>
          </div>
        ) : (
          <>
            <div className="arcade-intro">
              <p className="arcade-kicker">{profile === 'quiz' ? 'Think fast' : profile === 'target' ? 'Precision drill' : profile === 'rhythm' ? 'Find the beat' : 'Stay alive'}</p>
              <h2>{game.description}</h2>
              <p className="arcade-feedback">{message || (profile === 'quiz' ? `Solve: ${prompt.prompt}` : profile === 'target' ? 'Hit the highlighted target.' : 'Choose a tile to keep the run alive.')}</p>
            </div>

            {profile === 'quiz' ? (
              <div className="quiz-options">
                {options.map((option) => <button key={option} className="arcade-choice" onClick={() => handleTap(option)}>{option}</button>)}
              </div>
            ) : profile === 'target' ? (
              <div className="target-board">
                <button className="moving-target" style={targetPosition} onClick={() => handleTap(target)} aria-label="Hit target"><span className="target-mark">{getGameMark(game)}</span></button>
              </div>
            ) : (
              <div className="arcade-grid">
                {[0, 1, 2, 3, 4].map((value) => <button key={value} className={`arcade-tile tile-${value}`} onClick={() => handleTap(value)}>{profile === 'rhythm' ? ['♪', '♫', '♩', '♬', '♪'][value] : ['A', 'B', 'C', 'D', 'E'][value]}</button>)}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}