import { Box, Divider } from '@mui/material'
import React from 'react'
import Header from '../components/homeComponents/header/Header'
import Popular from '../components/homeComponents/popularItems/Popular'
import NavBar from '../components/NavBar/NavBar'
import Gifts from '../components/homeComponents/gifts/Gifts'
import PreFooter from '../components/homeComponents/prefooter/PreFooter'
import Footer from '../components/Footer/Footer'
const Home = () => {
  return (
    <Box sx={{width: "100%"}}>
    <NavBar />
    <Header />
    <Popular />
    <Gifts />
    <PreFooter />
    <Footer />
    </Box>
  )
}

export default Home