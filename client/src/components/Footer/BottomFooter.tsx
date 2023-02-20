import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

const BottomFooter = () => {
    const date = new Date().getFullYear();
    const footerMessage = `© ${date} Betsy, Inc.`
  return (
    <Box sx={{p: 3,background: "#232347"}}>
        <Box sx={{display: "flex", justifyContent: "space-evenly", color: "white", p: 2}}>
        <Typography sx={{fontSize:"130%"}}>🇪🇺</Typography>
        <Divider sx={{ height: 20, m: 0.5 , background: "white"}} orientation="vertical" />

        <Typography>English (US)</Typography>
        <Divider sx={{ height: 20, m: 0.5 , background: "white"}} orientation="vertical" />

        <Typography>€ (EUR)</Typography>
        </Box>
        <Box sx={{display: "flex", justifyContent: "center", color: "white", pt: 2}}>
        <Typography>{footerMessage}</Typography>
        </Box>
        <Box sx={{display: "flex", justifyContent: "space-evenly", color: "white", p: 2}}>
            <Typography variant='subtitle2' sx={{fontSize: "65%", textDecoration: "underline"}}>
                Terms of Use
            </Typography>
            <Typography variant='subtitle2' sx={{fontSize: "65%", textDecoration: "underline"}}>
                Privacy
            </Typography>
            <Typography variant='subtitle2' sx={{fontSize: "65%", textDecoration: "underline"}}>
                Cookies
            </Typography>
            <Typography variant='subtitle2' sx={{fontSize: "65%", textDecoration: "underline"}}>
            Interest-based ads
            </Typography>
            <Typography variant='subtitle2' sx={{fontSize: "65%", textDecoration: "underline"}}>
                Regions
            </Typography>
        </Box>
    </Box>
  )
}

export default BottomFooter