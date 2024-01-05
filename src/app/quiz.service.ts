import { Injectable } from '@angular/core';
import { Quiz, Question } from './quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quiz: Quiz;
  private currentQuestionIndex: number = 0;
  private questions: any[] = []; 
  

  constructor() {
    this.quiz = {
      questions: [
        { id: 1, text: 'When does the contract expire?', answer: 'April 2024' },
        { id: 2, text: 'What is the contract value ', answer: '81950' },
        { id: 3, text: 'What is the tick size and tick value? ', answer: '0.01,10' },
        { id: 4, text: 'If an oil refiner wanted to hedge the price risk of crude oil, should they go long or short the  contract?', answer: 'long' },
        { id: 5, text: 'A speculator expects the price of oil to decrease – should they go long or short the contract?', answer: 'short' },
        { id: 6, text: 'If the same speculator went short 5 contracts at the current price of the futures contract, how much initial margin would they pay? ', answer: '31900' },
        { id: 7, text: 'If the price of oil at expiry was $83 per barrel, how much had the speculator made or lost?', answer: '5250 loss' },
        // Add more questions...
      ],
    };
  }

  getCurrentQuestion(): Question {
    return this.quiz.questions[this.currentQuestionIndex];
  }

  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }

  isQuizComplete(): boolean {
    return this.currentQuestionIndex === this.quiz.questions.length;
  }

  getTotalQuestions(): number {
    return this.questions.length;
  }

  moveToPreviousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  initializeQuiz():void {
    this.currentQuestionIndex= 0;
  }

}
