import { useState, useEffect } from 'react';
import Navbar from '../../Include/Navbar';
import { getCartItems, incrementQuantity, decrementQuantity, removeItem, clearCart } from './CartFunction';
import axios from 'axios';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import logo from "../../assets/Black White Minimalist Logo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Cart = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userid");
    if (!userId) {
        navigate("/");
    }
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            if (userId) {
                const cartProducts = await getCartItems(userId);
                const productIds = Object.keys(cartProducts);

                const products = await Promise.all(productIds.map(async (id) => {
                    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                    return {
                        id,
                        ...response.data,
                        quantity: cartProducts[id]
                    };
                }));

                setCartItems(products);
            }
            setLoading(false);
        };

        fetchCartItems();
    }, [userId]);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="flex justify-center items-center h-screen">
                    <div className="text-center">Loading...</div>
                </div>
            </>

        );
    }

    const handleIncrement = async (productId) => {
        await incrementQuantity(userId, productId);
        setCartItems(cartItems.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item));
    };

    const handleDecrement = async (productId) => {
        await decrementQuantity(userId, productId);
        setCartItems(cartItems.map(item =>
            item.id === productId ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
        ).filter(item => item.quantity > 0));
    };

    const handleRemove = async (productId) => {
        await removeItem(userId, productId);
        setCartItems(cartItems.filter(item => item.id !== productId));
    };

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);


    const paymentHandler = async (e) => {
        try {
            const receiptID = uuidv4();
            const amount = parseInt(totalAmount) * 100;
            const res = await axios.post('http://localhost:6969/order', {
                amount: amount,
                currency: "INR",
                receipt: receiptID,
            });
            console.log(res);
            var options = {
                "key": "rzp_test_EpbRjbttPkoBKV",
                amount,
                "currency": "INR",
                "name": "NEXBUY",
                "description": "Test Transaction",
                "image": logo,
                "order_id": res.data.id,
                "handler": async function (response) {
                    toast.success("Payment Successful");
                    await clearCart(userId);
                    setCartItems([]);
                },
                // "prefill": {
                //     "name": "Gaurav Kumar",
                //     "email": "gaurav.kumar@example.com",
                //     "contact": "9000090000"
                // },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#2564EB"
                }
            };
            var rzp1 = new Razorpay(options);
            rzp1.on('payment.failed', function (response) {
                toast.error("Payment Failed");
            });
            rzp1.open();
            e.preventDefault();
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while processing the payment");
        }

    };


    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-xl font-semibold">Total Amount: ₹{totalAmount.toFixed(2)}</div>
                    {totalAmount !== 0
                        ?
                        <button
                            onClick={paymentHandler}
                            id="rzp-button1"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300">
                            Buy Now
                        </button>
                        :
                        <></>
                    }

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between items-center hover:shadow-2xl transition-shadow duration-300">
                            <div>
                                <img src={item.image} alt={item.title} className="w-44 border border-black object-cover rounded-lg mb-4" />
                                <h2 className="text-md">{item.title}</h2>
                                <p className="text-gray-700 text-sm">Price: ₹{item.price}</p>
                                <p className="text-gray-700 text-sm">Quantity: {item.quantity}</p>
                            </div>
                            <div className="flex space-x-4 mt-4">
                                <button
                                    onClick={() => handleIncrement(item.id)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors duration-300"
                                >
                                    <FaPlus />
                                </button>
                                <button
                                    onClick={() => handleDecrement(item.id)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition-colors duration-300"
                                >
                                    <FaMinus />
                                </button>
                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-colors duration-300"
                                >
                                    <RiDeleteBin6Line />
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
