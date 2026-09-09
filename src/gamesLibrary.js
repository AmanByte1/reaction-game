// Game Library with 100 games organized by category
// Each game includes: id, label, category, emoji, description, component

export const GAMES_LIBRARY = [
  // REACTION GAMES (Category 1) - 15 games
  {
    id: 'reaction',
    label: '⚡ Reaction Battle',
    category: 'Reaction',
    emoji: '⚡',
    description: 'Test your reaction speed',
    isCore: true
  },
  {
    id: 'memory-tap',
    label: '🧠 Memory Tap',
    category: 'Reaction',
    emoji: '🧠',
    description: 'Tap tiles in sequence'
  },
  {
    id: 'color-match',
    label: '🎨 Color Match',
    category: 'Reaction',
    emoji: '🎨',
    description: 'Match colors as fast as you can'
  },
  {
    id: 'sound-react',
    label: '🔊 Sound React',
    category: 'Reaction',
    emoji: '🔊',
    description: 'React to sound signals'
  },
  {
    id: 'speed-clicker',
    label: '⚡ Speed Clicker',
    category: 'Reaction',
    emoji: '⚡',
    description: 'Click as many times as possible'
  },
  {
    id: 'visual-react',
    label: '👀 Visual React',
    category: 'Reaction',
    emoji: '👀',
    description: 'React to visual cues'
  },
  {
    id: 'flash-react',
    label: '💥 Flash React',
    category: 'Reaction',
    emoji: '💥',
    description: 'Tap when the screen flashes'
  },
  {
    id: 'number-hunt',
    label: '🔢 Number Hunt',
    category: 'Reaction',
    emoji: '🔢',
    description: 'Find numbers quickly'
  },
  {
    id: 'light-speed',
    label: '🌟 Light Speed',
    category: 'Reaction',
    emoji: '🌟',
    description: 'Ultimate speed challenge'
  },
  {
    id: 'multi-react',
    label: '🎯 Multi React',
    category: 'Reaction',
    emoji: '🎯',
    description: 'Multiple stimulus reaction'
  },
  {
    id: 'pattern-match',
    label: '📋 Pattern Match',
    category: 'Reaction',
    emoji: '📋',
    description: 'Match patterns quickly'
  },
  {
    id: 'sequence-beat',
    label: '🎵 Sequence Beat',
    category: 'Reaction',
    emoji: '🎵',
    description: 'Follow musical sequences'
  },
  {
    id: 'target-tap',
    label: '🎪 Target Tap',
    category: 'Reaction',
    emoji: '🎪',
    description: 'Tap moving targets'
  },
  {
    id: 'precision-click',
    label: '🎯 Precision Click',
    category: 'Reaction',
    emoji: '🎯',
    description: 'Accurate clicking game'
  },
  {
    id: 'lightning-round',
    label: '⚡ Lightning Round',
    category: 'Reaction',
    emoji: '⚡',
    description: 'Fast-paced reaction battle'
  },

  // ACTION GAMES (Category 2) - 15 games
  {
    id: 'boxcatch',
    label: '📦 Box Catch',
    category: 'Action',
    emoji: '📦',
    description: 'Catch falling boxes',
    isCore: true
  },
  {
    id: 'ball-bounce',
    label: '⚽ Ball Bounce',
    category: 'Action',
    emoji: '⚽',
    description: 'Keep ball bouncing'
  },
  {
    id: 'brick-breaker',
    label: '🧱 Brick Breaker',
    category: 'Action',
    emoji: '🧱',
    description: 'Break all the bricks'
  },
  {
    id: 'asteroid-dodge',
    label: '🌑 Asteroid Dodge',
    category: 'Action',
    emoji: '🌑',
    description: 'Avoid asteroids'
  },
  {
    id: 'survival-mode',
    label: '💪 Survival Mode',
    category: 'Action',
    emoji: '💪',
    description: 'Survive as long as possible'
  },
  {
    id: 'platform-jump',
    label: '🎮 Platform Jump',
    category: 'Action',
    emoji: '🎮',
    description: 'Jump to avoid obstacles'
  },
  {
    id: 'enemy-dodge',
    label: '👾 Enemy Dodge',
    category: 'Action',
    emoji: '👾',
    description: 'Dodge enemy fire'
  },
  {
    id: 'power-surge',
    label: '⚡ Power Surge',
    category: 'Action',
    emoji: '⚡',
    description: 'Collect power-ups'
  },
  {
    id: 'flight-control',
    label: '✈️ Flight Control',
    category: 'Action',
    emoji: '✈️',
    description: 'Control flying object'
  },
  {
    id: 'combo-attack',
    label: '🔥 Combo Attack',
    category: 'Action',
    emoji: '🔥',
    description: 'Build combo multipliers'
  },
  {
    id: 'shield-defense',
    label: '🛡️ Shield Defense',
    category: 'Action',
    emoji: '🛡️',
    description: 'Defend against attack'
  },
  {
    id: 'race-track',
    label: '🏎️ Race Track',
    category: 'Action',
    emoji: '🏎️',
    description: 'Drive and avoid obstacles'
  },
  {
    id: 'treasure-run',
    label: '💎 Treasure Run',
    category: 'Action',
    emoji: '💎',
    description: 'Collect treasures'
  },
  {
    id: 'wave-surfer',
    label: '🌊 Wave Surfer',
    category: 'Action',
    emoji: '🌊',
    description: 'Surf the waves'
  },
  {
    id: 'fire-escape',
    label: '🔥 Fire Escape',
    category: 'Action',
    emoji: '🔥',
    description: 'Escape from fire'
  },

  // PUZZLE GAMES (Category 3) - 15 games
  {
    id: 'match-three',
    label: '💎 Match Three',
    category: 'Puzzle',
    emoji: '💎',
    description: 'Match three gems'
  },
  {
    id: 'slider-puzzle',
    label: '🔲 Slider Puzzle',
    category: 'Puzzle',
    emoji: '🔲',
    description: 'Slide tiles to complete'
  },
  {
    id: 'shape-fit',
    label: '⬛ Shape Fit',
    category: 'Puzzle',
    emoji: '⬛',
    description: 'Fit shapes into grid'
  },
  {
    id: 'logic-chain',
    label: '🔗 Logic Chain',
    category: 'Puzzle',
    emoji: '🔗',
    description: 'Solve logic puzzles'
  },
  {
    id: 'word-scramble',
    label: '📝 Word Scramble',
    category: 'Puzzle',
    emoji: '📝',
    description: 'Unscramble words'
  },
  {
    id: 'number-sudoku',
    label: '🔢 Number Sudoku',
    category: 'Puzzle',
    emoji: '🔢',
    description: 'Solve number puzzles'
  },
  {
    id: 'pipe-connect',
    label: '🔧 Pipe Connect',
    category: 'Puzzle',
    emoji: '🔧',
    description: 'Connect all pipes'
  },
  {
    id: 'block-stack',
    label: '📦 Block Stack',
    category: 'Puzzle',
    emoji: '📦',
    description: 'Stack blocks perfectly'
  },
  {
    id: 'gravity-fall',
    label: '⬇️ Gravity Fall',
    category: 'Puzzle',
    emoji: '⬇️',
    description: 'Use gravity to solve'
  },
  {
    id: 'light-puzzle',
    label: '💡 Light Puzzle',
    category: 'Puzzle',
    emoji: '💡',
    description: 'Turn on all lights'
  },
  {
    id: 'path-finder',
    label: '🛣️ Path Finder',
    category: 'Puzzle',
    emoji: '🛣️',
    description: 'Find the escape path'
  },
  {
    id: 'rotation-lock',
    label: '🔄 Rotation Lock',
    category: 'Puzzle',
    emoji: '🔄',
    description: 'Rotate to unlock'
  },
  {
    id: 'color-cascade',
    label: '🌈 Color Cascade',
    category: 'Puzzle',
    emoji: '🌈',
    description: 'Match cascading colors'
  },
  {
    id: 'symmetry-solve',
    label: '✨ Symmetry Solve',
    category: 'Puzzle',
    emoji: '✨',
    description: 'Create symmetry'
  },
  {
    id: 'bridge-builder',
    label: '🌉 Bridge Builder',
    category: 'Puzzle',
    emoji: '🌉',
    description: 'Build bridges to cross'
  },

  // ARCADE GAMES (Category 4) - 15 games
  {
    id: 'space-invaders',
    label: '👾 Space Invaders',
    category: 'Arcade',
    emoji: '👾',
    description: 'Classic space shooter'
  },
  {
    id: 'pac-runner',
    label: '👻 Pac Runner',
    category: 'Arcade',
    emoji: '👻',
    description: 'Chase and avoid'
  },
  {
    id: 'snake-master',
    label: '🐍 Snake Master',
    category: 'Arcade',
    emoji: '🐍',
    description: 'Classic snake game'
  },
  {
    id: 'dino-jump',
    label: '🦕 Dino Jump',
    category: 'Arcade',
    emoji: '🦕',
    description: 'Jump over obstacles'
  },
  {
    id: 'flappy-bird',
    label: '🐦 Flappy Bird',
    category: 'Arcade',
    emoji: '🐦',
    description: 'Navigate through pipes'
  },
  {
    id: 'zombie-shooter',
    label: '🧟 Zombie Shooter',
    category: 'Arcade',
    emoji: '🧟',
    description: 'Shoot zombies'
  },
  {
    id: 'meteor-storm',
    label: '☄️ Meteor Storm',
    category: 'Arcade',
    emoji: '☄️',
    description: 'Dodge falling meteors'
  },
  {
    id: 'robot-battle',
    label: '🤖 Robot Battle',
    category: 'Arcade',
    emoji: '🤖',
    description: 'Battle robots'
  },
  {
    id: 'alien-invasion',
    label: '👽 Alien Invasion',
    category: 'Arcade',
    emoji: '👽',
    description: 'Defend against aliens'
  },
  {
    id: 'missile-command',
    label: '🚀 Missile Command',
    category: 'Arcade',
    emoji: '🚀',
    description: 'Defend from missiles'
  },
  {
    id: 'pong-master',
    label: '🏓 Pong Master',
    category: 'Arcade',
    emoji: '🏓',
    description: 'Classic pong game'
  },
  {
    id: 'galaga-attack',
    label: '⭐ Galaga Attack',
    category: 'Arcade',
    emoji: '⭐',
    description: 'Classic arcade shooter'
  },
  {
    id: 'dig-deep',
    label: '⛏️ Dig Deep',
    category: 'Arcade',
    emoji: '⛏️',
    description: 'Dig for treasure'
  },
  {
    id: 'time-pilot',
    label: '⏰ Time Pilot',
    category: 'Arcade',
    emoji: '⏰',
    description: 'Travel through time'
  },
  {
    id: 'donkey-climb',
    label: '🦍 Donkey Climb',
    category: 'Arcade',
    emoji: '🦍',
    description: 'Climb and avoid barrels'
  },

  // SPORTS GAMES (Category 5) - 15 games
  {
    id: 'basketball-shot',
    label: '🏀 Basketball Shot',
    category: 'Sports',
    emoji: '🏀',
    description: 'Make basketball shots'
  },
  {
    id: 'soccer-goal',
    label: '⚽ Soccer Goal',
    category: 'Sports',
    emoji: '⚽',
    description: 'Score soccer goals'
  },
  {
    id: 'tennis-rally',
    label: '🎾 Tennis Rally',
    category: 'Sports',
    emoji: '🎾',
    description: 'Play tennis rallies'
  },
  {
    id: 'golf-putt',
    label: '⛳ Golf Putt',
    category: 'Sports',
    emoji: '⛳',
    description: 'Master golf putting'
  },
  {
    id: 'bowling-strike',
    label: '🎳 Bowling Strike',
    category: 'Sports',
    emoji: '🎳',
    description: 'Bowl for strikes'
  },
  {
    id: 'hockey-goal',
    label: '🏒 Hockey Goal',
    category: 'Sports',
    emoji: '🏒',
    description: 'Score hockey goals'
  },
  {
    id: 'badminton-rally',
    label: '🏸 Badminton Rally',
    category: 'Sports',
    emoji: '🏸',
    description: 'Win badminton rally'
  },
  {
    id: 'volleyball-spike',
    label: '🏐 Volleyball Spike',
    category: 'Sports',
    emoji: '🏐',
    description: 'Spike volleyball'
  },
  {
    id: 'archery-target',
    label: '🏹 Archery Target',
    category: 'Sports',
    emoji: '🏹',
    description: 'Hit archery targets'
  },
  {
    id: 'billiards-shot',
    label: '🎱 Billiards Shot',
    category: 'Sports',
    emoji: '🎱',
    description: 'Play billiards'
  },
  {
    id: 'dart-throw',
    label: '🎯 Dart Throw',
    category: 'Sports',
    emoji: '🎯',
    description: 'Throw darts accurately'
  },
  {
    id: 'ping-pong',
    label: '🏓 Ping Pong',
    category: 'Sports',
    emoji: '🏓',
    description: 'Play ping pong'
  },
  {
    id: 'cricket-catch',
    label: '🏏 Cricket Catch',
    category: 'Sports',
    emoji: '🏏',
    description: 'Catch cricket ball'
  },
  {
    id: 'baseball-hit',
    label: '⚾ Baseball Hit',
    category: 'Sports',
    emoji: '⚾',
    description: 'Hit baseball'
  },
  {
    id: 'football-pass',
    label: '🏈 Football Pass',
    category: 'Sports',
    emoji: '🏈',
    description: 'Complete passes'
  },

  // BRAIN GAMES (Category 6) - 15 games
  {
    id: 'memory-cards',
    label: '🧠 Memory Cards',
    category: 'Brain',
    emoji: '🧠',
    description: 'Match memory cards'
  },
  {
    id: 'iq-challenge',
    label: '🎓 IQ Challenge',
    category: 'Brain',
    emoji: '🎓',
    description: 'Solve IQ puzzles'
  },
  {
    id: 'math-quest',
    label: '🔢 Math Quest',
    category: 'Brain',
    emoji: '🔢',
    description: 'Solve math problems'
  },
  {
    id: 'trivia-master',
    label: '🧠 Trivia Master',
    category: 'Brain',
    emoji: '🧠',
    description: 'Answer trivia questions'
  },
  {
    id: 'spot-difference',
    label: '🔍 Spot Difference',
    category: 'Brain',
    emoji: '🔍',
    description: 'Find differences'
  },
  {
    id: 'focus-trainer',
    label: '👁️ Focus Trainer',
    category: 'Brain',
    emoji: '👁️',
    description: 'Improve focus'
  },
  {
    id: 'sequence-solver',
    label: '📊 Sequence Solver',
    category: 'Brain',
    emoji: '📊',
    description: 'Solve sequences'
  },
  {
    id: 'logic-gates',
    label: '⚙️ Logic Gates',
    category: 'Brain',
    emoji: '⚙️',
    description: 'Solve logic gates'
  },
  {
    id: 'pattern-recognition',
    label: '🎨 Pattern Recognition',
    category: 'Brain',
    emoji: '🎨',
    description: 'Recognize patterns'
  },
  {
    id: 'equation-solver',
    label: '📐 Equation Solver',
    category: 'Brain',
    emoji: '📐',
    description: 'Solve equations'
  },
  {
    id: 'code-breaker',
    label: '🔐 Code Breaker',
    category: 'Brain',
    emoji: '🔐',
    description: 'Break the code'
  },
  {
    id: 'visual-memory',
    label: '📸 Visual Memory',
    category: 'Brain',
    emoji: '📸',
    description: 'Test visual memory'
  },
  {
    id: 'riddle-solver',
    label: '💭 Riddle Solver',
    category: 'Brain',
    emoji: '💭',
    description: 'Solve riddles'
  },
  {
    id: 'geography-quest',
    label: '🌍 Geography Quest',
    category: 'Brain',
    emoji: '🌍',
    description: 'Geography trivia'
  },
  {
    id: 'science-quiz',
    label: '🔬 Science Quiz',
    category: 'Brain',
    emoji: '🔬',
    description: 'Science questions'
  },

  // MUSIC GAMES (Category 7) - 10 games
  {
    id: 'piano-master',
    label: '🎹 Piano Master',
    category: 'Music',
    emoji: '🎹',
    description: 'Play piano notes'
  },
  {
    id: 'rhythm-game',
    label: '🎵 Rhythm Game',
    category: 'Music',
    emoji: '🎵',
    description: 'Follow rhythm'
  },
  {
    id: 'beat-matcher',
    label: '🎶 Beat Matcher',
    category: 'Music',
    emoji: '🎶',
    description: 'Match the beat'
  },
  {
    id: 'note-jumper',
    label: '🎼 Note Jumper',
    category: 'Music',
    emoji: '🎼',
    description: 'Jump on notes'
  },
  {
    id: 'drum-roll',
    label: '🥁 Drum Roll',
    category: 'Music',
    emoji: '🥁',
    description: 'Beat the drums'
  },
  {
    id: 'guitar-hero',
    label: '🎸 Guitar Hero',
    category: 'Music',
    emoji: '🎸',
    description: 'Play guitar'
  },
  {
    id: 'music-memory',
    label: '🎤 Music Memory',
    category: 'Music',
    emoji: '🎤',
    description: 'Remember song sequences'
  },
  {
    id: 'note-match',
    label: '🎹 Note Match',
    category: 'Music',
    emoji: '🎹',
    description: 'Match musical notes'
  },
  {
    id: 'tempo-chase',
    label: '⏱️ Tempo Chase',
    category: 'Music',
    emoji: '⏱️',
    description: 'Follow tempo'
  },
  {
    id: 'melody-master',
    label: '🎺 Melody Master',
    category: 'Music',
    emoji: '🎺',
    description: 'Master melodies'
  },
];

// Game categories for filtering
export const GAME_CATEGORIES = [
  { id: 'all', label: 'All Games', count: 100 },
  { id: 'Reaction', label: 'Reaction', count: 15 },
  { id: 'Action', label: 'Action', count: 15 },
  { id: 'Puzzle', label: 'Puzzle', count: 15 },
  { id: 'Arcade', label: 'Arcade', count: 15 },
  { id: 'Sports', label: 'Sports', count: 15 },
  { id: 'Brain', label: 'Brain', count: 15 },
  { id: 'Music', label: 'Music', count: 10 },
];

// Get games by category
export const getGamesByCategory = (categoryId) => {
  if (categoryId === 'all') {
    return GAMES_LIBRARY;
  }
  return GAMES_LIBRARY.filter(game => game.category === categoryId);
};
