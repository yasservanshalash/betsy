import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { fetchOrders } from '../redux/thunks/orders'
import { Order } from '../types/types'
import { Package, Calendar, CreditCard, Truck, MapPin, CheckCircle, Clock } from 'lucide-react'

const Orders = () => {
  const user = useSelector((state: RootState) => state.user.user)
  const orders = useSelector((state: RootState) => state.orders.orders)
  const reversedOrders = [...orders].reverse()
  const thunkDispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (user._id) {
      thunkDispatch(fetchOrders(user._id))
    }
  }, [thunkDispatch, user._id])

  const getStatusColor = (isDelivered: boolean) => {
    return isDelivered 
      ? "text-green-600 bg-green-50 border-green-200"
      : "text-amber-600 bg-amber-50 border-amber-200"
  }

  const getStatusIcon = (isDelivered: boolean) => {
    return isDelivered ? CheckCircle : Clock
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Package className="w-6 h-6 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-neutral-800">My Orders</h1>
          </div>
          <p className="text-neutral-600">
            {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
          </p>
        </motion.div>

        {/* Orders List */}
        <div className="space-y-6">
          {reversedOrders.length > 0 ? (
            reversedOrders.map((order: Order, index) => {
              const StatusIcon = getStatusIcon(order.isDelivered)
              
              return (
                <motion.div
                  key={order._id}
                  className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary-100 rounded-lg">
                        <Package className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-800">
                          Order #{order._id.slice(0, 10)}
                        </h3>
                        <p className="text-sm text-neutral-600">
                          {order.products.length} {order.products.length === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                    </div>

                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(order.isDelivered)}`}>
                      <StatusIcon className="w-4 h-4" />
                      {order.isDelivered ? 'Delivered' : 'On its way'}
                    </div>
                  </div>

                  {/* Order Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-neutral-500" />
                      <div>
                        <p className="text-xs text-neutral-500 uppercase tracking-wide">Date</p>
                        <p className="font-medium text-neutral-800">
                          {new Date(order.dateOfOrder).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                      <CreditCard className="w-5 h-5 text-neutral-500" />
                      <div>
                        <p className="text-xs text-neutral-500 uppercase tracking-wide">Total</p>
                        <p className="font-medium text-neutral-800">€{order.totalPrice}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                      <CreditCard className="w-5 h-5 text-neutral-500" />
                      <div>
                        <p className="text-xs text-neutral-500 uppercase tracking-wide">Payment</p>
                        <p className="font-medium text-neutral-800">{order.paymentMethod}</p>
                      </div>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-neutral-800 mb-3 flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Items Ordered
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {order.products.map((product, productIndex) => (
                        <div 
                          key={productIndex}
                          className="relative group"
                        >
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg border border-neutral-200 hover:scale-105 transition-transform"
                          />
                          <div className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                            {product.quantity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-blue-600 uppercase tracking-wide font-medium">
                        Shipping Address
                      </p>
                      <p className="text-sm text-blue-800 mt-1">
                        {order.shippingAddress || 'Default shipping address'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })
          ) : (
            <motion.div
              className="flex flex-col items-center justify-center py-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-24 h-24 mx-auto mb-6 p-6 bg-neutral-100 rounded-full">
                <Package className="w-full h-full text-neutral-400" />
              </div>
              <h2 className="text-2xl font-semibold text-neutral-800 mb-2">
                No orders yet
              </h2>
              <p className="text-neutral-600 mb-6">
                When you place orders, they'll appear here.
              </p>
              <motion.a
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Package className="w-5 h-5" />
                Start Shopping
              </motion.a>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Orders