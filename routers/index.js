import Router from "express-promise-router";

import authRouter from "./authentication-router";
import postsRouter from "./posts-router";
import usersRouter from "./users-router";

const router = Router();

router.use("/api/auth", authRouter);
router.use("/api/users", usersRouter);
router.use("/api/posts", postsRouter);

export default router;
