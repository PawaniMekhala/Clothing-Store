import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5500/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

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

// === API ENDPOINTS ===
export const authAPI = {
    register: (data) => api.post('/users/register', data),
    login: (data) => api.post('/users/login', data),
    getProfile: () => api.get('/users/profile'),
    updateProfile: (data) => api.put('/users/profile-info', data),
    uploadProfileImage: (file) => {
        const formData = new FormData();
        formData.append('profilePicture', file);
        return api.put('/users/profile/image', formData);
    },
    deleteProfileImage: () => api.delete('/users/profile/image'),
};

export const productAPI = {
    getAllProducts: () => api.get('/products/get-all-products'),
    getProductsByCategoryId: (categoryId) => api.get(`/products/category/${categoryId}`),
    getProductById: (productId) => api.get(`/products/${productId}`),
};

export const cartAPI = {
    getCart: () => api.get('/cart/view'),
    addToCart: (data) => api.post('/cart/add', data),
    updateCartItem: (productId, data) => api.put(`/cart/update-cart/${productId}`, data),
    deleteCartItem: (productId) => api.delete(`/cart/remove-item/${productId}`),
};

export const reviewAPI = {
    getReviews: (productId) => api.get(`/reviews/product/${productId}`),
    addReview: (data) => api.post('/reviews', data),
    updateReview: (reviewId, data) => api.put(`/reviews/${reviewId}`, data),
    deleteReview: (reviewId) => api.delete(`/reviews/${reviewId}`),
};

export default api;
