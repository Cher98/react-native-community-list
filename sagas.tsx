import { call, takeEvery, put } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { fetchData } from "./store";
import { actions } from "./actions";

const url = 'https://api.github.com/orgs/react-native-community/repos';

const getData = async () => {
    return await axios.get(url);
}

export function* fetchDataSaga(): any {
    try {
        let result = yield call(getData);
        yield put(fetchData(result.data));
    } catch (e) {
        console.log(e);
        yield put({ type: actions.FETCH_DATA_FAILED });
    }
}

export default function* rootSaga() {
    yield takeEvery(actions.FETCH_DATA_SAGA, fetchDataSaga);
}
