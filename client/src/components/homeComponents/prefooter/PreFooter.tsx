import { Box, Button, Typography } from "@mui/material";
import React from "react";

const PreFooter = () => {
  return (
    <Box sx={{ background: "#FDEBD2", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign:"center" ,p: 4}}>
      <Box sx={{my: 2}}>
        <Typography variant="h3" sx={{my:1}}>What is Betsy?</Typography>
        <Typography variant="subtitle2" sx={{fontWeight: "lighter"}}>A Etsy clone of course!</Typography>
      </Box>
      <Box sx={{display: "flex", flexDirection: {xs: "column", md: "row", justifyContent: "center"}}}>
      <Box sx={{my: 2, width: {xs: "100%", md: "30% "}}}>
        <Typography variant="h5" sx={{my:1}}>Support independent creators</Typography>
        <Typography variant="subtitle1">No Betsy warehouse exists; instead, millions of people are selling the items they cherish. We simplify the process by putting you in touch with makers directly to find something exceptional.</Typography>
      </Box>
      <Box sx={{my: 2, width: {xs: "100%", md: "30% "}}}>
        <Typography variant="h5" sx={{my:1}}>A community doing good</Typography>
        <Typography variant="subtitle1">A global online market place called Betsy brings individuals together to create, promote, purchase, and collect one-of-a-kind goods. Also, as a community, we work to promote improvements for people, the environment, and small businesses. Here are a few of the ways that our combined efforts are having a good effect.</Typography>
      </Box>

      <Box sx={{my: 2, width: {xs: "100%", md: "30% "}}}>
        <Typography variant="h5" sx={{my:1}}>Peace of mind</Typography>
        <Typography variant="subtitle1">Our devoted team's top goal is protecting your privacy. Also, we stand by to offer support if you ever require it.</Typography>
      </Box>
      </Box>
      <Box sx={{my: 2}}>
        <Typography variant="h6" sx={{my:1}}>Have a question? A Q and A feature will be added soon</Typography>
        <Button disabled>Q and A coming soon</Button>
      </Box>
    </Box>
  );
};

export default PreFooter;
