import STATUS from "../constants/httpStatus.constant";
import ShippingMethods from "../models/shippingMethods.model";
import appError from "../utils/appError";

export const getShippingMethods = async (req, res, next) => {
  const shippingMethods = await ShippingMethods.find();
  res.json({
    status: STATUS.SUCCESS,
    date: shippingMethods,
  });
};

export const createShippingMethod = async (req, res, next) => {
  try {
    const { name, description, cost, estimatedDeliveryDays, regions } =
      req.body;
    const newShippingMethod = new ShippingMethods({
      name,
      description,
      cost,
      estimatedDeliveryDays,
      regions,
    });
    await newShippingMethod.save();
    res.status(201).json({
      status: STATUS.SUCCESS,
      data: newShippingMethod,
    });
  } catch (error) {
    next(error);
  }
};

export const getShippingMethodById = async (req, res, next) => {
  try {
    const shippingMethodId = req.params.id;
    const shippingMethod = await ShippingMethods.findById(shippingMethodId);
    if (!shippingMethod) {
      const err = appError.create(
        "Shipping method not found",
        404,
        STATUS.FAIL
      );
      return next(err);
    }
    res.json({
      status: STATUS.SUCCESS,
      data: shippingMethod,
    });
  } catch (error) {
    next(error);
  }
};
export const updateShippingMethod = async (req, res, next) => {
  try {
    const shippingMethodId = req.params.id;
    const { name, description, cost, estimatedDeliveryDays, regions } =
      req.body;
    const updatedShippingMethod = await ShippingMethods.findByIdAndUpdate(
      shippingMethodId,
      {
        name,
        description,
        cost,
        estimatedDeliveryDays,
        regions,
      },
      { new: true }
    );
    if (!updatedShippingMethod) {
      const err = appError.create(
        "Shipping method not found",
        404,
        STATUS.NOT_FOUND
      );
      return next(err);
    }
    res.json({
      status: STATUS.SUCCESS,
      data: updatedShippingMethod,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteShippingMethod = async (req, res, next) => {
  try {
    const shippingMethodId = req.params.id;
    const deletedShippingMethod = await ShippingMethods.findByIdAndDelete(
      shippingMethodId
    );
    if (!deletedShippingMethod) {
      const err = appError.create(
        "Shipping method not found",
        404,
        STATUS.NOT_FOUND
      );
      return next(err);
    }
    res.json({
      status: STATUS.SUCCESS,
      message: "Shipping method deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
