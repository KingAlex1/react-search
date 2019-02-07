import {
    fetchListSuccess,
    fetchListFailure
} from '../../actions/fetchList'

import {call, put} from 'redux-saga/effects'
import {fetchListSaga} from "../fetchList"
import {getList} from "../../api/api"

describe('Saga FetchList', function () {
    it('call getList', function () {
        const action = {payload: "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"}
        const saga = fetchListSaga(action)
        expect(saga.next().value).toEqual(
            call(getList, "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}")
        )

    });
    it('distapcth action fetchListSuccess with data from call to success ', function () {
        const action = {payload: "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"}
        const data = [{
            "id": 682,
            "firstName": "Alana",
            "lastName": "Serraon",
            "email": "KWilliams@sed.org",
            "phone": "(184)672-0923",
            "address": {
                "streetAddress": "3037 Sed Ln",
                "city": "Marion",
                "state": "KY",
                "zip": "41167"
            },
            "description": ""
        }]
        const saga = fetchListSaga(action)
        saga.next();
        expect(saga.next(data).value).toEqual(put(fetchListSuccess(data)))
    });
    it('disppatch action fetchListFailure with data from call to failure', function () {
        const action = {payload: "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"}
        const error = new Error("test error")
        const saga = fetchListSaga(action);
        saga.next();
        expect(saga.throw(error).value).toEqual(put(fetchListFailure(error)))
    });
});