import React, { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import { fetchProductData } from './redux/thunks/product';
import Products from './pages/Products';
import Profile from './pages/Profile';

function App() {
  const products = useSelector((state: RootState) => state.products.Products)
  const user = useSelector((state: RootState) => state.user.user)
  console.log(products)
  console.log(user)

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProductData());
  }, [])
  return (
    <Box className="App" sx={{m:0, p:0, width: "100%"}}>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/products' element={<Products products={products}/>} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      </Routes>
    </Box>
  );
}

export default App;
