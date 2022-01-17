import axios from "axios";
import { ADD_EVENTS, DELETE_EVENT, GET_EVENTS, PARTICIPATED_EVENTS, SEARCH_BAR,UPDATE_EVENT,EVENTBYID  } from "../../actions/types";

export const getEvents = (callback) => {
	return (dispatch) => {
		return axios.get("/events").then((res) => {
			if(res.status === 200){
				dispatch({
					type: GET_EVENTS,
					payload: res.data,
				});
			}
		
			callback(res.data)
		});
	};
};

export const getEventsById = (id,callback) => {
	return (dispatch) => {
		return axios.get("/events/" + id).then((res) => {
			if(res.status === 200){
				dispatch({
					type: EVENTBYID,
					payload: res.data[0],
				});
			}

		
			callback(res.data[0])
		});
	};
};

export const searchEvents = (data,callback)=>{
	return (dispatch) => {
		return axios
			.get(`/search/?q=${data}`, {
				"Content-Type": "multipart/form-data",
			})
			.then((res) => {
                if(res.status === 200){
					dispatch({
						type: SEARCH_BAR,
						payload: res.data,
					});
				}
				
				callback(res);
			})
			.catch((err) => {
				callback(err.response);
			});
	};
}

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
			
			if(res.status === 200){
				dispatch({
					type : PARTICIPATED_EVENTS,
					payload : res.data
				})
			}
			
			// console.log(res.data)
		})
		.catch(err=>{
			// console.log("Err",err)
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
				// console.log(res)
				if(res.status === 200){
					dispatch({
						type: UPDATE_EVENT,
						payload: res.data.events,
					});
				}
				
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
			// console.log(err)
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


export const participateEvent = (_id,data,callback)=>{
	return dispatch=>{
		axios.post(`/events/tsg-participate/${_id}`,data,{
			"Content-Type": "application/json"
		})
		.then(res=>{
			if(res.status === 200){
				dispatch({
					type : PARTICIPATED_EVENTS,
					payload : res.data
				})
				// console.log(res)
			}
			callback(res)
		})
		.catch(err=>{
			callback(err)
			// console.log(err)
		})
	}
}


export const participateEventSocio = (_id,data,callback)=>{
	return dispatch=>{
		axios.post(`/events/society-participate/${_id}`,data,{
			"Content-Type": "application/json"
		})
		.then(res=>{
			dispatch({
				type : PARTICIPATED_EVENTS,
				payload : res.data
			})
			// console.log(res.data)
			callback(res)
		})
		.catch(err=>{
			console.log(err)
		})
	}
}
