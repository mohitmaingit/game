import Phaser from 'phaser';
import { GAME_CONFIG, COLORS } from '../config/constants';
import { useGameStore } from '../state/store';

export default class InventoryScene extends Phaser.Scene {
  constructor() {
    super({ key: GAME_CONFIG.SCENES.INVENTORY });
  }

  create(): void {
    this.createBackground();
    this.createInventoryGrid();
    this.createPowerUpsSection();
    this.createCloseButton();
  }

  private createBackground(): void {
    this.add.rectangle(0, 0, GAME_CONFIG.WIDTH, GAME_CONFIG.HEIGHT, 0x000000, 0.8)
      .setOrigin(0, 0);

    const panel = this.add.rectangle(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT / 2, 800, 600, 0x1F2937)
      .setStrokeStyle(3, COLORS.MAGIC);

    this.add.text(GAME_CONFIG.WIDTH / 2, 180, '🎒 Inventory', {
      fontSize: '32px',
      color: '#8B5CF6',
      fontStyle: 'bold'
    }).setOrigin(0.5);
  }

  private createInventoryGrid(): void {
    const gameStore = useGameStore.getState();
    const startX = GAME_CONFIG.WIDTH / 2 - 300;
    const startY = 250;
    const slotSize = 60;
    const spacing = 10;

    this.add.text(startX, startY - 30, 'Items:', {
      fontSize: '20px',
      color: '#FFFFFF',
      fontStyle: 'bold'
    });

    // Create 4x3 grid of inventory slots
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        const x = startX + col * (slotSize + spacing);
        const y = startY + row * (slotSize + spacing);
        
        const slot = this.add.rectangle(x, y, slotSize, slotSize, 0x374151, 0.8);
        slot.setStrokeStyle(2, 0x6B7280);
        
        const itemIndex = row * 4 + col;
        if (itemIndex < gameStore.inventory.length) {
          const item = gameStore.inventory[itemIndex];
          this.createInventoryItem(x, y, item);
        }
      }
    }
  }

  private createInventoryItem(x: number, y: number, item: string): void {
    const itemIcons: { [key: string]: string } = {
      'magnifying_glass': '🔍',
      'time_crystal': '⏰',
      'hint_scroll': '📜',
      'golden_key': '🗝️',
      'magic_potion': '🧪',
      'compass': '🧭',
      'treasure_map': '🗺️',
      'lucky_charm': '🍀'
    };

    const icon = this.add.text(x, y, itemIcons[item] || '❓', {
      fontSize: '24px'
    }).setOrigin(0.5);

    icon.setInteractive();
    icon.on('pointerover', () => {
      this.showItemTooltip(x, y - 40, item);
      icon.setScale(1.2);
    });

    icon.on('pointerout', () => {
      this.hideItemTooltip();
      icon.setScale(1);
    });
  }

  private createPowerUpsSection(): void {
    const gameStore = useGameStore.getState();
    const startX = GAME_CONFIG.WIDTH / 2 + 100;
    const startY = 250;

    this.add.text(startX, startY - 30, 'Power-ups:', {
      fontSize: '20px',
      color: '#FFFFFF',
      fontStyle: 'bold'
    });

    const powerUpEntries = Object.entries(gameStore.powerUps);
    powerUpEntries.forEach(([powerUp, count], index) => {
      if (count > 0) {
        const y = startY + index * 40;
        
        const powerUpIcons: { [key: string]: string } = {
          'time_boost': '⚡',
          'double_points': '💎',
          'extra_hint': '💡',
          'shield': '🛡️',
          'magnet': '🧲'
        };

        this.add.text(startX, y, powerUpIcons[powerUp] || '⭐', {
          fontSize: '20px'
        });

        this.add.text(startX + 30, y, `${powerUp.replace('_', ' ')} x${count}`, {
          fontSize: '16px',
          color: '#E5E7EB'
        }).setOrigin(0, 0.5);
      }
    });
  }

  private showItemTooltip(x: number, y: number, item: string): void {
    const tooltipTexts: { [key: string]: string } = {
      'magnifying_glass': 'Reveals hidden clues',
      'time_crystal': 'Adds 30 seconds to timer',
      'hint_scroll': 'Provides an extra hint',
      'golden_key': 'Unlocks secret areas',
      'magic_potion': 'Doubles points for next question',
      'compass': 'Points to nearest treasure',
      'treasure_map': 'Shows all treasure locations',
      'lucky_charm': 'Increases rare item drops'
    };

    const tooltip = this.add.container(x, y);
    const bg = this.add.rectangle(0, 0, 200, 40, 0x000000, 0.9);
    const text = this.add.text(0, 0, tooltipTexts[item] || 'Unknown item', {
      fontSize: '12px',
      color: '#FFFFFF',
      wordWrap: { width: 180 }
    }).setOrigin(0.5);

    tooltip.add([bg, text]);
    tooltip.setData('tooltip', true);
  }

  private hideItemTooltip(): void {
    this.children.list.forEach(child => {
      if (child.getData && child.getData('tooltip')) {
        child.destroy();
      }
    });
  }

  private createCloseButton(): void {
    const closeButton = this.add.text(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT - 100, 'Close', {
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