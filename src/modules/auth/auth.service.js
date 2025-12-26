import cart from "../carts/cart.model.js";
import user from "../users/user.model.js";
import bcrypt from "bcryptjs";
import wishList from "../wishlists/wishList.model.js";
import appError from "../../utils/appError.js";
import STATUS from "../../constants/httpStatus.constant.js";

// create a new user
export const createUser = async ({ fullName, email, password }) => {
  const isExistingUser = await user.findOne({ email });
  if (isExistingUser) {
    const err = appError.create("email is already existing", 400, STATUS.FAIL);
    throw err;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new user({ fullName, email, password: hashedPassword });
  const newCart = new cart({ user: newUser._id, products: [], totalPrice: 0 });
  const newWishList = new wishList({ user: newUser._id, products: [] });
  newUser.cart = newCart._id;
  newUser.wishList = newWishList._id;
  await newWishList.save();
  await newCart.save();
  await newUser.save();
  delete newUser._doc.password;
  delete newUser._doc.__v;
  return newUser;
};

// check user credentials {email&password}
export const checkCredentials = async ({ email, password }) => {
  const targetUser = await user.findOne({ email }).select("+password");
  if (!targetUser) {
    const err = appError.create("invalid credentials", 400, STATUS.FAIL);
    throw err
  }
  const isCorrectPassword = await bcrypt.compare(password, targetUser.password);
  if (!isCorrectPassword) {
    const err = appError.create("invalid credentials", 400, STATUS.FAIL);
    throw err;
  }
  delete targetUser._doc.password;
  return(targetUser);
};
