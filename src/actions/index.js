import {
  GET_SPOT_LIST,
  GET_SPOT_DETAIL,
  GET_COMENTS,
  STORE_MESSAGE
} from '../constants/actionTypes';

export const spotList = spotList => ({
  type: GET_SPOT_LIST,
  spotList
});

export const spotDetail = spot => ({
  type: GET_SPOT_DETAIL,
  spot
});

export const coments = coments => ({
  type: GET_COMENTS,
  coments
});

export const submitMessage = msg => ({
  type: STORE_MESSAGE,
  msg
});
