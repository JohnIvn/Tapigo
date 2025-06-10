import express from "express";
import Newsletter from "../Controllers/newsletterController.js";

const router = express.Router();

router.post("/", Newsletter);

export default router;
