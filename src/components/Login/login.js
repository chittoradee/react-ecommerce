import { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import pageHeaderImage from "../../assets/images/backgrounds/login-bg.jpg";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
const Login = () => {
	const location = useLocation();
	const [defaultActiveTab, setDefaultActiveTab] = useState("signin");
	useEffect(() => {
		if (location.pathname === "/login") {
			setDefaultActiveTab("signin");
		} else {
			setDefaultActiveTab("register");
		}
	}, [location]);
	const changeTabs = (e) => {
		if (e === "signin") {
			setDefaultActiveTab("signin");
		} else {
			setDefaultActiveTab("register");
		}
	};

	return (
		<Fragment>
			<Header />
			<main className="main">
				<nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
					<div className="container">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<Link to={"/"}>Home</Link>
							</li>
							<li className="breadcrumb-item active" aria-current="page">
								Login
							</li>
						</ol>
					</div>
				</nav>

				<div
					className="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17"
					style={{ backgroundImage: `url(${pageHeaderImage})` }}
				>
					<div className="container">
						<div className="form-box">
							<div className="form-tab">
								<Tabs
									defaultActiveKey={defaultActiveTab}
									activeKey={defaultActiveTab}
									transition={false}
									onSelect={(k) => changeTabs(k)}
									id="noanim-tab-example"
									className="nav nav-pills nav-fill"
									role="tablist"
								>
									<Tab eventKey="signin" title="Sign In">
										<div
											className="tab-pane"
											id="signin-2"
											role="tabpanel"
											aria-labelledby="signin-tab-2"
										>
											<form action="#">
												<div className="form-group">
													<label htmlFor="singin-email-2">
														Username or email address *
													</label>
													<input
														type="text"
														className="form-control"
														id="singin-email-2"
														name="singin-email"
														required
													/>
												</div>

												<div className="form-group">
													<label htmlFor="singin-password-2">Password *</label>
													<input
														type="password"
														className="form-control"
														id="singin-password-2"
														name="singin-password"
														required
													/>
												</div>

												<div className="form-footer">
													<button
														type="submit"
														className="btn btn-outline-primary-2"
													>
														<span>LOG IN</span>
														<i className="icon-long-arrow-right"></i>
													</button>

													<div className="custom-control custom-checkbox">
														<input
															type="checkbox"
															className="custom-control-input"
															id="signin-remember-2"
														/>
														<label
															className="custom-control-label"
															htmlFor="signin-remember-2"
														>
															Remember Me
														</label>
													</div>

													<a href="#!" className="forgot-link">
														Forgot Your Password?
													</a>
												</div>
											</form>
										</div>
									</Tab>
									<Tab eventKey="register" title="Register">
										<div
											className="tab-pane fade show active"
											id="register-2"
											role="tabpanel"
											aria-labelledby="register-tab-2"
										>
											<form action="#">
												<div className="form-group">
													<label htmlFor="register-email-2">
														Your email address *
													</label>
													<input
														type="email"
														className="form-control"
														id="register-email-2"
														name="register-email"
														required
													/>
												</div>

												<div className="form-group">
													<label htmlFor="register-password-2">
														Password *
													</label>
													<input
														type="password"
														className="form-control"
														id="register-password-2"
														name="register-password"
														required
													/>
												</div>

												<div className="form-footer">
													<button
														type="submit"
														className="btn btn-outline-primary-2"
													>
														<span>SIGN UP</span>
														<i className="icon-long-arrow-right"></i>
													</button>

													<div className="custom-control custom-checkbox">
														<input
															type="checkbox"
															className="custom-control-input"
															id="register-policy-2"
															required
														/>
														<label
															className="custom-control-label"
															htmlFor="register-policy-2"
														>
															I agree to the <a href="#!">privacy policy</a> *
														</label>
													</div>
												</div>
											</form>
										</div>
									</Tab>
								</Tabs>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</Fragment>
	);
};
export default Login;
