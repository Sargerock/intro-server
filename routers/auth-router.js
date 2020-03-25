import express from "express";

import {
	signUp,
	signIn,
	refresh,
	signOut
} from "../controllers/auth-controller";
import authRefreshGuard from "../middleware/auth-refresh-guard";
import authGuard from "../middleware/auth-guard";
import { createBodyValidator } from "../utils";
import userSchema from "../utils/schemas/user-schema";

//  /api/auth
const route = express.Router();

route.post("/sign-up", createBodyValidator(userSchema), signUp);
route.post("/sign-in", signIn);
route.post("/sign-out", authGuard, signOut);
route.post("/refresh", authRefreshGuard, refresh);

export default route;
