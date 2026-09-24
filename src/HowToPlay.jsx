export default function HowToPlay({ onBack }) {
  return (
    <div className="info-page">
      <button className="back-btn" onClick={onBack}>← Back to Games</button>

      <article className="info-content">
        <h1>How to Play – Tips &amp; Guide</h1>
        <p className="info-lead">
          New to Reaction Arcade? Here is everything you need to know to get started, improve your
          scores, and get the most out of all 100+ games.
        </p>

        <section>
          <h2>Getting Started</h2>
          <ol className="info-list">
            <li>Open Reaction Arcade in any modern browser — no account or download needed.</li>
            <li>Browse the game library on the home screen. Use the <strong>category sidebar</strong> to filter by game type, or the <strong>search bar</strong> to find a specific game by name or description.</li>
            <li>Click or tap any game card to launch it instantly.</li>
            <li>Hit <strong>← Back to Games</strong> at any time to return to the library.</li>
          </ol>
        </section>

        <section>
          <h2>⚡ Reaction Games – Tips</h2>
          <ul className="info-list">
            <li><strong>Reaction Battle:</strong> Keep your finger or cursor hovering over the game area before it turns green. The moment you see green, click or tap immediately. Anticipating is penalised — wait for it!</li>
            <li><strong>Pro Mode</strong> uses a shorter random delay window (1–3 s vs 2–5 s), making it harder to predict. Great for training after you consistently hit sub-250 ms in Normal.</li>
            <li>The human average reaction time is 200–300 ms. Under 200 ms is excellent; under 150 ms is world-class.</li>
            <li>Reduce distractions — a quiet environment and a stable internet connection make a measurable difference.</li>
            <li>On mobile, tap with your index finger rather than your thumb for faster response.</li>
          </ul>
        </section>

        <section>
          <h2>📦 Action Games – Tips</h2>
          <ul className="info-list">
            <li><strong>Box Catch:</strong> Watch the spawn edge, not the box itself. Moving toward where boxes appear cuts your travel distance in half.</li>
            <li><strong>Asteroid Dodge:</strong> Stay near the centre of the arena — it gives you the maximum escape distance in every direction.</li>
            <li><strong>Brick Breaker:</strong> Aim for corners and edges first; clearing a path to the back row lets you chain multiple hits per bounce.</li>
            <li>Most action games reward <em>consistent positioning</em> over reactive movement. Set yourself up well and the hard choices become easy.</li>
          </ul>
        </section>

        <section>
          <h2>💎 Puzzle Games – Tips</h2>
          <ul className="info-list">
            <li><strong>Slider Puzzle:</strong> Solve corner pieces first, then work inward. Never disturb a solved corner while fixing another.</li>
            <li><strong>Match Three:</strong> Prioritise moves that create T- or L-shaped matches — they trigger cascades that clear more tiles.</li>
            <li><strong>Pipe Connect:</strong> Trace dead ends first. Any pipe with only one possible direction is a forced move and eliminates ambiguity for adjacent tiles.</li>
            <li>Take your time — puzzle games are not timed in most cases, so accuracy beats speed.</li>
          </ul>
        </section>

        <section>
          <h2>👾 Arcade Games – Tips</h2>
          <ul className="info-list">
            <li><strong>Snake Master:</strong> Hug the walls in a spiral pattern to maximise space and avoid cutting yourself off.</li>
            <li><strong>Flappy Bird:</strong> Tap in short, rapid pulses rather than long holds. Aim to pass through the exact vertical centre of each gap.</li>
            <li><strong>Space Invaders:</strong> Shoot the outermost invaders first to widen your safe movement lanes.</li>
            <li><strong>Pong Master:</strong> Predict where the ball will land instead of tracking it. Move your paddle to the destination, not the ball.</li>
          </ul>
        </section>

        <section>
          <h2>🧠 Brain Games – Tips</h2>
          <ul className="info-list">
            <li><strong>Memory Cards:</strong> Group cards mentally by position (e.g., "top-left corner is the star"). Spatial memory is stronger than abstract memory for most people.</li>
            <li><strong>Math Quest:</strong> For multiplication, break numbers down (e.g., 17 × 8 = 16 × 8 + 8 = 136). Chunking makes mental arithmetic much faster.</li>
            <li><strong>Trivia Master:</strong> If unsure, eliminate obviously wrong answers first. Your odds improve dramatically from 1-in-4 to 1-in-2.</li>
            <li>Brain games improve most with regular short sessions — 10 minutes daily beats one 60-minute marathon per week.</li>
          </ul>
        </section>

        <section>
          <h2>🎵 Music Games – Tips</h2>
          <ul className="info-list">
            <li><strong>Piano Master:</strong> Use keyboard shortcuts if playing on desktop — it's significantly faster than clicking.</li>
            <li><strong>Rhythm Game:</strong> Focus on the beat, not the visuals. Tap to the audio cue even if the visual indicator seems slightly off.</li>
            <li><strong>Beat Matcher:</strong> Tap slightly <em>before</em> you think the beat hits — input latency on most devices adds 30–80 ms of delay.</li>
          </ul>
        </section>

        <section>
          <h2>👥 Multiplayer Games – Tips</h2>
          <ul className="info-list">
            <li>All multiplayer games are <strong>local</strong> (pass-the-device or shared screen) — no internet opponent needed.</li>
            <li><strong>Split Screen Duel:</strong> Each player gets their own half of the screen. Tap your side the instant the signal appears.</li>
            <li><strong>Quiz Royale:</strong> Up to 4 players compete simultaneously. Agree on keyboard zones beforehand so no one reaches across.</li>
            <li>For the fairest competition, play on a tablet or large phone held horizontally.</li>
          </ul>
        </section>

        <section>
          <h2>Leaderboards &amp; Scores</h2>
          <p>
            Every game tracks your personal best, average, and total plays. Scores are saved automatically
            in your browser's local storage — they persist across sessions on the same device and browser.
            Clearing your browser data will reset scores, so avoid doing that if you want to keep your records.
          </p>
        </section>

        <section>
          <h2>Controls Reference</h2>
          <ul className="info-list">
            <li><strong>Desktop:</strong> Mouse click or keyboard keys (Space / Enter to interact in most games)</li>
            <li><strong>Mobile / Tablet:</strong> Tap or swipe — all games are touch-optimised with minimum 44×44 px touch targets</li>
            <li><strong>Sound:</strong> Toggle the SOUND / MUTE button in the footer of any game</li>
          </ul>
        </section>
      </article>
    </div>
  );
}
