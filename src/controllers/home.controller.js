import home from "../models/home.model.js";
import product from "../models/product.model.js";
import STATUS from "../constants/httpStatus.constant.js";

// ==============================  Get News Bar ============================================
export const getNewsBar = async (req, res, next) => {
  try {
    const { newsbar } = await home.findOne({}, { newsbar: 1, _id: 0 });
    res.send({
      status: STATUS.SUCCESS,
      data: newsbar,
    });
  } catch (error) {
    next(error);
  }
};

// =============================  Get Hero Section ============================================
export const getHeroSection = async (req, res, next) => {
  try {
    const { heroImage } = await home.findOne({}, { heroImage: 1, _id: 0 });
    res.send({
      status: STATUS.SUCCESS,
      data: heroImage,
    });
  } catch (error) {
    next(error);
  }
};

// ============================  Get Featured Categories ============================================
export const getFeaturedCategories = async (req, res, next) => {
  try {
    const { featuredCategories } = await home
      .findOne({}, { featuredCategories: 1, _id: 0 })
      .populate("featuredCategories");
    res.send({
      status: STATUS.SUCCESS,
      data: featuredCategories,
    });
  } catch (error) {
    next(error);
  }
};

// ===========================  Get Latest Products ============================================
export const getLatestProducts = async (req, res, next) => {
  try {
    const latestProduct = await product
      // .find({ createdAt: { $gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) } }) // products added in last 30 days
      .find({})
      .sort({ createdAt: -1 })
      .limit(10);
    res.send({
      status: STATUS.SUCCESS,
      data: latestProduct,
    });
  } catch (error) {
    next(error);
  }
};

// ===========================  Get Featured Blogs ============================================
export const getFeaturedBlogs = async (req, res, next) => {
  try {
    const { featuredBlogs } = await home
      .findOne({}, { featuredBlogs: 1, _id: 0 })
      .populate("featuredBlogs")
      .populate({ path: "featuredBlogs", populate: { path: "author", select: "fullName email" } });
    res.send({
      status: STATUS.SUCCESS,
      data: featuredBlogs,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================  Update Home ============================================
export const updateHome = async (req, res, next) => {
  const update = req.body;
  const updatedHome = await home.findOneAndUpdate({}, update, {
    new: true,
  });
  if (!updatedHome) {
    const newHome = new home({
      newsbar: update.newsbar || "",
      heroImage: update.heroImage || [],
    });
    await newHome.save();
  }
  res.send({
    status: STATUS.SUCCESS,
    message: "home updated successfully",
  });
};
