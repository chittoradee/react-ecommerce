import React from 'react';
import { EqualHeightElement } from 'react-equal-height';
import { Link } from 'react-router-dom';
const HomeProductItem = ({product}) => {
	return (
		<div className={"product-item col-6 col-md-4 col-lg-3 "+product.category} key={product.id}>
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
							<a
								href="/product-detail"
								className="btn-product btn-quickview"
								title="Quick view"
							>
								<span>quick view</span>
							</a>
						</div>
					</figure>

					<div className="product-body">
						<h3 className="product-title">
							<a href="/product-detail">{product.title}</a>
						</h3>
						<div className="product-action">
							<a href="#!" className="btn-product btn-cart">
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
