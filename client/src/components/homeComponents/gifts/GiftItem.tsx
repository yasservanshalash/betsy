import { Box, Card, CardMedia, Rating, Typography } from '@mui/material'
import React from 'react'
import {Link} from 'react-router-dom'

const GiftItem = ({categoryImage, categoryTitle, category}: {categoryImage: string, categoryTitle: string, category: string}) => {
  return (
    <Card sx={{width: "200px", display: "flex", flexDirection: "column",justifyContent: "center", alignItems: "center", textDecoration: "none"}} component={Link} to={`/c/${category}`}>
        <CardMedia>
        <img className="popular-item-image" src={categoryImage} alt={categoryTitle} style={{width: "190px", height: "170px", borderRadius: "10px"}} />

        </CardMedia>
        <Typography sx={{p: 1}}>{categoryTitle}</Typography>
    </Card>  )
}

export default GiftItem