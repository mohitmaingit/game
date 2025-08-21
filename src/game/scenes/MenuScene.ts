import Phaser from 'phaser';
import { GAME_CONFIG, COLORS } from '../config/constants';
import { useGameStore } from '../state/store';

export default class MenuScene extends Phaser.Scene {
  private backgroundMusic?: Phaser.Sound.BaseSound;
  private particles?: Phaser.GameObjects.Particles.ParticleEmitter;
  private titleText?: Phaser.GameObjects.Text;
  private menuButtons: Phaser.GameObjects.Container[] = [];

  constructor() {
    super({ key: GAME_CONFIG.SCENES.MENU });
  }

  create(): void {
    this.createBackground();
    this.createParticleEffects();
    this.createTitle();
    this.createMenu();
    this.createFooter();
    this.setupAudio();
    this.setupAnimations();
  }

  private createBackground(): void {
    // Gradient background
    const graphics = this.add.graphics();
    graphics.fillGradientStyle(0x1E1B4B, 0x1E1B4B, 0x0F0A2E, 0x0F0A2E);
    graphics.fillRect(0, 0, GAME_CONFIG.WIDTH, GAME_CONFIG.HEIGHT);

    // Animated stars
    for (let i = 0; i < 50; i++) {
      const star = this.add.circle(
        Phaser.Math.Between(0, GAME_CONFIG.WIDTH),
        Phaser.Math.Between(0, GAME_CONFIG.HEIGHT),
        Phaser.Math.Between(1, 3),
        0xFFFFFF,
        Phaser.Math.FloatBetween(0.3, 0.8)
      );

      this.tweens.add({
        targets: star,
        alpha: { from: 0.3, to: 1 },
        duration: Phaser.Math.Between(1000, 3000),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }
  }

  private createParticleEffects(): void {
    // Magic sparkles
    this.particles = this.add.particles(0, 0, 'sparkle', {
      x: { min: 0, max: GAME_CONFIG.WIDTH },
      y: { min: 0, max: GAME_CONFIG.HEIGHT },
      scale: { start: 0.1, end: 0.4 },
      alpha: { start: 1, end: 0 },
      lifespan: 3000,
      frequency: 200,
      tint: [COLORS.GOLD, COLORS.PRIMARY, COLORS.SUCCESS, COLORS.MAGIC]
    });
  }

  private createTitle(): void {
    this.titleText = this.add.text(GAME_CONFIG.WIDTH / 2, 180, 'Educational\nTreasure Hunt', {
      fontSize: '72px',
      color: '#F59E0B',
      fontStyle: 'bold',
      align: 'center',
      stroke: '#1F2937',
      strokeThickness: 4
    }).setOrigin(0.5);

    // Subtitle with typewriter effect
    const subtitle = 'Embark on a magical learning adventure!';
    const subtitleText = this.add.text(GAME_CONFIG.WIDTH / 2, 280, '', {
      fontSize: '24px',
      color: '#E5E7EB',
      align: 'center'
    }).setOrigin(0.5);

    let i = 0;
    this.time.addEvent({
      delay: 50,
      callback: () => {
        subtitleText.text += subtitle[i];
        i++;
      },
      repeat: subtitle.length - 1
    });
  }

  private createMenu(): void {
    const buttonData = [
      { text: '🎮 Start Adventure', action: this.startGame, color: COLORS.SUCCESS },
      { text: '📚 Select Subject', action: this.showSubjectMenu, color: COLORS.PRIMARY },
      { text: '⚙️ Settings', action: this.showSettings, color: COLORS.WARNING },
      { text: '🏆 Achievements', action: this.showAchievements, color: COLORS.MAGIC },
      { text: '📊 Statistics', action: this.showStatistics, color: COLORS.SECONDARY }
    ];

    buttonData.forEach((data, index) => {
      const button = this.createMenuButton(
        GAME_CONFIG.WIDTH / 2,
        380 + index * 80,
        data.text,
        data.action,
        data.color
      );
      this.menuButtons.push(button);
    });
  }

  private createMenuButton(
    x: number, 
    y: number, 
    text: string, 
    callback: () => void, 
    color: number
  ): Phaser.GameObjects.Container {
    const button = this.add.container(x, y);
    
    const bg = this.add.rectangle(0, 0, 350, 60, color, 0.8);
    bg.setStrokeStyle(3, 0xFFFFFF, 0.3);
    
    const label = this.add.text(0, 0, text, {
      fontSize: '24px',
      color: '#FFFFFF',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const glow = this.add.rectangle(0, 0, 350, 60, color, 0.2);
    glow.setVisible(false);

    button.add([bg, glow, label]);
    button.setSize(350, 60);
    button.setInteractive();

    // Hover effects
    button.on('pointerover', () => {
      glow.setVisible(true);
      button.setScale(1.05);
      this.tweens.add({
        targets: glow,
        alpha: { from: 0.2, to: 0.5 },
        duration: 200,
        yoyo: true,
        repeat: -1
      });
    });

    button.on('pointerout', () => {
      glow.setVisible(false);
      button.setScale(1);
      this.tweens.killTweensOf(glow);
    });

    button.on('pointerdown', () => {
      this.cameras.main.shake(100, 0.01);
      callback.call(this);
    });

    return button;
  }

  private createFooter(): void {
    const gameStore = useGameStore.getState();
    
    this.add.text(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT - 100, 
      `Level ${gameStore.level} • Score: ${gameStore.score} • Coins: ${gameStore.totalCoins}`, {
      fontSize: '18px',
      color: '#9CA3AF'
    }).setOrigin(0.5);

    this.add.text(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT - 60, 
      'Made with ❤️ for curious minds', {
      fontSize: '16px',
      color: '#6B7280'
    }).setOrigin(0.5);

    this.add.text(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT - 30, 
      'v2.0.0 - Premium Edition', {
      fontSize: '14px',
      color: '#4B5563'
    }).setOrigin(0.5);
  }

  private setupAudio(): void {
    if (this.sound.get('menu_music')) {
      this.backgroundMusic = this.sound.get('menu_music');
    } else {
      // Create placeholder audio
      this.backgroundMusic = this.sound.add('menu_music', { 
        volume: useGameStore.getState().settings.musicVolume,
        loop: true 
      });
    }
    
    if (!this.backgroundMusic.isPlaying) {
      this.backgroundMusic.play();
    }
  }

  private setupAnimations(): void {
    // Title floating animation
    this.tweens.add({
      targets: this.titleText,
      y: { from: 180, to: 170 },
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Staggered button entrance
    this.menuButtons.forEach((button, index) => {
      button.setAlpha(0);
      button.setY(button.y + 50);
      
      this.tweens.add({
        targets: button,
        alpha: 1,
        y: button.y - 50,
        duration: 600,
        delay: index * 100,
        ease: 'Back.easeOut'
      });
    });
  }

  private startGame(): void {
    this.backgroundMusic?.stop();
    this.cameras.main.fadeOut(500, 0, 0, 0);
    
    this.time.delayedCall(500, () => {
      useGameStore.getState().startGame();
      this.scene.start(GAME_CONFIG.SCENES.WORLD);
      this.scene.launch(GAME_CONFIG.SCENES.HUD);
    });
  }

  private showSubjectMenu(): void {
    // Create subject selection overlay
    const overlay = this.add.rectangle(0, 0, GAME_CONFIG.WIDTH, GAME_CONFIG.HEIGHT, 0x000000, 0.8)
      .setOrigin(0, 0)
      .setInteractive();

    const panel = this.add.rectangle(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT / 2, 600, 400, 0x1F2937)
      .setStrokeStyle(3, COLORS.PRIMARY);

    const title = this.add.text(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT / 2 - 150, 'Choose Your Subject', {
      fontSize: '32px',
      color: '#FFFFFF',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const subjects = [
      { name: '🔢 Mathematics', key: 'Math' },
      { name: '🔬 Science', key: 'Science' },
      { name: '🌍 Geography', key: 'Geography' },
      { name: '📖 Literature', key: 'Literature' },
      { name: '🎨 Mixed Topics', key: 'Mixed' }
    ];

    subjects.forEach((subject, index) => {
      const button = this.add.container(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT / 2 - 50 + index * 60);
      const bg = this.add.rectangle(0, 0, 300, 50, COLORS.PRIMARY, 0.8);
      const label = this.add.text(0, 0, subject.name, {
        fontSize: '20px',
        color: '#FFFFFF'
      }).setOrigin(0.5);

      button.add([bg, label]);
      button.setSize(300, 50);
      button.setInteractive();

      button.on('pointerdown', () => {
        useGameStore.getState().setSubject(subject.key);
        overlay.destroy();
        panel.destroy();
        title.destroy();
        subjects.forEach((_, i) => {
          if (this.children.exists(button)) button.destroy();
        });
      });
    });

    // Close button
    const closeButton = this.add.text(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT / 2 + 150, 'Close', {
      fontSize: '18px',
      color: '#EF4444'
    }).setOrigin(0.5).setInteractive();

    closeButton.on('pointerdown', () => {
      overlay.destroy();
      panel.destroy();
      title.destroy();
      closeButton.destroy();
    });
  }

  private showSettings(): void {
    // Launch settings scene as overlay
    this.scene.launch('SettingsScene');
    this.scene.pause();
  }

  private showAchievements(): void {
    this.scene.launch(GAME_CONFIG.SCENES.ACHIEVEMENT);
    this.scene.pause();
  }

  private showStatistics(): void {
    // Create statistics overlay
    const gameStore = useGameStore.getState();
    const stats = gameStore.stats;

    const overlay = this.add.rectangle(0, 0, GAME_CONFIG.WIDTH, GAME_CONFIG.HEIGHT, 0x000000, 0.8)
      .setOrigin(0, 0)
      .setInteractive();

    const panel = this.add.rectangle(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT / 2, 700, 500, 0x1F2937)
      .setStrokeStyle(3, COLORS.SECONDARY);

    const title = this.add.text(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT / 2 - 200, 'Your Statistics', {
      fontSize: '32px',
      color: '#FFFFFF',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const statsText = [
      `🎮 Total Play Time: ${Math.floor(stats.totalPlayTime / 60)} minutes`,
      `❓ Questions Answered: ${stats.questionsAnswered}`,
      `✅ Correct Answers: ${stats.correctAnswers}`,
      `🎯 Accuracy: ${stats.questionsAnswered > 0 ? Math.round((stats.correctAnswers / stats.questionsAnswered) * 100) : 0}%`,
      `💰 Treasures Found: ${stats.treasuresFound}`,
      `🏆 Levels Completed: ${stats.levelsCompleted}`,
      `⭐ Perfect Levels: ${stats.perfectLevels}`,
      `💡 Hints Used: ${stats.hintsUsed}`
    ];

    statsText.forEach((stat, index) => {
      this.add.text(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT / 2 - 120 + index * 35, stat, {
        fontSize: '18px',
        color: '#E5E7EB'
      }).setOrigin(0.5);
    });

    const closeButton = this.add.text(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT / 2 + 180, 'Close', {
      fontSize: '20px',
      color: '#EF4444',
      fontStyle: 'bold'
    }).setOrigin(0.5).setInteractive();

    closeButton.on('pointerdown', () => {
      overlay.destroy();
      panel.destroy();
      title.destroy();
      closeButton.destroy();
    });
  }
}