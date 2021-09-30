const { SET_DISABLED, SET_TIMER, SET_INTERVAL, SET_OVER } = '../actions';

const INITIAL_STATE = {
  timer: 30,
  disabled: false,
  over: false,
};

const DISABLED = SET_DISABLED || 'SET_DISABLED';
const TIMER = SET_TIMER || 'SET_TIMER';
const INTERVAL = SET_INTERVAL || 'SET_INTERVAL';
const OVER = SET_OVER || 'SET_OVER';

export default function cronometer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case DISABLED:
    return {
      ...state,
      disabled: action.boolean,
    };
  case TIMER:
    return {
      ...state,
      timer: action.timer,
    };
  case INTERVAL:
    return {
      ...state,
      interval: action.interval,
    };
  case OVER:
    return {
      ...state,
      over: action.boolean,
    };
  default:
    return state;
  }
}
