import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedProducts();
    }, []);

    const fetchFeaturedProducts = async () => {
        try {
            console.log('Fetching all products for featured section...');
            const response = await productAPI.getAllProducts();
            console.log('API Response:', response.data);

            // Adjust this based on your backend structure
            const allProducts = response.data.products || response.data || [];
            setFeaturedProducts(allProducts.slice(0, 8)); // show first 8
        } catch (error) {
            console.error(' Error fetching featured products:', error);
        } finally {
            setLoading(false);
        }
    };

    
    const categoryMap = {
        Men: 1,
        Women: 2,
        Kids: 3,
    };

    return (
        <div className="min-h-screen">
            
            <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl font-bold mb-6">Discover Your Style with FashionHub</h1>
                        <p className="text-xl mb-8 text-primary-100">
                            Explore our latest collection of trendy and affordable fashion for men, women, and kids.
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                to={`/products/category/${categoryMap.Men}`}
                                className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                                Shop Men
                            </Link>
                            <Link
                                to={`/products/category/${categoryMap.Women}`}
                                className="btn-secondary bg-transparent border-2 border-white hover:bg-white hover:text-primary-600">
                                Shop Women
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Men */}
                        <Link
                            to={`/products/category/${categoryMap.Men}`}
                            className="card overflow-hidden group cursor-pointer">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800"
                                    alt="Men's Fashion"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h3 className="text-white text-3xl font-bold">Men</h3>
                                </div>
                            </div>
                        </Link>

                        {/* Women */}
                        <Link
                            to={`/products/category/${categoryMap.Women}`}
                            className="card overflow-hidden group cursor-pointer">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800"
                                    alt="Women's Fashion"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h3 className="text-white text-3xl font-bold">Women</h3>
                                </div>
                            </div>
                        </Link>

                        {/* Kids */}
                        <Link
                            to={`/products/category/${categoryMap.Kids}`}
                            className="card overflow-hidden group cursor-pointer">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800"
                                    alt="Kids' Fashion"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h3 className="text-white text-3xl font-bold">Kids</h3>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                        </div>
                    ) : featuredProducts.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">No featured products available.</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product) => (
                                <ProductCard
                                    key={product.ProductID || product._id}
                                    product={{
                                        id: product.ProductID || product._id,
                                        name: product.ProductName || product.name,
                                        description: product.Description || product.description,
                                        price: product.Price || product.price,
                                        image: product.ImagePath || product.image,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
