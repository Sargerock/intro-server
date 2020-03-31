import { initAuth } from "./auth";
import { initPost, Post } from "./post";
import { initUser, User } from "./user";

const initModels = sequelize => {
	initAuth(sequelize);
	initPost(sequelize);
	initUser(sequelize);

	User.hasMany(Post);
	Post.belongsTo(User);
};

export default initModels;
