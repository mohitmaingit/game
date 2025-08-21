export const GAME_CONFIG = {
  WIDTH: 1400,
  HEIGHT: 900,
  SCENES: {
    PRELOAD: 'PreloadScene',
    MENU: 'MenuScene',
    WORLD: 'WorldScene',
    HUD: 'HUDScene',
    QUESTION: 'QuestionScene',
    PAUSE: 'PauseScene',
    RESULT: 'ResultScene',
    INVENTORY: 'InventoryScene',
    MAP: 'MapScene',
    ACHIEVEMENT: 'AchievementScene'
  },
  PLAYER: {
    SPEED: 250,
    JUMP_VELOCITY: -600,
    SIZE: { width: 48, height: 64 },
    ANIMATIONS: {
      IDLE: 'player_idle',
      WALK: 'player_walk',
      JUMP: 'player_jump',
      CELEBRATE: 'player_celebrate'
    }
  },
  WORLD: {
    GRAVITY: 900,
    TILE_SIZE: 32,
    PARALLAX_LAYERS: 5
  },
  EFFECTS: {
    PARTICLE_COUNT: 100,
    GLOW_INTENSITY: 0.8,
    SHAKE_DURATION: 300,
    TRANSITION_DURATION: 800
  },
  AUDIO: {
    MASTER_VOLUME: 0.7,
    MUSIC_VOLUME: 0.5,
    SFX_VOLUME: 0.8
  }
};

export const COLORS = {
  PRIMARY: 0x4F46E5,
  SECONDARY: 0x7C3AED,
  SUCCESS: 0x059669,
  WARNING: 0xD97706,
  ERROR: 0xDC2626,
  BACKGROUND: 0x0F172A,
  TEXT: 0xF8FAFC,
  GOLD: 0xFBBF24,
  SILVER: 0xE5E7EB,
  BRONZE: 0xA78BFA,
  MAGIC: 0x8B5CF6,
  TREASURE: 0xF59E0B
};

export const DIFFICULTY_SETTINGS = {
  EASY: {
    timeLimit: 60,
    hintsAvailable: 3,
    attemptsAllowed: 3,
    scoreMultiplier: 1
  },
  MEDIUM: {
    timeLimit: 45,
    hintsAvailable: 2,
    attemptsAllowed: 2,
    scoreMultiplier: 1.5
  },
  HARD: {
    timeLimit: 30,
    hintsAvailable: 1,
    attemptsAllowed: 1,
    scoreMultiplier: 2
  }
};

export const ACHIEVEMENTS = {
  FIRST_TREASURE: { id: 'first_treasure', name: 'First Discovery', points: 100 },
  PERFECT_LEVEL: { id: 'perfect_level', name: 'Flawless Victory', points: 500 },
  SPEED_DEMON: { id: 'speed_demon', name: 'Speed Demon', points: 300 },
  KNOWLEDGE_MASTER: { id: 'knowledge_master', name: 'Knowledge Master', points: 1000 },
  TREASURE_HUNTER: { id: 'treasure_hunter', name: 'Treasure Hunter', points: 750 }
};