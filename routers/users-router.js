import router from "express-promise-router";
import authGuard from "../middleware/auth-guard";
import { getUser, findUsers } from "../controllers/users-controller";

// /api/users
const route = router();

route.get("/find/:username", authGuard, findUsers);
route.get("/:username", authGuard, getUser);

export default route;
