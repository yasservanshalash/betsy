import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ShoppingBag } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";

import React from "react";
import DrawerItem from "../homeComponents/drawer/DrawerItem";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Box sx={{p: 1}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ display: {xs: "none", sm :"block"},fontFamily: "inherit", mx: 2, color: "#F1641D", fontWeight:"bold" }}>
            <Link to="/" style={{textDecoration: "none", color: "#F47D49"}}>
            Betsy
            </Link>
          </Typography>
          <Typography variant="h5" sx={{ display: {xs: "block", sm :"none"}, fontFamily: "inherit", mx: 2, color: "#F1641D", fontWeight:"bold" }}>
            <Link to="/" style={{textDecoration: "none", color: "#F47D49"}}>
            Betsy
            </Link>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: "10px",
            mx: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: { sx: "lighter", sm: "bold" } }}>
            Sign in
          </Typography>
          <Typography sx={{fontSize: "120%"}}>🇪🇺</Typography>
          <IconButton component={Link} to="/favorites">
            <FavoriteBorderIcon sx={{ color: "black"}} />
          </IconButton>
          <IconButton component={Link} to="/cart">
            <ShoppingBag sx={{ color: "black" }} />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ display: {xs: "flex", md: "none"}, justifyContent: "space-evenly",alignItems: "center", py: 2 , width: "100%"}}>
        <Box>
          <DrawerItem />
        </Box>
        <Box
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flex: "1",
            flexGrow: "1",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, flexGrow: 1 }}
            placeholder="Search for anything..."
            inputProps={{ "aria-label": "Search for anything..." }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default NavBar;
