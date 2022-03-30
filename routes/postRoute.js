import express from "express";
import { requireSignin } from "../middlewares";
import { createPostController } from "./../controllers/postCtrl";
//router object
const router = express.Router();

//routes
router.post("/createpost", requireSignin, createPostController);
module.exports = router;
