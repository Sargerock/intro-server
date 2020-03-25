import * as yup from "yup";

export default yup.object().shape({
	sort: yup.string().oneOf(["createdAt", "id"]),
	order: yup.string().oneOf(["asc", "desc"]),
	offset: yup.number().min(0),
	limit: yup
		.number()
		.positive()
		.max(100)
});
