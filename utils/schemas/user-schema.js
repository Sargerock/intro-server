import * as yup from "yup";

export default yup.object().shape({
	userName: yup
		.string()
		.required()
		.max(32),
	email: yup
		.string()
		.required()
		.email(),
	password: yup
		.string()
		.required()
		.min(7)
});
