import { Box, Button, Typography, IconButton, Container } from '@mui/material'
import React from 'react'
import LockIcon from '@mui/icons-material/Lock';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteItem from './FavoriteItem';

const Favorites = () => {
  return (
    <Box sx={{width: {xs: "100%", sm: "100%", md: "80%"}, margin: "0 auto"}}>
        <Box sx={{display: "flex", justifyContent: "space-between", p: 1}}>
            <Typography variant='h4'>Favorite Items</Typography>
            <Button sx={{borderRadius: "20px",p :1, width: "100px", border: "2px solid black", color:"black"}}>Sign in</Button>
        </Box>
        <Typography sx={{p:1}}>Favorites only stick around for 7 days (or until you clear your cache). To keep them longer and view them from any device, sign in or create an account.</Typography>
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center",p: 1}}>
        <Button variant="contained" startIcon={<LockIcon />} sx={{borderRadius: "20px",p :1, width: "150px", border: "0px solid black", color:"black", background: "#DEDEDE", "&:hover": {background: "#F5F5F5"}}}>Private</Button>
        <IconButton sx={{borderRadius: "",p :1, border: "0px solid black", color:"black", background: "#DEDEDE"}}><ShareIcon /></IconButton>
        </Box>
        {/* <Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr", justifyItems: "center", alignItems: "center", justifyContent: "space-around", alignContent: "center", gridAutoFlow: "row"}}>
        <FavoriteItem title={"Birth Flower Jewelry Travel Case, Birth Month Flower Gift, Personalized Birthday Gift, Leather Jewelry Travel Case, Custom Jewelry Case"} image={"https://i.etsystatic.com/35966576/c/1614/1283/669/351/il/e1510f/4033777789/il_340x270.4033777789_dqlw.jpg"} price={"11.87"} rating={5}/>
        <FavoriteItem title={"Birth Flower Jewelry Travel Case, Birth Month Flower Gift, Personalized Birthday Gift, Leather Jewelry Travel Case, Custom Jewelry Case"} image={"https://i.etsystatic.com/35966576/c/1614/1283/669/351/il/e1510f/4033777789/il_340x270.4033777789_dqlw.jpg"} price={"11.87"} rating={5}/>
        <FavoriteItem title={"Birth Flower Jewelry Travel Case, Birth Month Flower Gift, Personalized Birthday Gift, Leather Jewelry Travel Case, Custom Jewelry Case"} image={"https://i.etsystatic.com/35966576/c/1614/1283/669/351/il/e1510f/4033777789/il_340x270.4033777789_dqlw.jpg"} price={"11.87"} rating={5}/>
        <FavoriteItem title={"Birth Flower Jewelry Travel Case, Birth Month Flower Gift, Personalized Birthday Gift, Leather Jewelry Travel Case, Custom Jewelry Case"} image={"https://i.etsystatic.com/35966576/c/1614/1283/669/351/il/e1510f/4033777789/il_340x270.4033777789_dqlw.jpg"} price={"11.87"} rating={5}/>
        </Box> */}
        <Box sx={{display: {sx: "none", sm:"flex"}, flexDirection: "column", justifyContent: "center", alignItems: "center", jusstifySelf: "center", textAlign: "center", p: 10}}>
        <svg xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" aria-hidden="true" focusable="false" width="96" height="96">
  <path d="M60.053 58.605c-.309.158-.6-.062-1.488-1.11-.753-.89-1.69-2-3.065-2-1.677 0-2.371 1.735-2.929 3.13-.242.607-.748 1.87-1.071 1.87-.323 0-.621-.46-1.086-1.22-.718-1.173-1.7-2.78-3.914-2.78a6.275 6.275 0 00-4.293 1.973c-.733.637-1.207 1.028-1.681 1.056a5.81 5.81 0 01-.348-1.945c-.152-1.8-.341-4.032-2.231-4.978-.727-.361-2.209-.67-3.956 1.37a11.505 11.505 0 00-1.391 2.082l1.789.9c.526-1.05 1.89-2.936 2.659-2.553.886.443 1.017 1.99 1.132 3.357.134 1.582.317 3.748 2.315 3.748a4.624 4.624 0 003.02-1.52A4.455 4.455 0 0146.5 58.5c1.039 0 1.516.693 2.208 1.824.594.97 1.333 2.176 2.792 2.176 1.677 0 2.371-1.734 2.929-3.13.242-.606.748-1.87 1.071-1.87.448 0 1.027.685 1.539 1.288.843 1 2.115 2.5 3.908 1.607 3.38-1.69 2.638-7.4 2.542-8.041l-1.978.292c.189 1.264.313 5.074-1.458 5.959z" fill="#222222"></path>
  <path d="M35.025 42.374a17.408 17.408 0 003.246 5.466 14.252 14.252 0 004.519 3.466 12.017 12.017 0 0010.422 0 14.244 14.244 0 004.516-3.464 17.408 17.408 0 003.247-5.467l3.189 1.192c4.827-7.986 4.949-18.63 4.789-22.74a30.497 30.497 0 01-3.544-5.247 42.186 42.186 0 01-4.415-13.687L60.882.858 32.035 5.132 32 5.958A25.64 25.64 0 0127.515 20.2c-.187 3.522-.333 14.815 4.68 23.23l2.83-1.056zm20.046-12.745l1.858.742-4 10-1.858-.742 4-10zm-14.142 0l4 10-1.858.742-4-10 1.858-.742z" fill="#222222"></path>
  <path d="M88 29.954L87.955 29H87a22.616 22.616 0 01-15.991-6.008c0 5.11-.7 14.038-4.944 21.284l8.96 3.349a32.352 32.352 0 01-6.057 10.147 29.15 29.15 0 01-9.281 7.062 26.959 26.959 0 01-23.372 0 29.156 29.156 0 01-9.284-7.064 32.35 32.35 0 01-6.056-10.146L30.3 44.14c-4.263-7.368-4.894-16.426-4.864-21.45-6.613 6.747-15.89 7.283-16.48 7.309l-.912.04-.044.913A117.8 117.8 0 009.3 51.54c1.584 10.468 5.365 24.928 14.379 34.375C30.062 92.606 38.246 96 48 96c9.658 0 17.778-3.376 24.135-10.033C89.54 67.736 88.07 31.487 88 29.954zM33.9 78.447l-1.79-.894 4-8 1.79.894-4 8zM49 84h-2V72h2v12zm13.1-5.553l-4-8 1.79-.894 4 8-1.79.894z" fill="#222222"></path>
</svg>
          <Typography variant='h6'>Nothing here... yet.</Typography>
          <Typography variant='subtitle2'>These are a few of your favourite things... or they will be, once you favourite something.</Typography>
        </Box>
    </Box>
  )
}

export default Favorites