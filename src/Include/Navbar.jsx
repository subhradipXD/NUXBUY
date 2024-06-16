import logo from "../assets/Black White Minimalist Logo.png"
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
                <div className="flex space-x-6">
                    <a href="/home" className="text-gray-700 hover:text-gray-900 hover:underline hover:underline-offset-8">
                        Home
                    </a>
                    <a href="/cart" className="text-gray-700 hover:text-gray-900 hover:underline hover:underline-offset-8">
                        Cart
                    </a>
                    <a href="/account" className="text-gray-700 hover:text-gray-900 hover:underline hover:underline-offset-8">
                        My Account
                    </a>
                    <a href="/logout" className="text-red-500 hover:text-red-700 hover:underline hover:underline-offset-8">
                        Logout
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
