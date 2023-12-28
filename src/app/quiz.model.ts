export interface Quiz {
    questions: Question[];
  }
  
  export interface Question {
    id: number;
    text: string;
    answer: string;
  }