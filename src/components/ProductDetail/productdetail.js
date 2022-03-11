import React, { Fragment, useState, useCallback, useEffect, useContext } from "react";
import Header from "../Header/header";
import Footer from "../Footer/footer";
/*import productImage1Thumb from "../../assets/images/products/single/1-thumb.jpg";
 import productImage2Thumb from "../../assets/images/products/single/2-thumb.jpg"; 
 import productImage2Bg from "../../assets/images/products/single/2-big.jpg";*/
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ImageHoverZoom from "./imagehoverzoom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
/* import classes from "./productdetail.module.css"; */
import { Link, useParams } from "react-router-dom";
import CartContext from '../../store/cart-context';
import { useSelector } from "react-redux";
const ProductDetail = () => {
	/* let [count, setCount] = useState(1); */
	const [product, setProduct] = useState([]);
	const params = useParams();
	const productId = params.id;
	const fetchProductHandler = useCallback(async (productId) => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}product/detail/${productId}`
			);
			if (!response.ok) {
				throw new Error("Something went wrong!");
			}
			const result = await response.json();
			const data = result.data;
			const rating = Math.ceil(data.rating / 5);
			const loadedProduct = {
				id: data._id,
				title: data.title,
				category: data.category,
				description: data.description,
				image: data.image,
				price: data.price,
				rating: rating,
				reviews: 259,
			};
			setProduct(loadedProduct);
		} catch (error) {
			
		}
	}, []);

	useEffect(() => {
		fetchProductHandler(productId);
	}, [fetchProductHandler, productId]);

	/* const incrementCount = () => {
		count = count + 1;
		setCount(count);
	};
	const decrementCount = () => {
		count = count - 1;
		count = count <= 1 ? 1 : count;
		setCount(count);
	};
	const getQuantity = () => {}; */

	const isAuth = useSelector((state) => state.auth.isAuthenticated);
	const userdata = useSelector((state) => state.auth.userdata);
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
        });
    };
	return (
		<Fragment>
			<Header />
			<main className="main">
				<nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
					<div className="container d-flex align-items-center">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<Link to={"/"}>Home</Link>
							</li>
							<li className="breadcrumb-item active" aria-current="page">
								Default
							</li>
						</ol>
					</div>
				</nav>

				<div className="page-content">
					{product && 
					<div className="container">
						<div className="product-details-top">
							<div className="row">
								<div className="col-md-6">
									<div className="product-gallery product-gallery-vertical">
										<div className="row">	
										{product.image &&
											<OwlCarousel
												className="intro-slider owl-carousel owl-simple owl-nav-inside"
												loop
												margin={0}
												items={1}
												nav
												dots={false}
												responsiveClass={true}
											>	
												<figure className="product-main-image">
													<ImageHoverZoom imagePath={product.image} />
												</figure>

												{/* <figure className="product-main-image">
													<ImageHoverZoom imagePath={productImage2Bg} />
												</figure>
												<figure className="product-main-image">
													<ImageHoverZoom imagePath={productImage3Bg} />
												</figure>
												<figure className="product-main-image">
													<ImageHoverZoom imagePath={productImage4Bg} />
												</figure> */}
											</OwlCarousel>
											}
										</div>
									</div>
								</div>

								<div className="col-md-6">
									<div className="product-details">
										<h1 className="product-title">{product.title}</h1>
										<div className="ratings-container">
											<div className="ratings">
												<div
													className="ratings-val"
													style={{ width: "80%" }}
												></div>
											</div>
											<a
												className="ratings-text"
												href="#product-review-link"
												id="review-link"
											>
												( {product.reviews} Reviews )
											</a>
										</div>

										<div className="product-price">${product.price}</div>

										<div className="product-content">
											<p>{product.description}</p>
										</div>

										{/* <div className="details-filter-row details-row-size">
											<label>Color:</label>

											<div className="product-nav product-nav-thumbs">
												<a href="#!" className="active">
													<img src={productImage1Thumb} alt="product desc" />
												</a>
												<a href="#!">
													<img src={productImage2Thumb} alt="product desc" />
												</a>
											</div>
										</div>

										<div className="details-filter-row details-row-size">
											<label htmlFor="size">Size:</label>
											<div className="select-custom">
												<select name="size" id="size" className="form-control">
													<option value="#">Select a size</option>
													<option value="s">Small</option>
													<option value="m">Medium</option>
													<option value="l">Large</option>
													<option value="xl">Extra Large</option>
												</select>
											</div>
										</div>

										<div className="details-filter-row details-row-size">
											<label htmlFor="qty">Qty:</label>
											<div className="">
												<span
													className={classes.minus}
													onClick={decrementCount}
												>
													-
												</span>
												<input
													type="text"
													id="qty"
													className={classes["cart-qty"]}
													value={count}
													min="1"
													max="10"
													step="1"
													data-decimals="0"
													onChange={getQuantity}
													required
													readOnly
												/>
												<span className={classes.plus} onClick={incrementCount}>
													+
												</span>
											</div>
										</div>
 */}
										<div className="product-details-action">
											<a href="#!" className="btn-product btn-cart"  onClick={addToCartHandler}>
												<span>add to cart</span>
											</a>

											{/* <div className="details-action-wrapper">
												<a
													href="#!"
													className="btn-product btn-wishlist"
													title="Wishlist"
												>
													<span>Add to Wishlist</span>
												</a>
											</div> */}
										</div>

										<div className="product-details-footer">
											<div className="product-cat">
												<span>Category:</span>
												{product.category}
											</div>

											<div className="social-icons social-icons-sm">
												<span className="social-label">Share:</span>
												<a
													href="#!"
													className="social-icon"
													title="Facebook"
													target="_blank"
												>
													<i className="icon-facebook-f"></i>
												</a>
												<a
													href="#!"
													className="social-icon"
													title="Twitter"
													target="_blank"
												>
													<i className="icon-twitter"></i>
												</a>
												<a
													href="#!"
													className="social-icon"
													title="Instagram"
													target="_blank"
												>
													<i className="icon-instagram"></i>
												</a>
												<a
													href="#!"
													className="social-icon"
													title="Pinterest"
													target="_blank"
												>
													<i className="icon-pinterest"></i>
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="product-details-tab">
							<Tabs
								defaultActiveKey="description"
								transition={false}
								id="noanim-tab-example"
								className="nav nav-pills justify-content-center"
								role="tablist"
							>
								<Tab eventKey="description" title="Description">
									<div className="product-desc-content">
										<h3>Product Information</h3>
										<p>{product.description}</p>
									</div>
								</Tab>
								<Tab
									eventKey="additional_information"
									title="Additional Information"
								>
									<div className="product-desc-content">
										<h3>Information</h3>
										<p>
											Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
											Donec odio. Quisque volutpat mattis eros. Nullam malesuada
											erat ut turpis. Suspendisse urna viverra non, semper
											suscipit, posuere a, pede. Donec nec justo eget felis
											facilisis fermentum. Aliquam porttitor mauris sit amet
											orci.{" "}
										</p>

										<h3>Fabric & care</h3>
										<ul>
											<li>Faux suede fabric</li>
											<li>Gold tone metal hoop handles.</li>
											<li>RI branding</li>
											<li>Snake print trim interior </li>
											<li>Adjustable cross body strap</li>
											<li>
												{" "}
												Height: 31cm; Width: 32cm; Depth: 12cm; Handle Drop:
												61cm
											</li>
										</ul>

										<h3>Size</h3>
										<p>one size</p>
									</div>
								</Tab>
								<Tab eventKey="shipping_returns" title="Shipping & Returns">
									<div className="product-desc-content">
										<h3>Delivery & returns</h3>
										<p>
											We deliver to over 100 countries around the world. For
											full details of the delivery options we offer, please view
											our <a href="#!">Delivery information</a>
											<br />
											We hope you will love every purchase, but if you ever need
											to return an item you can do so within a month of receipt.
											For full details of how to make a return, please view our{" "}
											<a href="#!">Returns information</a>
										</p>
									</div>
								</Tab>
								<Tab eventKey="reviews" title={`Reviews (${product.reviews})`}>
									<div className="reviews">
										<h3>Reviews ({product.reviews})</h3>
										<div className="review">
											<div className="row no-gutters">
												<div className="col-auto">
													<h4>
														<a href="#!">Samanta J.</a>
													</h4>
													<div className="ratings-container">
														<div className="ratings">
															<div
																className="ratings-val"
																style={{ width: "80%" }}
															></div>
														</div>
													</div>
													<span className="review-date">6 days ago</span>
												</div>
												<div className="col">
													<h4>Good, perfect size</h4>

													<div className="review-content">
														<p>
															Lorem ipsum dolor sit amet, consectetur
															adipisicing elit. Ducimus cum dolores assumenda
															asperiores facilis porro reprehenderit animi culpa
															atque blanditiis commodi perspiciatis doloremque,
															possimus, explicabo, autem fugit beatae quae
															voluptas!
														</p>
													</div>

													<div className="review-action">
														<a href="#!">
															<i className="icon-thumbs-up"></i>Helpful (2)
														</a>
														<a href="#!">
															<i className="icon-thumbs-down"></i>Unhelpful (0)
														</a>
													</div>
												</div>
											</div>
										</div>

										<div className="review">
											<div className="row no-gutters">
												<div className="col-auto">
													<h4>
														<a href="#!">John Doe</a>
													</h4>
													<div className="ratings-container">
														<div className="ratings">
															<div
																className="ratings-val"
																style={{ width: "100%" }}
															></div>
														</div>
													</div>
													<span className="review-date">5 days ago</span>
												</div>
												<div className="col">
													<h4>Very good</h4>
													<div className="review-content">
														<p>
															Sed, molestias, tempore? Ex dolor esse iure hic
															veniam laborum blanditiis laudantium iste amet.
															Cum non voluptate eos enim, ab cumque nam, modi,
															quas iure illum repellendus, blanditiis
															perspiciatis beatae!
														</p>
													</div>

													<div className="review-action">
														<a href="#!">
															<i className="icon-thumbs-up"></i>Helpful (0)
														</a>
														<a href="#!">
															<i className="icon-thumbs-down"></i>Unhelpful (0)
														</a>
													</div>
												</div>
											</div>
										</div>
									</div>
								</Tab>
							</Tabs>
						</div>
					</div>
					}
				</div>
			</main>
			<Footer />
		</Fragment>
	);
};
export default ProductDetail;
