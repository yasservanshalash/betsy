import { Box, Typography } from '@mui/material'
import React from 'react'

const CartComponent = () => {
  return (
    <Box>
        <Typography variant='h5' sx={{textAlign: "center", m: 5}}>Your basket is empty.</Typography>
    </Box>
  )
}

export default CartComponent