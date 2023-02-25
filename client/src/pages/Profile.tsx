import { CameraAlt } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import NavBar from '../components/NavBar/NavBar'
import { RootState } from '../redux/store'
import { Product } from '../types/types'

const Profile = () => {
  const user = useSelector((state: RootState) => state.user.user)
  const cart = useSelector((state: RootState) => state.cart.cart)
  const favorite = useSelector((state: RootState) => state.favorites.favorites)
  return (
    <Box>
        <NavBar />
        <Box sx={{width: "80%", margin: "0 auto", my: 5, display: "flex", flexDirection: "column", gap: 10}}>
            <Box sx={{display: "flex"}}>
              <Box sx={{width: "120px", height: "120px",position: "relative"}}>
                <img src={user?.avatar} alt={user?.name} style={{width: "100px", borderRadius: "50%"}}/>
                <IconButton sx={{position: "absolute", bottom: "10px", right: "10px", background: "#E1D9D1"}}>
                  <CameraAlt />
                </IconButton>
              </Box>
              <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-between", m:2}}>
              <Typography variant='h4'>{user.name}</Typography>
              <Link to="/edit-profile">
              <Typography sx={{color: "black"}}>Edit your profile</Typography>
              </Link>
              </Box>
            </Box>
            <Box sx={{display: "flex", gap:10}}>
            <Box sx={{display: favorite.products.length > 0 ? "flex" : "none", flexDirection: "column", gap: 3, textDecoration: "none"}} component={Link} to="/favorites">
              <Typography variant='h5' sx={{textDecoration: "none", color: "black"}}>Favorites</Typography>
              <Box sx={{borderRadius: "20px", minWidth: "150px", minHeight: "122px", p: 2, border: "2px solid black"}}>
                  <Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid white", justifyItems: "center"}}>
                  {
                    favorite.products.length < 4 ? 
                    favorite.products.map((item: Product) => {
                      return (
                        <img src={item.image} alt={item.name} width="60px" height="60px"/>
                      )
                    })
                    : 
                    favorite.products.slice(0,4).map((item: Product) => {
                      return (
                        <img src={item.image} alt={item.name} width="60px" height="60px"/>
                      )
                    })
                  }
                  </Box>
              </Box>
            </Box>
            <Box sx={{display: cart.products.length > 0 ? "flex" : "none", flexDirection: "column", gap: 3, textDecoration: "none"}} component={Link} to="/cart">
              <Typography variant='h5' sx={{textDecoration: "none", color: "black"}}>Cart</Typography>
              <Box sx={{borderRadius: "20px", minWidth: "150px", minHeight: "122px", p: 2, border: "2px solid black"}}>
                  <Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid white", justifyItems: "center"}}>
                  {
                    cart.products.length < 4 ? 
                    cart.products.map((item: Product) => {
                      return (
                        <img src={item.image} alt={item.name} width="60px" height="60px"/>
                      )
                    })
                    : 
                    cart.products.slice(0,4).map((item: Product) => {
                      return (
                        <img src={item.image} alt={item.name} width="60px" height="60px"/>
                      )
                    })
                  }
                  </Box>
              </Box>
            </Box>
            </Box>
        </Box>
        <Footer />
    </Box>
  )
}

export default Profile