import { Box, IconButton, Paper, Rating, Typography } from "@mui/material";
import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite"
import { useDispatch } from "react-redux";
import { favoriteActions } from "../../redux/slices/favorite";
import { Product } from "../../types/types";
const FavoriteItem = ({
  product
}: {
  product: Product
}) => {

    const [favoriteIconVisibility, setFavoriteIconVisibility] = useState<Boolean>(false)

    const dispatch = useDispatch();

    const removeFromFavorites = () => {
      dispatch(favoriteActions.removeFromFavorites(product))
    }

  return (
    <Paper sx={{ width: "200px",p:1, position: "relative"}} onMouseEnter={() => setFavoriteIconVisibility(true)} onMouseLeave={() => setFavoriteIconVisibility(false)}>
      <img
        className="popular-item-image"
        src={product.image}
        alt={product.name}
        style={{ width: "190px", height: "170px" }}
      />
      <IconButton sx={{display: favoriteIconVisibility ? "": "none",position: "absolute", right:"25px", bottom:"190px", color: "red", background: "white"}} onClick={removeFromFavorites}>
      <FavoriteIcon/>
      </IconButton>
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
    </Paper>
  );
};

export default FavoriteItem;
