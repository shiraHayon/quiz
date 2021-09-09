import {Component, Input, OnInit} from '@angular/core';
import {QuestionItem} from '../../store/models/question-item.model';
import {Observable} from 'rxjs';
import {AppState} from '../../store/models/app-state.model';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  questionsList$: Observable<Array<QuestionItem>>;
  correctAnswers$: Observable<Array<QuestionItem>>;
  wrongAnswers$: Observable<Array<QuestionItem>>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.questionsList$ = this.store.select(store => store.quiz.questionsList);
    this.correctAnswers$ = this.filterAnswers(true);
    this.wrongAnswers$ = this.filterAnswers(false);
  }

  filterAnswers(correctAnswer): Observable<Array<QuestionItem>> {
    return this.questionsList$.pipe(map(list => list.filter(question => question.answer_correctly === correctAnswer)));
  }

}
