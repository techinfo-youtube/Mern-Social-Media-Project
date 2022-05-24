import express from "express";
import { canEditDeletePost, requireSignin } from "../middlewares";
import {
  createPostController,
  imageUploadController,
  userPostsController,
  userPostEditController,
  updatePostController,
  deletePostController,
} from "./../controllers/postCtrl";
import expressFormidable from "express-formidable";
//router object
const router = express.Router();

//routes
router.post("/createpost", requireSignin, createPostController);
//image upload route
router.post(
  "/upload-image",
  requireSignin,
  expressFormidable({ maxFieldsSize: 5 * 1024 * 1024 }),
  imageUploadController
);

//usepost
router.get("/user-post", requireSignin, userPostsController);
//userPOst Edit
router.get("/user-post/:_id", requireSignin, userPostEditController);
// update route
router.put(
  "/update-post/:_id",
  requireSignin,
  canEditDeletePost,
  updatePostController
);
//delete post
router.delete(
  "/delete-post/:_id",
  requireSignin,
  canEditDeletePost,
  deletePostController
);

module.exports = router;
