import { Box, InputBase, Typography } from '@mui/material'
import React from 'react'

const OffersSubscription = () => {
  return (
    <Box sx={{background: "#D7E5F4", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", p: 5, textAlign: "center"}}>
    <Typography sx={{fontWeight: "bold"}}>Yes! Send me exclusive offers, unique gift ideas, and personalized tips for shopping and selling on Betsy.</Typography>
    <Box
          component="form"
          sx={{
            p: "4px 10px",
            display: "flex",
            justifyContent:"center",
            alignItems: "center",
            background: "white",
            borderRadius: "20px",
            my: 2,
            mt: {md: "3"},
            border: "1px solid black",
            width: {xs: "inherit", md: "400px"}
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, flexGrow: 1 }}
            placeholder="Enter your email"
            inputProps={{ "aria-label": "Enter your email..." }}
          />
        <Typography>Subscribe</Typography>
        </Box>
    </Box>
  )
}

export default OffersSubscription