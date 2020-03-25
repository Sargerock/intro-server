import dotenv from "dotenv";

dotenv.config();

export const {
	PORT,
	DB_NAME,
	USER_NAME,
	USER_PASSWORD,
	HOST,
	SECRET,
	EXPIRES_ACCESS,
	EXPIRES_REFRESH
} = process.env;
