import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Product } from "../../../types/types";
import ProductItem from "../../productsComponents/ProductItem";
import PopularItem from "./PopularItem";
import PopularItemSkeleton from "./PopularItemSkeleton";

const Popular = () => {
  const products = useSelector((state: RootState) => state.products.products)
  // console.log(products);
  // let newProducts: Product[] = [];
  // console.log(newProducts);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  useEffect(() => {
    setNewProducts([...products]);

  }, [])

  return (
    <Box
      sx={{
        my: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography sx={{ textAlign: "center", fontWeight: "bold", mb: 3 }}>
        Popular gifts right now
      </Typography>
      <Box
        sx={{
          display: { xs: "grid", md: "flex" },
          gridTemplateColumns: { sx: "1fr", sm: "1fr 1fr" },
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
          p: 1,
          gap: { xs: "10px", md: "20px" },
        }}
      >
        {
          newProducts ? newProducts?.sort(() => Math.random() - 0.5 )?.splice(0,4)?.map((item) => {
            return (
              <PopularItem product={item} />
            )
          }) : <Box         sx={{
            display: { xs: "grid", md: "flex" },
            gridTemplateColumns: { sx: "1fr", sm: "1fr 1fr" },
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
            p: 1,
            gap: { xs: "10px", md: "20px" },
          }}>
              <PopularItemSkeleton />
              <PopularItemSkeleton />
              <PopularItemSkeleton />
              <PopularItemSkeleton />

          </Box>

        }
      </Box>
    </Box>
  );
};

export default Popular;
