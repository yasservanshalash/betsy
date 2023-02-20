import { Box, Rating, Typography } from '@mui/material'
import React from 'react'
import "./PopularItem.css"

const PopularItem = ({image, title, price, rating}: {image:string, title:string, price: string, rating: number}) => {
  return (
    <Box sx={{width: "200px"}}>
        <img className="popular-item-image" src={image} alt={title} style={{width: "190px", height: "170px", borderRadius: "10px"}} />
        
        <Typography sx={{textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}} noWrap>{title}</Typography>
        <Rating sx={{color: "black"}} value={rating} readOnly />
    <Typography>{`€ ${price}`}</Typography>
    </Box>
  )
}

export default PopularItem