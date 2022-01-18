import { GET_CAREER_POINT, ADD_CAREER_POINT, UPDATE_CAREER_POINT, DELETE_CAREER_POINT } from "../../actions/types";

const initialState = {
	careers: [],
};

export default function careerDetails(state = initialState, action) {
	switch (action.type) {
		case GET_CAREER_POINT:
			return {
				...state,
				careers: action.payload,
			};
		case ADD_CAREER_POINT:
			return {
				...state,
				careers: [action.payload, ...state.careers],
			};
		case UPDATE_CAREER_POINT : {
			return {
				...state,
				careers:[action.payload,...state.careers.filter(event => action.payload._id !== event._id)]
			}
		}
		case DELETE_CAREER_POINT:
			return {
				...state,
				careers: state.careers.filter((event) => event._id !== action.payload),
			};
		default:
			return state;
	}
}
