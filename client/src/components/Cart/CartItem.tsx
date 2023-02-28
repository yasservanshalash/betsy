import { Add, Remove } from "@mui/icons-material";
import { Box, Button, Divider, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../../redux/slices/cart";
import { AppDispatch } from "../../redux/store";
import { updateCart } from "../../redux/thunks/cart";
import { Cart, Product } from "../../types/types";

const CartItem = ({ product, index, cart }: { product: Product, index: number,cart: Cart }) => {
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
  return (
    <Box sx={{width: "800px"}}>
      <Box sx={{ display: "flex", gap: 5 }}>
        <Box>
        <Link to={`/products/${product._id}`} >
          <img src={product.image} alt={product.name} width="212.336px"/>
          </Link>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Typography sx={{width: "280px"}}>{product.name}</Typography>
          <Box sx={{display: "flex", gap: 2}}>
            <Button sx={{m: 0, color: "black", border: "0.5px solid black", "&:hover": {color: "black", background: "lightgray"}}}>save for later</Button>
            <Button sx={{m: 0, color: "black", border: "0.5px solid black", "&:hover": {color: "white", background: "red"}}}>remove</Button>
          </Box>
        </Box>
        <Box sx={{display: "flex"}}>
        <IconButton disableRipple sx={{height: "25px"}} onClick={increment}>
            <Add />
        </IconButton>
        <Typography>{product.quantity}</Typography>
        <IconButton disableRipple sx={{height: "25px"}} onClick={decrement}>
            <Remove />
        </IconButton>
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
