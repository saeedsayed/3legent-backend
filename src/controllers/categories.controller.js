import { validationResult } from "express-validator";
import appError from "../utils/appError.js";
import  STATUS  from "../utils/httpStatus.js";
import { isValidObjectId } from "mongoose";
import category from "../models/categories.model.js";

// ===================================================================
const getCategories = async (req, res) => {
    const categories = await category.find().select('-__v')
    const categoriesLength = await category.find().countDocuments()
    res.send({
        status: STATUS.SUCCESS,
        data: { categories, total: categoriesLength }
    });
}
// ====================================================================
const createCategory = async (req, res, next) => {
    const result = validationResult(req)
    const categoryData = req.body;
    if (!result.isEmpty()) {
        const errorsMsg = result.array().map(e => (e.msg))
        const err = appError.create(errorsMsg.join(' & '), 400, STATUS.FAIL)
        return next(err)
    }
    const isCategoryExists = await category.findOne({ name: categoryData.name })
    if (isCategoryExists) {
        const err = appError.create("category already exists", 400, STATUS.FAIL)
        return next(err)
    }
    const newCategory = new category(categoryData)
    await newCategory.save()
    res.json({
        status: STATUS.SUCCESS,
        data: newCategory,
        message: "category created successfully"
    }).end();
}
// ====================================================================
const updateCategory = async (req, res, next) => {
    const { id } = req.params;
    const update = req.body
    const isValidID = isValidObjectId(id)
    if (!isValidID) {
        const err = appError.create("invalid category id", 400, STATUS.FAIL)
        return next(err)
    }
    const updatedCategory = await category.findByIdAndUpdate(id, update, { new: true }).select('-__v')
    if (!updatedCategory) {
        const err = appError.create("category not found", 404, STATUS.FAIL)
        return next(err)
    }

    res.send({
        status: STATUS.SUCCESS,
        data: updatedCategory,
        message:"category updated successfully"
    });
}
// ====================================================================
const deleteCategory = async (req, res, next) => {
    const { id } = req.params;
    const isValidID = isValidObjectId(id)
    if (!isValidID) {
        const err = appError.create("invalid category id", 400, STATUS.FAIL)
        return next(err)
    }
    const deletedCategory = await category.findByIdAndDelete(id).select('-__v')
    if (!deletedCategory) {
        const err = appError.create("category not found", 404, STATUS.FAIL)
        return next(err)
    }
    res.send({
        status: STATUS.SUCCESS,
        data: deletedCategory,
        message: "category deleted successfully"
    });
}

export { getCategories, createCategory, updateCategory, deleteCategory };
