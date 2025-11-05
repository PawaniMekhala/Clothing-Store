import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">FashionHub</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/products/Men" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Men
            </Link>
            <Link to="/products/Women" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Women
            </Link>
            <Link to="/products/Kids" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Kids
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-primary-600 font-medium transition-colors relative">
              Cart
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-6 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3">
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <Link to="/profile" className="text-gray-700 hover:text-primary-600 font-medium">
                    {user?.name}
                  </Link>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-primary">
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden py-4">
          <div className="flex flex-col space-y-3">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">
              Home
            </Link>
            <Link to="/products/Men" className="text-gray-700 hover:text-primary-600 font-medium">
              Men
            </Link>
            <Link to="/products/Women" className="text-gray-700 hover:text-primary-600 font-medium">
              Women
            </Link>
            <Link to="/products/Kids" className="text-gray-700 hover:text-primary-600 font-medium">
              Kids
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-primary-600 font-medium">
              Cart ({getCartItemCount()})
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

