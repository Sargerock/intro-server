import { User, Tag } from "../models";

export default async () => {
	const user1 = await User.create({
		userName: "TestDriveUser",
		email: "testdrive@mail.com",
		password: "testdrive",
	});
	const user2 = await User.create({
		userName: "AnotherUser",
		email: "user2@mail.com",
		password: "password",
	});
	const users = [user1, user2];

	for (let i = 0; i < 20; i++) {
		const randomPosition = Math.floor(Math.random() * 2);
		await users[randomPosition].createPost({ text: `Post text ${i}` });
	}
	const tag1 = await Tag.create({ tag: "stayathome" });
	const tag2 = await Tag.create({ tag: "cats" });

	(
		await user1.createPost({
			text: "@AnotherUser #stayathome and play with #cats",
		})
	).setTags([tag1, tag2]);

	(
		await user2.createPost({
			text: "Ok @TestDriveUser #cats",
		})
	).setTags([tag2]);

	console.log("Db seeding successfully finished");
};
