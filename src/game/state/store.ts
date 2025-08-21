import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  points: number;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface PlayerStats {
  totalPlayTime: number;
  questionsAnswered: number;
  correctAnswers: number;
  treasuresFound: number;
  levelsCompleted: number;
  perfectLevels: number;
  hintsUsed: number;
  averageTime: number;
}

export interface GameSettings {
  musicVolume: number;
  sfxVolume: number;
  difficulty: 'easy' | 'medium' | 'hard';
  showHints: boolean;
  autoSave: boolean;
  particleEffects: boolean;
  screenShake: boolean;
}

export interface GameState {
  // Game status
  gameStarted: boolean;
  gamePaused: boolean;
  gameCompleted: boolean;
  currentScene: string;
  
  // Player progress
  score: number;
  totalCoins: number;
  gems: number;
  experience: number;
  level: number;
  levelIndex: number;
  correctThisLevel: number;
  timeSpentThisLevel: number;
  
  // Current session
  subject: string;
  mode: 'knowledge' | 'reward' | 'challenge';
  difficulty: 'easy' | 'medium' | 'hard';
  attempts: number;
  maxAttempts: number;
  currentQuestionId: string | null;
  hintsUsed: number;
  hintsAvailable: number;
  timeRemaining: number;
  
  // Inventory & Items
  inventory: string[];
  powerUps: { [key: string]: number };
  unlockedAreas: string[];
  
  // Achievements & Stats
  achievements: Achievement[];
  stats: PlayerStats;
  settings: GameSettings;
  
  // Multiplayer (future)
  playerId?: string;
  isOnline: boolean;
  
  // Actions
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  nextLevel: () => void;
  resetLevel: () => void;
  addScore: (points: number) => void;
  addCoins: (coins: number) => void;
  addGems: (gems: number) => void;
  addExperience: (xp: number) => void;
  setSubject: (subject: string) => void;
  setMode: (mode: 'knowledge' | 'reward' | 'challenge') => void;
  setDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
  setCurrentQuestion: (questionId: string | null) => void;
  incrementCorrect: () => void;
  resetAttempts: () => void;
  decrementAttempts: () => void;
  incrementHints: () => void;
  unlockAchievement: (achievementId: string) => void;
  updateStats: (statUpdate: Partial<PlayerStats>) => void;
  updateSettings: (settingsUpdate: Partial<GameSettings>) => void;
  addToInventory: (item: string) => void;
  usePowerUp: (powerUp: string) => void;
  setTimeRemaining: (time: number) => void;
  incrementPlayTime: (seconds: number) => void;
}

const initialStats: PlayerStats = {
  totalPlayTime: 0,
  questionsAnswered: 0,
  correctAnswers: 0,
  treasuresFound: 0,
  levelsCompleted: 0,
  perfectLevels: 0,
  hintsUsed: 0,
  averageTime: 0
};

const initialSettings: GameSettings = {
  musicVolume: 0.6,
  sfxVolume: 0.8,
  difficulty: 'medium',
  showHints: true,
  autoSave: true,
  particleEffects: true,
  screenShake: true
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Initial state
      gameStarted: false,
      gamePaused: false,
      gameCompleted: false,
      currentScene: 'MenuScene',
      score: 0,
      totalCoins: 0,
      gems: 0,
      experience: 0,
      level: 1,
      levelIndex: 0,
      correctThisLevel: 0,
      timeSpentThisLevel: 0,
      subject: 'Math',
      mode: 'knowledge',
      difficulty: 'medium',
      attempts: 3,
      maxAttempts: 3,
      currentQuestionId: null,
      hintsUsed: 0,
      hintsAvailable: 2,
      timeRemaining: 45,
      inventory: [],
      powerUps: {},
      unlockedAreas: ['forest'],
      achievements: [],
      stats: initialStats,
      settings: initialSettings,
      isOnline: false,

      // Actions
      startGame: () => set({ 
        gameStarted: true, 
        gamePaused: false,
        currentScene: 'WorldScene'
      }),
      
      pauseGame: () => set({ gamePaused: true }),
      
      resumeGame: () => set({ gamePaused: false }),
      
      resetGame: () => set({
        gameStarted: false,
        gamePaused: false,
        gameCompleted: false,
        currentScene: 'MenuScene',
        score: 0,
        levelIndex: 0,
        correctThisLevel: 0,
        timeSpentThisLevel: 0,
        attempts: 3,
        currentQuestionId: null,
        hintsUsed: 0,
        timeRemaining: 45
      }),
      
      nextLevel: () => set((state) => {
        const newLevel = state.levelIndex + 1;
        return {
          levelIndex: newLevel,
          level: Math.floor(newLevel / 5) + 1,
          correctThisLevel: 0,
          attempts: state.maxAttempts,
          currentQuestionId: null,
          timeSpentThisLevel: 0,
          hintsUsed: 0
        };
      }),
      
      resetLevel: () => set((state) => ({
        correctThisLevel: 0,
        attempts: state.maxAttempts,
        currentQuestionId: null,
        timeSpentThisLevel: 0,
        hintsUsed: 0
      })),
      
      addScore: (points: number) => set((state) => ({
        score: state.score + Math.floor(points * (state.difficulty === 'easy' ? 1 : state.difficulty === 'medium' ? 1.5 : 2))
      })),
      
      addCoins: (coins: number) => set((state) => ({
        totalCoins: state.totalCoins + coins
      })),
      
      addGems: (gems: number) => set((state) => ({
        gems: state.gems + gems
      })),
      
      addExperience: (xp: number) => set((state) => {
        const newXp = state.experience + xp;
        const newLevel = Math.floor(newXp / 1000) + 1;
        return {
          experience: newXp,
          level: newLevel
        };
      }),
      
      setSubject: (subject: string) => set({ subject }),
      
      setMode: (mode: 'knowledge' | 'reward' | 'challenge') => set({ mode }),
      
      setDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => {
        const maxAttempts = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 2 : 1;
        const hintsAvailable = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 2 : 1;
        const timeRemaining = difficulty === 'easy' ? 60 : difficulty === 'medium' ? 45 : 30;
        
        set({ 
          difficulty, 
          maxAttempts, 
          attempts: maxAttempts,
          hintsAvailable,
          timeRemaining
        });
      },
      
      setCurrentQuestion: (questionId: string | null) => set((state) => ({ 
        currentQuestionId: questionId,
        attempts: questionId ? state.maxAttempts : state.attempts
      })),
      
      incrementCorrect: () => set((state) => ({
        correctThisLevel: state.correctThisLevel + 1,
        stats: {
          ...state.stats,
          correctAnswers: state.stats.correctAnswers + 1,
          questionsAnswered: state.stats.questionsAnswered + 1
        }
      })),
      
      resetAttempts: () => set((state) => ({ attempts: state.maxAttempts })),
      
      decrementAttempts: () => set((state) => ({
        attempts: Math.max(0, state.attempts - 1),
        stats: {
          ...state.stats,
          questionsAnswered: state.stats.questionsAnswered + 1
        }
      })),
      
      incrementHints: () => set((state) => ({
        hintsUsed: state.hintsUsed + 1,
        stats: {
          ...state.stats,
          hintsUsed: state.stats.hintsUsed + 1
        }
      })),
      
      unlockAchievement: (achievementId: string) => set((state) => {
        const existingAchievement = state.achievements.find(a => a.id === achievementId);
        if (existingAchievement && !existingAchievement.unlocked) {
          const updatedAchievements = state.achievements.map(a => 
            a.id === achievementId 
              ? { ...a, unlocked: true, unlockedAt: new Date() }
              : a
          );
          return { achievements: updatedAchievements };
        }
        return state;
      }),
      
      updateStats: (statUpdate: Partial<PlayerStats>) => set((state) => ({
        stats: { ...state.stats, ...statUpdate }
      })),
      
      updateSettings: (settingsUpdate: Partial<GameSettings>) => set((state) => ({
        settings: { ...state.settings, ...settingsUpdate }
      })),
      
      addToInventory: (item: string) => set((state) => ({
        inventory: [...state.inventory, item]
      })),
      
      usePowerUp: (powerUp: string) => set((state) => ({
        powerUps: {
          ...state.powerUps,
          [powerUp]: (state.powerUps[powerUp] || 0) - 1
        }
      })),
      
      setTimeRemaining: (time: number) => set({ timeRemaining: time }),
      
      incrementPlayTime: (seconds: number) => set((state) => ({
        stats: {
          ...state.stats,
          totalPlayTime: state.stats.totalPlayTime + seconds
        },
        timeSpentThisLevel: state.timeSpentThisLevel + seconds
      }))
    }),
    {
      name: 'treasure-hunt-game-storage',
      partialize: (state) => ({
        totalCoins: state.totalCoins,
        gems: state.gems,
        experience: state.experience,
        level: state.level,
        achievements: state.achievements,
        stats: state.stats,
        settings: state.settings,
        inventory: state.inventory,
        powerUps: state.powerUps,
        unlockedAreas: state.unlockedAreas
      })
    }
  )
);