import authRouter from "./auth-router";
import postsRouter from "./posts-router";
import usersRouter from "./users-router";

export default (app) => {
	app.use("/api/auth", authRouter);
	app.use("/api/users", usersRouter);
	app.use("/api/posts", postsRouter);
};
