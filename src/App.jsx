import { useState } from 'react';
import ReactionGame from './ReactionGame';
import BoxCatchGame from './BoxCatchGame';
import GameCatalog from './GameCatalog';
import ArcadeGame from './ArcadeGame';
import MultiplayerGame from './MultiplayerGame';
import SplitScreenDuel from './SplitScreenDuel';
import AboutPage from './AboutPage';
import PrivacyPage from './PrivacyPage';
import ContactPage from './ContactPage';
import HowToPlay from './HowToPlay';
import { GAMES_LIBRARY } from './gamesLibrary';

export default function App() {
  const [currentGame, setCurrentGame] = useState(null);
  const [category, setCategory] = useState(null);
  const [page, setPage] = useState(null); // 'about' | 'privacy' | 'contact' | 'howtoplay'

  const handleGameSelect = (gameId) => {
    setCurrentGame(gameId);
    setPage(null);
  };

  const handleBackToMenu = () => {
    setCurrentGame(null);
    setCategory(null);
    setPage(null);
  };

  // Info pages
  if (page === 'about')    return <AboutPage    onBack={handleBackToMenu} />;
  if (page === 'privacy')  return <PrivacyPage  onBack={handleBackToMenu} />;
  if (page === 'contact')  return <ContactPage  onBack={handleBackToMenu} />;
  if (page === 'howtoplay') return <HowToPlay   onBack={handleBackToMenu} />;

  // Render selected game
  if (currentGame === 'reaction') {
    return <ReactionGame onBack={handleBackToMenu} />;
  }

  if (currentGame === 'boxcatch') {
    return <BoxCatchGame onBack={handleBackToMenu} />;
  }

  const selectedConfig = currentGame && GAMES_LIBRARY.find(g => g.id === currentGame);
  if (selectedConfig?.id === 'split-screen-duel') {
    return <SplitScreenDuel game={selectedConfig} onBack={handleBackToMenu} />;
  }
  if (selectedConfig?.category === 'Multiplayer') {
    return <MultiplayerGame game={selectedConfig} onBack={handleBackToMenu} />;
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
      onPageNavigate={setPage}
    />
  );
}
