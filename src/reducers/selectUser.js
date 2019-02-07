import {
    selectUser
} from "../actions/selectUser";
import {handleActions} from 'redux-actions'

const initState ={
    selectedUser: null
}

const selectedUser = handleActions({
    [selectUser]:(state,action)=>({
        selectedUser:action.payload
    })

},initState)

export const getSelectedUser = state => state.selectedUser.selectedUser


export default selectedUser