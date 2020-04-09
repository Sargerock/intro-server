import * as yup from "yup";

export default yup.object().shape({
	tag: yup
		.string()
		.required("Text is required")
		.min(3, "Text must be at least 3 characters long")
		.max(64, "Text is too long. Max is 64"),
});
