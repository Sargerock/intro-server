import * as yup from "yup";

export default yup.object().shape({
	avatar: yup
		.object().required("No files were uploaded").shape({
			size: yup.number().max(5242880, "Maximum file size is 5MB"),
			mimetype: yup.string().matches(/^image\/\w+$/, {message: "Invalid image format"})
		})
});
