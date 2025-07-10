import React, { useEffect, useState } from 'react';
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
import Orders from './pages/Orders';
import { fetchOrders } from './redux/thunks/orders';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './components/ui/button';

function App() {
  const products = useSelector((state: RootState) => state.products.products)
  const user = useSelector((state: RootState) => state.user.user)
  const favorites = useSelector((state: RootState) => state.favorites.favorites)
  const localFavorites = (JSON.parse(localStorage.getItem('favorites') as string))
  const cart = useSelector((state: RootState) => state.cart.cart)
  const orders = useSelector((state: RootState) => state.orders.orders);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [choice, setChoice] = useState(false)
  const navigate = useNavigate();

  const thunkDispatch = useDispatch<AppDispatch>();
  const dispatch = useDispatch();
  
  useEffect(() => {
    thunkDispatch(fetchProductData());
    if(user._id !== "") {
      navigate("/")
      thunkDispatch(fetchFavorites("https://betsy-backend.onrender.com/favorites/" + user._id));
      thunkDispatch(fetchCart("https://betsy-backend.onrender.com/cart/" + user._id));
      thunkDispatch(fetchOrders(user._id))
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/30 flex flex-col">
      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <SignIn 
              showLogin={showLogin} 
              setShowLogin={setShowLogin} 
              showSignup={showSignup} 
              setShowSignup={setShowSignup} 
              setChoice={setChoice}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Signup Modal */}
      <AnimatePresence>
        {showSignup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <SignUp 
              showLogin={showLogin} 
              setShowLogin={setShowLogin} 
              showSignup={showSignup} 
              setShowSignup={setShowSignup} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Choice Modal */}
      <AnimatePresence>
        {choice && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-large max-w-md mx-4"
            >
              <h3 className="text-lg font-semibold text-center mb-4">
                Would you like to save your favorites and your cart?
              </h3>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => {
                    if(localStorage.getItem('cart')) {
                      dispatch(cartActions.addFromLocalStorage());
                    }
                    if(localStorage.getItem('favorites')) {
                      dispatch(favoriteActions.addFromLocalStorage());
                    }
                    setChoice(false)
                  }}
                  className="px-6"
                >
                  Yes, please
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setChoice(false)}
                  className="px-6"
                >
                  No, thank you
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <NavBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        setFilterTerm={setFilterTerm} 
        filterTerm={filterTerm} 
        showLogin={showLogin} 
        setShowLogin={setShowLogin} 
        setShowSignup={setShowSignup}
      />

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/products' element={<Products filterTerm={filterTerm}/>} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<SignIn showLogin={showLogin} setShowLogin={setShowLogin} showSignup={showSignup} setShowSignup={setShowSignup} setChoice={setChoice}/>} />
          <Route path="/signup" element={<SignUp showLogin={showLogin} setShowLogin={setShowLogin} showSignup={showSignup} setShowSignup={setShowSignup}/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/c/:category" element={<Category />} />
          <Route path="/404" element={<UnderConstruction/>} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;