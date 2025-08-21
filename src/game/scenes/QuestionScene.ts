import Phaser from 'phaser';
import { GAME_CONFIG } from '../config/constants';
import { useGameStore } from '../state/store';

export default class QuestionScene extends Phaser.Scene {
  constructor() {
    super({ key: GAME_CONFIG.SCENES.QUESTION });
  }

  create(): void {
    // Background overlay
    this.add.rectangle(0, 0, GAME_CONFIG.WIDTH, GAME_CONFIG.HEIGHT, 0x000000, 0.8)
      .setOrigin(0, 0);

    // Question panel
    const panel = this.add.rectangle(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT / 2, 600, 400, 0x1F2937);
    panel.setStrokeStyle(4, 0x3B82F6);

    // Sample question
    this.add.text(GAME_CONFIG.WIDTH / 2, 250, 'What is 2 + 2?', {
      fontSize: '24px',
      color: '#FFFFFF',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Answer options
    const options = ['2', '3', '4', '5'];
    options.forEach((option, index) => {
      const button = this.createAnswerButton(
        GAME_CONFIG.WIDTH / 2 - 150 + (index % 2) * 300,
        350 + Math.floor(index / 2) * 60,
        option,
        index === 2 // Correct answer is index 2 (which is "4")
      );
    });

    // Close button
    const closeButton = this.add.text(GAME_CONFIG.WIDTH / 2, 500, 'Close', {
      fontSize: '18px',
      color: '#EF4444',
      fontStyle: 'bold'
    }).setOrigin(0.5).setInteractive();

    closeButton.on('pointerdown', () => {
      this.scene.stop();
    });
  }

  private createAnswerButton(x: number, y: number, text: string, isCorrect: boolean): Phaser.GameObjects.Container {
    const button = this.add.container(x, y);
    const bg = this.add.rectangle(0, 0, 120, 40, 0x374151);
    const label = this.add.text(0, 0, text, {
      fontSize: '18px',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    button.add([bg, label]);
    button.setSize(120, 40);
    button.setInteractive();

    button.on('pointerdown', () => {
      if (isCorrect) {
        bg.setFillStyle(0x10B981);
        useGameStore.getState().addScore(50);
        useGameStore.getState().incrementCorrect();
        
        this.time.delayedCall(1000, () => {
          this.scene.stop();
        });
      } else {
        bg.setFillStyle(0xEF4444);
        useGameStore.getState().decrementAttempts();
        
        this.time.delayedCall(500, () => {
          bg.setFillStyle(0x374151);
        });
      }
    });

    button.on('pointerover', () => {
      bg.setFillStyle(0x4B5563);
    });

    button.on('pointerout', () => {
      if (bg.fillColor !== 0x10B981 && bg.fillColor !== 0xEF4444) {
        bg.setFillStyle(0x374151);
      }
    });

    return button;
  }
}