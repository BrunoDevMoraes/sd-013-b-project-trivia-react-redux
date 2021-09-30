export const LOGIN = 'LOGIN';
export const TOKEN = 'TOKEN';
export const SAVE_NAME = 'SAVE_NAME';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const CLEAR_SCORE = 'CLEAR_SCORE';
export const SET_DISABLED = 'SET_DISABLED'; /// MEXEU AQUI
export const SET_TIMER = 'SET_TIMER'; /// MEXEU AQUI
export const SET_INTERVAL = 'SET_INTERVAL'; /// MEXEU AQUI
export const SET_OVER = 'SET_OVER'; /// MEXEU AQUI

export const setDisabled = (boolean) => ({ type: SET_DISABLED, boolean }); /// MEXEU AQUI
export const setTimer = (timer) => ({ type: SET_TIMER, timer }); /// MEXEU AQUI
export const setInt = (interval) => ({ type: SET_INTERVAL, interval }); /// MEXEU AQUI
export const setOver = (boolean) => ({ type: SET_OVER, boolean }); /// MEXEU AQUI

const saveQuestions = (payload) => ({
  type: SAVE_QUESTIONS,
  payload,
});

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

const saveToken = (token) => ({
  type: TOKEN,
  token,
});

export const getToken = () => async (dispatch) => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const objToken = await response.json();
  dispatch(saveToken(objToken));
  localStorage.setItem('token', objToken.token);
  const response2 = await fetch(`https://opentdb.com/api.php?amount=5&encode=base64&token=${objToken.token}`);
  const objQuestions = await response2.json();
  dispatch(saveQuestions(objQuestions));
};

export const saveName = (name) => ({
  type: SAVE_NAME,
  player: {
    name,
  },
});

export const updateScore = (points) => ({
  type: UPDATE_SCORE,
  points,
});

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const clearScore = () => ({
  type: CLEAR_SCORE,
});
