import createRouter from "express-promise-router";
import { authorizationGuard } from "../middleware/authorization-guard";
import {
	getUser,
	findUsersAutocomplete,
} from "../controllers/users-controller";

// /api/users
const router = createRouter();

router.get("/find/:username", authorizationGuard, findUsersAutocomplete);
router.get("/:username", authorizationGuard, getUser);

export default router;
