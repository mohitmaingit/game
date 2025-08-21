import React, { useState, useEffect } from 'react';
import { useGameStore } from '../game/state/store';
import { 
  Coins, 
  Star, 
  Trophy, 
  Brain, 
  Target, 
  Settings, 
  Map, 
  Package, 
  Clock,
  Zap,
  Heart,
  Shield,
  Gem
} from 'lucide-react';

const HUDOverlay: React.FC = () => {
  const {
    totalCoins,
    gems,
    score,
    experience,
    level,
    levelIndex,
    correctThisLevel,
    subject,
    mode,
    difficulty,
    attempts,
    maxAttempts,
    currentQuestionId,
    timeRemaining,
    hintsUsed,
    hintsAvailable
  } = useGameStore();

  const [showMiniMap, setShowMiniMap] = useState(false);
  const [showInventory, setShowInventory] = useState(false);

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getModeColor = () => {
    switch (mode) {
      case 'knowledge': return 'bg-blue-600';
      case 'reward': return 'bg-green-600';
      case 'challenge': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  const getTimeColor = () => {
    if (timeRemaining > 30) return 'text-green-400';
    if (timeRemaining > 10) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none">
      {/* Top HUD Bar */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-opacity-95 text-white p-4 shadow-2xl border-b border-gray-700">
        <div className="flex justify-between items-center">
          {/* Left Side - Resources */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-yellow-600 bg-opacity-20 px-3 py-1 rounded-full">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className="font-bold text-yellow-400">{totalCoins.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-purple-600 bg-opacity-20 px-3 py-1 rounded-full">
              <Gem className="w-5 h-5 text-purple-400" />
              <span className="font-bold text-purple-400">{gems}</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-blue-600 bg-opacity-20 px-3 py-1 rounded-full">
              <Star className="w-5 h-5 text-blue-400" />
              <span className="font-bold text-white">{score.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-green-600 bg-opacity-20 px-3 py-1 rounded-full">
              <Trophy className="w-5 h-5 text-green-400" />
              <span className="font-bold text-green-400">Lv.{level}</span>
            </div>
          </div>

          {/* Center - Progress & Status */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold">Level {levelIndex + 1}</span>
              <div className="w-24 bg-gray-700 rounded-full h-2 ml-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(correctThisLevel / 5) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-300">{correctThisLevel}/5</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-400">{subject}</span>
            </div>
            
            <div className={`px-3 py-1 ${getModeColor()} rounded-full text-xs font-bold uppercase tracking-wide`}>
              {mode}
            </div>

            <div className={`px-2 py-1 bg-gray-700 rounded text-xs font-semibold ${getDifficultyColor()}`}>
              {difficulty.toUpperCase()}
            </div>
          </div>

          {/* Right Side - Actions & Status */}
          <div className="flex items-center space-x-3">
            {currentQuestionId && (
              <>
                <div className="flex items-center space-x-2 bg-red-600 bg-opacity-20 px-3 py-1 rounded-full">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-bold text-red-400">{attempts}/{maxAttempts}</span>
                </div>
                
                <div className={`flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded-full ${getTimeColor()}`}>
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-bold">{timeRemaining}s</span>
                </div>
                
                <div className="flex items-center space-x-2 bg-yellow-600 bg-opacity-20 px-3 py-1 rounded-full">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-bold text-yellow-400">{hintsAvailable - hintsUsed}</span>
                </div>
              </>
            )}
            
            <button 
              className="p-2 hover:bg-gray-700 rounded-lg pointer-events-auto transition-colors"
              onClick={() => setShowMiniMap(!showMiniMap)}
              title="Toggle Map"
            >
              <Map className="w-5 h-5 text-gray-300 hover:text-white" />
            </button>
            
            <button 
              className="p-2 hover:bg-gray-700 rounded-lg pointer-events-auto transition-colors"
              onClick={() => setShowInventory(!showInventory)}
              title="Open Inventory"
            >
              <Package className="w-5 h-5 text-gray-300 hover:text-white" />
            </button>
            
            <button className="p-2 hover:bg-gray-700 rounded-lg pointer-events-auto transition-colors">
              <Settings className="w-5 h-5 text-gray-300 hover:text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Experience Bar */}
      <div className="bg-gray-800 bg-opacity-90 px-4 py-2 border-b border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-300 mb-1">
          <span>Experience</span>
          <span>{experience} XP</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(experience % 1000) / 10}%` }}
          />
        </div>
      </div>

      {/* Quest Objective (when in question) */}
      {currentQuestionId && (
        <div className="absolute top-24 left-4 bg-black bg-opacity-80 text-white p-4 rounded-lg max-w-sm pointer-events-none">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-4 h-4 text-yellow-400" />
            <span className="font-bold text-yellow-400">Current Objective</span>
          </div>
          <p className="text-sm">Answer the question correctly to claim the treasure!</p>
          <div className="mt-2 flex items-center space-x-4 text-xs">
            <span className="flex items-center space-x-1">
              <Heart className="w-3 h-3 text-red-400" />
              <span>{attempts} attempts left</span>
            </span>
            <span className="flex items-center space-x-1">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span>{hintsAvailable - hintsUsed} hints</span>
            </span>
          </div>
        </div>
      )}

      {/* Mini Map (if enabled) */}
      {showMiniMap && (
        <div className="absolute top-4 right-4 w-64 h-48 bg-black bg-opacity-80 rounded-lg p-3 pointer-events-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-bold text-sm">Mini Map</span>
            <button 
              onClick={() => setShowMiniMap(false)}
              className="text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>
          <div className="w-full h-32 bg-gray-700 rounded relative">
            {/* Simplified map representation */}
            <div className="absolute bottom-2 left-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse" title="Your Position" />
            <div className="absolute top-4 right-8 w-2 h-2 bg-yellow-400 rounded-full animate-bounce" title="Treasure" />
            <div className="absolute center w-2 h-2 bg-green-400 rounded-full" title="Collected" />
          </div>
        </div>
      )}

      {/* Achievement Notification */}
      <div className="absolute top-32 right-4 space-y-2 pointer-events-none">
        {/* This would be populated by achievement notifications */}
      </div>

      {/* Combo/Streak Indicator */}
      {correctThisLevel > 1 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-2xl animate-pulse">
            🔥 {correctThisLevel} Streak!
          </div>
        </div>
      )}
    </div>
  );
};

export default HUDOverlay;