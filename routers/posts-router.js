import express from "express";

import {
	getPosts,
	createPost,
	deletePost,
	updatePost
} from "../controllers/posts-controller";
import authGuard from "../middleware/auth-guard";
import { createRequestValidator } from "../utils";
import postSchema from "../utils/schemas/post-schema";
import postQuerySchema from "../utils/schemas/post-query-schema";

//  /api/posts
const route = express.Router();

route.get(
	"/",
	[authGuard, createRequestValidator(null, null, postQuerySchema)],
	getPosts
);
route.post("/", [authGuard, createRequestValidator(postSchema)], createPost);
route.delete("/:id", authGuard, deletePost);
route.put("/:id", [authGuard, createRequestValidator(postSchema)], updatePost);

export default route;
