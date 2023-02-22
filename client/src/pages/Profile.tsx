import { Box } from '@mui/material'
import React from 'react'
import Footer from '../components/Footer/Footer'
import NavBar from '../components/NavBar/NavBar'

const Profile = () => {
  return (
    <Box>
        <NavBar />
        <Box>
            <h1>profile</h1>
        </Box>
        <Footer />
    </Box>
  )
}

export default Profile