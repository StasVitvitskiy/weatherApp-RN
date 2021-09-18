import {requestForecast, requestForecastResponse} from './weatherSlice';
import {put, takeLatest, call} from 'redux-saga/effects';
import {getCityFomIpResp} from './geoSaga';

const weatherApi = {
  key: '52d94542ad3e450386bb0fce08b6e9ee',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function* requestForecastSaga(action: ReturnType<typeof requestForecast>) {
  const {city, lang = 'en'} = action.payload;
  const resp = yield call(
    fetch,
    `${weatherApi.base}/forecast?q=${city}&lang=${lang}&units=Metric&APPID=${weatherApi.key}`,
  );
  const respData = yield call(() => resp.json());
  yield put(requestForecastResponse(respData));
}

export function* weatherSaga() {
  yield takeLatest(
    [requestForecast.toString(), getCityFomIpResp.toString()],
    requestForecastSaga,
  );
}
