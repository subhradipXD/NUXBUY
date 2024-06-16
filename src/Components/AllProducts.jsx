import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Include/Navbar';

const AllProducts = () => {
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const baseURL = "https://fakestoreapi.com/products";

    async function getProducts() {
        try {
            const response = await axios.get(selectedCategory ? `${baseURL}/category/${selectedCategory}` : baseURL);
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getCategories() {
        try {
            const response = await axios.get(`${baseURL}/categories`);
            setCategories(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        getProducts();
    }, [selectedCategory]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    if (!products) {
        return (
            <>
                <Navbar />
                <div className="flex justify-center items-center h-screen">
                    <div className="text-center">Loading...</div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                {/* Dropdown menu */}
                <div className="flex justify-center mb-4">
                    <label htmlFor="category-select" className="mr-2">Select Category:</label>
                    <select
                        id="category-select"
                        className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                {/* Grid of products */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <Link key={product.id} to={`/product/${product.id}`}>
                            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-2xl transition-shadow duration-300">
                                <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
                                <h2 className="text-md mb-2">{product.title}</h2>
                                <p className="text-xl font-semibold text-green-600 mb-4">Price: ${product.price}</p>
                                <div className="flex space-x-4">
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300">
                                        Add to Cart
                                    </button>
                                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default AllProducts;
