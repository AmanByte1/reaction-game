import { useState } from 'react';
import { GAMES_LIBRARY, GAME_CATEGORIES, getGamesByCategory } from './gamesLibrary';
import { getGameMark, getGameName } from './ArcadeGame';

export default function GameCatalog({ onGameSelect, category, onCategoryChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const selectedCategory = category || 'all';
  
  const games = getGamesByCategory(selectedCategory);
  
  const filteredGames = games.filter(game =>
    game.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="game-catalog">
      <header className="catalog-header">
        <div className="header-top">
          <h1><span className="brand-logo" aria-hidden="true">RA</span> Reaction Arcade</h1>
          <p className="subtitle">100+ Mini Games Library</p>
        </div>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </header>

      <div className="catalog-container">
        {/* Sidebar Categories */}
        <aside className="categories-sidebar">
          <h3>Categories</h3>
          <div className="category-list">
            {GAME_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => {
                  onCategoryChange(cat.id === 'all' ? null : cat.id);
                  setSearchQuery('');
                }}
              >
                <span className="cat-label">{cat.label}</span>
                <span className="cat-count">{cat.count}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="games-main">
          <div className="catalog-header-secondary">
            <h2>{selectedCategory === 'all' ? 'All Games' : `${selectedCategory} Games`}</h2>
            <p className="game-count">{filteredGames.length} game{filteredGames.length !== 1 ? 's' : ''}</p>
          </div>

          <div className="games-grid">
            {filteredGames.length > 0 ? (
              filteredGames.map(game => (
                <div
                  key={game.id}
                  className="game-card"
                  onClick={() => onGameSelect(game.id)}
                >
                  <div className="game-card-content">
                    <div className={`game-logo logo-${game.category.toLowerCase()}`} aria-hidden="true">{getGameMark(game)}</div>
                    <h3 className="game-title">{getGameName(game)}</h3>
                    <p className="game-description">{game.description}</p>
                    <span className="game-category">{game.category}</span>
                  </div>
                  <div className="game-card-hover">
                    <span>▶ Play Now</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-games">
                <p>No games found matching your search.</p>
                <button 
                  className="reset-btn"
                  onClick={() => {
                    setSearchQuery('');
                    onCategoryChange(null);
                  }}
                >
                  Reset Search
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      <footer className="catalog-footer">
        <p><span className="status-mark" aria-hidden="true">●</span> Arcade network online</p>
      </footer>
    </div>
  );
}
