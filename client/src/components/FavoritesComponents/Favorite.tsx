import React from 'react'
import { motion } from 'framer-motion'
import { Lock, Share2, Heart } from 'lucide-react'
import FavoriteItem from './FavoriteItem'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Product } from '../../types/types'

const Favorites = () => {
  const favorites = useSelector((state: RootState) => state.favorites.favorites)
  const user = useSelector((state: RootState) => state.user.user)

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-neutral-800">Favorite Items</h1>
        
        <div className="flex items-center gap-3">
          <motion.button
            className="flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">Share</span>
          </motion.button>
          
          {!user._id && (
            <motion.button
              className="px-6 py-2 border-2 border-neutral-800 text-neutral-800 rounded-full hover:bg-neutral-800 hover:text-white transition-all font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign in
            </motion.button>
          )}
        </div>
      </div>

      {/* Guest User Notice */}
      {!user._id && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <p className="text-amber-800 text-sm mb-3">
            Favorites only stick around for 7 days (or until you clear your cache). 
            To keep them longer and view them from any device, sign in or create an account.
          </p>
          
          <div className="flex items-center justify-between">
            <motion.button
              className="flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Lock className="w-4 h-4" />
              <span className="text-sm font-medium">Private</span>
            </motion.button>
            
            <motion.button
              className="p-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      )}

      {/* Favorites Grid */}
      {favorites?.products && favorites.products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favorites.products.map((item: Product, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <FavoriteItem product={item} />
            </motion.div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center text-center py-16">
          <div className="w-24 h-24 mb-6">
            <svg
              xmlnsXlink="http://www.w3.org/1999/xlink" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 96 96" 
              aria-hidden="true" 
              focusable="false" 
              className="w-full h-full text-neutral-400"
            >
              <path 
                d="M60.053 58.605c-.309.158-.6-.062-1.488-1.11-.753-.89-1.69-2-3.065-2-1.677 0-2.371 1.735-2.929 3.13-.242.607-.748 1.87-1.071 1.87-.323 0-.621-.46-1.086-1.22-.718-1.173-1.7-2.78-3.914-2.78a6.275 6.275 0 00-4.293 1.973c-.733.637-1.207 1.028-1.681 1.056a5.81 5.81 0 01-.348-1.945c-.152-1.8-.341-4.032-2.231-4.978-.727-.361-2.209-.67-3.956 1.37a11.505 11.505 0 00-1.391 2.082l1.789.9c.526-1.05 1.89-2.936 2.659-2.553.886.443 1.017 1.99 1.132 3.357.134 1.582.317 3.748 2.315 3.748a4.624 4.624 0 003.02-1.52A4.455 4.455 0 0146.5 58.5c1.039 0 1.516.693 2.208 1.824.594.97 1.333 2.176 2.792 2.176 1.677 0 2.371-1.734 2.929-3.13.242-.606.748-1.87 1.071-1.87.448 0 1.027.685 1.539 1.288.843 1 2.115 2.5 3.908 1.607 3.38-1.69 2.638-7.4 2.542-8.041l-1.978.292c.189 1.264.313 5.074-1.458 5.959z" 
                fill="currentColor"
              />
              <path 
                d="M35.025 42.374a17.408 17.408 0 003.246 5.466 14.252 14.252 0 004.519 3.466 12.017 12.017 0 0010.422 0 14.244 14.244 0 004.516-3.464 17.408 17.408 0 003.247-5.467l3.189 1.192c4.827-7.986 4.949-18.63 4.789-22.74a30.497 30.497 0 01-3.544-5.247 42.186 42.186 0 01-4.415-13.687L60.882.858 32.035 5.132 32 5.958A25.64 25.64 0 0127.515 20.2c-.187 3.522-.333 14.815 4.68 23.23l2.83-1.056zm20.046-12.745l1.858.742-4 10-1.858-.742 4-10zm-14.142 0l4 10-1.858.742-4-10 1.858-.742z" 
                fill="currentColor"
              />
              <path 
                d="M88 29.954L87.955 29H87a22.616 22.616 0 01-15.991-6.008c0 5.11-.7 14.038-4.944 21.284l8.96 3.349a32.352 32.352 0 01-6.057 10.147 29.15 29.15 0 01-9.281 7.062 26.959 26.959 0 01-23.372 0 29.156 29.156 0 01-9.284-7.064 32.35 32.35 0 01-6.056-10.146L30.3 44.14c-4.263-7.368-4.894-16.426-4.864-21.45-6.613 6.747-15.89 7.283-16.48 7.309l-.912.04-.044.913A117.8 117.8 0 009.3 51.54c1.584 10.468 5.365 24.928 14.379 34.375C30.062 92.606 38.246 96 48 96c9.658 0 17.778-3.376 24.135-10.033C89.54 67.736 88.07 31.487 88 29.954zM33.9 78.447l-1.79-.894 4-8 1.79.894-4 8zM49 84h-2V72h2v12zm13.1-5.553l-4-8 1.79-.894 4 8-1.79.894z" 
                fill="currentColor"
              />
            </svg>
          </div>
          
          <h3 className="text-xl font-semibold text-neutral-800 mb-2">
            Nothing here... yet.
          </h3>
          
          <p className="text-neutral-600 max-w-md">
            These are a few of your favourite things... or they will be, once you favourite something.
          </p>
          
          <motion.div
            className="mt-6 flex items-center gap-2 text-primary-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Heart className="w-5 h-5" />
            <span className="text-sm font-medium">Start exploring and save items you love!</span>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Favorites