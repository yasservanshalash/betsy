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
const Home = () => {
  const dispatch = useDispatch();
  
  return (
    <Box sx={{width: "100%"}}>
    <NavBar />
    <Header />
    <Button onClick={() => dispatch(favoriteActions.addFromLocalStorage())}>Link localstorage</Button>
    <Popular />
    <Gifts />
    <PreFooter />
    <Footer />
    </Box>
  )
}

export default Home