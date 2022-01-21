import axios from "axios";
import { EVENTBYID, GET_ACADEMIC_POINT, ADD_ACADEMIC_POINT, DELETE_ACADEMIC_POINT, UPDATE_ACADEMIC_POINT, ADD_CAREER_POINT, DELETE_CAREER_POINT, UPDATE_CAREER_POINT, GET_CAREER_POINT  } from "../../actions/types";

export const getAcademicPoint = (callback) => {
	return (dispatch) => {
		return axios.get("/academics").then((res) => {
			if(res.status === 200){
				dispatch({
					type: GET_ACADEMIC_POINT,
					payload: res.data,
				});
			}
		
			callback(res.data)
		});
	};
};

export const getAcademicPointById = (id,callback) => {
	return (dispatch) => {
		return axios.get("/academics/" + id).then((res) => {
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

export const searchAcademicPoint = (data,callback)=>{
	return (dispatch) => {
		return axios
			.get(`/academics/query/?year=${data.year}&department=${data.department}`, {
				"Content-Type": "multipart/form-data",
			})
			.then((res) => {
				console.log(res)
                if(res.status === 200){
					dispatch({
						type: GET_ACADEMIC_POINT,
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

export const uploadAcademicPoint = (data, callback) => {
	return (dispatch) => {
		return axios
			.post("/academics", data, {
				"Content-Type": "multipart/form-data",
			})
			.then((res) => {
				if(res.status === 200){
					dispatch({
						type: ADD_ACADEMIC_POINT,
						payload: res.data.academicPoint,
					});
				}
				callback(res);
			})
			.catch((err) => {
				console.log(err)
				callback(err.response);
			});
	};
};
export const deleteAcademicPoint = (_id,callback)=>{
	return dispatch =>{
		return axios.delete(`/academics/${_id}`).then(res=>{
			dispatch({
				type : DELETE_ACADEMIC_POINT,
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

export const updateAcademics = (_id,data, callback) => {
	return (dispatch) => {
		return axios
			.patch(`/academics/${_id}`, data, {
				"Content-Type": "multipart/form-data",
			})
			.then((res) => {
				console.log(res)
				if(res.status === 200){
					dispatch({
						type: UPDATE_ACADEMIC_POINT,
						payload: res.data.academicPoint,
					});
				}
				
				callback(res);
			})
			.catch((err) => {
				callback(err.response);
			});
	};
};



export const getCareerPoint = (callback) => {
	return (dispatch) => {
		return axios.get("/careers").then((res) => {
			if(res.status === 200){
				dispatch({
					type: GET_CAREER_POINT,
					payload: res.data,
				});
			}
		
			callback(res.data)
		});
	};
};

export const getCareerPointById = (id,callback) => {
	return (dispatch) => {
		return axios.get("/careers/" + id).then((res) => {
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

export const searchCareerPoint = (data,callback)=>{
	return (dispatch) => {
		return axios
			.get(`/careers/query/?field=${data}`, {
				"Content-Type": "multipart/form-data",
			})
			.then((res) => {
                if(res.status === 200){
					console.log(res.data)
					dispatch({
						type: GET_CAREER_POINT,
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

export const uploadCareerPoint = (data, callback) => {
	return (dispatch) => {
		return axios
			.post("/careers", data, {
				"Content-Type": "multipart/form-data",
			})
			.then((res) => {
                if(res.status === 200){

					dispatch({
						type: ADD_CAREER_POINT,
						payload: res.data.careerPoint,
					});
				}
				callback(res);
			})
			.catch((err) => {
				callback(err.response);
			});
	};
};
export const deleteCareerPoint = (_id,callback)=>{
	return dispatch =>{
		return axios.delete(`/careers/${_id}`).then(res=>{
			dispatch({
				type : DELETE_CAREER_POINT,
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

export const updateCareerPoint = (_id,data, callback) => {
	return (dispatch) => {
		return axios
			.patch(`/careers/${_id}`, data, {
				"Content-Type": "multipart/form-data",
			})
			.then((res) => {
				console.log(res)
				if(res.status === 200){
					dispatch({
						type: UPDATE_CAREER_POINT,
						payload: res.data.careerPoint,
					});
				}
				
				callback(res);
			})
			.catch((err) => {
				callback(err.response);
			});
	};
};