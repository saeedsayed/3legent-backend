# E-Commerce Backend

A comprehensive Node.js backend for a full-featured e-commerce application. Built with Express.js, MongoDB, and Stripe for payments. It provides RESTful APIs for authentication, product management, orders, payments, and more.

## Features

- **Authentication & Authorization**
  - User registration and JWT-based authentication
  - Role-based access control (Admin, User)
  - OTP verification

- **Product Management**
  - Product CRUD operations with ratings and reviews
  - Category management
  - Product reviews and ratings system

- **Shopping Features**
  - Shopping cart management
  - Wishlist functionality
  - Product filtering and pagination

- **Orders & Payments**
  - Order creation and management
  - Stripe payment integration with webhook support
  - Payment intent creation and handling
  - Order status tracking

- **Coupons & Discounts**
  - Coupon creation and validation
  - Discount calculation (percentage and fixed amount)
  - Usage limit tracking

- **Shipping**
  - Multiple shipping methods
  - Shipping cost calculation
  - Estimated delivery tracking

- **Additional Features**
  - Blogs management
  - Media library with Cloudinary integration
  - User addresses management
  - Email notifications (OTP, order updates)

## Project Structure

```
src/
├── index.js                    # Application entry point
├── constants/                  # Application constants
│   ├── httpStatus.constant.js
│   ├── otp.constant.js
│   └── roles.constant.js
├── middlewares/                # Express middlewares
│   ├── auth.middleware.js      # JWT verification & role authorization
│   ├── filter.middleware.js
│   ├── pagination.middleware.js
│   └── validate.middleware.js  # Request validation
├── modules/                    # Feature modules
│   ├── addresses/              # User address management
│   ├── auth/                   # Authentication
│   ├── blogs/                  # Blog posts
│   ├── carts/                  # Shopping cart
│   ├── categories/             # Product categories
│   ├── coupons/                # Discount coupons
│   ├── home/                   # Home page content
│   ├── mediaLibrary/           # Media file management
│   ├── orders/                 # Order management
│   ├── payments/               # Stripe payment processing
│   ├── products/               # Product management
│   ├── reviews/                # Product reviews
│   ├── shippingMethods/        # Shipping options
│   ├── users/                  # User management
│   └── wishlists/              # User wishlists
├── routes/
│   └── v1.routes.js            # API v1 route aggregation
└── utils/                      # Utility functions
    ├── appError.js             # Error handling
    ├── calculateCartSubTotal.js
    ├── cloudinary.js           # Image upload service
    ├── db.js                   # Database connection
    ├── generateOtp.js
    ├── generateToken.js        # JWT token generation
    ├── recalculateProductRating.js
    ├── sendEmail.js            # Email service
    ├── sendOtp.js
    └── stripe.config.js        # Stripe configuration
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- Stripe account (for payment processing)
- Cloudinary account (for image hosting)

### Installation

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd e-commerce
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```env
   # Server
   NODE_ENV=development
   PORT=4000

   # Database
   MONGO_DB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority

   # Authentication
   JWT_SECRET=your_jwt_secret_key_here

   # Cloudinary (Image Upload)
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   # Email Service (Nodemailer)
   NODEMAILER_EMAIL=your_email@gmail.com
   NODEMAILER_PASSWORD=your_app_password

   # Stripe Payment
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

### Running the Server

```bash
npm start
```

The server will start on `http://localhost:4000` by default.

## API Endpoints

All endpoints are prefixed with `/api/v1`

### Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh-token` - Refresh JWT token
- `POST /auth/send-otp` - Send OTP for verification

### Products

- `GET /products` - Get all products (with pagination)
- `GET /products/:id` - Get product details
- `POST /products` - Create product (Admin only)
- `PUT /products/:id` - Update product (Admin only)
- `DELETE /products/:id` - Delete product (Admin only)

### Categories

- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category details
- `POST /categories` - Create category (Admin only)
- `PUT /categories/:id` - Update category (Admin only)
- `DELETE /categories/:id` - Delete category (Admin only)

### Shopping Cart

- `GET /cart` - Get user's cart
- `POST /cart` - Add product to cart
- `DELETE /cart` - Remove product from cart
- `DELETE /cart/clear` - Clear entire cart

### Wishlist

- `GET /wishlist` - Get user's wishlist
- `POST /wishlist` - Add product to wishlist
- `DELETE /wishlist/:id` - Remove product from wishlist

### Orders

- `GET /orders/history` - Get user's orders
- `GET /orders/history/:id` - Get order details
- `GET /orders` - Get all orders (Admin only, paginated)

### Payments

- `POST /payment/create-payment-intent` - Create Stripe payment intent
- `POST /payment/webhook` - Stripe webhook handler

### Reviews

- `GET /review/:productId` - Get product reviews
- `POST /review/:productId` - Add review to product
- `PUT /review/:reviewId` - Update review
- `DELETE /review/:reviewId` - Delete review

### Coupons

- `GET /coupon` - Get all coupons (Admin only)
- `POST /coupon` - Create coupon (Admin only)
- `PUT /coupon/:id` - Update coupon (Admin only)
- `GET /coupon/:code` - Apply coupon to cart

### Shipping Methods

- `GET /shipping` - Get available shipping methods
- `POST /shipping` - Create shipping method (Admin only)
- `PUT /shipping/:id` - Update shipping method (Admin only)
- `DELETE /shipping/:id` - Delete shipping method (Admin only)

### Addresses

- `GET /addresses` - Get user's addresses
- `POST /addresses` - Create new address
- `GET /addresses/:id` - Get address details
- `PUT /addresses/:id` - Update address
- `DELETE /addresses/:id` - Delete address

### Blogs

- `GET /blogs` - Get all blogs
- `GET /blogs/:id` - Get blog details
- `POST /blogs` - Create blog (Admin only)
- `PUT /blogs/:id` - Update blog (Admin only)
- `DELETE /blogs/:id` - Delete blog (Admin only)

### Users

- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `GET /users` - Get all users (Admin only)

### Media Library

- `GET /media-library` - Get uploaded media files
- `POST /media-library` - Upload media file
- `DELETE /media-library/:id` - Delete media file

### Home

- `GET /home` - Get home page content
- `PUT /home` - Update home page content (Admin only)

## Technologies Used

- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Payments:** Stripe API
- **File Upload:** Cloudinary
- **Validation:** Zod
- **Email:** Nodemailer
- **Image Upload:** express-fileupload

## Error Handling

The application implements global error handling middleware that catches and formats errors consistently. All errors return a standardized response format:

```json
{
  "status": "error",
  "message": "Error description",
  "code": 400,
  "data": {}
}
```

## Database Schema

### Key Collections

- **Users** - User accounts and authentication
- **Products** - Product catalog
- **Categories** - Product categories
- **Orders** - Customer orders
- **Carts** - Shopping carts
- **Wishlists** - User wishlists
- **Reviews** - Product reviews and ratings
- **Coupons** - Discount coupons
- **ShippingMethods** - Available shipping options
- **Addresses** - User shipping addresses
- **Blogs** - Blog posts
- **Media** - Uploaded media files