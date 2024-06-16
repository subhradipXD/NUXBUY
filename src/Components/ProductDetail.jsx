import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Include/Navbar';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const baseURL = `https://fakestoreapi.com/products/${id}`;

    useEffect(() => {
        async function getProduct() {
            try {
                const response = await axios.get(baseURL);
                setProduct(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getProduct();
    }, [baseURL]);

    if (!product) {
        return <>
            <Navbar />
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">Loading...</div>
            </div>
        </>;
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <img src={product.image} alt={product.title} className=" w-52 border border-black object-cover rounded-lg mb-4" />
                    <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-xl font-semibold text-green-600 mb-4">Price: ${product.price}</p>
                    <div className="flex space-x-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
                            Add to Cart
                        </button>
                        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
}

export default ProductDetail;
