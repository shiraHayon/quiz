import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/models/app-state.model';
import {Observable, Subscription} from 'rxjs';
import {QuestionItem} from '../../store/models/question-item.model';
import {SetCurrentQuestion, SetQuestionStatus, SetStrikes, UpdateCurrentIndex} from '../../store/quiz.actions';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
  providers: [MessageService]
})
export class QuestionnaireComponent implements OnInit, OnDestroy {
  // store items
  questionsList$: Observable<Array<QuestionItem>>;

  strikesSub: Subscription;
  strikes$: Observable<number>;
  strikes: number = 0;

  // interval settings
  interval: number;
  timeLeft: number = 20; // in seconds for showing on the screen

  // carousel settings
  page: number = 0;
  autoplayInterval: number = 0;

  constructor(private store: Store<AppState>,
              private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.questionsList$ = this.store.select(store => store.quiz.questionsList);
    this.strikes$ = this.store.select(store => store.quiz.currentQuestion.strikes);
    this.setCurrentQuestion();
    this.getStrikes();
  }

  /**
   * update store with the current question
   * @param question
   */
  setCurrentQuestion(): void {
    this.resetTimer();
    this.startTimer();
    this.store.dispatch(new SetCurrentQuestion(this.page));
  }

  /**
   * check for correct answer and update strikes
   * @param selectAnswer
   */
  checkAnswer(selectAnswer): void {
    if (selectAnswer.correct) {
      this.messageService.add({key: 'res-toaster', severity: 'success', summary: 'Correct!'});

      this.updateQuestionStatus(true);
      this.getNextQuestion();
    } else {

      this.setStrike(this.strikes + 1);

      if (this.strikes === 3) {
        this.getNextQuestion();
      } else {
        this.messageService.add({key: 'res-toaster', severity: 'error', summary: 'Wrong Answer', detail: 'Try Again'});

      }
    }
  }

  /**
   * settings new status on answerCorrectly and update the questions list
   * @param status
   */
  updateQuestionStatus(status: boolean): void {
    this.store.dispatch(new SetQuestionStatus({answer_correctly: status, index: this.page}));
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
    this.page = this.page + 1;
    this.store.dispatch(new UpdateCurrentIndex(this.page));
    if (this.page < 10) {
      this.setCurrentQuestion();
    } else {
      this.resetTimer();
    }

  }

  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 20;
        this.getNextQuestion();
      }
    }, 1000);
  }

  resetTimer(): void {
    this.timeLeft = 20;
    clearInterval(this.interval);
  }

  onPage(currentPage): void {
    console.log(currentPage);
  }

  ngOnDestroy(): void {
    this.strikesSub.unsubscribe();
  }


}
