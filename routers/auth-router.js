import router from "express-promise-router";

import {
	signUp,
	signIn,
	refresh,
	signOut,
	getAuthorizedUser,
} from "../controllers/auth-controller";
import authRefreshGuard from "../middleware/auth-refresh-guard";
import authGuard from "../middleware/auth-guard";
import { createRequestValidator } from "../utils";
import userSchema from "../utils/schemas/user-schema";

//  /api/auth
const route = router();

route.post("/sign-up", createRequestValidator(userSchema), signUp);
route.post("/sign-in", signIn);
route.post("/sign-out", authGuard, signOut);
route.post("/refresh", authRefreshGuard, refresh);
route.get("/user", authGuard, getAuthorizedUser);

export default route;
