import { ADD_EVENTS, GET_EVENTS, DELETE_EVENT, UPDATE_EVENT,SEARCH_BAR, EVENTBYID } from "../../actions/types";

const initialState = {
	events: [],
	event : null,
};

export default function eventDetails(state = initialState, action) {
	switch (action.type) {
		case GET_EVENTS:
			return {
				...state,
				events: action.payload,
			};
		case ADD_EVENTS:
			return {
				...state,
				events: [action.payload, ...state.events],
			};
		case UPDATE_EVENT : {
			return {
				...state,
				events:[action.payload,...state.events.filter(event => action.payload._id !== event._id)]
			}
		}
		case DELETE_EVENT:
			return {
				...state,
				events: state.events.filter((event) => event._id !== action.payload),
			};
		case SEARCH_BAR:{
			return {
				...state,
				events: action.payload
			}
		}
		case EVENTBYID:{
			return {
				...state,
				event : action.payload
			}
		}
		default:
			return state;
	}
}
