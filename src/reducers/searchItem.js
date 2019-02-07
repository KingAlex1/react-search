import {
   searchItem
} from "../actions/search";
import {handleActions} from 'redux-actions'

const initState ={
    searchItem: null
}

const searchItems = handleActions({
    [searchItem]:(state,action)=>({
        ...state,
        searchItem:action.payload
    })

},initState)

export const getSearchItem = state => state.searchItems.searchItem


export default searchItems