import { toast } from "react-toastify";
import axios from "axios";

// @desc    Get all parking lots
// @route   GET https://kevinurielfonseca.me/wp-json/wp/v2
// @access  Private
// @status  DONE
export const getWordPressPosts = (params) => async (dispatch) => {
	try {
		const res = await axios.get(
			`${process.env.NEXT_PUBLIC_KEVINFONSECA_API_URL}/posts${params}`,
			{
				headers: {
					"Content-Type": `application/json`,
				},
			}
		);

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

// @desc    Get all parking lots
// @route   GET https://kevinurielfonseca.me/wp-json/wp/v2/posts/:id
// @access  Private
// @status  DONE
export const getWordPressPost = (id) => async (dispatch) => {
	try {
		const res = await axios.get(
			`${process.env.NEXT_PUBLIC_KEVINFONSECA_API_URL}/posts/${id}`,
			{
				headers: {
					"Content-Type": `application/json`,
				},
			}
		);

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

// @desc    Get all parking lots
// @route   GET https://kevinurielfonseca.me/wp-json/wp/v2/comments
// @access  Private
// @status  DONE
export const getWordPressComments = (params) => async (dispatch) => {
	try {
		const res = await axios.get(
			`${process.env.NEXT_PUBLIC_KEVINFONSECA_API_URL}/comments${params}`,
			{
				headers: {
					"Content-Type": `application/json`,
				},
			}
		);

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
