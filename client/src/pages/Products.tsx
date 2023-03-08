import { Box, Button, Container } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import ProductItem from "../components/productsComponents/ProductItem";
import { RootState } from "../redux/store";
import { Product } from "../types/types";

const Products = ({filterTerm}: {filterTerm: string}) => {
  const products = useSelector((state: RootState) => state.products.products)
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
        </Box>
        <Box sx={{display: "grid", gridTemplateColumns: {xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr 1fr"}, my: 2, justifyItems: "center", alignItems: "center", justifyContent: "center", rowGap: "3em"}}>
        {filterTerm !== "" ? products?.filter((item: Product) => item.name.toLocaleLowerCase().includes(filterTerm.toLocaleLowerCase())).map((product: Product) => {
          return <ProductItem product={product} key={product._id} />;
        }): products?.map((product: Product) => {
          return <ProductItem product={product} key={product._id} />;
        })}
        </Box>
      </Box>
    </Box>
  );
};

export default Products;
