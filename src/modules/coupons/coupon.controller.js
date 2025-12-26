import STATUS from "../../constants/httpStatus.constant.js";
import user from "../users/user.model.js";
import coupon from "./coupon.model.js";
import { applyCoupon, checkCoupon, createCoupon } from "./coupon.service.js";

export const applyCouponController = async (req, res) => {
  const { code } = req.params;
  const { userId } = req;
  const { cart } = await user.findById(userId);
  await checkCoupon(code);
  const data = await applyCoupon(code, cart);
  res.json({
    status: STATUS.SUCCESS,
    data,
  });
};

export const createCouponController = async (req, res) => {
  const { body } = req;
  const newCoupon = await createCoupon(body);
  res.json({
    status: STATUS.SUCCESS,
    message: "coupon created successful",
    data: newCoupon,
  });
};

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
