import { combineReducers } from "redux";

import fetchList from "./fetchList";
import selectedUser from './selectUser'
import searchItems from'./searchItem'


export default combineReducers({
    fetchList,
    selectedUser,
    searchItems
});