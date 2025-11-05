# Quick Setup Instructions

## Installation & Run

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Backend URL (Optional)
If your backend is running on a different URL, create a `.env` file:
```bash
echo "VITE_API_URL=http://localhost:5000/api" > .env
```
Or edit `src/utils/api.js` directly to update the API base URL.

### Step 3: Start Development Server
```bash
npm run dev
```

The application will open at `http://localhost:3000`

---

## Folder Structure Overview

```
clothing-ecommerce-frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx      # Top navigation bar
│   │   ├── Footer.jsx      # Footer component
│   │   ├── ProductCard.jsx # Product display card
│   │   ├── ReviewCard.jsx  # Review display card
│   │   └── CartItem.jsx    # Cart item component
│   │
│   ├── pages/              # Page components
│   │   ├── Home.jsx        # Landing page with hero & featured
│   │   ├── Products.jsx    # Product listing with filters
│   │   ├── ProductDetail.jsx # Product details & reviews
│   │   ├── Cart.jsx        # Shopping cart
│   │   ├── Login.jsx       # Login form
│   │   ├── Register.jsx    # Registration form
│   │   └── Profile.jsx     # User profile management
│   │
│   ├── context/            # Global state management
│   │   ├── AuthContext.jsx # Authentication state
│   │   └── CartContext.jsx # Shopping cart state
│   │
│   ├── utils/              # Helper functions
│   │   └── api.js          # Axios API configuration
│   │
│   ├── App.jsx             # Main app component & routing
│   ├── main.jsx            # App entry point
│   └── index.css           # Global Tailwind styles
│
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── README.md               # Full documentation

```

---

## Backend API Requirements

Your backend should implement these endpoints:

### Authentication
- `POST /api/auth/register` - `{name, email, password}` → `{token, user}`
- `POST /api/auth/login` - `{email, password}` → `{token, user}`
- `PUT /api/auth/profile` - `{name, email, phone}` → `{user}`
- `POST /api/auth/profile/image` - Multipart form with `image` file → `{user}`
- `DELETE /api/auth/profile/image` → `{user}`

### Products
- `GET /api/products` → `[{_id, name, description, price, image, category, gender, ...}]`
- `GET /api/products/category/:category` → `[{products}]`
- `GET /api/products/:id` → `{product}`

### Cart
- `GET /api/cart` → `[{_id, product, quantity, size, color}]`
- `POST /api/cart` - `{productId, quantity, size, color}` → `[{cartItems}]`
- `PUT /api/cart/:id` - `{quantity}` → `[{cartItems}]`
- `DELETE /api/cart/:id` → `[{cartItems}]`

### Reviews
- `GET /api/reviews/product/:productId` → `[{_id, user, rating, comment, createdAt}]`
- `POST /api/reviews` - `{productId, rating, comment}` → `{review}`
- `PUT /api/reviews/:id` - `{rating, comment}` → `{review}`
- `DELETE /api/reviews/:id` → `{success}`

---

## Features Implemented

✅ **Authentication**
- Register & Login forms
- JWT token management
- Protected routes
- Auto-logout on token expiry

✅ **Products**
- Browse by category (Men/Women/Kids)
- Filter by price, size, color
- Product details with image
- Featured products on home

✅ **Shopping Cart**
- Add/update/remove items
- Real-time quantity control
- Total calculation with tax & shipping
- Cart persistence via backend

✅ **Reviews**
- View product reviews
- Submit reviews with ratings
- Edit/delete own reviews
- Average rating display

✅ **User Profile**
- View/update profile info
- Upload/delete profile image
- Profile picture display

✅ **UI/UX**
- Responsive design (mobile-first)
- Loading states
- Error handling
- Toast notifications
- Modern Tailwind styling

---

## Troubleshooting

**Port Already in Use**
```bash
# Kill process on port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill

# Or change port in vite.config.js
```

**API Connection Issues**
- Check backend is running
- Verify API URL in `.env` or `src/utils/api.js`
- Check browser console for CORS errors
- Ensure backend accepts requests from `localhost:3000`

**Styling Issues**
- Clear browser cache
- Restart dev server: `npm run dev`
- Verify Tailwind compiled: check for `@tailwind` in `src/index.css`

---

## Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

Output will be in the `dist/` directory.

---

## Next Steps

1. Run `npm install` to install dependencies
2. Update backend URL if needed
3. Start backend server
4. Run `npm run dev` to start frontend
5. Navigate to `http://localhost:3000`

Enjoy your e-commerce frontend! 🎉

