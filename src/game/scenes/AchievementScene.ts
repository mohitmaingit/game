import Phaser from 'phaser';
import { GAME_CONFIG, COLORS, ACHIEVEMENTS } from '../config/constants';
import { useGameStore } from '../state/store';

export default class AchievementScene extends Phaser.Scene {
  constructor() {
    super({ key: GAME_CONFIG.SCENES.ACHIEVEMENT });
  }

  create(): void {
    this.createBackground();
    this.createAchievementsList();
    this.createCloseButton();
  }

  private createBackground(): void {
    this.add.rectangle(0, 0, GAME_CONFIG.WIDTH, GAME_CONFIG.HEIGHT, 0x000000, 0.8)
      .setOrigin(0, 0);

    const panel = this.add.rectangle(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT / 2, 800, 600, 0x1F2937)
      .setStrokeStyle(3, COLORS.GOLD);

    this.add.text(GAME_CONFIG.WIDTH / 2, 200, '🏆 Achievements', {
      fontSize: '36px',
      color: '#F59E0B',
      fontStyle: 'bold'
    }).setOrigin(0.5);
  }

  private createAchievementsList(): void {
    const gameStore = useGameStore.getState();
    const achievements = Object.values(ACHIEVEMENTS);
    
    achievements.forEach((achievement, index) => {
      const y = 280 + index * 80;
      const unlocked = gameStore.achievements.some(a => a.id === achievement.id && a.unlocked);
      
      this.createAchievementItem(achievement, y, unlocked);
    });
  }

  private createAchievementItem(achievement: any, y: number, unlocked: boolean): void {
    const container = this.add.container(GAME_CONFIG.WIDTH / 2, y);
    
    const bg = this.add.rectangle(0, 0, 700, 60, unlocked ? COLORS.SUCCESS : 0x374151, 0.8);
    bg.setStrokeStyle(2, unlocked ? COLORS.GOLD : 0x6B7280);
    
    const icon = this.add.text(-300, 0, unlocked ? '🏆' : '🔒', {
      fontSize: '24px'
    }).setOrigin(0.5);
    
    const title = this.add.text(-250, -10, achievement.name, {
      fontSize: '18px',
      color: unlocked ? '#FFFFFF' : '#9CA3AF',
      fontStyle: 'bold'
    }).setOrigin(0, 0.5);
    
    const points = this.add.text(300, 0, `${achievement.points} pts`, {
      fontSize: '16px',
      color: COLORS.GOLD
    }).setOrigin(1, 0.5);
    
    container.add([bg, icon, title, points]);
    
    if (unlocked) {
      this.tweens.add({
        targets: container,
        scaleX: { from: 1, to: 1.02 },
        scaleY: { from: 1, to: 1.02 },
        duration: 1000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }
  }

  private createCloseButton(): void {
    const closeButton = this.add.text(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT - 100, 'Close', {
      fontSize: '24px',
      color: '#EF4444',
      fontStyle: 'bold'
    }).setOrigin(0.5).setInteractive();

    closeButton.on('pointerdown', () => {
      this.scene.stop();
      this.scene.resume(GAME_CONFIG.SCENES.MENU);
    });

    closeButton.on('pointerover', () => {
      closeButton.setScale(1.1);
    });

    closeButton.on('pointerout', () => {
      closeButton.setScale(1);
    });
  }
}