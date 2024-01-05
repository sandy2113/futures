import { Component, OnInit,  ViewChild  } from '@angular/core';
import { QuizService } from '../quiz.service';
import { DownloadService } from '../download.service';
import { quizData } from './data';

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ChartComponent,
  ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  qdata= quizData;
  currentQuestion: any;
  userResponses: { questionId: number, resultMessage: string }[] = [];

  
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions:ChartOptions;

  
  constructor(private quizService: QuizService,private downloadService: DownloadService) {
    this.showchart();
    const correctAnswers = this.qdata.correctAnswers;
    const calculatedPercentage = (correctAnswers * 100 / 7).toFixed(2); // Round to 2 decimal places
const customDisplayValue = 42;
    this.chartOptions = {
      series: [parseFloat(calculatedPercentage)],
      chart: {
        height: 200,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "60%"
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          gradientToColors: ["#87D4F9"],
          stops: [0, 100]
        }
      },
      labels: ['Correct']
    };
  }

  showchart(){
    const correctAnswers = this.qdata.correctAnswers;
    const calculatedPercentage = (correctAnswers * 100 / 7).toFixed(0); // Round to 2 decimal places
const customDisplayValue = 42;
    this.chartOptions = {
      series: [parseFloat(calculatedPercentage)],
      chart: {
        height: 250,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          hollow: {
            
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          gradientToColors: ["#87D4F9"],
          stops: [0, 100]
        }
      },
      labels: ["Correct"]
    };
  }
 

  isImageEnlarged = false;
  isBackgroundBlurred = false;

  enlargeImage() {
    this.isImageEnlarged = true;
    this.isBackgroundBlurred = true;
  }

  closeEnlargedView() {
    this.isImageEnlarged = false;
    this.isBackgroundBlurred = false;
  }

  ngOnInit(): void {
    this.loadQuestion();
  }

  toggleButton(answer: string): void {
    this.qdata.userAnswer = this.qdata.userAnswer === answer ? '' : answer;
  }
  
  setUserAnswer4(answer: string) {
    this.qdata.userAnswers[3] = answer;
  }

  setUserAnswer5(answer: string) {
    this.qdata.userAnswers[4] = answer;
  }

  loadQuestion() {
    this.currentQuestion = this.quizService.getCurrentQuestion();

    const storedResponse = this.userResponses.find(response => response.questionId === this.currentQuestion.id);

    if (storedResponse) {
      this.qdata.resultMessage = storedResponse.resultMessage;
    } else {
      this.qdata.resultMessage = '';
    }
    
  }

  nextQuestion() {
    if (this.currentQuestion.id < 7) {
      this.quizService.moveToNextQuestion();
      this.loadQuestion();
      this.displayStoredResultMessage();
    }
  }
  
  previousQuestion() {
    if (this.currentQuestion.id > 1) {
      this.quizService.moveToPreviousQuestion();
      this.loadQuestion();
      this.displayStoredResultMessage();
    }
  }

  checkAnswer() {

    if(this.currentQuestion.id === 1){
      this.qdata.userAnswer=this.qdata.userAnswers[0];
    }else if(this.currentQuestion.id === 2){
      this.qdata.userAnswer=this.qdata.userAnswers[1];
    }else if(this.currentQuestion.id === 3){
      this.qdata.userAnswer=this.qdata.userAnswers[2];
    }else if(this.currentQuestion.id === 4){
      this.qdata.userAnswer=this.qdata.userAnswers[3];
    }else if(this.currentQuestion.id === 5){
      this.qdata.userAnswer=this.qdata.userAnswers[4];
    }else if(this.currentQuestion.id === 6){
      this.qdata.userAnswer=this.qdata.userAnswers[5];
    }else if(this.currentQuestion.id === 7){
      this.qdata.userAnswer=this.qdata.userAnswers[6];
    }else{
      this.qdata.userAnswer= '';
    }

    console.log("dsfdcds")
    if (!this.qdata.userAnswer || this.qdata.userAnswer.trim() === '') {
      this.qdata.resultMessage = 'Answer cannot be empty!';
      return;
    }
  
  

    let formattedUserAnswer = this.qdata.userAnswer;
    let cleanUserAnswer = formattedUserAnswer.replace(/,/g, '').toLowerCase();
    if (this.currentQuestion.id === 1) {
      const selectedDate = new Date(this.qdata.userAnswer);
      const month = selectedDate.toLocaleString('en-US', { month: 'long' });
      const year = selectedDate.getFullYear();
      cleanUserAnswer = `${month} ${year}`;
    }
    const correctAnswer = this.quizService.getCurrentQuestion().answer.toLowerCase();
    const isCorrectAnswer = cleanUserAnswer.includes("5250") && correctAnswer.includes(this.qdata.profitLoss.toLowerCase());
  if (this.currentQuestion.id === 7) {
    this.handleQuestion7Result(isCorrectAnswer);
  } else if (this.currentQuestion.id === 3) {
    this.handleQuestion3Result();
  } else {
    this.handleOtherQuestionResult(cleanUserAnswer, correctAnswer);
  }
  this.userResponses.push({ questionId: this.currentQuestion.id, resultMessage: this.qdata.resultMessage });
  console.log(this.userResponses)
  this.showchart();
  }


  handleQuestion7Result(isCorrectAnswer:any) {
    if (isCorrectAnswer) {
      this.handleCorrectAnswer();
    } else {
      this.handleIncorrectAnswer();
    }
  }

  
  handleQuestion3Result() {
    const correctAnswerBox1 = '0.01';
    const correctAnswerBox2 = '10';
    const isCorrectAnswerr =this.qdata.userAnswers[2] === correctAnswerBox1 && this.qdata.ans32 === correctAnswerBox2;
    if (isCorrectAnswerr) {
      this.handleCorrectAnswer();
    } else {
      this.handleIncorrectAnswer();
    }
  }

  
  handleOtherQuestionResult(cleanUserAnswer:any, correctAnswer:any) {
    if (cleanUserAnswer.toLowerCase() === correctAnswer) {
      this.handleCorrectAnswer();
    } else {
      this.handleIncorrectAnswer();
    }
  }


  handleCorrectAnswer() {
    const questionId = this.currentQuestion.id;
    this.userResponses = this.userResponses.filter(response => response.questionId !== questionId);

    this.qdata.resultMessage = 'Correct Answer...!!';
    this.qdata.correctAnswers++;
    this.qdata.checkanswer[questionId-1] = 1;
    console.log(this.qdata.checkanswer)
    this.quizService.moveToNextQuestion();
  
    if (this.quizService.isQuizComplete()) {
      this.qdata.quizComplete = true;
      this.qdata.resultMessage = 'Congratulations! Quiz completed successfully.';
    } else {
      setTimeout(() => {
        this.loadQuestion();
        this.qdata.resultMessage = '';
      }, 1000);
    }
  }

  
  handleIncorrectAnswer() {
    const questionId = this.currentQuestion.id;
    this.userResponses = this.userResponses.filter(response => response.questionId !== questionId);
    this.qdata.resultMessage = 'Incorrect! Try again.';
  }


  endQuiz() {

    this.quizService.moveToNextQuestion();
  
    if (this.quizService.isQuizComplete()) {
      this.qdata.quizComplete = true;
      this.qdata.resultMessage = 'Congratulations! Quiz completed successfully.';
    } 

  }

  startAgain(){

    this.qdata.quizComplete = false;
    this.quizService.initializeQuiz();
    this.loadQuestion();
    this.qdata.correctAnswers= 0;
    this.qdata.resultMessage='';
    this.qdata.profitLoss = "";
    this.qdata.ans32 = "";
    this.qdata.userAnswers = [];
    this.qdata.checkanswer= [0, 0, 0, 0, 0, 0, 0];
    this.userResponses = [];

  }

  // review(){
  //   this.qdata.isreview= true;
  //   this.qdata.quizComplete = false;
  //   this.quizService.initializeQuiz();
  //   this.loadQuestion();
  //   console.log(this.qdata.resultMessage)
  // }

  isRedText() {
    const firstLetter = this.qdata.resultMessage.charAt(0).toUpperCase();
    return firstLetter === 'I' || firstLetter === 'A';
  }

  displayStoredResultMessage() {
    const storedResponse = this.userResponses.find(response => response.questionId === this.currentQuestion.id);
  
    if (storedResponse) {
      this.qdata.resultMessage = storedResponse.resultMessage;
    } else {
      this.qdata.resultMessage = '';
    }
  }

  downloadFile(): void { 

    this.downloadService.downloadPdf();

  }
}
