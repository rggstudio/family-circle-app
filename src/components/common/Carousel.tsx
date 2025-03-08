"use client";

import React, { useState, useEffect } from 'react';

interface CarouselSlide {
  image: string;
  title: string;
  description: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  autoPlayInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ 
  slides, 
  autoPlayInterval = 5000 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, autoPlayInterval);
    
    return () => clearInterval(interval);
  }, [slides.length, autoPlayInterval]);

  // Handle manual navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      {/* Slides */}
      <div className="relative overflow-hidden rounded-lg" style={{ height: '180px' }}>
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
              <h2 className="text-2xl font-bold text-white mb-3">{slide.title}</h2>
              <p className="text-gray-300 text-base max-w-xs">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide 
                ? 'bg-blue-500' 
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel; 