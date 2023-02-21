import { Box, IconButton, Rating, Typography } from '@mui/material'
import React, { useState } from 'react'
import "./PopularItem.css"
import Favorite from '@mui/icons-material/Favorite'
const PopularItem = ({image, title, price, rating}: {image:string, title:string, price: string, rating: number}) => {
  const [favoriteIconVisibility, setFavoriteIconVisibility] = useState<Boolean>(false)

  return (
    <Box sx={{width: "200px", position: "relative"}} onMouseEnter={() => setFavoriteIconVisibility(true)} onMouseLeave={() => setFavoriteIconVisibility(false)}>
        <img className="popular-item-image" src={image} alt={title} style={{width: "190px", height: "170px", borderRadius: "10px"}} />
        <IconButton sx={{display: favoriteIconVisibility ? "": "none",position: "absolute", right:"25px", bottom:"190px", color: "gray", background: "white"}}>
      <Favorite/>
      </IconButton>
        <Typography sx={{textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}} noWrap>{title}</Typography>
        <Rating sx={{color: "black"}} value={rating} readOnly />
    <Typography>{`€ ${price}`}</Typography>
    </Box>
  )
}

export default PopularItem