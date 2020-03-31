import Sequelize from "sequelize";

import { DB_NAME, USER_NAME, USER_PASSWORD, HOST } from "../config";
import initModels from "../models";

export const sequelize = new Sequelize(DB_NAME, USER_NAME, USER_PASSWORD, {
	host: HOST,
	dialect: "postgres",
	logging: false
});

initModels(sequelize);

export default sequelize;
