import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/home";
import ProductDetail from "./components/ProductDetail/productdetail";
import Cart from "./components/Cart/cart";
import Wishlist from "./components/Wishlist/wishlist";
import Login from "./components/Login/login";
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/product-detail/:id" exact element={<ProductDetail />} />
            <Route path="/cart" exact element={<Cart />} />
            <Route path="/wishlist" exact element={<Wishlist />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Login />} />
        </Routes>
    );
}
export default AppRoutes;
