import Slide1 from '../../assets/images/demos/demo-11/slider/slide-1.jpg';
import Slide2 from '../../assets/images/demos/demo-11/slider/slide-2.jpg';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const Slider = () => {
    return (
        <div className="intro-slider-container mb-4">
                <OwlCarousel className='intro-slider owl-carousel owl-simple owl-nav-inside' loop margin={0} items={1} nav  dots={false} responsiveClass={true}>
                    <div className="intro-slide" style={{backgroundImage: `url(${Slide1})`}}>
                        <div className="container intro-content">
                            <h3 className="intro-subtitle text-primary">SEASONAL PICKS</h3>
                            <h1 className="intro-title">Get All <br />The Good Stuff</h1>
                            <a href="#!" className="btn btn-outline-primary-2">
                                <span>DISCOVER MORE</span>
                                <i className="icon-long-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                    <div className="intro-slide" style={{backgroundImage: `url(${Slide2})`}}>
                        <div className="container intro-content">
                            <h3 className="intro-subtitle text-primary">all at 50% off</h3>
                            <h1 className="intro-title text-white">The Most Beautiful <br />Novelties In Our Shop</h1>
                            <a href="#!" className="btn btn-outline-primary-2 min-width-sm">
                                <span>SHOP NOW</span>
                                <i className="icon-long-arrow-right"></i>
                            </a>
                        </div>
                    </div><div className="intro-slide" style={{backgroundImage: `url(${Slide2})`}}>
                        <div className="container intro-content">
                            <h3 className="intro-subtitle text-primary">all at 50% off</h3>
                            <h1 className="intro-title text-white">The Most Beautiful <br />Novelties In Our Shop</h1>
                            <a href="#!" className="btn btn-outline-primary-2 min-width-sm">
                                <span>SHOP NOW</span>
                                <i className="icon-long-arrow-right"></i>
                            </a>
                        </div>
                    </div><div className="intro-slide" style={{backgroundImage: `url(${Slide2})`}}>
                        <div className="container intro-content">
                            <h3 className="intro-subtitle text-primary">all at 50% off</h3>
                            <h1 className="intro-title text-white">The Most Beautiful <br />Novelties In Our Shop</h1>
                            <a href="#!" className="btn btn-outline-primary-2 min-width-sm">
                                <span>SHOP NOW</span>
                                <i className="icon-long-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </OwlCarousel>
                {/* <div className="intro-slider owl-carousel owl-simple owl-nav-inside" data-toggle="owl" data-owl-options='{
                        "nav": false, 
                        "dots": true,
                        "responsive": {
                            "992": {
                                "nav": true,
                                "dots": false
                            }
                        }
                    }'>
                    <div className="intro-slide" style={{backgroundImage: `url(${Slide1})`}}>
                        <div className="container intro-content">
                            <h3 className="intro-subtitle text-primary">SEASONAL PICKS</h3>
                            <h1 className="intro-title">Get All <br />The Good Stuff</h1>
                            <a href="#!" className="btn btn-outline-primary-2">
                                <span>DISCOVER MORE</span>
                                <i className="icon-long-arrow-right"></i>
                            </a>
                        </div>
                    </div>

                    <div className="intro-slide" style={{backgroundImage: `url(${Slide2})`}}>
                        <div className="container intro-content">
                            <h3 className="intro-subtitle text-primary">all at 50% off</h3>
                            <h1 className="intro-title text-white">The Most Beautiful <br />Novelties In Our Shop</h1>
                            <a href="#!" className="btn btn-outline-primary-2 min-width-sm">
                                <span>SHOP NOW</span>
                                <i className="icon-long-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div> */}

                {/* <span className="slider-loader"></span> */}
            </div>

    );
}
export default Slider;