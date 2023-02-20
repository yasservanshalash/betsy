import { Box, Typography } from '@mui/material'
import React from 'react'
import PopularItem from './PopularItem'

const Popular = () => {
  return (
    <Box sx={{my: 5, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <Typography sx={{textAlign: "center", fontWeight: "bold", mb: 3}}>Popular gifts right now</Typography>
        <Box sx={{display: {xs: "grid", md: "flex"}, gridTemplateColumns: {sx: "1fr", sm: "1fr 1fr"}, justifyContent: "center", alignItems: "center", margin: "0 auto", p:1, gap: "10px "}}>
        <PopularItem title={"Birth Flower Jewelry Travel Case, Birth Month Flower Gift, Personalized Birthday Gift, Leather Jewelry Travel Case, Custom Jewelry Case"} image={"https://i.etsystatic.com/35966576/c/1614/1283/669/351/il/e1510f/4033777789/il_340x270.4033777789_dqlw.jpg"} price={"11.87"} rating={5}/>
        <PopularItem title={"Custom Jewelry Box, Birth Flower Jewelry Case, Jewelry Ring Box, Personalized Birthday Gift, Personalized Gifts For Her, Custom Jewelry Case"} image={"https://i.etsystatic.com/35966576/c/1646/1308/661/365/il/4c5f50/4248791718/il_340x270.4248791718_em1x.jpg"} price={"13.06"} rating={5}/>
        <PopularItem title={"Jewelry Travel Case, Bridesmaid Jewelry Box, Custom jewelry box, Accessories Case, Anniversary gift for her, Bridesmaids Gift, Mom Gift"} image={"https://i.etsystatic.com/35966576/r/il/3ba26c/3917917202/il_1588xN.3917917202_1cil.jpg"} price={"13.06"} rating={5} />
        <PopularItem title={"Leather Jewelry Travel Case,Birth Month Flower Jewelry Box,Bridesmaid Proposal Gifts,Bridal Party Gifts,Birthday Gift for Her,Wedding Gifts"} image={"https://i.etsystatic.com/37155116/r/il/86ff94/4559092016/il_1588xN.4559092016_idlu.jpg"} price={"10.2"}  rating={5}/>
        </Box>
    </Box>
  )
}

export default Popular