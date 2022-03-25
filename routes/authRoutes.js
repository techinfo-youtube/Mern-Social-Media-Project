import express from "express";
import { registerController, loginController } from "../controllers/authCtrl";
//router object
const router = express.Router();

//routes
//register route
router.post("/register", registerController);
//login route
router.post("/login", loginController);

module.exports = router;
