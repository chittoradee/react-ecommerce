import React, { Fragment } from "react";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import pageHeaderImage from "../../assets/images/page-header-bg.jpg";
import Tab from "react-bootstrap/Tab";
import { Nav } from "react-bootstrap";
import Order from "../Order/order";
import AccountDetail from "../AccountDetail/accountdetail";
import { Link } from "react-router-dom";
import { authActions } from "../../store/auth";
import {  useDispatch } from "react-redux";
const Dashboard = () => {
	/* const isAuth = useSelector((state) => state.auth.isAuthenticated);
	const userdata = useSelector((state) => state.auth.userdata); */
	const dispatch = useDispatch();
	const logoutHandler = (event) => {
		event.preventDefault();
		dispatch(authActions.logout());
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
							My Account<span>Shop</span>
						</h1>
					</div>
				</div>
				<nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
					<div className="container">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<Link to={"/"}>Home</Link>
							</li>
							<li className="breadcrumb-item active" aria-current="page">
								My Account
							</li>
						</ol>
					</div>
				</nav>

				<div className="page-content">
					<div className="dashboard">
						<div className="container">
							<div className="row">
								<Tab.Container
									id="left-tabs-example"
									defaultActiveKey="dashboard"
								>
									<aside className="col-md-4 col-lg-3">
										<Nav
											variant="pills"
											className="flex-column nav nav-dashboard flex-column mb-3 mb-md-0"
										>
											<Nav.Item>
												<Nav.Link
													eventKey="dashboard"
												>
													Dashboard
												</Nav.Link>
											</Nav.Item>
											<Nav.Item >
												<Nav.Link eventKey="orders">Orders</Nav.Link>
											</Nav.Item>
											<Nav.Item >
												<Nav.Link eventKey="account_details">
													Account Details
												</Nav.Link>
											</Nav.Item>
										</Nav>
									</aside>

									<div className="col-md-8 col-lg-9">
										<Tab.Content>
											<Tab.Pane eventKey="dashboard">
												<p>
													Hello{" "}
													<span className="font-weight-normal text-dark">
														User
													</span>{" "}
													(not{" "}
													<span className="font-weight-normal text-dark">
														User
													</span>
													? <Link to={"#!"} onClick={logoutHandler}>Log out</Link>)
													<br />
													From your account dashboard you can view your{" "}
														recent orders
													
													  and{" "}
														edit your password and account details
													.
												</p>
											</Tab.Pane>
											<Tab.Pane eventKey="orders">
												<Order/>
											</Tab.Pane>
											<Tab.Pane eventKey="account_details">
												<AccountDetail />
											</Tab.Pane>
										</Tab.Content>

										{/* <div className="tab-content">
										<div className="tab-pane fade show active" id="tab-dashboard" role="tabpanel" aria-labelledby="tab-dashboard-link">
											<p>Hello <span className="font-weight-normal text-dark">User</span> (not <span className="font-weight-normal text-dark">User</span>? <a href="#!">Log out</a>) 
											<br />
											From your account dashboard you can view your <a href="#tab-orders" className="tab-trigger-link link-underline">recent orders</a>, manage your <a href="#tab-address" className="tab-trigger-link">shipping and billing addresses</a>, and <a href="#tab-account" className="tab-trigger-link">edit your password and account details</a>.</p>
										</div>

										<div className="tab-pane fade" id="tab-orders" role="tabpanel" aria-labelledby="tab-orders-link">
											<p>No order has been made yet.</p>
											<a href="category.html" className="btn btn-outline-primary-2"><span>GO SHOP</span><i className="icon-long-arrow-right"></i></a>
										</div>

										<div className="tab-pane fade" id="tab-downloads" role="tabpanel" aria-labelledby="tab-downloads-link">
											<p>No downloads available yet.</p>
											<a href="category.html" className="btn btn-outline-primary-2"><span>GO SHOP</span><i className="icon-long-arrow-right"></i></a>
										</div>

										<div className="tab-pane fade" id="tab-address" role="tabpanel" aria-labelledby="tab-address-link">
											<p>The following addresses will be used on the checkout page by default.</p>
											<div className="row">
												<div className="col-lg-6">
													<div className="card card-dashboard">
														<div className="card-body">
															<h3 className="card-title">Billing Address</h3>
															<p>User Name<br />
															User Company<br />
															John str<br />
															New York, NY 10001<br />
															1-234-987-6543<br />
															yourmail@mail.com<br />
															<a href="#!">Edit <i className="icon-edit"></i></a></p>
														</div>
													</div>
												</div>

												<div className="col-lg-6">
													<div className="card card-dashboard">
														<div className="card-body">
															<h3 className="card-title">Shipping Address</h3>

															<p>You have not set up this type of address yet.<br />
															<a href="#!">Edit <i className="icon-edit"></i></a></p>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="tab-pane fade" id="tab-account" role="tabpanel" aria-labelledby="tab-account-link">
											<form action="#!">
												<div className="row">
													<div className="col-sm-6">
														<label>First Name *</label>
														<input type="text" className="form-control" required />
													</div>

													<div className="col-sm-6">
														<label>Last Name *</label>
														<input type="text" className="form-control" required />
													</div>
												</div>

												<label>Display Name *</label>
												<input type="text" className="form-control" required />
												<small className="form-text">This will be how your name will be displayed in the account section and in reviews</small>

												<label>Email address *</label>
												<input type="email" className="form-control" required />

												<label>Current password (leave blank to leave unchanged)</label>
												<input type="password" className="form-control" />

												<label>New password (leave blank to leave unchanged)</label>
												<input type="password" className="form-control" />

												<label>Confirm new password</label>
												<input type="password" className="form-control mb-2" />

												<button type="submit" className="btn btn-outline-primary-2">
													<span>SAVE CHANGES</span>
													<i className="icon-long-arrow-right"></i>
												</button>
											</form>
										</div>
									</div> */}
									</div>
								</Tab.Container>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</Fragment>
	);
};
export default Dashboard;
