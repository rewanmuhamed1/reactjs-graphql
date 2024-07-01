import React, { useState } from 'react';

const ImageSlider = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const selectSlide = (index) => {
    setCurrent(index);
  };

  return (
    <div className="flex  justify-center relative">
      <div className="flex flex-col  justify-center mr-4 space-y-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`thumbnail ${index}`}
            className={`w-16 h-16 object-cover rounded cursor-pointer ${index === current ? 'border-2 border-green-500' : ''}`}
            onClick={() => selectSlide(index)}
          />
        ))}
      </div>
      <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg">
        &#10094;
      </button>
      <img src={images[current]} alt={`slide ${current}`} className="w-2/4 h-full object-cover rounded" />
      <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg">
        &#10095;
      </button>
      
    </div>
  );
};

export default ImageSlider;
