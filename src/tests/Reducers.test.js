import { initState } from '../reducers/index';

import { spotReducer } from '../reducers/spotReducer';
import { comentReducer } from '../reducers/comentReducer';
import { submitMessageReducer } from '../reducers/submitMessageReducer';

import { spotList } from '../tests/Map.test';
import {
  GET_SPOT_LIST,
  GET_SPOT_DETAIL,
  GET_COMENTS,
  STORE_MESSAGE
} from '../constants/actionTypes';

describe('reducers', () => {
  it('should return init value', () => {
    expect(initState).toHaveProperty('spotList');
    expect(initState).toHaveProperty('coments');
    expect(initState.submitMessage).toEqual('');
    expect(initState.spotList).toEqual([]);
    expect(spotReducer(undefined, {})).toEqual(initState.spotList);
    expect(comentReducer(undefined, {})).toEqual(initState.coments);
    expect(submitMessageReducer(undefined, {})).toEqual(
      initState.submitMessage
    );
  });
  describe('data of action should return equal value', () => {
    const coments = ['hahaha', 'smile', 'kiki'];
    it('in spotReducer', () => {
      expect(
        spotReducer(initState.spotList, {
          type: GET_SPOT_LIST,
          spotList
        })
      ).toEqual(spotList);
      expect(
        spotReducer(spotList, {
          type: GET_SPOT_DETAIL,
          spot: 'seoul'
        })
      ).toEqual('seoul');
    });

    it('in comentReducer', () => {
      expect(
        comentReducer(initState.coments, {
          type: GET_COMENTS,
          coments
        })
      ).toEqual([...coments]);
      expect(
        comentReducer([...coments], {
          type: GET_COMENTS,
          coments: [...coments, 'hello', 'hi']
        })
      ).toEqual([...coments, 'hello', 'hi']);
    });

    it('in submitMessageReducer', () => {
      expect(
        submitMessageReducer(initState.submitMessage, {
          type: STORE_MESSAGE,
          msg: 'Success!!'
        })
      ).toEqual('Success!!');
      expect(
        submitMessageReducer(initState.submitMessage, {
          type: STORE_MESSAGE,
          msg: 'Fail..'
        })
      ).toEqual('Fail..');
    });
  });
});
