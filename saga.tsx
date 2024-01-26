import {call, takeEvery, put, takeLatest} from 'redux-saga/effects';
import axios, {AxiosResponse} from 'axios';
// import { fetchData } from './store';
import {actions} from './actions';

const url = 'https://api.github.com/orgs/react-native-community/repos';
const main_url = 'https://api.github.com/orgs/react-native-community';
let itemsPerPage = 10;
let listEnded = false;

const getData = async (params: any) => {
  return await axios.get(`${url}?per_page=${params.count}`);
};

const getRepoMain = async () => {
  return await axios.get(main_url);
};

const getAllData = async () => {
  return await axios.get(url);
};

export function* fetchInitial(): any {
  try {
    let result = yield call(getData, {count: itemsPerPage});
    yield put({type: actions.FETCH_DATA_SAGA, payload: result.data});
  } catch (e) {
    console.log(e);
    yield put({type: actions.FETCH_DATA_FAILED});
  }
}

export function* fetchRepoMain(): any {
  try {
    let result = yield call(getRepoMain);
    yield put({type: actions.FETCH_DATA_SUCCESS, payload: result.data});
  } catch (e) {
    console.log(e);
    yield put({type: actions.FETCH_DATA_FAILED});
  }
}

export function* fetchMoreData({payload}: ReturnType<any>): any {
  try {
    yield put({type: actions.FETCH_LOADING});
    let checkAllData = yield call(getAllData);
    let result = yield call(getData, {count: itemsPerPage + payload.count});
    let allDataLength = checkAllData.data.length;
    let pageLength = result.data.length;
    if (allDataLength === pageLength) {
      listEnded = true;
    }
    yield put({
      type: actions.FETCH_MORE_DATA_SUCCESS,
      payload: {
        result: result.data,
        listEnded: listEnded,
      },
    });
  } catch (e) {
    console.log(e);
    yield put({type: actions.FETCH_DATA_FAILED});
  }
}

export default function* saga() {
  yield takeEvery(actions.FETCH_DATA_REQUEST, fetchInitial);
  yield takeEvery(actions.FETCH_REPO_MAIN, fetchRepoMain);
  yield takeEvery(actions.FETCH_MORE_DATA, fetchMoreData);
}
