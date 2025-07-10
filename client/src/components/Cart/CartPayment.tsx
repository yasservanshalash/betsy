import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch } from "react-redux"
import { AppDispatch} from "../../redux/store"
import ideal from "../../assets/ideal.png"
import visa from "../../assets/visa.png"
import mastercard from '../../assets/mastercard.png'
import americanexpress from "../../assets/americanexpress.png"
import dinersclub from "../../assets/dinersclub.png"
import klarna from "../../assets/klarna.png"
import paypal from "../../assets/paypal.png"
import googlepay from "../../assets/googlepay.png"
import { Cart } from '../../types/types'
import { createOrder, fetchOrders } from '../../redux/thunks/orders'
import { fetchProductData } from '../../redux/thunks/product'
import { useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

interface CartPaymentProps {
  cart: Cart;
}

const CartPayment: React.FC<CartPaymentProps> = ({ cart }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatchThunk = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  let total = 0;
  const shipping = 0;
  
  if (cart.products.length > 0) {
    for (let i in cart.products) {
      total += (cart.products[i].quantity * cart.products[i].price);
    }
  }

  const paymentOptions = [
    {
      id: "IDEAL",
      name: "iDEAL",
      images: [ideal],
      description: "Pay with your bank"
    },
    {
      id: "credit_card",
      name: "Credit Card",
      images: [visa, mastercard, americanexpress, dinersclub],
      description: "Visa, Mastercard, Amex"
    },
    {
      id: "Klarna",
      name: "Klarna",
      images: [klarna],
      description: "Buy now, pay later"
    },
    {
      id: "PayPal",
      name: "PayPal", 
      images: [paypal],
      description: "Pay with PayPal"
    },
    {
      id: "Google_Pay",
      name: "Google Pay",
      images: [googlepay],
      description: "Quick & secure"
    }
  ];

  const handleCheckout = async () => {
    if (!paymentMethod) return;
    
    setIsProcessing(true);
    
    try {
      await dispatchThunk(createOrder(cart, total, paymentMethod));
      await dispatchThunk(fetchProductData());
      await dispatchThunk(fetchOrders(cart.userId));
      
      navigate("/orders");
      
      // Refresh orders after navigation
      setTimeout(() => {
        dispatchThunk(fetchOrders(cart.userId));
      }, 1000);
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100">
      <div className="space-y-6">
        
        {/* Header */}
        <div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-1">
            How you'll pay
          </h3>
          <p className="text-sm text-neutral-600">
            Choose your preferred payment method
          </p>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          {paymentOptions.map((option) => (
            <motion.div
              key={option.id}
              className={`relative p-4 border rounded-xl cursor-pointer transition-all ${
                paymentMethod === option.id
                  ? "border-primary-500 bg-primary-50"
                  : "border-neutral-200 hover:border-primary-300"
              }`}
              onClick={() => setPaymentMethod(option.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                {/* Radio Button */}
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === option.id
                    ? "border-primary-500 bg-primary-500"
                    : "border-neutral-300"
                }`}>
                  {paymentMethod === option.id && (
                    <CheckCircle className="w-3 h-3 text-white" />
                  )}
                </div>

                {/* Payment Icons */}
                <div className="flex items-center gap-2 flex-1">
                  {option.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${option.name} ${index + 1}`}
                      className="h-6 object-contain"
                    />
                  ))}
                </div>

                {/* Payment Name & Description */}
                <div className="text-right">
                  <div className="text-sm font-medium text-neutral-800">
                    {option.name}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {option.description}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="pt-4 border-t border-neutral-200 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Item(s) total</span>
            <span className="font-medium text-neutral-800">€{total.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Shipping</span>
            <span className="font-medium text-neutral-800">
              {shipping === 0 ? "Free" : `€${shipping.toFixed(2)}`}
            </span>
          </div>
          
          <div className="border-t border-neutral-200 pt-3">
            <div className="flex justify-between">
              <span className="font-semibold text-neutral-800">
                Total ({cart.products.length} items)
              </span>
              <span className="font-bold text-lg text-neutral-800">
                €{(total + shipping).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <motion.button
          onClick={handleCheckout}
          disabled={!paymentMethod || isProcessing}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all ${
            paymentMethod && !isProcessing
              ? "bg-primary-600 text-white hover:bg-primary-700 shadow-soft"
              : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
          }`}
          whileHover={paymentMethod && !isProcessing ? { scale: 1.02 } : {}}
          whileTap={paymentMethod && !isProcessing ? { scale: 0.98 } : {}}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </div>
          ) : (
            "Proceed to checkout"
          )}
        </motion.button>

        {/* Security Notice */}
        <div className="text-xs text-neutral-500 text-center">
          Your payment information is secure and encrypted
        </div>
      </div>
    </div>
  );
};

export default CartPayment;