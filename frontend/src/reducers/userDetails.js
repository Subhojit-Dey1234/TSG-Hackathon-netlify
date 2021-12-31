import { USER_TYPE } from "../actions/types";

const initialState = {
	user : null
};

export default function userDetails(state = initialState, action) {
	console.log(action);
	switch (action.type) {
		case USER_TYPE: {
			return {
				...state,
				user: action.payload,
			};
		}
		default:
			return state;
	}
}
