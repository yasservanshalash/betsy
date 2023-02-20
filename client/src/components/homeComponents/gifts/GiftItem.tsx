import { Box, Card, CardMedia, Rating, Typography } from '@mui/material'
import React from 'react'

const GiftItem = ({categoryImage, categoryTitle}: {categoryImage: string, categoryTitle: string}) => {
  return (
    <Card sx={{width: "200px", display: "flex", flexDirection: "column",justifyContent: "center", alignItems: "center"}}>
        <CardMedia>
        <img className="popular-item-image" src={categoryImage} alt={categoryTitle} style={{width: "190px", height: "170px", borderRadius: "10px"}} />

        </CardMedia>
        <Typography sx={{p: 1}}>{categoryTitle}</Typography>
    </Card>  )
}

export default GiftItem