import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {map, mergeMap, catchError} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AddQuestionToList, CheckUniqueQuestion, GetQuestionFailureAction, QuizActionTypes, UpdateQuestionsList} from './quiz.actions';
import {QuizService} from '../services/quiz.service';
import {AppState} from './models/app-state.model';
import {decodeBase64} from '../../utility/utility';

@Injectable()
export class QuizEffects {

  loadQuestion$ = createEffect(() => this.actions$.pipe(
    ofType(QuizActionTypes.GET_QUESTION),
    mergeMap(() => this.quizService.getSingleQuestion()
      .pipe(
        map(data => {
          const question = data.results[0];
          const answers = [];

          for (const prop in question) {
            if (prop === 'incorrect_answers') {
              for (const ans of question.incorrect_answers) {
                answers.push({
                  text: decodeBase64(ans),
                  correct: false
                });
              }
            } else if (prop === 'correct_answer') {
              answers.push({
                text: decodeBase64(question.correct_answer),
                correct: true
              });

            } else if (typeof question[prop] === 'string') {
              question[prop] = decodeBase64(question[prop]);
            }
          }

          question.answers = answers.sort(() => Math.random() - 0.5); // shuffling the array
          question.strikes = 0;
          question.answer_correctly = false;

          return new CheckUniqueQuestion(question);
        }),
        catchError(err => of(new GetQuestionFailureAction(err)))
      ))
    )
  );

  addQuestionToList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActionTypes.CHECK_UNIQUE_QUESTION),
      concatLatestFrom(() => this.store.select(store => store.quiz.questionsList)),
      mergeMap(([question, list]) => {
        // Each question should not be shown more than once.
        const questionFound = list.find(q => q.question === question['payload']['question']);
        if (!questionFound) {
          return of(new AddQuestionToList(question['payload']));
        } else {
          return of(null);
        }
      }),
    )
  );

  updateQuestionStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActionTypes.SET_QUESTION_STATUS),
      concatLatestFrom(() => this.store.select(store => store.quiz.questionsList)),
      mergeMap(([params, list]) => {
        const questionIndex = params['payload']['index'];
        const status = params['payload']['answer_correctly'];
        const clonedList = [...list];
        clonedList[questionIndex] = {...clonedList[questionIndex], answer_correctly: status};
        return of(new UpdateQuestionsList(clonedList));
      }),
    )
  );

  constructor(
    private actions$: Actions,
    private quizService: QuizService,
    private store: Store<AppState>
  ) {
  }
}
