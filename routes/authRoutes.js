import express from "express";
import { registerController } from "../controllers/authCtrl";
//router object
const router = express.Router();

//routes
//register route
router.post("/register", registerController);

module.exports = router;
