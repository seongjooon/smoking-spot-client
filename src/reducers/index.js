import { combineReducers } from 'redux';
import { spotReducer } from './spotReducer';
import { comentReducer } from './comentReducer';
import { submitMessageReducer } from './submitMessageReducer';

export const initState = {
  spotList: [],
  coments: [],
  submitMessage: ''
};

export default combineReducers({
  spotReducer,
  comentReducer,
  submitMessageReducer
});
