import React from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem.jsx/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ images, onItemClick }) => {
    return (
      <ImageGalleryList>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onItemClick={onItemClick}
          />          
        ))}    
      </ImageGalleryList>
    );
  }