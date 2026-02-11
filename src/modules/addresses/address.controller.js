import Address from "./address.modal.js";
import appError from "../../utils/appError.js";
import STATUS from "../../constants/httpStatus.constant.js";

export const createAddress = async (req, res, next) => {
  const payload = { ...req.body, user: req.userId };
  if (payload.isDefault) {
    await Address.updateMany(
      { user: req.userId, isDefault: true },
      { isDefault: false },
    );
  }
  const address = await Address.create(payload);
  res.json({
    status: STATUS.SUCCESS,
    data: address,
    message: "Address created",
  });
};

export const getAddresses = async (req, res, next) => {
  const addresses = await Address.find({ user: req.userId }).sort({
    createdAt: -1,
  });
  res.json({ status: STATUS.SUCCESS, data: addresses });
};

export const getAddress = async (req, res, next) => {
  const address = await Address.findOne({
    _id: req.params.id,
    user: req.userId,
  });
  if (!address) {
    const err = appError.create("Address not found", 404, STATUS.FAIL);
    return next(err);
  }
  res.json({ status: STATUS.SUCCESS, data: address });
};

export const updateAddress = async (req, res, next) => {
  const updates = { ...req.body };
  if (updates.isDefault) {
    await Address.updateMany(
      { user: req.userId, isDefault: true },
      { isDefault: false },
    );
  }
  const updated = await Address.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    updates,
    { new: true },
  );
  if (!updated) {
    const err = appError.create("Address not found", 404, STATUS.FAIL);
    return next(err);
  }
  res.json({
    status: STATUS.SUCCESS,
    data: updated,
    message: "Address updated",
  });
};

export const deleteAddress = async (req, res, next) => {
  const deleted = await Address.findOneAndDelete({
    _id: req.params.id,
    user: req.userId,
  });
  if (!deleted) {
    const err = appError.create("Address not found", 404, STATUS.FAIL);
    return next(err);
  }
  res.json({
    status: STATUS.SUCCESS,
    data: deleted,
    message: "Address deleted",
  });
};

export default {
  createAddress,
  getAddresses,
  getAddress,
  updateAddress,
  deleteAddress,
};
