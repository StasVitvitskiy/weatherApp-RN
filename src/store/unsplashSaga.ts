import {call, put, takeLatest} from 'redux-saga/effects';
import {requestBackground, requestBackgroundResponse} from './backgroundSlice';

const unsplashApi = {
  key: 'cMhNke50fLaQO0Givz-syfIrmTFv9UCuHfw0Ipc0Uzk',
  secretKey: 'dqpU33a11ciLG7XXJVP9l6nP4pBgktawDdXnI_-GLvo',
  base: 'https://api.unsplash.com/photos/',
};
type RandomImageResp = {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  categories: unknown[];
  likes: number;
  liked_by_user: boolean;
  current_user_collections: unknown[];
  sponsorship: null;
  topic_submissions: {
    nature: {
      status: string;
      approved_on: string;
    };
  };
  user: {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    twitter_username: string;
    portfolio_url: null;
    bio: null;
    location: null;
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
      following: string;
      followers: string;
    };
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    instagram_username: null;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: {
      instagram_username: null;
      portfolio_url: null;
      twitter_username: string;
      paypal_email: null;
    };
  };
  exif: {
    make: string;
    model: string;
    exposure_time: string;
    aperture: string;
    focal_length: string;
    iso: number;
  };
  location: {
    title: string;
    name: string;
    city: string;
    country: string;
    position: {
      latitude: number;
      longitude: number;
    };
  };
  views: number;
  downloads: number;
};
function* requestBackgroundSaga() {
  const resp = yield call(
    fetch,
    `${unsplashApi.base}/random?orientation=landscape&per_page=1&query=nature&client_id=${unsplashApi.key}`,
  );
  const respData: RandomImageResp = yield call(() => resp.json());
  yield put(requestBackgroundResponse({background: respData.urls.full}));
}

export function* unsplashSaga() {
  yield takeLatest(requestBackground.toString(), requestBackgroundSaga);
}
