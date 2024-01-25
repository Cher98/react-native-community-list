import { call, takeEvery, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
// import { fetchData } from './store';
import { actions } from './actions';

const url = 'https://api.github.com/orgs/react-native-community/repos';
const main_url = 'https://api.github.com/orgs/react-native-community';

const getData = async () => {
  return await axios.get(`${url}?per_page=10`);
};

const getRepoMain = async () => {
  return await axios.get(main_url);
};

export function* fetchInitial(): any {
  try {
    let result = yield call(getData);
    // console.log('SAGA ---- ', result);
    yield put({ type: actions.FETCH_DATA_SAGA, payload: result.data });
  } catch (e) {
    console.log(e);
    yield put({ type: actions.FETCH_DATA_FAILED });
  }
}

export function* fetchRepoMain(): any {
  try {
    let result = yield call(getRepoMain);
    // console.log('-------- ', result.data);
    yield put({ type: actions.FETCH_DATA_SUCCESS, payload: result.data });
  } catch (e) {
    console.log(e);
    yield put({ type: actions.FETCH_DATA_FAILED });
  }
}

export default function* saga() {
  yield takeEvery(actions.FETCH_DATA_REQUEST, fetchInitial);
  yield takeEvery(actions.FETCH_REPO_MAIN, fetchRepoMain);
}
