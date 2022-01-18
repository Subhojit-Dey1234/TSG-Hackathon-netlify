import axios from "axios";
import { ADD_ACHIEVEMENTS, GET_ACHIEVEMENTS } from "../../actions/types";


export const uploadAcheivement = (data, callback) => {
	return (dispatch) => {
		return axios
			.post("/student/acheivements", data, {
				"Content-Type": "multipart/form-data",
			})
			.then((res) => {
				console.log(data)
				if (res.status === 200) {
					dispatch({
						type: ADD_ACHIEVEMENTS,
						payload: res.data.studentAcheivementProfile,
					});
				}

				callback(res);
			})
			.catch((err) => {
				console.log(err);
				callback(err.response);
			});
	};
};
export const getAcheivement = (roll, callback) => {
	return (dispatch) => {
		return axios
			.get(`/student/acheivements/${roll}`)
			.then((res) => {
				if (res.status === 200) {
					dispatch({
						type: GET_ACHIEVEMENTS,
						payload: res.data.achievements,
					});
				}

				callback(res);
			})
			.catch((err) => {
				console.log(err);
				callback(err.response);
			});
	};
};

export const downloadReport = (_id, callback) => {
	return (dispatch) => {
		return axios
			.get(`/student/acheivements/downloads/${_id}`, {
				responseType: "blob",
			})
			.then((res) => {
				callback(res.data);
			})
			.catch((err) => {
				callback(err.response);
			});
	};
};
