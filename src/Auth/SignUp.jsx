import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firestoreDB, app } from "../Firebase/Firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const auth = getAuth(app);
    const handleSignUp = async () => {

        if (email === "" ||
            password === "" ||
            firstName === "" ||
            lastName === "" ||
            city === "" ||
            street === "" ||
            number === "" ||
            zipcode === "" ||
            phone === "" ||
            loading === "") {
            toast.error("Please fill the form properly!");
            return;
        }

        setLoading(true);
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;
            await setDoc(doc(firestoreDB, "users", user.uid), {
                email: email,
                id: user.uid,
                firstName: firstName,
                lastName: lastName,
                city: city,
                street: street,
                street_no: number,
                zipcode: zipcode,
                phone_no: phone,
            });
            await setDoc(doc(firestoreDB, "carts", user.uid), {
                products: {}
            });
            // await setDoc(doc(firestoreDB, "cart", user.uid), {
            //     cart: { prod_id: [], quantity: [] },
            // });
            // await setDoc(doc(firestoreDB, "orders", user.uid), {
            //     cart: { prod_id: [], quantity: [], amount: "" },
            // });
            toast.success("Signup successful! Please Login");
            setEmail("");
            setPassword("");
            setFirstName("");
            setLastName("");
            setCity("");
            setStreet("");
            setNumber("");
            setZipcode("");
            setPhone("");
        } catch (error) {
            console.error(error);
            toast.error("Sign up failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="flex flex-col items-center space-y-4 p-10">
                    <h1 className=" text-3xl font-bold text-blue-600 ">Welcome to <span className=" italic">NEXBUY</span></h1>
                    <h1 className="text-2xl font-medium text-black">Sign Up</h1>
                    <div className="mt-5 space-y-4 w-full max-w-md">
                        <div className="space-y-4">
                            <div>
                                <label className="text-lg font-semibold text-indigo-500">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter Your Email"
                                    required
                                    className="w-full p-1 pl-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                            <div>
                                <label className="text-lg font-semibold text-indigo-500">
                                    Password *
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter Your Password"
                                    required
                                    className="w-full p-1 pl-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                            </div>
                            <div>
                                <label className="text-lg font-semibold text-indigo-500">
                                    First Name *
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Your First Name"
                                    required
                                    className="w-full p-1 pl-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    value={firstName}
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-lg font-semibold text-indigo-500">
                                    Last Name *
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Last Name"
                                    required
                                    className="w-full p-1 pl-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={lastName}
                                />
                            </div>
                            <div>
                                <label className="text-lg font-semibold text-indigo-500">
                                    City *
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Your City"
                                    required
                                    className="w-full p-1 pl-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onChange={(e) => setCity(e.target.value)}
                                    value={city}
                                />
                            </div>
                            <div>
                                <label className="text-lg font-semibold text-indigo-500">
                                    Street *
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Street"
                                    required
                                    className="w-full p-1 pl-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onChange={(e) => setStreet(e.target.value)}
                                    value={street}
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-lg font-semibold text-indigo-500">
                                    Street Number *
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter Your Street Number"
                                    required
                                    className="w-full p-1 pl-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onChange={(e) => setNumber(e.target.value)}
                                    value={number}
                                />
                            </div>
                            <div>
                                <label className="text-lg font-semibold text-indigo-500">
                                    Zipcode *
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Zipcode"
                                    required
                                    className="w-full p-1 pl-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onChange={(e) => setZipcode(e.target.value)}
                                    value={zipcode}
                                />
                            </div>
                            <div>
                                <label className="text-lg font-semibold text-indigo-500">
                                    Phone *
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Phone Number"
                                    required
                                    className="w-full p-1 pl-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className={`mt-4 p-1 rounded-md text-white transition duration-300 w-full max-w-md ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-indigo-500 hover:bg-indigo-700"
                            }`}
                        onClick={() => {
                            if (!loading) {
                                handleSignUp();
                            }
                        }}
                        disabled={loading}
                    >
                        {loading ? "Loading" : "Sign Up"}
                    </button>
                    <Link to="/signin" className=" text-blue-700 underline hover:text-blue-900">Already have an Account? Please Sign In -{">"} </Link>
                </div>
            </div>

        </>
    );
};

export default SignUp;
