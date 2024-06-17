import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllProducts from "./Components/ProductComponents/AllProducts"
import ProductDetail from './Components/ProductComponents/ProductDetail';
import Cart from './Components/ProductComponents/Cart';
import SignUp from './Auth/SignUp';
import SignIn from './Auth/SignIn';
import Account from './Components/ProfileComponents/Account';
import UpdateProfile from './Components/ProfileComponents/UpdateProfile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<AllProducts />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/update" element={<UpdateProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
