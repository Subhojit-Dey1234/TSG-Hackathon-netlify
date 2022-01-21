import { ADD_EVENTS_SOCIETY, GET_EVENTS_SOCIETY, DELETE_EVENT_SOCIETY, UPDATE_EVENT_SOCIETY } from "../../actions/types";

const initialState = {
	social_events: [],
};

export default function socialEvents(state = initialState, action) {
	switch (action.type) {
		case GET_EVENTS_SOCIETY:
			return {
				...state,
				social_events: action.payload,
			};
		case ADD_EVENTS_SOCIETY:
			return {
				...state,
				social_events: [action.payload, ...state.social_events],
			};
		case UPDATE_EVENT_SOCIETY : {
			return {
				...state,
				social_events:[action.payload,...state.social_events.filter(event => action.payload._id !== event._id)]
			}
		}
		case DELETE_EVENT_SOCIETY:
			return {
				...state,
				social_events: state.social_events.filter((event) => event._id !== action.payload),
			};
		default:
			return state;
	}
}
