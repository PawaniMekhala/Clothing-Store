import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // inline error message

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError(null);
    };

    const validate = () => {
        if (!formData.firstName.trim() || !formData.lastName.trim()) {
            return 'First name and last name are required.';
        }
        if (!formData.email.trim()) {
            return 'Email is required.';
        }
        // Basic email pattern check
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            return 'Please enter a valid email address.';
        }
        if (formData.password.length < 6) {
            return 'Password must be at least 6 characters long.';
        }
        if (formData.password !== formData.confirmPassword) {
            return 'Passwords do not match.';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch('http://localhost:5500/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.firstName.trim(),
                    lastName: formData.lastName.trim(),
                    email: formData.email.trim(),
                    password: formData.password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                // backend error message
                setError(data.message || 'Registration failed. Please try again.');
                setLoading(false);
                return;
            }

            // Expected from your screenshot: { message, user: {...}, token: '...' }
            if (data.token) {
                // You can store token & user for subsequent requests. Consider httpOnly cookies in production.
                localStorage.setItem('token', data.token);
            }
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
            }

            // Navigate to homepage or dashboard
            setLoading(false);
            navigate('/');
        } catch (err) {
            setLoading(false);
            setError(err.message || 'Network error. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">Create your account</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                            sign in to your existing account
                        </Link>
                    </p>
                </div>

                <form className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    autoComplete="given-name"
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="input-field w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    placeholder="Enter your first name"
                                />
                            </div>

                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    autoComplete="family-name"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="input-field w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    placeholder="Enter your last name"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="input-field w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="input-field w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="Enter your password"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="input-field w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="Confirm your password"
                            />
                        </div>
                    </div>

                    {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full text-lg py-3 rounded-md bg-primary-600 hover:bg-primary-700 text-white disabled:opacity-60">
                            {loading ? 'Creating account...' : 'Create account'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
