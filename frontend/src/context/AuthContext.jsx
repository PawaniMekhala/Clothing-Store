import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/api';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};

const normalizeUser = (u) => {
    if (!u) return null;
    const token = localStorage.getItem('token');
    return {
        id: u.UserID || u.id || null,
        name: `${u.FirstName || ''} ${u.LastName || ''}`.trim(),
        email: u.Email || u.email || '',
        phone: u.Phone || u.phone || '',
        address: u.Address || u.address || '',
        profileImage: u.ProfilePicture || u.profileImage || '',
        token: u.token || token || null,
    };
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return;
        }

        (async () => {
            try {
                const res = await authAPI.getProfile();
                const data = res.data;
                const serverUser = data.user || data;

                const normalized = normalizeUser(serverUser);
                setUser(normalized);
                localStorage.setItem('user', JSON.stringify(normalized));
            } catch (err) {
                console.error('Failed to fetch profile on mount', err);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setUser(null);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await authAPI.login({ email, password });
            const { token, user: userData } = response.data;

            const normalized = normalizeUser({ ...userData, token });
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(normalized));
            setUser(normalized);

            toast.success('Logged in successfully!');
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            toast.error(message);
            return { success: false, error: message };
        }
    };

    const register = async ({ firstName, lastName, email, password }) => {
        try {
            const res = await authAPI.register({ firstName, lastName, email, password });
            const { token, user: userData } = res.data;

            const normalized = normalizeUser({ ...userData, token });
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(normalized));
            setUser(normalized);

            toast.success('Registration successful!');
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed';
            toast.error(message);
            return { success: false, error: message };
        }
    };

    const updateProfile = async (data) => {
        try {
            const payload = {
                address: data.address || '',
                phone: data.phone || '',
            };

            const res = await authAPI.updateProfile(payload);
            const updated = res.data.user || res.data;

            const normalized = normalizeUser(updated);
            setUser(normalized);
            localStorage.setItem('user', JSON.stringify(normalized));

            toast.success('Profile updated successfully!');
            return { success: true, user: normalized };
        } catch (err) {
            console.error('updateProfile error', err);
            const message = err.response?.data?.message || 'Profile update failed';
            toast.error(message);
            return { success: false, error: message };
        }
    };

    const uploadProfileImage = async (file) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please log in again.');
                return { success: false, error: 'No auth token found' };
            }

            const formData = new FormData();
            formData.append('profilePicture', file);

            const response = await fetch('http://localhost:5500/api/users/profile/image', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const text = await response.text();
            let data;

            if (text.startsWith('<!DOCTYPE html>')) {
                alert('Session expired or server error. Please log in again.');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
                return { success: false, error: 'Invalid or expired token' };
            }

            try {
                data = JSON.parse(text);
            } catch {
                alert('Unexpected server response.');
                return { success: false, error: 'Invalid server response' };
            }

            if (!response.ok) {
                const message = data.message || 'Upload failed';
                alert(message);
                return { success: false, error: message };
            }

            const newProfileImage = data.imageUrl || data.user?.ProfilePicture || data.user?.profileImage;
            const updatedUser = { ...user, profileImage: newProfileImage };

            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));

            alert('Profile image updated successfully!');
            return { success: true, user: updatedUser };
        } catch (error) {
            console.error('Upload error:', error);
            alert('Something went wrong during upload.');
            return { success: false, error: error.message };
        }
    };

    const deleteProfileImage = async () => {
        try {
            const response = await fetch('http://localhost:5500/api/users/delete-profile-image', {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete image');
            }

            setUser((prev) => ({
                ...prev,
                profileImage: null,
            }));

            toast.success(data.message || 'Profile image deleted successfully!');
            return { success: true };
        } catch (error) {
            console.error('Delete image error:', error);
            toast.error(error.message || 'Error deleting profile image');
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        toast.success('Logged out successfully!');
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
