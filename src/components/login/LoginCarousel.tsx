"use client";

import React from 'react';
import Carousel from '@/components/common/Carousel';

const carouselSlides = [
  {
    image: '/images/carousel/calendar.svg',
    title: 'Organize your family life',
    description: 'Family Circle lets you organize the whole family\'s schedule, activities and to-do lists in one simple space.'
  },
  {
    image: '/images/carousel/tasks.svg',
    title: 'Manage family tasks',
    description: 'Create and assign tasks to family members, track progress, and celebrate completions together.'
  },
  {
    image: '/images/carousel/photos.svg',
    title: 'Share special moments',
    description: 'Upload and organize family photos and videos to preserve your precious memories.'
  },
  {
    image: '/images/carousel/events.svg',
    title: 'Never miss important events',
    description: 'Keep track of birthdays, anniversaries, and family gatherings with our shared calendar.'
  },
  {
    image: '/images/carousel/chat.svg',
    title: 'Stay connected',
    description: 'Chat with family members and create group conversations for different topics.'
  }
];

const LoginCarousel: React.FC = () => {
  return <Carousel slides={carouselSlides} />;
};

export default LoginCarousel; 