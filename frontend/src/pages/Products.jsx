import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';

const Products = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        color: '',
        size: '',
    });

    useEffect(() => {
        fetchProducts();
    }, [category]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = category
                ? await productAPI.getProductsByCategory(category)
                : await productAPI.getAllProducts();
            setProducts(response.data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const filteredProducts = products.filter((product) => {
        if (filters.minPrice && product.price < parseFloat(filters.minPrice)) return false;
        if (filters.maxPrice && product.price > parseFloat(filters.maxPrice)) return false;
        if (filters.color && product.color !== filters.color) return false;
        if (filters.size && product.sizes && !product.sizes.includes(filters.size)) return false;
        return true;
    });

    const clearFilters = () => {
        setFilters({
            minPrice: '',
            maxPrice: '',
            color: '',
            size: '',
        });
    };

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold">{category ? `${category}'s Fashion` : 'All Products'}</h1>
                    <p className="text-gray-600">{filteredProducts.length} products found</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full md:w-64 bg-white p-6 rounded-lg shadow-md h-fit sticky top-24">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold">Filters</h2>
                            <button onClick={clearFilters} className="text-primary-600 hover:text-primary-700 text-sm">
                                Clear All
                            </button>
                        </div>

                        {/* Price Range */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-3">Price Range</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={filters.minPrice}
                                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                                    className="input-field text-sm"
                                />
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={filters.maxPrice}
                                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                    className="input-field text-sm"
                                />
                            </div>
                        </div>

                        {/* Size Filter */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-3">Size</h3>
                            <select
                                value={filters.size}
                                onChange={(e) => handleFilterChange('size', e.target.value)}
                                className="input-field text-sm">
                                <option value="">All Sizes</option>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                            </select>
                        </div>

                        {/* Color Filter */}
                        <div>
                            <h3 className="font-semibold mb-3">Color</h3>
                            <select
                                value={filters.color}
                                onChange={(e) => handleFilterChange('color', e.target.value)}
                                className="input-field text-sm">
                                <option value="">All Colors</option>
                                <option value="Black">Black</option>
                                <option value="White">White</option>
                                <option value="Red">Red</option>
                                <option value="Blue">Blue</option>
                                <option value="Green">Green</option>
                                <option value="Yellow">Yellow</option>
                                <option value="Gray">Gray</option>
                                <option value="Navy">Navy</option>
                                <option value="Brown">Brown</option>
                            </select>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-gray-500 text-xl">No products found matching your filters.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.ProductID}
                                        product={{
                                            id: product.ProductID,
                                            name: product.ProductName,
                                            description: product.Description,
                                            price: product.price,
                                            image: product.ImagePath,
                                            color: product.ProductColor,
                                            size: product.ProductSize,
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
