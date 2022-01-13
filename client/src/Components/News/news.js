import { ADD_NEWS, DELETE_NEWS, GET_NEWS, UPDATE_NEWS } from "../../actions/types";

const initialState = {
	news: [],
};

export default function newsDetails(state = initialState, action) {
    switch(action.type){
        case GET_NEWS:
			return {
				...state,
				news: action.payload,
			};
		case ADD_NEWS:
			return {
				...state,
				news: [action.payload, ...state.news],
			};
		case UPDATE_NEWS : {
			return {
				...state,
				news:[action.payload,...state.news.filter(event => action.payload._id !== event._id)]
			}
		}
		case DELETE_NEWS:
			return {
				...state,
				news: state.news.filter((event) => event._id !== action.payload),
			}
		default:
			return state;
    }
}