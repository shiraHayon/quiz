import {QuizActions, QuizActionTypes} from './quiz.actions';
import {QuizState} from './models/quiz-state.model';

const initialState: QuizState =
  {
    questionsList: [],
    currentQuestion: {
      category: '',
      type: '',
      difficulty: '',
      question: '',
      correct_answer: '',
      incorrect_answers: [],
      answers: [],
      strikes: 0,
      answer_correctly: false,
    },
    error: null,
    currentIndex: null
  };

export function QuizReducer(state: QuizState = initialState, action: QuizActions): any {
  switch (action.type) {
    case QuizActionTypes.GET_QUESTION_SUCCESS:
      return {
        ...state,
        question: action.payload
      };

    case QuizActionTypes.GET_QUESTION_FAILURE:
      return {
        ...state,
        error: action.payload
      };

    case QuizActionTypes.ADD_QUESTION_TO_LIST:
      return {
        ...state,
        questionsList: [...state.questionsList, action.payload]
      };

    case QuizActionTypes.SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: {
          question: state.questionsList[action.payload],
          strikes: 0
        }
      };

    case QuizActionTypes.SET_STRIKES:
      // The user should have 3 strikes to get the answer wrong.
      return {
        ...state,
        currentQuestion: {
          ...state.currentQuestion,
          strikes: action.payload,
        }
      };

    case QuizActionTypes.UPDATE_QUESTIONS_LIST:
      return {
        ...state,
        questionsList: action.payload
      };

    case QuizActionTypes.UPDATE_CURRENT_INDEX:
      return {
        ...state,
        currentIndex: action.payload
      };


    default:
      return state;

  }

}
