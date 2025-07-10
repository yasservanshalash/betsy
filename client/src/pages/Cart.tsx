import React from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import CartComponent from '../components/Cart/CartComponent'
import { RootState } from '../redux/store'
import { ShoppingBag } from 'lucide-react'

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart.cart)

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50">
      
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-800">Shopping Cart</h1>
            {cart.products.length > 0 && (
              <span className="ml-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                {cart.products.length} items
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Empty Cart Message */}
      {cart.products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 p-6 bg-neutral-100 rounded-full">
              <ShoppingBag className="w-full h-full text-neutral-400" />
            </div>
            <h2 className="text-2xl font-semibold text-neutral-800 mb-2">
              Your basket is empty
            </h2>
            <p className="text-neutral-600 mb-6">
              Start shopping to add items to your cart
            </p>
            <motion.a
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingBag className="w-5 h-5" />
              Continue Shopping
            </motion.a>
          </motion.div>
        </div>
      )}

      {/* Cart Component */}
      <CartComponent />
    </div>
  )
}

export default Cart