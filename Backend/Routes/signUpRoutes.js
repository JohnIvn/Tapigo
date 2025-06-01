import express from "express";
import SignUp from "../Controllers/signUpController.js";

const router = express.Router();

router.post("/", SignUp);

export default router;
