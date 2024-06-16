import { useState } from 'react';
import Navbar from '../Include/Navbar';
import logo from "../assets/Black White Minimalist Logo.png"

const Cart = () => {
    // Sample cart data
    const [cartItems, setCartItems] = useState([
        { id: 1, title: 'Product 1', price: 10, quantity: 1 },
        { id: 2, title: 'Product 2', price: 20, quantity: 2 },
        { id: 3, title: 'Product 3', price: 15, quantity: 1 },
    ]);

    // Calculate total amount
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    // Increment quantity
    const incrementQuantity = (id) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    // Decrement quantity
    const decrementQuantity = (id) => {
        setCartItems(cartItems.map(item =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    // Remove item from cart
    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-xl font-semibold">Total Amount: ${totalAmount}</div>
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300">
                        Buy Now
                    </button>
                </div>
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
                            <div>
                                <img src={logo} alt="/" className=" w-44 border border-black object-cover rounded-lg mb-4" />
                                <h2 className="text-lg font-bold">{item.title}</h2>
                                <p className="text-gray-700">Price: ${item.price}</p>
                                <p className="text-gray-700">Quantity: {item.quantity}</p>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => incrementQuantity(item.id)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors duration-300"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => decrementQuantity(item.id)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition-colors duration-300"
                                >
                                    -
                                </button>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-colors duration-300"
                                >
                                    Remove Item
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Cart;
