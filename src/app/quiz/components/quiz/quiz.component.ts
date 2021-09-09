import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from '../../store/models/app-state.model';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  start: boolean = false;
  currentQuestionIndex$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.currentQuestionIndex$ = this.store.select(store => store.quiz.currentIndex)
  }

  ngOnInit(): void {
  }


  startQuiz(start): void {
    this.start = start;
  }

  ngOnDestroy(): void {
  }

}
