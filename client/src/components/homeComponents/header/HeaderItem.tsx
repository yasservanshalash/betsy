import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface HeaderItemProps {
  image: string
  title: string
}

const HeaderItem: React.FC<HeaderItemProps> = ({ image, title }) => {
  // Create URL-friendly category names
  const getCategoryUrl = (title: string) => {
    switch (title.toLowerCase()) {
      case 'computers':
        return 'computers'
      case 'art & images':
        return 'visual'
      case 'sound':
        return 'sound'
      case 'gaming':
        return 'gaming'
      case 'photography':
        return 'photography'
      case 'appliances':
        return 'appliances'
      default:
        return title.toLowerCase().replace(/[^a-z0-9]/g, '')
    }
  }
  
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        y: -4,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
    >
      <Link 
        to={`/c/${getCategoryUrl(title)}`}
        className="group block text-center p-4 rounded-2xl transition-all duration-300 hover:bg-white/50 hover:shadow-medium hover:backdrop-blur-sm focus-visible-ring no-underline decoration-none"
        style={{ textDecoration: 'none' }}
      >
        {/* Image Container with Glassmorphic Border */}
        <div className="relative mb-3 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-full backdrop-blur-xs border border-white/30 shadow-soft"></div>
          <img
            src={image}
            alt={title}
            className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full object-cover border-2 border-white/50 shadow-medium transition-all duration-300 group-hover:shadow-large group-hover:border-white/70"
          />
          
          {/* Hover Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-200/20 to-accent-mint/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
        </div>

        {/* Category Label */}
        <h3 className="text-sm sm:text-base font-medium text-neutral-700 group-hover:text-primary-600 transition-colors duration-300">
          {title}
        </h3>
        
        {/* Subtle underline on hover */}
        <div className="mt-1 h-0.5 bg-primary-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
      </Link>
    </motion.div>
  )
}

export default HeaderItem