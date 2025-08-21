import { Level } from '../../types';

export const levels: Level[] = [
  {
    id: 'enchanted_forest_1',
    name: 'Whispering Woods',
    description: 'Ancient trees hold mathematical secrets',
    background: 'enchanted_forest',
    difficulty: 'easy',
    environment: {
      weather: 'sunny',
      timeOfDay: 'morning',
      ambientSounds: ['birds', 'wind', 'leaves'],
      backgroundMusic: 'forest_theme'
    },
    treasures: [
      { 
        id: 'golden_acorn', 
        x: 300, 
        y: 650, 
        questionId: 'math_addition_1', 
        collected: false,
        type: 'golden',
        animation: 'glow_pulse',
        particles: 'golden_sparkles'
      },
      { 
        id: 'silver_mushroom', 
        x: 600, 
        y: 600, 
        questionId: 'math_subtraction_1', 
        collected: false,
        type: 'silver',
        animation: 'bounce',
        particles: 'silver_dust'
      },
      { 
        id: 'crystal_flower', 
        x: 900, 
        y: 650, 
        questionId: 'math_multiplication_1', 
        collected: false,
        type: 'crystal',
        animation: 'rotate',
        particles: 'crystal_shards'
      },
      { 
        id: 'magic_stone', 
        x: 1200, 
        y: 600, 
        questionId: 'math_division_1', 
        collected: false,
        type: 'magic',
        animation: 'float',
        particles: 'magic_orbs'
      },
      { 
        id: 'ancient_scroll', 
        x: 1100, 
        y: 500, 
        questionId: 'math_mixed_1', 
        collected: false,
        type: 'legendary',
        animation: 'legendary_glow',
        particles: 'rainbow_sparkles'
      }
    ],
    questions: [
      {
        id: 'math_addition_1',
        subject: 'Math',
        difficulty: 'easy',
        category: 'Addition',
        prompt: 'A magical tree has 15 golden apples. A friendly fairy gives you 8 more. How many golden apples do you have in total?',
        options: ['21', '23', '25', '27'],
        answerIndex: 1,
        solution: 'When you add 15 + 8, you get 23 golden apples! 🍎✨',
        explanation: 'Addition means combining quantities. Start with 15, then add 8 more: 15 + 8 = 23',
        hintType: 'map',
        nextClue: 'Look for the glowing tree near the crystal pond!',
        timeLimit: 45,
        points: 100,
        bonusPoints: 50
      },
      {
        id: 'math_subtraction_1',
        subject: 'Math',
        difficulty: 'easy',
        category: 'Subtraction',
        prompt: 'You found 20 magical mushrooms, but 7 of them disappeared in a puff of smoke. How many mushrooms do you have left?',
        options: ['11', '12', '13', '14'],
        answerIndex: 2,
        solution: 'When you subtract 7 from 20, you get 13 mushrooms remaining! 🍄',
        explanation: 'Subtraction means taking away. Start with 20, then remove 7: 20 - 7 = 13',
        hintType: 'compass',
        nextClue: 'Follow the mushroom trail to the east!',
        timeLimit: 45,
        points: 100,
        bonusPoints: 50
      },
      {
        id: 'math_multiplication_1',
        subject: 'Math',
        difficulty: 'easy',
        category: 'Multiplication',
        prompt: 'Each magical flower has 4 petals. If you find 6 flowers, how many petals are there in total?',
        options: ['20', '22', '24', '26'],
        answerIndex: 2,
        solution: 'Each flower has 4 petals, and with 6 flowers: 4 × 6 = 24 petals! 🌸',
        explanation: 'Multiplication is repeated addition. 4 petals × 6 flowers = 24 total petals',
        hintType: 'glow',
        nextClue: 'The flowers glow brighter near the ancient oak!',
        timeLimit: 45,
        points: 150,
        bonusPoints: 75
      },
      {
        id: 'math_division_1',
        subject: 'Math',
        difficulty: 'easy',
        category: 'Division',
        prompt: 'You have 24 magical gems to share equally among 3 treasure chests. How many gems go in each chest?',
        options: ['6', '7', '8', '9'],
        answerIndex: 2,
        solution: 'Divide 24 gems equally among 3 chests: 24 ÷ 3 = 8 gems per chest! 💎',
        explanation: 'Division means sharing equally. 24 gems ÷ 3 chests = 8 gems in each chest',
        hintType: 'riddle',
        nextClue: 'Where three paths meet, treasures you shall greet!',
        timeLimit: 45,
        points: 150,
        bonusPoints: 75
      },
      {
        id: 'math_mixed_1',
        subject: 'Math',
        difficulty: 'medium',
        category: 'Mixed Operations',
        prompt: 'A wizard has 5 spell books. Each book contains 8 spells. If he uses 12 spells, how many spells does he have left?',
        options: ['26', '28', '30', '32'],
        answerIndex: 1,
        solution: 'First: 5 books × 8 spells = 40 total spells. Then: 40 - 12 used = 28 spells left! 📚✨',
        explanation: 'Solve step by step: (5 × 8) - 12 = 40 - 12 = 28',
        hintType: 'map',
        nextClue: 'The final treasure awaits where magic flows strongest!',
        timeLimit: 60,
        points: 200,
        bonusPoints: 100
      }
    ],
    npcs: [
      {
        id: 'forest_guide',
        name: 'Sage Oakwhisper',
        x: 200,
        y: 650,
        dialogue: [
          'Welcome, young adventurer! The forest holds many mathematical mysteries.',
          'Each treasure you find will test your knowledge and reward your wisdom.',
          'Remember, take your time and think carefully about each question!'
        ],
        questGiver: true,
        shopkeeper: false
      }
    ],
    powerUps: [
      { id: 'time_boost', x: 500, y: 550, effect: 'extra_time', duration: 30 },
      { id: 'hint_crystal', x: 800, y: 500, effect: 'extra_hint', uses: 1 }
    ],
    secrets: [
      { id: 'hidden_cave', x: 1300, y: 700, reward: 'bonus_coins', amount: 500 }
    ]
  },
  {
    id: 'crystal_caverns_1',
    name: 'Glimmering Depths',
    description: 'Crystal formations hide scientific wonders',
    background: 'crystal_caverns',
    difficulty: 'medium',
    environment: {
      weather: 'none',
      timeOfDay: 'eternal_twilight',
      ambientSounds: ['dripping', 'echoes', 'crystal_chimes'],
      backgroundMusic: 'cavern_theme'
    },
    treasures: [
      { 
        id: 'fire_crystal', 
        x: 400, 
        y: 700, 
        questionId: 'science_states_1', 
        collected: false,
        type: 'elemental',
        animation: 'fire_flicker',
        particles: 'fire_sparks'
      },
      { 
        id: 'ice_crystal', 
        x: 700, 
        y: 650, 
        questionId: 'science_temperature_1', 
        collected: false,
        type: 'elemental',
        animation: 'ice_shimmer',
        particles: 'ice_crystals'
      },
      { 
        id: 'lightning_crystal', 
        x: 1000, 
        y: 700, 
        questionId: 'science_electricity_1', 
        collected: false,
        type: 'elemental',
        animation: 'electric_pulse',
        particles: 'lightning_bolts'
      },
      { 
        id: 'earth_crystal', 
        x: 1300, 
        y: 650, 
        questionId: 'science_geology_1', 
        collected: false,
        type: 'elemental',
        animation: 'earth_rumble',
        particles: 'rock_fragments'
      },
      { 
        id: 'master_crystal', 
        x: 850, 
        y: 450, 
        questionId: 'science_mixed_1', 
        collected: false,
        type: 'legendary',
        animation: 'master_glow',
        particles: 'prismatic_light'
      }
    ],
    questions: [
      {
        id: 'science_states_1',
        subject: 'Science',
        difficulty: 'medium',
        category: 'States of Matter',
        prompt: 'When water is heated to 100°C (212°F), what happens to it?',
        options: ['It freezes', 'It boils and becomes steam', 'It becomes ice', 'Nothing happens'],
        answerIndex: 1,
        solution: 'At 100°C, water reaches its boiling point and transforms into steam (water vapor)! 💨',
        explanation: 'The boiling point of water is 100°C at sea level. Heat energy causes water molecules to move faster and change from liquid to gas.',
        hintType: 'glow',
        nextClue: 'Seek the crystal that burns without flame!',
        timeLimit: 50,
        points: 150,
        bonusPoints: 75
      },
      {
        id: 'science_temperature_1',
        subject: 'Science',
        difficulty: 'medium',
        category: 'Temperature',
        prompt: 'At what temperature does water freeze?',
        options: ['0°C (32°F)', '10°C (50°F)', '-10°C (14°F)', '100°C (212°F)'],
        answerIndex: 0,
        solution: 'Water freezes at 0°C (32°F), turning from liquid to solid ice! ❄️',
        explanation: 'The freezing point of water is 0°C or 32°F. At this temperature, water molecules slow down and form ice crystals.',
        hintType: 'compass',
        nextClue: 'Where cold winds blow, the answer you shall know!',
        timeLimit: 50,
        points: 150,
        bonusPoints: 75
      },
      {
        id: 'science_electricity_1',
        subject: 'Science',
        difficulty: 'medium',
        category: 'Electricity',
        prompt: 'What is the basic unit of electric current?',
        options: ['Volt', 'Watt', 'Ampere', 'Ohm'],
        answerIndex: 2,
        solution: 'The Ampere (or Amp) is the basic unit of electric current! ⚡',
        explanation: 'Electric current is measured in Amperes, named after André-Marie Ampère. It measures the flow of electric charge.',
        hintType: 'riddle',
        nextClue: 'I flow like water but you cannot see, I power your world, what am I?',
        timeLimit: 50,
        points: 200,
        bonusPoints: 100
      },
      {
        id: 'science_geology_1',
        subject: 'Science',
        difficulty: 'medium',
        category: 'Geology',
        prompt: 'Which type of rock is formed by cooling and solidifying magma?',
        options: ['Sedimentary', 'Metamorphic', 'Igneous', 'Limestone'],
        answerIndex: 2,
        solution: 'Igneous rocks are formed when magma cools and solidifies! 🌋',
        explanation: 'Igneous rocks form from molten rock (magma) that cools and hardens. Examples include granite and basalt.',
        hintType: 'map',
        nextClue: 'Deep beneath the earth, where fire meets stone!',
        timeLimit: 50,
        points: 200,
        bonusPoints: 100
      },
      {
        id: 'science_mixed_1',
        subject: 'Science',
        difficulty: 'hard',
        category: 'Mixed Science',
        prompt: 'What is the chemical formula for water?',
        options: ['CO2', 'H2O', 'NaCl', 'O2'],
        answerIndex: 1,
        solution: 'Water\'s chemical formula is H2O - two hydrogen atoms and one oxygen atom! 💧',
        explanation: 'H2O represents water: H = Hydrogen, O = Oxygen. The subscript 2 means there are two hydrogen atoms.',
        hintType: 'glow',
        nextClue: 'The source of all life, clear and pure!',
        timeLimit: 60,
        points: 250,
        bonusPoints: 125
      }
    ],
    npcs: [
      {
        id: 'crystal_keeper',
        name: 'Professor Gemheart',
        x: 300,
        y: 700,
        dialogue: [
          'Ah, a curious mind enters my domain! These crystals hold the secrets of science.',
          'Each one resonates with different natural phenomena.',
          'Study them well, and they will reveal their knowledge to you!'
        ],
        questGiver: true,
        shopkeeper: true,
        shop: [
          { item: 'magnifying_glass', price: 100, effect: 'reveal_hints' },
          { item: 'time_crystal', price: 200, effect: 'extra_time' }
        ]
      }
    ],
    powerUps: [
      { id: 'knowledge_boost', x: 600, y: 550, effect: 'double_points', duration: 60 },
      { id: 'crystal_lens', x: 1100, y: 500, effect: 'reveal_answer', uses: 1 }
    ],
    secrets: [
      { id: 'crystal_chamber', x: 1400, y: 400, reward: 'rare_gem', amount: 1 }
    ]
  }
];

export const getCurrentLevel = (levelIndex: number): Level | null => {
  return levels[levelIndex] || null;
};

export const getNextLevel = (currentLevelIndex: number): Level | null => {
  return levels[currentLevelIndex + 1] || null;
};

export const getLevelsBySubject = (subject: string): Level[] => {
  return levels.filter(level => 
    level.questions.some(question => question.subject === subject)
  );
};

export const getLevelsByDifficulty = (difficulty: string): Level[] => {
  return levels.filter(level => level.difficulty === difficulty);
};