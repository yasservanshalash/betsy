import { Favorite, ShoppingBag, ShoppingBasket } from '@mui/icons-material'
import { Box, IconButton, Rating, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../../redux/slices/cart'
import { favoriteActions } from '../../redux/slices/favorite'
import { RootState } from '../../redux/store'
import { Product } from '../../types/types'

const ProductItem = ({product}: {product: Product}) => {
    const favorite = useSelector((state: RootState) => state.favorites.favorites)
    useEffect(() => {
        console.log(favorite)
    }, [favorite])
    const dispatch = useDispatch();
    const addToFav = () => {
        dispatch(favoriteActions.addToFavorites(product))
    }
    const addToCart = () => {
        dispatch(cartActions.addTocart(product))
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
