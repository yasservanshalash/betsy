import { Box, Button } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import ProductItem from '../components/productsComponents/ProductItem';
import { RootState } from '../redux/store';
import { Product } from '../types/types';

const Category = () => {
    const products = useSelector((state: RootState) => state.products.products);
    const {category} = useParams();
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