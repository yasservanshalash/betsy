import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import CartComponent from '../components/Cart/CartComponent'
import Footer from '../components/Footer/Footer'
import NavBar from '../components/NavBar/NavBar'
import { RootState } from '../redux/store'

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart.cart)
  return (
    <Box>
            <Box sx={{display: "flex", justifyContent: "center"}}>
      <Typography variant='h5' sx={{textAlign: "center", m: 5, display: cart.products.length > 0 ? "none" : "block"}}>Your basket is empty.</Typography>

      </Box>
        <CartComponent/>
    </Box>
  )
}

export default Cart