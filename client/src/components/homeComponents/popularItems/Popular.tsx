import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { Product } from '../../../types/types'
import PopularItem from './PopularItem'

const Popular = () => {
  const products: Product[] = useSelector((state: RootState) => state.products.products )
  const productsArray: Product[] = [...products]
  const [shuffledProducts, setShuffledProducts] = useState([...productsArray])
  console.log(productsArray, "shuffled")
  function shuffle(array: Product[]) {
    return array.sort(() => Math.random());
  }

  useEffect(() => {
    const shuffled = shuffle(productsArray);
    setShuffledProducts(shuffled)
  }, [])

  return (
    <Box sx={{my: 5, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <Typography sx={{textAlign: "center", fontWeight: "bold", mb: 3}}>Popular gifts right now</Typography>
        <Box sx={{display: {xs: "grid", md: "flex"}, gridTemplateColumns: {sx: "1fr", sm: "1fr 1fr"}, justifyContent: "center", alignItems: "center", margin: "0 auto", p:1, gap: {xs: "10px", md: "20px"}}}>
          {
            shuffledProducts.splice(0,4).map((item) => {
              return (
                <PopularItem product={item}/>

              )
            })
          }
           </Box>
    </Box>
  )
}

export default Popular