import express from "express";

import {
	getPosts,
	createPost,
	deletePost,
	updatePost
} from "../controllers/posts-controller";
import authGuard from "../middleware/auth-guard";
import postQueryValidator from "../middleware/post-query-validator";

//  /api/posts
const route = express.Router();

route.get("/", postQueryValidator, getPosts);
route.post("/", authGuard, createPost);
route.delete("/:id", authGuard, deletePost);
route.put("/:id", authGuard, updatePost);

export default route;
