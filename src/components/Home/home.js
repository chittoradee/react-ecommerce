import { Fragment, useEffect, useState, useCallback } from "react";
import Header from "../Header/header";
import HomeProduct from "../HomeProduct/homeproduct";
import Slider from "../Slider/slider";
import Footer from "../Footer/footer";
const Home = () => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchProductsHandler = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(`${process.env.REACT_APP_API_URL}product/list`);
			if (!response.ok) {
				throw new Error("Something went wrong!");
			}
			const data = await response.json();
			const loadedProducts = [];
            let slug  = ''
			var products = data.data;
			for (const key in products) {
             	slug = products[key].category.toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '') 
				var image = products[key].image;
				image = image.replace(/\\/g, "/");
				loadedProducts.push({
					id: products[key]._id,
					title: products[key].title,
					category: slug,
					description: products[key].description,
					image: image,
					price: products[key].price,
					rating: products[key].rating,
				});
			}
			setProducts(loadedProducts);
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	}, []);

    const fetchCategoriesHandler = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(`${process.env.REACT_APP_API_URL}category/list`);
			if (!response.ok) {
				throw new Error("Something went wrong!");
			}
			const data = await response.json();
			const loadedCategories = [];
            for (const key in data.data) {
				loadedCategories.push({
					id: data.data[key]._id,
					slug: data.data[key].slug,
					title: data.data[key].name
				});
			}
			setCategories(loadedCategories);
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchCategoriesHandler();
		fetchProductsHandler();
	}, [fetchCategoriesHandler,fetchProductsHandler]);

    let content = <p>Found no products.</p>;

    if (products.length > 0) {
        content = <HomeProduct products={products} categories={categories} />;
    }

    if (error) {
        content = <p>{error}</p>;
    }

    if (isLoading) {
        content = <p>Loading...</p>;
    }

	return (
		<Fragment>
			
				<Header />
				<main className="main">
					<Slider />
					{content}
				</main>
				<Footer />
		</Fragment>
	);
};
export default Home;
