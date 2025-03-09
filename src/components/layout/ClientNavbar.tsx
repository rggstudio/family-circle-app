"use client";

import { useEffect, useState } from 'react';
import Navbar from './Navbar';

export default function ClientNavbar() {
  // Only render the Navbar on the client side
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same height to prevent layout shift
    return <div className="h-16 bg-gray-800"></div>;
  }

  return <Navbar />;
} 