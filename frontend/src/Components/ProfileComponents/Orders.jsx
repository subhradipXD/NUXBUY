import { useEffect, useState } from "react";
import Navbar from "../../Include/Navbar";
import { firestoreDB } from "../../Firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const getUserOrders = async (userId) => {
    const userOrdersCollectionRef = collection(firestoreDB, "orders", userId, "userOrders");
    const querySnapshot = await getDocs(userOrdersCollectionRef);
    const orders = [];
    querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
    });
    return orders;
};

function Orders() {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userid");
    if (!userId) {
        navigate("/");
    }

    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersData = await getUserOrders(userId);
                console.log(ordersData);
                const productsPromises = ordersData.map(async (order) => {
                    const productIds = Object.keys(order.products);
                    const products = await Promise.all(productIds.map(async (id) => {
                        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                        return {
                            ...response.data,
                            quantity: order.products[id],
                        };
                    }));
                    return { ...order, products };
                });
                const ordersWithProducts = await Promise.all(productsPromises);
                setOrders(ordersWithProducts);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
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

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">My Orders</h1>
                {orders.length === 0 ? (
                    <div className="text-center text-2xl">No orders found.</div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => {
                            const totalAmount = order.products.reduce((total, product) => total + product.price * product.quantity, 0);
                            return (
                                <div key={order.id} className="bg-white shadow-md rounded-lg p-4">
                                    <h2 className="text-lg font-semibold mb-2">Order Date: {new Date(order.date).toLocaleString()}</h2>
                                    <h3 className="text-md font-semibold mb-2">Total Amount: ₹{totalAmount.toFixed(2)}</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {order.products.map((product) => (
                                            <div key={product.id} className="bg-gray-100 rounded-lg p-4 flex flex-col items-center">
                                                <img src={product.image} alt={product.title} className="w-24 h-24 object-cover mb-4 rounded-md" />
                                                <h3 className="text-md font-semibold">{product.title}</h3>
                                                <p className="text-gray-700 text-sm">Price: ₹{product.price}</p>
                                                <p className="text-gray-700 text-sm">Quantity: {product.quantity}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <Link to={`/account/orders/order_details?id=${order.id}`}>
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 my-2">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            );
                        })}

                    </div>
                )}
            </div>
        </>
    );
}

export default Orders;
