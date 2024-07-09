/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { firestoreDB } from "../../Firebase/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Navbar from "../../Include/Navbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfile = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userid");
    if (!userId) {
        navigate("/");
    }
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedData, setUpdatedData] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!userId) {
                    throw new Error("User is not logged in.");
                }

                const userDoc = await getDoc(doc(firestoreDB, "users", userId));
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                } else {
                    throw new Error("User not found.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast.error("Error fetching user data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleUpdateProfileClick = () => {
        setIsModalOpen(true);
        setUpdatedData(userData);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        try {
            const userDocRef = doc(firestoreDB, "users", userId);
            await updateDoc(userDocRef, updatedData);
            setUserData(updatedData);
            setIsModalOpen(false);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating user data:", error);
            toast.error("Error updating profile.");
        } finally {
            setIsUpdating(false);
        }
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

    return (
        <>
            <ToastContainer />
            <Navbar />
            <div className="text-center justify-center pt-5">
                {userData && (<span className=" text-2xl ">{userData.firstName}'s details</span>)}
            </div>
            <div className="flex flex-col items-center space-y-4">
                {userData && (
                    <div className="flex flex-col mt-5 space-y-2 w-96 border border-blue-700 p-10 rounded-md shadow-xl bg-blue-300">
                        <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Phone:</strong> {userData.phone_no}</p>
                        <strong>Address</strong>
                        <p><strong>City:</strong> {userData.city}</p>
                        <p><strong>Street:</strong> {userData.street}</p>
                        <p><strong>Street Number:</strong> {userData.street_no}</p>
                        <p><strong>Zipcode:</strong> {userData.zipcode}</p>
                    </div>
                )}
                <button
                    className=" bg-blue-500 hover:bg-blue-700 pt-2 pb-2 pl-5 pr-5 rounded-md"
                    onClick={handleUpdateProfileClick}
                >
                    Update Profile
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <form onSubmit={handleFormSubmit}>
                            <div className="space-y-4">
                                <div className="flex space-x-2">
                                    <div className="w-full">
                                        <label className="block text-blue-700">First Name:</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={updatedData.firstName || ""}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 p-2 rounded"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-blue-700">Last Name:</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={updatedData.lastName || ""}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 p-2 rounded"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-blue-700">Phone:</label>
                                        <input
                                            type="text"
                                            name="phone_no"
                                            value={updatedData.phone_no || ""}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 p-2 rounded"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-blue-700">City:</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={updatedData.city || ""}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 p-2 rounded"
                                        />
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <div className=" w-full">
                                        <label className="block text-blue-700">Street:</label>
                                        <input
                                            type="text"
                                            name="street"
                                            value={updatedData.street || ""}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 p-2 rounded"
                                        />
                                    </div>
                                    <div className=" w-full">
                                        <label className="block text-blue-700">Street Number:</label>
                                        <input
                                            type="text"
                                            name="street_no"
                                            value={updatedData.street_no || ""}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 p-2 rounded"
                                        />
                                    </div>
                                    <div className=" w-full">
                                        <label className="block text-blue-700">Zipcode:</label>
                                        <input
                                            type="text"
                                            name="zipcode"
                                            value={updatedData.zipcode || ""}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 p-2 rounded"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="bg-gray-500 w-full text-white px-4 py-2 rounded"
                                        disabled={isUpdating}
                                    >
                                        {isUpdating ? "Updating..." : "Cancel"}
                                    </button>
                                    <button
                                        type="submit"
                                        className={`w-full text-white px-4 py-2 rounded ${isUpdating ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}`}
                                        disabled={isUpdating}
                                    >
                                        {isUpdating ? "Updating..." : "Save"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default UpdateProfile;
