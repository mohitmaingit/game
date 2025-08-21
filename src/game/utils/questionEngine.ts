import { Question } from '../../types';
import { levels } from '../config/levels';

class QuestionEngine {
  private currentQuestion: Question | null = null;
  private attempts: number = 3;

  setCurrentQuestion(questionId: string): Question | null {
    // Find question across all levels
    for (const level of levels) {
      const question = level.questions.find(q => q.id === questionId);
      if (question) {
        this.currentQuestion = question;
        this.attempts = 3;
        return question;
      }
    }
    return null;
  }

  getCurrentQuestion(): Question | null {
    return this.currentQuestion;
  }

  submitAnswer(selectedIndex: number): {
    correct: boolean;
    attempts: number;
    shouldShowSolution: boolean;
    solution?: string;
  } {
    if (!this.currentQuestion) {
      return { correct: false, attempts: this.attempts, shouldShowSolution: false };
    }

    const isCorrect = selectedIndex === this.currentQuestion.answerIndex;
    
    if (!isCorrect) {
      this.attempts--;
    }

    const shouldShowSolution = !isCorrect && this.attempts === 0;

    return {
      correct: isCorrect,
      attempts: this.attempts,
      shouldShowSolution,
      solution: shouldShowSolution ? this.currentQuestion.solution : undefined
    };
  }

  getRemainingAttempts(): number {
    return this.attempts;
  }

  resetAttempts(): void {
    this.attempts = 3;
  }

  clearCurrentQuestion(): void {
    this.currentQuestion = null;
    this.attempts = 3;
  }

  getHintForCurrentQuestion(): string | null {
    return this.currentQuestion?.nextClue || null;
  }
}

export const questionEngine = new QuestionEngine();