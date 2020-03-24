import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const DB_NAME = process.env.DB_NAME;
export const USER_NAME = process.env.USER_NAME;
export const USER_PASSWORD = process.env.USER_PASSWORD;
export const HOST = process.env.HOST;
export const SECRET = process.env.SECRET;
export const EXPIRES_ACCESS = process.env.EXPIRES_ACCESS;
export const EXPIRES_REFRESH = process.env.EXPIRES_REFRESH;
