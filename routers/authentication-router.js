import createRouter from "express-promise-router";

import {
	signUp,
	signIn,
	getAuthenticatedUser,
} from "../controllers/authentication-controller";
import { authorizationGuard } from "../middleware/authorization-guard";
import { createRequestValidator } from "../utils";
import userSchema from "../utils/schemas/user-schema";

//  /api/auth
const router = createRouter();

router.post("/sign-up", createRequestValidator({ body: userSchema }), signUp);
router.post("/sign-in", signIn);
router.get("/user", authorizationGuard, getAuthenticatedUser);

export default router;
