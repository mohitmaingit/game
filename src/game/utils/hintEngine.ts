import { HintType } from '../../types';

export interface HintData {
  type: HintType;
  targetPosition: { x: number; y: number };
  message?: string;
  duration?: number;
}

class HintEngine {
  private callbacks: Map<HintType, (data: HintData) => void> = new Map();
  private activeHints: HintData[] = [];

  registerHintCallback(type: HintType, callback: (data: HintData) => void): void {
    this.callbacks.set(type, callback);
  }

  emitHint(type: HintType, targetPosition: { x: number; y: number }, message?: string, duration: number = 3000): void {
    const hintData: HintData = {
      type,
      targetPosition,
      message,
      duration
    };

    this.activeHints.push(hintData);
    
    const callback = this.callbacks.get(type);
    if (callback) {
      callback(hintData);
    }

    // Auto-remove hint after duration
    setTimeout(() => {
      this.removeHint(hintData);
    }, duration);
  }

  showMapHint(targetPosition: { x: number; y: number }): void {
    this.emitHint('map', targetPosition, 'Check your map for the treasure location!', 3000);
  }

  showRiddleHint(targetPosition: { x: number; y: number }, riddle?: string): void {
    const message = riddle || 'Solve the riddle to find your treasure!';
    this.emitHint('riddle', targetPosition, message, 5000);
  }

  showCompassHint(targetPosition: { x: number; y: number }): void {
    this.emitHint('compass', targetPosition, 'Follow the compass to find your treasure!', 8000);
  }

  showGlowHint(targetPosition: { x: number; y: number }): void {
    this.emitHint('glow', targetPosition, 'Follow the glowing path!', 4000);
  }

  processHintFromQuestion(hintType?: HintType, targetPosition?: { x: number; y: number }, customMessage?: string): void {
    if (!hintType || !targetPosition) return;

    switch (hintType) {
      case 'map':
        this.showMapHint(targetPosition);
        break;
      case 'riddle':
        this.showRiddleHint(targetPosition, customMessage);
        break;
      case 'compass':
        this.showCompassHint(targetPosition);
        break;
      case 'glow':
        this.showGlowHint(targetPosition);
        break;
    }
  }

  getActiveHints(): HintData[] {
    return [...this.activeHints];
  }

  clearAllHints(): void {
    this.activeHints = [];
  }

  private removeHint(hintData: HintData): void {
    const index = this.activeHints.indexOf(hintData);
    if (index > -1) {
      this.activeHints.splice(index, 1);
    }
  }
}

export const hintEngine = new HintEngine();