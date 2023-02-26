import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Product } from '../../types/types'
import ProductItem from '../productsComponents/ProductItem'
import CartItem from './CartItem'

const CartComponent = () => {
  const cart = useSelector((state: RootState) => state.cart.cart)
  const user = useSelector((state: RootState) => state.user.user)
  console.log(cart)
  return (
    <Box sx={{width: {xs: "100%", sm: "100%", md: "80%"}, margin: "0 auto", display: "flex"}}>
        <Typography variant='h5' sx={{textAlign: "center", m: 5, display: "none"}}>Your basket is empty.</Typography>
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", my: 5, gap: 10}}>
          {
             cart.products.length > 0 ? cart.products.map((item: Product, index) => {
              return (
                <CartItem key={crypto.randomUUID()} product={item} index={index} cart={cart}/>
              )
            }) : <h1>Nothing in cart</h1>
          }
        </Box>
        <Box sx={{width: "30%", display: "flex", justifyContent: "center"}}>
        </Box>
    </Box>
  )
}

export default CartComponent