import { SAVE_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: [{
    category: '',
    type: '',
    difficulty: '',
    question: '',
    correct_answer: '',
    incorrect_answers: [],
  }],
};

export default function game(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return {
      ...state,
      questions: action.payload.results,
    };
  default:
    return state;
  }
}
