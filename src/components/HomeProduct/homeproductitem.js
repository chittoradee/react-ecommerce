import React, { useContext } from "react";
import { EqualHeightElement } from "react-equal-height";
import { Link } from "react-router-dom";
import CartContext from '../../store/cart-context';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const HomeProductItem = ({ product }) => {
	const isAuth = useSelector((state) => state.auth.isAuthenticated);
	const userdata = useSelector((state) => state.auth.userdata);
	const userToken = useSelector((state) => state.auth.token);
	const cartCtx = useContext(CartContext);
    const addToCartHandler = () => {
		if(!isAuth){
			alert("Please login to add item into cart.")
			return false;
		}
        cartCtx.addItem({
            id:product.id,
            name:product.title,
            amount:product.price,
            price:product.price,
            user_id:userdata._id,
			token:userToken
        });
		toast("Item added to cart.", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
    };
	return (
		<div
			className={"product-item col-6 col-md-4 col-lg-3 " + product.category}
			key={product.id}
		>
			<EqualHeightElement name="Name">
				<div className="product product-4">
					<figure className="product-media">
						<Link to={`product-detail/${product.id}`}>
							<img
								src={product.image}
								alt="Product"
								className="product-image"
								width="277px"
								height="277px"
							/>
						</Link>
						<div className="product-action-vertical">
							<a
								href="#!"
								className="btn-product-icon btn-wishlist btn-expandable"
							>
								<span>add to wishlist</span>
							</a>
						</div>
						<div className="product-action">
							<Link
								to={`product-detail/${product.id}`}
								className="btn-product btn-quickview"
							>
								<span>quick view</span>
							</Link>
						</div>
					</figure>

					<div className="product-body">
						<h3 className="product-title">
							<Link to={`product-detail/${product.id}`}>{product.title}</Link>
						</h3>
						<div className="product-action">
							<a href="#!" className="btn-product btn-cart" onClick={addToCartHandler}>
								<span>add to cart</span>
								<i className="icon-long-arrow-right"></i>
							</a>
						</div>
					</div>
				</div>
			</EqualHeightElement>
		</div>
	);
};
export default HomeProductItem;
