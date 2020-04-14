import createRouter from "express-promise-router";

import {
	getPosts,
	createPost,
	deletePost,
	updatePost,
	findTagsAutocomplete,
} from "../controllers/posts-controller";
import { authorizationGuard } from "../middleware/authorization-guard";
import { createRequestValidator } from "../utils";
import postSchema from "../utils/schemas/post-schema";
import postQuerySchema from "../utils/schemas/post-query-schema";
import { postAccessGuard } from "../middleware/post-access-guard";

//  /api/posts
const router = createRouter();

router.get("/find/:tag", authorizationGuard, findTagsAutocomplete);
router.get(
	"/:userName?",
	[authorizationGuard, createRequestValidator({ query: postQuerySchema })],
	getPosts
);
router.post(
	"/",
	[authorizationGuard, createRequestValidator({ body: postSchema })],
	createPost
);
router.delete("/:id", [authorizationGuard, postAccessGuard], deletePost);
router.put(
	"/:id",
	[
		authorizationGuard,
		createRequestValidator({ body: postSchema }),
		postAccessGuard,
	],
	updatePost
);

export default router;
