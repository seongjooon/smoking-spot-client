import { initState } from './index';
import { STORE_MESSAGE } from '../constants/actionTypes';

export const submitMessageReducer = (
  state = initState.submitMessage,
  action
) => {
  switch (action.type) {
    case STORE_MESSAGE:
      return action.msg;
    default:
      return state;
  }
};
