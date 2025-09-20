import express from "express";
import { shortenUrl, redirectUrl } from "../controllers/urlcontroller";

const router = express.Router();

// Shorten URL
router.post("/shorten", shortenUrl);

// Redirect
router.get("/:code", redirectUrl);

export default router;
