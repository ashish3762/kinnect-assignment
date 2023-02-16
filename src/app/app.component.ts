import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'kinnect-assignment';

  public firstRandomNumber = 0;
  public secondRandomNumber = 0;
  public calculatedTotal = 0;
  public total = null;
  public max = 9;
  public min = 0;
  public startTime = 0;
  public endTime = 0;
  public averageTimeForSolution = 0;

  public showCorrectAnswerMessage = false;
  public submitButtonClicked = false;

  public correctAnswersTimeTaken: number[] = [];

  constructor() { }

  ngOnInit() {
    this.generateRandomNumbers();
  }

  generateRandomNumbers() {
    this.startTime = Date.now();
    this.firstRandomNumber = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    this.secondRandomNumber = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    this.calculatedTotal = this.firstRandomNumber + this.secondRandomNumber;
  }

  checkTotalValue() {
    this.submitButtonClicked = true;
    if (this.total != null) {
      if (this.calculatedTotal === this.total) {
        this.timeElapsed();
        this.showCorrectAnswerMessage = true;
        setTimeout(() => {
          this.total = null;
          this.submitButtonClicked = false;
          this.generateRandomNumbers();
        }, 1000);
      } else {
        this.showCorrectAnswerMessage = false;
      }
    }
  }

  timeElapsed() {
    this.endTime = Date.now();
    const timeDiff = this.endTime - this.startTime;

    const seconds = Math.round(timeDiff / 1000);
    console.log(seconds + " seconds");

    this.correctAnswersTimeTaken.push(seconds);
    console.log('Correct answer arr: ', this.correctAnswersTimeTaken)

    const sum = this.correctAnswersTimeTaken.reduce((a, b) => a + b, 0);
    this.averageTimeForSolution = (sum / this.correctAnswersTimeTaken.length) || 0;
    console.log('average time: ', this.averageTimeForSolution)
  }
}
