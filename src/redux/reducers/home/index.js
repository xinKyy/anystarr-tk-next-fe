import { combineReducers } from 'redux';
import counter from './counter';
import walletInfo from './walletInfo';
import userInfo from './userInfo';

export default combineReducers({
  counter,
  walletInfo,
  userInfo
});
