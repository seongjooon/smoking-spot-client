import { reducer, initialState, clearDetail, fetchSpotList, addComent } from '../store';

describe('reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, { type: 'x' })).toEqual(initialState);
  });

  it('keeps spot list and selected spot separate', () => {
    let s = reducer(undefined, fetchSpotList.fulfilled([{ _id: '1' }]));
    s = reducer(s, { type: 'spots/detail/fulfilled', payload: { _id: '2' } });
    expect(s.spotList).toEqual([{ _id: '1' }]);
    expect(s.selectedSpot).toEqual({ _id: '2' });
  });

  it('replaces comments after adding one and clears on clearDetail', () => {
    let s = reducer(undefined, addComent.fulfilled([{ _id: 'c' }], 'id', {}));
    expect(s.coments).toHaveLength(1);
    s = reducer(s, clearDetail());
    expect(s.coments).toEqual([]);
    expect(s.selectedSpot).toBeNull();
  });
});
