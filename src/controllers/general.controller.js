import category from "../models/categories.model.js";
import general from "../models/general.model.js";
import product from "../models/product.model.js";
import STATUS from "../utils/httpStatus.js";

export const getGeneral = async (req, res, next) => {
  const generals = await general.findOne().select("-_id");
  const popularCategories = await category
    .find()
    .sort({ createdAt: -1 })
    .limit(3);
  const arrivalsProducts = await product
    .find()
    .sort({ createdAt: -1 })
    .limit(12);
  const data = {
    ...generals._doc,
    popularCategories,
    arrivalsProducts,
  };
  res.send({
    status: STATUS.SUCCESS,
    data,
  });
};

export const updateGeneral = async (req, res, next) => {
  const update = req.body;
  const updatedGeneral = await general.findOneAndUpdate({}, update, {
    new: true,
  });
  if (!updatedGeneral) {
    const newGeneral = new general({
      newsbar: update.newsbar || "",
      heroImage: update.heroImage || [],
    });
    await newGeneral.save();
  }
  res.send({
    status: STATUS.SUCCESS,
    message: "general updated successfully",
  });
};
