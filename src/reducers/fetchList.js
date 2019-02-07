import {
    fetchListRequest,
    fetchListSuccess,
    fetchListFailure,
    updateList
} from '../actions/fetchList'
import {searchItem} from "../actions/search";

import { handleActions } from "redux-actions";

const initState = {
    isFetching: false,
    isFetched: false,
    list: {},
    error: null

};

const fetchList = handleActions(
    {
        [fetchListRequest]: (state, action) => ({
            ...state,
            isFetching: true,
            isFetched: false,
            error: false
        }),
        [fetchListSuccess]: (state, action) => ({
            ...state,
            isFetching: false,
            isFetched: true,
            list: action.payload,
            error: false
        }),
        [fetchListFailure]: (state, action) => ({
            ...state,
            isFetching: false,
            isFetched: true,
            error: action.error
        }),
        [updateList]:(state,action)=>({
            isFetching: false,
            isFetched: true,
            list:action.payload,
            error: false
        })
    },
    initState
);

export const getList = state => state.fetchList.list
export const getFetchList = state => state.fetchList


export default fetchList;