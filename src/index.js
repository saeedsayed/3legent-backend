import { configDotenv } from 'dotenv';
import express from 'express';
import { connectDB } from './utils/db.js';
import CookieParser from 'cookie-parser';
import cors from 'cors'
import fileUpload from 'express-fileupload';
// routes
import productsRoutes from './routes/products.route.js';
import authRoutes from "./routes/auth.route.js"
import usersRouts from "./routes/users.route.js"
import categoriesRoutes from "./routes/categories.route.js"
import cartRouter from "./routes/carts.route.js"
import wishListRouter from "./routes/wishlist.route.js"
import generalRoutes from "./routes/general.route.js"
import mediaLibraryRoute from "./routes/mediaLibrary.route.js"
configDotenv();
connectDB()

const app = express();
const port = process.env.PORT || 4000;
const DEVELOP_MODE = process.env.NODE_ENV === 'development';

app.use(cors())
app.use(express.json());
app.use(CookieParser())
app.use(fileUpload({ useTempFiles: true }));

app.use('/api/v1/general', generalRoutes);
app.use('/api/v1/media-library', mediaLibraryRoute);
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/categories', categoriesRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRouts);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/wishlist', wishListRouter);

// handle 404 routes
app.use((req, res, next) => {
    res.status(404).json({ status: "error", message: "route not defined", code: 404 });
});
// handle errors globally
app.use((err, req, res, next) => {
    res.status(err.code || 500).json({
        status: err.status || "error",
        message: err.message || "internal server error",
        code: err.code,
        data: err.data
    })
})

app.listen(port, () => {
    if (DEVELOP_MODE) {
        console.log(`Server is running on port ${port} 🚀`);
    }else{
        console.log(`Server is running 🚀`);
    }
})