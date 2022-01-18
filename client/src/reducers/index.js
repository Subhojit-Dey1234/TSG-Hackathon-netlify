import { combineReducers } from "redux";
import userDetails from './userDetails'
import eventDetails from "../Components/Events_TSG/events_details";
import newsDetails from "../Components/News/news";
import socialEvents from "../Components/Society_Point/socio_events_details";
import careerDetails from "../Components/StudentPoint/career";
import academicDetails from "../Components/StudentPoint/academic";
import achievementDetails from "../Components/Dashboard/achievement";

export default combineReducers({
    userDetails : userDetails,
    eventDetails : eventDetails,
    news : newsDetails,
    socialEvents : socialEvents,
    careerPoint : careerDetails,
    academicPoint : academicDetails,
    achievementsDetils : achievementDetails
})