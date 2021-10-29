import { toast } from "react-toastify";
import axios from "axios";

// @route       GET api/v1/posts
// @description Get all posts
// @access      Private
// @task        DONE
export const getYoutTubeVideoInfo = (params) => async (dispatch) => {
	try {
		const res = await axios.get(params);

		return res.data;
	} catch (err) {
		// const error = err.response.data.message;
		const error = err?.response?.data?.error?.errors;
		const errors = err?.response?.data?.errors;

		if (error) {
			// dispatch(setAlert(error, 'danger'));
			error &&
				Object.entries(error).map(([, value]) => toast.error(value.message));
		}

		if (errors) {
			errors.forEach((error) => toast.error(error.msg));
		}

		toast.error(err?.response?.statusText);
		return { msg: err?.response?.statusText, status: err?.response?.status };
	}
};

// @route       GET api/v1/posts
// @description Get all posts
// @access      Private
// @task        DONE
export const getYoutTubeVideoDownload = (params) => async (dispatch) => {
	try {
		const res = await axios.get(params);

		return res.data;
	} catch (err) {
		// const error = err.response.data.message;
		const error = err?.response?.data?.error?.errors;
		const errors = err?.response?.data?.errors;

		if (error) {
			// dispatch(setAlert(error, 'danger'));
			error &&
				Object.entries(error).map(([, value]) => toast.error(value.message));
		}

		if (errors) {
			errors.forEach((error) => toast.error(error.msg));
		}

		toast.error(err?.response?.statusText);
		return { msg: err?.response?.statusText, status: err?.response?.status };
	}
};
