import { Box, Button, Rating, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../redux/store'
import { Product } from '../types/types'

const ProductDetails = () => {
    const products = useSelector((state: RootState) => state.products.products);
    const { id } = useParams()
    const product: Product = products.filter((item: Product) => item._id === id)[0]
    console.log(product)
    console.log(id)
    console.log(typeof product.dateAdded)
    // const date = new Date(product.dateAdded)
  return (
    <Box sx={{width: "80%", margin: "0 auto"}}>
        <Box sx={{display: "flex", justifyContent: "flex-start", gap: 20}}>
        <Box>
            <img src={product.image} width="500px" style={{margin: "100px 100px"}}/>
        </Box>
        <Box sx={{display: "flex", flexDirection: "column", gap: 5, width: "400px", my: 7}}>
            <Box>
            <Typography sx={{fontSize: "200%", fontWeight: "bold"}}>{`€ ${product.price}`}</Typography>
            <Typography sx={{fontWeight: "bolder"}}>{product.brand}</Typography>
            <Typography>{`${product.name}`}</Typography>
            </Box>
            <Typography>{product.description}</Typography>
            <Box>
            <Rating value={product.rating} precision={0.25} sx={{color: "black"}} readOnly />
            <Typography>Added on: {product.dateAdded?.slice(0,10)}</Typography>
            <Typography>Quantity left: {product.quantityLeft}</Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column",gap: 2}}>
                <Button sx={{color: "black", backgroundColor: "white", border: "2px solid black", borderRadius: "20px"}}>Add to Favorites</Button>
                <Button sx={{color: "white", backgroundColor: "black", border: "2px solid black", borderRadius: "20px"}}>Add to Cart</Button>

            </Box>
        </Box>
        </Box>
    </Box>
  )
}

export default ProductDetails