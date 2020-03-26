import { User } from "../db";

export default async () => {
	const user = await User.create({
		userName: "TestDriveUser",
		email: "testdrive@mail.com",
		password: "testdrive"
	});

	for (let i = 0; i < 20; i++) {
		await user.createPost({ text: `Post text ${i}` });
	}
};
