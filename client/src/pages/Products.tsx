import { Box, Button, Container } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import ProductItem from "../components/productsComponents/ProductItem";
import { RootState } from "../redux/store";
import { Product } from "../types/types";

const Products = () => {
  const products = useSelector((state: RootState) => state.products.products)
  return (
    <Box>
      <NavBar />
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
        {products?.map((product: Product) => {
          return <ProductItem product={product} key={crypto.randomUUID()} />;
        })}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Products;
