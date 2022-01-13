import { USER_TYPE,PARTICIPATED_EVENTS, SET_ID } from "../actions/types";

const initialState = {
	user : null,
	id : null
};

export default function userDetails(state = initialState, action) {
	switch (action.type) {
		case SET_ID : {
			return {
				...state,
				id : action.payload
			}
		}
		case "USER_TYPE_POINTER" : {
			return {
				...state,
				type : action.payload
			}
		}
		case USER_TYPE: {
			return {
				...state,
				user: action.payload,
			};
		}
		case PARTICIPATED_EVENTS:{
			return {
				...state,
				user : action.payload
			}
		}
		default:
			return state;
	}
}
