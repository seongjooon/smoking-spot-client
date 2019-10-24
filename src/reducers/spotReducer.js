import { initState } from './index';
import { GET_SPOT_LIST, GET_SPOT_DETAIL } from '../constants/actionTypes';

export const spotReducer = (state = initState.spotList, action) => {
  switch (action.type) {
    case GET_SPOT_LIST:
      return action.spotList;
    case GET_SPOT_DETAIL:
      return action.spot;
    default:
      return state;
  }
};
