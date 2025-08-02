// src/components/WishlistContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem('mock-wishlist');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('mock-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      return exists ? prev.filter((item) => item.id !== product.id) : [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const newList = [...wishlist];
    [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
    setWishlist(newList);
  };

  const moveDown = (index) => {
    if (index === wishlist.length - 1) return;
    const newList = [...wishlist];
    [newList[index + 1], newList[index]] = [newList[index], newList[index + 1]];
    setWishlist(newList);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, removeFromWishlist, moveUp, moveDown }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
