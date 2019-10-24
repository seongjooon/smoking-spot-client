import { initState } from './index';
import { GET_COMENTS } from '../constants/actionTypes';

export const comentReducer = (state = initState.coments, action) => {
  switch (action.type) {
    case GET_COMENTS:
      return action.coments;
    default:
      return state;
  }
};
