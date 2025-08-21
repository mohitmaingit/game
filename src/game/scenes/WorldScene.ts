import Phaser from 'phaser';
import { GAME_CONFIG } from '../config/constants';
import { useGameStore } from '../state/store';

export default class WorldScene extends Phaser.Scene {
  private player?: Phaser.Physics.Arcade.Sprite;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd?: any;

  constructor() {
    super({ key: GAME_CONFIG.SCENES.WORLD });
  }

  create(): void {
    // Background
    this.add.rectangle(0, 0, GAME_CONFIG.WIDTH, GAME_CONFIG.HEIGHT, 0x87CEEB)
      .setOrigin(0, 0);

    // Create ground
    const ground = this.physics.add.staticGroup();
    ground.create(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT - 32, null)
      .setSize(GAME_CONFIG.WIDTH, 64)
      .setVisible(false);

    // Create player
    this.player = this.physics.add.sprite(100, GAME_CONFIG.HEIGHT - 100, null);
    this.player.setSize(32, 48);
    this.player.setTint(0x3B82F6);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    // Player physics
    this.physics.add.collider(this.player, ground);

    // Input
    this.cursors = this.input.keyboard?.createCursorKeys();
    this.wasd = this.input.keyboard?.addKeys('W,S,A,D');

    // Add some sample treasures
    this.createTreasures();
  }

  update(): void {
    if (!this.player || !this.cursors) return;

    // Player movement
    if (this.cursors.left.isDown || this.wasd?.A.isDown) {
      this.player.setVelocityX(-GAME_CONFIG.PLAYER.SPEED);
    } else if (this.cursors.right.isDown || this.wasd?.D.isDown) {
      this.player.setVelocityX(GAME_CONFIG.PLAYER.SPEED);
    } else {
      this.player.setVelocityX(0);
    }

    // Jumping
    if ((this.cursors.up.isDown || this.wasd?.W.isDown) && this.player.body?.touching.down) {
      this.player.setVelocityY(GAME_CONFIG.PLAYER.JUMP_VELOCITY);
    }
  }

  private createTreasures(): void {
    // Create some sample treasure chests
    const treasures = this.physics.add.group();
    
    for (let i = 0; i < 5; i++) {
      const x = 200 + i * 150;
      const y = GAME_CONFIG.HEIGHT - 100;
      const treasure = treasures.create(x, y, null);
      treasure.setSize(32, 32);
      treasure.setTint(0xFFD700);
    }

    // Collision with treasures
    this.physics.add.overlap(this.player!, treasures, (player, treasure) => {
      treasure.destroy();
      useGameStore.getState().addCoins(10);
      useGameStore.getState().addScore(100);
    });
  }
}