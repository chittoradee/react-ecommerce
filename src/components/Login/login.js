import { Fragment, useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import pageHeaderImage from "../../assets/images/backgrounds/login-bg.jpg";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
const Login = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [defaultActiveTab, setDefaultActiveTab] = useState("signin");
	const [signupMessage, setSignupMessage] = useState("");
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

	const firstNameRef = useRef("");
	const lastNameRef = useRef("");
	const registerEmailRef = useRef("");
	const registerPasswordRef = useRef("");

	let formIsValid = true;
	/* if(nameIsValid && lastNameIsValid && emailIsValid){
		formIsValid =true;
	} */
	const formSubmissionHandler = async (event) => {
		event.preventDefault();
		if (!formIsValid) {
			return;
		}
		const data = {
			first_name: firstNameRef.current.value,
			last_name: lastNameRef.current.value,
			email: registerEmailRef.current.value,
			password: registerPasswordRef.current.value,
		};
		await fetch('http://localhost:4000/v1/users/signup',{
			method:"POST",
			body:JSON.stringify(data),
			headers:{
				'Content-Type': 'application/json'
			}
		}).then(response => response.json())
		.then(data => {
			if(data.err){
				setSignupMessage(data.message)
			}else{
				navigate('/');
			}
		});
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
											<p>{signupMessage}</p>
											<form action="#" onSubmit={formSubmissionHandler}>
												<div className="form-group">
													<label htmlFor="register-first-name">
														First Name *
													</label>
													<input
														type="text"
														className="form-control"
														id="register-first-name"
														name="first_name"
														ref={firstNameRef}
														required
													/>
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
														ref={lastNameRef}
														required
													/>
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
														ref={registerEmailRef}
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
														name="register_password"
														ref={registerPasswordRef}
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
