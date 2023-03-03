import { Add, Favorite, ShoppingBag, ShoppingBasket } from "@mui/icons-material";
import { Box, Button, IconButton, Rating, Typography } from "@mui/material";
import { style } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
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

const ProductItem = ({ product }: { product: Product }) => {
  const [favoriteIconVisibility, setFavoriteIconVisibility] = useState<Boolean>(false)
  const [favorited, setFavorited] = useState<Boolean>(false)
  const favorite = useSelector((state: RootState) => state.favorites.favorites);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const thunkDispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    favorite.products.find((item) => item.name === product.name) ?  setFavorited(true) : setFavorited(false);
  }, [])
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
    <Box sx={{ position: "relative", width: {xs: "300px", sm: "350px"}}} onMouseEnter={() => setFavoriteIconVisibility(true)} onMouseLeave={() => setFavoriteIconVisibility(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          display: "flex",
        }}
      >
        <IconButton onClick={() => {
          favorited ? removeFromFav() : addToFav()
          }} sx={{display: favoriteIconVisibility ? "": "none"}}>
          <Favorite sx={{ color: favorited ? "red": "gray" }} />
        </IconButton>
      </Box>
      <Box sx={{p:2,textDecoration: "none", color: "black"}} >
        <Link to={`/products/${product._id}`} style={{textDecoration: "none", color: "black"}}>
        <img
        src={product.image}
        alt={product.name}
        width="100%"
        height="300px"
        style={{objectFit: "contain"}}
      />
      <Typography sx={{textDecoration: "none", color: "black"}}>{`${product.name}`}</Typography>
      <Rating value={product.rating} precision={0.25} sx={{color: "black"}} readOnly />
      <Typography sx={{textDecoration: "none", color: "black"}}>{`€ ${product.price}`}</Typography>
      </Link>

      <Button variant="outlined" startIcon={<Add />} sx={{color: "black", border: "0.5px solid black", borderRadius: "20px", textTransform: "none", "&:hover": {color: "black", backgroundColor: "#00000011", borderColor: "#000"}, mt: 1}} disabled={product.quantityLeft <= 0 ? true: false} onClick={addToCart}>
  Add to cart
</Button>
      </Box>

    </Box>
  );
};

export default ProductItem;
