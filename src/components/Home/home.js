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
			const response = await fetch("http://fakestoreapi.com/products");
			if (!response.ok) {
				throw new Error("Something went wrong!");
			}
			const data = await response.json();
			const loadedProducts = [];
            let slug  = ''
			for (const key in data) {
                slug = data[key].category.toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '')
				loadedProducts.push({
					id: data[key].id,
					title: data[key].title,
					category: slug,
					description: data[key].description,
					image: data[key].image,
					price: data[key].price,
					rating: data[key].rating.rate,
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
			const response = await fetch("https://fakestoreapi.com/products/categories");
			if (!response.ok) {
				throw new Error("Something went wrong!");
			}
			const data = await response.json();
			const loadedCategories = [];
			let slug  = ''
            for (const key in data) {
                slug = data[key].toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '')
				loadedCategories.push({
					id: key,
					title: slug
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
	}, []);

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
