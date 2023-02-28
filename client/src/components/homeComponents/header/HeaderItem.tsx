import { Box, Typography } from '@mui/material'
import {Link} from 'react-router-dom'
import React from 'react'
import "./HeaderItem.css"

const HeaderItems = ({image, title}: {image: string, title:string}) => {
  return (
    <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", mt: 2, p:1, borderBottom: "1px solid transparent", gap: 2, textDecoration: "none", color: "black"}} className="header_item" component={Link} to={`/c/${title.toLowerCase()}`}>
        {/* <img src={image} style={{height:"100px", width: "100px", borderRadius:"50%", backgroundColor: "black", marginBottom: "10px"}} className="header_item_img" alt={title}/> */}
        <Box
        component="img"
        sx={{
          height: { xs: "75px", sm: "100px", md:"120px" },
          width: { xs: "75px", sm: "100px",md:"120px" },
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
          borderRadius: "50%",
          border: "0.5px solid gray"
        }}
        alt={title}
        src={image}
        className="header_item_img"
      />
        <Typography sx={{fontWeight: "100"}}>{title}</Typography>
    </Box>
  )
}

export default HeaderItems