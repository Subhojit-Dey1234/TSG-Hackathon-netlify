import axios from "axios";
import { ADD_EVENTS_SOCIETY, DELETE_EVENT_SOCIETY, GET_EVENTS_SOCIETY, PARTICIPATED_EVENTS, SEARCH_BAR, UPDATE_EVENT_SOCIETY  } from "../../actions/types";

export const getEvents = (callback) => {
	return (dispatch) => {
		return axios.get("/society-point").then((res) => {
			if(res.status === 200){
				dispatch({
					type: GET_EVENTS_SOCIETY,
					payload: res.data,
				});
			}
		
			callback(res.data)
		});
	};
};

export const uploadEvents = (data, callback) => {
	return (dispatch) => {
		return axios
			.post("/society-point", data, {
				"Content-Type": "multipart/form-data",
			})
			.then((res) => {
				console.log(res)
				dispatch({
					type: ADD_EVENTS_SOCIETY,
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
			.patch(`/society-point/${_id}`, data, {
				"Content-Type": "multipart/form-data",
			})
			.then((res) => {
				console.log(res)
				if(res.status === 200){
					dispatch({
						type: UPDATE_EVENT_SOCIETY,
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
		return axios.delete(`/society-point/${_id}`).then(res=>{
			dispatch({
				type : DELETE_EVENT_SOCIETY,
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
			.get(`/society-point/downloads/${_id}`, {
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
		axios.post(`/society-point/tsg-participate/${_id}`,data,{
			"Content-Type": "application/json"
		})
		.then(res=>{
			if(res.status === 200){
				dispatch({
					type : PARTICIPATED_EVENTS,
					payload : res.data
				})
			}
			callback(res)
			// console.log(res.data)
		})
		.catch(err=>{
			callback(err)
			// console.log(err)
		})
	}
}


export const participateEventSocio = (_id,data)=>{
	return dispatch=>{
		axios.post(`/society-point/society-participate/${_id}`,data,{
			"Content-Type": "application/json"
		})
		.then(res=>{
			
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
