import { configDotenv } from "dotenv";
import express from "express";
import { connectDB } from "./utils/db.js";
import CookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import v1Routes from "./routes/v1.routes.js";
configDotenv();
await connectDB();

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

v1Routes(app);

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
