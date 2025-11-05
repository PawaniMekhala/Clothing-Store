import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/api';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load stored user & token on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (storedUser && token) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing stored user:', error);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    // login unchanged
    // const login = async (email, password) => {
    //     try {
    //         const response = await authAPI.login({ email, password });
    //         const { token, user: userData } = response.data;

    //         localStorage.setItem('token', token);
    //         localStorage.setItem('user', JSON.stringify(userData));
    //         setUser(userData);

    //         toast.success('Logged in successfully!');
    //         return { success: true };
    //     } catch (error) {
    //         const message = error.response?.data?.message || 'Login failed';
    //         toast.error(message);
    //         return { success: false, error: message };
    //     }
    // };
    // debug-friendly login
    const login = async (email, password) => {
        try {
            console.debug('[Auth] login request payload:', { email, password });

            const response = await authAPI.login({ email, password });

            console.debug('[Auth] login response status:', response.status);
            console.debug('[Auth] login response.data:', response.data);

            // adapt to whatever your backend returns — this assumes { token, user } on success
            const { token, user: userData } = response.data;

            if (!token || !userData) {
                // unexpected success-shape — log and return helpful error
                console.warn('[Auth] login: missing token/user in response', response.data);
                return { success: false, error: 'Login succeeded but response missing token or user.' };
            }

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);

            // ensure axios interceptor will read the token from localStorage on next requests
            // (your api interceptor already sets header from localStorage)

            toast.success('Logged in successfully!');
            return { success: true };
        } catch (err) {
            // Detailed logging for debugging:
            console.error('[Auth] login error:', err);

            // If axios error with response, log that body too
            const resp = err.response;
            if (resp) {
                console.error('[Auth] login error response.status:', resp.status);
                console.error('[Auth] login error response.data:', resp.data);
            } else {
                console.error('[Auth] login no response (network or CORS)', err.message);
            }

            // derive error message for UI
            const message =
                resp?.data?.message ||
                resp?.data?.error ||
                (resp && JSON.stringify(resp.data)) ||
                err.message ||
                'Login failed';

            toast.error(message);
            return { success: false, error: message };
        }
    };

    // register now accepts an object with firstName & lastName
    // Usage: register({ firstName, lastName, email, password })
    const register = async ({ firstName, lastName, email, password }) => {
        try {
            const payload = {
                firstName: firstName?.trim(),
                lastName: lastName?.trim(),
                email: email?.trim(),
                password,
            };

            const response = await authAPI.register(payload);
            // Expecting response.data to include { token, user }
            const { token, user: userData } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);

            toast.success('Registration successful!');
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed';
            toast.error(message);
            return { success: false, error: message };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        toast.success('Logged out successfully!');
    };

    const updateProfile = async (data) => {
        try {
            const response = await authAPI.updateProfile(data);
            // assume API returns the updated user object in response.data
            const updatedUser = response.data;

            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);

            toast.success('Profile updated successfully!');
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Update failed';
            toast.error(message);
            return { success: false, error: message };
        }
    };

    const uploadProfileImage = async (file) => {
        try {
            const response = await authAPI.uploadProfileImage(file);
            const updatedUser = response.data;

            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);

            toast.success('Profile image uploaded successfully!');
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Upload failed';
            toast.error(message);
            return { success: false, error: message };
        }
    };

    const deleteProfileImage = async () => {
        try {
            const response = await authAPI.deleteProfileImage();
            const updatedUser = response.data;

            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);

            toast.success('Profile image deleted successfully!');
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Delete failed';
            toast.error(message);
            return { success: false, error: message };
        }
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        uploadProfileImage,
        deleteProfileImage,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
