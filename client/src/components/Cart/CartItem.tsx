import { Add, Remove } from "@mui/icons-material";
import { Box, Button, Divider, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../../redux/slices/cart";
import { favoriteActions } from "../../redux/slices/favorite";
import { AppDispatch, RootState } from "../../redux/store";
import { removeFromCartThunk, updateCart } from "../../redux/thunks/cart";
import { addToFavoritesThunk } from "../../redux/thunks/favorite";
import { Cart, Product } from "../../types/types";

const CartItem = ({ product, index, cart }: { product: Product, index: number,cart: Cart }) => {
  const user = useSelector((state: RootState) => state.user.user)
  const favorite = useSelector((state: RootState) => state.favorites.favorites)
    const dispatchThunk = useDispatch<AppDispatch>();
    const dispatch = useDispatch();
    const [val, setVal] = useState(product.quantity)
    const decrement = () => {
            if(product.quantity <= 1) {
                return
            } else {
                dispatch(cartActions.decrement(product))
            }
        }
    const increment = (e: any) => {
      if(product.quantity >= product.quantityLeft){
        return
      } else
            dispatch(cartActions.increment(product))
    }

    useEffect(() => {
        dispatchThunk(updateCart(cart));
    }, [dispatch, dispatchThunk, cart])

    const thunkDispatch = useDispatch<AppDispatch>();
    const removeFromCart = () => {
      if (user._id === "") {
        dispatch(cartActions.removeFromcart(product));
      } else {
        dispatch(cartActions.removeFromcart(product));
        thunkDispatch(removeFromCartThunk(user._id, cart, product));
      }
    };

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
        }
      }
    };
  return (
    <Box sx={{width: "1000px", }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Box>
        <Link to={`/products/${product._id}`} >
          <img src={product.image} alt={product.name} width="212.336px"/>
          </Link>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Typography sx={{width: "280px"}}>{product.name}</Typography>
          <Box sx={{display: "flex", gap: 2}}>
            <Button sx={{m: 0, color: "black", border: "0.5px solid black", "&:hover": {color: "black", background: "lightgray"}}} onClick={addToFav}>save for later</Button>
            <Button sx={{m: 0, color: "black", border: "0.5px solid black", "&:hover": {color: "white", background: "red"}}} onClick={removeFromCart}>remove</Button>
          </Box>
        </Box>
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
        <Box sx={{display: "flex"}}>
        <IconButton disableRipple sx={{height: "25px"}} onClick={increment}>
            <Add />
        </IconButton>
        <Typography>{product.quantity}</Typography>
        <IconButton disableRipple sx={{height: "25px"}} onClick={decrement}>
            <Remove />
        </IconButton>
        </Box>
        <Typography>{`quantity left: ${product.quantityLeft}`}</Typography>
        </Box>
        {/* <TextField
        type="text"
        value={val}
        onChange={changeQuantity}
        sx={{width: "80px"}}
      />         */}
      <Box>
          <Typography sx={{fontWeight: "bold"}}>{`€${product.price * product.quantity}`}</Typography>
        </Box>
      </Box>
      <Divider sx={{mt: 10}}/>
    </Box>
  );
};

export default CartItem;
