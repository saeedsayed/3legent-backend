import appError from "../utils/appError.js";
import STATUS from "../utils/httpStatus.js";
import product from "../models/product.model.js";
import { isValidObjectId } from "mongoose";

// ===================================================================
const getAllProducts = async (req, res) => {
  const { pagination, filter } = req;
  const { currentPage, nextPage, previousPage, totalDocuments, limit, totalPages, skip } =
    pagination;
  const products = await product.find(filter).skip(skip).limit(limit);
  res.send({
    status: STATUS.SUCCESS,
    data: products,
    results: totalDocuments,
    paginate: {
      currentPage: currentPage,
      nextPage: nextPage,
      previousPage: previousPage,
      totalPages: totalPages,
      limit: limit,
    },
  });
};
// ====================================================================
const getSingleProduct = async (req, res, next) => {
  const { id } = req.params;
  const isValidID = isValidObjectId(id);
  if (!isValidID) {
    const err = appError.create("invalid product id", 400, STATUS.FAIL);
    return next(err);
  }
  const targetProduct = await product.findById(id);
  if (!targetProduct) {
    const err = appError.create("product not found", 404, STATUS.FAIL);
    return next(err);
  }
  res.send({
    status: STATUS.SUCCESS,
    data: targetProduct,
  });
};
// ====================================================================
const createProduct = async (req, res, next) => {
  const productData = req.body;
  const newProduct = new product(productData);
  await newProduct.save();
  res
    .json({
      status: STATUS.SUCCESS,
      data: newProduct,
      message: "product created successfully",
    })
    .end();
};
// ====================================================================
const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const update = req.body;
  const isValidID = isValidObjectId(id);
  if (!isValidID) {
    const err = appError.create("invalid product id", 400, STATUS.FAIL);
    return next(err);
  }
  const updatedProduct = await product.findByIdAndUpdate(id, update, {
    new: true,
  });
  if (!updatedProduct) {
    const err = appError.create("product not found", 404, STATUS.FAIL);
    return next(err);
  }

  res.send({
    status: STATUS.SUCCESS,
    data: updatedProduct,
    message: "product updated successfully",
  });
};
// ====================================================================
const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const isValidID = isValidObjectId(id);
  if (!isValidID) {
    const err = appError.create("invalid product id", 400, STATUS.FAIL);
    return next(err);
  }
  const deletedProduct = await product.findByIdAndDelete(id);
  if (!deletedProduct) {
    const err = appError.create("product not found", 404, STATUS.FAIL);
    return next(err);
  }
  res.send({
    status: STATUS.SUCCESS,
    data: deletedProduct,
    message: "product deleted successfully",
  });
};

export {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
