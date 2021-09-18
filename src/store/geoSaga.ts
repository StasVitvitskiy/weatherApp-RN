import {call, put, takeLatest} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';

export const getCityFomIp = createAction('GEO/GET_CITY_FROM_IP');
export const getCityFomIpResp = createAction<{city: string}>(
  'GEO/GET_CITY_FROM_IP_RESP',
);
function* locationSaga() {
  const resp = yield call(fetch, 'https://geolocation-db.com/json');
  const respData: {
    country_code: string;
    country_name: string;
    city: string;
    postal: string;
    latitude: number;
    longitude: number;
    IPv4: number;
    state: string;
  } = yield call(() => resp.json());
  yield put(getCityFomIpResp({city: respData.city}));
}

export function* geoLocationSaga() {
  yield takeLatest(getCityFomIp.toString(), locationSaga);
}
