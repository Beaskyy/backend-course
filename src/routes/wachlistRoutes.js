import express from "express";
import { addToWatchlist } from "../controllers/watchlistController.js";
import { authMiddleware } from "../middleware/authmiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", addToWatchlist);

export default router;
