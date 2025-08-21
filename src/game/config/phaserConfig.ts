import Phaser from 'phaser';
import { GAME_CONFIG } from './constants';
import MenuScene from '../scenes/MenuScene';
import WorldScene from '../scenes/WorldScene';
import HUDScene from '../scenes/HUDScene';
import QuestionScene from '../scenes/QuestionScene';
import PauseScene from '../scenes/PauseScene.ts';
import ResultScene from '../scenes/ResultScene';

export const phaserConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: GAME_CONFIG.WIDTH,
  height: GAME_CONFIG.HEIGHT,
  backgroundColor: '#2c3e50',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800, x: 0 },
      debug: false
    }
  },
  scene: [
    MenuScene,
    WorldScene,
    HUDScene,
    QuestionScene,
    PauseScene,
    ResultScene
  ],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600
    },
    max: {
      width: 1200,
      height: 900
    }
  },
  render: {
    antialias: true,
    pixelArt: false
  }
};