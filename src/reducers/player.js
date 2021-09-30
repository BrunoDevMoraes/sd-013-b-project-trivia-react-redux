import { SAVE_NAME, UPDATE_SCORE, SAVE_EMAIL, CLEAR_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  score: 0,
  assertions: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  const stateKey = JSON.parse(localStorage.getItem('state'));
  switch (action.type) {
  case SAVE_NAME:
    return {
      ...state,
      name: action.player.name,
    };
  case UPDATE_SCORE:
    stateKey.player.score = state.score + action.points;
    localStorage.setItem('state', JSON.stringify(stateKey));
    return {
      ...state,
      score: state.score + action.points,
      assertions: state.assertions + 1,
    };
  case SAVE_EMAIL:
    return {
      ...state,
      email: action.email,
    };
  case CLEAR_SCORE:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  default:
    return state;
  }
}

export default player;
