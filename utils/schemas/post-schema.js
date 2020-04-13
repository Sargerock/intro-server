import * as yup from "yup";

export default yup.object().shape({
	text: yup
		.string()
		.required("Text is required")
		.min(3, "Text must be at least 3 characters long")
		.max(512, "Text is too long. Max is 512"),
});
