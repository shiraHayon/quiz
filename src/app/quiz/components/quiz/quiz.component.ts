import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/models/app-state.model';
import {Observable, Subscription} from 'rxjs';
import {QuestionItem} from '../../store/models/question-item.model';
import {GetQuestionAction, SetCurrentQuestion, SetQuestionStatus, SetStrikes} from '../../store/quiz.actions';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  // store items
  questionsListSub: Subscription;
  questionsList$: Observable<Array<QuestionItem>>;
  questionsList: Array<QuestionItem>;

  strikesSub: Subscription;
  strikes$: Observable<number>;
  strikes: number = 0;

  currentQuestion: QuestionItem;

  // interval settings
  interval: number;
  timeLeft: number = 10; // in seconds for showing on the screen

  // carousel settings
  page: number = 0;
  autoplayInterval: number = 0;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.questionsList$ = this.store.select(store => store.quiz.questionsList);
    this.strikes$ = this.store.select(store => store.quiz.currentQuestion.strikes);

    this.createQuestionsList();
    this.getStrikes();
  }

  /**
   * calling API until there are 10 unique questions in the questions list
   */
  createQuestionsList(): void {
    this.questionsListSub = this.questionsList$.subscribe(
      list => {
        if (list.length < 10) {
          this.store.dispatch(new GetQuestionAction());
        } else {
          this.questionsList = list;
          this.currentQuestion = this.questionsList[0];
          this.setCurrentQuestion(this.currentQuestion);
        }
      }
    );
  }

  /**
   * update store with the current question
   * @param question
   */
  setCurrentQuestion(question: QuestionItem): void {
    this.resetTimer();
    this.startTimer();
    this.store.dispatch(new SetCurrentQuestion(question));
  }

  /**
   * check for correct answer and update strikes
   * @param selectAnswer
   */
  checkAnswer(selectAnswer): void {
    if (selectAnswer.correct) {
      this.updateQuestionStatus(true, this.currentQuestion);
      this.getNextQuestion();
    } else {
      this.setStrike(this.strikes + 1);
      if (this.strikes === 3) {
        this.getNextQuestion();
      }
    }
  }

  /**
   * settings new status on answerCorrectly and update the questions list
   * @param status
   * @param question
   */
  updateQuestionStatus(status: boolean, question: QuestionItem): void {
    const ques = Object.assign({}, question);
    ques.answerCorrectly = status;
    this.store.dispatch(new SetQuestionStatus({question: ques, index: this.page}));
  }

  /**
   * subscription for strikes
   */
  getStrikes(): void {
    this.strikesSub = this.strikes$.subscribe(
      s => this.strikes = s);
  }

  /**
   * update strikes for current question
   * @param strikes - number of the new strikes
   */
  setStrike(strikes: number): void {
    this.store.dispatch(new SetStrikes(strikes));
  }

  /**
   * change question and update current question on the store
   */
  getNextQuestion(): void {
    if (this.page < 10) {
      this.page = this.page + 1;
      this.currentQuestion = this.questionsList[this.page];
      this.setCurrentQuestion(this.currentQuestion);
    }else{
      this.resetTimer();
    }

  }

  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 10;
        this.getNextQuestion();
      }
    }, 1000);
  }

  resetTimer(): void {
    this.timeLeft = 10;
    clearInterval(this.interval);
  }

  onPage(currentPage): void {
    console.log(currentPage);
  }

  ngOnDestroy(): void {
    this.questionsListSub.unsubscribe();
    this.strikesSub.unsubscribe();
  }


}
