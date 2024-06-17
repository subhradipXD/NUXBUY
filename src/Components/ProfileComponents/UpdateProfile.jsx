/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { firestoreDB } from "../../Firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "../../Include/Navbar";
import { useNavigate } from "react-router-dom";
const UpdateProfile = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userid");
    if (!userId) {
        navigate("/");
    }
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem("userid");
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
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

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
            <div className="text-center justify-center pt-5">
                {userData && (<span className=" text-2xl ">{userData.firstName}'s details</span>)}
            </div>
            <div className="flex flex-col items-center space-y-4">
                {userData && (
                    <div className="flex flex-col mt-5 space-y-2 w-96">
                        <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <strong>Address</strong>
                        <p><strong>City:</strong> {userData.city}</p>
                        <p><strong>Street:</strong> {userData.street}</p>
                        <p><strong>Street Number:</strong> {userData.street_no}</p>
                        <p><strong>Zipcode:</strong> {userData.zipcode}</p>
                        <p><strong>Phone:</strong> {userData.phone_no}</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default UpdateProfile
