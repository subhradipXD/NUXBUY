import { useState, useEffect } from "react";
import { firestoreDB } from "../Firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "../Include/Navbar";
import { FaAngleRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const Account = () => {
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
                {userData && (<span className=" text-2xl ">Welcome {userData.firstName}</span>)}
            </div>
            <div className="flex m-10 pt-5 text-center justify-center text-black rounded-md">
                <div className="flex space-x-10 ">
                    <Link to={`/account/update`}>
                        {userData && (
                            <div className="flex flex-col mt-5 space-y-2 w-auto h-auto border border-black rounded-md shadow-md hover:shadow-2xl transition-shadow duration-300">
                                <strong className="flex items-center p-10">{userData.firstName} <FaAngleRight className="ml-2" /></strong>
                            </div>
                        )}
                    </Link >
                    <Link to={`/cart`}>
                        {userData && (
                            <div className="flex flex-col mt-5 space-y-2 w-auto h-auto border border-black rounded-md shadow-md hover:shadow-2xl transition-shadow duration-300">
                                <strong className="flex items-center p-10">Cart <FaAngleRight className="ml-2" /></strong>
                            </div>
                        )}
                    </Link>
                    {userData && (
                        <div className="flex flex-col mt-5 space-y-2 w-auto h-auto border border-black rounded-md shadow-md hover:shadow-2xl transition-shadow duration-300">
                            <strong className="flex items-center p-10">Order Details <FaAngleRight className="ml-2" /></strong>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Account;
