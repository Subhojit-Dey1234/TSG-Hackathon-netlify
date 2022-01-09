import { combineReducers } from "redux";
import userDetails from './userDetails'
import eventDetails from "../Components/Events_TSG/events_details";

export default combineReducers({
    userDetails : userDetails,
    eventDetails : eventDetails
})