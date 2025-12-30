import mongoose from "mongoose";
import product from "../modules/products/product.model.js";
import review from "../modules/reviews/review.model.js";

const recalculateProductRating = async (productId) => {
  const productObjectId = new mongoose.Types.ObjectId(productId);
  const stats = await review.aggregate([
    { $match: { product: productObjectId } },
    {
      $group: {
        _id: "$product",
        avgRating: { $avg: "$rating" },
        count: { $sum: 1 },
      },
    },
  ]);
  if (stats.length === 0) {
    await product.findByIdAndUpdate(productId, {
      rating: 0,
      reviewsCount: 0,
    });
  } else {
    await product.findByIdAndUpdate(productId, {
      rating: Number(stats[0].avgRating.toFixed(1)),
      reviewsCount: stats[0].count,
    });
  }
};

export default recalculateProductRating;
