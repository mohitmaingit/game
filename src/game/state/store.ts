import { create } from 'zustand';

export interface GameState {
  // Game status
  gameStarted: boolean;
  gamePaused: boolean;
  gameCompleted: boolean;
  
  // Player progress
  score: number;
  totalCoins: number;
  levelIndex: number;
  correctThisLevel: number;
  
  // Current session
  subject: string;
  mode: 'knowledge' | 'reward';
  attempts: number;
  currentQuestionId: string | null;
  hintsUsed: number;
  
  // Actions
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  nextLevel: () => void;
  resetLevel: () => void;
  addScore: (points: number) => void;
  addCoins: (coins: number) => void;
  setSubject: (subject: string) => void;
  setMode: (mode: 'knowledge' | 'reward') => void;
  setCurrentQuestion: (questionId: string | null) => void;
  incrementCorrect: () => void;
  resetAttempts: () => void;
  decrementAttempts: () => void;
  incrementHints: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  gameStarted: false,
  gamePaused: false,
  gameCompleted: false,
  score: 0,
  totalCoins: 0,
  levelIndex: 0,
  correctThisLevel: 0,
  subject: 'Math',
  mode: 'knowledge',
  attempts: 3,
  currentQuestionId: null,
  hintsUsed: 0,

  // Actions
  startGame: () => set({ gameStarted: true, gamePaused: false }),
  
  pauseGame: () => set({ gamePaused: true }),
  
  resumeGame: () => set({ gamePaused: false }),
  
  resetGame: () => set({
    gameStarted: false,
    gamePaused: false,
    gameCompleted: false,
    score: 0,
    totalCoins: 0,
    levelIndex: 0,
    correctThisLevel: 0,
    subject: 'Math',
    mode: 'knowledge',
    attempts: 3,
    currentQuestionId: null,
    hintsUsed: 0
  }),
  
  nextLevel: () => set((state) => ({
    levelIndex: state.levelIndex + 1,
    correctThisLevel: 0,
    attempts: 3,
    currentQuestionId: null
  })),
  
  resetLevel: () => set({
    correctThisLevel: 0,
    attempts: 3,
    currentQuestionId: null
  }),
  
  addScore: (points: number) => set((state) => ({
    score: state.score + points
  })),
  
  addCoins: (coins: number) => set((state) => ({
    totalCoins: state.totalCoins + coins
  })),
  
  setSubject: (subject: string) => set({ subject }),
  
  setMode: (mode: 'knowledge' | 'reward') => set({ mode }),
  
  setCurrentQuestion: (questionId: string | null) => set({ 
    currentQuestionId: questionId,
    attempts: questionId ? 3 : get().attempts
  }),
  
  incrementCorrect: () => set((state) => ({
    correctThisLevel: state.correctThisLevel + 1
  })),
  
  resetAttempts: () => set({ attempts: 3 }),
  
  decrementAttempts: () => set((state) => ({
    attempts: Math.max(0, state.attempts - 1)
  })),
  
  incrementHints: () => set((state) => ({
    hintsUsed: state.hintsUsed + 1
  }))
}));