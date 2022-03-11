import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import pageHeaderImage from "../../assets/images/page-header-bg.jpg";
const OrderDetail = () => {
	const { id } = useParams();
	const userToken = useSelector((state) => state.auth.token);
	const [orderDetail, setOrderDetail] = useState([]);
	const [total, setTotal] = useState([]);
	const getOrderDetail = useCallback(async (userToken, order_id) => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}orders/${order_id}`,
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
			setOrderDetail(data.data);
            const totalAmount = data.data.items.reduce((c,index) => {
                return c+index.price*index.quantity;
            },0);
            setTotal(totalAmount)
		} catch (error) {}
	}, []);
	useEffect(() => {
		getOrderDetail(userToken, id);
	}, [getOrderDetail, userToken, id]);
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
							Order Detail<span>Shop</span>
						</h1>
					</div>
				</div>
				<div className="page-content pb-0 pt-3">
					<div className="container">
						<div className="row">
							<div className="col-lg-6 mb-3 mb-lg-0">
								<h2 className="title">Personal Information</h2>
								<p>First Name: {orderDetail.first_name}</p>
								<p>Last Name: {orderDetail.last_name}</p>
								<p>Email: {orderDetail.email}</p>
								<p>Phone Number: {orderDetail.phone_number}</p>
							</div>

							<div className="col-lg-6">
								<h2 className="title">Address</h2>
								<p>{orderDetail.address_line_1} {orderDetail.address_line_2}</p>
								<p>{orderDetail.city}, {orderDetail.state}, {orderDetail.country}, {orderDetail.postal_code}</p>
							</div>
						</div>

						<div className="mb-5"></div>

                        <table className="table table-wishlist table-mobile">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetail.items && orderDetail.items.map((item,index) => (
                                    <tr key={index}>
                                        <td className="product-col">
                                            <div className="product">
                                                <h3 className="product-title">{item.product_id.title}</h3>
                                            </div>
                                        </td>
                                        <td className="price-col">${item.price.toFixed(2)}</td>
                                        <td className="stock-col">{item.quantity}</td>
                                        <td className="stock-col">${(item.price * item.quantity).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h3>Total Amount: ${total}</h3>
					</div>
				</div>
			</main>
			<Footer />
		</Fragment>
	);
};
export default OrderDetail;
