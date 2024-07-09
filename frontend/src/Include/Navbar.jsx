import logo from "../assets/Black White Minimalist Logo.png"
import { CgProfile } from "react-icons/cg";
import { TfiHome } from "react-icons/tfi";
import { BsCart4 } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
const Navbar = () => {
    return (
        <nav className="bg-white shadow-md sticky top-0 ">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <div className="flex items-center">
                    <img
                        src={logo}
                        alt="Company Logo"
                        className="h-8 w-auto"
                    />
                </div>
                <div className="flex space-x-10">
                    <a href="/home" className="text-gray-700 hover:text-gray-900 hover:underline hover:underline-offset-8">
                        <TfiHome />
                    </a>
                    <a href="/cart" className="text-gray-700 hover:text-gray-900 hover:underline hover:underline-offset-8">
                        <BsCart4 />
                    </a>
                    <a href="/account" className="text-gray-700 hover:text-gray-900 hover:underline hover:underline-offset-8">
                        <CgProfile />
                    </a>
                    <a href="/" className="text-red-500 hover:text-red-700 hover:underline hover:underline-offset-8" onClick={() => { localStorage.removeItem('userid') }}>
                        <AiOutlineLogout />
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
