import {Action} from '@ngrx/store';
import {QuestionItem} from './models/question-item.model';

export enum QuizActionTypes {
  GET_QUESTION = '[QUIZ] Get Question',
  GET_QUESTION_SUCCESS = '[QUIZ] Get Question Success',
  GET_QUESTION_FAILURE = '[QUIZ] Get Question Failure',
  SET_CURRENT_QUESTION = '[QUIZ] Set Current Question',
  ADD_QUESTION_TO_LIST = '[QUIZ] Add Question To List',
  CHECK_UNIQUE_QUESTION = '[QUIZ Check Unique Question',
  SET_STRIKES = '[QUIZ] Set Strikes',
  SET_QUESTION_STATUS = '[QUIZ] Set Question Status',
  UPDATE_QUESTIONS_LIST = '[QUIZ] Update Questions List'
}

export class GetQuestionAction implements Action {
  readonly type = QuizActionTypes.GET_QUESTION;
}

export class GetQuestionSuccessAction implements Action {
  readonly type = QuizActionTypes.GET_QUESTION_SUCCESS;

  constructor(public payload: QuestionItem) {
  }
}

export class GetQuestionFailureAction implements Action {
  readonly type = QuizActionTypes.GET_QUESTION_FAILURE;

  constructor(public payload: Error) {
  }
}

export class CheckUniqueQuestion {
  readonly type = QuizActionTypes.CHECK_UNIQUE_QUESTION;

  constructor(public payload: QuestionItem) {
  }
}

export class AddQuestionToList {
  readonly type = QuizActionTypes.ADD_QUESTION_TO_LIST;

  constructor(public payload: QuestionItem) {
  }

}

export class SetCurrentQuestion {
  readonly type = QuizActionTypes.SET_CURRENT_QUESTION;

  constructor(public payload: QuestionItem) {
  }
}

export class SetStrikes {
  readonly type = QuizActionTypes.SET_STRIKES;

  constructor(public payload: number) {
  }
}

export class SetQuestionStatus {
  readonly type = QuizActionTypes.SET_QUESTION_STATUS;

  constructor(public payload: { question: QuestionItem, index: number }) {
  }
}

export class UpdateQuestionsList {
  readonly type = QuizActionTypes.UPDATE_QUESTIONS_LIST;

  constructor(public payload: Array<QuestionItem>) {
  }
}

export type QuizActions = GetQuestionAction
  | GetQuestionSuccessAction
  | GetQuestionFailureAction
  | SetCurrentQuestion
  | AddQuestionToList
  | SetStrikes
  | SetQuestionStatus
  | UpdateQuestionsList
