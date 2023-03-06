import { Box, IconButton, Paper, Rating, Typography } from "@mui/material";
import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite"
import { useDispatch, useSelector } from "react-redux";
import { favoriteActions } from "../../redux/slices/favorite";
import { Product } from "../../types/types";
import { AppDispatch, RootState } from "../../redux/store";
import { removeFromFavoritesThunk } from "../../redux/thunks/favorite";
import { Link } from "react-router-dom";
const FavoriteItem = ({
  product
}: {
  product: Product
}) => {
    const user = useSelector((state: RootState) => state.user.user)
    const favorite = useSelector((state: RootState) => state.favorites.favorites)
    const [favoriteIconVisibility, setFavoriteIconVisibility] = useState<Boolean>(false)

    const dispatch = useDispatch();
    const thunkDispatch = useDispatch<AppDispatch>();
    
    const removeFromFav = () => {
      if (user._id === "") {
        dispatch(favoriteActions.removeFromFavorites(product));
      } else {
        dispatch(favoriteActions.removeFromFavorites(product));
        thunkDispatch(removeFromFavoritesThunk(user._id, favorite, product));
      }
    };
  return (
    <Box sx={{ width: "200px",p:0, position: "relative"}} onMouseEnter={() => setFavoriteIconVisibility(true)} onMouseLeave={() => setFavoriteIconVisibility(false)}>
      <Link to={`/products/${product._id}`} >
      <img
        className="popular-item-image"
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: "170px", objectFit: "contain"}}
      />
      </Link>
      <IconButton sx={{display: favoriteIconVisibility ? "": "none",position: "absolute", right:"10px", top:"10px", color: "red", background: "white"}} onClick={removeFromFav}>
      <FavoriteIcon/>
      </IconButton>
      <Box sx={{p:2, position: "relative"}}>
      <Typography variant="subtitle2"
        sx={{
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
        noWrap
      >
        {product.name}
      </Typography>
      <Rating sx={{ color: "black", fontSize: "95%"}} value={product.rating} readOnly />
      <Typography>{`€ ${product.price}`}</Typography>
            </Box>

    </Box>
  );
};

export default FavoriteItem;
