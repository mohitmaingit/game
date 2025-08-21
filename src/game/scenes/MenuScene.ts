import Phaser from 'phaser';
import { GAME_CONFIG } from '../config/constants';
import { useGameStore } from '../state/store';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: GAME_CONFIG.SCENES.MENU });
  }

  create(): void {
    // Background
    this.add.rectangle(0, 0, GAME_CONFIG.WIDTH, GAME_CONFIG.HEIGHT, 0x1F2937)
      .setOrigin(0, 0);

    // Title
    this.add.text(GAME_CONFIG.WIDTH / 2, 150, 'Educational Treasure Hunt', {
      fontSize: '48px',
      color: '#FFD700',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(GAME_CONFIG.WIDTH / 2, 200, 'Learn while you explore!', {
      fontSize: '24px',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    // Start button
    const startButton = this.add.container(GAME_CONFIG.WIDTH / 2, 350);
    const startBg = this.add.rectangle(0, 0, 200, 60, 0x10B981);
    const startText = this.add.text(0, 0, 'Start Game', {
      fontSize: '24px',
      color: '#FFFFFF',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    startButton.add([startBg, startText]);
    startButton.setSize(200, 60);
    startButton.setInteractive();

    startButton.on('pointerdown', () => {
      useGameStore.getState().startGame();
      this.scene.start(GAME_CONFIG.SCENES.WORLD);
      this.scene.launch(GAME_CONFIG.SCENES.HUD);
    });

    startButton.on('pointerover', () => {
      startBg.setFillStyle(0x059669);
      startButton.setScale(1.05);
    });

    startButton.on('pointerout', () => {
      startBg.setFillStyle(0x10B981);
      startButton.setScale(1);
    });
  }
}