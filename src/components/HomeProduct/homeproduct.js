import { Fragment, useState } from "react";
import { EqualHeight } from "react-equal-height";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import HomeProductItem from "./homeproductitem";
const HomeProduct = (props) => {
	const [getPrice, setGetPrice] = useState({ min: 3, max: 7 });
	const [selectedCategory, setSelectedCategory] = useState("*");
	const handleClick = (category) => setSelectedCategory(category);

	const changeInputRange = (value) => {
		setGetPrice({ min: value.min, max: value.max });
	};
	const selectSort = () => {};
	
	return (
		<Fragment>
			<div className="container">
				<div className="toolbox toolbox-filter">
					<div className="toolbox-left">
						<a href="#!" className="filter-toggler">
							Filters
						</a>
					</div>
					<div className="toolbox-right">
						<ul className="nav-filter product-filter">
							<li className={selectedCategory==="*" ? 'active' : ''}>
								<a href="#!" data-filter="*" onClick={() => handleClick('*')}>
									All
								</a>
							</li>
							{props.categories.map((category) => (
							<li key={category.id} className={selectedCategory===category.title ? 'active' : ''}>
								<a href="#!" onClick={() => handleClick(category.title)} data-filter={"."+category.title}>
									{category.title}
								</a>
							</li>
							))}
						</ul>
					</div>
				</div>

				<div className="widget-filter-area" id="product-filter-area">
					<a href="#!" className="widget-filter-clear">
						Clean All
					</a>

					<div className="filter-area-wrapper">
						<div className="row">
							<div className="col-sm-6 col-lg-3">
								<div className="widget">
									<h3 className="widget-title">Category:</h3>

									<div className="filter-items filter-items-count">
										<div className="filter-item">
											<div className="custom-control custom-checkbox">
												<input
													type="checkbox"
													className="custom-control-input"
													id="cat-1"
												/>
												<label className="custom-control-label" htmlFor="cat-1">
													All
												</label>
											</div>
											<span className="item-count">24</span>
										</div>

										<div className="filter-item">
											<div className="custom-control custom-checkbox">
												<input
													type="checkbox"
													className="custom-control-input"
													id="cat-2"
												/>
												<label className="custom-control-label" htmlFor="cat-2">
													Furniture
												</label>
											</div>
											<span className="item-count">3</span>
										</div>

										<div className="filter-item">
											<div className="custom-control custom-checkbox">
												<input
													type="checkbox"
													className="custom-control-input"
													id="cat-3"
												/>
												<label className="custom-control-label" htmlFor="cat-3">
													Lighting
												</label>
											</div>
											<span className="item-count">2</span>
										</div>

										<div className="filter-item">
											<div className="custom-control custom-checkbox">
												<input
													type="checkbox"
													className="custom-control-input"
													id="cat-4"
												/>
												<label className="custom-control-label" htmlFor="cat-4">
													Accessories
												</label>
											</div>
											<span className="item-count">4</span>
										</div>

										<div className="filter-item">
											<div className="custom-control custom-checkbox">
												<input
													type="checkbox"
													className="custom-control-input"
													id="cat-5"
												/>
												<label className="custom-control-label" htmlFor="cat-5">
													Sale
												</label>
											</div>
											<span className="item-count">2</span>
										</div>
									</div>
								</div>
							</div>

							<div className="col-sm-6 col-lg-3">
								<div className="widget">
									<h3 className="widget-title">Sort by:</h3>

									<div className="filter-items">
										<div className="filter-item">
											<div className="custom-control custom-checkbox">
												<input
													type="radio"
													className="custom-control-input"
													id="sort-1"
													name="sortby"
													checked
													onChange={selectSort}
												/>
												<label
													className="custom-control-label"
													htmlFor="sort-1"
												>
													Default
												</label>
											</div>
										</div>

										<div className="filter-item">
											<div className="custom-control custom-checkbox">
												<input
													type="radio"
													className="custom-control-input"
													id="sort-2"
													name="sortby"
												/>
												<label
													className="custom-control-label"
													htmlFor="sort-2"
												>
													Popularity
												</label>
											</div>
										</div>

										<div className="filter-item">
											<div className="custom-control custom-checkbox">
												<input
													type="radio"
													className="custom-control-input"
													id="sort-3"
													name="sortby"
												/>
												<label
													className="custom-control-label"
													htmlFor="sort-3"
												>
													Average Rating
												</label>
											</div>
										</div>

										<div className="filter-item">
											<div className="custom-control custom-checkbox">
												<input
													type="radio"
													className="custom-control-input"
													id="sort-4"
													name="sortby"
												/>
												<label
													className="custom-control-label"
													htmlFor="sort-4"
												>
													Newness
												</label>
											</div>
										</div>

										<div className="filter-item">
											<div className="custom-control custom-checkbox">
												<input
													type="radio"
													className="custom-control-input"
													id="sort-5"
													name="sortby"
												/>
												<label
													className="custom-control-label"
													htmlFor="sort-5"
												>
													Price: Low to High
												</label>
											</div>
										</div>

										<div className="filter-item">
											<div className="custom-control custom-checkbox">
												<input
													type="radio"
													className="custom-control-input"
													id="sort-6"
													name="sortby"
												/>
												<label
													className="custom-control-label"
													htmlFor="sort-6"
												>
													Price: High to Low
												</label>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="col-sm-6 col-lg-3">
								<div className="widget">
									<h3 className="widget-title">Colour:</h3>

									<div className="filter-colors filter-colors-vertical">
										<a href="#!" style={{ background: "#b87145" }}>
											<span>Brown</span>
										</a>
										<a href="#!" style={{ background: "#f0c04a" }}>
											<span>Yellow</span>
										</a>
										<a href="#!" style={{ background: "#333333" }}>
											<span>Black</span>
										</a>
										<a
											href="#!"
											className="selected"
											style={{ background: "#cc3333" }}
										>
											<span>Red</span>
										</a>
										<a href="#!" style={{ background: "#ebebeb" }}>
											<span>White</span>
										</a>
									</div>
								</div>
							</div>

							<div className="col-sm-6 col-lg-3">
								<div className="widget">
									<h3 className="widget-title">Price:</h3>

									<div className="filter-price">
										<div className="filter-price-text">
											Price Range:
											<span id="filter-price-range"></span>
										</div>

										{/* <div id="price-slider"></div> */}
										<InputRange
											maxValue={20}
											minValue={0}
											value={getPrice}
											onChange={changeInputRange}
											onChangeComplete={(value) => console.log(value)}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
								
				<div className="products-container" data-layout="fitRows">
					 <EqualHeight>
						{props.products.filter(product => selectedCategory==="*" || product.category===selectedCategory).map((product) => (
							
							<HomeProductItem product={product} key={product.id} />
							
						))}
					 </EqualHeight> 
				</div>
			</div>

			<div className="more-container text-center mt-0 mb-7">
				<a href="category.html" className="btn btn-outline-dark-3 btn-more">
					<span>more products</span>
					<i className="la la-refresh"></i>
				</a>
			</div>
		</Fragment>
	);
};
export default HomeProduct;
