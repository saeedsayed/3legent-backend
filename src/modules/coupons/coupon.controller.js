import STATUS from "../../constants/httpStatus.constant.js";
import appError from "../../utils/appError.js";
import user from "../users/user.model.js";
import coupon from "./coupon.model.js";
import { applyCoupon, checkCoupon, createCoupon } from "./coupon.service.js";

// ======================== apply coupon on cart ==========================
export const applyCouponController = async (req, res) => {
  const { code } = req.params;
  if (!code) {
    const err = appError.create("no code provide", 400, STATUS.FAIL);
    throw err;
  }
  const { userId } = req;
  const { cart } = await user.findById(userId);
  await checkCoupon(code);
  const data = await applyCoupon(code, cart);
  res.json({
    status: STATUS.SUCCESS,
    data,
  });
};
// ======================= create a new coupon ===========================
export const createCouponController = async (req, res) => {
  const { body } = req;
  const newCoupon = await createCoupon(body);
  res.json({
    status: STATUS.SUCCESS,
    message: "coupon created successful",
    data: newCoupon,
  });
};
// ====================== get all coupons =================================
export const getAllCouponsController = async (req, res) => {
  const {
    currentPage,
    nextPage,
    previousPage,
    totalDocuments,
    limit,
    totalPages,
    skip,
  } = req.pagination;
  const allCoupons = await coupon.find().skip(skip).limit(limit);
  res.json({
    status: STATUS.SUCCESS,
    data: allCoupons,
    result: totalDocuments,
    paginate: {
      currentPage: currentPage,
      nextPage: nextPage,
      previousPage: previousPage,
      totalPages: totalPages,
      limit: limit,
    },
  });
};
// =========================== update coupon ============================
export const updateCouponController = async (req, res) => {
  const { body, params } = req;
  const { id } = params;
  if (!id) {
    const err = appError.create("no coupon ID provide", 400, STATUS.FAIL);
    throw err;
  }
  const updatedCoupon = await coupon.findByIdAndUpdate(id, body, { new: true });
  res.json({
    status: STATUS.SUCCESS,
    message: "coupon was updated",
    data: updatedCoupon,
  });
};
