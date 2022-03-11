import { Fragment, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import pageHeaderImage from "../../assets/images/backgrounds/login-bg.jpg";
import { Formik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ResetPassword = () => {
	const { validate_string } = useParams();
	const navigate = useNavigate();
	const [resetPasswordMessage, setResetPasswordMessage] = useState("");
	const resetPasswordFormSubmissionHandler = async (values, setSubmitting) => {
		const data = {
			forgot_password_validate_string: validate_string,
			new_password: values.new_password,
			confirm_password: values.confirm_password,
		};
		await fetch(`${process.env.REACT_APP_API_URL}users/resetpassword`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {	
				if (data.err) {
					setResetPasswordMessage(data.message);
				} else {
					navigate("/", {
						state:
							"Password reset successfully.",
					});
					toast("Password reset successfully.", {
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
	const resetPasswordValidations = async (values) => {
		const errors = {};
		if (!values.new_password) {
			errors.new_password = "Please enter new password";
		}
		if (!values.confirm_password) {
			errors.confirm_password = "Please enter confirm password";
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
								Reset Password
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
									<h3 className="text-center">Reset Password</h3>
									<p className="error">{resetPasswordMessage}</p>
									<Formik
										initialValues={{
											new_password: "",
											confirm_password: "",
										}}
										validate={async (values) => {
											const errors = await resetPasswordValidations(values);
											return errors;
										}}
										onSubmit={async (values, { setSubmitting }) => {
											await resetPasswordFormSubmissionHandler(
												values,
												setSubmitting
											);
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
													<label htmlFor="reset-new-password">
														New Password *
													</label>
													<input
														type="password"
														className="form-control"
														id="reset-new-password"
														name="new_password"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.new_password}
													/>
													{errors.new_password && touched.new_password && (
														<span className="error">{errors.new_password}</span>
													)}
												</div>
												<div className="form-group">
													<label htmlFor="reset-confirm-password">
														Confirm Password *
													</label>
													<input
														type="password"
														className="form-control"
														id="reset-confirm-password"
														name="confirm_password"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.confirm_password}
													/>
													{errors.confirm_password && touched.confirm_password && (
														<span className="error">{errors.confirm_password}</span>
													)}
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
export default ResetPassword;
