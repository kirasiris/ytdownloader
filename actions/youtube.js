import { toast } from "react-toastify";
import api from "@/helpers/api";

// @desc    Get all youtube
// @route   GET /api/v1/extras/youtube
// @access  Private
// @status  DONE
export const getYouTubes = (params) => async (dispatch) => {
	try {
		const res = await api.get(`youtube${params}`);
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

// @desc    Get single youtube
// @route   GET /api/v1/extras/youtube/single/:id
// @access  Private
// @status  DONE
export const getYouTube = (id) => async (dispatch) => {
	try {
		const res = await api.get(`youtube/${id}`);

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

// @route       GET api/v1/extras/youtube
// @description Get YouTube Info
// @access      Private
// @task        DONE
export const getYoutTubeVideoInfo = (params) => async (dispatch) => {
	try {
		const res = await api.get(`youtube/getinfo${params}`);

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

// @route       GET api/v1/extras/youtube
// @description Get YouTube Download
// @access      Private
// @task        DONE
export const getYoutTubeVideoDownload = (params) => async (dispatch) => {
	try {
		const res = await api.get(params);

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
