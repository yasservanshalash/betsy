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
    <Box sx={{ width: "200px",p:0, position: "relative"}} onMouseEnter={() => setFavoriteIconVisibility(true)} onMouseLeave={() => setFavoriteIconVisibility(false)}>
      <img
        className="popular-item-image"
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: "170px"}}
      />
      <IconButton sx={{display: favoriteIconVisibility ? "": "none",position: "absolute", right:"10px", top:"10px", color: "red", background: "white"}} onClick={removeFromFavorites}>
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
