import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllProducts from './Components/AllProducts';
import ProductDetail from './Components/ProductDetail';
import Cart from './Components/Cart';
import SignUp from './Auth/SignUp';
import SignIn from './Auth/SignIn';
import Account from './Components/Account';

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
      </Routes>
    </Router>
  );
}

export default App;
