import { useEffect, useState } from "react";
import Navbar from "../../Include/Navbar";
import { firestoreDB } from "../../Firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const getOrderDetails = async (userId, orderId) => {
    const orderDocRef = doc(firestoreDB, "orders", userId, "userOrders", orderId);
    const orderDoc = await getDoc(orderDocRef);
    if (orderDoc.exists()) {
        return { id: orderDoc.id, ...orderDoc.data() };
    } else {
        throw new Error("Order not found.");
    }
};

const getUserData = async (userId) => {
    const userDocRef = doc(firestoreDB, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
        return userDoc.data();
    } else {
        throw new Error("User not found.");
    }
};

function OrderDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get("id");
    const userId = localStorage.getItem("userid");

    if (!userId || !orderId) {
        navigate("/");
    }

    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const orderData = await getOrderDetails(userId, orderId);
                const userData = await getUserData(userId);
                console.log(userData);

                const productIds = Object.keys(orderData.products);
                const products = await Promise.all(productIds.map(async (id) => {
                    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                    return {
                        ...response.data,
                        quantity: orderData.products[id],
                    };
                }));

                setOrder({ ...orderData, products });
                setUserData(userData);
            } catch (error) {
                console.error("Error fetching order details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderDetails();
    }, [userId, orderId]);

    const generatePDF = async () => {
        const doc = new jsPDF();

        // Add company name at the top center
        doc.setFontSize(18);
        doc.text("NEXBUY", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });

        // Add margin to the document
        const margin = 5;

        // Capture the invoice content
        const input = document.getElementById("invoice");
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL("image/png");

        const imgWidth = 210 - margin * 2; // A4 size width in mm minus margins
        const pageHeight = 295 - margin * 2; // A4 size height in mm minus margins
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = margin + 20; // Start after the company name

        doc.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight + margin;
            doc.addPage();
            doc.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        doc.save(`invoice_${orderId}.pdf`);
    };

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

    if (!order || !userData) {
        return (
            <>
                <Navbar />
                <div className="container mx-auto p-4">
                    <div className="text-center text-2xl">Order not found.</div>
                </div>
            </>
        );
    }

    const totalAmount = order.products.reduce((total, product) => total + product.price * product.quantity, 0);

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold mb-4">Order Details</h1>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                        onClick={generatePDF}
                    >
                        Download Invoice
                    </button>
                </div>
                <div id="invoice">
                    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                        <h2 className="text-lg font-semibold mb-2">Account Details</h2>
                        <p>Name: {userData.firstName} {userData.lastName}</p>
                        <p>Email: {userData.email}</p>
                        <p>Phone: {userData.phone_no}</p>
                        <p>Address:
                            <br />
                            City - {userData.city}
                            <br />
                            Street - {userData.street}
                            <br />
                            Street No - {userData.street_no}
                            <br />
                            Zipcode - {userData.zipcode}
                        </p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                        <h2 className="text-lg font-semibold mb-2">Order Details</h2>
                        <p>Order ID: {order.orderId}</p>
                        <p>Razorpay Transaction ID: {order.razorpayPaymentId}</p>
                        <p>Order Date: {new Date(order.date).toLocaleString()}</p>
                        <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-2">Products</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {order.products.map((product) => (
                                <div key={product.id} className="bg-gray-100 rounded-lg p-4 flex flex-col items-center">
                                    <img src={product.image} alt={product.title} className="w-24 h-24 object-cover mb-4 rounded-md" />
                                    <h3 className="text-md font-semibold">{product.title}</h3>
                                    <p className="text-gray-700 text-sm">Price: ₹{product.price}</p>
                                    <p className="text-gray-700 text-sm">Quantity: {product.quantity}</p>
                                    <p className="text-gray-700 text-sm">{product.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderDetails;
