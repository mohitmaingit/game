export interface Question {
  id: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  prompt: string;
  options: string[];
  answerIndex: number;
  solution: string;
  hintType?: HintType;
  nextClue?: string;
}

export type HintType = 'map' | 'riddle' | 'compass' | 'glow';

export interface Level {
  id: string;
  name: string;
  description: string;
  background: string;
  treasures: TreasureLocation[];
  questions: Question[];
}

export interface TreasureLocation {
  id: string;
  x: number;
  y: number;
  questionId: string;
  collected: boolean;
}

export interface GameProgress {
  currentLevel: number;
  totalScore: number;
  coinsCollected: number;
  questionsAnswered: number;
  hintsUsed: number;
}