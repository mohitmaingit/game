export interface Question {
  id: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  solution: string;
  explanation: string;
  hintType?: HintType;
  nextClue?: string;
  timeLimit: number;
  points: number;
  bonusPoints: number;
  tags?: string[];
  multimedia?: {
    image?: string;
    audio?: string;
    video?: string;
  };
}

export type HintType = 'map' | 'riddle' | 'compass' | 'glow' | 'sound' | 'visual';

export interface TreasureLocation {
  id: string;
  x: number;
  y: number;
  questionId: string;
  collected: boolean;
  type: 'bronze' | 'silver' | 'golden' | 'crystal' | 'magic' | 'legendary' | 'elemental';
  animation: string;
  particles: string;
  rarity?: number;
  requirements?: string[];
}

export interface NPC {
  id: string;
  name: string;
  x: number;
  y: number;
  dialogue: string[];
  questGiver: boolean;
  shopkeeper: boolean;
  shop?: ShopItem[];
  sprite?: string;
  animations?: string[];
}

export interface ShopItem {
  item: string;
  price: number;
  effect: string;
  description?: string;
  icon?: string;
}

export interface PowerUp {
  id: string;
  x: number;
  y: number;
  effect: string;
  duration?: number;
  uses?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Secret {
  id: string;
  x: number;
  y: number;
  reward: string;
  amount: number;
  requirements?: string[];
  discovered?: boolean;
}

export interface Environment {
  weather: 'sunny' | 'rainy' | 'snowy' | 'foggy' | 'stormy' | 'none';
  timeOfDay: 'dawn' | 'morning' | 'noon' | 'afternoon' | 'dusk' | 'night' | 'eternal_twilight';
  ambientSounds: string[];
  backgroundMusic: string;
  lighting?: {
    ambient: number;
    shadows: boolean;
    dynamicLighting: boolean;
  };
}

export interface Level {
  id: string;
  name: string;
  description: string;
  background: string;
  difficulty: 'easy' | 'medium' | 'hard';
  environment: Environment;
  treasures: TreasureLocation[];
  questions: Question[];
  npcs: NPC[];
  powerUps: PowerUp[];
  secrets: Secret[];
  unlockRequirements?: {
    level?: number;
    score?: number;
    achievements?: string[];
  };
  rewards?: {
    coins: number;
    gems: number;
    experience: number;
    items?: string[];
  };
}

export interface GameProgress {
  currentLevel: number;
  totalScore: number;
  coinsCollected: number;
  gemsCollected: number;
  questionsAnswered: number;
  correctAnswers: number;
  hintsUsed: number;
  achievementsUnlocked: number;
  totalPlayTime: number;
  averageAccuracy: number;
  streakRecord: number;
  favoriteSubject: string;
}

export interface Particle {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  life: number;
  maxLife: number;
  color: number;
  alpha: number;
  scale: number;
  rotation: number;
}

export interface SoundEffect {
  key: string;
  volume: number;
  loop: boolean;
  fadeIn?: number;
  fadeOut?: number;
}

export interface Animation {
  key: string;
  frames: number[];
  frameRate: number;
  repeat: number;
  yoyo?: boolean;
}

export interface GameEvent {
  type: string;
  data: any;
  timestamp: number;
  source: string;
}