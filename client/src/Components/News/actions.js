import axios from "axios";
import { ADD_NEWS, DELETE_NEWS, GET_NEWS, UPDATE_NEWS, SEARCH_BAR_NEWS,  } from "../../actions/types";

export const getNews = (callback) => {
	return (dispatch) => {
		return axios.get("/news").then((res) => {
			if(res.status === 200){
				dispatch({
					type: GET_NEWS,
					payload: res.data,
				});
			}
		
			callback(res.data)
		});
	};
};

export const searchNews = (data,callback)=>{
	return (dispatch) => {
		return axios
			.get(`/search/news/?q=${data}`, {
				"Content-Type": "multipart/form-data",
			})
			.then((res) => {
                if(res.status === 200){
					dispatch({
						type: SEARCH_BAR_NEWS,
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

export const uploadNewsFunc = (data, callback) => {
	return (dispatch) => {
		return axios
			.post("/news", data, {
				"Content-Type": "multipart/form-data",
			})
			.then((res) => {
				console.log(res.data)
				dispatch({
					type: ADD_NEWS,
					payload: res.data.news,
				});
				callback(res);
			})
			.catch((err) => {
				callback(err.response);
			});
	};
};

export const updateNews = (_id,data, callback) => {
	return (dispatch) => {
		return axios
			.patch(`/news/${_id}`, data, {
				"Content-Type": "multipart/form-data",
			})
			.then((res) => {
				console.log(res)
				if(res.status === 200){
					dispatch({
						type: UPDATE_NEWS,
						payload: res.data.news,
					});
				}
				
				callback(res);
			})
			.catch((err) => {
				callback(err.response);
			});
	};
};


export const deleteNews = (_id,callback)=>{
	return dispatch =>{
		return axios.delete(`/news/${_id}`).then(res=>{
			dispatch({
				type : DELETE_NEWS,
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
			.get(`/news/downloads/${_id}`, {
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

