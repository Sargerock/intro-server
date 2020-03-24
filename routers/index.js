import authRouter from "./auth-router";

export default app => {
	app.use("/api/auth", authRouter);
};
