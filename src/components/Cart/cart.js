import React, {
	Fragment,
	useContext,
	useCallback,
	useEffect,
	useState,
} from "react";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import pageHeaderImage from "../../assets/images/page-header-bg.jpg";
import product1Image from "../../assets/images/products/table/product-1.jpg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartContext from "../../store/cart-context";
const Cart = () => {
	const isAuth = useSelector((state) => state.auth.isAuthenticated);
	const userdata = useSelector((state) => state.auth.userdata);
	const userToken = useSelector((state) => state.auth.token);
	const [cartItems, setCartItems] = useState([]);
	const [total, setTotal] = useState(0);
	const cartCtx = useContext(CartContext);
	const removeFromCartHandler = (cart_id) => {
		if (!isAuth) {
			alert("Please login to remove item from cart.");
			return false;
		}
		cartCtx.removeItem({
			id: cart_id,
			user_id: userdata._id,
			token:userToken
		});
	};
	const getCartItems = useCallback(async (userToken) => {
		if(userToken){
			try {
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}cart/list`,
					{
						method: "GET",
						headers: new Headers({
							Authorization: "Bearer " + userToken,
							"Content-Type": "application/x-www-form-urlencoded",
						}),
					}
				);
				if (!response.ok) {
					throw new Error("Something went wrong!");
				}
				const data = await response.json();
				const cartData = data.data;
				const totalAmount = cartData.reduce((c, current) => {
					return c + Math.round(current.quantity * current.product_id.price);
				}, 0);
				setTotal(totalAmount);
				setCartItems(data.data);
			} catch (error) {}
		}
	}, []);

	useEffect(() => {
		const cartItemsData = cartCtx.items;
		if (cartItemsData.length > 0) {
			const totalAmount = cartItemsData.reduce((c, current) => {
				return c + Math.round(current.quantity * current.product_id.price);
			}, 0);
			setCartItems(cartItemsData);
			setTotal(totalAmount);
		} else {
			setCartItems(cartItemsData);
			setTotal(0);
		}
	}, [cartCtx.items]);

	useEffect(() => {
		getCartItems(userToken);
	}, [getCartItems, userToken]);
	return (
		<Fragment>
			<Header />
			<main className="main">
				<div
					className="page-header text-center"
					style={{ backgroundImage: `url(${pageHeaderImage})` }}
				>
					<div className="container">
						<h1 className="page-title">
							Shopping Cart<span>Shop</span>
						</h1>
					</div>
				</div>
				<nav aria-label="breadcrumb" className="breadcrumb-nav">
					<div className="container">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<Link to={"/"}>Home</Link>
							</li>
							<li className="breadcrumb-item active" aria-current="page">
								Shopping Cart
							</li>
						</ol>
					</div>
				</nav>

				<div className="page-content">
					<div className="cart">
						<div className="container">
							{cartItems.length > 0 && (
								<div className="row">
									<div className="col-lg-9">
										<table className="table table-cart table-mobile">
											<thead>
												<tr>
													<th>Product</th>
													<th>Price</th>
													<th>Quantity</th>
													<th>Total</th>
													<th></th>
												</tr>
											</thead>
											<tbody>
												{cartItems.length > 0 &&
													cartItems.map((item) => (
														<tr key={item._id}>
															<td className="product-col">
																<div className="product">
																	<figure className="product-media">
																		<a href="#!">
																			<img src={product1Image} alt="Product " />
																		</a>
																	</figure>
																	<h3 className="product-title">
																		<a href="#!">{item.product_id.title}</a>
																	</h3>
																</div>
															</td>
															<td className="price-col">
																${item.product_id.price.toFixed(2)}
															</td>
															<td className="quantity-col">
																<div className="cart-product-quantity">
																	{item.quantity}
																	{/* <input
																	type="number"
																	className="form-control"
																	value={item.quantity}
																	min="1"
																	max="10"
																	step="1"
																	data-decimals="0"
																	required
																/> */}
																</div>
															</td>
															<td className="total-col">
																$
																{(
																	item.product_id.price * item.quantity
																).toFixed(2)}
															</td>
															<td className="remove-col">
																<button
																	type="button"
																	className="btn-remove"
																	onClick={() =>
																		removeFromCartHandler(item._id)
																	}
																>
																	<i className="icon-close"></i>
																</button>
															</td>
														</tr>
													))}
											</tbody>
										</table>
									</div>
									<aside className="col-lg-3">
										<div className="summary summary-cart">
											<h3 className="summary-title">Cart Total</h3>

											<table className="table table-summary">
												<tbody>
													<tr className="summary-subtotal">
														<td>Subtotal:</td>
														<td>${total.toFixed(2)}</td>
													</tr>

													<tr className="summary-total">
														<td>Total:</td>
														<td>${total.toFixed(2)}</td>
													</tr>
												</tbody>
											</table>

											<Link
												to={"/checkout"}
												className="btn btn-outline-primary-2 btn-order btn-block"
											>
												PROCEED TO CHECKOUT
											</Link>
										</div>
										<Link
											to={"/"}
											className="btn btn-outline-dark-2 btn-block mb-3"
										>
											<span>CONTINUE SHOPPING</span>
											<i className="icon-refresh"></i>
										</Link>
									</aside>
								</div>
							)}
							{cartItems.length === 0 && (
								<div className="text-center">
									<h2>Cart is Empty</h2>
									<Link
										to={"/"}
										className="btn btn-outline-dark-2 btn-block mb-3 text-center"
									>
										<span>CONTINUE SHOPPING</span>
										<i className="icon-refresh"></i>
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</Fragment>
	);
};
export default Cart;
