import {AppState} from './models/app-state.model';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const getQuizState = createFeatureSelector<AppState>('spinner');

export const getQuestionsList = createSelector(
  getQuizState,
  (state: AppState) => state.quiz.questionsList
);
