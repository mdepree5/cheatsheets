import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageCarousel = () => {
    return (
        <div className="carousel">
            <Carousel
                showArrows={false}
                showThumbs={false}
                showStatus={false}
                infiniteLoop={true}
                autoPlay={true}
                stopOnHover={true}
                >
                <div>
                    <img className='carousel' src="https://www.python.org/static/community_logos/python-logo-master-v3-TM-flattened.png" alt="python" />
                </div>

                <div>
                    <img className='carousel' src="https://www.fullstackpython.com/img/logos/heroku.png" alt="heroku" />
                </div>

                <div>
                    <img className='carousel' src="https://coursework.vschool.io/content/images/size/w2000/2017/09/JavaScriptBanner.png" alt="javascript" />
                </div>
            </Carousel>
        </div>
    )
}

export default ImageCarousel;
