import { Box, Typography } from "@mui/material";
import React from "react";
import HeaderItem from "./HeaderItem";
import "./Header.css"
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import computers from "../../../assets/computers.jpeg"
import images from "../../../assets/images.webp"
import sound from "../../../assets/sound.jpeg"
import consoles from "../../../assets/consoles.jpeg"
import photography from "../../../assets/photography.webp"
import appliances from "../../../assets/appliances.webp"

const Header = () => {
  const user = useSelector((state: RootState) => state.user.user)
  return (
    <Box className="header" sx={{width: {sx: "420px", sm: "100%"}, background: {xs: user.email !== "" ? "linear-gradient(180deg, rgba(253, 235, 210,1) 0%, rgba(253, 235, 210,1) 80%, rgba(253, 235, 210,0) 80%, rgba(253, 235, 210,0) 100%)" : "linear-gradient(180deg, rgba(221,235,226,1) 0%, rgba(221,235,226,1) 80%, rgba(221,235,226,0) 80%, rgba(221,235,226,0) 100%)", md: user.email !== "" ? "linear-gradient(180deg, rgba(253, 235, 210,1) 0%, rgba(253, 235, 210,1) 60%, rgba(253, 235, 210,0) 60%, rgba(253, 235, 210,0) 100%)": "linear-gradient(180deg, rgba(221,235,226,1) 0%, rgba(221,235,226,1) 60%, rgba(221,235,226,0) 60%, rgba(221,235,226,0) 100%)"}, borderTop: "1px solid #999"}}>
      <Typography variant="h6" sx={{display: {xs: "block", sm: "block", md: "none"},textAlign: "center", px: 3, py:2, fontWeight: "lighter"}}>
        { user.email !== "" ? `Welcome, ${user.name}!` : `Find things you'll love. Support independent sellers. Only on Betsy.`}
      </Typography>
      <Typography variant="h4" sx={{display: {xs: "none", sm: "none", md: "block"},textAlign: "center", px: 3, py:2, fontWeight: "lighter"}}>
        { user.email !== "" ? `Welcome, ${user.name}!` :` Find things you'll love. Support independent sellers. Only on Betsy.`}
      </Typography>
      <Box
        sx={{
          display: {xs: "grid", md: "flex"},
          gridTemplateColumns: {xs: "1fr 1fr 1fr"},
          justifyContent: "center",
          alignItems: "center",
          gap: {md: "30px"}
        }}
      >
        <HeaderItem title={"Computers"} image={computers}/>
        <HeaderItem title={"Image"} image={images}/>
        <HeaderItem title={"Sound"} image={sound}/>
        <HeaderItem title={"Consoles"} image={consoles}/>
        <HeaderItem title={"Photography"} image={photography}/>
        <HeaderItem title={"Appliances"} image={appliances}/>
      </Box>
    </Box>
  );
};

export default Header;
