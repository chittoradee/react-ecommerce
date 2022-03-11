import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home/home";
import ProductDetail from "./components/ProductDetail/productdetail";
import Cart from "./components/Cart/cart";
import Login from "./components/Login/login";
import Checkout from "./components/Checkout/checkout";
import Dashboard from "./components/Dashboard/dashboard";
import OrderDetail from "./components/Order/orderdetail";
import { useSelector } from "react-redux";
import ForgotPassword from "./components/Login/forgotpassword";
import ResetPassword from "./components/Login/resetpassword";
const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" exact element={<Home />} />
			<Route path="/product-detail/:id" exact element={<ProductDetail />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/forgot-password" exact element={<ForgotPassword />} />
			<Route path="/reset-password/:validate_string" exact element={<ResetPassword />} />
			<Route path="/register" exact element={<Login />} />
			<Route
				path="/cart"
				element={
					<RequireAuth redirectTo="/login">
						<Cart />
					</RequireAuth>
				}
			/>
			<Route
				path="/dashboard"
				element={
					<RequireAuth redirectTo="/login">
						<Dashboard />
					</RequireAuth>
				}
			/>
            <Route
				path="/checkout"
				element={
					<RequireAuth redirectTo="/login">
						<Checkout />
					</RequireAuth>
				}
			/>
            <Route
				path="/order/:id"
				element={
					<RequireAuth redirectTo="/login">
						<OrderDetail />
					</RequireAuth>
				}
			/>
			{/* {isAuth && (
				<>
					<Route path="/checkout" exact element={<Checkout />} />
					<Route path="/dashboard" exact element={<Dashboard />} />
					<Route path="/order/:id" exact element={<OrderDetail />} />
				</>
			)} */}
		</Routes>
	);
};
function RequireAuth({ children, redirectTo }) {
	const isAuth = useSelector((state) => state.auth.isAuthenticated);
	return isAuth ? children : <Navigate to={redirectTo} />;
}
export default AppRoutes;
