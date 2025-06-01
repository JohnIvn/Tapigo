import express from "express";
import SignIn from "../Controllers/signInController.js";

const router = express.Router();

router.post("/", SignIn);

export default router;
