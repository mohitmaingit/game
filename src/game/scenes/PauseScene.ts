import Phaser from 'phaser';
import { GAME_CONFIG } from '../config/constants';
import { useGameStore } from '../state/store';

export default class PauseScene extends Phaser.Scene {
  constructor() {
    super({ key: GAME_CONFIG.SCENES.PAUSE });
  }

  create(): void {
    // Background overlay
    this.add.rectangle(0, 0, GAME_CONFIG.WIDTH, GAME_CONFIG.HEIGHT, 0x000000, 0.7)
      .setOrigin(0, 0);

    // Pause panel
    const panel = this.add.rectangle(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT / 2, 400, 300, 0x1F2937);
    panel.setStrokeStyle(4, 0x6B7280);

    // Title
    this.add.text(GAME_CONFIG.WIDTH / 2, 300, 'Game Paused', {
      fontSize: '32px',
      color: '#FFFFFF',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Resume button
    const resumeButton = this.createButton(GAME_CONFIG.WIDTH / 2, 380, 'Resume', 0x10B981, () => {
      useGameStore.getState().resumeGame();
      this.scene.stop();
      this.scene.resume(GAME_CONFIG.SCENES.WORLD);
    });

    // Main menu button
    const menuButton = this.createButton(GAME_CONFIG.WIDTH / 2, 440, 'Main Menu', 0x6B7280, () => {
      useGameStore.getState().resetGame();
      this.scene.stop(GAME_CONFIG.SCENES.WORLD);
      this.scene.stop(GAME_CONFIG.SCENES.HUD);
      this.scene.start(GAME_CONFIG.SCENES.MENU);
    });
  }

  private createButton(x: number, y: number, text: string, color: number, onClick: () => void): Phaser.GameObjects.Container {
    const button = this.add.container(x, y);
    const bg = this.add.rectangle(0, 0, 150, 40, color);
    const label = this.add.text(0, 0, text, {
      fontSize: '18px',
      color: '#FFFFFF',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    button.add([bg, label]);
    button.setSize(150, 40);
    button.setInteractive();

    button.on('pointerdown', onClick);
    button.on('pointerover', () => {
      bg.setAlpha(0.8);
      button.setScale(1.05);
    });
    button.on('pointerout', () => {
      bg.setAlpha(1);
      button.setScale(1);
    });

    return button;
  }
}