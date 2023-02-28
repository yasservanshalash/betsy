import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'

const UnderConstruction = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <Box sx={{display: "flex", justifyContent: "center"}}>
    <img src='https://cdn-icons-png.flaticon.com/512/5110/5110224.png' style={{margin: "0px 0px", transform: "scale(0.5)"}}/>
</Box>
  )
}

export default UnderConstruction