import * as yup from "yup";

export default yup.object().shape({
	text: yup
		.string()
		.required()
		.min(8)
		.max(512)
});
