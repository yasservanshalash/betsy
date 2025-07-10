import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, Heart, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../../redux/slices/cart";
import { favoriteActions } from "../../redux/slices/favorite";
import { AppDispatch, RootState } from "../../redux/store";
import { removeFromCartThunk, updateCart } from "../../redux/thunks/cart";
import { addToFavoritesThunk } from "../../redux/thunks/favorite";
import { Cart, Product } from "../../types/types";

interface CartItemProps {
  product: Product;
  index: number;
  cart: Cart;
}

const CartItem: React.FC<CartItemProps> = ({ product, index, cart }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const favorite = useSelector((state: RootState) => state.favorites.favorites);
  const dispatchThunk = useDispatch<AppDispatch>();
  const dispatch = useDispatch();

  const decrement = () => {
    if (product.quantity <= 1) {
      return;
    } else {
      dispatch(cartActions.decrement(product));
    }
  };

  const increment = () => {
    if (product.quantity >= product.quantityLeft) {
      return;
    } else {
      dispatch(cartActions.increment(product));
    }
  };

  useEffect(() => {
    dispatchThunk(updateCart(cart));
  }, [dispatch, dispatchThunk, cart]);

  const removeFromCart = () => {
    if (user._id === "") {
      dispatch(cartActions.removeFromcart(product));
    } else {
      dispatch(cartActions.removeFromcart(product));
      dispatchThunk(removeFromCartThunk(user._id, cart, product));
    }
  };

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
        dispatchThunk(addToFavoritesThunk(user._id, favorite, product));
      }
    }
  };

  const isInFavorites = favorite.products.find((item) => item.name === product.name);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100">
      <div className="flex flex-col md:flex-row gap-4">
        
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Link to={`/products/${product._id}`} className="block">
            <img
              src={product.image}
              alt={product.name}
              className="w-48 h-48 object-cover rounded-xl hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <Link 
              to={`/products/${product._id}`}
              className="block mb-3"
            >
              <h3 className="text-lg font-semibold text-neutral-800 hover:text-primary-600 transition-colors line-clamp-2">
                {product.name}
              </h3>
            </Link>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-4">
              <motion.button
                onClick={addToFav}
                disabled={!!isInFavorites}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-all ${
                  isInFavorites
                    ? "border-primary-300 text-primary-600 bg-primary-50 cursor-not-allowed"
                    : "border-neutral-300 text-neutral-700 hover:border-primary-300 hover:text-primary-600"
                }`}
                whileHover={!isInFavorites ? { scale: 1.02 } : {}}
                whileTap={!isInFavorites ? { scale: 0.98 } : {}}
              >
                <Heart className={`w-4 h-4 ${isInFavorites ? "fill-current" : ""}`} />
                <span className="text-sm font-medium">
                  {isInFavorites ? "Saved" : "Save for later"}
                </span>
              </motion.button>

              <motion.button
                onClick={removeFromCart}
                className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm font-medium">Remove</span>
              </motion.button>
            </div>
          </div>

          {/* Quantity and Stock Info */}
          <div className="text-sm text-neutral-600 mb-2">
            {product.quantityLeft > 0 ? (
              <span className="text-green-600">
                {product.quantityLeft} left in stock
              </span>
            ) : (
              <span className="text-red-600">Out of stock</span>
            )}
          </div>
        </div>

        {/* Quantity Controls and Price */}
        <div className="flex flex-col justify-between items-end">
          
          {/* Quantity Controls */}
          <div className="flex items-center gap-2 mb-4">
            <motion.button
              onClick={decrement}
              disabled={product.quantity <= 1}
              className={`p-2 rounded-lg border transition-all ${
                product.quantity <= 1
                  ? "border-neutral-200 text-neutral-400 cursor-not-allowed"
                  : "border-neutral-300 text-neutral-700 hover:border-primary-300 hover:text-primary-600"
              }`}
              whileHover={product.quantity > 1 ? { scale: 1.1 } : {}}
              whileTap={product.quantity > 1 ? { scale: 0.9 } : {}}
            >
              <Minus className="w-4 h-4" />
            </motion.button>
            
            <span className="w-8 text-center font-medium text-neutral-800">
              {product.quantity}
            </span>
            
            <motion.button
              onClick={increment}
              disabled={product.quantity >= product.quantityLeft}
              className={`p-2 rounded-lg border transition-all ${
                product.quantity >= product.quantityLeft
                  ? "border-neutral-200 text-neutral-400 cursor-not-allowed"
                  : "border-neutral-300 text-neutral-700 hover:border-primary-300 hover:text-primary-600"
              }`}
              whileHover={product.quantity < product.quantityLeft ? { scale: 1.1 } : {}}
              whileTap={product.quantity < product.quantityLeft ? { scale: 0.9 } : {}}
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="text-2xl font-bold text-neutral-800">
              €{(product.price * product.quantity).toFixed(2)}
            </div>
            {product.quantity > 1 && (
              <div className="text-sm text-neutral-500">
                €{product.price.toFixed(2)} each
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
