import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { handleValidationErrors } from "../middlewares/reviews.middleware.js";
import reviewsController from "../controllers/reviews.controller.js";

const router = Router();

router.get("/product/:id", reviewsController.getAllReviewsProduct);
router.post(
  "/",
  authMiddleware,
  handleValidationErrors,
  reviewsController.createReviewController
);
router.put(
  "/:id_review",
  authMiddleware,
  handleValidationErrors,
  reviewsController.updateReviewController
);
router.delete(
  "/:id_review",
  authMiddleware,
  reviewsController.deleteReviewController
);

export default router;
