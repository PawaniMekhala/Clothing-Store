import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Profile = () => {
    const { user, updateProfile, uploadProfileImage, deleteProfileImage } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        setFormData({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
        });
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        await updateProfile(formData);
        setLoading(false);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB');
            return;
        }

        setUploading(true);

        console.debug('[Profile] uploading file:', { name: file.name, size: file.size, type: file.type });

        const result = await uploadProfileImage(file);

        setUploading(false);

        if (!result.success) {
            console.error('[Profile] upload failed:', result.error);
            alert(result.error || 'Upload failed');
        } else {
            console.debug('[Profile] upload success, updated user:', result.user);
        }
    };

    const handleDeleteImage = async () => {
        if (window.confirm('Are you sure you want to delete your profile image?')) {
            setUploading(true);
            await deleteProfileImage();
            setUploading(false);
        }
    };

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-2xl">
                <h1 className="text-4xl font-bold mb-8">My Profile</h1>

                {/* Profile Image Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4">Profile Picture</h2>
                    <div className="flex items-center space-x-6">
                        {user.profileImage ? (
                            <img
                                src={user.profileImage}
                                alt={user.name}
                                className="w-32 h-32 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-full bg-primary-600 flex items-center justify-center text-white text-4xl font-bold">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div>
                            <label className="btn-primary cursor-pointer inline-block">
                                {uploading ? 'Uploading...' : 'Upload Image'}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={uploading}
                                    className="hidden"
                                />
                            </label>
                            {user.profileImage && (
                                <button onClick={handleDeleteImage} disabled={uploading} className="btn-secondary ml-2">
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Profile Information Form */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="btn-primary w-full mt-6 text-lg py-3">
                            {loading ? 'Updating...' : 'Update Profile'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
