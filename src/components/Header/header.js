import { Link } from "react-router-dom";
//import logo from "../../assets/images/demos/demo-11/logo.png";
import logo from "../../assets/images/ecom_new.png";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import CartContext from "../../store/cart-context";
import { useCallback, useContext, useEffect, useState } from "react";
const Header = () => {
	const [cartItems, setCartItems] = useState([]);
	const [total, setTotal] = useState(0);
	const isAuth = useSelector((state) => state.auth.isAuthenticated);
	const userdata = useSelector((state) => state.auth.userdata);
	const userToken = useSelector((state) => state.auth.token);
	const cartCtx = useContext(CartContext);

	const dispatch = useDispatch();
	const logoutHandler = (event) => {
		event.preventDefault();
		dispatch(authActions.logout());
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
		console.log(cartItemsData)
		if (cartItemsData.length > 0) {
			const totalAmount = cartItemsData.reduce((c, current) => {
				return c + Math.round(current.quantity * current.product_id.price);
			}, 0);
			setCartItems(cartItemsData);
			setTotal(totalAmount);
		}
	}, [cartCtx.items]);

	useEffect(() => {
		getCartItems(userToken);
	}, [getCartItems, userToken]);

	return (
		<header className="header header-7">
			<div className="header-middle sticky-header">
				<div className="container">
					<div className="header-left">
						<button className="mobile-menu-toggler">
							<span className="sr-only">Toggle mobile menu</span>
							<i className="icon-bars"></i>
						</button>

						<Link to={"/"} className="logo">
							<img src={logo} alt="Molla Logo" width="82" height="25" />
						</Link>
					</div>
					<div className="header-right">
						<nav className="main-nav">
							<ul className="menu sf-arrows">
								<li className="megamenu-container active">
									<Link to={"/"} className="sf-with-ul">
										Home
									</Link>
								</li>
								{/* <li>
									<Link to={"/"} className="sf-with-ul">
										Products
									</Link>
								</li> */}
								{!isAuth && (
									<li>
										<Link to={"/login"} className="sf-with-ul">
											Login
										</Link>
									</li>
								)}
								{!isAuth && (
									<li>
										<Link to={"/register"} className="sf-with-ul">
											Register
										</Link>
									</li>
								)}
								{/* {isAuth && (
									<li>
										<b>
											{userdata.first_name} {userdata.last_name}
										</b>
										<Link to={"/dashboard"}>Dashboard</Link>
										<button onClick={logoutHandler}>Logout</button>
									</li>
								)} */}
							</ul>
						</nav>

						{/* <div className="header-search">
                            <a href="#!" className="search-toggle" role="button"><i className="icon-search"></i></a>
                            <form action="#" method="get">
                                <div className="header-search-wrapper">
                                    <label htmlFor="q" className="sr-only">Search</label>
                                    <input type="search" className="form-control" name="q" id="q" placeholder="Search in..." required />
                                </div>
                            </form>
                        </div> */}

						{/* <Link to={"/wishlist"} className="wishlist-link">
							<i className="icon-heart-o"></i>
							<span className="wishlist-count">3</span>
						</Link>
 */}
						{isAuth && (
							<div className="dropdown cart-dropdown">
								<a
									href="#!"
									className="dropdown-toggle"
									role="button"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
									data-display="static"
								>
									<span className="cart-txt">My Account</span>
								</a>
								<div className="dropdown-menu dropdown-menu-right">
									<div className="dropdown-cart-products">
										<h4>
											{userdata.first_name} {userdata.last_name}
										</h4>
										<div className="product">
											<div className="product-cart-details">
												<h4 className="product-title">
													<Link to={"/dashboard"}>Dashboard</Link>
												</h4>
											</div>
										</div>
										<div className="product">
											<div className="product-cart-details">
												<h4 className="product-title">
													<Link to={"#!"} onClick={logoutHandler}>
														Logout
													</Link>
												</h4>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
						<div className="dropdown cart-dropdown">
							<a
								href="#!"
								className="dropdown-toggle"
								role="button"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
								data-display="static"
							>
								<i className="icon-shopping-cart"></i>
								<span className="cart-count">{cartItems.length}</span>
								<span className="cart-txt">${total.toFixed(2)}</span>
							</a>

							<div className="dropdown-menu dropdown-menu-right">
								{cartItems.length === 0 && <p>No Item in the cart.</p>}
								{cartItems.length > 0 && (
									<>
										<div className="dropdown-cart-products">
											{cartItems.map((item) => (
												<div className="product" key={item._id}>
													<div className="product-cart-details">
														<h4 className="product-title">
															<Link
																to={`/product-detail/${item.product_id._id}`}
															>
																{item.product_id.title}
															</Link>
														</h4>
														<span className="cart-product-info">
															<span className="cart-product-qty">
																{item.quantity}
															</span>
															x ${item.product_id.price.toFixed(2)}
														</span>
													</div>
													<figure className="product-image-container">
														<Link
															to={`/product-detail/${item.product_id._id}`}
															className="product-image"
														>
															<img src={item.product_id.image} alt="product" />
														</Link>
													</figure>
													{/* <a
														href="#!"
														className="btn-remove"
														title="Remove Product"
													>
														<i className="icon-close"></i>
													</a> */}
												</div>
											))}
										</div>
										<div className="dropdown-cart-total">
											<span>Total</span>
											<span className="cart-total-price">
												${total.toFixed(2)}
											</span>
										</div>
										<div className="dropdown-cart-action">
											<Link to={"/cart"} className="btn btn-primary">
												View Cart
											</Link>
											<Link
												to={"/checkout"}
												className="btn btn-outline-primary-2"
											>
												<span>Checkout</span>
												<i className="icon-long-arrow-right"></i>
											</Link>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
export default Header;
