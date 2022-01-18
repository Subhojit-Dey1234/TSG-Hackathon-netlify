import { GET_ACADEMIC_POINT, ADD_ACADEMIC_POINT, UPDATE_ACADEMIC_POINT, DELETE_ACADEMIC_POINT } from "../../actions/types";

const initialState = {
	academics: [],
};

export default function academicDetails(state = initialState, action) {
	switch (action.type) {
		case GET_ACADEMIC_POINT:
			return {
				...state,
				academics: action.payload,
			};
		case ADD_ACADEMIC_POINT:
			return {
				...state,
				academics: [action.payload, ...state.academics],
			};
		case UPDATE_ACADEMIC_POINT : {
			return {
				...state,
				academics:[action.payload,...state.academics.filter(event => action.payload._id !== event._id)]
			}
		}
		case DELETE_ACADEMIC_POINT:
			return {
				...state,
				academics: state.academics.filter((event) => event._id !== action.payload),
			};
		default:
			return state;
	}
}
