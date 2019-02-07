import { createActions } from "redux-actions";

export const {
    fetchListRequest,
    fetchListSuccess,
    fetchListFailure,
    updateList
} = createActions(
    "FETCH_LIST_REQUEST",
    "FETCH_LIST_SUCCESS",
    "FETCH_LIST_FAILURE",
    "UPDATE_LIST"
);