import { Box } from '@mui/material'
import React from 'react'
import CartComponent from '../components/Cart/CartComponent'
import Footer from '../components/Footer/Footer'
import NavBar from '../components/NavBar/NavBar'

const Cart = () => {
  return (
    <Box>
        <NavBar />
        <CartComponent />
        <Footer />
    </Box>
  )
}

export default Cart