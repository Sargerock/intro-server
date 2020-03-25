import authRouter from "./auth-router";
import postsRouter from "./posts-router";

export default app => {
	app.use("/api/auth", authRouter);
	app.use("/api/posts", postsRouter);
};
