import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { userActions } from "../../redux/slices/user";
import { favoriteActions } from "../../redux/slices/favorite";
import { cartActions } from "../../redux/slices/cart";

interface NavBarProps {
  searchTerm: string
  filterTerm: string
  setSearchTerm: Function
  setFilterTerm: Function
  showLogin: boolean
  setShowLogin: Function
  setShowSignup: Function
}

const NavBar: React.FC<NavBarProps> = ({
  searchTerm,
  setSearchTerm,
  setFilterTerm,
  filterTerm,
  showLogin,
  setShowLogin,
  setShowSignup
}) => {
  const user = useSelector((state: RootState) => state.user.user);
  const favorite = useSelector((state: RootState) => state.favorites.favorites);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇾' }
  ];

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilterTerm(searchTerm);
    navigate('/products');
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(userActions.logOut());
    dispatch(favoriteActions.clearFavorites());
    dispatch(cartActions.clearCart());
    navigate("/");
    setIsUserMenuOpen(false);
  };

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-etsy-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl md:text-3xl logo-betsy hover:no-underline">
              Betsy
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for anything..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-12 py-2 border border-etsy-border rounded-full bg-etsy-background-secondary focus:bg-white focus:border-etsy-orange focus:ring-2 focus:ring-primary-100 transition-all duration-200 outline-none text-etsy-text-primary"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-etsy-text-secondary hover:text-etsy-orange transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Sign In Button (if not logged in) */}
            {user.email === "" && (
              <button
                onClick={() => {
                  setShowLogin(true);
                  setShowSignup(false);
                }}
                className="text-sm font-medium text-etsy-text-primary hover:text-etsy-orange transition-colors"
              >
                Sign in
              </button>
            )}

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-etsy-background-secondary transition-colors"
              >
                <span className="text-lg">{currentLanguage?.flag}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLanguageDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-neutral-200 min-w-[120px] z-50">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageSelect(language.code)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-neutral-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        selectedLanguage === language.code ? 'bg-primary-50 text-primary-600' : 'text-neutral-700'
                      }`}
                    >
                      <span className="text-sm">{language.flag}</span>
                      <span className="text-xs">{language.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Favorites */}
            <Link to="/favorites" className="relative p-2 text-etsy-text-secondary hover:text-etsy-orange transition-colors group">
              <Heart className="w-5 h-5" />
              {favorite.products.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-etsy-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorite.products.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-etsy-text-secondary hover:text-etsy-orange transition-colors group">
              <ShoppingBag className="w-5 h-5" />
              {cart.products.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-etsy-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.products.length}
                </span>
              )}
            </Link>

            {/* User Menu (if logged in) */}
            {user.email !== "" && (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center p-2 text-etsy-text-secondary hover:text-etsy-orange transition-colors"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover border border-etsy-border"
                    />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-medium border border-etsy-border py-2 z-50"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-etsy-text-primary hover:bg-etsy-background-secondary transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-etsy-text-primary hover:bg-etsy-background-secondary transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Orders
                    </Link>
                    <hr className="my-2 border-etsy-border" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-etsy-text-secondary hover:text-etsy-orange transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-etsy-border py-4"
          >
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="px-4 mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for anything..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-12 py-2 border border-etsy-border rounded-full bg-etsy-background-secondary focus:bg-white focus:border-etsy-orange focus:ring-2 focus:ring-primary-100 transition-all duration-200 outline-none text-etsy-text-primary"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-etsy-text-secondary hover:text-etsy-orange transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Mobile Navigation Links */}
            <div className="px-4 space-y-2">
              {user.email === "" && (
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setShowSignup(false);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-etsy-text-primary hover:text-etsy-orange transition-colors"
                >
                  Sign in
                </button>
              )}

              {/* Mobile Language Selector */}
              <div className="py-2">
                <div className="flex items-center gap-2 text-etsy-text-primary">
                  <span className="text-lg">{currentLanguage?.flag}</span>
                  <span className="text-sm">{currentLanguage?.name}</span>
                  <button
                    onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                    className="ml-auto p-1 hover:bg-etsy-background-secondary rounded"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                
                {isLanguageDropdownOpen && (
                  <div className="mt-2 pl-4 space-y-1">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageSelect(language.code)}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-neutral-50 transition-colors rounded ${
                          selectedLanguage === language.code ? 'bg-primary-50 text-primary-600' : 'text-neutral-700'
                        }`}
                      >
                        <span className="text-sm">{language.flag}</span>
                        <span className="text-sm">{language.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/favorites"
                className="flex items-center py-2 text-etsy-text-primary hover:text-etsy-orange transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart className="w-5 h-5 mr-3" />
                Favorites
                {favorite.products.length > 0 && (
                  <span className="ml-2 bg-etsy-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favorite.products.length}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="flex items-center py-2 text-etsy-text-primary hover:text-etsy-orange transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingBag className="w-5 h-5 mr-3" />
                Cart
                {cart.products.length > 0 && (
                  <span className="ml-2 bg-etsy-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.products.length}
                  </span>
                )}
              </Link>

              {user.email !== "" && (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center py-2 text-etsy-text-primary hover:text-etsy-orange transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5 mr-3" />
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="flex items-center py-2 text-etsy-text-primary hover:text-etsy-orange transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ShoppingBag className="w-5 h-5 mr-3" />
                    Orders
                  </Link>
                  <hr className="my-2 border-etsy-border" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left py-2 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <X className="w-5 h-5 mr-3" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
