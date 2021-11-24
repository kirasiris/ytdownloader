import { toast } from "react-toastify";
import api from "@/helpers/api";
import { APP_NAME } from "@/config";

// @route       POST api/v1/emails
// @description Add email
// @access      Private
// @task        DONE
export const addEmail = (formData) => async (dispatch) => {
	try {
		const res = await api.post(`/emails`, {
			...formData,
			website: APP_NAME,
		});

		toast.success("Email created");
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
