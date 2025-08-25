# E-Commerce Backend

This is a Node.js backend for an e-commerce application. It provides RESTful APIs for user authentication, product management, cart operations, and category management.

## Features

- User registration and authentication (JWT)
- Product CRUD operations
- Category CRUD operations
- Cart management
- WishList management
- Role-based access control

## Project Structure

```
src/
  index.js                # Entry point
  controllers/            # Route controllers
  middlewares/            # Express middlewares
  models/                 # Mongoose models
  routes/                 # API route definitions
  utils/                  # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

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
3. Set up environment variables (e.g., `.env` file):
   - `MONGODB_URI` - MongoDB connection string
   - `JWT_SECRET` - Secret key for JWT
   - `PORT` - Server port (default: 3000)

### Running the Server

```bash
npm start
```

## API Endpoints

- `/api/auth` - Authentication routes
- `/api/products` - Product routes
- `/api/categories` - Category routes
- `/api/carts` - Cart routes
- `/api/wishlists` - WishList routes
- `/api/users` - User routes

## License

MIT
