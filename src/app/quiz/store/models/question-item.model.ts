export interface QuestionItem {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
  answers: Array<AnswerItem>;
  strikes: number;
  answer_correctly: boolean;
}

export interface AnswerItem {
  text: string;
  correct: boolean;
}
