import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {GetQuestionAction} from '../../store/quiz.actions';
import {Observable, Subscription} from 'rxjs';
import {QuestionItem} from '../../store/models/question-item.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/models/app-state.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  // store items
  questionsListSub: Subscription;
  questionsList$: Observable<Array<QuestionItem>>;

  // emits from the start button
  @Output() startQuiz: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.questionsList$ = this.store.select(store => store.quiz.questionsList);
    this.createQuestionsList();
  }

  /**
   * calling API until there are 10 unique questions in the questions list
   */
  createQuestionsList(): void {
    this.questionsListSub = this.questionsList$.subscribe(
      list => {
        if (list.length < 10) {
          this.store.dispatch(new GetQuestionAction());
        }
      }
    );
  }

  start(): void {
    this.startQuiz.emit(true);
  }

  ngOnDestroy(): void {
    this.questionsListSub.unsubscribe();
  }

}
