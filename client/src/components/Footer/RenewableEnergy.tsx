import { Box, Typography } from '@mui/material'
import React from 'react'
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
const RenewableEnergy = () => {
  return (
    <Box sx={{background:"#4c6bc6", p:5, display: "flex",flexDirection:"column",justifyContent: "center", alignItems: "center"}}>
        <EnergySavingsLeafIcon sx={{color: "white"}}/>
        <Typography sx={{mt: 3, color: "white"}}>
        Betsy is powered by 100% renewable electricity.
        </Typography>
    </Box>
  )
}

export default RenewableEnergy