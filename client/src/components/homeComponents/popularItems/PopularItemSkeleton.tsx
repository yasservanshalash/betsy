import { Box, Rating, Skeleton, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const PopularItemSkeleton = () => {
  return (
    <Box sx={{width: "200px", position: "relative", textDecoration: "none", color: "black"}}>
    <Skeleton variant="rectangular" width={190} height={170} />
    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={190}/>
    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={190}/>
    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={190}/>

</Box>
  )
}

export default PopularItemSkeleton