import createRouter from "express-promise-router";
import {authorizationGuard} from "../middleware/authorization-guard";
import {
	getUser,
	autocompleteUsername, updateUser, updateAvatar,
} from "../controllers/users-controller";
import {avatarUploadGuard} from "../middleware/avatar-upload-guard";

// /api/users
const router = createRouter();

router.get("/autocomplete/:username", autocompleteUsername);
router.get("/:username", authorizationGuard, getUser);
router.put("/", authorizationGuard, updateUser);
router.put("/upload/avatar", [authorizationGuard, avatarUploadGuard], updateAvatar);

export default router;
