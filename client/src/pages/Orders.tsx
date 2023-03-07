import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Order } from '../types/types'

const Orders = () => {
  const orders = useSelector((state: RootState) => state.orders.orders)
  const reversedOrders = [...orders].reverse();
  return (
    <Box sx={{width: "78%", margin: "0 auto", my: 5}}>
      <Typography variant='h4' sx={{mb: 5}}>My Orders</Typography>
      {
        reversedOrders.map((item: Order) => {
          return (
            <Box sx={{display: "flex", flexDirection: "column", gap: 2, my: 5}}>
              <Box sx={{display: "flex", gap: 5}}>
              <Typography>{`Order number: ${item._id.slice(0,10)}`}</Typography>
              <Divider orientation="vertical" flexItem />
              <Typography>{`Total price: €${item.totalPrice}`}</Typography>
              </Box>

            <Box sx={{display: "flex", gap: 2}}>
                {
                  item.products.map((product) => {
                    return ( 
                      <img src={product.image} style={{width: "70px", objectFit: "contain"}} />
                    )
                  })
                }
            </Box>
            <Typography>{`Paid with: ${item.paymentMethod}`}</Typography>
            <Divider variant='middle' sx={{my: 5}}/>

            </Box>

          )
        })
      }
    </Box>
  )
}

export default Orders