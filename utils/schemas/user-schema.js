import * as yup from "yup";

export default yup.object().shape({
	userName: yup
		.string()
		.required()
		.min(3)
		.max(32),
	email: yup
		.string()
		.required()
		.max(64)
		.email(),
	password: yup
		.string()
		.required()
		.min(7)
		.max(64)
});
