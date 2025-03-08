"use client";

import React from 'react';
import Carousel from '@/components/common/Carousel';

const carouselSlides = [
  {
    image: '/images/carousel/calendar.svg',
    title: 'Organize your family life',
    description: 'Schedule activities and to-do lists in one simple space.'
  },
  {
    image: '/images/carousel/tasks.svg',
    title: 'Manage family tasks',
    description: 'Create tasks, track progress, and celebrate completions.'
  },
  {
    image: '/images/carousel/photos.svg',
    title: 'Share special moments',
    description: 'Upload photos and videos to preserve family memories.'
  },
  {
    image: '/images/carousel/events.svg',
    title: 'Never miss events',
    description: 'Track birthdays, anniversaries, and family gatherings.'
  },
  {
    image: '/images/carousel/chat.svg',
    title: 'Stay connected',
    description: 'Chat with family members and create group conversations.'
  }
];

const LoginCarousel: React.FC = () => {
  return <Carousel slides={carouselSlides} />;
};

export default LoginCarousel; 