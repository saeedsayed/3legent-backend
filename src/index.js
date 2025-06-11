import { configDotenv } from 'dotenv';
import express from 'express';
import { connectDB } from './utils/db.js';
import CookieParser from 'cookie-parser';
// routes
import productsRoutes from './routes/products.route.js';
import authRoutes from "./routes/auth.route.js"
import usersRouts from "./routes/users.route.js"
configDotenv();
connectDB()

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(CookieParser())

app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRouts);

// app.all("*", (req, res) => {
//   res.status(404).json({ message: "route not defined" });
// });

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
    console.log(`Server is running on port ${port}`);
})