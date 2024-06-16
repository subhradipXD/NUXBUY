import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firestoreDB, app } from "../Firebase/Firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
const SignUp = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
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
        setLoading(true);
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;
            await setDoc(doc(firestoreDB, "users", user.uid), {
                username: username,
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
            await setDoc(doc(firestoreDB, "cart", user.uid), {
                cart: [],
            });
            toast.success("Signup successful! Please Login");
            setEmail("");
            setUsername("");
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
            <div className="flex items-center justify-center pt-10 text-black rounded-md">
                <div className="flex flex-col items-center space-y-4">
                    <h1 className="text-2xl font-bold text-black">Sign Up</h1>
                    <div className="flex flex-col mt-5 space-y-2 w-96">
                        <label className="text-lg font-semibold text-indigo-500">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Your Username"
                            required
                            className="p-1 pl-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                        <label className="text-lg font-semibold text-indigo-500">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            required
                            className="p-1 pl-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <label className="text-lg font-semibold text-indigo-500">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Your Password"
                            required
                            className="p-1 pl-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <label className="text-lg font-semibold text-indigo-500">
                            First Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Your First Name"
                            required
                            className="p-1 pl-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                        />
                        <label className="text-lg font-semibold text-indigo-500">
                            Last Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Your Last Name"
                            required
                            className="p-1 pl-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                        />
                        <label className="text-lg font-semibold text-indigo-500">
                            City
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Your City"
                            required
                            className="p-1 pl-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                        />
                        <label className="text-lg font-semibold text-indigo-500">
                            Street
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Your Street"
                            required
                            className="p-1 pl-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => setStreet(e.target.value)}
                            value={street}
                        />
                        <label className="text-lg font-semibold text-indigo-500">
                            Street Number
                        </label>
                        <input
                            type="number"
                            placeholder="Enter Your Street Number"
                            required
                            className="p-1 pl-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => setNumber(e.target.value)}
                            value={number}
                        />
                        <label className="text-lg font-semibold text-indigo-500">
                            Zipcode
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Your Zipcode"
                            required
                            className="p-1 pl-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => setZipcode(e.target.value)}
                            value={zipcode}
                        />
                        <label className="text-lg font-semibold text-indigo-500">
                            Phone
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Your Phone Number"
                            required
                            className="p-1 pl-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                        />
                        <button
                            type="submit"
                            className={`mt-4 p-1 rounded-md text-white transition duration-300 ${loading
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
