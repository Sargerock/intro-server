import { User } from "../models";

export default async () => {
	try {
		const user1 = await User.create({
			userName: "TestDriveUser",
			email: "testdrive@mail.com",
			password: "testdrive",
		});
		const user2 = await User.create({
			userName: "Another User",
			email: "user2@mail.com",
			password: "password",
		});
		const users = [user1, user2];

		for (let i = 0; i < 20; i++) {
			const randomPosition = Math.floor(Math.random() * 2);
			await users[randomPosition].createPost({ text: `Post text ${i}` });
		}

		console.log("Db seeding successfully finished");
	} catch (e) {
		console.log("Users was already created. Seeding is canceled.");
	}
};
