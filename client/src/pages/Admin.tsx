import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Footer from '../components/Footer/Footer'
import NavBar from '../components/NavBar/NavBar'
import { AppDispatch } from '../redux/store'
import { addProductThunk } from '../redux/thunks/product'
import { Product } from '../types/types'

const Admin = () => {
    const thunkDispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState(0);
    const [rating, setRating] =  useState(0);
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [quantityLeft, setQuantityLeft] = useState(100);
    const [category, setCategory] = useState("");
    const addProduct = () => {
        const product: Product = {
            name: name,
            image: image,
            price: price,
            rating: rating,
            description: description,
            brand: brand,
            quantity: 1,
            quantityLeft: quantityLeft,
            category: category
        }
        thunkDispatch(addProductThunk(product))
    }
  return (
    <Box>
            <Box sx={{display: "flex", flexDirection: "column", width: "20%", margin: "0 auto", gap: 5}}>
            <input type="text" name="_id" id="_id"  placeholder='_id' disabled/>
            <input type="text" name="name" id="name"  placeholder='name' onChange={(e) => setName(e.target.value)}/>
            <input type="text" name="image" id="image"  placeholder='image' onChange={(e) => setImage(e.target.value)}/>
            <input type="text" name="price" id="price"  placeholder='price' onChange={(e) => setPrice(+e.target.value)}/>
            <input type="text" name="rating" id="rating"  placeholder='rating' onChange={(e) => setRating(+e.target.value)}/>
            <input type="text" name="description" id="description"  placeholder='description' onChange={(e) => setDescription(e.target.value)}/>
            <input type="text" name="quantity" id="quantity"  placeholder='quantity' disabled/>
            <input type="text" name="seller" id="seller"  placeholder='seller' disabled/>
            <input type="text" name="brand" id="brand"  placeholder='brand' onChange={(e) => setBrand(e.target.value)}/>
            <input type="text" name="quantityLeft" id="quantityLeft"  placeholder='quantityLeft' onChange={(e) => setQuantityLeft(+e.target.value)} />
            <input type="text" name="category" id="category"  placeholder='category' onChange={(e) => setCategory(e.target.value)} />
            <Button onClick={addProduct}>add product</Button>
            </Box>
    </Box>
  )
}

export default Admin
