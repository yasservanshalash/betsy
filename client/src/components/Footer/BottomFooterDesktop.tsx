import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

const BottomFooterDesktop = () => {
    const date = new Date().getFullYear();
    const footerMessage = `© ${date} Betsy, Inc.`
  return (
    <Box sx={{p: 3,background: "#232347", display: {xs: "none", md:"flex"}, justifyContent: "space-between", alignItems: "center"}}>
        <Box sx={{display: "flex", color: "white", p: 2, gap: "10px"}}>
        <Typography variant="subtitle2" sx={{fontSize:"110%"}}>🇪🇺</Typography>
        <Divider sx={{ height: 15, m: 0.5 , background: "white"}} orientation="vertical" />

        <Typography variant='subtitle2'>English (US)</Typography>
        <Divider sx={{ height: 15, m: 0.5 , background: "white"}} orientation="vertical" />

        <Typography variant='subtitle2'>€ (EUR)</Typography>
        </Box>
        <Box sx={{display: "flex", justifyContent: "center", alignItems :"center", color: "white", p: 2, gap: "10px"}}>
        <Typography>{footerMessage}</Typography>

            <Typography variant='subtitle2' sx={{fontSize: "80%", textDecoration: "underline"}}>
                Terms of Use
            </Typography>
            <Typography variant='subtitle2' sx={{fontSize: "80%", textDecoration: "underline"}}>
                Privacy
            </Typography>
            <Typography variant='subtitle2' sx={{fontSize: "80%", textDecoration: "underline"}}>
                Cookies
            </Typography>
            <Typography variant='subtitle2' sx={{fontSize: "80%", textDecoration: "underline"}}>
            Interest-based ads
            </Typography>
            <Typography variant='subtitle2' sx={{fontSize: "80%", textDecoration: "underline"}}>
                Regions
            </Typography>
        </Box>
    </Box>  )
}

export default BottomFooterDesktop