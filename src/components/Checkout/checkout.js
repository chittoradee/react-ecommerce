import React, {
	Fragment,
	useEffect,
	useContext,
	useCallback,
	useState,
} from "react";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import { useSelector } from "react-redux";
import pageHeaderImage from "../../assets/images/page-header-bg.jpg";
import { Link, useNavigate } from "react-router-dom";
/* import { useDispatch } from "react-redux"; */
import { Formik } from "formik";
/* import { authActions } from "../../store/auth"; */
import CartContext from "../../store/cart-context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Checkout = () => {
	/* 	const isAuth = useSelector((state) => state.auth.isAuthenticated); */
	const userdata = useSelector((state) => state.auth.userdata);
	const userToken = useSelector((state) => state.auth.token);
	const [cartItems, setCartItems] = useState([]);
	const [total, setTotal] = useState(0);
	const cartCtx = useContext(CartContext);

	/* const dispatch = useDispatch(); */
	const navigate = useNavigate();
	const [checkoutMessage, setCheckoutMessage] = useState("");
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
		getCartItems(userToken);
	}, [getCartItems, userToken]);

	const formSubmissionHandler = async (values, setSubmitting) => {
		let items = [];
		cartItems.forEach((item) => {
			console.log(item);
			items.push({
				product_id: item.product_id._id,
				price: item.product_id.price,
				quantity: item.quantity,
			});
		});
		const data = {
			first_name: values.first_name,
			last_name: values.last_name,
			email: values.email,
			country: values.country,
			city: values.city,
			state: values.state,
			postal_code: values.postal_code,
			phone_number: values.phone_number,
			address_line_1: values.address_line_1,
			address_line_2: values.address_line_2,
			notes: values.notes,
			items: items,
			user_id: userdata._id,
		};
		await fetch(`${process.env.REACT_APP_API_URL}place-order`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + userToken,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.err) {
					setCheckoutMessage(data.message);
				} else {
					cartCtx.clearCart({
						user_id: userdata._id,
						token:userToken
					});
					navigate("/", { state: "Order Placed." });
					toast("Order Placed.", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				}
			});
		setSubmitting(false);
	};
	const checkoutValidations = async (values) => {
		const errors = {};
		if (!values.first_name) {
			errors.first_name = "Please enter first name";
		}
		if (!values.last_name) {
			errors.last_name = "Please enter last name";
		}
		if (!values.email) {
			errors.email = "Please enter email";
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
			errors.email = "Invalid email address";
		}
		if (!values.country) {
			errors.country = "Please enter country";
		}
		if (!values.address_line_1) {
			errors.address_line_1 = "Please enter address line 1";
		}
		if (!values.address_line_2) {
			errors.address_line_2 = "Please enter address line 2";
		}
		if (!values.city) {
			errors.city = "Please enter city";
		}
		if (!values.state) {
			errors.state = "Please enter state";
		}
		if (!values.postal_code) {
			errors.postal_code = "Please enter postal code";
		}
		if (!values.phone_number) {
			errors.phone_number = "Please enter phone number";
		}
		return errors;
	};
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
							Checkout<span>Shop</span>
						</h1>
					</div>
				</div>
				<nav aria-label="breadcrumb" className="breadcrumb-nav">
					<div className="container">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<Link to={"/"}>Home</Link>
							</li>
							<li className="breadcrumb-item">
								<Link to={"/cart"}>Cart</Link>
							</li>
							<li className="breadcrumb-item active" aria-current="page">
								Checkout
							</li>
						</ol>
					</div>
				</nav>

				<div className="page-content">
					<div className="checkout">
						<div className="container">
							<p>{checkoutMessage}</p>
							<Formik
								initialValues={{
									first_name: userdata.first_name,
									last_name: userdata.last_name,
									country: "",
									address_line_1: "",
									address_line_2: "",
									city: "",
									state: "",
									postal_code: "",
									phone_number: "",
									email: userdata.email,
									notes: "",
								}}
								validate={async (values) => {
									const errors = await checkoutValidations(values);
									console.log(errors);
									return errors;
								}}
								onSubmit={async (values, { setSubmitting }) => {
									console.log(values);
									await formSubmissionHandler(values, setSubmitting);
								}}
							>
								{({
									values,
									errors,
									touched,
									isSubmitting,
									handleChange,
									handleBlur,
									handleSubmit,
								}) => (
									<form onSubmit={handleSubmit}>
										<div className="row">
											<div className="col-lg-9">
												<h2 className="checkout-title">Billing Details</h2>
												<div className="row">
													<div className="col-sm-6">
														<label htmlFor="first-name">First Name *</label>
														<input
															type="text"
															className="form-control"
															id="first-name"
															name="first_name"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.first_name}
														/>
														{errors.first_name && touched.first_name && (
															<span className="error">{errors.first_name}</span>
														)}
													</div>

													<div className="col-sm-6">
														<label htmlFor="last-name">Last Name *</label>
														<input
															type="text"
															className="form-control"
															id="last-name"
															name="last_name"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.last_name}
														/>
														{errors.last_name && touched.last_name && (
															<span className="error">{errors.last_name}</span>
														)}
													</div>
												</div>
												<div className="row">
													<div className="col-md-12">
														<label htmlFor="country">Country *</label>
														<input
															type="text"
															className="form-control"
															id="country"
															name="country"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.country}
														/>
														{errors.country && touched.country && (
															<span className="error">{errors.country}</span>
														)}
													</div>
												</div>
												<div className="row">
													<div className="col-md-12">
														<label>Street address *</label>
														<input
															type="text"
															className="form-control"
															id="address_line_1"
															name="address_line_1"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.address_line_1}
															placeholder="House number and Street name"
														/>
														{errors.address_line_1 &&
															touched.address_line_1 && (
																<span className="error">
																	{errors.address_line_1}
																</span>
															)}
													</div>
												</div>
												<div className="row">
													<div className="col-md-12">
														<input
															type="text"
															className="form-control"
															id="address_line_2"
															name="address_line_2"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.address_line_2}
															placeholder="Appartments, suite, unit etc ..."
														/>
														{errors.address_line_2 &&
															touched.address_line_2 && (
																<span className="error">
																	{errors.address_line_2}
																</span>
															)}
													</div>
												</div>
												<div className="row">
													<div className="col-sm-6">
														<label htmlFor="city">Town / City *</label>
														<input
															type="text"
															className="form-control"
															id="city"
															name="city"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.city}
														/>
														{errors.city && touched.city && (
															<span className="error">{errors.city}</span>
														)}
													</div>

													<div className="col-sm-6">
														<label htmlFor="state">State / County *</label>
														<input
															type="text"
															className="form-control"
															id="state"
															name="state"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.state}
														/>
														{errors.state && touched.state && (
															<span className="error">{errors.state}</span>
														)}
													</div>
												</div>

												<div className="row">
													<div className="col-sm-6">
														<label htmlFor="postal_code">
															Postcode / ZIP *
														</label>
														<input
															type="text"
															className="form-control"
															id="postal_code"
															name="postal_code"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.postal_code}
														/>
														{errors.postal_code && touched.postal_code && (
															<span className="error">
																{errors.postal_code}
															</span>
														)}
													</div>

													<div className="col-sm-6">
														<label htmlFor="phone_number">Phone *</label>
														<input
															type="tel"
															className="form-control"
															id="phone_number"
															name="phone_number"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.phone_number}
														/>
														{errors.phone_number && touched.phone_number && (
															<span className="error">
																{errors.phone_number}
															</span>
														)}
													</div>
												</div>
												<div className="row">
													<div className="col-md-12">
														<label htmlFor="email-address">
															Email address *
														</label>
														<input
															type="email"
															className="form-control"
															id="email-address"
															name="email"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.register_email}
														/>
														{errors.email && touched.email && (
															<span className="error">{errors.email}</span>
														)}
													</div>{" "}
												</div>
												<div className="row">
													<div className="col-md-12">
														<label>Order notes (optional)</label>
														<textarea
															className="form-control"
															cols="30"
															rows="4"
															id="notes"
															name="notes"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.notes}
															placeholder="Notes about your order, e.g. special notes for delivery"
														></textarea>
													</div>{" "}
												</div>
											</div>
											<aside className="col-lg-3">
												<div className="summary">
													<h3 className="summary-title">Your Order</h3>

													<table className="table table-summary">
														<thead>
															<tr>
																<th>Product</th>
																<th>Total</th>
															</tr>
														</thead>

														<tbody>
															{cartItems.length > 0 &&
																cartItems.map((item) => (
																	<tr key={item._id}>
																		<td>
																			<a href="#!">{item.product_id.title}</a>
																		</td>
																		<td>
																			$
																			{(
																				item.quantity * item.product_id.price
																			).toFixed(2)}
																		</td>
																	</tr>
																))}
															<tr className="summary-subtotal">
																<td>Subtotal:</td>
																<td>${total.toFixed(2)}</td>
															</tr>
															<tr>
																<td>Shipping:</td>
																<td>Free shipping</td>
															</tr>
															<tr className="summary-total">
																<td>Total:</td>
																<td>${total.toFixed(2)}</td>
															</tr>
														</tbody>
													</table>

													<div
														className="accordion-summary"
														id="accordion-payment"
													>
														<div className="card">
															<div className="card-header" id="heading-3">
																<h2 className="card-title">
																	<a
																		role="button"
																		data-toggle="collapse"
																		href="#collapse-3"
																		aria-expanded="true"
																		aria-controls="collapse-3"
																	>
																		Cash on delivery
																	</a>
																</h2>
															</div>
															<div
																id="collapse-3"
																className="collapse show"
																aria-labelledby="heading-3"
																data-parent="#accordion-payment"
															>
																<div className="card-body">
																	Pay cash on delivery when delivery boy
																	delivery your order at you registered address.
																</div>
															</div>
														</div>
													</div>

													<button
														type="submit"
														className="btn btn-outline-primary-2 btn-order btn-block"
														disabled={isSubmitting}
													>
														<span className="btn-text">Place Order</span>
														<span className="btn-hover-text">
															Proceed to Checkout
														</span>
													</button>
												</div>
											</aside>
										</div>
									</form>
								)}
							</Formik>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</Fragment>
	);
};
export default Checkout;
