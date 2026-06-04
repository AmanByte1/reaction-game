// Difficulty + helpers for the Box Catch game.

// Adaptive "AI-like" difficulty:
//   score > 20            -> Hard   (fastest)
//   score > 10            -> Medium
//   otherwise             -> Easy
//   misses > 5            -> step one level slower ("slow down game")
export function getDifficulty(score, misses) {
  let level = 0;
  if (score > 10) level = 1;
  if (score > 20) level = 2;
  if (misses > 5) level = Math.max(0, level - 1);

  switch (level) {
    case 2:
      return { level, label: 'Hard', interval: 700 };
    case 1:
      return { level, label: 'Medium', interval: 1000 };
    default:
      return { level, label: 'Easy', interval: 1500 };
  }
}

export function getDifficultyColor(label) {
  switch (label) {
    case 'Hard':
      return 'var(--accent-red)';
    case 'Medium':
      return 'var(--accent-yellow)';
    default:
      return 'var(--accent-green)';
  }
}

// Random box position as a percentage of the play area, keeping the whole box
// inside the bounds (boxSize is a percentage of the area width/height).
export function randomBoxPosition(boxSize = 18) {
  const max = 100 - boxSize;
  return {
    top: Math.random() * max,
    left: Math.random() * max,
  };
}

export function getAverage(times) {
  if (times.length === 0) return 0;
  return Math.round(times.reduce((sum, t) => sum + t, 0) / times.length);
}

export function loadBoxCatchBest() {
  const saved = localStorage.getItem('boxCatchBestScore');
  return saved ? Number(saved) : 0;
}

export function saveBoxCatchBest(score) {
  localStorage.setItem('boxCatchBestScore', String(score));
}
