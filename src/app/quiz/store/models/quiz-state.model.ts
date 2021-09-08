import {QuestionItem} from './question-item.model';

export interface QuizState {
  questionsList: Array<QuestionItem>;
  currentQuestion: QuestionItem;
  error: Error;
}
