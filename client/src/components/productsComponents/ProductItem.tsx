import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star, Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../../redux/slices/cart";
import { favoriteActions } from "../../redux/slices/favorite";
import { AppDispatch, RootState } from "../../redux/store";
import { addToCartThunk, removeFromCartThunk } from "../../redux/thunks/cart";
import {
  addToFavoritesThunk,
  removeFromFavoritesThunk,
} from "../../redux/thunks/favorite";
import { Product } from "../../types/types";

interface ProductItemProps {
  product: Product
  viewMode?: 'grid' | 'list'
}

const ProductItem: React.FC<ProductItemProps> = ({ product, viewMode = 'grid' }) => {
  const [isHovered, setIsHovered] = useState(false)
  const favorite = useSelector((state: RootState) => state.favorites.favorites);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const thunkDispatch = useDispatch<AppDispatch>();

  const isFavorited = favorite.products.find((item) => item.name === product.name)
  const isInCart = cart.products.find((item) => item.name === product.name)

  const addToFav = () => {
    if (user._id === "") {
      if (favorite.products.find((item) => item.name === product.name)) {
        return;
      } else {
        dispatch(favoriteActions.addToFavorites(product));
      }
    } else {
      if (favorite.products.find((item) => item.name === product.name)) {
        return;
      } else {
        dispatch(favoriteActions.addToFavorites(product));
        thunkDispatch(addToFavoritesThunk(user._id, favorite, product));
      }
    }
  };

  const removeFromFav = () => {
    if (user._id === "") {
      dispatch(favoriteActions.removeFromFavorites(product));
    } else {
      dispatch(favoriteActions.removeFromFavorites(product));
      thunkDispatch(removeFromFavoritesThunk(user._id, favorite, product));
    }
  };

  const addToCart = () => {
    if (user._id === "") {
      if (cart.products.find((item) => item.name === product.name) || product.quantityLeft <= 0) {
        return;
      } else {
        dispatch(cartActions.addTocart(product));
      }
    } else {
      if (cart.products.find((item) => item.name === product.name) || product.quantityLeft <= 0) {
        return;
      } else {
        dispatch(cartActions.addTocart(product));
        thunkDispatch(addToCartThunk(user._id, cart, product));
      }
    }
  };

  const removeFromCart = () => {
    if (user._id === "") {
      dispatch(cartActions.removeFromcart(product));
    } else {
      dispatch(cartActions.removeFromcart(product));
      thunkDispatch(removeFromCartThunk(user._id, cart, product));
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isFavorited) {
      removeFromFav()
    } else {
      addToFav()
    }
  }

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInCart) {
      removeFromCart()
    } else {
      addToCart()
    }
  }

  // Star rating component
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-neutral-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-neutral-500">({rating})</span>
      </div>
    )
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        className="group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-neutral-100 hover:border-neutral-200">
          <div className="flex gap-6">
            
            {/* Product Image */}
            <Link to={`/products/${product._id}`} className="flex-shrink-0">
              <div className="relative w-32 h-32 bg-neutral-50 rounded-xl overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <Link to={`/products/${product._id}`}>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
              </Link>
              
              <div className="mb-3">
                <StarRating rating={product.rating || 0} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-neutral-900">€{product.price}</span>
                  {product.quantityLeft <= 5 && product.quantityLeft > 0 && (
                    <p className="text-sm text-orange-600 mt-1">Only {product.quantityLeft} left!</p>
                  )}
                  {product.quantityLeft <= 0 && (
                    <p className="text-sm text-red-600 mt-1">Out of stock</p>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Favorite Button */}
                  <motion.button
                    onClick={handleFavoriteClick}
                    className={`p-2 rounded-full border transition-all duration-300 ${
                      isFavorited 
                        ? 'bg-red-50 border-red-200 text-red-500' 
                        : 'bg-white border-neutral-200 text-neutral-400 hover:text-red-500 hover:border-red-200'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                  </motion.button>

                  {/* Add to Cart Button */}
                  <motion.button
                    onClick={handleCartClick}
                    disabled={product.quantityLeft <= 0}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                      product.quantityLeft <= 0
                        ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                        : isInCart
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                    whileHover={product.quantityLeft > 0 ? { scale: 1.02 } : {}}
                    whileTap={product.quantityLeft > 0 ? { scale: 0.98 } : {}}
                  >
                    {isInCart ? (
                      <>
                        <Minus className="w-4 h-4" />
                        Remove
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Add to Cart
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  // Grid view (default)
  return (
    <motion.div
      className="group relative w-full max-w-sm mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Card Container */}
      <div className="relative bg-white rounded-2xl p-4 shadow-soft hover:shadow-medium transition-all duration-300 border border-neutral-100 hover:border-neutral-200">
        
        {/* Product Image */}
        <Link to={`/products/${product._id}`} className="block relative">
          <div className="relative overflow-hidden rounded-xl mb-4 aspect-square bg-neutral-50">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Stock Badge */}
            {product.quantityLeft <= 5 && product.quantityLeft > 0 && (
              <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                Only {product.quantityLeft} left
              </div>
            )}
            {product.quantityLeft <= 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                Out of stock
              </div>
            )}
          </div>
        </Link>

        {/* Favorite Button */}
        <motion.button
          onClick={handleFavoriteClick}
          className={`absolute top-6 right-6 p-2 rounded-full backdrop-blur-sm border transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          } ${
            isFavorited 
              ? 'bg-red-50 border-red-200 text-red-500' 
              : 'bg-white/80 border-white/50 text-neutral-400 hover:text-red-500'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart 
            className={`w-4 h-4 transition-all duration-200 ${
              isFavorited ? 'fill-current' : ''
            }`}
          />
        </motion.button>

        {/* Product Info */}
        <div className="space-y-3">
          {/* Product Name */}
          <Link to={`/products/${product._id}`}>
            <h3 className="font-semibold text-neutral-800 text-sm leading-tight line-clamp-2 hover:text-primary-600 transition-colors duration-200">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <StarRating rating={product.rating || 0} />

          {/* Price and Cart Button */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-neutral-900">
              €{product.price}
            </span>
            
            {/* Add to Cart Button */}
            <motion.button
              onClick={handleCartClick}
              disabled={product.quantityLeft <= 0}
              className={`flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 ${
                product.quantityLeft <= 0
                  ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                  : isInCart
                  ? 'bg-green-100 text-green-700'
                  : isHovered
                  ? 'bg-primary-600 text-white'
                  : 'bg-primary-100 text-primary-700'
              }`}
              whileHover={product.quantityLeft > 0 ? { scale: 1.05 } : {}}
              whileTap={product.quantityLeft > 0 ? { scale: 0.95 } : {}}
            >
              {isInCart ? (
                <>
                  <Minus className="w-3 h-3" />
                  Remove
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3" />
                  {isHovered ? 'Add to Cart' : 'Add'}
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductItem;
