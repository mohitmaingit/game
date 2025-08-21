import Phaser from 'phaser';
import { GAME_CONFIG } from '../config/constants';

export default class PreloadScene extends Phaser.Scene {
  private loadingBar?: Phaser.GameObjects.Graphics;
  private progressBox?: Phaser.GameObjects.Graphics;
  private loadingText?: Phaser.GameObjects.Text;
  private percentText?: Phaser.GameObjects.Text;
  private assetText?: Phaser.GameObjects.Text;

  constructor() {
    super({ key: GAME_CONFIG.SCENES.PRELOAD });
  }

  preload(): void {
    this.createLoadingScreen();
    this.loadAssets();
    this.setupLoadingEvents();
  }

  private createLoadingScreen(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background
    this.add.rectangle(0, 0, width, height, 0x0F172A).setOrigin(0, 0);

    // Title
    this.add.text(width / 2, height / 2 - 200, 'Educational Treasure Hunt', {
      fontSize: '48px',
      color: '#F59E0B',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(width / 2, height / 2 - 150, 'Loading magical worlds...', {
      fontSize: '24px',
      color: '#E5E7EB'
    }).setOrigin(0.5);

    // Progress box
    this.progressBox = this.add.graphics();
    this.progressBox.fillStyle(0x222222, 0.8);
    this.progressBox.fillRect(width / 2 - 160, height / 2 - 30, 320, 50);

    // Loading bar
    this.loadingBar = this.add.graphics();

    // Loading text
    this.loadingText = this.add.text(width / 2, height / 2 + 50, 'Loading...', {
      fontSize: '20px',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    // Percent text
    this.percentText = this.add.text(width / 2, height / 2, '0%', {
      fontSize: '18px',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    // Asset text
    this.assetText = this.add.text(width / 2, height / 2 + 100, '', {
      fontSize: '16px',
      color: '#9CA3AF'
    }).setOrigin(0.5);

    // Animated sparkles
    this.createSparkleEffect();
  }

  private createSparkleEffect(): void {
    const particles = this.add.particles(0, 0, 'sparkle', {
      x: { min: 0, max: GAME_CONFIG.WIDTH },
      y: { min: 0, max: GAME_CONFIG.HEIGHT },
      scale: { start: 0.1, end: 0.3 },
      alpha: { start: 1, end: 0 },
      lifespan: 2000,
      frequency: 100,
      tint: [0xFFD700, 0x4F46E5, 0x059669, 0xDC2626]
    });

    // Create simple sparkle texture if not exists
    if (!this.textures.exists('sparkle')) {
      this.add.graphics()
        .fillStyle(0xFFFFFF)
        .fillCircle(4, 4, 4)
        .generateTexture('sparkle', 8, 8);
    }
  }

  private loadAssets(): void {
    // Create placeholder textures for now
    this.createPlaceholderTextures();

    // Audio files (placeholder paths)
    this.load.audio('menu_music', ['assets/audio/menu_theme.mp3']);
    this.load.audio('forest_theme', ['assets/audio/forest_theme.mp3']);
    this.load.audio('cavern_theme', ['assets/audio/cavern_theme.mp3']);
    this.load.audio('coin_collect', ['assets/audio/coin_collect.wav']);
    this.load.audio('treasure_found', ['assets/audio/treasure_found.wav']);
    this.load.audio('correct_answer', ['assets/audio/correct_answer.wav']);
    this.load.audio('wrong_answer', ['assets/audio/wrong_answer.wav']);
    this.load.audio('level_complete', ['assets/audio/level_complete.wav']);

    // Background images (placeholder paths)
    this.load.image('enchanted_forest', 'assets/backgrounds/enchanted_forest.jpg');
    this.load.image('crystal_caverns', 'assets/backgrounds/crystal_caverns.jpg');
    this.load.image('sky_temple', 'assets/backgrounds/sky_temple.jpg');

    // Character sprites (placeholder paths)
    this.load.spritesheet('player', 'assets/sprites/player.png', {
      frameWidth: 48,
      frameHeight: 64
    });

    // UI elements
    this.load.image('button_normal', 'assets/ui/button_normal.png');
    this.load.image('button_hover', 'assets/ui/button_hover.png');
    this.load.image('panel', 'assets/ui/panel.png');
    this.load.image('progress_bar', 'assets/ui/progress_bar.png');

    // Treasure sprites
    this.load.image('treasure_bronze', 'assets/treasures/bronze_chest.png');
    this.load.image('treasure_silver', 'assets/treasures/silver_chest.png');
    this.load.image('treasure_gold', 'assets/treasures/gold_chest.png');
    this.load.image('treasure_crystal', 'assets/treasures/crystal_chest.png');
    this.load.image('treasure_legendary', 'assets/treasures/legendary_chest.png');

    // Particle textures
    this.load.image('particle_gold', 'assets/particles/gold_particle.png');
    this.load.image('particle_magic', 'assets/particles/magic_particle.png');
    this.load.image('particle_crystal', 'assets/particles/crystal_particle.png');
  }

  private createPlaceholderTextures(): void {
    const graphics = this.add.graphics();

    // Player texture
    graphics.clear();
    graphics.fillStyle(0x4F46E5);
    graphics.fillRect(0, 0, 48, 64);
    graphics.generateTexture('player', 48, 64);

    // Treasure textures
    const treasureColors = {
      bronze: 0xCD7F32,
      silver: 0xC0C0C0,
      gold: 0xFFD700,
      crystal: 0x87CEEB,
      legendary: 0xFF69B4
    };

    Object.entries(treasureColors).forEach(([type, color]) => {
      graphics.clear();
      graphics.fillStyle(color);
      graphics.fillCircle(16, 16, 16);
      graphics.lineStyle(2, 0xFFFFFF);
      graphics.strokeCircle(16, 16, 16);
      graphics.generateTexture(`treasure_${type}`, 32, 32);
    });

    // UI textures
    graphics.clear();
    graphics.fillStyle(0x374151);
    graphics.fillRoundedRect(0, 0, 200, 50, 10);
    graphics.lineStyle(2, 0x6B7280);
    graphics.strokeRoundedRect(0, 0, 200, 50, 10);
    graphics.generateTexture('button_normal', 200, 50);

    graphics.clear();
    graphics.fillStyle(0x4B5563);
    graphics.fillRoundedRect(0, 0, 200, 50, 10);
    graphics.lineStyle(2, 0x9CA3AF);
    graphics.strokeRoundedRect(0, 0, 200, 50, 10);
    graphics.generateTexture('button_hover', 200, 50);

    // Background textures
    graphics.clear();
    graphics.fillGradientStyle(0x1F2937, 0x1F2937, 0x0F172A, 0x0F172A);
    graphics.fillRect(0, 0, GAME_CONFIG.WIDTH, GAME_CONFIG.HEIGHT);
    graphics.generateTexture('enchanted_forest', GAME_CONFIG.WIDTH, GAME_CONFIG.HEIGHT);

    graphics.clear();
    graphics.fillGradientStyle(0x1E1B4B, 0x1E1B4B, 0x0F0A2E, 0x0F0A2E);
    graphics.fillRect(0, 0, GAME_CONFIG.WIDTH, GAME_CONFIG.HEIGHT);
    graphics.generateTexture('crystal_caverns', GAME_CONFIG.WIDTH, GAME_CONFIG.HEIGHT);

    graphics.destroy();
  }

  private setupLoadingEvents(): void {
    this.load.on('progress', (value: number) => {
      const percentage = Math.round(value * 100);
      this.percentText?.setText(`${percentage}%`);
      
      this.loadingBar?.clear();
      this.loadingBar?.fillStyle(0x4F46E5, 1);
      this.loadingBar?.fillRect(
        GAME_CONFIG.WIDTH / 2 - 150,
        GAME_CONFIG.HEIGHT / 2 - 20,
        300 * value,
        30
      );
    });

    this.load.on('fileprogress', (file: any) => {
      this.assetText?.setText(`Loading: ${file.key}`);
    });

    this.load.on('complete', () => {
      this.loadingBar?.destroy();
      this.progressBox?.destroy();
      this.loadingText?.setText('Complete!');
      this.assetText?.setText('Press any key to continue');
      
      this.input.keyboard?.once('keydown', () => {
        this.scene.start(GAME_CONFIG.SCENES.MENU);
      });

      this.input.once('pointerdown', () => {
        this.scene.start(GAME_CONFIG.SCENES.MENU);
      });
    });
  }
}