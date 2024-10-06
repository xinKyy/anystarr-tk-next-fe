import {SET_USER_INFO, SET_WALLET_INFO} from '@/constants/ActionTypes';

const initialState = {
  userInfo: {}
};

const userInfo = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_INFO: {
      return {
        ...state,
        userInfo:payload
      };
    }
    default:
      return state;
  }
};

export default userInfo;
