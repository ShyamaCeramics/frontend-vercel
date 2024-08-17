import Image from 'next/image';
import React, { useState } from 'react';

const ImageCarousel = ({ img1, img2, img3, img4 }: { img1?: string, img2?: string, img3?: string, img4?: string }) => {
    const [slideIndex, setSlideIndex] = useState(0);

    // Filter images to include only valid URLs
    const images = [img1, img2, img3, img4].filter(img => img && img.length > 0);

    // Navigate to the next slide
    const nextSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Navigate to the previous slide
    const prevSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="slideshow-container">
            {images.length > 0 && images.map((img, index) => {
                return <div
                    key={index}
                    className="mySlides"
                    style={{ display: index === slideIndex ? 'block' : 'none' }}
                >
                    <Image
                        className="d-block w-100"
                        src={img}
                        alt={`Slide ${index + 1}`}
                        height={500}  // Adjust height as needed
                        width={800}   // Adjust width as needed
                        loader={() => img}
                        style={{ height: '100%', width: '100%' }}
                    />
                </div>
            })}
            {images.length > 1 && (
                <>
                    <a className="prev" onClick={prevSlide}>&#10094;</a>
                    <a className="next" onClick={nextSlide}>&#10095;</a>
                </>
            )}
        </div>
    );
};

export default ImageCarousel;
