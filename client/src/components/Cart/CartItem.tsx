import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cart";
import { AppDispatch } from "../../redux/store";
import { updateCart } from "../../redux/thunks/cart";
import { Cart, Product } from "../../types/types";

const CartItem = ({ product, index, cart }: { product: Product, index: number,cart: Cart }) => {
    const dispatchThunk = useDispatch<AppDispatch>();
    const dispatch = useDispatch();
    const changeQuantity = (e: any) => {
        if(e.target.value < 1) {
            return;
        } else {
            dispatch(cartActions.changeAmount([product, Number(e.target.value)]))
            dispatchThunk(updateCart(cart));
        }
    //     dispatchThunk(changeQuantityThunk(cart, index, quantity))
    }
  return (
    <Box sx={{width: "1000px"}}>
      <Box sx={{ display: "flex", gap: 10 }}>
        <Box>
          <img src={product.image} alt={product.name} width="212.336px"/>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Typography>{product.name}</Typography>
          <Box sx={{display: "flex", gap: 2}}>
            <Button sx={{m: 0, color: "black", border: "0.5px solid black", "&:hover": {color: "black", background: "lightgray"}}}>save for later</Button>
            <Button sx={{m: 0, color: "black", border: "0.5px solid black", "&:hover": {color: "white", background: "red"}}}>remove</Button>
          </Box>
        </Box>
        <TextField
        type="number"
        value={product.quantity}
        onChange={changeQuantity}
        sx={{width: "80px"}}
      />        <Box>
          <Typography sx={{fontWeight: "bold"}}>{`€${product.price * product.quantity}`}</Typography>
        </Box>
      </Box>
      <Divider sx={{mt: 10}}/>
    </Box>
  );
};

export default CartItem;
