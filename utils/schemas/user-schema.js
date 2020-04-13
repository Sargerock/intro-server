import * as yup from "yup";

import { User } from "../../models/user";

const whitespaceTestOptions = {
	name: "whitespace",
	test: (value) => !value.includes(" "),
	message: "Whitespaces not allowed",
};

export default yup.object().shape({
	userName: yup
		.string()
		.required("Name is required")
		.min(3, "Minimum name length is 3")
		.max(32, "Maximum name length is 32")
		.test(whitespaceTestOptions)
		.test("unique", "Name already taken", async function (value) {
			if (await User.findOne({ where: { userName: value } }))
				return this.createError({
					path: this.path,
					message: "Name already taken",
				});
			return value;
		}),
	email: yup
		.string()
		.required("Email is required")
		.max(64, "Maximum email length is 64")
		.email("Incorrect email")
		.test("unique", "Email already registered", async function (value) {
			if (await User.findOne({ where: { email: value } }))
				return this.createError({
					path: this.path,
					message: "Email already registered",
				});
			return value;
		}),
	password: yup
		.string()
		.required("Password is required")
		.min(7, "Minimum password length is 7")
		.max(64, "Maximum password length is 64")
		.test(whitespaceTestOptions),
});
