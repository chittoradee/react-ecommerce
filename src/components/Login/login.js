import { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import pageHeaderImage from "../../assets/images/backgrounds/login-bg.jpg";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
const Login = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const [defaultActiveTab, setDefaultActiveTab] = useState("signin");
	const [signupMessage, setSignupMessage] = useState("");
	const [loginMessage, setLoginMessage] = useState("");
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

	const formSubmissionHandler = async (values, setSubmitting) => {
		const data = {
			first_name: values.first_name,
			last_name: values.last_name,
			email: values.register_email,
			password: values.register_password,
		};
		await fetch("http://localhost:4000/v1/users/signup", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.err) {
					setSignupMessage(data.message);
				} else {
					dispatch(authActions.login(data.data));
					navigate("/", { state: "Registration successful." });
				}
			});
		setSubmitting(false);
	};
	const signupValidations = async (values) => {
		const errors = {};
		if (!values.first_name) {
			errors.first_name = "Please enter first name";
		}
		if (!values.last_name) {
			errors.last_name = "Please enter last name";
		}
		if (!values.register_email) {
			errors.register_email = "Please enter email";
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.register_email)
		) {
			errors.register_email = "Invalid email address";
		}
		if (!values.register_password) {
			errors.register_password = "Please enter password";
		}
		return errors;
	};

	const loginFormSubmissionHandler = async (values, setSubmitting) => {
		const data = {
			email: values.login_email,
			password: values.login_password,
		};
		await fetch("http://localhost:4000/v1/users/login", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.err) {
					setLoginMessage(data.message);
				} else {
					dispatch(authActions.login(data.data));
					navigate("/", { state: "Login successful." });
				}
			});
		setSubmitting(false);
	};
	const loginValidations = async (values) => {
		const errors = {};
		if (!values.login_email) {
			errors.login_email = "Please enter email";
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.login_email)
		) {
			errors.login_email = "Invalid email address";
		}
		if (!values.login_password) {
			errors.login_password = "Please enter password";
		}
		return errors;
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
											<p>{loginMessage}</p>
											<Formik
												initialValues={{
													login_email: "",
													login_password: "",
												}}
												validate={async (values) => {
													const errors = await loginValidations(values);
													return errors;
												}}
												onSubmit={async (values, { setSubmitting }) => {
													await loginFormSubmissionHandler(values, setSubmitting);
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
														<div className="form-group">
															<label htmlFor="singin-email-2">
																Email address *
															</label>
															<input
																type="text"
																className="form-control"
																id="singin-email-2"
																name="login_email"
																onChange={handleChange}
																onBlur={handleBlur}
																value={values.login_email}
															/>
															{errors.login_email &&
																touched.login_email &&
																errors.login_email}
														</div>

														<div className="form-group">
															<label htmlFor="singin-password-2">
																Password *
															</label>
															<input
																type="password"
																className="form-control"
																id="singin-password-2"
																name="login_password"
																onChange={handleChange}
																onBlur={handleBlur}
																value={values.login_password}
															/>
															{errors.login_password &&
																touched.login_password &&
																errors.login_password}
														</div>

														<div className="form-footer">
															<button
																type="submit"
																className="btn btn-outline-primary-2"
																disabled={isSubmitting}
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
												)}
											</Formik>
										</div>
									</Tab>
									<Tab eventKey="register" title="Register">
										<div
											className="tab-pane fade show active"
											id="register-2"
											role="tabpanel"
											aria-labelledby="register-tab-2"
										>
											<p>{signupMessage}</p>
											<Formik
												initialValues={{
													first_name: "",
													last_name: "",
													register_email: "",
													register_password: "",
												}}
												validate={async (values) => {
													const errors = await signupValidations(values);
													return errors;
												}}
												onSubmit={async (values, { setSubmitting }) => {
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
														<div className="form-group">
															<label htmlFor="register-first-name">
																First Name *
															</label>
															<input
																type="text"
																className="form-control"
																id="register-first-name"
																name="first_name"
																onChange={handleChange}
																onBlur={handleBlur}
																value={values.first_name}
															/>
															{errors.first_name &&
																touched.first_name &&
																errors.first_name}
														</div>

														<div className="form-group">
															<label htmlFor="register-last-name">
																Last Name *
															</label>
															<input
																type="text"
																className="form-control"
																id="register-last-name"
																name="last_name"
																onChange={handleChange}
																onBlur={handleBlur}
																value={values.last_name}
															/>
															{errors.last_name &&
																touched.last_name &&
																errors.last_name}
														</div>
														<div className="form-group">
															<label htmlFor="register-email-2">
																Your email address *
															</label>
															<input
																type="email"
																className="form-control"
																id="register-email-2"
																name="register_email"
																onChange={handleChange}
																onBlur={handleBlur}
																value={values.register_email}
															/>
															{errors.register_email &&
																touched.register_email &&
																errors.register_email}
														</div>

														<div className="form-group">
															<label htmlFor="register-password-2">
																Password *
															</label>
															<input
																type="password"
																className="form-control"
																id="register-password-2"
																name="register_password"
																onChange={handleChange}
																onBlur={handleBlur}
																value={values.register_password}
															/>
															{errors.register_password &&
																touched.register_password &&
																errors.register_password}
														</div>
														{isSubmitting}
														<div className="form-footer">
															<button
																type="submit"
																className="btn btn-outline-primary-2"
																disabled={isSubmitting}
															>
																<span>SIGN UP</span>
																<i className="icon-long-arrow-right"></i>
															</button>
														</div>
													</form>
												)}
											</Formik>
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
