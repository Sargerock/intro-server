import * as yup from "yup";

export default yup.object().shape({
	userName: yup
		.string()
		.required("Name is required")
		.min(3, "Minimum name length is 3")
		.max(32, "Maximum name length is 32"),
	email: yup
		.string()
		.required("Email is required")
		.max(64, "Maximum email length is 64")
		.email("Incorrect email"),
	password: yup
		.string()
		.required("Password is required")
		.min(7, "Minimum password length is 7")
		.max(64, "Maximum password length is 64")
});
