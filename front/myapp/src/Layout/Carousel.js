import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Carousel = () => {
  // Carousel state to track the current slide index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Images for the carousel stored in the public folder
  const slides = [
    {
      url: '/images/camera1.jpg',
      title: 'Premium Quality Smart Camera',
      description: 'Stay connected with this stylish, high-performance Smart Camera',
      cta: 'Shop Now',
      price: '$199.99'
    },
    {
      url: '/images/headphoneSony.jpg',
      title: ' Headphones',
      description: 'Experience the next level of sound with our wireless headphones',
      cta: 'Buy Now',
      price: '$149.99'
    },
    {
      url: '/images/laptop3.jpg',
      title: 'Sleek Modern Laptop',
      description: 'Ultra-lightweight laptop perfect for work or play',
      cta: 'Discover More',
      price: '$999.99'
    },
      {
          url: '/images/projectore2.jpg',
          title: 'Sleek Modern Projectore',
          description: 'Ultra-lightweight laptop perfect for work or play',
          cta: 'Discover More',
          price: '$999.99'
      },
      {
          url: '/images/smartTv2.jpg',
          title: 'Sleek Modern TV',
          description: 'Ultra-lightweight laptop perfect for work or play',
          cta: 'Discover More',
          price: '$999.99'
      },
      {
          url: '/images/smartPhone6.jpg',
          title: 'Sleek Modern Smart Phone',
          description: 'Ultra-lightweight Smart Phone perfect for work or play',
          cta: 'Discover More',
          price: '$999.99'
      },
      {
          url: '/images/Tablet4.jpg',
          title: 'Sleek Modern Tablet',
          description: 'Ultra-lightweight Tablet perfect for work or play',
          cta: 'Discover More',
          price: '$999.99'
      }
  ];

  // Auto-slide and infinite loop logic
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000); // Slide every 5 seconds
    return () => clearInterval(interval); // Clean up interval on unmount
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  // Slide transition with fade effect
  return (
    <div className="relative w-full h-96 overflow-hidden">
      {/* Map through slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Background image */}
          <img src={slide.url} alt={slide.title} className="w-full h-full object-cover" />

          {/* Overlay with content */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-4">
            <h2 className="text-4xl font-bold text-white mb-2">{slide.title}</h2>
            <p className="text-white mb-4">{slide.description}</p>
            <p className="text-xl font-semibold text-yellow-400">{slide.price}</p>
            <button className="mt-4 px-6 py-2 bg-yellow-500 text-white font-bold rounded-full hover:bg-yellow-600">
                           <Link to={'/cart'}> {slide.cta}</Link>
            </button>
          </div>
        </div>
      ))}

      {/* Previous and Next Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75"
      >
        ❯
      </button>

      {/* Dots navigation */}
      <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => setCurrentIndex(slideIndex)}
            className={`w-4 h-4 rounded-full ${slideIndex === currentIndex ? 'bg-yellow-500' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
