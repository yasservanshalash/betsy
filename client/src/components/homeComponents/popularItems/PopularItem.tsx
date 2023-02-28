import { Box, IconButton, Rating, Typography } from '@mui/material'
import React, { useState } from 'react'
import "./PopularItem.css"
import Favorite from '@mui/icons-material/Favorite'
import { Product } from '../../../types/types'
import { Link } from 'react-router-dom'
const PopularItem = ({product}: {product: Product}) => {
  const [favoriteIconVisibility, setFavoriteIconVisibility] = useState<Boolean>(false)

  return (
    <Box sx={{width: "200px", position: "relative", textDecoration: "none", color: "black"}} component={Link} to={`/products/${product._id}`} onMouseEnter={() => setFavoriteIconVisibility(true)} onMouseLeave={() => setFavoriteIconVisibility(false)}>
        <img className="popular-item-image" src={product.image} alt={product.name} style={{width: "190px", height: "170px", borderRadius: "10px", objectFit: "contain"}} />
        <IconButton sx={{display: favoriteIconVisibility ? "": "none",position: "absolute", right:"25px", bottom:"190px", color: "gray", background: "white"}}>
      <Favorite/>
      </IconButton>
        <Typography sx={{textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}} noWrap>{product.name}</Typography>
        <Rating sx={{color: "black"}} value={product.rating} readOnly />
    <Typography>{`€ ${product.price}`}</Typography>
    </Box>
  )
}

export default PopularItem