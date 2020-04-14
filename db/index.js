import { Sequelize } from "sequelize";

import { DB_NAME, DB_USERNAME, DB_USER_PASSWORD, HOST, SEED } from "../config";
import { initModels } from "../models";
import dbSeed from "./db-seed";

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_USER_PASSWORD, {
	host: HOST,
	dialect: "postgres",
	logging: false,
});

initModels(sequelize);

export default sequelize;
