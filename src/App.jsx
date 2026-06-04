import { useState } from 'react';
import ReactionGame from './ReactionGame';
import BoxCatchGame from './BoxCatchGame';

const GAMES = [
  { id: 'reaction', label: '⚡ Reaction Battle' },
  { id: 'boxcatch', label: '📦 Box Catch' },
];

export default function App() {
  const [game, setGame] = useState('reaction');

  return (
    <div className="container">
      <header>
        <h1>🎮 Reaction Arcade</h1>
        <div className="game-select">
          {GAMES.map((g) => (
            <button
              key={g.id}
              type="button"
              className={`game-select-btn${game === g.id ? ' active' : ''}`}
              onClick={() => setGame(g.id)}
            >
              {g.label}
            </button>
          ))}
        </div>
      </header>

      {game === 'reaction' ? <ReactionGame /> : <BoxCatchGame />}
    </div>
  );
}
