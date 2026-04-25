import express from "express";
import { addToWatchlist, removeFromWatchlist, updateWatchlistItem } from "../controllers/watchlistController.js";
import { authMiddleware } from "../middleware/authmiddleware.js";
import { validateRequest } from "../validators/watchlistValidator.js";
import { addToWatchlistSchema } from "../middleware/validateRequest.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validateRequest(addToWatchlistSchema), addToWatchlist);

router.put("/:id", updateWatchlistItem);

router.delete("/:id", removeFromWatchlist)

export default router;
