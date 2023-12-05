import { combineReducers } from 'redux';
import counter from './counter';
import walletInfo from './walletInfo';

export default combineReducers({
  counter,
  walletInfo
});
