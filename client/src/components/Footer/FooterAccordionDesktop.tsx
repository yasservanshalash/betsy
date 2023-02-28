import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTube  from '@mui/icons-material/YouTube';
import { Link } from "react-router-dom";

const FooterAccordionDesktop = () => {
  return (
    <Box
      sx={{
        display: { xs: "none", sm: "none", md: "flex" },
        justifyContent: "space-evenly",
        background: "#2F446C",
        color: "white",
        py: 5,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "15px", textDecoration: "none", color: "white"}} component={Link} to="/404">
        <Typography variant="subtitle1">Shop</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Typography variant="subtitle2">Gift cards</Typography>
          <Typography variant="subtitle2">Sitemap</Typography>
          <Typography variant="subtitle2">Betsy blog</Typography>
          <Typography variant="subtitle2">Betsy Europe</Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "15px", textDecoration: "none", color: "white"}} component={Link} to="/404">
        <Typography variant="subtitle1">Sell</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Typography variant="subtitle2">Sell on Betsy</Typography>
          <Typography variant="subtitle2">Teams</Typography>
          <Typography variant="subtitle2">Forums</Typography>
          <Typography variant="subtitle2">Affiliates</Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" ,textDecoration: "none", color: "white"}} component={Link} to="/404">
        <Typography variant="subtitle1">About</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Typography variant="subtitle2">Betsy, Inc.</Typography>
          <Typography variant="subtitle2">Policies</Typography>
          <Typography variant="subtitle2">Careers</Typography>
          <Typography variant="subtitle2">Impact</Typography>
          <Typography variant="subtitle2">Press</Typography>
          <Typography variant="subtitle2">Legal imprint</Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" ,textDecoration: "none", color: "white"}} component={Link} to="/404">
        <Typography variant="subtitle1">Help</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Typography variant="subtitle2">Help Center</Typography>
          <Typography variant="subtitle2">Privacy settings</Typography>
        </Box>
        <Box sx={{ justifySelf: "center", alignSelf: "flex-start" }}>
          <Button
            sx={{
              padding: 1,
              background: "transparent",
              border: "2px solid white",
              borderRadius: "20px",
              textTransform: "unset",
              my: 1,
            }}
            disabled
          >
            <Typography
              variant="subtitle1"
              sx={{ color: "white", fontSize: "80%" }}
            >
              Download Betsy App
            </Typography>
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <IconButton>
            <InstagramIcon sx={{ color: "red", fontSize: "120%" }} />
          </IconButton>
          <IconButton>
            <FacebookIcon sx={{ color: "#3b5998", fontSize: "120%" }} />
          </IconButton>
          <IconButton>
            <PinterestIcon sx={{ color: "pink", fontSize: "120%" }} />
          </IconButton>
          <IconButton>
            <TwitterIcon sx={{ color: "lightblue", fontSize: "120%" }} />
          </IconButton>
          <IconButton>
            <YouTube sx={{ color: "red", fontSize: "120%" }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default FooterAccordionDesktop;
