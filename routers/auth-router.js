import express from "express";

import {
	signUp,
	signIn,
	refresh,
	signOut
} from "../controllers/auth-controller";
import userValidator from "../middleware/user-validator";
import authRefreshGuard from "../middleware/auth-refresh-guard";

//  /api/auth
const route = express.Router();

route.post("/sign-up", userValidator, signUp);
route.post("/sign-in", signIn);
route.post("/sign-out", signOut);
route.post("/refresh", authRefreshGuard, refresh);

export default route;
