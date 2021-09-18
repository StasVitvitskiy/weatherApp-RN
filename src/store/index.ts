import {configureStore} from '@reduxjs/toolkit';
import {weatherReducer} from './weatherSlice';
import {all} from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import {weatherSaga} from './weatherSaga';
import {backgroundReducer} from './backgroundSlice';
import {unsplashSaga} from './unsplashSaga';
import {geoLocationSaga} from './geoSaga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
export const store = configureStore({
  reducer: {weather: weatherReducer, background: backgroundReducer},
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware),
});
sagaMiddleware.run(function* rootSaga() {
  yield all([weatherSaga(), unsplashSaga(), geoLocationSaga()]);
});
export type RootState = ReturnType<typeof store.getState>;
