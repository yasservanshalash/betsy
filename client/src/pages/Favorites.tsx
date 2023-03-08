import { Box, Button } from '@mui/material'
import React from 'react'
import Footer from '../components/Footer/Footer'
import NavBar from '../components/NavBar/NavBar'
import Favorite from '../components/FavoritesComponents/Favorite'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { favoriteActions } from '../redux/slices/favorite'
const Favorites = () => {
  const cart = useSelector((state: RootState) => state.cart.cart)
  const dispatch = useDispatch();
  return (
    <Box>
    <Favorite />
    </Box>
  )
}

export default Favorites