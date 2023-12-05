import {SET_WALLET_INFO} from '@/constants/ActionTypes';

const initialState = {
  walletInfo: {}
};

const walletInfo = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_WALLET_INFO: {
      return {
        ...state,
        walletInfo:payload
      };
    }
    default:
      return state;
  }
};

export default walletInfo;
