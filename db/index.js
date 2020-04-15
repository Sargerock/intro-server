import { Sequelize } from "sequelize";

import { DB_NAME, DB_USERNAME, DB_USER_PASSWORD, HOST, SEED } from "../config";

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_USER_PASSWORD, {
	host: HOST,
	dialect: "postgres",
	logging: false,
});

sequelize
	.authenticate()
	.then(() => console.log("Db connected"))
	.catch(() => {
		console.log("Can't establish db connection");
		process.exit(1);
	});

export default sequelize;
