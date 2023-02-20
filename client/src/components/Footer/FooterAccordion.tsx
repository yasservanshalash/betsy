import { Accordion, AccordionDetails, AccordionSummary, Box, Button, IconButton, Typography } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTube  from '@mui/icons-material/YouTube';
import { lightBlue } from '@mui/material/colors';
const FooterAccordion = () => {
  return (
    <Box sx={{background: "#2F456C", border: "0px", display: "flex", flexDirection: "column", gap: "5px"}}>
    <Accordion sx={{background: "transparent", border:"0px", boxShadow: "0px 0px 0px", color: "white", borderRadius: "10px",px:1}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{color: "white"}}/>}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{background: "transparent"}}
      >
        <Typography sx={{fontWeight: "bold"}}>Shop</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{display: "flex", flexDirection: "column", gap: 5}}>
      <Typography>
          Gift Cards
        </Typography>
        <Typography>
          Sitemap
        </Typography>
        <Typography>
          Betsy blog
        </Typography>
      </AccordionDetails>
    </Accordion >
    <Accordion sx={{background: "transparent", boxShadow: "0px 0px 0px", color: "white", px:1}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{color: "white"}}/>}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography sx={{fontWeight: "bold"}}>Sell</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{display: "flex", flexDirection: "column", gap: 5}}>
      <Typography>
          Sell on Betsy
        </Typography>
        <Typography>
          Teams
        </Typography>
        <Typography>
          Forums
        </Typography>
        <Typography>
            Affiliates
        </Typography>
      </AccordionDetails>
    </Accordion>
    <Accordion sx={{background: "transparent", boxShadow: "0px 0px 0px", color: "white", px:1}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{color: "white"}}/>}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography sx={{fontWeight: "bold"}}>About</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{display: "flex", flexDirection: "column", gap: 5}}>
      <Typography>
          Betsy, Inc.
        </Typography>
        <Typography>
          Policies
        </Typography>
        <Typography>
          Investors
        </Typography>        <Typography>
          Carreers
        </Typography>
      </AccordionDetails>
    </Accordion>
    <Accordion sx={{background: "transparent", boxShadow: "0px 0px 0px", color: "white", px:1}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{color: "white"}}/>}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography sx={{fontWeight: "bold"}}>Help</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{display: "flex", flexDirection: "column", gap: 5}}>
        <Typography>
          Help center
        </Typography>
        <Typography>
          Privacy settings
        </Typography>
      </AccordionDetails>
    </Accordion>
    <Box sx={{justifySelf: "center", alignSelf: "center"}}>
        <Button sx={{padding: 1, background: "transparent", border: "2px solid white", borderRadius: "20px", textTransform: "unset", my: 3}} disabled>
            <Typography variant='subtitle1' sx={{color: "white", fontSize: "80%"}}>Download Betsy App</Typography>
        </Button>
    </Box>
    <Box sx={{display: "flex", justifyContent: "center", mb: 2}}>
    <IconButton>
                <InstagramIcon sx={{color: "red", fontSize: "120%"}}/>
            </IconButton>
            <IconButton>
                <FacebookIcon sx={{color: "#3b5998",fontSize: "120%"}}/>
            </IconButton>
            <IconButton>
                <PinterestIcon sx={{color: "pink", fontSize: "120%"}}/>
            </IconButton>
            <IconButton>
                <TwitterIcon sx={{color: "lightblue", fontSize: "120%"}}/>
            </IconButton>
            <IconButton>
                <YouTube sx={{color: 'red', fontSize: "120%"}}/>
            </IconButton>
    </Box>
  </Box>
  )
}

export default FooterAccordion