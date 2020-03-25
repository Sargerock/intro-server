import express from "express";

import {
	getPosts,
	createPost,
	deletePost,
	updatePost
} from "../controllers/posts-controller";
import authGuard from "../middleware/auth-guard";
import postQueryValidator from "../middleware/post-query-validator";
import { createBodyValidator } from "../utils";
import postSchema from "../utils/schemas/post-schema";

//  /api/posts
const route = express.Router();

route.get("/", postQueryValidator, getPosts);
route.post("/", [authGuard, createBodyValidator(postSchema)], createPost);
route.delete("/:id", authGuard, deletePost);
route.put("/:id", [authGuard, createBodyValidator(postSchema)], updatePost);

export default route;
