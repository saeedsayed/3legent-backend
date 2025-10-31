import { configDotenv } from "dotenv";
import express from "express";
import { connectDB } from "./utils/db.js";
import CookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
// routes
import productsRoute from "./routes/products.route.js";
import authRoute from "./routes/auth.route.js";
import usersRout from "./routes/users.route.js";
import categoriesRoute from "./routes/categories.route.js";
import cartRoute from "./routes/carts.route.js";
import wishListRoute from "./routes/wishlist.route.js";
import homeRoute from "./routes/home.route.js";
import mediaLibraryRoute from "./routes/mediaLibrary.route.js";
import blogsRoute from "./routes/blogs.route.js";
import shippingMethodsRoute from "./routes/shippingMethods.route.js"
configDotenv();
connectDB();

const app = express();
const port = process.env.PORT || 4000;
const DEVELOP_MODE = process.env.NODE_ENV === "development";

app.use(cors());
app.use(express.json());
app.use(CookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/home", homeRoute);
app.use("/api/v1/media-library", mediaLibraryRoute);
app.use("/api/v1/products", productsRoute);
app.use("/api/v1/categories", categoriesRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", usersRout);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/wishlist", wishListRoute);
app.use("/api/v1/blogs", blogsRoute);
app.use("/api/v1/shipping", shippingMethodsRoute)

// handle 404 routes
app.use((req, res, next) => {
  res
    .status(404)
    .json({ status: "error", message: "route not defined", code: 404 });
});
// handle errors globally
app.use((err, req, res, next) => {
  console.log("err", err);
  res.status(err.code || 500).json({
    status: err.status || "error",
    message: err.message || "internal server error",
    code: err.code,
    data: err.data,
  });
});

app.listen(port, () => {
  if (DEVELOP_MODE) {
    console.log(`Server is running on port ${port} 🚀`);
  } else {
    console.log(`Server is running 🚀`);
  }
});
