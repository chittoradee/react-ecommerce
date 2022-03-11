import { Fragment,  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import pageHeaderImage from "../../assets/images/backgrounds/login-bg.jpg";
import { Formik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ForgotPassword = () => {
	const navigate = useNavigate();	
	const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");
	const forgotPasswordFormSubmissionHandler = async (values, setSubmitting) => {
		const data = {
			email: values.email
		};
		await fetch(`${process.env.REACT_APP_API_URL}users/forgotpassword`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.err) {
					setForgotPasswordMessage(data.message);
				} else {
					navigate("/", { state: "Reset password email has been sent to your registered email address." });
					toast("Reset password email has been sent to your registered email address.", {
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
	const forgotPasswordValidations = async (values) => {
		const errors = {};
		if (!values.email) {
			errors.email = "Please enter email";
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
		) {
			errors.email = "Invalid email address";
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
							<li className="breadcrumb-item">
								<Link to={"/login"}>Login</Link>
							</li>
							<li className="breadcrumb-item active" aria-current="page">
								Forgot Password
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

										<div
											className="tab-pane"
											id="signin-2"
											role="tabpanel"
											aria-labelledby="signin-tab-2"
										>
											<h3 className="text-center">Forgot Password</h3>
											<p className="error">{forgotPasswordMessage}</p>
											<Formik
												initialValues={{
													email: ""
												}}
												validate={async (values) => {
													const errors = await forgotPasswordValidations(values);
													return errors;
												}}
												onSubmit={async (values, { setSubmitting }) => {
													await forgotPasswordFormSubmissionHandler(values, setSubmitting);
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
																name="email"
																onChange={handleChange}
																onBlur={handleBlur}
																value={values.email}
															/>
															{errors.email &&
																touched.email &&
																<span className="error">{errors.email}</span>}
														</div>

														<div className="form-footer">
															<button
																type="submit"
																className="btn btn-outline-primary-2"
																disabled={isSubmitting}
															>
																<span>SUBMIT</span>
																<i className="icon-long-arrow-right"></i>
															</button>
															<Link to={"/login"} className="forgot-link">
																Back to Login
															</Link>
														</div>
													</form>
												)}
											</Formik>
										</div>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</Fragment>
	);
};
export default ForgotPassword;
