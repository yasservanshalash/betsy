import { Box, Button } from '@mui/material';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import ProductItem from '../components/productsComponents/ProductItem';
import { RootState } from '../redux/store';
import { Product } from '../types/types';

const Category = () => {
    const products = useSelector((state: RootState) => state.products.products);
    const {category} = useParams();
    const nav = useNavigate();
    const arr = products.filter((item: Product) => item.category.includes(category as string));
    useEffect(() => {
      arr.length === 0 ? nav('/404') : console.log(arr);
    })
  return (
    <Box>
    <Box sx={{m: 5}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button>Sort By</Button>
      </Box>
      <Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", my: 2, justifyItems: "center", alignItems: "center", justifyContent: "center", rowGap: "3em"}}>
        { products.filter((item: Product) => item.category.includes(category as string)).map((item: Product) => {
            return (
                <ProductItem product={item} key={item._id}/>
            )
        })}
      </Box>
    </Box>
  </Box>
  )
}

export default Category