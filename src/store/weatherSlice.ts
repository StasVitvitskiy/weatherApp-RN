import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface WeatherState {
  city: string;
  lang: string;
  forecast?: ReturnType<typeof requestForecastResponse>['payload'];
}

const initialState: WeatherState = {
  city: '',
  lang: 'en',
};

export const requestForecast = createAction<{
  city: string;
  lang: string;
}>('WEATHER/REQUEST_FORECAST');
export const requestForecastResponse = createAction<{
  cod: string;
  message: number;
  cnt: number;
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      },
    ];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}>('WEATHER/REQUEST_FORECAST_RESPONSE');

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        city: action.payload,
      };
    },
    reset: () => {
      return initialState;
    },
  },
  extraReducers: builder =>
    builder.addCase(requestForecastResponse, (state, {payload}) => {
      return {
        ...state,
        forecast: payload,
      };
    }),
});

export const {setCity} = weatherSlice.actions;

export const weatherReducer = weatherSlice.reducer;

/**
 * type PayloadAction<T> = { type: string; payload: T }
 */
/**
 * const setCity = (payload: string) => ({ type: "SET_CITY", payload } as const)
 */
