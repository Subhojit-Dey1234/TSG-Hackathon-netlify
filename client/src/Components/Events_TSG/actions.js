import axios from "axios";
import { ADD_EVENTS, DELETE_EVENT, GET_EVENTS, PARTICIPATED_EVENTS, SEARCH_BAR, UPDATE_EVENT,  } from "../../actions/types";

export const getEvents = (callback) => {
	return (dispatch) => {
		return axios.get("/events").then((res) => {
			dispatch({
				type: GET_EVENTS,
				payload: res.data,
			});

			callback(res.data)
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

export const uploadGrievances = (data, callback) => {
	return (dispatch) => {
		return axios
			.post("/student/grievances", data, {
				"Content-Type": "multipart/form-data",
			})
			.then((res) => {
                
				// dispatch({
				// 	type: ADD_EVENTS,
				// 	payload: res.data.events,
				// });
				callback(res);
			})
			.catch((err) => {
				callback(err.response);
			});
	};
};


export const reloadParticipatedEvents = (_id) =>{
	return dispatch=>{
		axios.get(`/student/user/${_id}`)
		.then(res=>{
			console.log(_id)
			dispatch({
				type : PARTICIPATED_EVENTS,
				payload : res.data
			})
			console.log(res.data)
		})
		.catch(err=>{
			console.log("Err",err)
		})
	}
}


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


export const deleteEvents = (_id,callback)=>{
	return dispatch =>{
		return axios.delete(`/events/${_id}`).then(res=>{
			dispatch({
				type : DELETE_EVENT,
				payload : _id
			})

			callback(res)
		})
		.catch(err=>{
			console.log(err)
			callback(err)
		})
	}
}

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


export const participateEvent = (_id,data)=>{
	return dispatch=>{
		axios.post(`/events/participate/${_id}`,data,{
			"Content-Type": "application/json"
		})
		.then(res=>{
			console.log(_id)
			dispatch({
				type : PARTICIPATED_EVENTS,
				payload : res.data
			})
			console.log(res.data)
		})
		.catch(err=>{
			console.log(err)
		})
	}
}
