import { Box, Button, Divider, Typography } from '@mui/material'
import React, { useState } from 'react'
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

import "./CartPayment.css"
import { Cart } from '../../types/types'
import { createOrder, fetchOrders } from '../../redux/thunks/orders'
import { productActions } from '../../redux/slices/product'
import { fetchProductData } from '../../redux/thunks/product'
import { useNavigate } from 'react-router-dom'

const CartPayment = ({cart}: {cart: Cart}) => {
    const [paymentMethod, setPaymentMethod] = useState("");
    const dispatchThunk = useDispatch<AppDispatch>();
    let total = 0;
    let shipping = 0;
    if(cart.products.length > 0) {
        for(let i in cart.products) {
            total += (cart.products[i].quantity * cart.products[i].price)
        }
    }
    const nav = useNavigate()
  return (
    <Box sx={{width:"400px", maxHeight: "487px",mx: 10,my: 5, p:2, boxShadow: "1px black", borderRadius: "20px", right: "0px", overflowY:"hidden", background: "white"}} className="payment">
        <Box sx={{display: "flex", flexDirection: "column", gap:2, p:3}}>
            <Typography>How you'll pay</Typography>
            <Box sx={{display: "flex", alignItems: "center", gap:2}}>
            <input type="radio" id="contactChoice1" name="contact" value="email" className='radio' onClick={() => setPaymentMethod("IDEAL")}/>
            <img src={ideal} width="40px"/>
            </Box>
            <Box sx={{display: "flex", alignItems: "center", gap:2}}>
            <input type="radio" id="contactChoice2" name="contact" value="phone" className='radio' onClick={() => setPaymentMethod("credit card")}/>
            <img src={visa} width="40px"/>
            <img src={mastercard} width="40px"/>
            <img src={americanexpress} width="40px"/>
            <img src={dinersclub} width="40px"/>

            </Box>
            <Box sx={{display: "flex", alignItems: "center", gap:2}}>
        <input type="radio" id="contactChoice3" name="contact" value="mail" className='radio' onClick={() => setPaymentMethod("Klarna")}/>
            <img src={klarna} alt="klarna" width="40px"/>
        </Box>
        <Box sx={{display: "flex", alignItems: "center", gap:2}}>
        <input type="radio" id="contactChoice3" name="contact" value="mail" className='radio' onClick={() => setPaymentMethod("PayPal")}/>
            <img src={paypal} alt="paypal" width="40px" />
        </Box>
        <Box sx={{display: "flex", alignItems: "center", gap:2}}>
        <input type="radio" id="contactChoice3" name="contact" value="mail" className='radio' onClick={() => setPaymentMethod("Google Pay")}/>
            <img src={googlepay} alt="googlepay" width="65px" />
        </Box>
        <Box sx={{display: "flex", justifyContent: "space-between"}}>
        <Typography>Item(s) total</Typography>
        <Typography>{`€ ${total}`}</Typography>
        </Box>
        <Box sx={{display: "flex", justifyContent: "space-between"}}>
        <Typography>Shipping</Typography>
        <Typography>{`€ ${shipping}`}</Typography>
        </Box>
        <Divider />
        <Box sx={{display: "flex", justifyContent: "space-between"}}>
        <Typography>{`Total (${cart.products.length} items)`}</Typography>
        <Typography>{`€ ${total + shipping}`}</Typography>
        </Box>
        <Button sx={{color: "black", background: 'white', "&:hover": {color: "white", background: "black"}}} onClick={() => {
            dispatchThunk(createOrder(cart, total, paymentMethod));
            dispatchThunk(fetchProductData());
            dispatchThunk(fetchOrders(cart.userId));
            nav("/orders")
            setTimeout(() => {
                dispatchThunk(fetchOrders(cart.userId));
            }, 1000)
        }
         } disabled={ paymentMethod === "" ? true: false}>Proceed to checkout</Button>
        </Box>
    </Box>
  )
}

export default CartPayment