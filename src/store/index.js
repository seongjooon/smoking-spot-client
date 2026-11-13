import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../lib/api';

export const fetchSpotList = createAsyncThunk('spots/list', api.getSpotList);
export const fetchSpotDetail = createAsyncThunk('spots/detail', api.getSpotDetail);
export const fetchComents = createAsyncThunk('coments/list', api.getComents);
export const addComent = createAsyncThunk('coments/add', ({ spotId, ...body }) =>
  api.postComent(spotId, body)
);

export const initialState = {
  spotList: [],
  selectedSpot: null,
  coments: [],
  error: ''
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    clearDetail: state => {
      state.selectedSpot = null;
      state.coments = [];
      state.error = '';
    }
  },
  extraReducers: b => {
    b.addCase(fetchSpotList.fulfilled, (s, a) => {
      s.spotList = a.payload;
    })
      .addCase(fetchSpotDetail.fulfilled, (s, a) => {
        s.selectedSpot = a.payload;
      })
      .addCase(fetchComents.fulfilled, (s, a) => {
        s.coments = a.payload;
      })
      .addCase(addComent.fulfilled, (s, a) => {
        s.coments = a.payload;
      })
      .addMatcher(
        a => a.type.endsWith('/rejected'),
        (s, a) => {
          s.error = a.error?.message || 'Request failed';
        }
      );
  }
});

export const { clearDetail } = slice.actions;
export const reducer = slice.reducer;
export const store = configureStore({ reducer });
