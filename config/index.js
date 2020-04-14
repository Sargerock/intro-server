import dotenv from "dotenv";

dotenv.config();

export const {
	PORT,
	DB_NAME,
	DB_USERNAME,
	DB_USER_PASSWORD,
	HOST,
	JWT_SECRET,
	EXPIRES_ACCESS,
	EXPIRES_REFRESH,
	SEED,
} = process.env;
