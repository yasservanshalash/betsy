import { Box } from '@mui/material'
import React from 'react'
import Footer from '../components/Footer/Footer'
import NavBar from '../components/NavBar/NavBar'
import Favorite from '../components/FavoritesComponents/Favorite'
const Favorites = () => {
  return (
    <Box>
    <NavBar />
    <Favorite />
    <Footer />
    </Box>
  )
}

export default Favorites