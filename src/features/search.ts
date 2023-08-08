import { createSlice } from '@reduxjs/toolkit';

const initialState = { term: "" };

export const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    search: (state, action) => {
      state.term = action.payload.term;
    }
  }
});

// Can use search action to set search to something
export const { search } = searchSlice.actions;

export default searchSlice.reducer;