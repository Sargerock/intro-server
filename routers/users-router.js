import createRouter from "express-promise-router";
import {authorizationGuard} from "../middleware/authorization-guard";
import {
	getUser,
	autocompleteUsername, updateUser,
} from "../controllers/users-controller";

// /api/users
const router = createRouter();

router.get("/autocomplete/:username", autocompleteUsername);
router.get("/:username", authorizationGuard, getUser);
router.put("/", authorizationGuard, updateUser);

export default router;
