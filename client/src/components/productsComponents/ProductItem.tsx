import { Favorite, ShoppingBag, ShoppingBasket } from "@mui/icons-material";
import { Box, IconButton, Rating, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/slices/cart";
import { favoriteActions } from "../../redux/slices/favorite";
import { AppDispatch, RootState } from "../../redux/store";
import { addToCartThunk, removeFromCartThunk } from "../../redux/thunks/cart";
import {
  addToFavoritesThunk,
  removeFromFavoritesThunk,
} from "../../redux/thunks/favorite";
import { Product } from "../../types/types";

const ProductItem = ({ product }: { product: Product }) => {
  const favorite = useSelector((state: RootState) => state.favorites.favorites);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const thunkDispatch = useDispatch<AppDispatch>();

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
        console.log(product);
      }
    }
  };

  const removeFromFav = () => {
    if (user._id === "") {
      dispatch(favoriteActions.removeFromFavorites(product));
    } else {
      dispatch(favoriteActions.removeFromFavorites(product));
      thunkDispatch(removeFromFavoritesThunk(user._id, favorite, product));
      console.log(product);
    }
  };

  const addToCart = () => {
    if (user._id === "") {
      if (cart.products.find((item) => item.name === product.name)) {
        return;
      } else {
        dispatch(cartActions.addTocart(product));
      }
    } else {
      if (cart.products.find((item) => item.name === product.name)) {
        return;
      } else {
        dispatch(cartActions.addTocart(product));
        thunkDispatch(addToCartThunk(user._id, cart, product));
        console.log(product);
      }
    }
  };

  const removeFromCart = () => {
    if (user._id === "") {
      dispatch(cartActions.removeFromcart(product));
    } else {
      dispatch(cartActions.removeFromcart(product));
      thunkDispatch(removeFromCartThunk(user._id, cart, product));
      console.log(product);
    }
  };
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          display: "flex",
        }}
      >
        <IconButton onClick={addToFav}>
          <Favorite sx={{ color: "skyblue" }} />
        </IconButton>
        <IconButton onClick={addToCart}>
          <ShoppingBasket sx={{ color: "skyblue" }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          display: "flex",
        }}
      >
        <IconButton onClick={removeFromFav}>
          <Favorite sx={{ color: "coral" }} />
        </IconButton>
        <IconButton onClick={removeFromCart}>
          <ShoppingBasket sx={{ color: "coral" }} />
        </IconButton>
      </Box>
      <img
        src={product.image}
        alt={product.name}
        width="300px"
        height="300px"
      />
      <Typography>{product.name}</Typography>
      <Rating readOnly value={product.rating} />
      <Typography>{`€ ${product.price}`}</Typography>
    </Box>
  );
};

export default ProductItem;
