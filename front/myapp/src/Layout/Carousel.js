import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';

const Carousel = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Dynamically set the base URL based on the environment
  const BASE_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://e-market-fnu1.onrender.com'
      : process.env.REACT_APP_API_URL || 'http://localhost:5000';
      
  const fetchCarouselProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/products/random?limit=15`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching carousel products:', error);
      setError(error.message);
    }
  };

  const navigateToProductDetail = (productId) => {
    window.location.href = `/products/${productId}`;
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  }, [products.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  useEffect(() => {
    fetchCarouselProducts();
  }, []);

  return (
    <div className="relative w-full overflow-hidden h-80">
      {error ? (
        <p>Error loading carousel: {error}</p>
      ) : (
        <>
          <div className="flex transition-transform duration-500 ease-in-out">
            {products.length > 0 && (
              <div className="carousel-item w-full flex flex-col items-center justify-center h-full">
                <img
                  className="object-cover h-80 w-full"
                    src={products[currentIndex].images[0]}
                  alt={products[currentIndex].name}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 p-4">
                  <h2 className="text-green-500 italic text-xl font-bold text-center mb-2">
                    Limited Time Offer!
                  </h2>
                  <p className="text-yellow-300 font-bold text-sm text-center mb-4">
                    Grab this fantastic product now!
                  </p>
                  <button
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg transition duration-200 hover:bg-blue-700"
                    onClick={() => navigateToProductDetail(products[currentIndex]._id)}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            )}
          </div>
          <button
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow hover:bg-gray-200"
            onClick={prevSlide}
          >
            ❮
          </button>
          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow hover:bg-gray-200"
            onClick={nextSlide}
          >
            ❯
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
