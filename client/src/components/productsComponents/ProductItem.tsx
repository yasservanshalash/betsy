import { Box, Rating, Typography } from '@mui/material'
import React from 'react'
import { Product } from '../../types/types'

const ProductItem = ({product}: {product: Product}) => {
  return (
    <Box>
        <img src={product.image} alt={product.name} />
        <Typography>{product.name}</Typography>
        <Rating readOnly value={product.rating}/>
        <Typography>{`€ ${product.price}`}</Typography>
    </Box>
  )
}

export default ProductItem
