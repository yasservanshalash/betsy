import {
  Box,
  Container,
  IconButton,
  InputBase,
  Tooltip,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ShoppingBag } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// MENU

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

// MENU
import React, { useState } from "react";
import DrawerItem from "../homeComponents/drawer/DrawerItem";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { userActions } from "../../redux/slices/user";
import { favoriteActions } from "../../redux/slices/favorite";
import { cartActions } from "../../redux/slices/cart";

const NavBar = ({searchTerm, setSearchTerm, setFilterTerm, filterTerm, showLogin, setShowLogin}: {searchTerm: string, filterTerm: string,setSearchTerm: Function, setFilterTerm: Function, showLogin: boolean, setShowLogin: Function}) => {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  // MENU
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // MENU

  // Log Out 
  const dispatch = useDispatch();

  // Log Out
  return (
    <Box
      sx={{
        p: 1,
        width: { xs: "100%", md: "90%", lg: "80%" },
        margin: { md: "0 auto" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              display: { xs: "none", sm: "block" },
              fontFamily: "inherit",
              mx: 2,
              color: "#F1641D",
              fontWeight: "bold",
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "#F47D49" }}>
              Betsy
            </Link>
          </Typography>
          <Typography
            variant="h5"
            sx={{
              display: { xs: "block", sm: "none" },
              fontFamily: "inherit",
              mx: 2,
              color: "#F1641D",
              fontWeight: "bold",
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "#F47D49" }}>
              Betsy
            </Link>
          </Typography>
        </Box>
        <Box
          component="form"
          sx={{
            p: "2px 4px",
            display: { xs: "none", sm: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "space-between",
            flex: "1",
            flexGrow: "1",
            position: "relative",
            top: "2px",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, flexGrow: 1 }}
            placeholder="Search for anything..."
            inputProps={{ "aria-label": "Search for anything..." }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={() => {
            setFilterTerm(searchTerm)
            navigate('/products')
          }}>
            <SearchIcon />
          </IconButton>
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
          <Typography
            variant="subtitle2"
            style={
              user.email === "" ? { display: "inherit" } : { display: "none" }
            }
            sx={{
              textDecoration: "none",
              color: "black",
              fontWeight: { sx: "lighter", sm: "bold" },
            }}
            onClick={() => setShowLogin(true)}
          >
            Sign in
          </Typography>
          <Typography sx={{ fontSize: "120%" }}>🇪🇺</Typography>

          <Tooltip title="Favorites">
          <IconButton component={Link} to="/favorites">
            <FavoriteBorderIcon sx={{ color: "black" }} />
          </IconButton>
          </Tooltip>

          <Tooltip title="Cart">
          <IconButton component={Link} to="/cart">
            <ShoppingBag sx={{ color: "black" }} />
          </IconButton>
          </Tooltip>

          <Tooltip title="Account settings" style={user.email === "" ? { display: "none" } : { display: "inherit" }}>
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            { user.avatar !== "" ? <img src={user.avatar} style={{width: "20px", borderRadius: "50%"}} /> : <AccountCircleIcon sx={{ color: "black" }}/>}
          </IconButton>
        </Tooltip>
          <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose} component={Link} to="/profile" sx={{pr: 10 }}>
          <Avatar src={user.avatar !== "" ? user.avatar : ""} /> Profile
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem> */}
        <Divider />
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem onClick={() => {
          handleClose();
          dispatch(userActions.logOut())
          dispatch(favoriteActions.clearFavorites())
          dispatch(cartActions.clearCart())

          navigate("/")
          
        }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
          
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          justifyContent: "flex-start",
          alignItems: "center",
          py: 2,
          width: "95%",
          margin: "0 auto"
        }}
      >
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={() => {
            setFilterTerm(searchTerm)
            navigate('/products')
          }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "none", sm: "none", md: "flex" },
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: "light", textDecoration: "none", color: "black" }} component={Link} to={`/c/computers`}>
          Computers
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: "light",textDecoration: "none", color: "black"}} component={Link} to={`/c/audio`}>
          Audio
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: "light",textDecoration: "none", color: "black"}} component={Link} to={`/c/visual`}>
          Visual
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: "light",textDecoration: "none", color: "black" }} component={Link} to={`/c/gaming`}>
          Consoles
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: "light",textDecoration: "none", color: "black" }} component={Link} to={`/c/photography`}>
          Photography
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: "light",textDecoration: "none", color: "black" }} component={Link} to={`/c/home`}>
          Appliances
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: "light", textDecoration: "none", color: "black" , cursor: "pointer"}}
          onClick={() => {
            setFilterTerm("");
            navigate("/products");
            console.log(searchTerm);
          }}
        >
          All
        </Typography>
      </Box>
    </Box>
  );
};

export default NavBar;
