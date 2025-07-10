import React from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Product } from '../../types/types'
import CartItem from './CartItem'
import CartPayment from './CartPayment'

const CartComponent = () => {
  const cart = useSelector((state: RootState) => state.cart.cart)
  const user = useSelector((state: RootState) => state.user.user)

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Cart Items Section */}
        <div className="flex-1">
          <div className="space-y-6">
            {cart.products.length > 0 ? (
              cart.products.map((item: Product, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CartItem product={item} index={index} cart={cart} />
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-500 text-lg">Your cart is empty</p>
              </div>
            )}
          </div>
        </div>

        {/* Payment Section */}
        {user._id !== "" && cart.products.length !== 0 && (
          <div className="w-full lg:w-96">
            <div className="sticky top-8">
              <CartPayment cart={cart} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartComponent