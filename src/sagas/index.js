import {fork} from 'redux-saga/effects'
import {fetchListWatch} from "./fetchList";
// import {searchWatch} from "./search";

export default function* () {
    yield fork(fetchListWatch)
    // yield fork(searchWatch)


}