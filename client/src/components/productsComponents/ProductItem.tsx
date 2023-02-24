import { Favorite, ShoppingBag, ShoppingBasket } from '@mui/icons-material'
import { Box, IconButton, Rating, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../../redux/slices/cart'
import { favoriteActions } from '../../redux/slices/favorite'
import { AppDispatch, RootState } from '../../redux/store'
import { updateCart } from '../../redux/thunks/cart'
import { Product } from '../../types/types'

const ProductItem = ({product}: {product: Product}) => {
    const favorite = useSelector((state: RootState) => state.favorites.favorites)
    const cart = useSelector((state: RootState) => state.cart.cart)
    const user = useSelector((state: RootState) => state.user.user)
    useEffect(() => {
        console.log(favorite)
    }, [favorite])
    const dispatch = useDispatch();
    const thunkDispatch = useDispatch<AppDispatch>();
    const addToFav = () => {
        dispatch(favoriteActions.addToFavorites(product))
        
    }
    const addToCart = () => {
        if(cart._id === "") {
            dispatch(cartActions.addTocart(product))
        } else {
            dispatch(cartActions.addTocart(product))
            thunkDispatch(updateCart(user._id, cart._id, product))
        }
    }
  return (
    <Box sx={{position: "relative"}}>
        <Box sx={{position: "absolute", top: "10px", right: "10px", display: "flex"}}>
        <IconButton onClick={addToFav}>
            <Favorite />
        </IconButton>
        <IconButton onClick={addToCart}>
            <ShoppingBasket />
        </IconButton>
        </Box>
        <img src={product.image} alt={product.name} width="300px" height="300px"/>
        <Typography>{product.name}</Typography>
        <Rating readOnly value={product.rating}/>
        <Typography>{`€ ${product.price}`}</Typography>
    </Box>
  )
}

export default ProductItem
