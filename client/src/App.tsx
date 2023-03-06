import React, { useEffect, useState } from 'react';
import { Box, Fade } from "@mui/material"
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import SignIn from './components/Forms/signIn/SignIn';
import SignUp from './components/Forms/signUp/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import { fetchProductData } from './redux/thunks/product';
import Products from './pages/Products';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Admin from './pages/Admin';
import Footer from './components/Footer/Footer';
import ProductDetails from './pages/ProductDetails';
import Category from './pages/Category';
import UnderConstruction from './pages/UnderConstruction';
import { fetchFavorites } from './redux/thunks/favorite';
import { fetchCart } from './redux/thunks/cart';
import { favoriteActions } from './redux/slices/favorite';
import { cartActions } from './redux/slices/cart';

function App() {
  const products = useSelector((state: RootState) => state.products.products)
  const user = useSelector((state: RootState) => state.user.user)
  const favorites = useSelector((state: RootState) => state.favorites.favorites)
  const localFavorites = (JSON.parse(localStorage.getItem('favorites') as string))
  const cart = useSelector((state: RootState) => state.cart.cart)
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const thunkDispatch = useDispatch<AppDispatch>();
  const dispatch = useDispatch();
  useEffect(() => {
    thunkDispatch(fetchProductData());
    if(user._id !== "") {
      navigate("/")
      thunkDispatch(fetchFavorites("https://betsy-backend.onrender.com/favorites/" + user._id));
      thunkDispatch(fetchCart("https://betsy-backend.onrender.com/cart/" + user._id));
      dispatch(favoriteActions.clearFavorites());
      dispatch(cartActions.clearCart());
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <Box className="App" sx={{m:0, p:0, width: "100vw"}}>
      <Fade in={showLogin}>
      <Box sx={{width: "100vw", height: "100vh", background: showSignup ? "transparent" : "#00000033", position: "fixed",zIndex: showLogin ? "30" : "10", display: showLogin? "flex" : "none", justifyContent: "center", alignItems:"center"}}>
      <SignIn showLogin={showLogin} setShowLogin={setShowLogin} showSignup={showSignup} setShowSignup={setShowSignup}/>
      </Box>
      </Fade>
      <Fade in={showLogin}>
      <Box sx={{width: "100vw", height: "100vh", background: "#00000033", position: "fixed",zIndex: showSignup ? "30" : "10", display: showSignup? "flex" : "none", justifyContent: "center", alignItems:"center"}}>
        <SignUp showLogin={showLogin} setShowLogin={setShowLogin} showSignup={showSignup} setShowSignup={setShowSignup}/>
      </Box>
      </Fade>
      <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setFilterTerm={setFilterTerm} filterTerm={filterTerm} showLogin={showLogin} setShowLogin={setShowLogin} setShowSignup={setShowSignup}/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/products' element={<Products filterTerm={filterTerm}/>} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/signin" element={<SignIn showLogin={showLogin} setShowLogin={setShowLogin} showSignup={showSignup} setShowSignup={setShowSignup}/>} />
      <Route path="/signup" element={<SignUp showLogin={showLogin} setShowLogin={setShowLogin} showSignup={showSignup} setShowSignup={setShowSignup}/>} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/c/:category" element={<Category />} />
      <Route path="/404" element={<UnderConstruction/>} />
      <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
