import React, { useReducer } from "react";
import CartContext from "./cart-context";
const defaultCartState = {
	items: []
};
const cartReducer =  (state, action) => {
	if (action.type === "ADD") {
		return {
			items: action.items
		};
	}else if(action.type === "REMOVE"){
		return {
			items: action.items
		};
	}else if(action.type === "CLEAR"){
		return defaultCartState;
	}
	return defaultCartState;
};

const CartProvider =   (props) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);
	const addItemToCartHandler =  async (item) => {
		const data = {
			product_id: item.id,
			user_id: item.user_id
		};
		await fetch(`${process.env.REACT_APP_API_URL}cart/add`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + item.token
			},
		})
		.then((response) => response.json())
		.then((data) => {
			dispatchCartAction({ type: "ADD", items: data.data });
		});
	};

	const removeItemFromCartHandler = async (item) => {
		const data = {
			id: item.id,
			user_id: item.user_id
		};
		await fetch(`${process.env.REACT_APP_API_URL}cart/delete`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + item.token
			},
		})
		.then((response) => response.json())
		.then((data) => {
			dispatchCartAction({ type: "REMOVE", items: data.data });
		});
	};

	const clearCartHandler = async (item) => {
		const data = {
			user_id: item.user_id
		};
		await fetch(`${process.env.REACT_APP_API_URL}cart/clear`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + item.token
			},
		})
		.then((response) => response.json())
		.then((data) => {
			dispatchCartAction({ type: "CLEAR" });
		});
	};
	
	const cartContext = {
		items: cartState.items,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
		clearCart: clearCartHandler,
	};
	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};
export default CartProvider;
