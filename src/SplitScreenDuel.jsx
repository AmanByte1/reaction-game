import { useCallback, useEffect, useRef, useState } from 'react';
import { GameLogo, getGameLogoStyle, getGameName } from './ArcadeGame';

function randomDelay() {
  return 1000 + Math.floor(Math.random() * 9001);
}

export default function SplitScreenDuel({ game, onBack }) {
  const [round, setRound] = useState(1);
  const [phase, setPhase] = useState('ready');
  const [winner, setWinner] = useState(null);
  const [falseStart, setFalseStart] = useState(null);
  const [delaySeconds, setDelaySeconds] = useState(0);
  const timeoutRef = useRef(null);
  const startedAtRef = useRef(0);

  const beginRound = useCallback(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    const delay = randomDelay();
    setPhase('waiting');
    setWinner(null);
    setFalseStart(null);
    setDelaySeconds(Math.round(delay / 100) / 10);
    timeoutRef.current = window.setTimeout(() => {
      startedAtRef.current = performance.now();
      setPhase('go');
    }, delay);
  }, []);

  useEffect(() => {
    beginRound();
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [beginRound, round]);

  const handleTouch = (player) => {
    if (phase === 'waiting') {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      setFalseStart(player);
      setPhase('false-start');
      return;
    }
    if (phase !== 'go') return;
    setWinner({ player, time: Math.round(performance.now() - startedAtRef.current) });
    setPhase('winner');
  };

  const nextRound = () => setRound((current) => current + 1);

  return (
    <main className="split-duel">
      <header className="split-duel-header">
        <button className="arcade-back" onClick={onBack}>← Games</button>
        <div><span className="arcade-kicker">Simultaneous duel / Round {round}</span><h1><GameLogo game={game} className="arcade-logo" style={getGameLogoStyle(game)} />{getGameName(game)}</h1></div>
        <span className="split-duel-rule">FIRST TOUCH WINS</span>
      </header>
      <section className={`split-arena split-${phase}`}>
        <button className="split-half split-player-one" onPointerDown={() => handleTouch(1)} aria-label="Player 1 touch zone"><span>PLAYER 1</span><strong>{phase === 'go' ? 'TOUCH' : 'READY'}</strong></button>
        <div className="split-center-line" aria-hidden="true"><span>{phase === 'waiting' ? `${delaySeconds}s` : phase === 'go' ? 'GO' : phase === 'false-start' ? 'EARLY' : winner ? `${winner.time}ms` : 'VS'}</span></div>
        <button className="split-half split-player-two" onPointerDown={() => handleTouch(2)} aria-label="Player 2 touch zone"><span>PLAYER 2</span><strong>{phase === 'go' ? 'TOUCH' : 'READY'}</strong></button>
        <div className="split-message" aria-live="polite">
          {phase === 'waiting' && 'Do not touch yet. Wait for the signal.'}
          {phase === 'go' && 'Touch your side now.'}
          {phase === 'false-start' && `Player ${falseStart} moved early.`}
          {phase === 'winner' && `Player ${winner.player} wins the round.`}
        </div>
      </section>
      {(phase === 'false-start' || phase === 'winner') && <button className="arcade-primary split-next" onClick={nextRound}>{phase === 'winner' ? 'Next round' : 'Try again'}</button>}
    </main>
  );
}