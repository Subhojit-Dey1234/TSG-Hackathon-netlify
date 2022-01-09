import axios from "axios";
import { ADD_EVENTS, GET_EVENTS, SEARCH_BAR, UPDATE_EVENT,  } from "../../actions/types";

export const getEvents = () => {
	return (dispatch) => {
		return axios.get("/events").then((res) => {
			dispatch({
				type: GET_EVENTS,
				payload: res.data,
			});
		});
	};
};

export const uploadEvents = (data, callback) => {
	return (dispatch) => {
		return axios
			.post("/events", data, {
				"Content-Type": "multipart/form-data",
			})
			.then((res) => {
                
				dispatch({
					type: ADD_EVENTS,
					payload: res.data.events,
				});
				callback(res);
			})
			.catch((err) => {
				callback(err.response);
			});
	};
};

export const uploadReport = (_id,data, callback) => {
	return (dispatch) => {
		return axios
			.patch(`/events/${_id}`, data, {
				"Content-Type": "multipart/form-data",
			})
			.then((res) => {
				dispatch({
					type: UPDATE_EVENT,
					payload: res.data.events,
				});
				callback(res);
			})
			.catch((err) => {
				callback(err.response);
			});
	};
};

export const downloadReport = (_id, callback) => {
	return (dispatch) => {
		return axios
			.get(`/events/downloads/${_id}`, {
				responseType : "blob"
			})
			.then((res) => {
				callback(res.data);
			})
			.catch((err) => {
				callback(err.response);
			});
	};
};

export const searchAction = (data)=>{
    return dispatch =>{
        dispatch({
            type : SEARCH_BAR,
            payload : data
        })
    }
}
