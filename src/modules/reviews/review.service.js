import STATUS from "../../constants/httpStatus.constant.js";
import roles from "../../constants/roles.constant.js";
import appError from "../../utils/appError.js";
import recalculateProductRating from "../../utils/recalculateProductRating.js";
import user from "../users/user.model.js";
import review from "./review.model.js";

export const addReview = async (productId, userId, comment, rating) => {
  try {
    await review.create({
      product: productId,
      user: userId,
      comment,
      rating,
    });

    await recalculateProductRating(productId);
    return { comment, rating, productId };
  } catch (err) {
    if (err.code === 11000) {
      const err = appError.create(
        "You already reviewed this product",
        400,
        STATUS.FAIL
      );
      throw err;
    }
  }
};

export const getProductReviews = async (productId) => {
  const reviews = await review
    .find({ product: productId })
    .populate("user", "avatar email fullName");

  return reviews;
};

export const removeReview = async (reviewId, userId) => {
  const { role } = await user.findById(userId).select("role");
  const deletedReview = await review.findOneAndDelete(
    role === roles.ADMIN ? { _id: reviewId } : { _id: reviewId, user: userId }
  );
  if (!deletedReview) {
    const err = appError.create("review not found", 400, STATUS.FAIL);
    throw err;
  }
  await recalculateProductRating(deletedReview.product);
};


export const updateReview = async (reviewId, userId, update) => {
  const updatedReview = await review.findOneAndUpdate(
    {
      _id: reviewId,
      user: userId,
    },
    update,
    { new: true }
  );
  if (!updatedReview) {
    const err = appError.create("review not found", 400, STATUS.FAIL);
    throw err;
  }
  await recalculateProductRating(updatedReview.product);
  return updatedReview
};
