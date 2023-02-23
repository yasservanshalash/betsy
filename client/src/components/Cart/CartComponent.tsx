import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Product } from '../../types/types'
import ProductItem from '../productsComponents/ProductItem'

const CartComponent = () => {
  const cart = useSelector((state: RootState) => state.cart.cart)
  return (
    <Box sx={{width: {xs: "100%", sm: "100%", md: "80%"}, margin: "0 auto"}}>
        <Typography variant='h5' sx={{textAlign: "center", m: 5, display: cart.products.length === 0 ? "block" : "none"}}>Your basket is empty.</Typography>
        <Box>
          {
            cart.products.map((item: Product) => {
              return (
                <ProductItem product={item} />
              )
            })
          }
        </Box>
    </Box>
  )
}

export default CartComponent