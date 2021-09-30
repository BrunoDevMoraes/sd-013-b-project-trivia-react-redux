import { TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
};

export default function userInfo(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TOKEN:
    return {
      ...state,
      token: action.token,
    };
  default:
    return state;
  }
}
