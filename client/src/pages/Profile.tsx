import React from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../redux/store'
import { Product } from '../types/types'
import { User, Camera, Heart, ShoppingBag, Edit3 } from 'lucide-react'

const Profile = () => {
  const user = useSelector((state: RootState) => state.user.user)
  const cart = useSelector((state: RootState) => state.cart.cart)
  const favorite = useSelector((state: RootState) => state.favorites.favorites)

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header Section */}
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-soft border border-neutral-100 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col sm:flex-row items-start gap-6">
            
            {/* Profile Picture */}
            <div className="relative">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-soft"
              />
              <div className="absolute bottom-1 right-1 p-2 bg-primary-100 rounded-full">
                <Camera className="w-4 h-4 text-primary-600" />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-neutral-800 mb-2">
                {user.name}
              </h1>
              <Link
                to="/edit-profile"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span className="font-medium">Edit your profile</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Favorites Section */}
          {favorite.products.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link
                to="/favorites"
                className="block bg-white rounded-2xl p-6 shadow-soft border border-neutral-100 hover:shadow-medium transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                    <Heart className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800">
                      Favorites
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {favorite.products.length} {favorite.products.length === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>

                {/* Preview Grid */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-neutral-50 rounded-xl">
                  {(favorite.products.length < 4 
                    ? favorite.products 
                    : favorite.products.slice(0, 4)
                  ).map((item: Product, index) => (
                    <img
                      key={index}
                      src={item.image}
                      alt={item.name}
                      className="w-full h-16 object-cover rounded-lg border border-neutral-200"
                    />
                  ))}
                </div>
              </Link>
            </motion.div>
          )}

          {/* Cart Section */}
          {cart.products.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to="/cart"
                className="block bg-white rounded-2xl p-6 shadow-soft border border-neutral-100 hover:shadow-medium transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                    <ShoppingBag className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800">
                      Cart
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {cart.products.length} {cart.products.length === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>

                {/* Preview Grid */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-neutral-50 rounded-xl">
                  {(cart.products.length < 4 
                    ? cart.products 
                    : cart.products.slice(0, 4)
                  ).map((item: Product, index) => (
                    <img
                      key={index}
                      src={item.image}
                      alt={item.name}
                      className="w-full h-16 object-cover rounded-lg border border-neutral-200"
                    />
                  ))}
                </div>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Empty State */}
        {favorite.products.length === 0 && cart.products.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 p-6 bg-white rounded-full shadow-soft">
              <User className="w-full h-full text-neutral-400" />
            </div>
            <h2 className="text-2xl font-semibold text-neutral-800 mb-2">
              Welcome to your profile!
            </h2>
            <p className="text-neutral-600 mb-6">
              Start shopping to see your favorites and cart items here.
            </p>
            <motion.a
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingBag className="w-5 h-5" />
              Start Shopping
            </motion.a>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Profile