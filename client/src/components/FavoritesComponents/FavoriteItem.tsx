import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { favoriteActions } from "../../redux/slices/favorite";
import { Product } from "../../types/types";
import { AppDispatch, RootState } from "../../redux/store";
import { removeFromFavoritesThunk } from "../../redux/thunks/favorite";
import { Link } from "react-router-dom";

interface FavoriteItemProps {
  product: Product;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({ product }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const favorite = useSelector((state: RootState) => state.favorites.favorites);
  const [isHovered, setIsHovered] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const dispatch = useDispatch();
  const thunkDispatch = useDispatch<AppDispatch>();
  
  const removeFromFav = async () => {
    setIsRemoving(true);
    
    if (user._id === "") {
      dispatch(favoriteActions.removeFromFavorites(product));
    } else {
      dispatch(favoriteActions.removeFromFavorites(product));
      await thunkDispatch(removeFromFavoritesThunk(user._id, favorite, product));
    }
  };

  // Create star rating display
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-3 h-3 ${
          index < rating
            ? "fill-yellow-400 text-yellow-400"
            : "text-neutral-300"
        }`}
      />
    ));
  };

  return (
    <motion.div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-soft border border-neutral-100 hover:shadow-medium transition-all duration-300">
        
        {/* Product Image */}
        <div className="relative aspect-square bg-neutral-50">
          <Link to={`/products/${product._id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          
          {/* Remove from Favorites Button */}
          <AnimatePresence>
            {isHovered && (
              <motion.button
                onClick={removeFromFav}
                disabled={isRemoving}
                className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-medium hover:bg-white transition-all"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart 
                  className={`w-4 h-4 ${
                    isRemoving 
                      ? "text-neutral-400" 
                      : "text-red-500 fill-current"
                  }`} 
                />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Sale Badge (if applicable) */}
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Sale
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4">
          <Link to={`/products/${product._id}`}>
            <h3 className="font-medium text-neutral-800 line-clamp-2 hover:text-primary-600 transition-colors mb-2 text-sm leading-snug">
              {product.name}
            </h3>
          </Link>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {renderStars(product.rating)}
            <span className="text-xs text-neutral-500 ml-1">
              ({product.rating})
            </span>
          </div>
          
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-800">
              €{product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-neutral-500 line-through">
                €{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Loading overlay when removing */}
      {isRemoving && (
        <motion.div
          className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FavoriteItem;
