import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface ImageCarouselInterface {
    slideIndex: number;
    setSlideIndex(arg: any): any;
    imagesArr: any;
};

const ImageCarousel = ({
    slideIndex,
    setSlideIndex,
    imagesArr
}: ImageCarouselInterface) => {
    // Filter images to include only valid URLs
    const images = imagesArr.filter((img: string) => img && img.length > 0);

    // Navigate to the next slide
    const nextSlide = () => {
        setSlideIndex((prevIndex: any) => (prevIndex + 1) % images.length);
    };

    // Navigate to the previous slide
    const prevSlide = () => {
        setSlideIndex((prevIndex: any) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        setSlideIndex(0);
    }, [imagesArr]);

    return (
        <div className="slideshow-container">
            {images.length > 0 && images.map((img: any, index: any) => {
                return <div
                    key={index}
                    className="mySlides"
                    style={{ display: index === slideIndex ? 'block' : 'none', height: '200px', width: '250px' }}
                >
                    <Image
                        className="d-block w-100"
                        src={img || ''}
                        alt={`Slide ${index + 1}`}
                        height={100}  // Adjust height as needed
                        width={100}   // Adjust width as needed
                        loader={() => (img || '')}
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
