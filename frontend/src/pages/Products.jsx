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
            let response;
            if (category) {
                if (!isNaN(Number(category))) {
                    response = await productAPI.getProductsByCategoryId(category);
                } else {
                    response = await productAPI.getAllProducts();
                }
            } else {
                response = await productAPI.getAllProducts();
            }

            const all = response.data?.products ?? response.data?.productList ?? [];
            let filtered = all;

            if (category && isNaN(Number(category))) {
                filtered = all.filter((p) => {
                    const catName = p?.Category?.CategoryName ?? p?.category ?? p?.gender;
                    return catName?.toLowerCase() === String(category).toLowerCase();
                });
            }

            setProducts(filtered);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const filteredProducts = products.filter((product) => {
        const price = parseFloat(product.Price ?? product.price ?? 0);
        const color = product.ProductColor ?? product.color ?? '';
        const rawSizes = product.sizes ?? product.Sizes ?? product.ProductSize ?? product.size ?? '';
        let sizes = [];
        if (Array.isArray(rawSizes)) sizes = rawSizes;
        else if (typeof rawSizes === 'string' && rawSizes.includes(','))
            sizes = rawSizes.split(',').map((s) => s.trim());
        else if (rawSizes) sizes = [String(rawSizes)];

        if (filters.minPrice && price < parseFloat(filters.minPrice)) return false;
        if (filters.maxPrice && price > parseFloat(filters.maxPrice)) return false;
        if (filters.color && color.toLowerCase() !== filters.color.toLowerCase()) return false;
        if (filters.size && !sizes.includes(filters.size)) return false;
        return true;
    });

    const clearFilters = () => {
        setFilters({ minPrice: '', maxPrice: '', color: '', size: '' });
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
                                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
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
                                {['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Gray', 'Navy', 'Brown'].map(
                                    (c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    )
                                )}
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
                                <p className="text-gray-500 text-xl">No products found.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.ProductID ?? product.id ?? product._id}
                                        product={product}
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
