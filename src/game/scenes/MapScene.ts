import Phaser from 'phaser';
import { GAME_CONFIG, COLORS } from '../config/constants';
import { useGameStore } from '../state/store';
import { getCurrentLevel } from '../config/levels';

export default class MapScene extends Phaser.Scene {
  constructor() {
    super({ key: GAME_CONFIG.SCENES.MAP });
  }

  create(): void {
    this.createBackground();
    this.createMap();
    this.createCloseButton();
  }

  private createBackground(): void {
    this.add.rectangle(0, 0, GAME_CONFIG.WIDTH, GAME_CONFIG.HEIGHT, 0x000000, 0.8)
      .setOrigin(0, 0);

    const panel = this.add.rectangle(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT / 2, 900, 700, 0x1F2937)
      .setStrokeStyle(3, COLORS.PRIMARY);

    this.add.text(GAME_CONFIG.WIDTH / 2, 150, '🗺️ Treasure Map', {
      fontSize: '32px',
      color: '#F59E0B',
      fontStyle: 'bold'
    }).setOrigin(0.5);
  }

  private createMap(): void {
    const gameStore = useGameStore.getState();
    const currentLevel = getCurrentLevel(gameStore.levelIndex);
    
    if (!currentLevel) return;

    // Create miniature version of the level
    const mapScale = 0.6;
    const mapOffsetX = GAME_CONFIG.WIDTH / 2 - (GAME_CONFIG.WIDTH * mapScale) / 2;
    const mapOffsetY = 200;

    // Draw level background (simplified)
    const levelBg = this.add.rectangle(
      mapOffsetX + (GAME_CONFIG.WIDTH * mapScale) / 2,
      mapOffsetY + (GAME_CONFIG.HEIGHT * mapScale) / 2,
      GAME_CONFIG.WIDTH * mapScale,
      GAME_CONFIG.HEIGHT * mapScale,
      0x2D3748,
      0.5
    );

    // Draw treasures
    currentLevel.treasures.forEach((treasure, index) => {
      const x = mapOffsetX + treasure.x * mapScale;
      const y = mapOffsetY + treasure.y * mapScale;
      
      const treasureIcon = this.add.circle(x, y, 8, treasure.collected ? COLORS.SUCCESS : COLORS.GOLD);
      treasureIcon.setStrokeStyle(2, 0xFFFFFF);
      
      if (!treasure.collected) {
        this.tweens.add({
          targets: treasureIcon,
          scale: { from: 1, to: 1.3 },
          duration: 1000,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        });
      }
      
      // Treasure label
      this.add.text(x, y - 20, `T${index + 1}`, {
        fontSize: '12px',
        color: '#FFFFFF',
        fontStyle: 'bold'
      }).setOrigin(0.5);
    });

    // Draw player position (if in world scene)
    const playerIcon = this.add.circle(
      mapOffsetX + 100 * mapScale,
      mapOffsetY + 650 * mapScale,
      6,
      COLORS.PRIMARY
    );
    
    this.tweens.add({
      targets: playerIcon,
      alpha: { from: 0.5, to: 1 },
      duration: 500,
      yoyo: true,
      repeat: -1
    });

    // Legend
    this.createLegend();
  }

  private createLegend(): void {
    const legendY = GAME_CONFIG.HEIGHT - 200;
    
    this.add.text(GAME_CONFIG.WIDTH / 2, legendY - 30, 'Legend:', {
      fontSize: '20px',
      color: '#FFFFFF',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const legendItems = [
      { color: COLORS.PRIMARY, text: '👤 Your Position' },
      { color: COLORS.GOLD, text: '💰 Uncollected Treasure' },
      { color: COLORS.SUCCESS, text: '✅ Collected Treasure' }
    ];

    legendItems.forEach((item, index) => {
      const x = GAME_CONFIG.WIDTH / 2 - 200 + index * 150;
      
      this.add.circle(x - 50, legendY, 8, item.color);
      this.add.text(x - 30, legendY, item.text, {
        fontSize: '14px',
        color: '#E5E7EB'
      }).setOrigin(0, 0.5);
    });
  }

  private createCloseButton(): void {
    const closeButton = this.add.text(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT - 80, 'Close Map', {
      fontSize: '20px',
      color: '#EF4444',
      fontStyle: 'bold'
    }).setOrigin(0.5).setInteractive();

    closeButton.on('pointerdown', () => {
      this.scene.stop();
    });

    closeButton.on('pointerover', () => {
      closeButton.setScale(1.1);
    });

    closeButton.on('pointerout', () => {
      closeButton.setScale(1);
    });
  }
}