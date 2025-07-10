import React from 'react'
import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'

const RenewableEnergy = () => {
  return (
    <div className="bg-blue-600 p-8 flex flex-col justify-center items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center space-y-4"
      >
        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="p-3 bg-white/20 rounded-full backdrop-blur-sm"
        >
          <Leaf className="w-8 h-8 text-green-300" />
        </motion.div>
        
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white text-lg font-medium max-w-md leading-relaxed"
        >
          Betsy is powered by 100% renewable electricity.
        </motion.h3>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-green-200 text-sm"
        >
          Committed to sustainable commerce
        </motion.div>
      </motion.div>
    </div>
  )
}

export default RenewableEnergy