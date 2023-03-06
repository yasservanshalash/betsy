import { Box, IconButton, Rating, Skeleton, Typography } from '@mui/material'
import React, { useState } from 'react'
import "./PopularItem.css"
import Favorite from '@mui/icons-material/Favorite'
import { Product } from '../../../types/types'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import { favoriteActions } from '../../../redux/slices/favorite'
import { addToFavoritesThunk, removeFromFavoritesThunk } from '../../../redux/thunks/favorite'
const PopularItem = ({product}: {product: Product}) => {
  const [favoriteIconVisibility, setFavoriteIconVisibility] = useState<Boolean>(false)
  const [favorited, setFavorited] = useState<Boolean>(false)
  const favorite = useSelector((state: RootState) => state.favorites.favorites);
  const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch();
  const thunkDispatch = useDispatch<AppDispatch>()
  const addToFav = () => {
    if (user._id === "") {
      if (favorite.products.find((item) => item.name === product.name)) {
        return;
      } else {
        dispatch(favoriteActions.addToFavorites(product));
      }
    } else {
      if (favorite.products.find((item) => item.name === product.name)) {
        return;
      } else {
        dispatch(favoriteActions.addToFavorites(product));
        thunkDispatch(addToFavoritesThunk(user._id, favorite, product));
        console.log(product);
      }
    }
  };

  const removeFromFav = () => {
    if (user._id === "") {
      dispatch(favoriteActions.removeFromFavorites(product));
    } else {
      dispatch(favoriteActions.removeFromFavorites(product));
      thunkDispatch(removeFromFavoritesThunk(user._id, favorite, product));
      console.log(product);
    }
  }

  return (
    <Box sx={{width: "200px", position: "relative", textDecoration: "none", color: "black"}} onMouseEnter={() => setFavoriteIconVisibility(true)} onMouseLeave={() => setFavoriteIconVisibility(false)}>
        <Link to={`/products/${product._id}`}>
        <img className="popular-item-image" src={product.image} alt={product.name} style={{width: "190px", height: "170px", borderRadius: "10px", objectFit: "contain"}} />
        </Link>
        <Typography sx={{textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}} noWrap>{product.name}</Typography>
        <Rating sx={{color: "black"}} value={product.rating} readOnly />
    <Typography>{`€ ${product.price}`}</Typography>
    </Box>
  )
}

export default PopularItem