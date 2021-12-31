import { combineReducers } from "redux";
import userDetails from './userDetails'

console.log(userDetails)

export default combineReducers({
    userDetails : userDetails
})