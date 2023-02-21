import React from 'react';
import { Box, Container } from "@mui/material"
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import { Favorite } from '@mui/icons-material';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import SignIn from './components/Forms/signIn/SignIn';
import SignUp from './components/Forms/signUp/SignUp';

function App() {
  return (
    <Box className="App" sx={{m:0, p:0, width: "100%"}}>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Box>
  );
}

export default App;
