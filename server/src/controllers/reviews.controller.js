import {
  getReviewProducBytId,
  createReview,
  updateReview,
  deleteReview,
} from "../models/reviews.model.js";

const getAllReviewsProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getReviewProducBytId(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Comentarios de producto no encontrado",
      });
    }
    res.status(200).json({
      success: true,
      data: product,
      message: "Comentarios de producto obtenidos correctamente",
    });
  } catch (error) {
    next(error);
  }
};

const createReviewController = async (req, res, next) => {
  try {
    const { product_id, user_id, rating, comment } = req.body;

    const newReview = await createReview(product_id, user_id, rating, comment);
    res.status(201).json({
      success: true,
      data: newReview,
      message: "Reseña creada correctamente",
    });
  } catch (error) {
    next(error);
  }
};

const updateReviewController = async (req, res, next) => {
  try {
    const { id_review } = req.params;
    const user_id = req.body.user_id;
    const { rating, comment } = req.body;

    const updatedReview = await updateReview(
      id_review,
      user_id,
      rating,
      comment
    );
    res.status(200).json({
      success: true,
      data: updatedReview,
      message: "Reseña actualizada correctamente",
    });
  } catch (error) {
    next(error);
  }
};

const deleteReviewController = async (req, res, next) => {
  console.log("deleteReviewController");
  try {
    const { id_review } = req.params;
    const user_id = req.body.user_id;

    const deletedReview = await deleteReview(id_review, user_id);
    res.status(200).json({
      success: true,
      data: deletedReview,
      message: "Reseña eliminada correctamente",
    });
  } catch (error) {
    next(error);
  }
};

const reviewsController = {
  getAllReviewsProduct,
  createReviewController,
  updateReviewController,
  deleteReviewController,
};

export default reviewsController;
