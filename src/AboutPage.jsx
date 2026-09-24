export default function AboutPage({ onBack }) {
  return (
    <div className="info-page">
      <button className="back-btn" onClick={onBack}>← Back to Games</button>

      <article className="info-content">
        <h1>About Reaction Arcade</h1>
        <p className="info-lead">
          Reaction Arcade is a free browser-based gaming platform featuring over 100 mini games
          organized across 7 categories — all playable instantly with no download, no login, and no cost.
        </p>

        <section>
          <h2>Our Mission</h2>
          <p>
            We believe that quick, engaging games should be accessible to everyone. Whether you have
            five minutes between tasks or want to seriously train your reflexes, Reaction Arcade gives
            you a diverse library of games that challenge your speed, memory, logic, and creativity.
          </p>
          <p>
            Every game in the library is built with pure web technologies — React, CSS, and the
            browser Canvas API — so they run smoothly on any modern device, from a desktop PC to a
            smartphone, without plugins or installs.
          </p>
        </section>

        <section>
          <h2>What You Can Play</h2>
          <ul className="info-list">
            <li><strong>⚡ Reaction Games (15)</strong> — Classic reaction-time tests, flash response, number hunts, and multi-stimulus challenges. Great for measuring and improving your raw reflex speed.</li>
            <li><strong>📦 Action Games (15)</strong> — Dodge asteroids, catch boxes, break bricks, control aircraft, and build combo multipliers in fast-paced skill games.</li>
            <li><strong>💎 Puzzle Games (15)</strong> — Slide tiles, match gems, connect pipes, solve sudoku, and use gravity physics to work through satisfying logic puzzles.</li>
            <li><strong>👾 Arcade Games (15)</strong> — Snake, Pong, Space Invaders-style shooters, Dino Jump, Flappy Bird, and more classic arcade formats reimagined for the browser.</li>
            <li><strong>⚽ Sports Games (15)</strong> — Basketball shots, soccer goals, tennis rallies, golf putting, bowling strikes, dart throws, and a dozen other sports mini-games.</li>
            <li><strong>🧠 Brain Games (15)</strong> — Memory cards, IQ challenges, math quests, trivia, spot-the-difference, code breaking, and geography quizzes to keep your mind sharp.</li>
            <li><strong>🎵 Music Games (10)</strong> — Piano, drums, guitar, rhythm, beat matching, and melody challenges for players who love music-based gameplay.</li>
            <li><strong>👥 Multiplayer Games (11)</strong> — Local two- and four-player games including Pong Duel, Quiz Royale, Grid Capture, and Split Screen Duel — pass the screen and compete.</li>
          </ul>
        </section>

        <section>
          <h2>Features</h2>
          <ul className="info-list">
            <li>Persistent leaderboards saved locally — your scores stay between sessions</li>
            <li>Search and category filtering to quickly find the game you want</li>
            <li>Normal and Pro difficulty modes on supported games</li>
            <li>Sound effects with a one-tap mute toggle</li>
            <li>Fully responsive — optimised for both touch and mouse/keyboard</li>
            <li>Dark mode UI designed for extended play sessions</li>
          </ul>
        </section>

        <section>
          <h2>About the Creator</h2>
          <p>
            Reaction Arcade is built and maintained by <strong>Sai Aman Zakirsha</strong>, an independent
            developer passionate about web technologies and interactive experiences. The project started
            as a single reaction-time test and grew into a full arcade platform through ongoing community
            feedback and incremental development.
          </p>
          <p>
            Follow updates, behind-the-scenes development videos, and new game announcements on the{' '}
            <a
              href="https://youtube.com/@amanshift?si=fesbTinHNwQ4Slp6"
              target="_blank"
              rel="noreferrer"
            >
              AmanShift YouTube channel
            </a>.
          </p>
        </section>

        <section>
          <h2>Technology</h2>
          <p>
            The platform is built with <strong>React 18</strong> and bundled with <strong>Vite</strong>
            for fast load times. Games use a combination of React state, the browser Canvas API, and
            requestAnimationFrame loops. All score data is stored in the browser's{' '}
            <code>localStorage</code> — nothing is sent to any server.
          </p>
        </section>
      </article>
    </div>
  );
}
