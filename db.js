import Sequelize from "sequelize";

import UserModel from "./models/user";
import AuthModel from "./models/auth";
import { DB_NAME, USER_NAME, USER_PASSWORD, HOST } from "./config";

export const sequelize = new Sequelize(DB_NAME, USER_NAME, USER_PASSWORD, {
	host: HOST,
	dialect: "postgres"
});

export const User = UserModel(sequelize, Sequelize);
export const Auth = AuthModel(sequelize, Sequelize);

export default sequelize;
