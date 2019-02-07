import fetchList from '../fetchList'

import {
    fetchListRequest,
    fetchListSuccess,
    fetchListFailure,
    updateList
} from '../../actions/fetchList'

const initState = {
    isFetching: false,
    isFetched: false,
    list: {},
    error: false
}

describe('reducer fetchList', function () {
    initState.error = true
    describe('action fetchListRequest', function () {
        it('action type fetchListRequest will change isFetching', function () {
            expect(fetchList(initState, fetchListRequest()).isFetching).toBe(true)
        });
        it('action type fetchListRequest will change isFetched', function () {
            expect(fetchList(initState, fetchListRequest()).isFetched).toBe(false)
        });
        it('action type fetchListRequest will change list', function () {
            expect(fetchList(initState, fetchListRequest()).list).toEqual({})
        });
        it('action type fetchListRequest will change error', function () {
            expect(fetchList(initState, fetchListRequest()).error).toBe(false)
        });
    });

    describe('action fetchListSuccess', function () {
        it('action type fetchListSuccess will change isFetching', function () {
            expect(fetchList(initState, fetchListSuccess({data: [1, 2, 3]})).isFetching).toBe(false)
        });
        it('action type fetchListSuccess will change isFetched', function () {
            expect(fetchList(initState, fetchListSuccess({data: [1, 2, 3]})).isFetched).toBe(true)
        });
        it('action type fetchListRequest will change list', function () {
            expect(fetchList(initState, fetchListSuccess({data: [1, 2, 3]})).list).toEqual({"data": [1, 2, 3]})
        });
        it('action type fetchListRequest will change error', function () {
            expect(fetchList(initState, fetchListSuccess({data: [1, 2, 3]})).error).toBe(false)
        });
    });
    describe('action fetchListFailure ', function () {
        it('action type fetchListFailure will change isFetching', function () {
            expect(fetchList(initState, fetchListFailure(undefined)).isFetching).toBe(false)
        });
        it('action type fetchListFailure will change isFetched', function () {
            expect(fetchList(initState, fetchListFailure(undefined)).isFetched).toBe(true)
        });
        it('action type fetchListFailure will change error', function () {
            expect(fetchList(initState, fetchListFailure(undefined)).error).toEqual(undefined)
        });
    });
    describe('action updateList', function () {
        it('action type updateList will change isFetching', function () {
            expect(fetchList(initState, updateList({data: [1, 2, 3]})).isFetching).toBe(false)
        });
        it('action type updateList will change is Fetched', function () {
            expect(fetchList(initState, updateList({data: [1, 2, 3]})).isFetched).toBe(true)
        });
        it('action type updateList will change list', function () {
            expect(fetchList(initState, updateList({data: [1, 2, 3]})).list).toEqual({data: [1, 2, 3]})
        });
        it('action type updateList will change error', function () {
            expect(fetchList(initState, updateList({data:[1,2,3]})).error).toBe(false)
        });
    });

});