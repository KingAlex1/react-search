import {
   fetchListRequest,
   fetchListSuccess,fetchListFailure

} from "../actions/fetchList";

import { takeLatest, call, put } from "redux-saga/effects";
import { getList } from "../api/api";


export function* fetchListSaga(action) {
    try {
        const list = yield call(getList,action.payload);
        yield put(fetchListSuccess(list));
    } catch (error) {
        yield put(fetchListFailure(error));
    }
}

export function* fetchListWatch() {
    yield takeLatest(fetchListRequest, fetchListSaga);
}