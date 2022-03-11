import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Order = () => {
	const userToken = useSelector((state) => state.auth.token);
	const [orders, setOrders] = useState([]);
	const getOrders = useCallback(async (userToken) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API_URL}orders`, {
				method: "GET",
				headers: new Headers({
					Authorization: "Bearer " + userToken,
					"Content-Type": "application/x-www-form-urlencoded",
				}),
			});
			if (!response.ok) {
				throw new Error("Something went wrong!");
			}
			const data = await response.json();
			let orderData = data.data;
			orderData.map((item) => {
				let totalAmount = item.items.reduce((c, index) => {
					return c + index.price * index.quantity;
				}, 0);
				item.total_amount = totalAmount;
				return item;
			});
			setOrders(orderData);
		} catch (error) {}
	}, []);
	useEffect(() => {
		getOrders(userToken);
	}, [getOrders, userToken]);
	return (
		<Fragment>
			{orders.length > 0 && (
				<table className="table table-wishlist table-mobile">
					<thead>
						<tr>
							<th>Order ID</th>
							<th>Total Amount</th>
							<th>Order Date</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders.map((item) => (
							<tr key={item._id}>
								<td className="product-col">
									<div className="product">
										<h3 className="product-title">{item._id}</h3>
									</div>
								</td>
								<td className="price-col">${item.total_amount}</td>
								<td className="stock-col">{item.createdAt}</td>
								<td className="remove-col">
									<Link to={`/order/${item._id}`}>View</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			{orders.length === 0 && (
				<>
					<p>No order has been made yet.</p>
					<Link to={"/"} className="btn btn-outline-primary-2">
						<span>GO SHOP</span>
						<i className="icon-long-arrow-right"></i>
					</Link>
				</>
			)}
		</Fragment>
	);
};
export default Order;
