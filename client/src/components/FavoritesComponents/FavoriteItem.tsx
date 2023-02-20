import { Box, IconButton, Paper, Rating, Typography } from "@mui/material";
import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite"
const FavoriteItem = ({
  image,
  title,
  price,
  rating,
}: {
  image: string;
  title: string;
  price: string;
  rating: number;
}) => {

    const [favoriteIconVisibility, setFavoriteIconVisibility] = useState<Boolean>(false)


  return (
    <Paper sx={{ width: "200px",p:1, position: "relative"}} onMouseEnter={() => setFavoriteIconVisibility(true)} onMouseLeave={() => setFavoriteIconVisibility(false)}>
      <img
        className="popular-item-image"
        src={image}
        alt={title}
        style={{ width: "190px", height: "170px" }}
      />
      <IconButton sx={{display: favoriteIconVisibility ? "": "none",position: "absolute", right:"25px", bottom:"190px", color: "red", background: "white"}}>
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
        {title}
      </Typography>
      <Rating sx={{ color: "black", fontSize: "95%"}} value={rating} readOnly />
      <Typography>{`€ ${price}`}</Typography>
    </Paper>
  );
};

export default FavoriteItem;
