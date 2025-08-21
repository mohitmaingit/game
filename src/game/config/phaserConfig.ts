import Phaser from 'phaser';
import { GAME_CONFIG } from './constants';
import PreloadScene from '../scenes/PreloadScene';
import MenuScene from '../scenes/MenuScene';
import WorldScene from '../scenes/WorldScene';
import HUDScene from '../scenes/HUDScene';
import QuestionScene from '../scenes/QuestionScene';
import PauseScene from '../scenes/PauseScene';
import ResultScene from '../scenes/ResultScene';
import AchievementScene from '../scenes/AchievementScene';
import MapScene from '../scenes/MapScene';
import InventoryScene from '../scenes/InventoryScene';

export const phaserConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: GAME_CONFIG.WIDTH,
  height: GAME_CONFIG.HEIGHT,
  backgroundColor: '#0F172A',
  parent: 'phaser-game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: GAME_CONFIG.WORLD.GRAVITY, x: 0 },
      debug: false,
      debugShowBody: false,
      debugShowStaticBody: false,
      debugShowVelocity: false
    }
  },
  scene: [
    PreloadScene,
    MenuScene,
    WorldScene,
    HUDScene,
    QuestionScene,
    PauseScene,
    ResultScene,
    AchievementScene,
    MapScene,
    InventoryScene
  ],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 1000,
      height: 700
    },
    max: {
      width: 1920,
      height: 1080
    }
  },
  render: {
    antialias: true,
    pixelArt: false,
    roundPixels: false,
    transparent: false,
    clearBeforeRender: true,
    preserveDrawingBuffer: false,
    premultipliedAlpha: true,
    failIfMajorPerformanceCaveat: false,
    powerPreference: 'high-performance',
    batchSize: 4096,
    maxLights: 10
  },
  audio: {
    disableWebAudio: false,
    context: false,
    noAudio: false
  },
  input: {
    keyboard: true,
    mouse: true,
    touch: true,
    gamepad: false
  },
  dom: {
    createContainer: true
  },
  loader: {
    baseURL: '',
    path: '',
    maxParallelDownloads: 32,
    crossOrigin: 'anonymous',
    responseType: '',
    async: true,
    user: '',
    password: '',
    timeout: 0
  },
  plugins: {
    global: [],
    scene: []
  },
  banner: {
    hidePhaser: true,
    text: '#000000',
    background: ['#FF6600', '#DC143C', '#FFA500', '#FFFF00']
  }
};