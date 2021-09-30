import React from 'react';
import store from '../store';
import { setTimer, setOver, setInt, setDisabled } from '../actions';

function cronometerReducer() {
  const cronometerStore = store.getState().cronometer;
  return cronometerStore;
}

export function resetTimer() {
  const { interval } = cronometerReducer();
  clearInterval(interval);
  const FULL_TIMER = 30;
  store.dispatch(setTimer(FULL_TIMER));
  const trueBool = true;
  store.dispatch(setOver(trueBool));
}

export function countdownTimer() {
  const oneSecond = 1000;
  const interval = setInterval(() => {
    const { timer } = cronometerReducer();
    const newTimer = timer - 1;
    store.dispatch(setTimer(newTimer));
  }, oneSecond);
  store.dispatch(setInt(interval));
}

export function timeIsOver(disabled) {
  if (disabled === false) {
    const trueBool = true;
    store.dispatch(setDisabled(trueBool));
  }
  return (
    <h2>Tempo Esgotado</h2>
  );
}

export function timerFunction() {
  const FULL_TIME = 30;
  const falseBool = false;
  store.dispatch(setOver(falseBool));
  store.dispatch(setTimer(FULL_TIME));
  store.dispatch(setDisabled(falseBool));
}

export function renderTimer(answered) {
  const { timer, interval } = cronometerReducer();
  if (answered) {
    clearInterval(interval);
    return (
      <h2>{timer}</h2>
    );
  }
  return (
    <h2>{timer}</h2>
  );
}
