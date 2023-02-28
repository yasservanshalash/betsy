import { Box, Typography } from '@mui/material'
import React from 'react'
import GiftItem from './GiftItem'

const Gifts = () => {
    return (
        <Box sx={{my: 5, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <Typography sx={{textAlign: "center", fontWeight: "bold", mb: 3}}>Gifts by categories</Typography>
        <Box sx={{display: {xs: "grid", md: "flex"}, gridTemplateColumns: {sx: "1fr", sm: "1fr 1fr"}, justifyContent: "center", alignItems: "center", margin: "0 auto", p:1, gap: "10px"}}>
            <GiftItem categoryImage={"https://hips.hearstapps.com/hmg-prod/images/most-popular-video-games-of-2022-1642612227.png"} categoryTitle={"For Gamers"} category={"gaming"}/>
            <GiftItem categoryImage={"https://media.istockphoto.com/id/1196974664/nl/foto/set-van-huishoudelijke-keuken-apparaten-in-de-kamer-op-de-achtergrond-van-de-muur.jpg?s=612x612&w=0&k=20&c=T74rNC_UQh6CWGhYYtwOWJz0bgkbJIO6gTNvgjEcSWI="} categoryTitle={"Stay at home parent?"} category="home"/>
            <GiftItem categoryImage={"https://ourproperty.co.uk/content/uploads/2007/04/Home-entertainment-system-.jpg"} categoryTitle={"Netflix and chill"} category="entertainment"/>
            <GiftItem categoryImage={"https://d1dmo9iwh0r4qt.cloudfront.net/~/media/ai/main/images/publications/blog/onlinephotonov/photographyphoto.ashx?modified=20181123034155&la=en&hash=061F51B0825AEC249CED44DB5E32432D3FEA05C2"} categoryTitle={"Capture every moment"} category="photography" />
        </Box>
    </Box>
    )
}

export default Gifts