import Sequelize from "sequelize";

import UserModel from "./models/user";
import AuthModel from "./models/auth";
import PostModel from "./models/post";
import { DB_NAME, USER_NAME, USER_PASSWORD, HOST } from "./config";

export const sequelize = new Sequelize(DB_NAME, USER_NAME, USER_PASSWORD, {
	host: HOST,
	dialect: "postgres",
	logging: false
});

export const User = UserModel(sequelize, Sequelize);
export const Auth = AuthModel(sequelize, Sequelize);
export const Post = PostModel(sequelize, Sequelize);

User.hasMany(Post);
Post.belongsTo(User);

export default sequelize;
