import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../Firebase/Firebase";
const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const auth = getAuth(app);
    const handleSignIn = async () => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(userCredential);
            const user = userCredential.user.uid;

            if (user) {
                localStorage.setItem("userid", user);
                toast.success("Login successful!");
                navigate("/home");
            }
        } catch (error) {
            console.error(error);
            toast.error("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="flex flex-col items-center justify-center h-screen p-10 text-black rounded-md">
                <div className="flex flex-col items-center space-y-4">
                    <h1 className="text-2xl font-bold text-black">Sign In</h1>
                    <div className="flex flex-col mt-5 space-y-2 w-96">
                        <label className="text-lg font-semibold text-indigo-500">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Your Username"
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
                        <button
                            type="submit"
                            className={`mt-4 p-1 rounded-md text-white transition duration-300 ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-indigo-500 hover:bg-indigo-700"
                                }`}
                            onClick={() => {
                                if (!loading) {
                                    handleSignIn();
                                }
                            }}
                            disabled={loading}
                        >
                            {loading ? "Loading" : "Sign In"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;
