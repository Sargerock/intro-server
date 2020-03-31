import * as yup from "yup";

export default yup.object().shape({
	text: yup
		.string()
		.required("Text is required")
		.min(8, "Text must be at least 8 characters long")
		.max(512, "Text is too long. Max is 512")
});
