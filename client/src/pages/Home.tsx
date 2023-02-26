import { Box, Button, Divider } from '@mui/material'
import React from 'react'
import Header from '../components/homeComponents/header/Header'
import Popular from '../components/homeComponents/popularItems/Popular'
import NavBar from '../components/NavBar/NavBar'
import Gifts from '../components/homeComponents/gifts/Gifts'
import PreFooter from '../components/homeComponents/prefooter/PreFooter'
import Footer from '../components/Footer/Footer'
import { useDispatch } from 'react-redux'
import { favoriteActions } from '../redux/slices/favorite'
import { cartActions } from '../redux/slices/cart'
const Home = () => {
  const dispatch = useDispatch();
  
  return (
    <Box sx={{width: "100%"}}>
    <Header />
    <Button onClick={() => dispatch(favoriteActions.addFromLocalStorage())}>Link favorite localstorage</Button>
    <Button onClick={() => dispatch(cartActions.addFromLocalStorage())}>Link cart localstorage</Button>
    <Popular />
    <Gifts />
    <PreFooter />
    </Box>
  )
}

export default Home