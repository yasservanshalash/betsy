import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Star } from 'lucide-react'
import { Product } from '../../../types/types'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import { favoriteActions } from '../../../redux/slices/favorite'
import { addToFavoritesThunk, removeFromFavoritesThunk } from '../../../redux/thunks/favorite'

interface PopularItemProps {
  product: Product
}

const PopularItem: React.FC<PopularItemProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const favorite = useSelector((state: RootState) => state.favorites.favorites);
  const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch();
  const thunkDispatch = useDispatch<AppDispatch>()

  const isFavorited = favorite.products.find((item) => item.name === product.name)

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
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isFavorited) {
      removeFromFav()
    } else {
      addToFav()
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
      </div>
    )
  }

  return (
    <motion.div
      className="group relative w-full max-w-xs"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Card Container */}
      <div className="relative bg-white rounded-2xl p-4 shadow-soft hover:shadow-medium transition-all duration-300 border border-etsy-border hover:border-neutral-200">
        
        {/* Product Image */}
        <Link to={`/products/${product._id}`} className="block relative">
          <div className="relative overflow-hidden rounded-xl mb-4 aspect-square bg-etsy-background-secondary">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
              : 'bg-white/80 border-white/50 text-etsy-text-secondary hover:text-red-500'
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
        <div className="space-y-2">
          {/* Product Name */}
          <Link to={`/products/${product._id}`}>
            <h3 className="font-medium text-etsy-text-primary text-sm leading-tight line-clamp-2 hover:text-etsy-orange transition-colors duration-200">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center justify-between">
            <StarRating rating={product.rating || 0} />
            <span className="text-xs text-etsy-text-secondary">{product.rating || 0}</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-etsy-text-primary">
              €{product.price}
            </span>
            
            {/* Quick Add Button (appears on hover) */}
            <motion.button
              className={`px-3 py-1 bg-etsy-orange text-white text-xs font-medium rounded-full hover:bg-primary-700 transition-all duration-200 ${
                isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Quick View
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PopularItem