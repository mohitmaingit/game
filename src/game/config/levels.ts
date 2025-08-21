import { Level } from '../../types';

export const levels: Level[] = [
  {
    id: 'level_1',
    name: 'Enchanted Forest',
    description: 'Begin your adventure in the magical forest',
    background: 'forest',
    treasures: [
      { id: 'treasure_1', x: 200, y: 500, questionId: 'math_1', collected: false },
      { id: 'treasure_2', x: 400, y: 450, questionId: 'math_2', collected: false },
      { id: 'treasure_3', x: 600, y: 500, questionId: 'math_3', collected: false },
      { id: 'treasure_4', x: 800, y: 450, questionId: 'math_4', collected: false },
      { id: 'treasure_5', x: 900, y: 500, questionId: 'math_5', collected: false }
    ],
    questions: [
      {
        id: 'math_1',
        subject: 'Math',
        difficulty: 'easy',
        prompt: 'What is 5 + 3?',
        options: ['6', '7', '8', '9'],
        answerIndex: 2,
        solution: '5 + 3 = 8',
        hintType: 'map',
        nextClue: 'Look for the glowing tree!'
      },
      {
        id: 'math_2',
        subject: 'Math',
        difficulty: 'easy',
        prompt: 'What is 12 - 4?',
        options: ['6', '7', '8', '9'],
        answerIndex: 2,
        solution: '12 - 4 = 8',
        hintType: 'compass',
        nextClue: 'Follow the path to the right!'
      },
      {
        id: 'math_3',
        subject: 'Math',
        difficulty: 'easy',
        prompt: 'What is 3 × 4?',
        options: ['10', '11', '12', '13'],
        answerIndex: 2,
        solution: '3 × 4 = 12',
        hintType: 'glow',
        nextClue: 'The treasure glows near the rocks!'
      },
      {
        id: 'math_4',
        subject: 'Math',
        difficulty: 'easy',
        prompt: 'What is 16 ÷ 2?',
        options: ['6', '7', '8', '9'],
        answerIndex: 2,
        solution: '16 ÷ 2 = 8',
        hintType: 'riddle',
        nextClue: 'Where shadows meet the light!'
      },
      {
        id: 'math_5',
        subject: 'Math',
        difficulty: 'easy',
        prompt: 'What is 7 + 6?',
        options: ['11', '12', '13', '14'],
        answerIndex: 2,
        solution: '7 + 6 = 13',
        hintType: 'map',
        nextClue: 'The final treasure awaits!'
      }
    ]
  }
];

export const getCurrentLevel = (levelIndex: number): Level | null => {
  return levels[levelIndex] || null;
};

export const getNextLevel = (currentLevelIndex: number): Level | null => {
  return levels[currentLevelIndex + 1] || null;
};