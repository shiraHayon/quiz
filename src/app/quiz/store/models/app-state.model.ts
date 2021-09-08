import {QuizState} from './quiz-state.model';

export interface AppState {
  readonly quiz: QuizState;
}
