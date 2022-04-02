import express from "express";
import { requireSignin } from "../middlewares";
import {
  createPostController,
  imageUploadController,
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
module.exports = router;
