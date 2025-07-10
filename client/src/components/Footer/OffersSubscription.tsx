import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

const OffersSubscription = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setIsSubmitted(true)
      // Here you would typically handle the email subscription
      setTimeout(() => setIsSubmitted(false), 3000)
    }
  }

  return (
    <div className="bg-blue-100 flex flex-col justify-center items-center p-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="font-bold text-lg md:text-xl text-neutral-800 mb-6 leading-relaxed">
          Yes! Send me exclusive offers, unique gift ideas, and personalized tips for shopping and selling on Betsy.
        </h2>
        
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center bg-white border border-neutral-300 rounded-full p-1 shadow-soft max-w-md mx-auto">
            <div className="flex items-center flex-1 px-4">
              <Mail className="w-4 h-4 text-neutral-400 mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 outline-none text-neutral-700 placeholder-neutral-400 bg-transparent"
                required
              />
            </div>
            
            <motion.button
              type="submit"
              disabled={isSubmitted}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                isSubmitted 
                  ? 'bg-green-500 text-white' 
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
              whileHover={{ scale: isSubmitted ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitted ? 1 : 0.98 }}
            >
              {isSubmitted ? 'Subscribed!' : 'Subscribe'}
            </motion.button>
          </div>
        </form>

        {isSubmitted && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-600 text-sm mt-4"
          >
            Thank you for subscribing! Check your email for confirmation.
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}

export default OffersSubscription