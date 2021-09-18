import {createAction, createSlice} from '@reduxjs/toolkit';

export interface BackgroundState {
  background: string;
}
export const initialState: BackgroundState = {
  background:
    'https://images.unsplash.com/photo-1504567961542-e24d9439a724?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxMzg4NDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzE5OTQ5MjU&ixlib=rb-1.2.1&q=85',
};

export const requestBackground = createAction('BACKGROUND/REQUEST_BACKGROUND');
export const requestBackgroundResponse = createAction<{
  background: string;
}>('BACKGROUND/REQUEST_BACKGROUND_RESPONSE');

export const backgroundSlice = createSlice({
  name: 'background',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder.addCase(requestBackgroundResponse, (state, {payload}) => {
      return {
        ...state,
        background: payload.background,
      };
    }),
});

export const backgroundReducer = backgroundSlice.reducer;
