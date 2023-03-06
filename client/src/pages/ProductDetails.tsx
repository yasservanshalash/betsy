import { Box, Button, Rating, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cartActions } from "../redux/slices/cart";
import { favoriteActions } from "../redux/slices/favorite";
import { AppDispatch, RootState } from "../redux/store";
import { addToCartThunk } from "../redux/thunks/cart";
import { addToFavoritesThunk } from "../redux/thunks/favorite";
import { Product } from "../types/types";

const ProductDetails = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const user = useSelector((state: RootState) => state.user.user)
  const favorite = useSelector((state: RootState) => state.favorites.favorites);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const { id } = useParams();
  const product: Product = products.filter(
    (item: Product) => item._id === id
  )[0];

  const dispatch = useDispatch();
  const thunkDispatch = useDispatch<AppDispatch>()
  // const date = new Date(product.dateAdded)

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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <Box sx={{ width: "80%", margin: "0 auto" }}>
      <Box sx={{ display: "flex", flexDirection: {xs: "column", md: "row"},justifyContent: "center", alignItems:"center",gap: {sx: 0, md: 20} }}>
        <Box>
          <Box
            component={"img"}
            src={product.image}
            sx={{ margin: "100px 100px", width: {xs: "300px", md: "500px"}, height: {xs: "220px", md: "100%"}, objectFit: "cover"}}
          ></Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: {xs: "center", md: "flex-start"},
            gap: 5,
            width: "400px",
            my: 7,
          }}
        >
          <Box>
            <Typography
              sx={{ fontSize: "200%", fontWeight: "bold" }}
            >{`€ ${product.price}`}</Typography>
            <Typography sx={{ fontWeight: "bolder" }}>
              {product.brand}
            </Typography>
            <Typography>{`${product.name}`}</Typography>
          </Box>
          <Typography variant="subtitle2">{product.description}</Typography>
          <Box>
            <Rating
              value={product.rating}
              precision={0.25}
              sx={{ color: "black" }}
              readOnly
            />
            <Typography>Added on: {product.dateAdded?.slice(0, 10)}</Typography>
            <Typography>Quantity left: {product.quantityLeft}</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              sx={{
                color: "black",
                backgroundColor: "white",
                border: "2px solid black",
                borderRadius: "20px",
              }}
              onClick={addToFav}
            >
              Add to Favorites
            </Button>
            <Button
              sx={{
                color: "white",
                backgroundColor: "black",
                border: "2px solid black",
                borderRadius: "20px",
                "&:hover": { color: "black", background: "white" },
              }}
              onClick={addToCart}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetails;
