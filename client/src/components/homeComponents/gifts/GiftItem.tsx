import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface GiftItemProps {
  categoryImage: string;
  categoryTitle: string;
  category: string;
}

const GiftItem: React.FC<GiftItemProps> = ({ categoryImage, categoryTitle, category }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link 
        to={`/c/${category}`} 
        className="block w-48 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden border border-neutral-100 hover:border-neutral-200"
      >
        <div className="relative overflow-hidden">
          <img 
            src={categoryImage} 
            alt={categoryTitle}
            className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-4">
          <h6 className="text-center font-medium text-neutral-800 group-hover:text-primary-600 transition-colors duration-200 hover:no-underline">
            {categoryTitle}
          </h6>
        </div>
      </Link>
    </motion.div>
  )
}

export default GiftItem