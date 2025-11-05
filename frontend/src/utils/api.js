// src/utils/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5500/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// === AUTH APIs: MATCH BACKEND (uses "users" not "auth") ===
// Register expects: { firstName, lastName, email, password }
// Login expects: { email, password }
export const authAPI = {
    register: (data) => api.post('/users/register', data),
    login: (data) => api.post('/users/login', data),
    updateProfile: (data) => api.put('/users/profile', data),
    uploadProfileImage: (file) => {
        const formData = new FormData();
        formData.append('image', file);
        return api.post('/users/profile/image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    deleteProfileImage: () => api.delete('/users/profile/image'),
};

// other APIs (adjust paths if needed)
export const productAPI = {
    getAllProducts: () => api.get('/products'),
    getProductsByCategory: (category) => api.get(`/products/category/${category}`),
    getProductById: (id) => api.get(`/products/${id}`),
};

export const cartAPI = {
    getCart: () => api.get('/cart'),
    addToCart: (data) => api.post('/cart', data),
    updateCartItem: (itemId, data) => api.put(`/cart/${itemId}`, data),
    deleteCartItem: (itemId) => api.delete(`/cart/${itemId}`),
};

export const reviewAPI = {
    getReviews: (productId) => api.get(`/reviews/product/${productId}`),
    addReview: (data) => api.post('/reviews', data),
    updateReview: (reviewId, data) => api.put(`/reviews/${reviewId}`, data),
    deleteReview: (reviewId) => api.delete(`/reviews/${reviewId}`),
};

export default api;
