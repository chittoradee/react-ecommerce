import { Formik } from "formik";
import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
/* import { useNavigate } from "react-router-dom"; */
import { authActions } from "../../store/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
const AccountDetail = () => {
	const dispatch = useDispatch();
	const userdata = useSelector((state) => state.auth.userdata);
	const userToken = useSelector((state) => state.auth.token);
	const updateProfileValidations = async (values) => {
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
		return errors;
	};
	const changePasswordValidations = async (values) => {
		const errors = {};
		if (!values.old_password) {
			errors.old_password = "Please enter old password";
		}
		if (!values.new_password) {
			errors.new_password = "Please enter new password";
		}
		if (!values.confirm_password) {
			errors.confirm_password = "Please enter confirm password";
		}
		return errors;
	};
	const [updateProfileMessage, setUpdateProfileMessage] = useState("");
	const [changePasswordMessage, setChangePasswordMessage] = useState("");
	const updateProfileFormSubmissionHandler = async (values, setSubmitting) => {
		const data = {
			first_name: values.first_name,
			last_name: values.last_name,
			email: values.email,
		};
		await fetch(`${process.env.REACT_APP_API_URL}users/updateprofile`, {
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
					setUpdateProfileMessage(data.message);
				} else {
					dispatch(authActions.updateProfile(data.data));
					toast("Profile updated successfully.", {
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
	const changePasswordFormSubmissionHandler = async (values, setSubmitting) => {
		const data = {
			old_password: values.old_password,
			new_password: values.new_password,
			confirm_password: values.confirm_password,
		};
		await fetch(`${process.env.REACT_APP_API_URL}users/change-password`, {
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
					setChangePasswordMessage(data.message);
				} else {
					toast("Password changed successfully.", {
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
	return (
		<Fragment>
			<h4>UPDATE PROFILE</h4>
			<p className="error">{updateProfileMessage}</p>
			<Formik
				initialValues={{
					first_name: userdata.first_name,
					last_name: userdata.last_name,
					email: userdata.email,
				}}
				validate={async (values) => {
					const errors = await updateProfileValidations(values);
					return errors;
				}}
				onSubmit={async (values, { setSubmitting }) => {
					await updateProfileFormSubmissionHandler(values, setSubmitting);
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
							<div className="col-sm-6">
								<label htmlFor="register-first-name">First Name *</label>
								<input
									type="text"
									className="form-control"
									id="register-first-name"
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
								<label>Last Name *</label>
								<label htmlFor="register-last-name">Last Name *</label>
								<input
									type="text"
									className="form-control"
									id="register-last-name"
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
						<label>Email address *</label>;
						<input
							type="email"
							className="form-control"
							id="register-email-2"
							name="email"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.email}
						/>
						{errors.email && touched.email && (
							<span className="error">{errors.email}</span>
						)}
						<br />
						<button type="submit" className="btn btn-outline-primary-2">
							<span>SAVE CHANGES</span>
							<i className="icon-long-arrow-right"></i>
						</button>
					</form>
				)}
			</Formik>
			<br />
			<h4>CHANGE PASSWORD</h4>
			<p className="error">{changePasswordMessage}</p>
			<Formik
				initialValues={{
					old_password: "",
					new_password: "",
					confirm_password: "",
				}}
				validate={async (values) => {
					const errors = await changePasswordValidations(values);
					return errors;
				}}
				onSubmit={async (values, { setSubmitting }) => {
					await changePasswordFormSubmissionHandler(values, setSubmitting);
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
						<label>Current password *</label>
						<input
							type="password"
							className="form-control"
							name="old_password"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.old_password}
						/>
						{errors.old_password && touched.old_password && (
							<span className="error">{errors.old_password}</span>
						)}
						<br />

						<label>New password *</label>
						<input
							type="password"
							className="form-control"
							name="new_password"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.new_password}
						/>
						{errors.new_password && touched.new_password && (
							<span className="error">{errors.new_password}</span>
						)}
						<br />
						<label>Confirm new password *</label>
						<input
							type="password"
							className="form-control mb-2"
							name="confirm_password"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.confirm_password}
						/>
						{errors.confirm_password && touched.confirm_password && (
							<span className="error">{errors.confirm_password}</span>
						)}
						<br />

						<button type="submit" className="btn btn-outline-primary-2">
							<span>SAVE CHANGES</span>
							<i className="icon-long-arrow-right"></i>
						</button>
					</form>
				)}
			</Formik>
		</Fragment>
	);
};
export default AccountDetail;
