import { ADD_EVENTS, GET_EVENTS, DELETE_EVENT, UPDATE_EVENT,SEARCH_BAR, EVENTBYID, GET_ACHIEVEMENTS, ADD_ACHIEVEMENTS, UPDATE_ACHIEVEMENTS } from "../../actions/types";

const initialState = {
	events: [],
	event : null,
};

export default function achievementDetails(state = initialState, action) {
	switch (action.type) {
		case GET_ACHIEVEMENTS:
			return {
				...state,
				events: action.payload,
			};
		case ADD_ACHIEVEMENTS:
			return {
				...state,
				events: [action.payload, ...state.events],
			};
		case UPDATE_ACHIEVEMENTS : {
			return {
				...state,
				events:[action.payload,...state.events.filter(event => action.payload._id !== event._id)]
			}
		}
		default:
			return state;
	}
}
