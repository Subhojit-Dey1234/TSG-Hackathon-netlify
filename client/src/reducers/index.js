import { combineReducers } from "redux";
import userDetails from './userDetails'
import eventDetails from "../Components/Events_TSG/events_details";
import newsDetails from "../Components/News/news";

export default combineReducers({
    userDetails : userDetails,
    eventDetails : eventDetails,
    news : newsDetails,
})