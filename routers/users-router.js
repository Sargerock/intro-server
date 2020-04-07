import router from "express-promise-router";
import authGuard from "../middleware/auth-guard";
import { getUser } from "../controllers/users-controller";

// /api/users
const route = router();

route.get("/:username", authGuard, getUser);

export default route;
