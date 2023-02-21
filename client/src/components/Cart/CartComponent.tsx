import { Box, Typography } from '@mui/material'
import React from 'react'

const CartComponent = () => {
  return (
    <Box sx={{width: {xs: "100%", sm: "100%", md: "80%"}, margin: "0 auto"}}>
        <Typography variant='h5' sx={{textAlign: "center", m: 5}}>Your basket is empty.</Typography>
    </Box>
  )
}

export default CartComponent