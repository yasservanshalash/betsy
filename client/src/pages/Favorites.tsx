import { Box } from '@mui/material'
import React from 'react'
import Footer from '../components/Footer/Footer'
import NavBar from '../components/NavBar/NavBar'
import Favorite from '../components/FavoritesComponents/Favorite'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
const Favorites = () => {
  const cart = useSelector((state: RootState) => state.cart.cart)
  return (
    <Box>
    <Favorite />
    </Box>
  )
}

export default Favorites