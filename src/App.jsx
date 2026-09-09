import { useState } from 'react';
import ReactionGame from './ReactionGame';
import BoxCatchGame from './BoxCatchGame';
import GameCatalog from './GameCatalog';
import ArcadeGame from './ArcadeGame';
import { GAMES_LIBRARY } from './gamesLibrary';

export default function App() {
  const [currentGame, setCurrentGame] = useState(null);
  const [category, setCategory] = useState(null);

  const handleGameSelect = (gameId) => {
    setCurrentGame(gameId);
  };

  const handleBackToMenu = () => {
    setCurrentGame(null);
    setCategory(null);
  };

  // Render selected game
  if (currentGame === 'reaction') {
    return (
      <>
        <ReactionGame onBack={handleBackToMenu} />
      </>
    );
  }

  if (currentGame === 'boxcatch') {
    return (
      <>
        <BoxCatchGame onBack={handleBackToMenu} />
      </>
    );
  }

  if (currentGame && currentGame !== 'reaction' && currentGame !== 'boxcatch') {
    const gameConfig = GAMES_LIBRARY.find(g => g.id === currentGame);
    if (gameConfig) {
      return <ArcadeGame game={gameConfig} onBack={handleBackToMenu} />;
    }
  }

  // Show game catalog/menu
  return (
    <GameCatalog
      onGameSelect={handleGameSelect}
      category={category}
      onCategoryChange={setCategory}
    />
  );
}
