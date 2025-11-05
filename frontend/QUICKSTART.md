# 🚀 Quick Start Guide

## Getting Started in 3 Steps

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Start the Development Server
```bash
npm run dev
```

### 3️⃣ Open in Browser
Navigate to: `http://localhost:3000`

---

## 📁 Complete Project Structure

```
clothing-ecommerce-frontend/
│
├── 📄 Configuration Files
│   ├── package.json              # Dependencies & scripts
│   ├── vite.config.js            # Vite build configuration
│   ├── tailwind.config.js        # Tailwind CSS configuration
│   ├── postcss.config.js         # PostCSS configuration
│   ├── index.html                # HTML entry point
│   └── .gitignore                # Git ignore rules
│
├── 📂 src/
│   ├── 📄 Entry Files
│   │   ├── main.jsx              # React app entry point
│   │   ├── App.jsx               # Main app & routing
│   │   └── index.css             # Global styles
│   │
│   ├── 📂 components/            # Reusable UI Components
│   │   ├── Navbar.jsx           # Navigation bar (sticky)
│   │   ├── Footer.jsx           # Footer with links
│   │   ├── ProductCard.jsx      # Product card with hover effects
│   │   ├── ReviewCard.jsx       # Review display & edit
│   │   └── CartItem.jsx         # Cart item with controls
│   │
│   ├── 📂 pages/                 # Page Components
│   │   ├── Home.jsx             # Landing page with hero
│   │   ├── Products.jsx         # Product listing & filters
│   │   ├── ProductDetail.jsx    # Product details & reviews
│   │   ├── Cart.jsx             # Shopping cart
│   │   ├── Login.jsx            # Login form
│   │   ├── Register.jsx         # Registration form
│   │   └── Profile.jsx          # User profile management
│   │
│   ├── 📂 context/               # Global State
│   │   ├── AuthContext.jsx      # Auth state & functions
│   │   └── CartContext.jsx      # Cart state & functions
│   │
│   └── 📂 utils/                 # Utilities
│       └── api.js               # Axios API configuration
│
└── 📄 Documentation
    ├── README.md                 # Full documentation
    ├── SETUP_INSTRUCTIONS.md     # Detailed setup guide
    └── QUICKSTART.md             # This file

```

---

## 🎯 Key Features

### ✨ Pages Implemented
- **Home Page** - Hero banner, featured products, category navigation
- **Product Listing** - Category-based browsing with filters
- **Product Detail** - Full product info, reviews, add to cart
- **Shopping Cart** - View, update, delete items with totals
- **Login/Register** - Authentication forms with validation
- **User Profile** - View/edit profile, upload profile picture

### 🎨 UI Components
- **Navbar** - Responsive nav with cart count, user menu
- **Footer** - Links and company info
- **ProductCard** - Hover effects, sale badges, quick add
- **ReviewCard** - Ratings, comments, edit/delete
- **CartItem** - Quantity controls, price calculations

### 🔐 State Management
- **AuthContext** - Login, register, profile management
- **CartContext** - Add/update/remove cart items
- **Persistent State** - JWT tokens in localStorage

### 📡 API Integration
- Axios interceptor for auth tokens
- Error handling & auto-logout
- Loading states for all API calls
- Toast notifications for feedback

---

## 🔧 Configuration

### Backend API URL
Default: `http://localhost:5000/api`

To change:
1. Create `.env` file: `VITE_API_URL=your-backend-url`
2. Or edit `src/utils/api.js` directly

### Vite Dev Server
Default port: `3000`

To change port, edit `vite.config.js`:
```javascript
server: {
  port: 3000  // Change this
}
```

---

## 📦 Build Scripts

```bash
# Development
npm run dev          # Start dev server with HMR

# Production
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## 🔗 API Endpoints Required

Your backend should implement:

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/profile/image` - Upload image
- `DELETE /api/auth/profile/image` - Delete image

### Products
- `GET /api/products` - Get all products
- `GET /api/products/category/:category` - Get by category
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart` - Get cart
- `POST /api/cart` - Add item
- `PUT /api/cart/:id` - Update item
- `DELETE /api/cart/:id` - Remove item

### Reviews
- `GET /api/reviews/product/:id` - Get reviews
- `POST /api/reviews` - Add review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

---

## 🐛 Common Issues

**Error: Port 3000 in use**
```bash
lsof -ti:3000 | xargs kill -9
```

**Error: Module not found**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Error: API connection failed**
- Check backend is running
- Verify API URL in `.env`
- Check CORS settings in backend
- Open browser console for details

**Styles not loading**
- Clear browser cache
- Restart dev server
- Check `index.css` imports

---

## 📱 Responsive Design

✅ Mobile-first approach
✅ Tablet optimized
✅ Desktop enhanced
✅ Touch-friendly controls
✅ Hamburger menu on mobile

---

## 🎨 Design Highlights

- Modern gradient hero sections
- Hover animations on cards
- Smooth transitions
- Loading spinners
- Toast notifications
- Clean typography
- Consistent spacing

---

## 🚀 Next Steps

1. ✅ Install: `npm install`
2. ✅ Configure backend URL (if different)
3. ✅ Start backend server
4. ✅ Run: `npm run dev`
5. ✅ Browse: `http://localhost:3000`

**You're all set!** 🎉

For more details, see `README.md` or `SETUP_INSTRUCTIONS.md`.

