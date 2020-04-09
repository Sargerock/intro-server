import fs from "fs";
import path from "path";

const basename = path.basename(__filename);
const models = {};

export const initModels = (sequelize) => {
	fs.readdirSync(__dirname)
		.filter((file) => {
			return (
				file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
			);
		})
		.forEach((file) => {
			const model = sequelize["import"](path.join(__dirname, file));
			models[model.name] = model;
		});

	for (const key in models) {
		if (models[key].associate) {
			models[key].associate(models);
		}
	}
};

export { Auth } from "./auth";
export { Post } from "./post";
export { User } from "./user";
export { Tag } from "./tag";
