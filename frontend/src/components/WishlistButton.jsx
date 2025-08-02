import React, { useContext } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { WishlistContext } from '../components/WishlistContext';

const WishlistButton = ({ product, size = "medium", showTooltip = true }) => {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const isInWishlist = wishlist.some(item => item.id === product.id);

  const button = (
    <IconButton
      onClick={() => toggleWishlist(product)}
      size={size}
      color={isInWishlist ? "error" : "default"}
    >
      {isInWishlist ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );

  return showTooltip ? <Tooltip title={isInWishlist ? "Bỏ khỏi yêu thích" : "Thêm vào yêu thích"}>{button}</Tooltip> : button;
};

export default WishlistButton;