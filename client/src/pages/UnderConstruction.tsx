import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Construction, ArrowLeft } from 'lucide-react'

const UnderConstruction = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50 flex items-center justify-center px-4">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Construction Icon */}
        <motion.div
          className="w-32 h-32 mx-auto mb-6 p-8 bg-white rounded-full shadow-soft"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <Construction className="w-full h-full text-amber-500" />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-3xl font-bold text-neutral-800 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Under Construction
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-neutral-600 mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          We're working hard to bring you something amazing. 
          This page will be ready soon!
        </motion.p>

        {/* Back Button */}
        <motion.a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back Home
        </motion.a>

        {/* Animated Dots */}
        <motion.div
          className="flex justify-center gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary-400 rounded-full"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default UnderConstruction