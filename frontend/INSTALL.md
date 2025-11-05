# 📦 Installation Guide

## Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (version 16 or higher recommended)
- **npm** (comes with Node.js) or **yarn**

Check your versions:
```bash
node --version  # Should be v16+
npm --version   # Should be 7+
```

---

## 🚀 Quick Install (3 Commands)

```bash
# 1. Navigate to project directory
cd /Users/epic/Desktop/New\ 1

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

That's it! Open `http://localhost:3000` in your browser.

---

## 📋 Detailed Installation Steps

### Step 1: Check Prerequisites

Verify Node.js is installed:
```bash
node --version
```

If not installed, download from: https://nodejs.org/

### Step 2: Install Dependencies

This will install all packages listed in `package.json`:

```bash
npm install
```

**What gets installed:**
- React & React DOM (UI framework)
- React Router (navigation)
- Axios (API calls)
- React Hot Toast (notifications)
- Tailwind CSS (styling)
- Vite (build tool)
- And all their dependencies

**Installation time:** Typically 30-60 seconds

### Step 3: Configure Backend (Optional)

If your backend runs on a different URL, create a `.env` file:

```bash
# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

Or manually create `.env` in the project root:
```env
VITE_API_URL=http://localhost:5000/api
```

**Default:** If no `.env` file, it uses `http://localhost:5000/api`

### Step 4: Start Development Server

```bash
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Step 5: Open in Browser

Navigate to: **http://localhost:3000**

---

## 🔧 Available Commands

After installation, you can use these commands:

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Production
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## 🐛 Troubleshooting

### Issue: "Command not found: npm"

**Solution:** Install Node.js from https://nodejs.org/

### Issue: "Port 3000 is already in use"

**Solution:** Kill the process using port 3000
```bash
# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Or change port in vite.config.js
```

### Issue: "npm ERR! Cannot find module"

**Solution:** Clean install
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Permission denied"

**Solution:** Use sudo (not recommended) or fix permissions
```bash
# Fix npm permissions (recommended)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
# Add to ~/.zshrc or ~/.bashrc:
export PATH=~/.npm-global/bin:$PATH
```

### Issue: Dependencies take too long

**Solution:** Use a faster registry
```bash
npm install --registry https://registry.npmjs.org/
```

Or use yarn:
```bash
npm install -g yarn
yarn install
```

### Issue: "Error: Cannot find module 'react'"

**Solution:** Reinstall dependencies
```bash
rm -rf node_modules
npm install
```

### Issue: Build errors

**Solution:** Clear cache and rebuild
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Issue: Styling not working

**Solution:** Restart dev server
```bash
# Stop server (Ctrl+C), then:
npm run dev
```

### Issue: Cannot connect to backend

**Checklist:**
- [ ] Backend server is running
- [ ] Backend URL is correct in `.env`
- [ ] No firewall blocking port
- [ ] Check backend CORS settings
- [ ] Check browser console for errors

---

## 📦 What Gets Installed

### Dependencies (Runtime)
- **react** ^18.2.0 - UI framework
- **react-dom** ^18.2.0 - React DOM rendering
- **react-router-dom** ^6.20.0 - Client-side routing
- **axios** ^1.6.2 - HTTP client
- **react-hot-toast** ^2.4.1 - Toast notifications

### Dev Dependencies (Build-time)
- **@vitejs/plugin-react** ^4.2.1 - Vite React plugin
- **vite** ^5.0.8 - Build tool & dev server
- **tailwindcss** ^3.3.6 - CSS framework
- **autoprefixer** ^10.4.16 - CSS autoprefixer
- **postcss** ^8.4.32 - CSS processor
- **@types/react** ^18.2.43 - TypeScript types
- **@types/react-dom** ^18.2.17 - TypeScript types

### Total Size
- node_modules: ~100-150 MB (typical)
- Installation time: 30-60 seconds

---

## 🔄 Update Dependencies

To update to latest versions:

```bash
# Check outdated packages
npm outdated

# Update a specific package
npm update package-name

# Update all packages (careful!)
npm update

# Or install latest versions manually
npm install package-name@latest
```

---

## 🗑 Clean Install

If you're having persistent issues:

```bash
# Remove everything
rm -rf node_modules package-lock.json dist

# Fresh install
npm install

# Start over
npm run dev
```

---

## ✅ Verify Installation

After installation, verify everything works:

```bash
# 1. Check node_modules exists
ls node_modules/

# 2. Verify package.json
cat package.json

# 3. Run dev server
npm run dev

# 4. Open browser: http://localhost:3000
```

You should see the home page with "FashionHub" header.

---

## 📝 Next Steps

After successful installation:

1. ✅ Start backend server
2. ✅ Run `npm run dev`
3. ✅ Open `http://localhost:3000`
4. ✅ Test all features
5. ✅ Read `README.md` for usage guide

---

## 🌐 Production Deployment

For production builds:

```bash
# Build
npm run build

# Preview
npm run preview
```

Output will be in the `dist/` folder, ready to deploy to:
- Vercel
- Netlify
- AWS S3
- Your own server

---

## 💡 Tips

1. **Use npm ci** for CI/CD pipelines
   ```bash
   npm ci  # Clean install from package-lock.json
   ```

2. **Check for security vulnerabilities**
   ```bash
   npm audit
   npm audit fix
   ```

3. **Use .nvmrc** for Node version management
   ```bash
   echo "16" > .nvmrc
   nvm use
   ```

4. **Keep dependencies updated**
   ```bash
   npm outdated
   npm update
   ```

---

## 📞 Still Having Issues?

1. Check error message carefully
2. Search for error on Google/GitHub
3. Check Node.js version
4. Try clean install
5. Check internet connection
6. Verify npm registry is accessible

---

**Installation complete!** 🎉

Run `npm run dev` to start building! 🚀

