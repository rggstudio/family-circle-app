"use client";

import React, { useState, useEffect } from 'react';
import { getFilesInDirectory } from '@/services/storageService';
import Image from 'next/image';

interface ImageGalleryProps {
  path: string;
  title?: string;
  className?: string;
  onImageClick?: (url: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  path,
  title,
  className = "",
  onImageClick,
}) => {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const imageUrls = await getFilesInDirectory(path);
        setImages(imageUrls);
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Failed to load images. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [path]);

  const handleImageClick = (url: string) => {
    if (onImageClick) {
      onImageClick(url);
    }
  };

  return (
    <div className={`w-full ${className} text-gray-800 dark:text-white`}>
      {title && (
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
      )}
      
      {isLoading && (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      {!isLoading && !error && images.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No images found in this gallery.
        </div>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((url, index) => (
          <div 
            key={index} 
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => handleImageClick(url)}
          >
            <Image
              src={url}
              alt={`Gallery image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery; 