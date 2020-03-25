import express from "express";

import {
	signUp,
	signIn,
	refresh,
	signOut
} from "../controllers/auth-controller";
import userValidator from "../middleware/user-validator";
import authRefreshGuard from "../middleware/auth-refresh-guard";
import authGuard from "../middleware/auth-guard";

//  /api/auth
const route = express.Router();

route.post("/sign-up", userValidator, signUp);
route.post("/sign-in", signIn);
route.post("/sign-out", authGuard, signOut);
route.post("/refresh", authRefreshGuard, refresh);

export default route;
