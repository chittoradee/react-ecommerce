import React, { Fragment } from "react";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import pageHeaderImage from "../../assets/images/page-header-bg.jpg";
import product1Image from "../../assets/images/products/table/product-1.jpg";
import { Link } from "react-router-dom";
const Wishlist = () => {
    return (
        <Fragment>
			<Header />
			<main class="main">
        	<div class="page-header text-center" style={{backgroundImage: `url(${pageHeaderImage})`}}>
        		<div class="container">
        			<h1 class="page-title">Wishlist<span>Shop</span></h1>
        		</div>
        	</div>
            <nav aria-label="breadcrumb" class="breadcrumb-nav">
                <div class="container">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">Wishlist</li>
                    </ol>
                </div>
            </nav>

            <div class="page-content">
            	<div class="container">
					<table class="table table-wishlist table-mobile">
						<thead>
							<tr>
								<th>Product</th>
								<th>Price</th>
								<th>Stock Status</th>
								<th></th>
								<th></th>
							</tr>
						</thead>

						<tbody>
							<tr>
								<td class="product-col">
									<div class="product">
										<figure class="product-media">
											<a href="#!">
												<img src={product1Image} alt="Product " />
											</a>
										</figure>

										<h3 class="product-title">
											<a href="#!">Beige knitted elastic runner shoes</a>
										</h3>
									</div>
								</td>
								<td class="price-col">$84.00</td>
								<td class="stock-col"><span class="in-stock">In stock</span></td>
								<td class="action-col">
                                    <div class="dropdown">
									<button class="btn btn-block btn-outline-primary-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="icon-list-alt"></i>Select Options
                                    </button>

                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="#!">First option</a>
                                        <a class="dropdown-item" href="#!">Another option</a>
                                        <a class="dropdown-item" href="#!">The best option</a>
                                      </div>
                                    </div>
								</td>
								<td class="remove-col"><button class="btn-remove"><i class="icon-close"></i></button></td>
							</tr>
							<tr>
								<td class="product-col">
									<div class="product">
										<figure class="product-media">
											<a href="#!">
												<img src={product1Image} alt="Product " />
											</a>
										</figure>

										<h3 class="product-title">
											<a href="#!">Blue utility pinafore denim dress</a>
										</h3>
									</div>
								</td>
								<td class="price-col">$76.00</td>
								<td class="stock-col"><span class="in-stock">In stock</span></td>
								<td class="action-col">
									<button class="btn btn-block btn-outline-primary-2"><i class="icon-cart-plus"></i>Add to Cart</button>
								</td>
								<td class="remove-col"><button class="btn-remove"><i class="icon-close"></i></button></td>
							</tr>
							<tr>
								<td class="product-col">
									<div class="product">
										<figure class="product-media">
											<a href="#!">
												<img src={product1Image} alt="Product " />
											</a>
										</figure>

										<h3 class="product-title">
											<a href="#!">Orange saddle lock front chain cross body bag</a>
										</h3>
									</div>
								</td>
								<td class="price-col">$52.00</td>
								<td class="stock-col"><span class="out-of-stock">Out of stock</span></td>
								<td class="action-col">
									<button class="btn btn-block btn-outline-primary-2 disabled">Out of Stock</button>
								</td>
								<td class="remove-col"><button class="btn-remove"><i class="icon-close"></i></button></td>
							</tr>
						</tbody>
					</table>
	            	<div class="wishlist-share">
	            		<div class="social-icons social-icons-sm mb-2">
	            			<label class="social-label">Share on:</label>
	    					<a href="#!" class="social-icon" title="Facebook" target="_blank"><i class="icon-facebook-f"></i></a>
	    					<a href="#!" class="social-icon" title="Twitter" target="_blank"><i class="icon-twitter"></i></a>
	    					<a href="#!" class="social-icon" title="Instagram" target="_blank"><i class="icon-instagram"></i></a>
	    					<a href="#!" class="social-icon" title="Youtube" target="_blank"><i class="icon-youtube"></i></a>
	    					<a href="#!" class="social-icon" title="Pinterest" target="_blank"><i class="icon-pinterest"></i></a>
	    				</div>
	            	</div>
            	</div>
            </div>
        </main>
            <Footer />
		</Fragment>
    );
}
export default Wishlist;
