const dotenv = require("dotenv");
dotenv.config();

module.exports = {
	development: {
		username: process.env.USER_NAME,
		password: process.env.USER_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.HOST,
		dialect: "postgres",
	},
	test: {
		username: process.env.USER_NAME,
		password: process.env.USER_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.HOST,
		dialect: "postgres",
	},
	production: {
		username: process.env.USER_NAME,
		password: process.env.USER_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.HOST,
		dialect: "postgres",
	},
};
