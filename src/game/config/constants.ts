export const GAME_CONFIG = {
  WIDTH: 1000,
  HEIGHT: 700,
  SCENES: {
    MENU: 'MenuScene',
    WORLD: 'WorldScene',
    HUD: 'HUDScene',
    QUESTION: 'QuestionScene',
    PAUSE: 'PauseScene',
    RESULT: 'ResultScene'
  },
  PLAYER: {
    SPEED: 200,
    JUMP_VELOCITY: -500,
    SIZE: { width: 32, height: 48 }
  },
  WORLD: {
    GRAVITY: 800,
    TILE_SIZE: 32
  }
};

export const COLORS = {
  PRIMARY: 0x3B82F6,
  SUCCESS: 0x10B981,
  WARNING: 0xF59E0B,
  ERROR: 0xEF4444,
  BACKGROUND: 0x1F2937,
  TEXT: 0xFFFFFF
};