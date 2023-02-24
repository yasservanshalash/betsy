import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Product } from '../../types/types'
import ProductItem from '../productsComponents/ProductItem'

const CartComponent = () => {
  const cart = useSelector((state: RootState) => state.cart.cart)
  const user = useSelector((state: RootState) => state.user.user)
  console.log(cart)
  return (
    <Box sx={{width: {xs: "100%", sm: "100%", md: "80%"}, margin: "0 auto"}}>
        <Typography variant='h5' sx={{textAlign: "center", m: 5, display: "none"}}>Your basket is empty.</Typography>
        <Box sx={{display: "grid", gridTemplateColumns: {xs: "1fr 1fr", md: "1fr 1fr 1fr 1fr"}, justifyItems: "center", alignItems: "center", justifyContent: "space-around", alignContent: "center", gridAutoFlow: "row", my: 5}}>
          {
            cart.products.length > 0 ? cart.products.map((item: Product) => {
              return (
                <ProductItem key={crypto.randomUUID()} product={item} />
              )
            }) : <h1>Nothing in cart</h1>
          }
        </Box>
    </Box>
  )
}

export default CartComponent