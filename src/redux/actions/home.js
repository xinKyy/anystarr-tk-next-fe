import {
  INCREMENT,
  DECREMENT,
  RESET,
  ADD_TO_NUMBER, SET_WALLET_INFO, SET_USER_INFO
} from '../../constants/ActionTypes';

export function increment() {
  return {
    type: INCREMENT
  };
}

export function decrement() {
  return {
    type: DECREMENT
  };
}

export function reset() {
  return {
    type: RESET
  };
}

export function addToNumber(payload) {
  return  {
    type: ADD_TO_NUMBER,
    payload
  };
}

export function setWalletInfo(payload) {
  return  {
    type: SET_WALLET_INFO,
    payload
  };
}

export function setUserInfo(payload) {
  return  {
    type: SET_USER_INFO,
    payload
  };
}
