import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import ChangeAvatar from "../components/ProfileComponents/ChangeAvatar";
import ChangeName from "../components/ProfileComponents/ChangeName";
import { RootState } from "../redux/store";

const EditProfile = () => {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <Box>
      <Box sx={{ width: "60%", margin: "0 auto", my: 5}}>
        <Box sx={{mb: 5}}>
          <Typography variant="h4">Public Profile</Typography>
        </Box>
        <Box sx={{ border: "0.5px solid gray", borderRadius: "5px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              my: 3,
              mx: 6,
            }}
          >
            <Box>
              <Typography variant="subtitle2">Profile Picture</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <img src={user.avatar} alt={user.name} width="150px" />
              <ChangeAvatar />
              <Typography variant="subtitle2">
                Preferably be a .jpg, .gif or .png file smaller than 10MB and at
                least 400px by 400px.
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box             sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              my: 3,
              mx: 6,
            }}>
          <Typography variant="subtitle2">Your name</Typography>
          <Box sx={{display: "flex", mx: 2.5, gap: 10}}>
          <Typography variant="subtitle2">{user.name}</Typography>
          <ChangeName />
          
          </Box>
          </Box>
          <Divider />
          <Box             sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              my: 3,
              mx: 6,
            }}>
          <Typography variant="subtitle2">City</Typography>
          <Box sx={{display: "flex", mx: 7.5, gap: 4}}>
          <input type="text" name="city" id="city" />
          <button>save city</button>
          </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfile;
