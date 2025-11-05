# Clothing E-Commerce Frontend

A modern, responsive clothing e-commerce website built with React, Vite, and Tailwind CSS.

## Features

- 🏠 **Home Page** - Hero banner, featured products, and category filters
- 📦 **Product Listing** - Show products by category with filters (color, size, price)
- 🔍 **Product Detail** - Detailed product info, image gallery, add to cart, and reviews
- 🛒 **Shopping Cart** - View cart items, update quantity, delete items, show total price
- 👤 **Authentication** - Login and register forms with JWT token management
- 📝 **User Profile** - View and update user info, upload profile picture
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Context API** - Global state management
- **React Hot Toast** - Toast notifications

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx      # Navigation bar
│   ├── Footer.jsx      # Footer component
│   ├── ProductCard.jsx # Product card component
│   ├── ReviewCard.jsx  # Review card component
│   └── CartItem.jsx    # Cart item component
├── pages/              # Page components
│   ├── Home.jsx        # Home page
│   ├── Products.jsx    # Product listing page
│   ├── ProductDetail.jsx # Product detail page
│   ├── Cart.jsx        # Shopping cart page
│   ├── Login.jsx       # Login page
│   ├── Register.jsx    # Registration page
│   └── Profile.jsx     # User profile page
├── context/            # Context providers
│   ├── AuthContext.jsx # Authentication context
│   └── CartContext.jsx # Shopping cart context
├── utils/              # Utility functions
│   └── api.js          # API configuration and endpoints
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Update this URL to match your backend API endpoint.

### 3. Configure Backend URL

Edit `src/utils/api.js` and update the `API_BASE_URL` if needed:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

Also check `vite.config.js` proxy settings if your backend is on a different port.

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Backend API Endpoints

The frontend expects the following API structure:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/profile/image` - Upload profile image
- `DELETE /api/auth/profile/image` - Delete profile image

### Products
- `GET /api/products` - Get all products
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/:id` - Get product by ID

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Delete cart item

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Add review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

## Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Key Features Explained

### Authentication Flow
- Users can register and login
- JWT tokens are stored in localStorage
- Tokens are automatically attached to API requests
- Protected routes redirect to login if not authenticated

### Shopping Cart
- Add products to cart with quantity, size, and color
- Update quantities in real-time
- Remove items from cart
- Calculate totals including shipping and tax

### Product Reviews
- View all reviews for a product
- Submit reviews with ratings (1-5 stars)
- Edit and delete own reviews
- Display average rating

### Responsive Design
- Mobile-first approach
- Works seamlessly on all device sizes
- Touch-friendly interface

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme.

### API Endpoints
All API endpoints are defined in `src/utils/api.js`. Update as needed for your backend.

### Styles
Global styles and custom classes are in `src/index.css`.

## License

MIT

